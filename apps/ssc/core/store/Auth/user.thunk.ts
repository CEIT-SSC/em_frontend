import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { UserProfileResponse } from "@ssc/core/lib/types/api/User/user";
import { ApiModule } from "@ssc/core/lib/api/ApiModule";

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
          toast.error(error.response?.data?.message || "خطایی رخ داده است");
        }
      } else {
        toast.error("خطایی رخ داده است");
      }
      return rejectWithValue(error);
    }
  }
);
