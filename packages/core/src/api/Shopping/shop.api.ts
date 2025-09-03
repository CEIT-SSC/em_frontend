import { AxiosResponse } from "axios";
import { Api } from "../api";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import {
  Cart,
  AddToCart,
  ApplyDiscount,
  Order,
  OrderList,
  PaginatedOrderListList,
  PaymentInitiateResponse,
  ErrorResponse,
  MessageResponse,
} from "../../types/generated/shopping";

type RequestResponse<T> = AxiosResponse<T | ErrorResponse>;

export class ShopApi {
  constructor() {}

  // ===== CART MANAGEMENT =====

  /**
   * Get user's shopping cart
   * GET /api/cart/
   */
  async getCart(): Promise<RequestResponse<Cart>> {
    return await Api.get<Cart, RequestResponse<Cart>>(apiPath(ApiPath.CART));
  }

  /**
   * Add item to cart
   * POST /api/cart/items/
   */
  async addToCart(item: AddToCart): Promise<RequestResponse<Cart>> {
    return await Api.post<Cart, RequestResponse<Cart>, AddToCart>(
      apiPath(ApiPath.CART_ADD_ITEM),
      item
    );
  }

  /**
   * Remove item from cart
   * DELETE /api/cart/items/{cart_item_pk}/remove/
   */
  async removeFromCart(cartItemId: number): Promise<RequestResponse<Cart>> {
    return await Api.delete<Cart, RequestResponse<Cart>>(
      `${apiPath(ApiPath.CART_REMOVE_ITEM)}${cartItemId}/remove/`
    );
  }

  /**
   * Apply discount code to cart
   * POST /api/cart/apply-discount/
   */
  async applyDiscount(discount: ApplyDiscount): Promise<RequestResponse<Cart>> {
    return await Api.post<Cart, RequestResponse<Cart>, ApplyDiscount>(
      apiPath(ApiPath.CART_APPLY_DISCOUNT),
      discount
    );
  }

  /**
   * Remove discount code from cart
   * DELETE /api/cart/remove-discount/
   */
  async removeDiscount(): Promise<RequestResponse<Cart>> {
    return await Api.delete<Cart, RequestResponse<Cart>>(
      apiPath(ApiPath.CART_REMOVE_DISCOUNT)
    );
  }

  // ===== ORDER MANAGEMENT =====

  /**
   * Checkout cart and create an order
   * POST /api/orders/checkout/
   */
  async checkout(): Promise<RequestResponse<Order>> {
    return await Api.post<Order, RequestResponse<Order>>(
      apiPath(ApiPath.ORDERS_CHECKOUT)
    );
  }

  /**
   * Get order history (paginated)
   * GET /api/orders/history/
   */
  async getOrderHistory(page?: number): Promise<RequestResponse<PaginatedOrderListList>> {
    const url = page
      ? `${apiPath(ApiPath.ORDERS_HISTORY)}?page=${page}`
      : apiPath(ApiPath.ORDERS_HISTORY);

    return await Api.get<PaginatedOrderListList, RequestResponse<PaginatedOrderListList>>(url);
  }

  /**
   * Get specific order details
   * GET /api/orders/history/{id}/
   */
  async getOrderById(orderId: string): Promise<RequestResponse<Order>> {
    return await Api.get<Order, RequestResponse<Order>>(
      `${apiPath(ApiPath.ORDERS_HISTORY_BY_ID)}${orderId}/`
    );
  }

  // ===== PAYMENT MANAGEMENT =====

  /**
   * Initiate payment for an order via Zarinpal
   * POST /api/orders/{order_pk}/initiate-payment/
   */
  async initiatePayment(orderPk: number): Promise<RequestResponse<PaymentInitiateResponse>> {
    return await Api.post<PaymentInitiateResponse, RequestResponse<PaymentInitiateResponse>>(
      `${apiPath(ApiPath.ORDERS_INITIATE_PAYMENT)}${orderPk}/initiate-payment/`
    );
  }

  // ===== UTILITY METHODS =====

  /**
   * Calculate cart total (client-side helper)
   */
  calculateCartTotal(cart: Cart): {
    subtotal: number;
    discount: number;
    total: number;
  } {
    const subtotal = parseFloat(cart.subtotal);
    const discount = parseFloat(cart.discount_applied);
    const total = parseFloat(cart.total);

    return {
      subtotal,
      discount,
      total,
    };
  }

  /**
   * Check if cart is empty
   */
  isCartEmpty(cart: Cart): boolean {
    return cart.items.length === 0;
  }

  /**
   * Get cart items count
   */
  getCartItemsCount(cart: Cart): number {
    return cart.items.length;
  }

  /**
   * Find cart item by item type and id
   */
  findCartItem(cart: Cart, itemType: string, itemId: number) {
    return cart.items.find(
      (item) =>
        item.item_details.item_type === itemType &&
        item.object_id === itemId
    );
  }

  /**
   * Check if item exists in cart
   */
  isItemInCart(cart: Cart, itemType: string, itemId: number): boolean {
    return !!this.findCartItem(cart, itemType, itemId);
  }
}
