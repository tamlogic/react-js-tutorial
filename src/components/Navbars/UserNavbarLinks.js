import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { logout } from "../../store/slices/auth";
import { useTranslation } from "react-i18next";
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppButton from "components/CustomButtons/AppButton";
import AppColor from "../../utilities/AppColor";
import { SYSTEM_ROLE } from "config/AppConfig";

const Styles = {
  ...styles,
  navItem: {
    margin: '0 0.5rem'
  },
  wrapItems: {
    display: 'flex',
    alignItems: 'center'
  }
}
const useStyles = makeStyles(Styles);

const UserNavbarLinks = (props) => {
  const {
    userInfo
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const signOut = async () => {
    const clone = { ...userInfo };
    const { role } = clone;
    await dispatch(logout());
    switch (role) {
      case SYSTEM_ROLE.SUPER_ADMIN:
      case SYSTEM_ROLE.MANAGER:
        history.push("/auth/admin/login");
        break;
      case SYSTEM_ROLE.HOSPITAL_ADMIN:
      case SYSTEM_ROLE.HOSPITAL_OTHER:
      case SYSTEM_ROLE.COORDINATOR_ADMIN:
      case SYSTEM_ROLE.COORDINATOR_OTHER:
      case SYSTEM_ROLE.PARTICIPANT:
        history.push("/auth/client/login");
        break;
      case SYSTEM_ROLE.NURSE:
      case SYSTEM_ROLE.SUPPORT_WORKER:
        history.push("/auth/worker/login");
        break;
      default:
        break;
    }

  };
  return (
    <div>
      <div className={classes.wrapItems}>
        <NotificationsIcon className={classes.navItem} />
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

UserNavbarLinks.propTypes = {
  userInfo: PropTypes.object
};

export default UserNavbarLinks;
