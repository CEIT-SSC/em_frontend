"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PresentationOverview, SoloCompetition, Product } from "@ssc/core";
import { fetchPurchasesThunk } from "./purchases.thunk";

interface PurchasesState {
  presentations: PresentationOverview[];
  soloCompetitions: SoloCompetition[];
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: PurchasesState = {
  presentations: [],
  soloCompetitions: [],
  products: [],
  loading: false,
  error: null,
};

const purchasesSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(fetchPurchasesThunk, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.error = null;

        // Direct access to presentations from the API response
        state.presentations = action.payload.presentations || [];
        state.soloCompetitions = action.payload.solo_competitions || [];
        state.products = action.payload.products || [];
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.presentations = [];
        state.soloCompetitions = [];
        state.products = [];
      },
    });
  },
});

export const purchasesReducer = purchasesSlice.reducer;
