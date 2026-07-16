import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Skeleton width
   * @default '100%'
   */
  width?: string | number;

  /**
   * Skeleton height
   * @default '20px'
   */
  height?: string | number;

  /**
   * Number of lines (for text skeleton)
   */
  lines?: number;

  /**
   * Border radius
   * @default 'md'
   */
  radius?: 'sm' | 'md' | 'lg' | 'full';

  /**
   * Show circle skeleton
   */
  circle?: boolean;
}

/**
 * Skeleton Component
 *
 * Loading placeholder component for content.
 * Useful for skeleton screens while data is loading.
 *
 * @example
 * ```tsx
 * <Skeleton width="100%" height="20px" />
 * <Skeleton circle width="40px" height="40px" />
 * <Skeleton lines={3} />
 * ```
 */
export const Skeleton: FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  lines,
  radius = 'md',
  circle = false,
  className,
  ...props
}) => {
  const radiusStyles = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const baseStyles = 'bg-gradient-to-r from-neutral-200 to-neutral-100 dark:from-neutral-700 dark:to-neutral-600 animate-shimmer';

  if (lines) {
    return (
      <div className="space-y-2" {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseStyles,
              radiusStyles[radius],
              'h-4',
              i === lines - 1 && 'w-4/5'
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseStyles,
        circle ? 'rounded-full' : radiusStyles[radius],
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      {...props}
    />
  );
};
