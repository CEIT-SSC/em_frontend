export enum ApiPath {
  // Authentication endpoints
  AUTH_REFRESH = "/accounts/token/refresh/",
  AUTH_LOGIN = "/accounts/token/",
  AUTH_LOGOUT = "/accounts/token/blacklist/",
  AUTH_REGISTER = "/register/",
}

export const apiPath = (path: ApiPath): string => {
  return `/api${path}`;
};
