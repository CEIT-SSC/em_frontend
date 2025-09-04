import axios from "axios";
import isProduction from "../utils/isProduction";
import { StorageKeys } from "../types/StorageKeys";
import { ApiPath, apiPath } from "../types/ApiPaths";

const localhost = "https://aut-ssc.ir";
export const BASE_URL = isProduction() ? process.env.BASE_URL : localhost;

export const Api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN);
        const response = await axios.post(
          `${BASE_URL}${apiPath(ApiPath.AUTH_REFRESH)}`,
          { refresh: refreshToken }
        );
        localStorage.setItem(
          StorageKeys.ACCESS_TOKEN,
          response.data.accessToken
        );
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return Api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(error);
    }
  }
);
