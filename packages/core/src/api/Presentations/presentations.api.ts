import { AxiosResponse } from "axios";
import { Api } from "../api";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import {
  Presentation,
  PaginatedPresentationList,
  ErrorResponse,
  MessageResponse,
  PresentationEnrollment,
  PresentationQueryParams,
} from "../../types/generated/presentations";

type RequestResponse<T> = AxiosResponse<T | ErrorResponse>;

export class PresentationsApi {
  constructor() {}

  /**
   * Get all presentations with optional query parameters
   * GET /api/presentations/
   */
  async getPresentations(
    params?: PresentationQueryParams
  ): Promise<RequestResponse<PaginatedPresentationList>> {
    const queryParams = new URLSearchParams();

    if (params?.event) queryParams.append('event', params.event.toString());
    if (params?.is_online !== undefined) queryParams.append('is_online', params.is_online.toString());
    if (params?.is_paid !== undefined) queryParams.append('is_paid', params.is_paid.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.type) queryParams.append('type', params.type);

    const url = `${apiPath(ApiPath.PRESENTATIONS)}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    return await Api.get<
      PaginatedPresentationList,
      RequestResponse<PaginatedPresentationList>
    >(url);
  }

  /**
   * Get a specific presentation by ID
   * GET /api/presentations/{id}/
   */
  async getPresentationById(id: number): Promise<RequestResponse<Presentation>> {
    return await Api.get<
      Presentation,
      RequestResponse<Presentation>
    >(`${apiPath(ApiPath.PRESENTATION_BY_ID)}${id}/`);
  }

  /**
   * Enroll in a presentation
   * POST /api/presentations/{id}/enroll/
   */
  async enrollInPresentation(
    id: number
  ): Promise<RequestResponse<PresentationEnrollment | MessageResponse>> {
    return await Api.post<
      PresentationEnrollment | MessageResponse,
      RequestResponse<PresentationEnrollment | MessageResponse>
    >(`${apiPath(ApiPath.PRESENTATION_BY_ID)}${id}/enroll/`);
  }
}
