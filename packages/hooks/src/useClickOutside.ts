import { useEffect, useRef } from 'react';

/**
 * useClickOutside - Detect clicks outside a referenced element
 *
 * @param handler - Callback fired when a click outside occurs
 * @returns ref - Attach to the element to watch
 *
 * @example
 * ```tsx
 * const ref = useClickOutside(() => setIsOpen(false));
 *
 * return <div ref={ref}>Dropdown content</div>;
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]);

  return ref;
}
