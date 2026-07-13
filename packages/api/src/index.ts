/**
 * @repo/api - API Client for E-Commerce Micro Frontend
 * 
 * Configured Axios client with interceptors for authentication,
 * error handling, retry logic, and request/response transformation.
 * 
 * @packageDocumentation
 */

// Main API client
export { apiClient } from './api';
export type { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from './api';

// Client factory
export { createApiClient, isAxiosError } from './client';

// Interceptors
export {
  setupInterceptors,
  setupAuthInterceptor,
  setupErrorInterceptor,
  setupRetryInterceptor,
  setupLoggingInterceptor,
  transformError,
  saveAuthToken,
  saveRefreshToken,
  clearAuthTokens,
} from './interceptors';

// Utilities
export {
  get,
  post,
  put,
  patch,
  del,
  getPaginated,
  buildQueryString,
  uploadFile,
  uploadFiles,
  uploadWithData,
} from './utils';
