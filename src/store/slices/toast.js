import { createSlice } from "@reduxjs/toolkit";
import { Done, Error, Warning, Info, AddAlert } from "@material-ui/icons";
import SnackbarContent from "../../components/Snackbar/SnackbarContent";
import React from "react";

function getIcon(type) {
  switch (type) {
    case "success":
      return Done;
    case "info":
      return Info;
    case "danger":
      return Error;
    case "warning":
      return Warning;
    default:
      return AddAlert;
  }
}

const slice = createSlice({
  name: "toasts",
  initialState: {
    notification: {},
  },
  reducers: {
    setNotificationSystem: (toasts, actions) => {
      toasts.notification = actions.payload;
    },
    showToast: (toasts, actions) => {
      // Message and type is required
      // autoDismiss is optional
      const { message, type, autoDismiss } = actions.payload;
      toasts.notification &&
        toasts.notification.addNotification({
          title: null,
          message: null,
          level: "info",
          dismissible: "click",
          autoDismiss: autoDismiss ? autoDismiss : 3,
          children: (
            <SnackbarContent
              color={type || "primary"}
              icon={getIcon(type)}
              message={message}
              closeNotification={() => {}}
              close
            />
          ),
        });
    },
  },
});

export const { setNotificationSystem, showToast } = slice.actions;

export default slice.reducer;
