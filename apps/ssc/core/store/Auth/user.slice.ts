import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserData } from "./user.thunk";
import { boolean } from "zod";
import { UserProfileResponse } from "@ssc/core/lib/types/api/User/user";

type UserState = {
  loading: boolean;
  loggedIn: boolean;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  date_joined?: string;
  email?: string;
  profile_picture?: string;
};

const defaultState: UserState = {
  loading: false,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      console.log("!@! satte:", state, action.payload);
      return { ...action.payload, loading: false, loggedIn: true };
    });
    builder.addCase(fetchUserData.rejected, () => {
      return { loading: false, loggedIn: false };
    });
  },
});

export const user = userSlice.actions;
