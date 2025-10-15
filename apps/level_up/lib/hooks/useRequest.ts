import React from "react";

export const useFetch = <T>(apiMethod: (...args) => Promise<T>) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiMethod(...args);
      setData(response);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
