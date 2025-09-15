"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "@ssc/core";
import {
  addItemToCartThunk,
  applyBonusCodeThunk,
  fetchCartThunk,
  removeItemFromCartThunk,
} from "./cart.thunk";

const initialState = {
  items: [] as CartItem[],
  count: 0,
  discountCode: null as string | null,
  discountAmount: 0,
  total: 0,
  subTotal: 0,
  error: null as string | null,
  loading: true,
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
        state.items = action.payload.items;
        state.count = action.payload.items.length;
        state.error = null;
        state.loading = false;
      },

      rejected: (state, action) => {
        state.items = [];
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
      fulfilled: (state, action) => {
        state.items = action.payload.items;
        state.count = action.payload.items.length;
        state.error = null;
        state.loading = false;
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
      fulfilled: (state, action) => {
        state.items = action.payload.items;
        state.count = action.payload.items.length;
        state.error = null;
        state.loading = false;
      },
      rejected: (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      },
    });
    builder.addAsyncThunk(applyBonusCodeThunk, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action: PayloadAction<Cart>) => {
        state.items = action.payload.items;
        state.count = action.payload.items.length;
        // state.discountCode = action.payload.discountCode;
        // state.discountAmount = action.payload.discountAmount;
        // state.subTotal = action.payload.subTotal;
        // state.total = action.payload.total;
        state.error = null;
        state.loading = false;
      },
      rejected: (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      },
    });
  },
});

export const {} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
