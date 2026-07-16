/**
 * Animation Design Tokens
 * Transition timings, durations, and easing functions
 */

export const animations = {
  // Duration presets
  duration: {
    fastest: '75ms',
    faster: '100ms',
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
    slowest: '1000ms',
  },

  // Easing functions
  easing: {
    // Linear
    linear: 'linear',

    // Power functions
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',

    // Cubic beziers (custom easing)
    'ease-in-quad': 'cubic-bezier(0.11, 0, 0.5, 0)',
    'ease-out-quad': 'cubic-bezier(0.5, 1, 0.89, 1)',
    'ease-in-out-quad': 'cubic-bezier(0.45, 0, 0.55, 1)',

    'ease-in-cubic': 'cubic-bezier(0.32, 0, 0.67, 0)',
    'ease-out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
    'ease-in-out-cubic': 'cubic-bezier(0.65, 0, 0.35, 1)',

    'ease-in-quart': 'cubic-bezier(0.5, 0, 0.75, 0)',
    'ease-out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
    'ease-in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',

    'ease-in-quint': 'cubic-bezier(0.64, 0, 0.78, 0)',
    'ease-out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
    'ease-in-out-quint': 'cubic-bezier(0.83, 0, 0.17, 1)',

    'ease-in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
    'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'ease-in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',

    'ease-in-circ': 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
    'ease-out-circ': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
    'ease-in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',

    // Material Design
    'material-standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'material-decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
    'material-accelerate': 'cubic-bezier(0.4, 0, 1, 1)',

    // Spring-like (bouncy)
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // Transition presets
  transition: {
    all: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color, background-color, border-color, text-decoration-color, fill, stroke 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Keyframe animations
  keyframes: {
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
} as const;

// CSS keyframes definitions
export const keyframeDefinitions = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes slideUp {
    from { transform: translateY(16px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideDown {
    from { transform: translateY(-16px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideLeft {
    from { transform: translateX(16px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideRight {
    from { transform: translateX(-16px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes scaleOut {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(0.95); opacity: 0; }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-25%); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
`;

export type Duration = keyof typeof animations.duration;
export type Easing = keyof typeof animations.easing;
export type Transition = keyof typeof animations.transition;
