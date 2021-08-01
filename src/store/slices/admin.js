import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { getMe } from "./auth";
import CryptoJS from "crypto-js";
import AppUtil from "utilities/AppUtil";
import httpRequest from "services/httpRequest";

// Main URL Endpoint
const _urlPrefix = "/admin";

// Fetch fee settings from api
export const fetchDashboardDetail = createAsyncThunk(
  "admin/fetchDashboardDetail",
  async () => {
    const result = await httpRequest({
      url: `${_urlPrefix}/dashboard`,
      method: "GET",
    });
    if (!result) {
      return {};
    }
    return result.data;
  }
);

// Change Password
export const changeAdminPassword = createAsyncThunk(
  "admin/changeAdminPassword",
  async (params, { dispatch }) => {
    const result = await httpRequest({
      url: `${_urlPrefix}/change-password`,
      method: "PUT",
      data: {
        old_password: CryptoJS.MD5(params.currentPassword).toString(),
        new_password: CryptoJS.MD5(params.newPassword).toString(),
        confirm_password: CryptoJS.MD5(params.confirmPassword).toString(),
      },
      successMessage: "toast.update.200",
    });
    if (!result) {
      return {};
    }
    dispatch(getMe());
    return result.data;
  }
);

// Change Password
export const changeAdminEmail = createAsyncThunk(
  "admin/changeAdminEmail",
  async (params, { dispatch }) => {
    const result = await httpRequest({
      url: `${_urlPrefix}/change-email`,
      method: "PUT",
      data: params,
      successMessage: "toast.update.200",
    });
    if (!result) {
      return {};
    }
    dispatch(getMe());
    return result.data;
  }
);

export const fetchAdminUserListPaging = createAsyncThunk(
    "admin/fetchAdminUserListPaging",
    async (params, { dispatch }) => {
        const result = await httpRequest({
            url: `${_urlPrefix}`,
            method: "GET",
            params: AppUtil.toSnakeCaseKey(params)
        });
        if (!result) {
            return;
        }
        return result.data;
    }
);

export const fetchAdminUserDetail = createAsyncThunk(
    "admin/reduceCreateAdminUser",
    async (params, { dispatch }) => {
        const {id} = params;
        const result = await httpRequest({
            url: `${_urlPrefix}/detail/${id}`,
            method: "GET",
        });
        if (!result) {
            return;
        }
        return result.data;
    }
);

export const fetchAuthAdminPermissions = createAsyncThunk(
    "admin/fetchAuthAdminPermissions",
    async (params, { dispatch }) => {
        const {id} = params;
        const result = await httpRequest({
            url: `${_urlPrefix}/detail/${id}`,
            method: "GET",
        });
        if (!result) {
            return;
        }
        return result.data;
    }
);

export const reduceCreateAdminUser = createAsyncThunk(
    "admin/reduceCreateAdminUser",
    async (params, { dispatch }) => {
        const result = await httpRequest({
            url: `${_urlPrefix}`,
            method: "POST",
            data: AppUtil.toSnakeCaseKey(params),
            successMessage: 'toast.create.200'
        });
        if (!result) {
            return;
        }
        return result.data;
    }
);

export const reduceUpdateAdminUser = createAsyncThunk(
    "admin/reduceUpdateAdminUser",
    async (params, { dispatch }) => {
        const {id} = params;
        const result = await httpRequest({
            url: `${_urlPrefix}/update/${id}`,
            method: "PUT",
            data: AppUtil.toSnakeCaseKey(params),
            successMessage: 'toast.update.200'
        });
        if (!result) {
            return;
        }
        return result.data;
    }
);

export const reduceDeleteAdminUser = createAsyncThunk(
    "admin/reduceDeleteAdminUser",
    async (params, { dispatch }) => {
        const data = {ids: params};
        const result = await httpRequest({
            url: `${_urlPrefix}/delete`,
            method: "DELETE",
            data: data,
            successMessage: 'toast.remove.200'
        });
        if (!result) {
            return;
        }
        return result.data;
    }
);


const initialState = {
    dashboard: {},
    list: [],
    detail: {},
    permissions: []
};

const admin = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchDashboardDetail.fulfilled]: (state, action) => {
      state.dashboard = action.payload;
    },
      [fetchAdminUserListPaging.fulfilled]: (state, {payload}) => {
        if (payload) {
            state.list = payload.content;
        }
      },
      [fetchAdminUserDetail.fulfilled]: (state, {payload}) => {
        if (payload) {
            state.detail = payload;
        }
      },
      [fetchAuthAdminPermissions.fulfilled]: (state, {payload}) => {
        if (payload) {
            state.permissions = payload.adminPermissions;
        }
      }
  },
});

const { reducer } = admin;
// export const {} = actions;
export default reducer;

// Selector
export const getDashboardDetail = createSelector(
  (state) => state.admin.dashboard,
  (dashboard) => dashboard
);

export const getAdminUserDetail = createSelector(
    state => state.admin.detail,
    detail => detail
)

export const getAuthAdminPermissions = createSelector(
    state => state.admin.permissions,
    permissions => permissions
)
