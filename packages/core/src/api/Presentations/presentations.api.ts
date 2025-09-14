import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { RequestResponse } from "../../types/api/general";
import {
  Presentation,
  PresentationId,
  PresentationsList,
  PresentationType,
} from "../../types/api/Presentation/presentation";

export class PresentationsApi extends ApiClient {
  async getPresentationsList(
    event: number,
    isOnline?: boolean,
    isPaid?: boolean,
    type?: PresentationType
  ): Promise<RequestResponse<PresentationsList>> {
    return await this.Api.get<
      PresentationsList,
      RequestResponse<PresentationsList>
    >(apiPath(ApiPath.PRESENTATIONS_GET_LIST), {
      params: {
        event,
        is_online: isOnline,
        is_paid: isPaid,
        type,
      },
    });
  }

  async getPresentationDetails(
    presentationId: PresentationId
  ): Promise<RequestResponse<Presentation>> {
    return await this.Api.get<Presentation, RequestResponse<Presentation>>(
      apiPath(ApiPath.PRESENTATIONS_GET_DETAILS, { id: presentationId })
    );
  }
}
