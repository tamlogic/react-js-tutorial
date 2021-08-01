import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import PropTypes from "prop-types";

import {
  blackColor,
  hexToRgb,
} from "../../assets/jss/material-dashboard-react";

const useStyle = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
    pointerEvents: "auto",
    zIndex: 9999,
    maxWidth: "500px",
  },
}));

const HtmlTooltip = (props) => {
  const classes = useStyle();
  const { children, title, open, onOpen, onClose, ...rest } = props;
  return (
    <Tooltip
      classes={classes}
      title={title}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      className={classes.pointer}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

HtmlTooltip.propTypes = {
  children: PropTypes.any,
  title: PropTypes.any,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default HtmlTooltip;
