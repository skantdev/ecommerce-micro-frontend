import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseInfiniteScrollOptions<T> {
  /** Fetch function that receives page number and returns items + hasMore flag */
  fetchFn: (page: number) => Promise<{ items: T[]; hasMore: boolean }>;
  /** Starting page index */
  initialPage?: number;
}

export interface UseInfiniteScrollReturn<T> {
  items: T[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
  /** Ref to attach to the sentinel element for automatic loading */
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * useInfiniteScroll - Load paginated data, appending results on each page
 *
 * Automatically loads more data when the sentinel element enters the viewport.
 *
 * @param options - { fetchFn, initialPage }
 * @returns { items, loading, error, hasMore, loadMore, reset, sentinelRef }
 *
 * @example
 * ```tsx
 * const { items, loading, hasMore, sentinelRef } = useInfiniteScroll({
 *   fetchFn: (page) => productApi.list({ page, limit: 20 }),
 * });
 *
 * return (
 *   <>
 *     {items.map(p => <ProductCard key={p.id} product={p} />)}
 *     {hasMore && <div ref={sentinelRef} />}
 *     {loading && <Loader />}
 *   </>
 * );
 * ```
 */
export function useInfiniteScroll<T>({
  fetchFn,
  initialPage = 1,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const isFetching = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchPage = useCallback(
    async (p: number) => {
      if (isFetching.current || !hasMore) return;
      isFetching.current = true;
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn(p);
        setItems((prev) => (p === initialPage ? result.items : [...prev, ...result.items]));
        setHasMore(result.hasMore);
        setPage(p + 1);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    },
    [fetchFn, hasMore, initialPage],
  );

  // Initial load
  useEffect(() => {
    fetchPage(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intersection Observer to trigger loadMore automatically
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          fetchPage(page);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchPage, hasMore, loading, page]);

  const loadMore = useCallback(() => fetchPage(page), [fetchPage, page]);

  const reset = useCallback(() => {
    setItems([]);
    setPage(initialPage);
    setHasMore(true);
    setError(null);
    isFetching.current = false;
    fetchPage(initialPage);
  }, [fetchPage, initialPage]);

  return { items, loading, error, hasMore, loadMore, reset, sentinelRef };
}
