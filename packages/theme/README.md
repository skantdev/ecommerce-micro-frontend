# @repo/theme

🎨 **Centralized Design System & Theme Configuration**

Comprehensive design tokens and Tailwind CSS configuration for the ecommerce micro frontend application.

## Overview

This package provides:

- **Design Tokens**: Color, typography, spacing, shadows, animations
- **Tailwind Configuration**: Pre-configured with all design tokens
- **CSS Variables**: Automatic dark/light mode support
- **Theme Management**: Type-safe token exports
- **Animation Library**: Pre-built animation keyframes
- **Responsive Breakpoints**: Mobile-first design system

## Installation

Already included as a workspace package. No additional installation needed.

## Usage

### Colors

```typescript
import { colors } from '@repo/theme';

// Access color palette
colors.primary[500];      // #5b88ff
colors.error[600];        // #dc2626
colors.neutral[200];      // #e5e7eb
colors.gradient.primary;  // linear-gradient(...)
```

### Typography

```typescript
import { typography, typographyScales } from '@repo/theme';

// Font families
typography.fontFamily.body;        // 'Inter', sans-serif

// Font sizes
typography.fontSize['2xl'];        // 24px

// Semantic scales
typographyScales.h1;    // { fontSize: '48px', fontWeight: 700, ... }
typographyScales.body;  // { fontSize: '16px', fontWeight: 400, ... }
```

### Spacing

```typescript
import { spacing, spacingScale } from '@repo/theme';

// Base spacing
spacing[4];           // 16px
spacing[12];          // 48px

// Semantic scales
spacingScale.padding.md;      // 16px
spacingScale.section.lg;      // 64px
spacingScale.component.xl;    // 32px
```

### Breakpoints

```typescript
import { breakpoints, mediaQueries } from '@repo/theme';

// Breakpoint values
breakpoints.md;       // 768px

// Media queries
mediaQueries.md;      // (min-width: 768px)
mediaQueries.darkMode; // (prefers-color-scheme: dark)
```

### Animations

```typescript
import { animations } from '@repo/theme';

// Durations
animations.duration.fast;      // 150ms

// Easing functions
animations.easing['ease-out-cubic'];  // cubic-bezier(...)

// Transitions
animations.transition.all;     // all 200ms cubic-bezier(...)
```

### Shadows

```typescript
import { shadows, elevations } from '@repo/theme';

// Elevation system
shadows.sm;          // 0 1px 3px 0 rgba(0, 0, 0, 0.1)
shadows.lg;          // 0 10px 15px...

// Semantic elevations
elevations.floating; // shadow.md
elevations.modal;    // shadow.xl
```

## Tailwind Configuration

All tokens are automatically integrated into Tailwind CSS:

```tsx
// colors
<div className="bg-primary-500 text-neutral-900">

// spacing
<div className="p-4 m-6 gap-2">

// shadows
<div className="shadow-lg hover:shadow-xl">

// animations
<div className="animate-fade-in">

// responsive
<div className="md:text-2xl lg:shadow-lg">
```

## CSS Variables

Available as CSS custom properties for direct use:

```css
/* Colors */
var(--color-primary-500)
var(--color-error-500)
var(--color-neutral-900)

/* Typography */
var(--font-size-base)
var(--font-weight-semibold)
var(--line-height-normal)

/* Spacing */
var(--spacing-4)
var(--spacing-8)

/* Shadows */
var(--shadow-md)
var(--shadow-lg)

/* Transitions */
var(--transition-base)
var(--transition-slow)
```

### Dark Mode

The system automatically responds to `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: var(--color-neutral-950);
    --text-primary: var(--color-neutral-50);
  }
}
```

## File Structure

