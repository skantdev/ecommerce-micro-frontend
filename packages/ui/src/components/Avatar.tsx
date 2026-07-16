import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Avatar image URL
   */
  src?: string;

  /**
   * Fallback initials when image is not available
   */
  initials?: string;

  /**
   * Avatar size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Avatar shape
   * @default 'circle'
   */
  shape?: 'circle' | 'square';

  /**
   * Status badge (online, offline, away)
   */
  status?: 'online' | 'offline' | 'away';

  /**
   * Alternative text for image
   */
  alt?: string;
}

/**
 * Avatar Component
 *
 * User avatar component with image, initials fallback, and status indicator.
 *
 * @example
 * ```tsx
 * <Avatar src="user.jpg" initials="JD" size="lg" status="online" />
 * ```
 */
export const Avatar: FC<AvatarProps> = ({
  src,
  initials = '?',
  size = 'md',
  shape = 'circle',
  status,
  alt = 'Avatar',
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const statusSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
  };

  const statusColors = {
    online: 'bg-success-500',
    offline: 'bg-neutral-400',
    away: 'bg-warning-500',
  };

  return (
    <div className="relative inline-flex" {...props}>
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-primary text-white font-semibold overflow-hidden',
          sizeStyles[size],
          shape === 'circle' ? 'rounded-full' : 'rounded-md',
          className
        )}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-neutral-900',
            statusSizes[size],
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};
