/**
 * Retry Interceptor
 * 
 * Automatically retries failed requests with exponential backoff
 */

import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { config } from '@repo/config';
import { HTTP_STATUS } from '@repo/constants';

interface RetryConfig extends InternalAxiosRequestConfig {
  __retryCount?: number;
}

/**
 * Check if error is retryable
 */
const isRetryableError = (error: AxiosError): boolean => {
  if (!error.response) {
    // Network errors are retryable
    return true;
  }
  
  // Retry on server errors and rate limiting
  const retryableStatuses: number[] = [
    HTTP_STATUS.REQUEST_TIMEOUT,
    HTTP_STATUS.TOO_MANY_REQUESTS,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    HTTP_STATUS.BAD_GATEWAY,
    HTTP_STATUS.SERVICE_UNAVAILABLE,
    HTTP_STATUS.GATEWAY_TIMEOUT,
  ];
  
  return retryableStatuses.includes(error.response.status);
};

/**
 * Calculate retry delay with exponential backoff
 */
const getRetryDelay = (retryCount: number): number => {
  const baseDelay = config.api.retryDelay;
  // Exponential backoff: 1s, 2s, 4s, 8s, ...
  return baseDelay * Math.pow(2, retryCount);
};

/**
 * Delay helper
 */
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Setup retry interceptor
 */
export const setupRetryInterceptor = (client: AxiosInstance): void => {
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryConfig;
      
      if (!originalRequest) {
        return Promise.reject(error);
      }
      
      // Initialize retry count
      originalRequest.__retryCount = originalRequest.__retryCount || 0;
      
      // Check if we should retry
      if (
        originalRequest.__retryCount >= config.api.retryAttempts ||
        !isRetryableError(error)
      ) {
        return Promise.reject(error);
      }
      
      // Increment retry count
      originalRequest.__retryCount += 1;
      
      // Calculate delay
      const retryDelay = getRetryDelay(originalRequest.__retryCount);
      
      // Log retry attempt in development
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `Retrying request (attempt ${originalRequest.__retryCount}/${config.api.retryAttempts}) after ${retryDelay}ms:`,
          originalRequest.url
        );
      }
      
      // Wait before retrying
      await delay(retryDelay);
      
      // Retry the request
      return client(originalRequest);
    }
  );
};
