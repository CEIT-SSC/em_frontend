"use client";

import { ApiModule, BASE_URL } from "@ssc/core";

import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (request) => {
    const session = await getSession();
    if (session && session.accessToken) {
      request.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const clientApi = new ApiModule(axiosInstance);
