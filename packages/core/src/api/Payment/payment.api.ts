import { RequestResponse } from "../../types/api/general";
import { paymentInitiationResponse } from "../../types/api/payment/Payment";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { ApiClient } from "../ApiClient";

export class PaymentApi extends ApiClient {
  async initiatePayment(orderId: string) {
    return await this.Api.post<
      paymentInitiationResponse,
      RequestResponse<paymentInitiationResponse>
    >(
      apiPath(ApiPath.ORDER_PAY_SINGLE_ORDER, { id: orderId }),
      {
        order_id: orderId,
      },
      {
        requiresAuth: true,
      }
    );
  }
}
