import { FC, HTMLAttributes, ReactNode, useState } from 'react';
import { cn } from '../utils';

export interface ModalProps {
  /**
   * Modal is open
   */
  isOpen: boolean;

  /**
   * Close callback
   */
  onClose: () => void;

  /**
   * Modal title
   */
  title?: ReactNode;

  /**
   * Modal content
   */
  children: ReactNode;

  /**
   * Modal footer content/actions
   */
  footer?: ReactNode;

  /**
   * Close button on header
   */
  closeButton?: boolean;

  /**
   * Click outside closes modal
   */
  closeOnBackdrop?: boolean;

  /**
   * Modal size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Show backdrop overlay
   */
  backdrop?: boolean;
}

/**
 * Modal Component
 *
 * Dialog/modal component with customizable size, backdrop, and footer.
 * Supports click-outside-to-close and keyboard escape.
 *
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="Confirm Action"
 *   footer={<Button onClick={onClose}>Close</Button>}
 * >
 *   Modal content
 * </Modal>
 * ```
 */
export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeButton = true,
  closeOnBackdrop = true,
  size = 'md',
  backdrop = true,
}) => {
  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  if (!isOpen) return null;

  // Handle keyboard escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      {backdrop && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity z-[1040]"
          onClick={() => closeOnBackdrop && onClose()}
        />
      )}

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[1060] p-4">
        <div className={cn('bg-white dark:bg-neutral-900 rounded-lg shadow-modal w-full', sizeStyles[size])}>
          {/* Header */}
          {(title || closeButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
              {title && <h2 className="text-xl font-bold">{title}</h2>}
              {closeButton && (
                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 p-1"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-4">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 flex gap-2 justify-end">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
