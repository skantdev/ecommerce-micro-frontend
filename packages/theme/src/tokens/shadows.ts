/**
 * Shadow Design Tokens
 * Elevation and depth through shadow effects
 */

export const shadows = {
  // None
  none: 'none',

  // Elevation shadows (subtle to prominent)
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Interactive shadows
  focus: '0 0 0 3px rgba(91, 136, 255, 0.1), 0 0 0 2px rgba(91, 136, 255, 1)',
  focusError: '0 0 0 3px rgba(239, 68, 68, 0.1), 0 0 0 2px rgba(239, 68, 68, 1)',
  focusSuccess: '0 0 0 3px rgba(16, 185, 129, 0.1), 0 0 0 2px rgba(16, 185, 129, 1)',

  // Hover shadows
  hoverMd: '0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  hoverLg: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',

  // Inset shadows (depressed effect)
  insetSm: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  insetMd: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',

  // Colored shadows
  primaryGlow: '0 0 20px -2px rgba(91, 136, 255, 0.4)',
  successGlow: '0 0 20px -2px rgba(16, 185, 129, 0.4)',
  errorGlow: '0 0 20px -2px rgba(239, 68, 68, 0.4)',
  warningGlow: '0 0 20px -2px rgba(245, 158, 11, 0.4)',

  // Dropdown/Modal shadows
  dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Transition shadows (for smooth transitions)
  transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Elevation levels (semantic)
export const elevations = {
  none: shadows.none,
  raised: shadows.sm,
  floating: shadows.md,
  lifted: shadows.lg,
  overlay: shadows.xl,
  modal: shadows.modal,
} as const;

export type Shadow = keyof typeof shadows;
export type Elevation = keyof typeof elevations;