```
packages/theme/
├── src/
│   ├── tokens/
│   │   ├── colors.ts          # Color palette (primary, secondary, semantic)
│   │   ├── typography.ts      # Font sizes, weights, line heights
│   │   ├── spacing.ts         # Spacing scale & semantic aliases
│   │   ├── breakpoints.ts     # Responsive breakpoints & media queries
│   │   ├── shadows.ts         # Elevation & shadow effects
│   │   ├── animations.ts      # Durations, easing, transitions
│   │   └── index.ts           # Token exports
│   ├── globals.css            # CSS variables & base styles
│   └── index.ts               # Main export
├── tailwind.config.ts         # Tailwind configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Color System

### Primary Palette (11 steps)
- `50` - Lightest (backgrounds)
- `100` - Very light
- `200` - Light
- `300` - Light-medium
- `400` - Medium-light
- `500` - **Main brand color** ✨
- `600` - Medium-dark
- `700` - Dark
- `800` - Very dark
- `900` - Darkest
- `950` - Extreme dark

### Semantic Colors
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Warning**: Amber (#f59e0b)
- **Info**: Blue (#3b82f6)

### Neutral Colors
Used for text, borders, backgrounds with 11-step scale.

## Typography Scale

### Heading Sizes
- `h1`: 48px (display)
- `h2`: 36px
- `h3`: 30px
- `h4`: 24px
- `h5`: 20px
- `h6`: 18px

### Body Sizes
- `body`: 16px (default)
- `bodySmall`: 14px
- `bodyLarge`: 18px

### Other
- `label`: 14px (medium weight)
- `caption`: 12px
- `code`: 14px (monospace)

## Spacing Scale

Base unit: **4px**

- `0` → 0px
- `1` → 4px
- `2` → 8px
- `4` → 16px
- `6` → 24px
- `8` → 32px
- `12` → 48px
- `16` → 64px
- `20` → 80px

## Breakpoints

| Name | Value | Use Case |
|------|-------|----------|
| `xs` | 320px | Extra small phones |
| `sm` | 640px | Phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

## Animation Durations

- `fastest`: 75ms
- `faster`: 100ms
- `fast`: 150ms
- `base`: 200ms (default)
- `slow`: 300ms
- `slower`: 500ms
- `slowest`: 1000ms

## Export Structure

### Named Exports
```typescript
// Design tokens
export { colors } from './tokens/colors';
export { typography } from './tokens/typography';
export { spacing } from './tokens/spacing';
export { breakpoints } from './tokens/breakpoints';
export { shadows } from './tokens/shadows';
export { animations } from './tokens/animations';

// Utilities
export { getCSSVar, getMediaQuery, combineSpacing };
```

### Type Exports
```typescript
export type ColorKey = keyof typeof colors;
export type TypographyScale = keyof typeof typographyScales;
export type SpacingValue = keyof typeof spacing;
export type Breakpoint = keyof typeof breakpoints;
export type Shadow = keyof typeof shadows;
export type Duration = keyof typeof animations.duration;
export type ThemeMode = 'light' | 'dark' | 'auto';
```

## Tailwind Plugin Features

### Pre-built Components
- `.flex-center` - Centered flex container
- `.container` - Responsive container
- `.section` - Section padding
- `.card` - Card component
- `.card-hover` - Interactive card
- `.focus-ring` - Accessible focus state

### Utilities
- `.gradient-*` - Gradient backgrounds
- `.glow-*` - Color-specific glows
- `.truncate-2` / `.truncate-3` - Multi-line truncation
- `.transition-smooth` / `.transition-fast` - Common transitions
- `.aspect-*` - Aspect ratios

## Best Practices

1. **Use Design Tokens**: Always reference tokens instead of hardcoding values
2. **Mobile First**: Start with base styles, add responsive variants with breakpoints
3. **Dark Mode**: Leverage CSS variables for automatic dark mode support
4. **Accessibility**: Use semantic colors (error, success, warning) for meaningful UI
5. **Performance**: Leverage Tailwind's purging for optimal bundle size
6. **Type Safety**: Use TypeScript for token access

## Integration with Other Packages

This package is used by:
- `@repo/ui` - UI component library
- `apps/host` - Host application
- All micro frontend apps

## Version

Current: 1.0.0

## Dependencies

- `tailwindcss`: ^4.0.0
- `typescript`: ^5.6.3

## Next Steps

- Integrate with UI component library (Step 9)
- Create custom hooks (Step 10)
- Build component library with this theme
