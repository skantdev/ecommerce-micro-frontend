import type { Config } from 'tailwindcss';
import { colors, spacing, breakpoints, shadows, animations } from './src/tokens';

export default {
  content: [
    // Include all app and package source files
    './apps/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors,

      spacing,

      screens: {
        xs: breakpoints.xs,
        sm: breakpoints.sm,
        md: breakpoints.md,
        lg: breakpoints.lg,
        xl: breakpoints.xl,
        '2xl': breakpoints['2xl'],

        // Custom responsive utilities
        'supports-hover': { raw: '(hover: hover)' },
        'touch': { raw: '(hover: none) and (pointer: coarse)' },
        'dark': { raw: '(prefers-color-scheme: dark)' },
      },

      boxShadow: shadows,

      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },

      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
      },

      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },

      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },

      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-out': 'fadeOut 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-down': 'slideDown 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-left': 'slideLeft 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-right': 'slideRight 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-out': 'scaleOut 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'spin': 'spin 1000ms linear infinite',
        'pulse': 'pulse 2000ms cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1000ms infinite',
        'shimmer': 'shimmer 2000ms infinite',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideUp: {
          from: { transform: 'translateY(16px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          from: { transform: 'translateY(-16px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          from: { transform: 'translateX(16px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          from: { transform: 'translateX(-16px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0.95)', opacity: '0' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },

      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },

      transitionTimingFunction: {
        'material-standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'material-decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
        'material-accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },

      borderRadius: {
        none: '0',
        sm: '0.25rem',
        base: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px',
      },

      minHeight: {
        'screen-dvh': '100dvh',
      },

      maxWidth: {
        '7xl': '80rem',
        '8xl': '88rem',
      },

      zIndex: {
        hide: '-1',
        auto: 'auto',
        base: '0',
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        backdrop: '1040',
        offcanvas: '1050',
        modal: '1060',
        popover: '1070',
        tooltip: '1080',
      },

      opacity: {
        disabled: '0.5',
      },

      scale: {
        hover: '1.05',
        active: '0.95',
      },

      rotate: {
        flip: '180deg',
      },
    },
  },

  plugins: [
    // Custom utilities
    function ({ addBase, addComponents, addUtilities, theme }) {
      // Base styles
      addBase({
        ':root': {
          '--color-white': '#ffffff',
          '--color-black': '#000000',
        },
      });

      // Component layer - commonly used component patterns
      addComponents({
        // Flex center
        '.flex-center': {
          '@apply flex items-center justify-center': {},
        },

        // Container
        '.container': {
          '@apply w-full px-4 mx-auto': {},
          '@screen sm': {
            '@apply px-6': {},
          },
          '@screen md': {
            '@apply px-8': {},
          },
          '@screen lg': {
            '@apply max-w-7xl': {},
          },
        },

        // Section
        '.section': {
          '@apply py-12 md:py-20 lg:py-28': {},
        },

        // Card
        '.card': {
          '@apply bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6': {},
          'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },

        '.card-hover': {
          '@apply card hover:shadow-lg hover:scale-[1.02]': {},
        },

        // Button reset
        '.btn-reset': {
          '@apply bg-transparent border-none p-0 m-0 cursor-pointer': {},
        },

        // Focus ring
        '.focus-ring': {
          '@apply outline-none ring-2 ring-primary-500 ring-offset-2': {},
        },

        // Text truncate
        '.truncate-line': {
          '@apply overflow-hidden text-overflow-ellipsis whitespace-nowrap': {},
        },

        '.truncate-2': {
          'display': '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
          'overflow': 'hidden',
        },

        '.truncate-3': {
          'display': '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
          'overflow': 'hidden',
        },

        // Smooth transitions
        '.transition-smooth': {
          '@apply transition-all duration-base ease-material-standard': {},
        },

        '.transition-fast': {
          '@apply transition-all duration-fast ease-material-standard': {},
        },
      });

      // Utility layer
      addUtilities({
        // Gradients
        '.gradient-primary': {
          'backgroundImage': theme('colors.gradient.primary'),
        },

        '.gradient-success': {
          'backgroundImage': theme('colors.gradient.success'),
        },

        '.gradient-error': {
          'backgroundImage': theme('colors.gradient.error'),
        },

        '.gradient-warning': {
          'backgroundImage': theme('colors.gradient.warning'),
        },

        // Glows
        '.glow-primary': {
          boxShadow: '0 0 20px -2px rgba(91, 136, 255, 0.4)',
        },

        '.glow-success': {
          boxShadow: '0 0 20px -2px rgba(16, 185, 129, 0.4)',
        },

        '.glow-error': {
          boxShadow: '0 0 20px -2px rgba(239, 68, 68, 0.4)',
        },

        // Backdrops
        '.backdrop-blur-sm': {
          backdropFilter: 'blur(4px)',
        },

        '.backdrop-blur': {
          backdropFilter: 'blur(12px)',
        },

        '.backdrop-blur-md': {
          backdropFilter: 'blur(16px)',
        },

        // Aspect ratios
        '.aspect-square': {
          aspectRatio: '1 / 1',
        },

        '.aspect-video': {
          aspectRatio: '16 / 9',
        },

        '.aspect-3-4': {
          aspectRatio: '3 / 4',
        },

        '.aspect-4-3': {
          aspectRatio: '4 / 3',
        },
      });
    },
  ],

  darkMode: 'media',
} satisfies Config;
