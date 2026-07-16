import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  /**
   * Select options
   */
  options: Array<{
    label: ReactNode;
    value: string | number;
    disabled?: boolean;
  }>;

  /**
   * Select label
   */
  label?: ReactNode;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Helper text
   */
  helperText?: ReactNode;

  /**
   * Error message
   */
  error?: string;

  /**
   * Select size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Full width
   */
  fullWidth?: boolean;

  /**
   * Change callback
   */
  onChange?: (value: string | number) => void;
}

/**
 * Select Component
 *
 * Dropdown select component with options, labels, and validation.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Choose option"
 *   options={[
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' },
 *   ]}
 *   onChange={setSelected}
 * />
 * ```
 */
export const Select: FC<SelectProps> = ({
  options,
  label,
  placeholder = 'Select an option...',
  helperText,
  error,
  size = 'md',
  fullWidth = true,
  onChange,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-2.5 text-lg',
  };

  const baseStyles =
    'w-full border-2 rounded-md transition-smooth focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 disabled:bg-neutral-100 disabled:cursor-not-allowed dark:focus:ring-primary-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100';

  const borderStyles = error
    ? 'border-error-500 focus:border-error-500 focus:ring-error-200 dark:focus:ring-error-900'
    : 'border-neutral-300 dark:border-neutral-600';

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && (
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}

      <select
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(baseStyles, sizeStyles[size], borderStyles, 'appearance-none pr-8', className)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Dropdown Arrow */}
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-neutral-600 dark:text-neutral-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>

      {error && <p className="text-sm text-error-600 dark:text-error-400">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{helperText}</p>
      )}
    </div>
  );
};
