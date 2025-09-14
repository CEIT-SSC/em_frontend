"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "@ssc/core";
import {
  addItemToCartThunk,
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
    builder.addCase(fetchCartThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.count = action.payload.items.length;
      state.error = null;
      console.log("!@!!!!!!! it's not pending now");
      state.loading = false;
    });
    builder.addCase(fetchCartThunk.rejected, (state, action) => {
      state.items = [];
      state.count = 0;
      state.error = action.payload as string;
      console.log("!@!!!!!!! it's not pending now");
      state.loading = false;
    });
    builder.addCase(addItemToCartThunk.pending, (state) => {
      console.log("!@! it's pending now");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addItemToCartThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.count = action.payload.items.length;
      state.error = null;
      console.log("!@!!!!!!! it's not pending now");
      state.loading = false;
    });
    builder.addCase(addItemToCartThunk.rejected, (state, action) => {
      state.error = action.payload as string;
      console.log("!@!!!!!!! it's not pending now");
      state.loading = false;
    });
    builder.addCase(removeItemFromCartThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.count = action.payload.items.length;
      state.error = null;
      console.log("!@!!!!!!! it's not pending now");
      state.loading = false;
    });
    builder.addCase(removeItemFromCartThunk.rejected, (state, action) => {
      state.error = action.payload as string;
      console.log("!@!!!!!!! it's not pending now");
      state.loading = false;
    });

    builder.addCase(fetchCartThunk.pending, (state) => {
      console.log("!@! it's pending now");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeItemFromCartThunk.pending, (state) => {
      console.log("!@! it's pending now");
      state.loading = true;
      state.error = null;
    });

    // builder.addMatcher(
    //   (action) =>
    //     [
    //       fetchCartThunk.pending,
    //       addItemToCartThunk.pending,
    //       removeItemFromCartThunk,
    //     ].includes(action.type),
    //   (state) => {
    //     console.log("!@! it's pending now");
    //     state.loading = true;
    //     state.error = null;
    //   }
    // );
  },
});

export const {} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
