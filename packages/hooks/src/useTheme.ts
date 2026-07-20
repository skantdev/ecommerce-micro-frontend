import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type Theme = 'light' | 'dark' | 'system';

export interface UseThemeReturn {
  /** Current resolved theme (always 'light' or 'dark') */
  theme: 'light' | 'dark';
  /** User preference (may be 'system') */
  preference: Theme;
  /** Set theme preference */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark */
  toggle: () => void;
  /** Whether dark mode is active */
  isDark: boolean;
}

const getSystemTheme = (): 'light' | 'dark' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

/**
 * useTheme - Manage light/dark theme with system preference support
 *
 * Persists preference to localStorage and applies the `dark` class to
 * `document.documentElement` for Tailwind dark mode.
 *
 * @returns { theme, preference, setTheme, toggle, isDark }
 *
 * @example
 * ```tsx
 * const { isDark, toggle } = useTheme();
 *
 * return <Button onClick={toggle}>{isDark ? 'Light' : 'Dark'} Mode</Button>;
 * ```
 */
export function useTheme(): UseThemeReturn {
  const [preference, setPreference] = useLocalStorage<Theme>('theme-preference', 'system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(
    typeof window !== 'undefined' ? getSystemTheme() : 'light',
  );

  // Track system preference changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const theme: 'light' | 'dark' =
    preference === 'system' ? systemTheme : preference;

  // Apply class to <html> for Tailwind dark: variant
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = useCallback(
    (t: Theme) => setPreference(t),
    [setPreference],
  );

  const toggle = useCallback(() => {
    setPreference((prev) => {
      const resolved = prev === 'system' ? systemTheme : prev;
      return resolved === 'dark' ? 'light' : 'dark';
    });
  }, [setPreference, systemTheme]);

  return { theme, preference, setTheme, toggle, isDark: theme === 'dark' };
}
