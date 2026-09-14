import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { ItemType } from "@ssc/core";

export const cartSelector = (state: RootState) => state.cart;

export const cartPresentationsSelector = createSelector(
  [cartSelector],
  (cart) => cart.presentations
);

export type CartDisplayItem = {
  id: number;
  title: string;
  price: string;
  image?: string | null;
  itemType: ItemType;
};

export const cartItemsSelector = createSelector([cartSelector], (cart): CartDisplayItem[] => [
  ...cart.presentations.map((presentation) => ({
    id: presentation.id,
    title: presentation.title,
    price: presentation.price,
    image: presentation.poster,
    itemType: ItemType.PRESENTATION,
  })),
  ...cart.packs.map((pack) => ({
    id: pack.id,
    title: pack.name,
    price: pack.real_price,
    image: pack.image,
    itemType: ItemType.PACK,
  })),
]);

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
  createSelector([cartSelector], (cart) => {
    switch (type) {
      case ItemType.PRESENTATION:
        return cart.presentations.find((item) => item.id === id);
      case ItemType.SOLO_COMPETITION:
        return false;
      case ItemType.COMPETITION_TEAM:
        return false;
      case ItemType.PACK:
        return cart.packs.find((item) => item.id === id);
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
