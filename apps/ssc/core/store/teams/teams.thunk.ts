import {
  CreateTeamRequest,
  RegisterCompetitionRequest,
  SubmitContentRequest,
  AddMemberRequest,
} from "@ssc/core/lib/types/api/Teams/teams";
import { createAppAsyncThunk } from "../createAppAsyncThunk";

export const createTeamThunk = createAppAsyncThunk(
  "teams/create",
  async (
    teamData: CreateTeamRequest,
    { extra, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await extra.Api.teams.createTeam(teamData);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchTeamsThunk = createAppAsyncThunk(
  "teams/fetchAll",
  async (_, { extra, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await extra.Api.teams.getTeamsList();
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchTeamDetailsThunk = createAppAsyncThunk(
  "teams/fetchDetails",
  async (teamId: number, { extra, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await extra.Api.teams.getTeamDetails(teamId);
      return fulfillWithValue(response.data.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTeamThunk = createAppAsyncThunk(
  "teams/delete",
  async (teamId: number, { extra, fulfillWithValue, rejectWithValue }) => {
    try {
      await extra.Api.teams.deleteTeam(teamId);
      return fulfillWithValue({ teamId });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addMemberThunk = createAppAsyncThunk(
  "teams/addMember",
  async (
    {
      teamId,
      memberData,
    }: {
      teamId: number;
      memberData: AddMemberRequest;
    },
    { extra, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await extra.Api.teams.addMember(teamId, memberData);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchMembershipRequestsThunk = createAppAsyncThunk(
  "teams/fetchMembershipRequests",
  async (_, { extra, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await extra.Api.teams.getMembershipRequests();
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const acceptMembershipThunk = createAppAsyncThunk(
  "teams/acceptMembership",
  async (requestId: number, { extra, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await extra.Api.teams.acceptMembership(requestId);
      return fulfillWithValue({ requestId, membership: response.data.data });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const rejectMembershipThunk = createAppAsyncThunk(
  "teams/rejectMembership",
  async (requestId: number, { extra, fulfillWithValue, rejectWithValue }) => {
    try {
      await extra.Api.teams.rejectMembership(requestId);
      return fulfillWithValue({ requestId });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerCompetitionThunk = createAppAsyncThunk(
  "teams/registerCompetition",
  async (
    {
      teamId,
      competitionId,
      registerData,
    }: {
      teamId: number;
      competitionId: number;
      registerData?: RegisterCompetitionRequest;
    },
    { extra, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await extra.Api.teams.registerCompetition(
        teamId,
        competitionId,
        registerData
      );
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitContentThunk = createAppAsyncThunk(
  "teams/submitContent",
  async (
    {
      teamId,
      competitionId,
      contentData,
      method,
    }: {
      teamId: number;
      competitionId: number;
      contentData: SubmitContentRequest;
      method?: "POST" | "PUT";
    },
    { extra, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await extra.Api.teams.submitContent(
        teamId,
        competitionId,
        contentData,
        method
      );
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
