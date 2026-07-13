/**
 * Error Interceptor
 * 
 * Handles API errors, transforms error responses, and provides
 * consistent error messages
 */

import { AxiosInstance, AxiosError } from 'axios';
import type { ApiErrorResponse, ApiError } from '@repo/types';
import { HTTP_STATUS, API_ERROR_MESSAGES } from '@repo/constants';

/**
 * Transform axios error to ApiError
 */
export const transformError = (error: AxiosError): ApiError => {
  if (error.response) {
    // Server responded with error status
    const data = error.response.data as ApiErrorResponse;
    
    return {
      code: data.error?.code || 'UNKNOWN_ERROR',
      message: data.error?.message || getDefaultErrorMessage(error.response.status),
      statusCode: error.response.status,
      details: data.error?.details,
      timestamp: data.timestamp || new Date().toISOString(),
    };
  } else if (error.request) {
    // Request made but no response
    return {
      code: 'NETWORK_ERROR',
      message: API_ERROR_MESSAGES.NETWORK_ERROR,
      statusCode: 0,
      timestamp: new Date().toISOString(),
    };
  } else {
    // Error setting up request
    return {
      code: 'REQUEST_ERROR',
      message: error.message || API_ERROR_MESSAGES.UNKNOWN_ERROR,
      statusCode: 0,
      timestamp: new Date().toISOString(),
    };
  }
};

/**
 * Get default error message based on status code
 */
const getDefaultErrorMessage = (statusCode: number): string => {
  switch (statusCode) {
    case HTTP_STATUS.BAD_REQUEST:
      return API_ERROR_MESSAGES.VALIDATION_ERROR;
    case HTTP_STATUS.UNAUTHORIZED:
      return API_ERROR_MESSAGES.UNAUTHORIZED;
    case HTTP_STATUS.FORBIDDEN:
      return API_ERROR_MESSAGES.FORBIDDEN;
    case HTTP_STATUS.NOT_FOUND:
      return API_ERROR_MESSAGES.NOT_FOUND;
    case HTTP_STATUS.REQUEST_TIMEOUT:
      return API_ERROR_MESSAGES.TIMEOUT;
    case HTTP_STATUS.TOO_MANY_REQUESTS:
      return API_ERROR_MESSAGES.RATE_LIMIT_EXCEEDED;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      return API_ERROR_MESSAGES.SERVICE_UNAVAILABLE;
    default:
      return API_ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};

/**
 * Response error interceptor
 */
const errorResponseInterceptor = (error: AxiosError) => {
  const transformedError = transformError(error);
  
  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', transformedError);
  }
  
  return Promise.reject(transformedError);
};

/**
 * Setup error interceptor
 */
export const setupErrorInterceptor = (client: AxiosInstance): void => {
  client.interceptors.response.use(
    (response) => response,
    errorResponseInterceptor
  );
};
