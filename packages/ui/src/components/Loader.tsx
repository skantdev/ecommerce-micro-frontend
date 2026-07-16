import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Loader size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Loader type
   * @default 'spinner'
   */
  type?: 'spinner' | 'dots' | 'bars';

  /**
   * Loading text
   */
  text?: ReactNode;

  /**
   * Loader color
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info';

  /**
   * Full screen loader
   */
  fullScreen?: boolean;

  /**
   * Overlay background
   */
  overlay?: boolean;
}

/**
 * Loader Component
 *
 * Loading indicator component with multiple variants.
 * Can be displayed inline or as a full-screen overlay.
 *
 * @example
 * ```tsx
 * <Loader size="lg" text="Loading..." />
 * <Loader type="dots" fullScreen overlay />
 * ```
 */
export const Loader: FC<LoaderProps> = ({
  size = 'md',
  type = 'spinner',
  text,
  color = 'primary',
  fullScreen = false,
  overlay = false,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorStyles = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    success: 'text-success-500',
    error: 'text-error-500',
    info: 'text-info-500',
  };

  const loaderContent = (
    <div className={cn('flex flex-col items-center gap-2', className)} {...props}>
      {type === 'spinner' && (
        <svg
          className={cn('animate-spin', sizeStyles[size], colorStyles[color])}
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

      {type === 'dots' && (
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'rounded-full animate-pulse',
                sizeStyles[size],
                colorStyles[color],
                i === 1 && 'animation-delay-100',
                i === 2 && 'animation-delay-200'
              )}
              style={{
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </div>
      )}

      {type === 'bars' && (
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn('rounded animate-pulse', colorStyles[color])}
              style={{
                width: '4px',
                height: `${(i + 1) * 8}px`,
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </div>
      )}

      {text && <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={cn(
          'fixed inset-0 flex items-center justify-center',
          overlay ? 'bg-black/50 dark:bg-black/70' : 'bg-transparent'
        )}
        {...props}
      >
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};
