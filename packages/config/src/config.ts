import type { Config } from './types';
import { getEnvironment, getApiBaseUrl, getCdnUrl } from './env';

/**
 * Application configuration for development environment
 */
export const config: Config = {
  // Application settings
  app: {
    env: getEnvironment(),
    isDevelopment: getEnvironment() === 'development',
    isProduction: getEnvironment() === 'production',
    isStaging: getEnvironment() === 'staging',
    isTest: getEnvironment() === 'test',
    appName: 'E-Commerce Platform',
    version: '1.0.0',
    buildTime: new Date().toISOString(),
  },

  // API configuration
  api: {
    baseUrl: getApiBaseUrl(getEnvironment()),
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
    endpoints: {
      auth: '/auth',
      users: '/users',
      products: '/products',
      categories: '/categories',
      cart: '/cart',
      orders: '/orders',
      payments: '/payments',
      reviews: '/reviews',
      search: '/search',
      analytics: '/analytics',
    },
  },

  // Authentication configuration
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiryKey: 'token_expiry',
    sessionTimeout: 30, // 30 minutes
    rememberMeDuration: 30, // 30 days
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumber: true,
    passwordRequireSpecialChar: true,
  },

  // Feature flags
  features: {
    // User features
    enableUserRegistration: true,
    enableSocialLogin: true,
    enableGuestCheckout: true,
    enableWishlist: true,
    enableProductCompare: true,

    // Product features
    enableProductReviews: true,
    enableProductQA: true,
    enableRelatedProducts: true,
    enableRecentlyViewed: true,

    // Cart features
    enableCartPersistence: true,
    enableCartSharing: false,
    enableSaveForLater: true,

    // Checkout features
    enableExpressCheckout: true,
    enableMultipleAddresses: true,
    enableGiftWrapping: false,
    enableOrderNotes: true,

    // Payment features
    enableCreditCard: true,
    enablePaypal: true,
    enableStripe: true,
    enableCashOnDelivery: true,

    // Admin features
    enableAnalytics: true,
    enableAdminPanel: true,
    enableBulkOperations: true,

    // Experimental features (off by default)
    enableAIRecommendations: false,
    enableVirtualTryOn: false,
    enableChatSupport: false,
  },

  // Storage configuration
  storage: {
    prefix: 'ecommerce_',
    keys: {
      authToken: 'auth_token',
      refreshToken: 'refresh_token',
      user: 'user',
      cart: 'cart',
      wishlist: 'wishlist',
      recentlyViewed: 'recently_viewed',
      preferences: 'preferences',
      theme: 'theme',
    },
  },

  // Pagination settings
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
    defaultPage: 1,
  },

  // Image configuration
  image: {
    cdn: getCdnUrl(getEnvironment()),
    placeholder: '/images/placeholder.png',
    sizes: {
      thumbnail: { width: 150, height: 150 },
      small: { width: 300, height: 300 },
      medium: { width: 600, height: 600 },
      large: { width: 1200, height: 1200 },
    },
    formats: ['webp', 'jpg', 'png'],
    maxUploadSize: 5, // 5 MB
  },

  // SEO configuration
  seo: {
    defaultTitle: 'E-Commerce Platform - Shop Online',
    titleTemplate: '%s | E-Commerce Platform',
    defaultDescription:
      'Shop the latest products with fast shipping and secure checkout. Your trusted online shopping destination.',
    keywords: [
      'e-commerce',
      'online shopping',
      'buy online',
      'shop',
      'products',
      'deals',
    ],
    ogImage: '/images/og-image.jpg',
    twitterHandle: '@ecommerce',
    siteUrl: 'https://example.com',
  },

  // Analytics configuration
  analytics: {
    enabled: getEnvironment() === 'production',
    googleAnalyticsId: undefined, // Set in .env
    facebookPixelId: undefined, // Set in .env
    mixpanelToken: undefined, // Set in .env
    hotjarId: undefined, // Set in .env
    segmentKey: undefined, // Set in .env
  },

  // Error tracking
  errorTracking: {
    enabled: getEnvironment() === 'production' || getEnvironment() === 'staging',
    sentryDsn: undefined, // Set in .env
    environment: getEnvironment(),
    sampleRate: getEnvironment() === 'production' ? 0.1 : 1.0,
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
    ],
  },

  // Cache configuration
  cache: {
    enabled: true,
    ttl: 300, // 5 minutes
    maxSize: 50, // 50 MB
    strategy: 'memory',
  },

  // Rate limiting
  rateLimit: {
    enabled: true,
    maxRequests: 100,
    windowMs: 60000, // 1 minute
    message: 'Too many requests, please try again later.',
  },
};

/**
 * Get configuration value by path
 * @example getConfig('api.baseUrl') => 'http://localhost:4000/api'
 */
export function getConfig<T = unknown>(path: string): T {
  const keys = path.split('.');
  let value: any = config;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      throw new Error(`Config path not found: ${path}`);
    }
  }

  return value as T;
}

/**
 * Check if a feature flag is enabled
 */
export function isFeatureEnabled(feature: keyof typeof config.features): boolean {
  return config.features[feature] === true;
}

/**
 * Get API endpoint URL
 */
export function getApiEndpoint(endpoint: keyof typeof config.api.endpoints): string {
  const baseUrl = config.api.baseUrl;
  const path = config.api.endpoints[endpoint];
  return `${baseUrl}${path}`;
}

/**
 * Get storage key with prefix
 */
export function getStorageKey(key: keyof typeof config.storage.keys): string {
  return `${config.storage.prefix}${config.storage.keys[key]}`;
}

/**
 * Get image URL with size
 */
export function getImageUrl(
  path: string,
  size: keyof typeof config.image.sizes = 'medium'
): string {
  const cdnUrl = config.image.cdn;
  const dimensions = config.image.sizes[size];
  return `${cdnUrl}/${dimensions.width}x${dimensions.height}/${path}`;
}

/**
 * Check if current environment matches
 */
export function isEnvironment(env: typeof config.app.env): boolean {
  return config.app.env === env;
}
