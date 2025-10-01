/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

export enum ApiPath {
  // Authentication endpoints
  AUTH_TOKEN = "o/token/",
  AUTH_LOGOUT = "/o/revoke-token/",
  AUTH_REGISTER = "/register/",
  AUTH_VERIFY_EMAIL = "/verify-email/",
  AUTH_RESEND_OTP = "/resend-verify-email/",
  AUTH_GOOGLE = "/auth/social/google/",
  AUTH_AUTHORIZE = "/o/authorize",
  AUTH_AUTHORIZE_TOKEN = "/o/authorize/refresh",
  AUTH_CHANGE_PASSWORD = "/change-password/",
  AUTH_FORGOT_PASSWORD = "/forgot-password/",

  // Profile endpoints
  USER_PROFILE = "/profile/",

  // Presentations endpoints
  PRESENTATIONS_GET_LIST = "/presentations/",
  PRESENTATIONS_GET_DETAILS = "/presentations/{id}/",

  // Shop
  SHOP_CART = "/cart/",
  SHOP_ADD_ITEM = "/cart/items/",
  SHOP_REMOVE_ITEM = "/cart/items/",
  SHOP_APPLY_DISCOUNT_CODE = "/cart/apply-discount/",
  SHOP_REMOVE_DISCOUNT_CODE = "/cart/remove-discount/",

  // Order
  ORDER_CREATE_PARTIAL_CHECKOUT = "/orders/checkout/",
  ORDER_PAY_SINGLE_ORDER = "/orders/{id}/initiate-payment/",

  // Purchases
  PURCHASES_GET_LIST = "/purchases/",

  // Teams
  TEAMS_GET_LIST = "/my-teams/",
  TEAMS_CREATE = "/my-teams/",
  TEAMS_GET_DETAILS = "/my-teams/{id}/",
  TEAMS_REMOVE = "/my-teams/{id}/",
  TEAMS_ADD_MEMBER = "/my-teams/{id}/add-member/",
  TEAMS_REGISTER_COMPETITION = "/my-teams/{id}/register-competition/{competition_pk}/",
  TEAMS_SUBMIT_CONTENT = "/my-teams/{id}/register-competition/{competition_pk}/",

  // Invitations
  TEAMS_GET_INVITATIONS = "/api/my-invitations/",
  TEAMS_INVITATION_RESPOND = "/api/my-invitations/{id}/respond/",
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

  return url; // was /path before
};
