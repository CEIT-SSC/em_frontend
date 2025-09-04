"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { PresentationsApi, Presentation, PresentationQueryParams } from "@ssc/core";

export interface UsePresentationsParams extends PresentationQueryParams {
  eventId?: number;
  isOnline?: boolean;
  type?: string;
}

export interface UsePresentationsReturn {
  presentations: Presentation[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  hasNext: boolean;
  hasPrevious: boolean;
  count: number;
}

/**
 * Custom hook for fetching presentations with loading states
 */
export function usePresentations(params?: UsePresentationsParams): UsePresentationsReturn {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  // Memoize the API instance to prevent recreation on every render
  const presentationsApi = useMemo(() => new PresentationsApi(), []);

  const fetchPresentations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Map parameters to match API expectations
      const queryParams: PresentationQueryParams = {};

      if (params?.eventId) {
        queryParams.event = params.eventId;
      }

      if (params?.isOnline !== undefined) {
        queryParams.is_online = params.isOnline;
      }

      if (params?.type) {
        queryParams.type = params.type;
      }

      if (params?.page) {
        queryParams.page = params.page;
      }

      if (params?.is_paid !== undefined) {
        queryParams.is_paid = params.is_paid;
      }

      const response = await presentationsApi.getPresentations(queryParams);

      if (response.data && 'results' in response.data) {
        setPresentations(response.data.results);
        setCount(response.data.count);
        setHasNext(!!response.data.next);
        setHasPrevious(!!response.data.previous);
      } else {
        setPresentations([]);
        setCount(0);
        setHasNext(false);
        setHasPrevious(false);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to fetch presentations");
      setError(error);
      setPresentations([]);
      setCount(0);
      setHasNext(false);
      setHasPrevious(false);
    } finally {
      setLoading(false);
    }
  }, [params?.eventId, params?.isOnline, params?.type, params?.page, params?.is_paid, presentationsApi]);

  useEffect(() => {
    fetchPresentations();
  }, [fetchPresentations]);

  return {
    presentations,
    loading,
    error,
    refetch: fetchPresentations,
    hasNext,
    hasPrevious,
    count,
  };
}
