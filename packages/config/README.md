# @repo/config

Centralized configuration management for the E-Commerce Micro Frontend platform.

## Overview

This package provides type-safe configuration for all micro frontends, including:

- Environment detection and management
- API endpoint configuration
- Feature flags for gradual rollout
- Storage keys and prefixes
- Image CDN configuration
- SEO settings
- Analytics and error tracking
- Cache and rate limiting

## Installation

This package is internal to the monorepo and automatically available to all apps and packages.

```typescript
import { config, isFeatureEnabled, getApiEndpoint } from '@repo/config';
```

## Usage

### Basic Configuration

```typescript
import { config } from '@repo/config';

// Access configuration values
console.log(config.app.env); // 'development'
console.log(config.api.baseUrl); // 'http://localhost:4000/api'
console.log(config.auth.sessionTimeout); // 30 (minutes)
```

### Environment Detection

```typescript
import { getEnvironment, isEnvironment } from '@repo/config';

const env = getEnvironment(); // 'development' | 'staging' | 'production' | 'test'

if (isEnvironment('production')) {
  // Production-only code
}

// Environment helpers
if (config.app.isDevelopment) {
  console.log('Debug info');
}
```

### Feature Flags

```typescript
import { isFeatureEnabled } from '@repo/config';

// Check if a feature is enabled
if (isFeatureEnabled('enableProductReviews')) {
  // Show reviews section
}

if (isFeatureEnabled('enableAIRecommendations')) {
  // Show AI-powered recommendations
}

// Access all flags
import { config } from '@repo/config';
console.log(config.features.enableGuestCheckout); // true
```

### API Endpoints

```typescript
import { getApiEndpoint, config } from '@repo/config';

// Get full URL for an endpoint
const productsUrl = getApiEndpoint('products');
// => 'http://localhost:4000/api/products'

// Make API requests
async function fetchProducts() {
  const url = getApiEndpoint('products');
  const response = await fetch(url, {
    timeout: config.api.timeout,
  });
  return response.json();
}
```

### Storage Keys

```typescript
import { getStorageKey } from '@repo/config';

// Get prefixed storage key
const tokenKey = getStorageKey('authToken');
// => 'ecommerce_auth_token'

// Use with localStorage
localStorage.setItem(getStorageKey('authToken'), token);
const savedToken = localStorage.getItem(getStorageKey('authToken'));
```

### Image URLs

```typescript
import { getImageUrl, config } from '@repo/config';

// Get image URL with size
const thumbnailUrl = getImageUrl('products/shirt.jpg', 'thumbnail');
// => 'http://localhost:3000/images/150x150/products/shirt.jpg'

const largeUrl = getImageUrl('products/shirt.jpg', 'large');
// => 'http://localhost:3000/images/1200x1200/products/shirt.jpg'

// Available sizes
console.log(config.image.sizes);
// {
//   thumbnail: { width: 150, height: 150 },
//   small: { width: 300, height: 300 },
//   medium: { width: 600, height: 600 },
//   large: { width: 1200, height: 1200 }
// }
```

### Get Configuration by Path

```typescript
import { getConfig } from '@repo/config';

// Access nested values using dot notation
const apiTimeout = getConfig<number>('api.timeout'); // 30000
const cdnUrl = getConfig<string>('image.cdn');
const sessionTimeout = getConfig<number>('auth.sessionTimeout'); // 30
```

## Configuration Sections

### 1. App Configuration

```typescript
config.app = {
  env: 'development',
  isDevelopment: true,
  isProduction: false,
  isStaging: false,
  isTest: false,
  appName: 'E-Commerce Platform',
  version: '1.0.0',
  buildTime: '2024-01-01T00:00:00.000Z',
};
```

### 2. API Configuration

```typescript
config.api = {
  baseUrl: 'http://localhost:4000/api',
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  endpoints: {
    auth: '/auth',
    users: '/users',
    products: '/products',
    // ... more endpoints
  },
};
```

### 3. Authentication Configuration

```typescript
config.auth = {
  tokenKey: 'auth_token',
  refreshTokenKey: 'refresh_token',
  sessionTimeout: 30, // minutes
  rememberMeDuration: 30, // days
  passwordMinLength: 8,
  passwordRequireUppercase: true,
  passwordRequireNumber: true,
  passwordRequireSpecialChar: true,
};
```

### 4. Feature Flags

```typescript
config.features = {
  // User features
  enableUserRegistration: true,
  enableSocialLogin: true,
  enableGuestCheckout: true,
  enableWishlist: true,

  // Product features
  enableProductReviews: true,
  enableProductQA: true,

  // Experimental features (off by default)
  enableAIRecommendations: false,
  enableVirtualTryOn: false,
  enableChatSupport: false,
};
```

### 5. Storage Configuration

```typescript
config.storage = {
  prefix: 'ecommerce_',
  keys: {
    authToken: 'auth_token',
    refreshToken: 'refresh_token',
    user: 'user',
    cart: 'cart',
    wishlist: 'wishlist',
    // ... more keys
  },
};
```

