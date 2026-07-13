/**
 * API Client Configuration
 * 
 * Configures Axios instance with base settings, timeouts, and headers
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from '@repo/config';

/**
 * Create and configure Axios instance
 */
export const createApiClient = (baseConfig?: AxiosRequestConfig): AxiosInstance => {
  const client = axios.create({
    baseURL: config.api.baseUrl,
    timeout: config.api.timeout,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...baseConfig,
  });

  return client;
};

/**
 * Default API client instance
 */
export const apiClient = createApiClient();

/**
 * Helper to check if error is axios error
 */
export const isAxiosError = axios.isAxiosError;
