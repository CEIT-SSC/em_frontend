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

  // Shop
  SHOP_CART = "/cart/",
  SHOP_ADD_ITEM = "/cart/items/add",
  SHOP_REMOVE_ITEM = "/cart/items/remove/",
  SHOP_DISCOUNT_CODE = "/cart/items/apply-discount/",

  // Order
  ORDER_CREATE_PARTIAL_CHECKOUT = "/orders/checkout/",
  ORDER_PAY_SINGLE_ORDER = "/orders/{id}/initiate-payment/",
}

export const apiPath = (
  path: ApiPath,
  options?: { [key: string]: string | number }
): string => {
  let url = path as string;
  console.log("!@! hi", path, options);
  if (options) {
    Object.keys(options).forEach((key) => {
      console.log("!@! key", key, options[key]);
      if (options[key] === undefined) throw new Error("Missing option");
      url = url.replace(`{${key}}`, options[key].toString());
    });
  }

  return url; // was /api/path before
};
