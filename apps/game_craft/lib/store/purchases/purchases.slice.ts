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

        // Flatten all presentations from all purchase items
        state.presentations = action.payload.results.flatMap(item => item.presentations);
        state.soloCompetitions = action.payload.results.flatMap(item => item.solo_competitions);
        state.products = action.payload.results.flatMap(item => item.products);
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
