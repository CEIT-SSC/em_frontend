export enum ApiPath {
  // Authentication endpoints
  AUTH_REFRESH = "/token/refresh/",
  AUTH_LOGIN = "/o/token/",
  AUTH_LOGOUT = "/token/blacklist/",
  AUTH_REGISTER = "/register/",
  AUTH_RESEND_OTP = "/resend-verify-email/",
  AUTH_VERIFY_EMAIL = "/verify-email/",
  AUTH_GOOGLE = "/auth/google/",
  USER_PROFILE = "/profile/",
}

export const apiPath = (path: ApiPath): string => {
  return `/api${path}`;
};
