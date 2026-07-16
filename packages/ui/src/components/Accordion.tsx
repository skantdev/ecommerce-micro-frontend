import { FC, HTMLAttributes, ReactNode, useState } from 'react';
import { cn } from '../utils';

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Accordion items: { title, content }
   */
  items: Array<{
    id: string;
    title: ReactNode;
    content: ReactNode;
    disabled?: boolean;
  }>;

  /**
   * Allow multiple items open
   * @default false
   */
  allowMultiple?: boolean;

  /**
   * Initially open item IDs
   */
  defaultOpen?: string[];

  /**
   * Change callback
   */
  onChange?: (openIds: string[]) => void;

  /**
   * Accordion color variant
   * @default 'neutral'
   */
  variant?: 'neutral' | 'bordered';
}

/**
 * Accordion Component
 *
 * Collapsible accordion component with single or multiple item expansion.
 *
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     { id: '1', title: 'Item 1', content: 'Content 1' },
 *     { id: '2', title: 'Item 2', content: 'Content 2' },
 *   ]}
 *   allowMultiple
 * />
 * ```
 */
export const Accordion: FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  onChange,
  variant = 'neutral',
  className,
  ...props
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    let newOpenIds: string[];

    if (openIds.includes(id)) {
      newOpenIds = openIds.filter((openId) => openId !== id);
    } else {
      newOpenIds = allowMultiple ? [...openIds, id] : [id];
    }

    setOpenIds(newOpenIds);
    onChange?.(newOpenIds);
  };

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            'rounded-lg overflow-hidden transition-smooth',
            variant === 'neutral' && 'bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700',
            variant === 'bordered' && 'border-2 border-neutral-200 dark:border-neutral-700'
          )}
        >
          {/* Header */}
          <button
            onClick={() => !item.disabled && toggleItem(item.id)}
            disabled={item.disabled}
            className={cn(
              'w-full px-4 py-3 flex items-center justify-between font-medium transition-smooth hover:bg-neutral-100 dark:hover:bg-neutral-800',
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <span>{item.title}</span>
            <svg
              className={cn(
                'w-5 h-5 transition-transform',
                openIds.includes(item.id) && 'rotate-180'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Content */}
          {openIds.includes(item.id) && (
            <div className="px-4 py-3 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-700">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
