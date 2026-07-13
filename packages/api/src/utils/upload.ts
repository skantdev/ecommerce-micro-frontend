/**
 * Upload Utilities
 * 
 * Helper functions for file uploads
 */

import type { FileUploadResponse } from '@repo/types';
import { apiClient } from '../api';

/**
 * Upload single file
 */
export async function uploadFile(
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<FileUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<FileUploadResponse>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });
  
  return response.data;
}

/**
 * Upload multiple files
 */
export async function uploadFiles(
  url: string,
  files: File[],
  onProgress?: (progress: number) => void
): Promise<FileUploadResponse[]> {
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });
  
  const response = await apiClient.post<FileUploadResponse[]>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });
  
  return response.data;
}

/**
 * Upload with additional data
 */
export async function uploadWithData<T extends Record<string, unknown>>(
  url: string,
  file: File,
  data: T,
  onProgress?: (progress: number) => void
): Promise<FileUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  // Append additional data
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  
  const response = await apiClient.post<FileUploadResponse>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });
  
  return response.data;
}