### 6. Image Configuration

```typescript
config.image = {
  cdn: 'http://localhost:3000/images',
  placeholder: '/images/placeholder.png',
  sizes: {
    thumbnail: { width: 150, height: 150 },
    small: { width: 300, height: 300 },
    medium: { width: 600, height: 600 },
    large: { width: 1200, height: 1200 },
  },
  formats: ['webp', 'jpg', 'png'],
  maxUploadSize: 5, // MB
};
```

### 7. SEO Configuration

```typescript
config.seo = {
  defaultTitle: 'E-Commerce Platform - Shop Online',
  titleTemplate: '%s | E-Commerce Platform',
  defaultDescription: 'Shop the latest products...',
  keywords: ['e-commerce', 'online shopping', 'shop'],
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@ecommerce',
  siteUrl: 'https://example.com',
};
```

## Environment Variables

Create a `.env` file in your app directory:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:4000/api

# CDN Configuration
VITE_CDN_URL=http://localhost:3000/images

# Analytics (optional)
VITE_GA_ID=UA-XXXXXXXXX-X
VITE_FB_PIXEL_ID=XXXXXXXXXXXXXXXXX

# Error Tracking (optional)
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### Environment Files

Different files for different environments:

```
.env                  # Default
.env.local           # Local overrides (gitignored)
.env.development     # Development
.env.staging         # Staging
.env.production      # Production
```

## Best Practices

### DO ✅

```typescript
// Use helper functions
const url = getApiEndpoint('products');

// Check feature flags
if (isFeatureEnabled('enableWishlist')) {
  // ...
}

// Use storage keys with prefix
localStorage.setItem(getStorageKey('cart'), JSON.stringify(cart));

// Use environment detection
if (config.app.isDevelopment) {
  console.log('Debug info');
}
```

### DON'T ❌

```typescript
// Don't hardcode URLs
const url = 'http://localhost:4000/api/products'; // ❌

// Don't check strings directly
if (config.features.enableWishlist === true) { } // ❌ Use isFeatureEnabled()

// Don't use raw keys
localStorage.setItem('cart', data); // ❌ Use getStorageKey()

// Don't check NODE_ENV directly
if (process.env.NODE_ENV === 'development') { } // ❌ Use config.app.isDevelopment
```

## Feature Flag Strategy

Feature flags allow gradual rollout of new features:

### 1. **Development Phase**
```typescript
config.features.enableAIRecommendations = false; // Off for everyone
```

### 2. **Testing Phase**
```typescript
// Enable for internal users only
const isInternalUser = user.email.endsWith('@company.com');
const showAI = isInternalUser && isFeatureEnabled('enableAIRecommendations');
```

### 3. **Beta Phase**
```typescript
// Enable for beta users
config.features.enableAIRecommendations = user.isBetaTester;
```

### 4. **Production Release**
```typescript
config.features.enableAIRecommendations = true; // On for everyone
```

## Environment-Specific Configuration

```typescript
import { getEnvironment } from '@repo/config';

const env = getEnvironment();

// Different timeout per environment
const timeout = {
  development: 60000, // 60s for debugging
  staging: 30000,     // 30s
  production: 10000,  // 10s
  test: 5000,         // 5s
}[env];
```

## Type Safety

All configuration is fully typed:

```typescript
import type { Config, FeatureFlags } from '@repo/config';

// TypeScript knows all available config keys
const timeout: number = config.api.timeout; // ✅ Type-safe
const invalid = config.api.invalidKey; // ❌ TypeScript error

// Feature flags are typed
const flag: keyof FeatureFlags = 'enableWishlist'; // ✅
const invalid: keyof FeatureFlags = 'invalidFlag'; // ❌ TypeScript error
```

## Adding New Configuration

1. **Add type** to `types.ts`:
```typescript
export interface MyNewConfig {
  setting1: string;
  setting2: number;
}
```

2. **Update Config interface**:
```typescript
export interface Config {
  // ... existing
  myNew: MyNewConfig;
}
```

3. **Add default values** in `config.ts`:
```typescript
export const config: Config = {
  // ... existing
  myNew: {
    setting1: 'value',
    setting2: 42,
  },
};
```

4. **Export** from `index.ts`:
```typescript
export type { MyNewConfig } from './types';
```

## Testing

```typescript
import { config, isFeatureEnabled } from '@repo/config';

describe('Config', () => {
  it('should have correct API base URL', () => {
    expect(config.api.baseUrl).toBeDefined();
  });

  it('should check feature flags', () => {
    expect(isFeatureEnabled('enableWishlist')).toBe(true);
  });
});
```

## Related Packages

- `@repo/types` - Used for type definitions
- `@repo/api` - Uses config for API endpoints
- All micro frontends - Import config for settings

## License

Private - Internal use only
