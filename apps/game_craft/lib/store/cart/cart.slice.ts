"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, Presentation } from "@ssc/core";
import {
  addItemToCartThunk,
  applyBonusCodeThunk,
  fetchCartThunk,
  removeBonusCodeThunk,
  removeItemFromCartThunk,
} from "./cart.thunk";

const initialState = {
  presentations: [] as Presentation[],
  count: 0,
  discountCode: null as string | null,
  discountAmount: 0,
  total: 0,
  subTotal: 0,
  error: null as string | null,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(fetchCartThunk, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.presentations = action.payload.presentations;
        state.count = action.payload.presentations.length;
        state.discountCode = action.payload.discount_code;
        state.discountAmount = action.payload.discount_amount || 0;
        // Handle both PriceObject and plain number formats
        state.subTotal =
          typeof action.payload.subtotal_amount === "object"
            ? action.payload.subtotal_amount?.parsedValue || 0
            : action.payload.subtotal_amount || 0;
        state.total =
          typeof action.payload.total_amount === "object"
            ? action.payload.total_amount?.parsedValue || 0
            : action.payload.total_amount || 0;
        state.error = null;
        state.loading = false;
      },

      rejected: (state, action) => {
        state.presentations = [];
        state.count = 0;
        state.error = action.payload as string;
        state.loading = false;
      },
    });
    builder.addAsyncThunk(addItemToCartThunk, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      rejected: (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      },
    });
    builder.addAsyncThunk(removeItemFromCartThunk, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      rejected: (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      },
    });
    builder.addAsyncThunk(removeBonusCodeThunk, {
      fulfilled: (state, action: PayloadAction<Cart>) => {
        state.discountCode = action.payload.discount_code;
        state.discountAmount = action.payload.discount_amount;
        state.subTotal =
          typeof action.payload.subtotal_amount === "object"
            ? action.payload.subtotal_amount?.parsedValue || 0
            : action.payload.subtotal_amount || 0;
        state.total =
          typeof action.payload.total_amount === "object"
            ? action.payload.total_amount?.parsedValue || 0
            : action.payload.total_amount || 0;
      },
    });
    builder.addAsyncThunk(applyBonusCodeThunk, {
      fulfilled: (state, action: PayloadAction<Cart>) => {
        // state.presentations = action.payload.presentations;
        // state.count = action.payload.presentations.length;
        state.discountCode = action.payload.discount_code;
        state.discountAmount = action.payload.discount_amount;
        // Handle both PriceObject and plain number formats
        state.subTotal =
          typeof action.payload.subtotal_amount === "object"
            ? action.payload.subtotal_amount?.parsedValue || 0
            : action.payload.subtotal_amount || 0;
        state.total =
          typeof action.payload.total_amount === "object"
            ? action.payload.total_amount?.parsedValue || 0
            : action.payload.total_amount || 0;
      },
    });
  },
});

export const {} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
