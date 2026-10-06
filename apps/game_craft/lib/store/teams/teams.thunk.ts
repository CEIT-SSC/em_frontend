import { TeamDetails } from "@ssc/core";
import { createAppAsyncThunk } from "../createAppAsyncThunk";

export const fetchTeamsThunk = createAppAsyncThunk(
  "teams/fetchTeams",
  async (_, { extra: { Api } }) => {
    const res = await Api.teams.getTeamsList();
    return res.data.data.results as TeamDetails[];
  }
);

export const payTeamThunk = createAppAsyncThunk(
  "teams/payTeam",
  async ({ teamId, competitionId }: { teamId: number; competitionId: number },
    { extra: { Api }, rejectWithValue, dispatch }) => {
    try {
      const res = await Api.teams.teamPayment(teamId, competitionId);
      await dispatch(fetchTeamsThunk());

      if (res.status === 200) {
        return { teamId, paymentUrl: res.data.data.payment_url };
      }

      if (res.status === 204) {
        // it's free
      }

      return { teamId };
    } catch (err) {
      console.log(err);
      if (err.status == 403)
        return rejectWithValue({
          code: err.status,
          message: "تنها سرگروه مجاز به پرداخت میباشد",
        });
      return rejectWithValue({
        code: err.response?.status ?? 500,
        message: "پرداخت ناموفق بود",
      });
    }
  }
);

export const registerTeamThunk = createAppAsyncThunk(
  "teams/registerTeam",
  async (
    { teamId, competitionId }: { teamId: number; competitionId: number },
    { extra: { Api }, rejectWithValue, dispatch }
  ) => {
    try {
      const res = await Api.teams.registerCompetition(teamId, competitionId);
      const responseData = res.data.data;
      await dispatch(fetchTeamsThunk());

      return {
        teamId,
        message:
          (responseData && typeof responseData === "object" && "message" in responseData
            ? String(responseData.message)
            : undefined) ||
          res.data.message ||
          "Team registered successfully",
      };
    } catch (err) {
      if (err.response?.status === 403) {
        return rejectWithValue({
          code: 403,
          message: "تنها سرگروه مجاز به ثبت تیم می باشد",
        });
      }
      if (err.response?.status === 400) {
        return rejectWithValue({
          code: 400,
          message: err.response?.data?.message || "خطای نامشخص",
        });
      }
      return rejectWithValue({ code: 500, message: "خطای ناشناخته" });
    }
  }
);
