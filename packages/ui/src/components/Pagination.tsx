import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Current page (1-indexed)
   */
  current: number;

  /**
   * Total number of pages
   */
  total: number;

  /**
   * Number of page buttons to show
   * @default 5
   */
  siblings?: number;

  /**
   * Page change callback
   */
  onChange: (page: number) => void;

  /**
   * Show previous/next buttons
   * @default true
   */
  showNavigation?: boolean;

  /**
   * Pagination size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Disabled state
   */
  disabled?: boolean;
}

/**
 * Pagination Component
 *
 * Pagination control with customizable page range.
 *
 * @example
 * ```tsx
 * <Pagination current={1} total={10} onChange={setPage} />
 * ```
 */
export const Pagination: FC<PaginationProps> = ({
  current,
  total,
  siblings = 5,
  onChange,
  showNavigation = true,
  size = 'md',
  disabled = false,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  // Calculate page range
  const getPages = () => {
    const pages: (number | string)[] = [];
    let start = Math.max(1, current - Math.floor(siblings / 2));
    let end = Math.min(total, start + siblings - 1);

    if (end - start + 1 < siblings) {
      start = Math.max(1, end - siblings + 1);
    }

    // First page
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Last page
    if (end < total) {
      if (end < total - 1) pages.push('...');
      pages.push(total);
    }

    return pages;
  };

  const pages = getPages();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= total && !disabled) {
      onChange(page);
    }
  };

  const baseButtonClass =
    'border border-neutral-300 dark:border-neutral-600 rounded transition-smooth hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {/* Previous Button */}
      {showNavigation && (
        <button
          onClick={() => handlePageChange(current - 1)}
          disabled={current === 1 || disabled}
          className={cn(baseButtonClass, sizeStyles[size])}
          aria-label="Previous page"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            disabled={typeof page !== 'number' || disabled}
            className={cn(
              baseButtonClass,
              sizeStyles[size],
              'font-medium',
              typeof page === 'number' &&
                page === current &&
                'bg-primary-500 text-white border-primary-500 hover:bg-primary-600'
            )}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      {showNavigation && (
        <button
          onClick={() => handlePageChange(current + 1)}
          disabled={current === total || disabled}
          className={cn(baseButtonClass, sizeStyles[size])}
          aria-label="Next page"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
