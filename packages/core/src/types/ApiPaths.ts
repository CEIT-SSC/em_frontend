export enum ApiPath {
  // Authentication endpoints
  AUTH_REFRESH = "/accounts/token/refresh/",
  AUTH_LOGIN = "/accounts/token/",
  AUTH_LOGOUT = "/accounts/token/blacklist/",
  AUTH_REGISTER = "/register/",
  AUTH_RESEND_OTP = "/resend-verify-email/",
  AUTH_VERIFY_EMAIL = "/verify-email/",
}

export const apiPath = (path: ApiPath): string => {
  return `/api${path}`;
};
