/**
 * Spacing Design Tokens
 * Consistent spacing scale for margins, padding, and gaps
 */

export const spacing = {
  // Base spacing unit: 4px
  0: '0',
  px: '1px', // 1px
  0.5: '2px', // 2px
  1: '4px', // 4px
  1.5: '6px', // 6px
  2: '8px', // 8px
  2.5: '10px', // 10px
  3: '12px', // 12px
  3.5: '14px', // 14px
  4: '16px', // 16px
  5: '20px', // 20px
  6: '24px', // 24px
  7: '28px', // 28px
  8: '32px', // 32px
  9: '36px', // 36px
  10: '40px', // 40px
  11: '44px', // 44px
  12: '48px', // 48px
  14: '56px', // 56px
  16: '64px', // 64px
  20: '80px', // 80px
  24: '96px', // 96px
  28: '112px', // 112px
  32: '128px', // 128px
  36: '144px', // 144px
  40: '160px', // 160px
  44: '176px', // 176px
  48: '192px', // 192px
  52: '208px', // 208px
  56: '224px', // 224px
  60: '240px', // 240px
  64: '256px', // 256px
  72: '288px', // 288px
  80: '320px', // 320px
  96: '384px', // 384px
  full: '100%',
  screen: '100vw',
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
} as const;

// Semantic spacing scale aliases
export const spacingScale = {
  // Gap scale (for flex/grid gaps)
  gap: {
    xs: spacing[2], // 8px
    sm: spacing[3], // 12px
    md: spacing[4], // 16px
    lg: spacing[6], // 24px
    xl: spacing[8], // 32px
    '2xl': spacing[12], // 48px
  },

  // Padding scale
  padding: {
    xs: spacing[2], // 8px
    sm: spacing[3], // 12px
    md: spacing[4], // 16px
    lg: spacing[6], // 24px
    xl: spacing[8], // 32px
    '2xl': spacing[12], // 48px
  },

  // Margin scale
  margin: {
    xs: spacing[2], // 8px
    sm: spacing[3], // 12px
    md: spacing[4], // 16px
    lg: spacing[6], // 24px
    xl: spacing[8], // 32px
    '2xl': spacing[12], // 48px
  },

  // Component padding (internal spacing)
  component: {
    xs: spacing[2], // 8px
    sm: spacing[3], // 12px
    md: spacing[4], // 16px
    lg: spacing[6], // 24px
    xl: spacing[8], // 32px
  },

  // Page/Section spacing
  section: {
    xs: spacing[6], // 24px
    sm: spacing[8], // 32px
    md: spacing[12], // 48px
    lg: spacing[16], // 64px
    xl: spacing[20], // 80px
  },
} as const;

export type SpacingValue = keyof typeof spacing;
export type SpacingScale = keyof typeof spacingScale;
