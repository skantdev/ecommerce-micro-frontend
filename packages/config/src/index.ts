/**
 * @repo/config - Configuration management for E-Commerce Micro Frontend
 *
 * This package provides centralized configuration for all micro frontends,
 * including environment variables, API endpoints, feature flags, and more.
 *
 * @packageDocumentation
 */

// Export types
export type {
  Environment,
  AppConfig,
  ApiConfig,
  AuthConfig,
  FeatureFlags,
  StorageConfig,
  PaginationConfig,
  ImageConfig,
  SeoConfig,
  AnalyticsConfig,
  ErrorTrackingConfig,
  CacheConfig,
  RateLimitConfig,
  Config,
} from './types';

// Export environment utilities
export {
  getEnvironment,
  getEnvVar,
  isBrowser,
  isNode,
  getApiBaseUrl,
  getCdnUrl,
  validateEnvVars,
} from './env';

// Export configuration
export {
  config,
  getConfig,
  isFeatureEnabled,
  getApiEndpoint,
  getStorageKey,
  getImageUrl,
  isEnvironment,
} from './config';
