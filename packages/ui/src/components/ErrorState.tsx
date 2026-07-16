import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Error icon
   */
  icon?: ReactNode;

  /**
   * Error title
   */
  title?: ReactNode;

  /**
   * Error message/description
   */
  message: ReactNode;

  /**
   * Error code
   */
  code?: string | number;

  /**
   * Action buttons
   */
  action?: ReactNode;

  /**
   * Error state size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ErrorState Component
 *
 * Display when an error occurs with icon, message, and action.
 *
 * @example
 * ```tsx
 * <ErrorState
 *   code="500"
 *   title="Server Error"
 *   message="Something went wrong. Please try again later."
 *   action={<Button onClick={retry}>Retry</Button>}
 * />
 * ```
 */
export const ErrorState: FC<ErrorStateProps> = ({
  icon,
  title,
  message,
  code,
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

  const codeSizeStyles = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  const titleSizeStyles = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const messageSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div
      className={cn('flex flex-col items-center justify-center text-center', sizeStyles[size], className)}
      {...props}
    >
      {icon ? (
        <div className={cn('text-error-500', iconSizeStyles[size])}>{icon}</div>
      ) : (
        <svg
          className={cn('text-error-500', iconSizeStyles[size])}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      )}

      {code && (
        <p className={cn('font-bold text-error-600 dark:text-error-400', codeSizeStyles[size])}>
          {code}
        </p>
      )}

      {title && (
        <h3 className={cn('font-semibold text-neutral-900 dark:text-neutral-100', titleSizeStyles[size])}>
          {title}
        </h3>
      )}

      <p className={cn('text-neutral-600 dark:text-neutral-400', messageSizeStyles[size])}>{message}</p>

      {action && <div className="mt-3">{action}</div>}
    </div>
  );
};
