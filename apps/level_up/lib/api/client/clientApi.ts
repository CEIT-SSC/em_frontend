"use client";

import { ApiModule } from "@ssc/core";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

export const axiosInstance = axios.create({
  baseURL: "/api/backend/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (request) => {
    if (request.requiresAuth) {
      await getSession();
    }
    if (request.url?.startsWith("/")) request.url = request.url.slice(1);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      await signOut({ callbackUrl: "/login" });
    }
    return Promise.reject(error);
  }
);

export const clientApi = new ApiModule(axiosInstance);
