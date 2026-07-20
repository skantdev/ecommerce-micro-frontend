import { useState, useCallback, useRef, useEffect } from 'react';
import type { ProductListItem, PaginatedResponse, ProductFilters as TypeProductFilters, ProductSortBy, ID } from '@repo/types';

export interface UseProductsFilters {
  categoryId?: ID;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: ProductSortBy;
  page?: number;
  limit?: number;
}

export interface UseProductsReturn {
  products: ProductListItem[];
  loading: boolean;
  error: Error | null;
  total: number;
  totalPages: number;
  filters: UseProductsFilters;
  setFilters: (filters: Partial<UseProductsFilters>) => void;
  refresh: () => void;
  reset: () => void;
}

const DEFAULT_FILTERS: UseProductsFilters = {
  page: 1,
  limit: 20,
};

/**
 * useProducts - Fetch and filter products from the API
 *
 * @param fetchFn - API function that accepts filters and returns paginated products
 * @param initialFilters - Initial filter values
 * @returns Product state, filters, and controls
 *
 * @example
 * ```tsx
 * const { products, loading, filters, setFilters } = useProducts(
 *   productApi.list,
 *   { categoryId: 'electronics' },
 * );
 * ```
 */
export function useProducts(
  fetchFn: (filters: UseProductsFilters) => Promise<PaginatedResponse<ProductListItem>>,
  initialFilters: UseProductsFilters = {},
): UseProductsReturn {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFiltersState] = useState<UseProductsFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const fetch = useCallback(
    async (f: ProductFilters) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchFn(f);
        if (isMounted.current) {
          setProducts(response.data);
          setTotal(response.meta.total);
          setTotalPages(response.meta.totalPages);
        }
      } catch (err) {
        if (isMounted.current) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted.current) setLoading(false);
      }
    },
    [fetchFn],
  );

  useEffect(() => {
    fetch(filters);
  }, [fetch, filters]);

  const setFilters = useCallback((partial: Partial<UseProductsFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial, page: 1 }));
  }, []);

  const refresh = useCallback(() => fetch(filters), [fetch, filters]);

  const reset = useCallback(() => {
    const resetFilters = { ...DEFAULT_FILTERS, ...initialFilters };
    setFiltersState(resetFilters);
  }, [initialFilters]);

  return { products, loading, error, total, totalPages, filters, setFilters, refresh, reset };
}
