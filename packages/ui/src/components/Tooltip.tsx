import { FC, HTMLAttributes, ReactNode, useState } from 'react';
import { cn } from '../utils';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Tooltip content
   */
  content: ReactNode;

  /**
   * Trigger element
   */
  children: ReactNode;

  /**
   * Tooltip position
   * @default 'top'
   */
  position?: 'top' | 'bottom' | 'left' | 'right';

  /**
   * Tooltip delay (ms)
   * @default 200
   */
  delay?: number;

  /**
   * Manual control of visibility
   */
  visible?: boolean;

  /**
   * Show on hover or click
   * @default 'hover'
   */
  trigger?: 'hover' | 'click';

  /**
   * Dark tooltip
   */
  dark?: boolean;
}

/**
 * Tooltip Component
 *
 * Information tooltip that appears on hover or click.
 *
 * @example
 * ```tsx
 * <Tooltip content="Click to save" position="bottom">
 *   <Button>Save</Button>
 * </Tooltip>
 * ```
 */
export const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  visible: controlledVisible,
  trigger = 'hover',
  dark = true,
  className,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const [delayTimeout, setDelayTimeout] = useState<NodeJS.Timeout | null>(null);

  const isVisible = controlledVisible !== undefined ? controlledVisible : show;

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      const timeout = setTimeout(() => setShow(true), delay);
      setDelayTimeout(timeout);
    }
  };

  const handleMouseLeave = () => {
    if (delayTimeout) clearTimeout(delayTimeout);
    if (trigger === 'hover') setShow(false);
  };

  const handleClick = () => {
    if (trigger === 'click') setShow(!show);
  };

  const positionStyles = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent',
  };

  const arrowColorClass = dark ? 'border-t-neutral-900 dark:border-t-white' : 'border-t-white dark:border-t-neutral-900';

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {children}

      {isVisible && (
        <div
          className={cn(
            'absolute z-[1080] px-2 py-1 text-sm font-medium rounded whitespace-nowrap',
            positionStyles[position],
            dark
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
              : 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700',
            className
          )}
        >
          {content}
          <div
            className={cn(
              'absolute w-0 h-0',
              arrowStyles[position],
              dark && position === 'top' && 'border-t-neutral-900',
              dark && position !== 'top' && position === 'bottom' && 'border-b-neutral-900',
              dark && position !== 'bottom' && position === 'left' && 'border-l-neutral-900',
              dark && position !== 'left' && position === 'right' && 'border-r-neutral-900'
            )}
          />
        </div>
      )}
    </div>
  );
};
