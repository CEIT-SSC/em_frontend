import { AxiosInstance } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

export class ApiClient {
  protected Api: AxiosInstance;

  constructor(Api: AxiosInstance) {
    this.Api = Api;
  }
}
