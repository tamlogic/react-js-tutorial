/**
 * localStorage ~5MB, saved for infinity or until the user manually deletes it.
 * sessionStorage ~5MB, saved for the life of the CURRENT TAB
 */

import { Cookies } from "react-cookie";

const cookies = new Cookies();

const cookieOption = {
  path: "/",
};

const StorageHelper = {
  setCookie: function (name, value, options = {}) {
    cookies.set(name, value, {
      ...cookieOption,
      ...options,
    });
  },

  getCookie: function (name) {
    return cookies.get(name);
  },

  removeCookie: async function (name, options = {}) {
    await cookies.remove(name, { ...cookieOption, ...options });
  },

  setLocalItem: function (name, value) {
    localStorage.setItem(name, value);
  },

  setLocalObject: function (name, obj) {
    StorageHelper.setLocalItem(name, JSON.stringify(obj));
  },

  getLocalItem: function (name) {
    return localStorage.getItem(name);
  },

  getLocalObject: function (name) {
    return JSON.parse(StorageHelper.getLocalItem(name));
  },

  removeLocalItem: function (name) {
    localStorage.removeItem(name);
  },

  setSessionItem: function (name, value) {
    sessionStorage.setItem(name, value);
  },

  setSessionObject: function (name, obj) {
    StorageHelper.setSessionItem(name, JSON.stringify(obj));
  },

  getSessionItem: function (name) {
    return sessionStorage.getItem(name);
  },

  getSessionObject: function (name) {
    return JSON.parse(StorageHelper.getSessionItem(name));
  },

  removeSessionItem: function (name) {
    sessionStorage.removeItem(name);
  },
};

export default StorageHelper;
