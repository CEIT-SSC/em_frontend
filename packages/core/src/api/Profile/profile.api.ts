import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { RequestResponse } from "../../types/api/general";
import { UserProfileResponse } from "../../types/api/User/user";

export class ProfileApi extends ApiClient {
  async getProfile(): Promise<RequestResponse<UserProfileResponse>> {
    return await this.Api.get<
      UserProfileResponse,
      RequestResponse<UserProfileResponse>
    >(apiPath(ApiPath.USER_PROFILE));
  }
}
