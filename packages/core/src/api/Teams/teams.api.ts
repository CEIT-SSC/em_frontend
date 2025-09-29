import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { RequestResponse } from "../../types/api/general";
import {
  MyTeams
} from "../../types/api/Teams/teams";

export class TeamsApi extends ApiClient {
  async getMyTeamsList(): Promise<RequestResponse<MyTeams[]>> {
    return await this.Api.get<
      MyTeams[],
      RequestResponse<MyTeams[]>
    >(apiPath(ApiPath.TEAMS_GET_LIST), {
    });
  }

  async getMyTeamsDetails(
    teamId: number
  ): Promise<RequestResponse<MyTeams>> {
    return await this.Api.get<MyTeams, RequestResponse<MyTeams>>(
      apiPath(ApiPath.TEAMS_GET_DETAILS, { id: teamId })
    );
  }
}
