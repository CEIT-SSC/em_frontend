import { ApiClient } from "../ApiClient";
import { apiPath, ApiPath } from "../../types/ApiPaths";
import { RequestResponse } from "../../types/api/general";
import {
  TeamDetails,
  TeamsList,
  CreateTeamRequest,
  CreateTeamResponse,
  RegisterCompetitionRequest,
  RegisterCompetitionResponse,
  SubmitContentRequest,
  SubmitContentResponse,
  AddMemberRequest,
  AddMemberResponse,
  MembershipRequestsList,
  AcceptMembershipResponse,
  RejectMembershipResponse,
  TeamPaymentResponse,
  PaymentData,
} from "../../types/api/Teams/teams";

export class TeamsApi extends ApiClient {
  async getTeamsList(): Promise<RequestResponse<TeamsList>> {
    return await this.Api.get<TeamsList, RequestResponse<TeamsList>>(
      apiPath(ApiPath.TEAMS_GET_LIST),
      { requiresAuth: true }
    );
  }

  async getTeamDetails(teamId: number): Promise<RequestResponse<TeamDetails>> {
    return await this.Api.get<TeamDetails, RequestResponse<TeamDetails>>(
      apiPath(ApiPath.TEAMS_GET_DETAILS, { id: teamId }),
      {
        requiresAuth: true,
      }
    );
  }

  async createTeam(
    teamData: CreateTeamRequest
  ): Promise<RequestResponse<CreateTeamResponse>> {
    return await this.Api.post<
      CreateTeamResponse,
      RequestResponse<CreateTeamResponse>
    >(apiPath(ApiPath.TEAMS_CREATE), teamData, { requiresAuth: true });
  }

  async deleteTeam(teamId: number): Promise<RequestResponse<void>> {
    return await this.Api.delete<void, RequestResponse<void>>(
      apiPath(ApiPath.TEAMS_REMOVE, { id: teamId }),
      { requiresAuth: true }
    );
  }

  async addMember(
    teamId: number,
    memberData: AddMemberRequest
  ): Promise<RequestResponse<AddMemberResponse>> {
    return await this.Api.post<
      AddMemberResponse,
      RequestResponse<AddMemberResponse>
    >(apiPath(ApiPath.TEAMS_ADD_MEMBER, { id: teamId }), memberData, {
      requiresAuth: true,
    });
  }

  async getMembershipRequests(): Promise<
    RequestResponse<MembershipRequestsList>
  > {
    return await this.Api.get<
      MembershipRequestsList,
      RequestResponse<MembershipRequestsList>
    >(apiPath(ApiPath.TEAMS_GET_INVITATIONS), { requiresAuth: true });
  }

  async acceptMembership(
    requestId: number
  ): Promise<RequestResponse<AcceptMembershipResponse>> {
    return await this.Api.post<
      AcceptMembershipResponse,
      RequestResponse<AcceptMembershipResponse>
    >(
      apiPath(ApiPath.TEAMS_INVITATION_RESPOND, { id: requestId }),
      { action: "accept" },
      {
        requiresAuth: true,
      }
    );
  }

  async rejectMembership(
    requestId: number
  ): Promise<RequestResponse<RejectMembershipResponse>> {
    return await this.Api.post<
      RejectMembershipResponse,
      RequestResponse<RejectMembershipResponse>
    >(
      apiPath(ApiPath.TEAMS_INVITATION_RESPOND, { id: requestId }),
      { action: "reject" },
      {
        requiresAuth: true,
      }
    );
  }

  async registerCompetition(
    id: number,
    competitionId: number,
    registerData?: RegisterCompetitionRequest
  ): Promise<RequestResponse<RegisterCompetitionResponse>> {
    return await this.Api.post<
      RegisterCompetitionResponse,
      RequestResponse<RegisterCompetitionResponse>
    >(
      apiPath(ApiPath.TEAMS_REGISTER_COMPETITION, {
        id,
        competition_pk: competitionId,
      }),
      registerData || {},
      { requiresAuth: true }
    );
  }

  async submitContent(
    teamId: number,
    competitionId: number,
    contentData: SubmitContentRequest,
    method: "POST" | "PUT" = "POST"
  ): Promise<RequestResponse<SubmitContentResponse>> {
    const apiMethod = method === "PUT" ? this.Api.put : this.Api.post;
    return await apiMethod<
      SubmitContentResponse,
      RequestResponse<SubmitContentResponse>
    >(
      apiPath(ApiPath.TEAMS_SUBMIT_CONTENT, {
        id: teamId,
        competition_pk: competitionId,
      }),
      contentData,
      { requiresAuth: true }
    );
  }

  async teamPayment(id: number): Promise<RequestResponse<PaymentData>> {
    return await this.Api.post<PaymentData, RequestResponse<PaymentData>>(
      apiPath(ApiPath.TEAMS_PAYMENT, { id }),
      {},
      {
        requiresAuth: true,
      }
    );
  }
}
