import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

  /**
   * Button size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show loading state
   */
  loading?: boolean;

  /**
   * Button content
   */
  children: ReactNode;

  /**
   * Full width button
   */
  fullWidth?: boolean;

  /**
   * Icon to display before text (optional)
   */
  icon?: ReactNode;

  /**
   * Icon to display after text (optional)
   */
  iconEnd?: ReactNode;
}

/**
 * Button Component
 *
 * Versatile button component with multiple variants and sizes.
 * Supports loading states, icons, and full-width layouts.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" size="lg" loading={isLoading}>Loading...</Button>
 * ```
 */
export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconEnd,
  children,
  className,
  type = 'button',
  ...props
}) => {
  // Base button styles
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-smooth focus-ring disabled:opacity-50 disabled:cursor-not-allowed rounded-md';

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700',
    outline:
      'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100 dark:hover:bg-primary-900 dark:active:bg-primary-800',
    ghost: 'text-primary-600 hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-primary-900 dark:active:bg-primary-800',
    danger: 'bg-error-500 text-white hover:bg-error-600 active:bg-error-700',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && <span>{icon}</span>}
      {children}
      {iconEnd && <span>{iconEnd}</span>}
    </button>
  );
};
