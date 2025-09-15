"use client";

import { createSlice } from "@reduxjs/toolkit";
import { ItemType } from "antd/es/menu/interface";

type orderStateType = {
  id: number;
  order_id: string;
  totalAmount: number;
  status: "pending_payment";
  createdAt: string;
  paidAt: string;
  items: {
    id: number;
    description: string;
    price: string;
    content_type: number;
    object_id: number;
    event_id: number;
    item_type: ItemType;
    item_title: string;
  }[];
};

const initialState = {
  id: 0,
  order_id: "",
  totalAmount: 0,
} as orderStateType;

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
