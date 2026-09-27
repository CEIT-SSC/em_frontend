import { createSlice } from "@reduxjs/toolkit";
import { TeamDetails } from "@ssc/core";
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

      .addCase(payTeamThunk.fulfilled, () => {
        // The thunk refreshes authoritative registration statuses from the API.
      })
      .addCase(registerTeamThunk.fulfilled, () => {
        // Registration can activate a free entry or await approval/payment.
      });
  },
});

export const teamsReducer = teamsSlice.reducer;
