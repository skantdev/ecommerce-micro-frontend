import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant/style
   * @default 'elevated'
   */
  variant?: 'elevated' | 'outlined' | 'filled';

  /**
   * Card header content
   */
  header?: ReactNode;

  /**
   * Card footer content
   */
  footer?: ReactNode;

  /**
   * Card body content
   */
  children?: ReactNode;

  /**
   * Add hover effect
   */
  interactive?: boolean;

  /**
   * Padding size
   * @default 'md'
   */
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Card Component
 *
 * Container component for organizing content with optional header/footer.
 * Supports multiple variants and hover effects.
 *
 * @example
 * ```tsx
 * <Card header="Title" footer="Footer">
 *   Card content here
 * </Card>
 * ```
 */
export const Card: FC<CardProps> = ({
  variant = 'elevated',
  header,
  footer,
  children,
  interactive = false,
  padding = 'md',
  className,
  ...props
}) => {
  const paddingStyles = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variantStyles = {
    elevated: 'bg-white dark:bg-neutral-900 shadow-md',
    outlined: 'bg-white dark:bg-neutral-950 border-2 border-neutral-200 dark:border-neutral-700',
    filled: 'bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700',
  };

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden transition-smooth',
        variantStyles[variant],
        interactive && 'hover:shadow-lg hover:scale-[1.02] cursor-pointer',
        className
      )}
      {...props}
    >
      {header && (
        <div className={cn('border-b border-neutral-200 dark:border-neutral-700', paddingStyles[padding])}>
          {typeof header === 'string' ? <h3 className="font-semibold text-lg">{header}</h3> : header}
        </div>
      )}

      <div className={paddingStyles[padding]}>{children}</div>

      {footer && (
        <div className={cn('border-t border-neutral-200 dark:border-neutral-700', paddingStyles[padding])}>
          {footer}
        </div>
      )}
    </div>
  );
};
