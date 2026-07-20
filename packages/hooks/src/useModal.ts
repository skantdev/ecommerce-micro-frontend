import { useDisclosure, UseDisclosureReturn } from './useDisclosure';

export interface UseModalReturn extends UseDisclosureReturn {}

/**
 * useModal - Convenience wrapper around useDisclosure for modal state
 *
 * @param defaultIsOpen - Whether modal starts open
 * @returns { isOpen, open, close, toggle }
 *
 * @example
 * ```tsx
 * const modal = useModal();
 *
 * return (
 *   <>
 *     <Button onClick={modal.open}>Delete</Button>
 *     <Modal isOpen={modal.isOpen} onClose={modal.close} title="Confirm Delete">
 *       Are you sure?
 *     </Modal>
 *   </>
 * );
 * ```
 */
export function useModal(defaultIsOpen = false): UseModalReturn {
  return useDisclosure({ defaultIsOpen });
}
