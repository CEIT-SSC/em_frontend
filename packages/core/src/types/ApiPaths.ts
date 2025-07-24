import { Method } from "axios";
import { TokenRefreshRequest, TokenRefreshResponse } from "./api/Auth";

export enum ApiPath {
  AUTH_REFRESH = "/accounts/token/refresh/",
  AUTH_LOGIN = "/accounts/token/",
  AUTH_LOGOUT = "/accounts/token/blacklist/",
  AUTH_REGISTER = "/accounts/register/",
}

type ApiRoutesSchema = {
  [key in ApiPath]: {
    params: { [key: string]: string } | never;
    body: unknown;
    response: unknown;
    method: Method;
  };
};

export interface ApiRoutes extends ApiRoutesSchema {
  [ApiPath.AUTH_REFRESH]: {
    params: never;
    body: TokenRefreshRequest;
    response: TokenRefreshResponse;
    method: "POST";
  };
}
