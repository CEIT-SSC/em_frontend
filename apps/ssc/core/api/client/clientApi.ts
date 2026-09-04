"use client";

import { ApiModule } from "@ssc/core";

import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: "/api/backend/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (request) => {
  if (request.url?.startsWith("/")) request.url = request.url.slice(1);
  if (request.requiresAuth) await getSession();
  return request;
});

export const clientApi = new ApiModule(axiosInstance);
