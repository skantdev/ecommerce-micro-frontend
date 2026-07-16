/**
 * Color Palette Design Tokens
 * Comprehensive color system with semantic colors and variations
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#f0f5ff',
    100: '#e0ecff',
    200: '#c1d8ff',
    300: '#a2c4ff',
    400: '#7ea6ff',
    500: '#5b88ff', // Primary brand color
    600: '#4563e8',
    700: '#3541d1',
    800: '#2632ba',
    900: '#1a24a3',
    950: '#0f1575',
  },

  // Secondary Colors (Accent)
  secondary: {
    50: '#f5f3ff',
    100: '#ebe7ff',
    200: '#d9cfff',
    300: '#c5b8ff',
    400: '#af9aff',
    500: '#9b7cff', // Secondary accent color
    600: '#8d68e8',
    700: '#7a54d1',
    800: '#6541ba',
    900: '#5233a3',
    950: '#381f75',
  },

  // Neutral/Grayscale Colors
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280', // Medium gray
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  // Semantic Colors
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981', // Success
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c1d',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Error
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#4c0519',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Warning
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Info
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Utility Colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Extended Colors
  gradient: {
    primary: 'linear-gradient(135deg, #5b88ff 0%, #9b7cff 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },

  // Shadow Colors
  shadow: {
    sm: 'rgba(0, 0, 0, 0.05)',
    md: 'rgba(0, 0, 0, 0.1)',
    lg: 'rgba(0, 0, 0, 0.15)',
    xl: 'rgba(0, 0, 0, 0.2)',
  },
} as const;

export type ColorKey = keyof typeof colors;
export type ColorValue = typeof colors[ColorKey];
