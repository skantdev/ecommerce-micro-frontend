/**
 * API Interceptors
 * 
 * Exports all interceptors and setup function
 */

import { AxiosInstance } from 'axios';
import { setupAuthInterceptor } from './auth.interceptor';
import { setupErrorInterceptor } from './error.interceptor';
import { setupRetryInterceptor } from './retry.interceptor';
import { setupLoggingInterceptor } from './logging.interceptor';

export * from './auth.interceptor';
export * from './error.interceptor';
export * from './retry.interceptor';
export * from './logging.interceptor';

/**
 * Setup all interceptors
 * 
 * Order matters:
 * 1. Logging (request) - log before modification
 * 2. Auth - add auth token
 * 3. Retry (response) - retry before error handling
 * 4. Error (response) - transform errors
 * 5. Logging (response) - log after processing
 */
export const setupInterceptors = (client: AxiosInstance): void => {
  // Setup in order
  setupLoggingInterceptor(client); // Must be first for request logging
  setupAuthInterceptor(client);
  setupRetryInterceptor(client);
  setupErrorInterceptor(client);
  // Logging for response is already in setupLoggingInterceptor
};
