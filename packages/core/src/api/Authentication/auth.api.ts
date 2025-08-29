import { AxiosResponse } from "axios";
import { Api } from "../api";
import { apiPath, ApiPath } from "../../types/ApiPaths";

interface RegisterRequest {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

interface RegisterResponse {
  message?: string;
  email?: string;
  error?: string;
}

export class AuthApi {
  constructor() {}

  async register(
    parameters: RegisterRequest
  ): Promise<AxiosResponse<RegisterResponse>> {
    const response = await Api.post<
      RegisterResponse,
      AxiosResponse<RegisterResponse>,
      RegisterRequest
    >(apiPath(ApiPath.AUTH_REGISTER), parameters);

    return response;
  }
}
