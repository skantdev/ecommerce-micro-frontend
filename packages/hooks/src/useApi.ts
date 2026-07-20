import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseApiOptions<T> {
  /** Fetch immediately on mount */
  immediate?: boolean;
  /** Initial data */
  initialData?: T;
  /** Called on success */
  onSuccess?: (data: T) => void;
  /** Called on error */
  onError?: (error: Error) => void;
}

export interface UseApiReturn<T, Args extends unknown[]> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  execute: (...args: Args) => Promise<T | undefined>;
  reset: () => void;
}

/**
 * useApi - Generic hook for async API calls with loading/error state
 *
 * @param fn - Async function to call
 * @param options - Options (immediate, onSuccess, onError, initialData)
 * @returns { data, loading, error, execute, reset }
 *
 * @example
 * ```tsx
 * const { data, loading, error, execute } = useApi(
 *   (id: string) => apiClient.get(`/products/${id}`),
 * );
 *
 * useEffect(() => { execute(productId); }, [productId]);
 * ```
 */
export function useApi<T, Args extends unknown[]>(
  fn: (...args: Args) => Promise<T>,
  options: UseApiOptions<T> = {},
): UseApiReturn<T, Args> {
  const { initialData, onSuccess, onError } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Track if still mounted to prevent setting state on unmounted component
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args: Args): Promise<T | undefined> => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(...args);
        if (isMounted.current) {
          setData(result);
          onSuccess?.(result);
        }
        return result;
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        if (isMounted.current) {
          setError(e);
          onError?.(e);
        }
        return undefined;
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fn],
  );

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
  }, [initialData]);

  return { data, loading, error, execute, reset };
}
