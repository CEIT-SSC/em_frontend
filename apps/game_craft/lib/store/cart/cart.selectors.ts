import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { ItemType } from "@ssc/core";

export const cartSelector = (state: RootState) => state.cart;

export const cartPresentationsSelector = createSelector(
  [cartSelector],
  (cart) => cart.presentations
);

export const cartPresentationsCountSelector = createSelector(
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

export const itemInCartSelector = (id: number, type: ItemType) =>
  createSelector([cartPresentationsSelector], (presentation) => {
    switch (type) {
      case ItemType.PRESENTATION:
        console.log(
          "!@!",
          presentation.findIndex((item) => item.id === id),
          id,
          type
        );
        return presentation.find((item) => item.id === id);
      case ItemType.SOLO_COMPETITION:
        return false;
      case ItemType.COMPETITION_TEAM:
        return false;
      default:
        return false;
    }
  });

export const cartPaymentDataSelector = createSelector(
  [cartSelector],
  (cart) => ({
    total: cart.total,
    subTotal: cart.subTotal,
    discountAmount: cart.discountAmount,
    discountCode: cart.discountCode,
  })
);
