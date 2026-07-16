import { FC, HTMLAttributes, ReactNode, useState } from 'react';
import { cn } from '../utils';

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Tab items: { label, content }
   */
  tabs: Array<{
    label: ReactNode;
    content: ReactNode;
    disabled?: boolean;
  }>;

  /**
   * Initial active tab index
   * @default 0
   */
  defaultTab?: number;

  /**
   * Tab style variant
   * @default 'underline'
   */
  variant?: 'underline' | 'pills' | 'boxed';

  /**
   * Tabs size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Full width tabs
   */
  fullWidth?: boolean;

  /**
   * Change callback
   */
  onChange?: (index: number) => void;
}

/**
 * Tabs Component
 *
 * Tabbed interface component with multiple display variants.
 *
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { label: 'Tab 1', content: 'Content 1' },
 *     { label: 'Tab 2', content: 'Content 2' },
 *   ]}
 * />
 * ```
 */
export const Tabs: FC<TabsProps> = ({
  tabs,
  defaultTab = 0,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  onChange,
  className,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index: number) => {
    if (!tabs[index].disabled) {
      setActiveTab(index);
      onChange?.(index);
    }
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-2.5',
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {/* Tab List */}
      <div
        className={cn(
          'flex gap-2 border-b border-neutral-200 dark:border-neutral-700',
          fullWidth && 'w-full',
          variant === 'boxed' && 'gap-1 border-none'
        )}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            disabled={tab.disabled}
            className={cn(
              'font-medium transition-smooth focus-ring relative',
              sizeStyles[size],
              tab.disabled && 'opacity-50 cursor-not-allowed',
              fullWidth && 'flex-1 text-center',

              // Variant styles
              variant === 'underline' &&
                activeTab === index &&
                'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600',
              variant === 'underline' &&
                activeTab !== index &&
                'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200',

              variant === 'pills' &&
                activeTab === index &&
                'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100 rounded-full',
              variant === 'pills' && activeTab !== index && 'text-neutral-600 dark:text-neutral-400',

              variant === 'boxed' &&
                activeTab === index &&
                'bg-primary-50 dark:bg-primary-900 border border-primary-200 dark:border-primary-700 rounded-t-lg',
              variant === 'boxed' && activeTab !== index && 'text-neutral-600 dark:text-neutral-400'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-4">{tabs[activeTab].content}</div>
    </div>
  );
};
