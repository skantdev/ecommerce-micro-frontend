/**
 * Main Export File
 * Re-exports all design tokens and utilities
 */

// Export all tokens
export * from './tokens/index';

// Export utilities
export { keyframeDefinitions } from './tokens/animations';
export { elevations } from './tokens/shadows';
export { spacingScale } from './tokens/spacing';
export { typographyScales } from './tokens/typography';
export { mediaQueries, containerQueries } from './tokens/breakpoints';

/**
 * Design System - Complete Type Exports
 * Use these types when working with design tokens in your components
 */

export type ThemeConfig = {
  colors: typeof import('./tokens/colors').colors;
  typography: typeof import('./tokens/typography').typography;
  spacing: typeof import('./tokens/spacing').spacing;
  breakpoints: typeof import('./tokens/breakpoints').breakpoints;
  shadows: typeof import('./tokens/shadows').shadows;
  animations: typeof import('./tokens/animations').animations;
};

/**
 * Utility Helper Functions
 */

/**
 * Merge color values with CSS var fallback
 * @example getCSSVar('primary', 500) // returns var(--color-primary-500)
 */
export const getCSSVar = (colorKey: string, level?: number): string => {
  return level ? `var(--color-${colorKey}-${level})` : `var(--color-${colorKey})`;
};

/**
 * Get media query string
 * @example getMediaQuery('md') // returns (min-width: 768px)
 */
export const getMediaQuery = (breakpoint: keyof typeof import('./tokens/breakpoints').breakpoints): string => {
  const breakpoints = {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  };
  return `(min-width: ${breakpoints[breakpoint]})`;
};

/**
 * Combine spacing values
 * @example combineSpacing('4', '8') // returns calc(16px + 32px)
 */
export const combineSpacing = (...values: Array<string>): string => {
  const spacing = {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
    12: '48px',
  };
  return values.map((v) => spacing[v as keyof typeof spacing] || v).join(' + ');
};

/**
 * Theme Context Types
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  tokens: ThemeConfig;
}

/**
 * Documentation: Design System Tokens
 *
 * This package exports a comprehensive design system with:
 *
 * 1. COLOR TOKENS
 *    - Primary, Secondary, Neutral, and Semantic colors
 *    - 11-step color scales for consistency
 *    - Gradient and shadow color definitions
 *
 * 2. TYPOGRAPHY TOKENS
 *    - Font families (display, body, mono)
 *    - Font sizes (xs to 7xl)
 *    - Font weights (100-900)
 *    - Line heights for different sizes
 *    - Letter spacing variations
 *    - Semantic typography scales (h1-h6, body, label, code)
 *
 * 3. SPACING TOKENS
 *    - Base 4px spacing unit
 *    - Consistent scale from 0 to 384px
 *    - Semantic aliases for gaps, padding, margins
 *    - Component and section spacing presets
 *
 * 4. BREAKPOINT TOKENS
 *    - Mobile-first responsive design
 *    - 6 breakpoints (xs, sm, md, lg, xl, 2xl)
 *    - Media query helpers for common patterns
 *    - Container query sizes
 *
 * 5. SHADOW TOKENS
 *    - 8-level elevation system (none to 2xl)
 *    - Interactive shadows (focus, hover)
 *    - Colored glows for semantic states
 *    - Dropdown and modal shadows
 *
 * 6. ANIMATION TOKENS
 *    - Duration presets (fastest to slowest)
 *    - 30+ easing functions (Material Design, cubic beziers)
 *    - Transition presets for common properties
 *    - Keyframe animation library
 *
 * USAGE:
 *
 * TypeScript:
 *   import { colors, spacing, typography } from '@repo/theme';
 *
 * Tailwind CSS:
 *   Use in tailwind.config.ts via theme extension
 *
 * CSS Variables:
 *   --color-primary-500, --font-size-base, --spacing-4, etc.
 *
 * React Components:
 *   import { getCSSVar } from '@repo/theme';
 *   const primaryColor = getCSSVar('primary', 500);
 */
