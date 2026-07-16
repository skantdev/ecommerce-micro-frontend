import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface RadioProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Radio group name
   */
  name?: string;

  /**
   * Radio value
   */
  value?: string | number;

  /**
   * Is selected
   */
  checked?: boolean;

  /**
   * Radio label
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
  onChange?: (value: string | number) => void;

  /**
   * Input size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Radio ID
   */
  id?: string;

  /**
   * Helper text
   */
  helperText?: ReactNode;
}

/**
 * Radio Component
 *
 * Accessible radio button with label support and validation states.
 * Use multiple Radio components with the same name for a group.
 *
 * @example
 * ```tsx
 * <Radio name="option" value="a" label="Option A" />
 * <Radio name="option" value="b" label="Option B" />
 * ```
 */
export const Radio: FC<RadioProps> = ({
  name,
  value,
  checked = false,
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
      <label
        className={cn(
          'flex items-center gap-2 cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div className="relative flex items-center">
          <input
            id={id}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className="sr-only"
          />
          <div
            className={cn(
              'border-2 rounded-full transition-smooth flex items-center justify-center',
              sizeStyles[size],
              error
                ? 'border-error-500'
                : checked
                  ? 'border-primary-500'
                  : 'border-neutral-300 dark:border-neutral-600'
            )}
          >
            {checked && (
              <div
                className={cn(
                  'rounded-full bg-primary-500',
                  size === 'sm' && 'w-1.5 h-1.5',
                  size === 'md' && 'w-2 h-2',
                  size === 'lg' && 'w-2.5 h-2.5'
                )}
              />
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
