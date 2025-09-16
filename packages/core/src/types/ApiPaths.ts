export enum ApiPath {
  // Authentication endpoints
  AUTH_TOKEN = "/api/o/token/",
  AUTH_LOGOUT = "/api/o/revoke-token/",
  AUTH_REGISTER = "/api/register/",
  AUTH_VERIFY_EMAIL = "/api/verify-email/",
  AUTH_RESEND_OTP = "/api/resend-verify-email/",
  AUTH_GOOGLE = "/api/auth/social/google/",
  AUTH_AUTHORIZE = "/api/o/authorize",
  AUTH_AUTHORIZE_TOKEN = "/api/o/authorize/refresh",

  // Profile endpoints
  USER_PROFILE = "/api/profile/",

  // Presentations endpoints
  PRESENTATIONS_GET_LIST = "/api/presentations/",
  PRESENTATIONS_GET_DETAILS = "/api/presentations/{id}/",

  // Shop
  SHOP_CART = "/api/cart/",
  SHOP_ADD_ITEM = "/api/cart/items/",
  SHOP_REMOVE_ITEM = "/api/cart/items/",
  SHOP_DISCOUNT_CODE = "/api/cart/items/apply-discount/",

  // Order
  ORDER_CREATE_PARTIAL_CHECKOUT = "/api/orders/checkout/",
  ORDER_PAY_SINGLE_ORDER = "/api/orders/{id}/initiate-payment/",
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
