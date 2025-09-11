"use client";

import { useState, useEffect, useCallback } from "react";

export interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface UseFetchOptions<T> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for data fetching with loading states
 * @param apiFunc - The API function to call
 * @param params - Parameters to pass to the API function
 * @param options - Additional options for the fetch behavior
 */
export function useFetch<T = unknown, P = unknown>(
  apiFunc: (params?: P) => Promise<T>,
  params?: P,
  options: UseFetchOptions<T> = {}
): UseFetchState<T> & { refetch: (newParams?: P) => Promise<void> } {
  const { immediate = true, onSuccess, onError } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (fetchParams?: P) => {
      try {
        setLoading(true);
        setError(null);

        console.log("!@! repsonse", fetchParams || params);
        const response = await apiFunc(fetchParams || params);
        setData(response);

        if (onSuccess) {
          onSuccess(response);
        }
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("An unknown error occurred");
        setError(error);

        if (onError) {
          onError(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [apiFunc, params, onSuccess, onError]
  );

  const refetch = useCallback(
    async (newParams?: P) => {
      await fetchData(newParams);
    },
    [fetchData]
  );

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch };
}

export default useFetch;
