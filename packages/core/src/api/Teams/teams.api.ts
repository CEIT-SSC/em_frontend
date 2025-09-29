import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { RequestResponse } from "../../types/api/general";
import {
  Team, TeamsList
} from "../../types/api/Teams/teams";

export class TeamsApi extends ApiClient {
  async getTeamsList(): Promise<RequestResponse<TeamsList>> {
    return await this.Api.get<
      TeamsList,
      RequestResponse<TeamsList>
    >(apiPath(ApiPath.TEAMS_GET_LIST), {
    });
  }

  async getTeamDetails(
    teamId: number
  ): Promise<RequestResponse<Team>> {
    return await this.Api.get<Team, RequestResponse<Team>>(          
      apiPath(ApiPath.TEAMS_GET_DETAILS, { id: teamId })
    );
  }
}
