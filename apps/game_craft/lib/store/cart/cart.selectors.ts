import e from "express";
import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const cartSelector = (state: RootState) => state.cart;

export const cartItemsSelector = createSelector(
  [cartSelector],
  (cart) => cart.items
);

export const cartItemsCountSelector = createSelector(
  [cartSelector],
  (cart) => cart.count
);

export const cartErrorSelector = createSelector(
  [cartSelector],
  (cart) => cart.error
);

export const cartLoadingSelector = createSelector(
  [cartSelector],
  (cart) => cart.loading
);

export const itemInCartSelector = (id: number) =>
  createSelector([cartItemsSelector], (items) =>
    items.find((item) => item.object_id === id)
  );
