import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Box } from "@material-ui/core";
import AppUtil from "../../utilities/AppUtil";

const useStyles = makeStyles({
  wrap: {
    height: 20,
    width: "100%",
    background: "#FFF7D4",
    position: "relative",
    borderRadius: 10,
    fontSize: "0.8rem",
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: "9px",
    whiteSpace: "break-spaces",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  progress: (props) => ({
    width: props.percent + "%",
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F7971E",
    backgroundImage: "linear-gradient(to right, #F7971E , #FFD200)",
    position: "absolute",
    top: 0,
    left: 0,
  }),
  detail: {
    display: "flex",
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    fontSize: "9px",
    alignItems: "center",
  },
  totalAmount: {
    minWidth: "60px",
    fontWeight: "bold",
    fontSize: "9px",
    display: "flex",
    alignItems: "center",
  },
});

const ProgressBar = (props) => {
  const { title = "", sold = 0, remaining, totalAmount } = props;
  const { t } = useTranslation();

  const classes = useStyles(props);

  return (
    <React.Fragment>
      <div className={classes.title}>{title}</div>
      <Box display="flex" justifyContent="space-between">
        <div className={classes.wrap}>
          <div className={classes.progress} />
          <div className={classes.detail}>
            <span className={"ml-3"}>
              <span>{"Sold: "}</span>
              <span className={"font-weight-bold"}>{sold}</span>
            </span>
            {remaining ? (
              <span className={"mr-3"}>
                <span>{"Remaining: "}</span>
                <span className={"font-weight-bold"}>{remaining}</span>
              </span>
            ) : (
              <span className={"mr-3"} />
            )}
          </div>
        </div>
        {totalAmount !== undefined && (
          <Box ml={1} className={classes.totalAmount}>
            {t("label.s$")}
            {AppUtil.formatMoney(totalAmount)}
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
};

ProgressBar.propTypes = {
  title: PropTypes.string,
  sold: PropTypes.number,
  remaining: PropTypes.number,
  percent: PropTypes.number,
  totalAmount: PropTypes.number,
};

export default ProgressBar;
