import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { ApiModule, UserProfileResponse } from "@ssc/core";

export const fetchUserData = createAsyncThunk<
  UserProfileResponse,
  void,
  { extra: { Api: ApiModule } }
>(
  "user/fetchUserData",
  async (_: void, { extra: { Api }, rejectWithValue }) => {
    try {
      const response = await Api.profile.getProfile();
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.status !== 401) {
          toast.error(error.response?.data?.message || "این بار انجام نشد. دوباره تلاش کنید.");
        }
      } else {
        toast.error("این بار انجام نشد. دوباره تلاش کنید.");
      }
      return rejectWithValue(error);
    }
  }
);
