export enum ApiPath {
  // Authentication endpoints
  AUTH_REFRESH = "/token/refresh/",
  AUTH_LOGIN = "/o/token/",
  AUTH_LOGOUT = "/token/blacklist/",
  AUTH_REGISTER = "/register/",
  AUTH_VERIFY_EMAIL = "/verify-email/",
  AUTH_RESEND_OTP = "/resend-otp/",
  AUTH_GOOGLE = "/auth/google/",
  AUTH_AUTHORIZE = "/o/authorize",
  AUTH_AUTHORIZE_TOKEN = "/o/authorize/refresh",

  // Profile endpoints
  USER_PROFILE = "/profile/",
}

export const apiPath = (path: ApiPath): string => {
  return `/api${path}`;
};
