import { FC, InputHTMLAttributes, ReactNode, useState } from 'react';
import { cn } from '../utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input field type
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Input label
   */
  label?: ReactNode;

  /**
   * Help text displayed below input
   */
  helperText?: ReactNode;

  /**
   * Error message
   */
  error?: string;

  /**
   * Show error state
   */
  hasError?: boolean;

  /**
   * Icon to display before text
   */
  icon?: ReactNode;

  /**
   * Icon to display after text
   */
  iconEnd?: ReactNode;

  /**
   * Show password toggle (for password type only)
   */
  showPasswordToggle?: boolean;

  /**
   * Full width input
   */
  fullWidth?: boolean;
}

/**
 * Input Component
 *
 * Flexible input component with variants, sizes, and validation states.
 * Supports labels, helper text, error messages, and icon decoration.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="your@email.com"
 *   error={emailError}
 * />
 * ```
 */
export const Input: FC<InputProps> = ({
  type = 'text',
  size = 'md',
  label,
  helperText,
  error,
  hasError = !!error,
  icon,
  iconEnd,
  showPasswordToggle = type === 'password',
  fullWidth = true,
  className,
  disabled,
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Size styles
  const sizeStyles = {
    sm: 'px-2.5 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-2.5 text-lg',
  };

  // Base input styles
  const baseStyles =
    'w-full border-2 rounded-md transition-smooth focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 disabled:bg-neutral-100 disabled:cursor-not-allowed dark:focus:ring-primary-900';

  const borderStyles = hasError
    ? 'border-error-500 focus:border-error-500 focus:ring-error-200 dark:focus:ring-error-900'
    : 'border-neutral-300 dark:border-neutral-600';

  const currentType = showPassword && type === 'password' ? 'text' : type;

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-neutral-400 pointer-events-none flex items-center">{icon}</span>
        )}

        <input
          id={id}
          type={currentType}
          disabled={disabled}
          className={cn(
            baseStyles,
            sizeStyles[size],
            borderStyles,
            icon && 'pl-9',
            (iconEnd || showPasswordToggle) && 'pr-9',
            className
          )}
          {...props}
        />

        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 p-1"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}

        {iconEnd && !showPasswordToggle && (
          <span className="absolute right-3 text-neutral-400 pointer-events-none flex items-center">
            {iconEnd}
          </span>
        )}
      </div>

      {error && <p className="text-sm text-error-600 dark:text-error-400">{error}</p>}

      {helperText && !error && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{helperText}</p>
      )}
    </div>
  );
};
