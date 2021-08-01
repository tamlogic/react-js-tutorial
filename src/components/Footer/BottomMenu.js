import { Add } from "@material-ui/icons";
import { Box, Button, IconButton, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import Activity from "../Icon/Activity";
import AppColor from "../../utilities/AppColor";
import Account from "../Icon/Account";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  paper: {
    borderRadius: "16px",
    padding: "10px",
  },
  buttonText: {
    fontSize: "12px",
    marginTop: 5,
    textTransform: "capitalize",
  },
  addButton: {
    background: AppColor.yellowGradientToBottom,
    color: AppColor.white,
    width: "61px",
    height: "61px",
    boxShadow: "0 3px 8px #00000029",
    marginTop: "-25px",
  },
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const BottomMenu = (props) => {
  const { handleAddProduct, onActivityClick, onAccountClick } = props;
  const { t } = useTranslation();
  const classes = useStyle();
  const history = useHistory();

  const accountClick = () => {
    if (onAccountClick) onAccountClick();
    else history.push("/admin/profile");
  };

  const activityClick = () => {
    if (onActivityClick) onActivityClick();
    else history.push("/admin/activity");
  };

  const onAddClick = () => {
    handleAddProduct && handleAddProduct();
  };

  return (
    <Box p={2} className={classes.container}>
      <Paper className={classes.paper} elevation={18}>
        <Box display="flex" justifyContent="space-around">
          <Button variant="text" onClick={activityClick}>
            <Box>
              <Activity />
              <Typography variant="body1" className={classes.buttonText}>
                {t("button.activity")}
              </Typography>
            </Box>
          </Button>
          <IconButton
            aria-label="add"
            className={classes.addButton}
            onClick={onAddClick}
          >
            <Add fontSize="large" />
          </IconButton>
          <Button variant="text" onClick={accountClick}>
            <Box>
              <Account />
              <Typography variant="body1" className={classes.buttonText}>
                {t("button.account")}
              </Typography>
            </Box>
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

BottomMenu.propTypes = {
  handleAddProduct: PropTypes.func,
  onActivityClick: PropTypes.func,
  onAccountClick: PropTypes.func,
};

export default BottomMenu;
