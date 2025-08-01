"use client";

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(url: string): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // useEffect cannot be async directly, so we define an async function inside
    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });
      try {
        const response = await api(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setState({ data: result, loading: false, error: null });
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error });
      }
    };

    fetchData();
  }, [url]); // Re-run the effect if the URL changes

  return state;
}