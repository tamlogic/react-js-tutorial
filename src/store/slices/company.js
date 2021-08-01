import {
  createSlice, createAsyncThunk
} from "@reduxjs/toolkit";
import httpRequest from "services/httpRequest";
import AppUtil from "utilities/AppUtil";
// Main URL Endpoint
const _urlPrefix = "/user";

export const fetchListUserHospital = createAsyncThunk(
  "user/fetchListUserHospital",
  async (params) => {
    const params1 = {
      historyTypes: 403, 
      startDate: '2018/10/08 08:39:49', 
      endDate: '2021/10/08 08:39:49', 
      sortType: 6, 
      delete: false,
      affiliateId: 1,
      paymentTypes: 12,
      page: 1,
      size: 10
    }
    const result = await httpRequest({
      url: `${_urlPrefix}`,
      method: "GET",
      params: AppUtil.toSnakeCaseKey(params1)
    });
    if (!result) {
      return;
    }
    return result.data;
  }
);

const initialState = {
  listUserHospital: []
};

const company = createSlice({
  name: "company",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    
  },
});

const { reducer } = company;
// export const {} = actions;
export default reducer;