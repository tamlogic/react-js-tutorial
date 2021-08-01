import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/components/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function Warning(props) {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <div
      className={classes.defaultFontStyle + " " + classes.warningText}
      {...rest}
    >
      {children}
    </div>
  );
}

Warning.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};
