/**
 * Responsive Breakpoints Design Tokens
 * Mobile-first breakpoints for responsive design
 */

export const breakpoints = {
  // Extra Small (Mobile) - Default
  xs: '320px',
  // Small (Mobile Landscape / Small Tablet)
  sm: '640px',
  // Medium (Tablet)
  md: '768px',
  // Large (Desktop)
  lg: '1024px',
  // Extra Large (Large Desktop)
  xl: '1280px',
  // 2XL (Extra Large Desktop)
  '2xl': '1536px',
} as const;

// Media query helpers
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,

  // Mobile-first approach (everything below a breakpoint)
  xsMax: `(max-width: 639px)`,
  smMax: `(max-width: 767px)`,
  mdMax: `(max-width: 1023px)`,
  lgMax: `(max-width: 1279px)`,
  xlMax: `(max-width: 1535px)`,

  // Ranges
  smRange: `(min-width: ${breakpoints.sm}) and (max-width: 767px)`,
  mdRange: `(min-width: ${breakpoints.md}) and (max-width: 1023px)`,
  lgRange: `(min-width: ${breakpoints.lg}) and (max-width: 1279px)`,
  xlRange: `(min-width: ${breakpoints.xl}) and (max-width: 1535px)`,

  // Utility
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  retina: '(min-resolution: 192dpi)',
  touchDevice: '(hover: none) and (pointer: coarse)',
  hoverDevice: '(hover: hover) and (pointer: fine)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  darkMode: '(prefers-color-scheme: dark)',
  lightMode: '(prefers-color-scheme: light)',
} as const;

// Container queries
export const containerQueries = {
  sm: '384px',
  md: '512px',
  lg: '768px',
  xl: '1024px',
  '2xl': '1280px',
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type MediaQuery = keyof typeof mediaQueries;
