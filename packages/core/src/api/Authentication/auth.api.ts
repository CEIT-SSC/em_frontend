import { AxiosResponse } from "axios";
import { Api } from "../api";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import {
  ErrorResponse,
  UserRegistration,
  UserRegistrationSuccess,
} from "../../types/generated/accounts";

type RequestResponse<T> = AxiosResponse<T | ErrorResponse>;
export class AuthApi {
  constructor() {}

  async register(parameters: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber: string;
  }): Promise<RequestResponse<UserRegistrationSuccess>> {
    return await Api.post<
      UserRegistrationSuccess,
      RequestResponse<UserRegistrationSuccess>,
      UserRegistration
    >(apiPath(ApiPath.AUTH_REGISTER), {
      email: parameters.email,
      password: parameters.password,
      phone_number: parameters.phoneNumber,
      last_name: parameters.lastName,
      first_name: parameters.firstName,
    });
  }
}
