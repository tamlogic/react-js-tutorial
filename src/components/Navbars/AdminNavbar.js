import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import UserNavbarLinks from "./UserNavbarLinks";
import { Helmet } from "react-helmet";
import AdminNavbarLinks from "./AdminNavbarLinks";

const useStyles = makeStyles((theme) => ({
  ...styles(theme),
  appBar: {
    ...styles(theme).appBar,
    color: "#555555",
  },
  title: {
    ...styles(theme).title,
    padding: "12px 30px 12px 0"
  },
}));

const AdminNavbar = (props) => {
  const {
    routes,
    handleDrawerToggle
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  function makeBrand() {
    var name;
    routes.map((prop) => {
      if (window.location.href.indexOf(prop.path) !== -1) {
        name = t(prop.name);
      }
      return null;
    });
    return 'Care Aid';
  }
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  return (
      <>
        <AppBar className={classes.appBar + appBarClasses}>
          <Toolbar className={classes.container}>
            <div className={classes.flex}>
              {/* Here we create navbar brand, based on route name */}
              <Button color="transparent" className={classes.title}>
                {makeBrand()}
              </Button>
            </div>
            <AdminNavbarLinks />
            <Hidden xsUp implementation="css">
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
              >
                <Menu />
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>
      </>
  );
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default AdminNavbar;
