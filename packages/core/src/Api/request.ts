import { ApiPath, ApiRoutes } from "@core/types/ApiPaths";
import { AxiosRequestConfig } from "axios";
import { sendRequest } from "./sendRequest";

export const request = async <T extends keyof ApiRoutes>(
  method: ApiRoutes[T]["method"],
  path: T,
  body?: ApiRoutes[T]["body"],
  options?: Omit<AxiosRequestConfig, "url" | "method" | "data"> & {
    params: ApiRoutes[T]["params"];
  }
) => {
  const url = apiPath(path);

  try {
    const response = await sendRequest(method, url, body, options);

    return {
      data: response.data as ApiRoutes[T]["response"],
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    throw error;
  }
};

export const apiPath = (path: ApiPath): string => {
  return `/api${ApiPath[path]}`;
};
