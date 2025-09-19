import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const purchasesSelector = (state: RootState) => state.purchases;

export const purchasedPresentationsSelector = createSelector(
  [purchasesSelector],
  (purchases) => purchases.presentations
);

export const purchasedSoloCompetitionsSelector = createSelector(
  [purchasesSelector],
  (purchases) => purchases.soloCompetitions
);

export const purchasedProductsSelector = createSelector(
  [purchasesSelector],
  (purchases) => purchases.products
);

export const purchasesLoadingSelector = createSelector(
  [purchasesSelector],
  (purchases) => purchases.loading
);

export const purchasesErrorSelector = createSelector(
  [purchasesSelector],
  (purchases) => purchases.error
);

// Filter presentations by type for workshops and talks
export const workshopsSelector = createSelector(
  [purchasedPresentationsSelector],
  (presentations) => presentations.filter(p => p.type === "workshop" || p.type === "course")
);

export const talksSelector = createSelector(
  [purchasedPresentationsSelector],
  (presentations) => presentations.filter(p => p.type === "talk")
);

// Check if a specific presentation is purchased
export const isPresentationPurchasedSelector = (presentationId: number) =>
  createSelector(
    [purchasedPresentationsSelector],
    (presentations) => presentations.some(p => p.id === presentationId)
  );
