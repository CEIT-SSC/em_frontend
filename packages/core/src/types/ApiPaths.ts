export enum ApiPath {
  // Authentication endpoints
  AUTH_REFRESH = "/accounts/token/refresh/",
  AUTH_LOGIN = "/accounts/token/",
  AUTH_LOGOUT = "/accounts/token/blacklist/",
  AUTH_REGISTER = "/register/",

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
}

export const apiPath = (path: ApiPath): string => {
  return `/api${path}`;
};
