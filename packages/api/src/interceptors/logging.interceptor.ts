/**
 * Logging Interceptor
 * 
 * Logs API requests and responses for debugging
 * Only active in development mode
 */

import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Request logging interceptor
 */
const requestLoggingInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      params: config.params,
      data: config.data,
      headers: config.headers,
    });
  }
  
  return config;
};

/**
 * Response logging interceptor
 */
const responseLoggingInterceptor = (response: AxiosResponse): AxiosResponse => {
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ API Response:', {
      method: response.config.method?.toUpperCase(),
      url: response.config.url,
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    });
  }
  
  return response;
};

/**
 * Setup logging interceptor (development only)
 */
export const setupLoggingInterceptor = (client: AxiosInstance): void => {
  if (process.env.NODE_ENV === 'development') {
    // Request logging
    client.interceptors.request.use(
      requestLoggingInterceptor,
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );
    
    // Response logging
    client.interceptors.response.use(
      responseLoggingInterceptor,
      (error) => {
        console.error('❌ Response Error:', error);
        return Promise.reject(error);
      }
    );
  }
};
