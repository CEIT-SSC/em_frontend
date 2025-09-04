export enum ApiPath {
  // Authentication endpoints
  AUTH_REFRESH = "/accounts/token/refresh/",
  AUTH_LOGIN = "/accounts/token/",
  AUTH_LOGOUT = "/accounts/token/blacklist/",
  AUTH_REGISTER = "/register/",

  // Google Authentication
  AUTH_GOOGLE = "/auth/google/",

  // Presentation endpoints
  PRESENTATIONS = "/presentations/",
  PRESENTATION_BY_ID = "/presentations/",

  // Cart endpoints
  CART = "/cart/",
  CART_APPLY_DISCOUNT = "/cart/apply-discount/",
  CART_REMOVE_DISCOUNT = "/cart/remove-discount/",
  CART_ADD_ITEM = "/cart/items/",
  CART_REMOVE_ITEM = "/cart/items/",

  // Order endpoints
  ORDERS_CHECKOUT = "/orders/checkout/",
  ORDERS_HISTORY = "/orders/history/",
  ORDERS_HISTORY_BY_ID = "/orders/history/",
  ORDERS_INITIATE_PAYMENT = "/orders/",

  // User Profile endpoints
  USER_PROFILE = "/profile/",
  USER_CHANGE_PASSWORD = "/change-password/",
  USER_FORGOT_PASSWORD = "/forgot-password/",
  USER_VERIFY_EMAIL = "/verify-email/",
  USER_RESEND_VERIFY_EMAIL = "/resend-verify-email/",
}

export const apiPath = (path: ApiPath): string => {
  return `/api${path}`;
};
