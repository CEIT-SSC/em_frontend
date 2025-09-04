import { AxiosError, AxiosResponse } from "axios";
import { Api } from "../api";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import {
  EmailVerification,
  ErrorResponse,
  MessageResponse,
  UserRegistration,
  UserRegistrationSuccess,
} from "../../types/generated/accounts";

type RequestResponse<T> = AxiosResponse<T | MessageResponse | ErrorResponse>;
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

  async resendOtp(email: string): Promise<RequestResponse<null>> {
    return await Api.post<null, RequestResponse<null>, { email: string }>(
      apiPath(ApiPath.AUTH_RESEND_OTP),
      {
        email,
      }
    );
  }

  async verifyEmail(
    email: string,
    otp: string
  ): Promise<RequestResponse<null>> {
    return await Api.post<
      MessageResponse,
      RequestResponse<null>,
      EmailVerification
    >(apiPath(ApiPath.AUTH_VERIFY_EMAIL), {
      email: email,
      code: otp,
    });
  }
}
