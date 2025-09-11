import { AxiosInstance } from "axios";

export class ApiClient {
  protected Api: AxiosInstance;

  constructor(Api: AxiosInstance) {
    this.Api = Api;
  }
}
