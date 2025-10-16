"use client";

import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { PurchasesResponse } from "@ssc/core";
import {eventId} from "../../utils/constants";

export const fetchPurchasesThunk = createAppAsyncThunk(
  "purchases/fetchPurchases",
  async (_, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.Api.purchases.fetchPurchases(eventId);
      const data = response.data.data;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to fetch purchases"
      );
    }
  }
);
