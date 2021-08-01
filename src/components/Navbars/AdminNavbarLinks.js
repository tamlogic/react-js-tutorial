import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
// core components
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { logout } from "../../store/slices/auth";
import { useTranslation } from "react-i18next";
import { ExitToApp } from "@material-ui/icons";
import {Typography} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AppButton from "../CustomButtons/AppButton";
import AppColor from "../../utilities/AppColor";

const Styles = {
  ...styles,
  navItem: {
    margin: '0 0.5rem'
  },
  wrapItems: {
    display: 'flex'
  }
}
const useStyles = makeStyles(Styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const signOut = async () => {
    await dispatch(logout());
    history.push("/auth/admin/login");
  };
  const handleCloseProfile = async () => {
    setOpenProfile(null);
  };
  return (
    <div>
      <div className={classes.wrapItems}>
        <NotificationsIcon className={classes.navItem}/>
        <AppButton
            label={`${t("button.logout")}`}
            onClick={() => signOut()}
            style={{
              textTransform: "uppercase",
              margin: '0 0.5rem'
            }}
            mode="outlined"
            buttonColor={AppColor.black}
        />
      </div>
    </div>
  );
}
