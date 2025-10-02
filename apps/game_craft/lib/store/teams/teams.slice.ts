import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { TeamDetails } from "@ssc/core/lib/types/api/Teams/teams";

interface TeamsState {
  loading: boolean;
  error?: string | null;
  data: TeamDetails[];
}

const initialState: TeamsState = {
  loading: false,
  error: null,
  data: [],
};

export const fetchTeams = createAppAsyncThunk(
  "teams/fetchTeams",
  async (_, { extra: { Api } }) => {
    const res = await Api.teams.getTeamsList();
    return res.data.data.results as TeamDetails[];
  }
);

export const payTeam = createAppAsyncThunk(
  "teams/payTeam",
  async (teamId: number, { extra: { Api }, rejectWithValue }) => {
    try {
      const res = await Api.teams.teamPayment(teamId);

      if (res.status === 200) {
        return { teamId, paymentUrl: res.data.data.data.payment_url };
      }

      if (res.status === 204) {
        // it's free
      }

      return { teamId };
    } catch (err: any) {
      return rejectWithValue({
        code: err.response?.status ?? 500,
        message: "پرداخت ناموفق بود",
      });
    }
  }
);

export const registerTeam = createAppAsyncThunk(
  "teams/registerTeam",
  async (
    { teamId, competitionId }: { teamId: number; competitionId: number },
    { extra: { Api }, rejectWithValue }
  ) => {
    try {
      const res = await Api.teams.registerCompetition(teamId, competitionId);

      return {
        teamId,
        details: res.data,
        message: "تیم در مسابقه ثبت شد و آماده پرداخت است",
      };
    } catch (err: any) {
      if (err.response?.status === 403) {
        return rejectWithValue({
          code: 403,
          message: "تنها سرگروه مجاز به ثبت تیم می باشد",
        });
      }
      if (err.response?.status === 400) {
        return rejectWithValue({
          code: 400,
          message: "شما قبلا در این مسابقه ثبت نام کرده اید",
        });
      }
      return rejectWithValue({ code: 500, message: "خطای ناشناخته" });
    }
  }
);

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch teams";
      })

      .addCase(payTeam.fulfilled, (state, action) => {
        const team = state.data.find((t) => t.id === action.payload.teamId);
        if (team) team.status = "awaiting_payment_confirmation";
      })

      .addCase(registerTeam.fulfilled, (state, action) => {
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
