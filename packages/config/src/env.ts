import type { Environment } from './types';

/**
 * Get current environment from various sources
 */
export function getEnvironment(): Environment {
  // Check Vite environment variable
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const mode = import.meta.env.MODE;
    if (mode === 'production') return 'production';
    if (mode === 'staging') return 'staging';
    if (mode === 'test') return 'test';
    return 'development';
  }

  // Check Node environment variable
  if (typeof process !== 'undefined' && process.env) {
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === 'production') return 'production';
    if (nodeEnv === 'staging') return 'staging';
    if (nodeEnv === 'test') return 'test';
    return 'development';
  }

  // Default to development
  return 'development';
}

/**
 * Get environment variable with fallback
 */
export function getEnvVar(key: string, fallback: string = ''): string {
  // Try Vite import.meta.env
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] ?? fallback;
  }

  // Try process.env
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] ?? fallback;
  }

  return fallback;
}

/**
 * Check if running in browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Check if running in Node.js
 */
export function isNode(): boolean {
  return (
    typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null
  );
}

/**
 * Get API base URL based on environment
 */
export function getApiBaseUrl(env: Environment): string {
  const envUrls: Record<Environment, string> = {
    development: getEnvVar('VITE_API_BASE_URL', 'http://localhost:4000/api'),
    staging: getEnvVar('VITE_API_BASE_URL', 'https://api-staging.example.com/api'),
    production: getEnvVar('VITE_API_BASE_URL', 'https://api.example.com/api'),
    test: getEnvVar('VITE_API_BASE_URL', 'http://localhost:4000/api'),
  };

  return envUrls[env];
}

/**
 * Get CDN URL based on environment
 */
export function getCdnUrl(env: Environment): string {
  const cdnUrls: Record<Environment, string> = {
    development: getEnvVar('VITE_CDN_URL', 'http://localhost:3000/images'),
    staging: getEnvVar('VITE_CDN_URL', 'https://cdn-staging.example.com'),
    production: getEnvVar('VITE_CDN_URL', 'https://cdn.example.com'),
    test: getEnvVar('VITE_CDN_URL', 'http://localhost:3000/images'),
  };

  return cdnUrls[env];
}

/**
 * Validate required environment variables
 */
export function validateEnvVars(required: string[]): void {
  const missing: string[] = [];

  for (const key of required) {
    const value = getEnvVar(key);
    if (!value) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    const message = `Missing required environment variables: ${missing.join(', ')}`;
    console.error(message);
    throw new Error(message);
  }
}
