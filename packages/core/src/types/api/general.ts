import { AxiosResponse } from "axios";

export interface Response<T, E = object> {
  success: boolean;
  statusCode: number;
  message: "string";
  errors: E;
  data: T;
}

export type RequestResponse<T = object, E = object> = AxiosResponse<
  Response<T, E>
>;
export type SearchParamBody<T> = {
  [K in keyof T]: string;
};
