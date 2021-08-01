/*eslint-disable*/
import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PerfectScrollbar from "perfect-scrollbar";

// core components
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import { useTranslation } from "react-i18next";
import { useMedia } from 'react-use';
import { ReactComponent as UserCircleIcon } from "assets/icons/user-circle.svg";
import { SvgIcon } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getAuthInfo, getOrganizationName } from "../../store/slices/auth";
import AppConfig, { SYSTEM_ROLE } from "config/AppConfig";
const { APPROVAL_STATUS } = AppConfig;
const useStyles = makeStyles(styles);
let ps;

const UserSidebar = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const classes = useStyles();
  const sideBar = useRef();
  const userInfo = useSelector(getAuthInfo);
  const organizationName = useSelector(getOrganizationName);

  const {
    approvalStatus
  } = userInfo;

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const {
    color, logo, image, logoText, routes, open,
    handleDrawerToggle
  } = props;

  const below956 = useMedia('(max-width: 956px)');

  const filterRoute = e => {
    if (e.activeStatus && approvalStatus !== APPROVAL_STATUS.ACTIVE) {
      return;
    }
    if (e.accessRole === '*') {
      return e.isMenu && location.pathname.includes(e.layout);
    }
    if (e.accessRole && e.accessClient) {
      return e.isMenu && location.pathname.includes(e.layout)
        && e.accessRole && e.accessRole.includes(userInfo.role) && e.accessClient && e.accessClient.includes(userInfo.clientType);
    } else if (e.accessRole && !e.accessClient) {
      return e.isMenu && location.pathname.includes(e.layout)
        && e.accessRole && e.accessRole.includes(userInfo.role)
    } else {
      return e.isMenu && location.pathname.includes(e.layout);
    }
  }
  const links = (
    <List className={classes.list}>
      {routes.filter(filterRoute).map((prop, key) => {
        let activePro = " ";
        let listItemClasses;
        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.path)
        });
        const violetFontClasses = classNames({
          [" " + classes.violetFont]: activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <SvgIcon component={prop.icon} viewBox="0 0 512 512" className={classNames(classes.itemIcon, violetFontClasses)} />
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, violetFontClasses)}
                />
              )}
              {
                !below956 && (
                  <ListItemText
                    primary={t(prop.name)}
                    className={classNames(classes.itemText, violetFontClasses)}
                    disableTypography={true}
                  />
                )
              }
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  const user = (
    <List className={classes.list}>
      <div className={classes.item}>
        <div className={`${classes.itemLink} ${classes.wrapUserInfo}`}>
          <SvgIcon component={UserCircleIcon} viewBox="0 0 512 512" className={classes.itemIcon} />
          {
            !below956 && (
              <div className={classNames(classes.userInfo)}>
                <span className="font-weight-bold">
                  {
                    userInfo.role === SYSTEM_ROLE.HOSPITAL_ADMIN ||
                      userInfo.role === SYSTEM_ROLE.HOSPITAL_OTHER
                      ? (
                        `${organizationName || ''}`
                      )
                      : (
                        `${userInfo.firstName} ${userInfo.lastName}`
                      )
                  }
                </span>
                <span>
                  {t(`user_role.${userInfo.role}`)}
                </span>
              </div>
            )
          }
        </div>
      </div>
      {
        routes.filter(e => e.isMenuTop).map((prop, key) => {
          const listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path)
          });
          const violetFontClasses = classNames({
            [" " + classes.violetFont]: activeRoute(prop.path)
          });
          return (
            <NavLink
              to={prop.path}
              className={classes.item}
              activeClassName="active"
              key={`sb-user-${key}`}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                <SvgIcon component={prop.icon} viewBox="0 0 512 512" className={classNames(classes.itemIcon, violetFontClasses)} />
                {
                  !below956 && (
                    <ListItemText
                      primary={t(prop.name)}
                      className={classNames(classes.itemText)}
                      disableTypography={true}
                    />
                  )
                }
              </ListItem>
            </NavLink>
          )
        })
      }
    </List>
  );
  const bottom = routes.filter(e => e.isMenuBottom)[0] && (
    <List className={classes.list}>
      {routes.filter(e => e.isMenuBottom).map((prop, key) => {
        let activePro = " ";
        let listItemClasses;
        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.path)
        });
        const violetFontClasses = classNames({
          [" " + classes.violetFont]: activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            {
              !below956 ?
                (
                  <ListItem button className={classes.itemLinkBottom + listItemClasses}>
                    <ListItemText
                      primary={t(prop.name)}
                      className={classNames(violetFontClasses)}
                      disableTypography={true}
                    />
                    <i className={`fas fa-chevron-right ${classes.itemIconBottom}`}></i>
                  </ListItem>
                )
                :
                (
                  <ListItem button className={classes.itemLink + listItemClasses}>
                    <SvgIcon component={prop.icon} viewBox="0 0 512 512" className={classes.itemIcon} />
                  </ListItem>
                )
            }
          </NavLink>
        );
      })}
    </List>
  );

  useEffect(() => {
    if (sideBar && sideBar.current) {
      if (navigator.platform.indexOf("Win") > -1) {
        ps = new PerfectScrollbar(sideBar.current, {
          suppressScrollX: true,
          suppressScrollY: false,
        });
        // document.body.style.overflow = "hidden";
      }
    }
  }, [sideBar]);

  return (
    <div>
      <Hidden xsDown implementation="css" className="xsDown">
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {user}
          <div className={classes.sidebarWrapper} ref={sideBar}>
            {links}
            {bottom}
          </div>
        </Drawer>
      </Hidden>
    </div>
  );
}

UserSidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};

export default UserSidebar;
