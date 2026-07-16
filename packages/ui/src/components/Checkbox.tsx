import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface CheckboxProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Checkbox checked state
   */
  checked?: boolean;

  /**
   * Checkbox indeterminate state
   */
  indeterminate?: boolean;

  /**
   * Checkbox label
   */
  label?: ReactNode;

  /**
   * Error state
   */
  error?: string;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Change callback
   */
  onChange?: (checked: boolean) => void;

  /**
   * Input size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Checkbox ID
   */
  id?: string;

  /**
   * Helper text
   */
  helperText?: ReactNode;
}

/**
 * Checkbox Component
 *
 * Accessible checkbox with label support and validation states.
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="Agree to terms"
 *   checked={isChecked}
 *   onChange={setIsChecked}
 * />
 * ```
 */
export const Checkbox: FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  label,
  error,
  disabled = false,
  onChange,
  size = 'md',
  id,
  helperText,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const labelSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      <label className={cn('flex items-center gap-2 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
        <div className="relative flex items-center">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            disabled={disabled}
            className="sr-only"
          />
          <div
            className={cn(
              'border-2 transition-smooth flex items-center justify-center',
              sizeStyles[size],
              error
                ? 'border-error-500 bg-error-50 dark:bg-error-900'
                : checked || indeterminate
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900'
            )}
          >
            {checked && (
              <svg className="w-3/4 h-3/4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {indeterminate && (
              <svg className="w-3/4 h-3/4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
        {label && <span className={cn('font-medium select-none', labelSizeStyles[size])}>{label}</span>}
      </label>

      {error && <p className="text-xs text-error-600 dark:text-error-400">{error}</p>}
      {helperText && !error && <p className="text-xs text-neutral-500 dark:text-neutral-400">{helperText}</p>}
    </div>
  );
};
