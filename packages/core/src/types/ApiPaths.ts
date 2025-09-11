export enum ApiPath {
  // Authentication endpoints
  AUTH_TOKEN = "/o/token/",
  AUTH_LOGOUT = "/o/revoke-token/",
  AUTH_REGISTER = "/register/",
  AUTH_VERIFY_EMAIL = "/verify-email/",
  AUTH_RESEND_OTP = "/resend-verify-email/",
  AUTH_GOOGLE = "/auth/social/google/",
  AUTH_AUTHORIZE = "/o/authorize",
  AUTH_AUTHORIZE_TOKEN = "/o/authorize/refresh",

  // Profile endpoints
  USER_PROFILE = "/profile/",

  // Presentations endpoints
  PRESENTATIONS_GET_LIST = "/presentations/",
  PRESENTATIONS_GET_DETAILS = "/presentations/{id}/",
}

export const apiPath = (
  path: ApiPath,
  options?: { [key: string]: string | number }
): string => {
  let url = path as string;
  if (options) {
    Object.keys(options).forEach((key) => {
      if (options[key] === undefined) throw new Error("Missing option");
      url = url.replace(`{${key}}`, options[key].toString());
    });
  }

  console.log("!@! ", url, options);
  return url; // was /api/path before
};
