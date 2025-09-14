"use client";

import { ApiModule, BASE_URL } from "@ssc/core";

import axios, { AxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";

declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (request) => {
    if (request.requiresAuth) {
      const session = await getSession();
      if (session && session.accessToken) {
        request.headers["Authorization"] = `Bearer ${session.accessToken}`;
      }
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest.requiresAuth &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshedSession = await getSession();

        if (refreshedSession && refreshedSession.accessToken) {
          const newToken = refreshedSession.accessToken;
          const oldToken = originalRequest.headers["Authorization"]?.replace(
            "Bearer ",
            ""
          );

          if (newToken !== oldToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          }
        }

        console.warn("Unable to refresh token, signing out user ?");
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const clientApi = new ApiModule(axiosInstance);
