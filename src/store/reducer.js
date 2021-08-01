import { combineReducers } from "@reduxjs/toolkit";

import adminReducer from "./slices/admin";
import authReducer from "./slices/auth";
import toastReducer from "./slices/toast";
import companyReducer from "./slices/company";


export default combineReducers({
  auth: authReducer,
  toasts: toastReducer,
  admin: adminReducer,
  company: companyReducer
});
