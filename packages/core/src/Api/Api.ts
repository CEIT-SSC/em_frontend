import logger from "@core/logger/logger";
import {
  TokenRefreshRequest,
  TokenRefreshResponse,
} from "@core/types/api/Auth";
import { StorageKeys } from "@core/types/StorageKeys";
import isProduction from "@core/utils/isPorduction";
import axios from "axios";
import { apiPath } from "./request";
import { ApiPath } from "@core/types/ApiPaths";

const localhost = "http://localhost:3000";
export const BASE_URL = isProduction ? process.env.BASE_URL : localhost;

const Api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
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

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN);
        const response = await axios.post<TokenRefreshResponse>(
          `${BASE_URL}${apiPath(ApiPath.AUTH_REFRESH)}`,
          { refresh: refreshToken } satisfies TokenRefreshRequest
        );
        const { access } = response.data;
        localStorage.setItem(StorageKeys.ACCESS_TOKEN, access);
        Api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        return Api(originalRequest);
      } catch (refreshError) {
        logger.error("AUTH", "Token refresh failed", refreshError);
        localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
        localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default Api;
