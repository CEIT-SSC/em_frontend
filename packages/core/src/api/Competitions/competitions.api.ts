import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { RequestResponse } from "../../types/api/general";
import { GroupCompetitionDetails, GroupCompetitionsList } from "../../types/api/competitions/competitions";

export class CompetitionsApi extends ApiClient {
  async getGroupCompetitionsList(
    event: number,
    is_paid?: boolean,
  ): Promise<RequestResponse<GroupCompetitionsList>> {
    return await this.Api.get<
      GroupCompetitionsList,
      RequestResponse<GroupCompetitionsList>
    >(apiPath(ApiPath.GROUP_COMPETITIONS_GET_LIST), {
      params: {
        event,
        is_paid,
      },
    });
  }

  async getGroupCompetitionDetails(
    id: number
  ): Promise<RequestResponse<GroupCompetitionDetails>> {
    return await this.Api.get<GroupCompetitionDetails, RequestResponse<GroupCompetitionDetails>>(
      apiPath(ApiPath.GROUP_COMPETITIONS_GET_DETAILS, { id })
    );
  }
}
