import { FC, TextareaHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Textarea label
   */
  label?: ReactNode;

  /**
   * Help text displayed below textarea
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
   * Resize behavior
   * @default 'vertical'
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';

  /**
   * Textarea size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Full width textarea
   */
  fullWidth?: boolean;

  /**
   * Minimum rows
   * @default 4
   */
  rows?: number;

  /**
   * Character limit
   */
  maxLength?: number;

  /**
   * Show character count
   */
  showCount?: boolean;
}

/**
 * Textarea Component
 *
 * Multi-line text input component with label, helper text, and validation.
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Message"
 *   placeholder="Enter your message"
 *   rows={5}
 *   maxLength={500}
 *   showCount
 * />
 * ```
 */
export const Textarea: FC<TextareaProps> = ({
  label,
  helperText,
  error,
  hasError = !!error,
  resize = 'vertical',
  size = 'md',
  fullWidth = true,
  rows = 4,
  maxLength,
  showCount = false,
  className,
  value,
  disabled,
  id,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-2.5 text-lg',
  };

  const resizeStyles = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  const baseStyles =
    'w-full border-2 rounded-md transition-smooth focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 disabled:bg-neutral-100 disabled:cursor-not-allowed dark:focus:ring-primary-900 dark:bg-neutral-900 dark:text-neutral-100 font-family-mono';

  const borderStyles = hasError
    ? 'border-error-500 focus:border-error-500 focus:ring-error-200 dark:focus:ring-error-900'
    : 'border-neutral-300 dark:border-neutral-600';

  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}

      <textarea
        id={id}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        value={value}
        className={cn(baseStyles, sizeStyles[size], borderStyles, resizeStyles[resize], className)}
        {...props}
      />

      <div className="flex items-center justify-between gap-2">
        <div>
          {error && <p className="text-sm text-error-600 dark:text-error-400">{error}</p>}
          {helperText && !error && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{helperText}</p>
          )}
        </div>

        {showCount && maxLength && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};
