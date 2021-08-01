import { Radio } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import AppColor from "../../utilities/AppColor";

const useStyles = makeStyles({
  root: {},
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow: `inset 0 0 0 1px ${AppColor.yellow}, inset 0 -1px 0 ${AppColor.yellow}`,
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: `2px auto ${AppColor.yellow}`,
      outlineOffset: 2,
    },
    "input:disabled ~ &": {
      backgroundColor: "rgba(206,217,224,.7)",
    },
  },
  checkedIcon: {
    backgroundColor: "#ffd200",
    backgroundImage: AppColor.yellowGradientToRight,
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: `radial-gradient(${AppColor.orange}, ${AppColor.yellow}, transparent 1%)`,
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: AppColor.yellow,
    },
  },
});

const AppRadio = (props) => {
  const classes = useStyles();

  return (
    <Radio
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
};

AppRadio.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default AppRadio;
