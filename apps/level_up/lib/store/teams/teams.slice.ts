import { createSlice } from "@reduxjs/toolkit";
import { TeamDetails } from "@ssc/core/lib/types/api/Teams/teams";
import {
  fetchTeamsThunk,
  payTeamThunk,
  registerTeamThunk,
} from "./teams.thunk";

interface TeamsState {
  loading: boolean;
  error?: string | null;
  data: TeamDetails[];
}

const initialState: TeamsState = {
  loading: true,
  error: null,
  data: [],
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTeamsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch teams";
      })

      .addCase(payTeamThunk.fulfilled, (state, action) => {
        const team = state.data.find((t) => t.id === action.payload.teamId);
        if (team) team.status = "awaiting_payment_confirmation";
      })

      .addCase(registerTeamThunk.fulfilled, (state, action) => {
        const { teamId, details } = action.payload;
        const team = state.data.find((t) => t.id === teamId);
        if (team) {
          //   team.group_competition_details = details;
          team.status = "pending_admin_verification"; // update according to backend
        }
      });
  },
});

export const teamsReducer = teamsSlice.reducer;
