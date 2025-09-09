import {
  EmailVerification,
  GrantTypes,
  TokenResponse,
  UserRegistration,
  UserRegistrationSuccess,
} from "../../types/api/Auth/Auth";
import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { RequestResponse } from "../../types/api/general";
export class AuthApi extends ApiClient {
  async register(parameters: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber: string;
  }): Promise<RequestResponse<UserRegistrationSuccess>> {
    return await this.Api.post<
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
    return await this.Api.post<null, RequestResponse<null>, { email: string }>(
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
    return await this.Api.post<
      RequestResponse,
      RequestResponse<null>,
      EmailVerification
    >(apiPath(ApiPath.AUTH_VERIFY_EMAIL), {
      email: email,
      code: otp,
    });
  }

  async login(
    email: string,
    password: string
  ): Promise<RequestResponse<TokenResponse>> {
    const params = new URLSearchParams({
      grant_type: GrantTypes.Password,
      username: email, // OAuth2 uses 'username' field, not 'email'
      password: password,
      client_id: process.env.SSC_PUBLIC_CLIENT_ID || "",
    });

    return await this.Api.post<TokenResponse, RequestResponse<TokenResponse>>(
      apiPath(ApiPath.AUTH_LOGIN),
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

  async googleAuth(googleData: {
    access_token?: string;
    id_token?: string;
    code?: string;
  }): Promise<RequestResponse<TokenResponse>> {
    return await this.Api.post<
      TokenResponse,
      RequestResponse<TokenResponse>,
      typeof googleData
    >(apiPath(ApiPath.AUTH_GOOGLE), googleData);
  }

  async refresh(): Promise<RequestResponse<TokenResponse>> {
    return await this.Api.post<TokenResponse, RequestResponse<TokenResponse>>(
      apiPath(ApiPath.AUTH_REFRESH),
      undefined,
      { withCredentials: true }
    );
  }
}
