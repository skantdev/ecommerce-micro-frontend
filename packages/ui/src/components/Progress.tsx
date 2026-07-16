import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Progress percentage (0-100)
   */
  value: number;

  /**
   * Progress bar size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show percentage text
   */
  showLabel?: boolean;

  /**
   * Progress color
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Bar shape
   * @default 'rounded'
   */
  shape?: 'rounded' | 'square';

  /**
   * Show stripe animation
   */
  animated?: boolean;

  /**
   * Progress label
   */
  label?: ReactNode;
}

/**
 * Progress Component
 *
 * Progress bar component with customizable style and animation.
 *
 * @example
 * ```tsx
 * <Progress value={75} label="Upload progress" animated />
 * ```
 */
export const Progress: FC<ProgressProps> = ({
  value,
  size = 'md',
  showLabel = false,
  color = 'primary',
  shape = 'rounded',
  animated = false,
  label,
  className,
  ...props
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const sizeStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colorStyles = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
    info: 'bg-info-500',
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {(label || showLabel) && (
        <div className="flex items-center justify-between mb-2 text-sm">
          {label && <span className="font-medium">{label}</span>}
          {showLabel && <span className="text-neutral-600 dark:text-neutral-400">{clampedValue}%</span>}
        </div>
      )}

      <div
        className={cn(
          'w-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden',
          sizeStyles[size],
          shape === 'rounded' ? 'rounded-full' : 'rounded-none'
        )}
      >
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out',
            colorStyles[color],
            animated && 'bg-gradient-to-r from-current to-current bg-[length:200%_100%] animate-shimmer',
            shape === 'rounded' ? 'rounded-full' : 'rounded-none'
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
