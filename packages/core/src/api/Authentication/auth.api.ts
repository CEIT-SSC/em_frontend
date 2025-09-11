import {
  EmailVerification,
  GrantTypes,
  handshakeTokenResponse,
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
    password: string,
    client_id: string
  ): Promise<RequestResponse<TokenResponse>> {
    const params = new URLSearchParams({
      grant_type: GrantTypes.Password,
      username: email,
      password: password,
      client_id,
    });

    return await this.Api.post<TokenResponse, RequestResponse<TokenResponse>>(
      apiPath(ApiPath.AUTH_TOKEN),
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

  async authorizeWithToken(
    refresh_token: string
  ): Promise<RequestResponse<handshakeTokenResponse>> {
    return await this.Api.post<
      handshakeTokenResponse,
      RequestResponse<handshakeTokenResponse>
    >(apiPath(ApiPath.AUTH_AUTHORIZE_TOKEN), { refresh_token });
  }

  // async authorize(params: URLSearchParams, handshakeToken: string) {
  //   return await this.Api.get<
  //     handshakeTokenResponse,
  //     RequestResponse<handshakeTokenResponse>
  //   >(apiPath(ApiPath.AUTH_AUTHORIZE), {
  //     withCredentials: true,
  //     params: {
  //       ...Object.fromEntries(params),
  //       handshake_token: handshakeToken,
  //     },
  //   });
  // }

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

  async refresh(
    refresh_token: string,
    client_id: string
  ): Promise<RequestResponse<TokenResponse>> {
    const params = new URLSearchParams({
      grant_type: GrantTypes.Refresh,
      refresh_token,
      client_id,
    });

    return await this.Api.post<TokenResponse, RequestResponse<TokenResponse>>(
      apiPath(ApiPath.AUTH_TOKEN),
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }
}

// async login(
//     email: string,
//     password: string,
//     client_id?: string,
//     code_challenge?: string,
//     redirect_uri?: string
//   ): Promise<RequestResponse<TokenResponse>> {
//     const params = new URLSearchParams({
//       username: email,
//       password: password,
//       client_id: client_id ?? process.env.SSC_PUBLIC_CLIENT_ID ?? "",
//       response_type: "code",
//       allow: "true",
//       scope: "read write",
//     });

//     if (redirect_uri) {
//       params.append("redirect_uri", decodeURI(redirect_uri));
//     }
//     if (code_challenge) {
//       params.append("code_challenge", code_challenge);
//     }

//     return await this.Api.post<TokenResponse, RequestResponse<TokenResponse>>(
//       apiPath(ApiPath.AUTH_AUTHORIZE),
//       params,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );
//   }
