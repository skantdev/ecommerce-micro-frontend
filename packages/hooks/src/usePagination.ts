import { useCallback, useMemo, useState } from 'react';

export interface UsePaginationOptions {
  /** Total number of items */
  total: number;
  /** Items per page */
  pageSize?: number;
  /** Initial page (1-indexed) */
  initialPage?: number;
  /** Sibling pages shown around current page */
  siblings?: number;
}

export interface UsePaginationReturn {
  /** Current page (1-indexed) */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Total pages */
  totalPages: number;
  /** Total items */
  total: number;
  /** Offset for data slicing */
  offset: number;
  /** Pages array including ellipsis markers */
  pages: (number | '...')[];
  /** Whether previous page exists */
  hasPrev: boolean;
  /** Whether next page exists */
  hasNext: boolean;
  /** Navigate to specific page */
  setPage: (page: number) => void;
  /** Go to previous page */
  prev: () => void;
  /** Go to next page */
  next: () => void;
  /** Go to first page */
  first: () => void;
  /** Go to last page */
  last: () => void;
  /** Update items per page */
  setPageSize: (size: number) => void;
}

/**
 * usePagination - Full-featured pagination state management
 *
 * @param options - Pagination configuration
 * @returns Pagination state and controls
 *
 * @example
 * ```tsx
 * const pagination = usePagination({ total: 100, pageSize: 10 });
 *
 * return (
 *   <>
 *     <Table rows={data.slice(pagination.offset, pagination.offset + pagination.pageSize)} />
 *     <Pagination
 *       current={pagination.page}
 *       total={pagination.totalPages}
 *       onChange={pagination.setPage}
 *     />
 *   </>
 * );
 * ```
 */
export function usePagination({
  total,
  pageSize: initialPageSize = 10,
  initialPage = 1,
  siblings = 1,
}: UsePaginationOptions): UsePaginationReturn {
  const [page, setPageState] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const setPage = useCallback(
    (p: number) => {
      setPageState(Math.min(Math.max(1, p), totalPages));
    },
    [totalPages],
  );

  const prev = useCallback(() => setPage(page - 1), [page, setPage]);
  const next = useCallback(() => setPage(page + 1), [page, setPage]);
  const first = useCallback(() => setPage(1), [setPage]);
  const last = useCallback(() => setPage(totalPages), [totalPages, setPage]);

  const setPageSize = useCallback(
    (size: number) => {
      setPageSizeState(size);
      setPageState(1);
    },
    [],
  );

  const pages = useMemo<(number | '...')[]>(() => {
    const range = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    if (totalPages <= 5 + siblings * 2) {
      return range(1, totalPages);
    }

    const leftBound = Math.max(2, page - siblings);
    const rightBound = Math.min(totalPages - 1, page + siblings);

    const showLeftDots = leftBound > 2;
    const showRightDots = rightBound < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      return [...range(1, 3 + siblings * 2), '...', totalPages];
    }
    if (showLeftDots && !showRightDots) {
      return [1, '...', ...range(totalPages - (3 + siblings * 2) + 1, totalPages)];
    }
    return [1, '...', ...range(leftBound, rightBound), '...', totalPages];
  }, [page, totalPages, siblings]);

  return {
    page,
    pageSize,
    totalPages,
    total,
    offset: (page - 1) * pageSize,
    pages,
    hasPrev: page > 1,
    hasNext: page < totalPages,
    setPage,
    prev,
    next,
    first,
    last,
    setPageSize,
  };
}
