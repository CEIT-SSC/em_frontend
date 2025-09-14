import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { ItemType} from "@ssc/core";

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

export const itemInCartSelector = (id: number, type: ItemType) =>
  createSelector([cartItemsSelector], (items) =>
    items.find((item) => {
      switch (type) {
        case ItemType.PRESENTATION:
          return item.item_details.presentation?.id === id;
        case ItemType.SOLO_COMPETITION:
          return item.item_details.solo_competition?.id === id;
        case ItemType.COMPETITION_TEAM:
          return item.item_details.competition_team?.leader_details.id === id;
        default:
          return false;
      }
    })
  );

export const cartPaymentDataSelector = createSelector(
  [cartSelector],
  (cart) => ({
    total: cart.total,
    subTotal: cart.subTotal,
    discountAmount: cart.discountAmount,
    discountCode: cart.discountCode,
  })
);
