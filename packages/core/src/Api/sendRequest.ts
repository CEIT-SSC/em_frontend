import Api from "./Api";
import { AxiosError, AxiosRequestConfig, Method } from "axios";
import logger from "@core/logger/logger";

export const sendRequest = async <T>(
  method: Method,
  url: string,
  body?: unknown,
  options?: Omit<AxiosRequestConfig, "url" | "method" | "data">
) => {
  try {
    return await Api.request({
      url,
      method,
      data: body,
      ...options,
    });
  } catch (error) {
    const axiosError = error as AxiosError<T>;
    logger.error("API", "Request failed", axiosError.message);
    if (axiosError.response) {
      return axiosError.response;
    }
    throw error;
  }
};
