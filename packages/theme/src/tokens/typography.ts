/**
 * Typography Design Tokens
 * Font sizes, weights, line heights, and letter spacing
 */

export const typography = {
  // Font Families
  fontFamily: {
    // Primary font for headers and UI
    display: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    // Default font for body text
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    // Monospace for code
    mono: '"Fira Code", "Courier New", monospace',
  },

  // Font Sizes
  fontSize: {
    // Extra small
    xs: '12px',
    // Small
    sm: '14px',
    // Base / Normal
    base: '16px',
    // Large
    lg: '18px',
    // Extra Large
    xl: '20px',
    // 2XL
    '2xl': '24px',
    // 3XL
    '3xl': '30px',
    // 4XL
    '4xl': '36px',
    // 5XL (Display)
    '5xl': '48px',
    // 6XL (Hero)
    '6xl': '60px',
    // 7XL (Large Hero)
    '7xl': '72px',
  },

  // Font Weights
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,

    // Specific line heights for text sizes
    xs: 1.5, // 12px -> 18px
    sm: 1.5, // 14px -> 21px
    base: 1.5, // 16px -> 24px
    lg: 1.625, // 18px -> 29px
    xl: 1.75, // 20px -> 35px
    '2xl': 2, // 24px -> 48px
    '3xl': 2.25, // 30px -> 67px
    '4xl': 2.5, // 36px -> 90px
    '5xl': 1.1, // 48px -> 53px (display)
    '6xl': 1, // 60px (hero)
    '7xl': 1, // 72px (large hero)
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.04em',
    tight: '-0.02em',
    normal: '0em',
    wide: '0.02em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Text Decoration
  textDecoration: {
    none: 'none',
    underline: 'underline',
    'line-through': 'line-through',
  },

  // Text Transform
  textTransform: {
    none: 'none',
    capitalize: 'capitalize',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
  },
} as const;

// Semantic Typography Scales
export const typographyScales = {
  // Headings
  h1: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight['5xl'],
    letterSpacing: typography.letterSpacing.tight,
  },

  h2: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight['4xl'],
    letterSpacing: typography.letterSpacing.tight,
  },

  h3: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight['3xl'],
    letterSpacing: typography.letterSpacing.normal,
  },

  h4: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight['2xl'],
    letterSpacing: typography.letterSpacing.normal,
  },

  h5: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.xl,
    letterSpacing: typography.letterSpacing.normal,
  },

  h6: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.lg,
    letterSpacing: typography.letterSpacing.normal,
  },

  // Body Text
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },

  bodySmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.sm,
    letterSpacing: typography.letterSpacing.normal,
  },

  bodyLarge: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.lg,
    letterSpacing: typography.letterSpacing.normal,
  },

  // Labels
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.sm,
    letterSpacing: typography.letterSpacing.wide,
  },

  labelSmall: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.xs,
    letterSpacing: typography.letterSpacing.wider,
  },

  // Caption
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.xs,
    letterSpacing: typography.letterSpacing.normal,
  },

  // Code
  code: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.sm,
    letterSpacing: typography.letterSpacing.normal,
  },
} as const;

export type TypographyScale = keyof typeof typographyScales;
