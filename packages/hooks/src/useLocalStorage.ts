import { useState, useEffect, useRef, useCallback } from 'react';

export type StorageSerializer<T> = {
  read: (raw: string) => T;
  write: (value: T) => string;
};

const defaultSerializer: StorageSerializer<unknown> = {
  read: (raw) => JSON.parse(raw),
  write: (value) => JSON.stringify(value),
};

/**
 * useLocalStorage - Persist state to localStorage with type safety
 *
 * @param key - localStorage key
 * @param initialValue - Initial value if key is absent
 * @param serializer - Optional custom serializer
 * @returns [storedValue, setValue, removeValue]
 *
 * @example
 * ```tsx
 * const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  serializer?: StorageSerializer<T>,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const ser = (serializer ?? defaultSerializer) as StorageSerializer<T>;

  const readValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? ser.read(item) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue, ser]);

  const [storedValue, setStoredValue] = useState<T>(readValue);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      setStoredValue(readValue());
    }
  }, [readValue]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, ser.write(newValue));
        setStoredValue(newValue);
        window.dispatchEvent(new StorageEvent('storage', { key }));
      } catch {
        // Silent fail on write errors (e.g. private mode / quota exceeded)
      }
    },
    [key, ser, storedValue],
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch {
      // Silent fail
    }
  }, [key, initialValue]);

  // Sync across tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(readValue());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, readValue]);

  return [storedValue, setValue, removeValue];
}
