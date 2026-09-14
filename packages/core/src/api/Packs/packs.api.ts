import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { RequestResponse } from "../../types/api/general";
import { PacksList } from "../../types/api/Pack/pack";

export class PacksApi extends ApiClient {
  async getPacksList(event?: number): Promise<RequestResponse<PacksList>> {
    return this.Api.get<PacksList, RequestResponse<PacksList>>(
      apiPath(ApiPath.PACKS_GET_LIST),
      { params: event === undefined ? undefined : { event } },
    );
  }
}
