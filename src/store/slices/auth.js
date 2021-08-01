import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import AppConfig from "config/AppConfig";
import httpRequest from "services/httpRequest";
import StorageHelper from "utils/StorageHelper";
import { setUserSession } from '../../utils/Common';
// Main URL Endpoint
const _urlPrefix = "/auth";

export function SignIn(loginData, history) {
    axios.post('http://localhost:8080/api/auth/login/admin-user', loginData).then(response => {
      if(response.data.status === 200) {
        setUserSession(response.data.data.auth_token, response.data.data);
        StorageHelper.setCookie(AppConfig.STORAGE_KEYS.token, response.data.data.auth_token, {
          maxAge: 24 * 60 * 60,
        });
        history.push('/dashboard');
        return 'login success';
      }
       return response.data.message; 
    }).catch(error => {
        return 'login fail: ' + error;
    //   if (error.status === 401) setError(error.data.message);
    //   else setError("Something went wrong. Please try again later.");
    });
};

export const getMe = createAsyncThunk(
  "auth/getMe",
  async () => {
    const result = await httpRequest({
      url: `${_urlPrefix}/info`,
      method: "GET",
    });
    if (!result) {
      return {};
    }
    StorageHelper.setLocalObject(AppConfig.STORAGE_KEYS.user, result.data);
    return result.data;
  }
);

const _isAuthenticated = !!StorageHelper.getCookie(
  AppConfig.STORAGE_KEYS.token
);

const initialState = {
  isAuthenticated: _isAuthenticated,
  isSessionValidating: _isAuthenticated,
  user: StorageHelper.getLocalObject(AppConfig.STORAGE_KEYS.user) || {
    approvalStatus: "PENDING",
    authId: 22,
    email: "worker@careaid.com",
    expireDate: "2021/04/29 08:11:04",
    firstName: "Worker",
    lastName: "One",
    systemRole: "SUPPORT_WORKER"
  },
};

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    const result = await httpRequest({
      url: `${_urlPrefix}/logout`,
      method: "GET",
    });
    if (!result) {
      return;
    }
    await StorageHelper.removeCookie(AppConfig.STORAGE_KEYS.token);
    StorageHelper.removeLocalItem(AppConfig.STORAGE_KEYS.user);

    return result.data;
  }
);


const session = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    saveAuthToken: (auth, action) => {
      const { accessToken, expireDate } = action.payload;
      auth.isAuthenticated = true;
      StorageHelper.setCookie(AppConfig.STORAGE_KEYS.token, accessToken, {
        expires: new Date(expireDate)
      });
    },
    clearAuthData: (auth) => {
      console.log('clearAuthData: ', auth);
      auth.user = {};
      auth.isAuthenticated = false;
    },
    updateOrganizationName: (auth, action) => {
      const { organizationName } = action.payload;
      auth.user["organizationName"] = organizationName;
    }
  },
  extraReducers: {
    [getMe.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    [getMe.rejected]: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    [logout.fulfilled]: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    }
  },
});

const { reducer, actions } = session;
export const { clearAuthData, saveAuthToken, updateOrganizationName } = actions;
export default reducer;