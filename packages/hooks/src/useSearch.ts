import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export interface UseSearchOptions<T> {
  /** Items to search through */
  items: T[];
  /** Keys of T to search within */
  keys: (keyof T)[];
  /** Debounce delay in ms */
  debounceMs?: number;
}

export interface UseSearchReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  results: T[];
  isSearching: boolean;
  clear: () => void;
}

/**
 * useSearch - Client-side search with debouncing
 *
 * @param options - { items, keys, debounceMs }
 * @returns { query, setQuery, results, isSearching, clear }
 *
 * @example
 * ```tsx
 * const { query, setQuery, results } = useSearch({
 *   items: products,
 *   keys: ['name', 'description'],
 *   debounceMs: 300,
 * });
 * ```
 */
export function useSearch<T extends Record<string, unknown>>({
  items,
  keys,
  debounceMs = 300,
}: UseSearchOptions<T>): UseSearchReturn<T> {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, debounceMs);

  const isSearching = query !== debouncedQuery;

  const results = useCallback((): T[] => {
    if (!debouncedQuery.trim()) return items;
    const lower = debouncedQuery.toLowerCase();
    return items.filter((item) =>
      keys.some((key) => {
        const val = item[key];
        return typeof val === 'string' && val.toLowerCase().includes(lower);
      }),
    );
  }, [items, keys, debouncedQuery])();

  const clear = useCallback(() => setQuery(''), []);

  return { query, setQuery, results, isSearching, clear };
}
