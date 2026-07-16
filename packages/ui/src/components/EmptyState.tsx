import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Empty state icon/image
   */
  icon?: ReactNode;

  /**
   * Title text
   */
  title: ReactNode;

  /**
   * Description text
   */
  description?: ReactNode;

  /**
   * Action buttons
   */
  action?: ReactNode;

  /**
   * Empty state size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * EmptyState Component
 *
 * Display when no data is available with icon, message, and action.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   title="No products found"
 *   description="Try searching with different keywords"
 *   action={<Button>Clear filters</Button>}
 * />
 * ```
 */
export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  size = 'md',
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'py-8 gap-2',
    md: 'py-12 gap-3',
    lg: 'py-16 gap-4',
  };

  const iconSizeStyles = {
    sm: 'w-12 h-12 mb-2',
    md: 'w-16 h-16 mb-3',
    lg: 'w-20 h-20 mb-4',
  };

  const titleSizeStyles = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const descriptionSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div
      className={cn('flex flex-col items-center justify-center text-center text-neutral-600 dark:text-neutral-400', sizeStyles[size], className)}
      {...props}
    >
      {icon && <div className={cn('text-neutral-400 dark:text-neutral-600', iconSizeStyles[size])}>{icon}</div>}

      <h3 className={cn('font-semibold text-neutral-900 dark:text-neutral-100', titleSizeStyles[size])}>{title}</h3>

      {description && <p className={descriptionSizeStyles[size]}>{description}</p>}

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};
