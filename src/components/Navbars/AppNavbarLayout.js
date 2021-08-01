import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

const AppNavbarLayout = (props) => {
    const classes = useStyles();
    const { children, color } = props;
    const appBarClasses = classNames({
        [" " + classes[color]]: color,
    });
    return (
        <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                {children}
            </Toolbar>
        </AppBar>
    );
}

AppNavbarLayout.propTypes = {
    children: PropTypes.any,
    color: PropTypes.string
};

export default AppNavbarLayout;
