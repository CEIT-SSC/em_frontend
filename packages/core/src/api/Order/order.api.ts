import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { RequestResponse } from "../../types/api/general";
import { Order, paymentInitiationResponse } from "../../types/api/Order/Order";

export class OrderApi extends ApiClient {
  async partialCheckout(itemIds: number[]) {
    return await this.Api.post<Order, RequestResponse<Order>>(
      apiPath(ApiPath.ORDER_CREATE_PARTIAL_CHECKOUT),
      {
        cart_item_ids: itemIds,
      },
      {
        requiresAuth: true,
      }
    );
  }
}
