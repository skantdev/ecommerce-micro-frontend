import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface SwitchProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Switch is enabled
   */
  enabled?: boolean;

  /**
   * Switch label
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
  onChange?: (enabled: boolean) => void;

  /**
   * Switch size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Switch ID
   */
  id?: string;

  /**
   * Helper text
   */
  helperText?: ReactNode;
}

/**
 * Switch Component
 *
 * Toggle switch component with label support and validation states.
 *
 * @example
 * ```tsx
 * <Switch
 *   label="Enable notifications"
 *   enabled={isEnabled}
 *   onChange={setIsEnabled}
 * />
 * ```
 */
export const Switch: FC<SwitchProps> = ({
  enabled = false,
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
    sm: { container: 'w-8 h-4 gap-0.5', thumb: 'w-3 h-3', translate: 'translate-x-3.5' },
    md: { container: 'w-10 h-5 gap-0.5', thumb: 'w-4 h-4', translate: 'translate-x-4.5' },
    lg: { container: 'w-12 h-6 gap-0.5', thumb: 'w-5 h-5', translate: 'translate-x-5.5' },
  };

  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      <label
        className={cn(
          'flex items-center gap-3 cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div className="relative flex items-center">
          <input
            id={id}
            type="checkbox"
            checked={enabled}
            onChange={(e) => onChange?.(e.target.checked)}
            disabled={disabled}
            className="sr-only"
          />
          <div
            className={cn(
              'rounded-full transition-smooth flex items-center',
              sizeStyles[size].container,
              error
                ? 'bg-error-100 dark:bg-error-900'
                : enabled
                  ? 'bg-primary-500'
                  : 'bg-neutral-300 dark:bg-neutral-600'
            )}
          >
            <div
              className={cn(
                'rounded-full bg-white dark:bg-neutral-100 transition-transform',
                sizeStyles[size].thumb,
                enabled && sizeStyles[size].translate
              )}
            />
          </div>
        </div>
        {label && <span className="font-medium select-none">{label}</span>}
      </label>

      {error && <p className="text-xs text-error-600 dark:text-error-400">{error}</p>}
      {helperText && !error && <p className="text-xs text-neutral-500 dark:text-neutral-400">{helperText}</p>}
    </div>
  );
};
