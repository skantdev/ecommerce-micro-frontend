import { useRef } from 'react';

/**
 * usePrevious - Track the previous value of a variable
 *
 * @param value - The current value
 * @returns The value from the previous render
 *
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * console.log(`Was ${prevCount}, now ${count}`);
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const currentRef = useRef<T>(value);
  const previousRef = useRef<T | undefined>(undefined);

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}
