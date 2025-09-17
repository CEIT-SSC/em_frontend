import axios, { AxiosRequestConfig, AxiosHeaders, RawAxiosRequestHeaders } from "axios";
import { message } from "antd";

// Extend Axios config to allow custom fields
declare module "axios" {
    export interface AxiosRequestConfig {
        requiresAuth?: boolean;
    }
}

// Create axios instance with base configuration
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.ceit-ssc.ir",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// Request interceptor to add JWT token conditionally
API.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token && config.requiresAuth) {
                if (config.headers instanceof AxiosHeaders) {
                    // AxiosHeaders instance
                    config.headers.set("Authorization", `Bearer ${token}`);
                } else {
                    // Plain object headers
                    (config.headers as RawAxiosRequestHeaders)["Authorization"] = `Bearer ${token}`;
                }
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for global error handling
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== "undefined") {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                message.error(error.response.data.message || "An error occurred. Please try again.");
            } else {
                message.error("An unexpected error occurred. Please try again later.");
            }
        }
        return Promise.reject(error);
    }
);

export default API;
