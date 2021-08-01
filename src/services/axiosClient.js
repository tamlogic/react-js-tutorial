import axios from "axios";
import AppConfig from "config/AppConfig";
import queryString from "query-string";
import history from "router/history";
import StorageHelper from "utils/StorageHelper";

const getAuthInfo = async () => {
  // Call API get token
  return StorageHelper.getCookie('token') || "";
};

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await getAuthInfo();
  console.log('tokennnnnnnnnn: '+ token);
  if (token) {
    config.headers["Auth-Token"] = `${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  async (error) => {
    // Handle errors
    const status = error.status || error.response.data.status;
    if (status === 401) {
      let url = "/auth/client/login";
      await StorageHelper.removeCookie(AppConfig.STORAGE_KEYS.user);
      await StorageHelper.removeLocalItem(AppConfig.STORAGE_KEYS.token);
      history.push(url);
    }
    throw error.response.data;
  }
);

export default axiosClient;
