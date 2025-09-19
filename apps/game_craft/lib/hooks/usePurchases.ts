"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchPurchasesThunk } from "../store/purchases/purchases.thunk";
import {
  purchasesLoadingSelector,
  purchasesErrorSelector,
  purchasedPresentationsSelector,
  isPresentationPurchasedSelector,
} from "../store/purchases/purchases.selectors";
import { useAuth } from "./useAuth";

export function usePurchases() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const loading = useAppSelector(purchasesLoadingSelector);
  const error = useAppSelector(purchasesErrorSelector);
  const presentations = useAppSelector(purchasedPresentationsSelector);

  useEffect(() => {
    // Only fetch purchases if user is authenticated and we haven't loaded yet
    if (isAuthenticated && presentations.length === 0 && !loading && !error) {
      dispatch(fetchPurchasesThunk());
    }
  }, [dispatch, isAuthenticated, presentations.length, loading, error]);

  return {
    presentations,
    loading,
    error,
    isAuthenticated,
  };
}

export function useIsPresentationPurchased(presentationId: number) {
  const isPurchased = useAppSelector(isPresentationPurchasedSelector(presentationId));
  const { isAuthenticated } = useAuth();

  // Only return true if user is authenticated and has purchased
  return isAuthenticated && isPurchased;
}
