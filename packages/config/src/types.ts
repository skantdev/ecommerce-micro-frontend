/**
 * Environment types
 */
export type Environment = 'development' | 'staging' | 'production' | 'test';

/**
 * Application environment configuration
 */
export interface AppConfig {
  env: Environment;
  isDevelopment: boolean;
  isProduction: boolean;
  isStaging: boolean;
  isTest: boolean;
  appName: string;
  version: string;
  buildTime: string;
}

/**
 * API endpoint configuration
 */
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  endpoints: {
    auth: string;
    users: string;
    products: string;
    categories: string;
    cart: string;
    orders: string;
    payments: string;
    reviews: string;
    search: string;
    analytics: string;
  };
}

/**
 * Authentication configuration
 */
export interface AuthConfig {
  tokenKey: string;
  refreshTokenKey: string;
  tokenExpiryKey: string;
  sessionTimeout: number; // in minutes
  rememberMeDuration: number; // in days
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireNumber: boolean;
  passwordRequireSpecialChar: boolean;
}

/**
 * Feature flags for gradual rollout
 */
export interface FeatureFlags {
  // User features
  enableUserRegistration: boolean;
  enableSocialLogin: boolean;
  enableGuestCheckout: boolean;
  enableWishlist: boolean;
  enableProductCompare: boolean;

  // Product features
  enableProductReviews: boolean;
  enableProductQA: boolean;
  enableRelatedProducts: boolean;
  enableRecentlyViewed: boolean;

  // Cart features
  enableCartPersistence: boolean;
  enableCartSharing: boolean;
  enableSaveForLater: boolean;

  // Checkout features
  enableExpressCheckout: boolean;
  enableMultipleAddresses: boolean;
  enableGiftWrapping: boolean;
  enableOrderNotes: boolean;

  // Payment features
  enableCreditCard: boolean;
  enablePaypal: boolean;
  enableStripe: boolean;
  enableCashOnDelivery: boolean;

  // Admin features
  enableAnalytics: boolean;
  enableAdminPanel: boolean;
  enableBulkOperations: boolean;

  // Experimental features
  enableAIRecommendations: boolean;
  enableVirtualTryOn: boolean;
  enableChatSupport: boolean;
}

/**
 * Storage configuration
 */
export interface StorageConfig {
  prefix: string;
  keys: {
    authToken: string;
    refreshToken: string;
    user: string;
    cart: string;
    wishlist: string;
    recentlyViewed: string;
    preferences: string;
    theme: string;
  };
}

/**
 * Pagination configuration
 */
export interface PaginationConfig {
  defaultLimit: number;
  maxLimit: number;
  defaultPage: number;
}

/**
 * Image configuration
 */
export interface ImageConfig {
  cdn: string;
  placeholder: string;
  sizes: {
    thumbnail: { width: number; height: number };
    small: { width: number; height: number };
    medium: { width: number; height: number };
    large: { width: number; height: number };
  };
  formats: string[];
  maxUploadSize: number; // in MB
}

/**
 * SEO configuration
 */
export interface SeoConfig {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
  siteUrl: string;
}

/**
 * Analytics configuration
 */
export interface AnalyticsConfig {
  enabled: boolean;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  mixpanelToken?: string;
  hotjarId?: string;
  segmentKey?: string;
}

/**
 * Error tracking configuration
 */
export interface ErrorTrackingConfig {
  enabled: boolean;
  sentryDsn?: string;
  environment: Environment;
  sampleRate: number;
  ignoreErrors: string[];
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  enabled: boolean;
  ttl: number; // in seconds
  maxSize: number; // in MB
  strategy: 'memory' | 'localStorage' | 'sessionStorage';
}

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  enabled: boolean;
  maxRequests: number;
  windowMs: number;
  message: string;
}

/**
 * Complete application configuration
 */
export interface Config {
  app: AppConfig;
  api: ApiConfig;
  auth: AuthConfig;
  features: FeatureFlags;
  storage: StorageConfig;
  pagination: PaginationConfig;
  image: ImageConfig;
  seo: SeoConfig;
  analytics: AnalyticsConfig;
  errorTracking: ErrorTrackingConfig;
  cache: CacheConfig;
  rateLimit: RateLimitConfig;
}
