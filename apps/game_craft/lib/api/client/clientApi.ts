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
