import axiosClient from "./axiosClient";
import AppUtil from "../utilities/AppUtil";
import store from "store/configStore";
import {
  getMe
} from "store/slices/auth";
import i18next from "i18next";
import { EXCEPT_ERRORS } from "config/AppConfig";
import { showToast } from "store/slices/toast";
// For translation
const t = i18next.getFixedT();

const httpRequest = async ({
  url,
  method,
  params,
  data,
  successMessage,
  ...rest
}) => {
  let result;
  try {
    const response = await axiosClient.request({
      url,
      method,
      params,
      data,
      ...rest,
    });
    result = AppUtil.toCamelCaseKey(response);
    if (result.status !== 200) {
      const exceptError = EXCEPT_ERRORS.filter(item => item === result.status)[0];
      if (exceptError) {
        store.dispatch(
          showToast({
            type: "danger",
            message: result.data,
          })
        );
      } else {
        store.dispatch(
          showToast({
            type: "danger",
            message: t(`toast.error.${result.status}`),
          })
        );
      }
      return;
    }
    if (successMessage) {

      store.dispatch(
        showToast({
          type: "success",
          message: t(successMessage),
        })
      );
    }
    return result;
  } catch (error) {
    const exceptError = EXCEPT_ERRORS.filter(item => item === error.status)[0];
    if (exceptError) {
      store.dispatch(
        showToast({
          type: "danger",
          message: error.data
        })
      );
    } else {
      if (error.status === 401) {
        await store.dispath(getMe());
      }
      store.dispatch(
        showToast({
          type: "danger",
          message: error.message
        })
      );
    }
    return;
  }
};

export default httpRequest;
