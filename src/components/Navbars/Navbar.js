import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import { Badge, Typography } from "@material-ui/core";
import {
  Notifications,
  Settings,
  ArrowBack,
  ExitToApp,
} from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppColor from "../../utilities/AppColor";
import { logout } from "../../store/slices/auth";
import AppNavbarLayout from "./AppNavbarLayout";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const showBackArrow = location.pathname.includes("account-settings");

  const signOut = async () => {
    await dispatch(logout());
    // window.location.href = AppUtil.getUrl();
    history.push("/");
  };

  function makeBrand() {
    let name = "";
    props.routes.map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = prop.name;
      }
      return null;
    });
    return name;
  }
  const { color } = props;
  return (
      <AppNavbarLayout
        color={color}
      >
        {showBackArrow && (
            <IconButton
                aria-label="Back"
                color="inherit"
                onClick={() => history.goBack()}
            >
              <ArrowBack />
            </IconButton>
        )}
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Typography className={classes.title}>{t(makeBrand())}</Typography>
        </div>
        <div style={{ color: AppColor.white }}>
          <Link to={"/admin/account-settings"}>
            <IconButton aria-label="Settings" style={{ color: AppColor.white }}>
              <Settings />
            </IconButton>
          </Link>
          <IconButton aria-label="Notifications" color="inherit">
            <Badge badgeContent={0} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton onClick={signOut} color="inherit">
            <ExitToApp />
          </IconButton>
        </div>
      </AppNavbarLayout>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
