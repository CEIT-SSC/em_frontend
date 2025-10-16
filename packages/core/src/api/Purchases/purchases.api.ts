import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { PurchasesResponse } from "../../types/api/Purchases/Purchases";
import { RequestResponse } from "../../types/api/general";

export class PurchasesApi extends ApiClient {
  async fetchPurchases(event: number) {
    return await this.Api.get<PurchasesResponse, RequestResponse<PurchasesResponse>>(
      apiPath(ApiPath.PURCHASES_GET_LIST, {event}),
      {
        requiresAuth: true,
      }
    );
  }
}
