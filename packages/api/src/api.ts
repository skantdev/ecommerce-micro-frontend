/**
 * Main API Instance
 * 
 * Configured API client with all interceptors
 */

import { apiClient } from './client';
import { setupInterceptors } from './interceptors';

// Setup all interceptors
setupInterceptors(apiClient);

// Export configured client
export { apiClient };

// Export types
export type { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
