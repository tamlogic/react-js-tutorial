/*eslint-disable*/
import React from "react";
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
import Icon from "@material-ui/core/Icon";
// core components
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import { useTranslation } from "react-i18next";
import { useMedia } from 'react-use';
import UserIcon from "assets/icons/user-circle.svg";
import ArrowRight from "assets/icons/chevron-right.svg";
import { ReactComponent as UserCircleIcon } from "assets/icons/user-circle.svg";
import { SvgIcon } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getAuthInfo } from "../../store/slices/auth";
import {ADMIN_PERMISSIONS, SYSTEM_ROLE} from "../../config/AppConfig";


const useStyles = makeStyles((theme) => ({
    ...styles(theme),
    bg: {
        backgroundColor: '#f9f7f6'
    }
}));

const AdminSideBar = (props) => {
    const { t } = useTranslation();
    const location = useLocation();
    const classes = useStyles();
    const userInfo = useSelector(getAuthInfo);

    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }
    const {
        color, logo, image, logoText, routes, open,
        handleDrawerToggle
    } = props;

    const below956 = useMedia('(max-width: 956px)');

    /**
     * Filter out inaccessible menu
     * @param e
     * @returns {boolean}
     */
    const menuFilter = (e) => {
        if (userInfo.role === SYSTEM_ROLE.MANAGER && e.permission) {
            return e.isMenu && e.layout === '/admin' && userInfo.permissions.includes(e.permission);
        }
        return e.isMenu && e.layout === '/admin';
    }

    const links = (
        <List className={classes.list}>
            {routes.filter(menuFilter).map((prop, key) => {
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
                        to={(prop.layout + prop.path)}
                        className={activePro + classes.item}
                        activeClassName="active"
                        key={key}
                    >
                        <ListItem button className={classes.itemLink + listItemClasses}>
                            {typeof prop.icon === "object" && prop.icon.type === 'font-awesome' ? (
                                <i className={classNames(classes.itemIcon, prop.icon.icon)}/>
                            ) : typeof prop.icon === "string" ? (
                                <img
                                    src={prop.icon}
                                    className={classNames(classes.itemIcon, violetFontClasses)}
                                />
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
        <List className={classNames([classes.list])}>
            <div className={classes.item}>
                <div className={`${classes.itemLink} ${classes.wrapUserInfo}`}>
                    <SvgIcon component={UserCircleIcon} viewBox="0 0 512 512" className={classes.itemIcon} />
                    {
                        !below956 && (
                            <div className={classNames(classes.userInfo)}>
                                <span className="font-weight-bold">
                                    {userInfo.firstName} {userInfo.lastName}
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
                routes.filter(e => e.isMenuTop).map((prop, key) => (
                    <NavLink
                        to={(prop.layout + prop.path)}
                        className={classes.item}
                        activeClassName="active"
                        key={`sb-user-${key}`}
                    >
                        <ListItem button className={classes.itemLink}>
                            <SvgIcon component={prop.icon} viewBox="0 0 512 512" className={classes.itemIcon} />
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
                ))
            }
        </List>
    );
    const bottom = (
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
    return (
        <div>
            <Hidden xsDown implementation="css" className="xsDown">
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classNames([classes.drawerPaper, classes.bg])
                    }}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    {user}
                    <div className={classNames([classes.sidebarWrapper])}>
                        {links}
                        {bottom}
                    </div>
                </Drawer>
            </Hidden>
        </div>
    );
}

AdminSideBar.propTypes = {
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
    logo: PropTypes.string,
    image: PropTypes.string,
    logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool
};

export default AdminSideBar;
