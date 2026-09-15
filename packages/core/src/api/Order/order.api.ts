import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { RequestResponse } from "../../types/api/general";
import {
  CheckoutOrderSummary,
  OrderCheckoutResult,
} from "../../types/api/Order/Order";

export class OrderApi extends ApiClient {
  async checkout(event: number) {
    return await this.Api.post<
      OrderCheckoutResult,
      RequestResponse<OrderCheckoutResult>
    >(
      apiPath(ApiPath.ORDER_CREATE_PARTIAL_CHECKOUT),
      undefined,
      {
        requiresAuth: true,
        params: {
          event,
        },
      }
    );
  }

  async getById(orderId: string, event: number) {
    return await this.Api.get<
      CheckoutOrderSummary,
      RequestResponse<CheckoutOrderSummary>
    >(apiPath(ApiPath.ORDER_GET_BY_ID, { id: orderId }), {
      requiresAuth: true,
      params: { event },
    });
  }
}
