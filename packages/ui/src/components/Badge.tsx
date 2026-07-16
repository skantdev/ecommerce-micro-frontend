import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge variant/style
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

  /**
   * Badge size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Badge children
   */
  children: ReactNode;

  /**
   * Icon to display before text
   */
  icon?: ReactNode;

  /**
   * Removable badge with close button
   */
  onRemove?: () => void;
}

/**
 * Badge Component
 *
 * Small label component for displaying status, tags, or counts.
 * Supports multiple variants and sizes.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="sm">Error</Badge>
 * ```
 */
export const Badge: FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  onRemove,
  className,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200',
    success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200',
    error: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200',
    warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200',
    info: 'bg-info-100 text-info-800 dark:bg-info-900 dark:text-info-200',
    neutral: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
    lg: 'px-3 py-1.5 text-base gap-2',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          type="button"
          className="ml-1 hover:opacity-70 transition-smooth p-0 h-4 w-4 flex items-center justify-center"
          tabIndex={-1}
        >
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};
