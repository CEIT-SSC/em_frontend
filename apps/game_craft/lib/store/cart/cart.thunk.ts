"use client";

import { eventId } from "lib/utils/constants";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Cart, ItemType } from "@ssc/core";

export const fetchCartThunk = createAppAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.Api.shop.fetchCart(eventId);
      const data = response.data.data;
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addItemToCartThunk = createAppAsyncThunk(
  "cart/addItem",
  async (params: { item_type: ItemType; item_id: number }, thunkAPI) => {
    try {
      await thunkAPI.extra.Api.shop.addItem(params.item_type, params.item_id);
      thunkAPI.dispatch(fetchCartThunk());
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeItemFromCartThunk = createAppAsyncThunk(
  "cart/removeItem",
  async (args: { item_id: number; item_type: ItemType }, thunkAPI) => {
    try {
      thunkAPI.extra.Api.shop.removeItem(args.item_id, args.item_type);
      thunkAPI.dispatch(fetchCartThunk());
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const applyBonusCodeThunk = createAppAsyncThunk(
  "cart/applyBonusCode",
  async (code: string, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.Api.shop.applyDiscountCode(code);
      const data = response.data.data;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeBonusCodeThunk = createAppAsyncThunk(
  "cart/removeBonusCode",
  async (parameters: void, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.Api.shop.removeDiscountCode();
      const data = response.data.data;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
