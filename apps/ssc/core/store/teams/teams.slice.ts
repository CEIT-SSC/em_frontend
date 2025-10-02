import { createSlice } from "@reduxjs/toolkit";
import {
  createTeamThunk,
  fetchTeamsThunk,
  fetchTeamDetailsThunk,
  deleteTeamThunk,
  addMemberThunk,
  fetchMembershipRequestsThunk,
  acceptMembershipThunk,
  rejectMembershipThunk,
  registerCompetitionThunk,
  submitContentThunk,
} from "./teams.thunk";
import {
  TeamDetails,
  MembershipRequest,
  Membership,
} from "@ssc/core/lib/types/api/Teams/teams";

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [] as TeamDetails[],
    membershipRequests: [] as TeamDetails[],
    loading: true,
    teamDetailsLoading: true,
    membershipRequestsLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(createTeamThunk, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, _action) => {
        state.loading = false;
        state.error = null;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    });

    builder.addAsyncThunk(fetchTeamsThunk, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.teams = action.payload.data.results;
        state.loading = false;
        state.error = null;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    });

    builder.addAsyncThunk(fetchTeamDetailsThunk, {
      pending: (state) => {
        state.teamDetailsLoading = true;
      },
      fulfilled: (state, action) => {
        const detailedTeam = action.payload;
        const index = state.teams.findIndex(
          (team) => team.id === detailedTeam.id
        );
        if (index !== -1) {
          state.teams[index] = detailedTeam;
        }
        state.teamDetailsLoading = false;
        state.error = null;
      },
      rejected: (state, action) => {
        state.teamDetailsLoading = false;
        state.error = action.payload as string;
      },
    });

    builder.addAsyncThunk(deleteTeamThunk, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.teams = state.teams.filter(
          (team) => team.id !== action.payload.teamId
        );
        state.loading = false;
        state.error = null;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    });

    builder.addAsyncThunk(addMemberThunk, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        // Update the team's memberships with the new member
        const newMembership = action.payload.data.data;
        const teamIndex = state.teams.findIndex(
          (team) => team.id === action.meta.arg.teamId
        );
        if (teamIndex !== -1) {
          state.teams[teamIndex].memberships.push(newMembership);
        }
        state.loading = false;
        state.error = null;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    });

    builder.addAsyncThunk(fetchMembershipRequestsThunk, {
      pending: (state) => {
        state.membershipRequestsLoading = true;
      },
      fulfilled: (state, action) => {
        state.membershipRequests = action.payload.data.results;
        state.membershipRequestsLoading = false;
        state.error = null;
      },
      rejected: (state, action) => {
        state.membershipRequestsLoading = false;
        state.error = action.payload as string;
      },
    });

    builder.addAsyncThunk(acceptMembershipThunk, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        // Find the request to get the team ID before removing it
        const request = state.membershipRequests.find(
          (req) => req.id === action.payload.requestId
        );
        const teamId = request?.id;

        // Remove the accepted request from the list
        state.membershipRequests = state.membershipRequests.filter(
          (req) => req.id !== action.payload.requestId
        );

        // Add the membership to the appropriate team
        if (teamId) {
          const teamIndex = state.teams.findIndex((team) => team.id === teamId);
          if (teamIndex !== -1) {
            state.teams[teamIndex].memberships.push(
              action.payload.membership as unknown as Membership
            );
          }
        }
        state.loading = false;
        state.error = null;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    });

    builder.addAsyncThunk(rejectMembershipThunk, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        // Remove the rejected request from the list
        state.membershipRequests = state.membershipRequests.filter(
          (request) => request.id !== action.payload.requestId
        );
        state.loading = false;
        state.error = null;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    });

    builder.addAsyncThunk(registerCompetitionThunk, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        // Update the team with the registered competition data
        const registeredTeam = action.payload.data as unknown as TeamDetails;
        const index = state.teams.findIndex(
          (team) => team.id === registeredTeam.id
        );
        if (index !== -1) {
          state.teams[index] = registeredTeam;
        }
        state.loading = false;
        state.error = null;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    });

    builder.addAsyncThunk(submitContentThunk, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        // Update the team's content submission
        const contentSubmission = action.payload.data.data;
        const teamIndex = state.teams.findIndex(
          (team) => team.id === action.meta.arg.teamId
        );
        if (teamIndex !== -1) {
          state.teams[teamIndex].content_submission = contentSubmission;
        }
        state.loading = false;
        state.error = null;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    });
  },
});

export const teamsActions = teamsSlice.actions;
export const teamsReducer = teamsSlice.reducer;
