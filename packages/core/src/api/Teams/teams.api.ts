import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { RequestResponse } from "../../types/api/general";
import { TeamDetails, TeamsList } from "../../types/api/Teams/teams";

export class TeamsApi extends ApiClient {
  async getTeamsList(): Promise<RequestResponse<TeamsList>> {
    return await this.Api.get<TeamsList, RequestResponse<TeamsList>>(
      apiPath(ApiPath.TEAMS_GET_LIST),
      { requiresAuth: true }
    );
  }

  async getTeamDetails(teamId: number): Promise<RequestResponse<TeamDetails>> {
    return await this.Api.get<TeamDetails, RequestResponse<TeamDetails>>(
      apiPath(ApiPath.TEAMS_GET_DETAILS),
      {
        params: { id: teamId },
        requiresAuth: true,
      }
    );
  }
}
