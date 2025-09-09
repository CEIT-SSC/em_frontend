import axios from "axios";
import { StorageKeys } from "../../types/StorageKeys";
import { ApiPath, apiPath } from "../../types/ApiPaths";
import { BASE_URL } from "../constants";

export const clientHttpService = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

clientHttpService.interceptors.request.use(
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

clientHttpService.interceptors.response.use(
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
        return clientHttpService(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(error);
    }
  }
);
