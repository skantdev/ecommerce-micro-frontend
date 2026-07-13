# @repo/api

HTTP API client for the E-Commerce Micro Frontend platform. Built on Axios with interceptors for authentication, error handling, retry logic, and logging.

## Overview

This package provides:

- **Configured Axios client** with base URL and timeout
- **Authentication interceptor** - automatically injects auth tokens
- **Error interceptor** - transforms and normalizes API errors
- **Retry interceptor** - retries failed requests with exponential backoff
- **Logging interceptor** - logs requests/responses in development
- **Request utilities** - helper functions for common operations
- **Upload utilities** - file upload with progress tracking
- **Type-safe API calls** - fully typed with @repo/types

## Installation

This package is internal to the monorepo and automatically available to all apps and packages.

```typescript
import { apiClient, get, post } from '@repo/api';
```

## Quick Start

### Basic Usage

```typescript
import { apiClient } from '@repo/api';

// GET request
const response = await apiClient.get('/products');

// POST request
const newProduct = await apiClient.post('/products', {
  name: 'New Product',
  price: 1999, // in cents
});

// PUT request
await apiClient.put(`/products/${id}`, updatedData);

// DELETE request
await apiClient.delete(`/products/${id}`);
```

### Using Helper Functions

```typescript
import { get, post, put, del, getPaginated } from '@repo/api';
import type { Product, PaginationParams } from '@repo/types';

// Typed GET request
const response = await get<Product>(`/products/${id}`);
console.log(response.data); // Product

// Typed POST request
const created = await post<Product>('/products', {
  name: 'New Product',
  price: 1999,
});

// Paginated request
const paginated = await getPaginated<Product[]>('/products', {
  page: 1,
  limit: 20,
  sortBy: 'createdAt',
  sortOrder: 'desc',
});
console.log(paginated.data); // Product[]
console.log(paginated.meta); // PaginationMeta
```

## Features

### 1. Authentication Interceptor

Automatically injects authentication tokens into requests.

```typescript
import { saveAuthToken, clearAuthTokens } from '@repo/api';

// Login
const loginResponse = await post('/auth/login', {
  email: 'user@example.com',
  password: 'password',
});

// Save token (will be auto-injected in subsequent requests)
saveAuthToken(loginResponse.data.token);

// All requests now include: Authorization: Bearer <token>
await get('/profile'); // ✅ Authenticated

// Logout
clearAuthTokens();
```

**How it works:**
- Reads token from localStorage using `STORAGE_KEYS.AUTH_TOKEN`
- Adds `Authorization: Bearer <token>` header to all requests
- Automatically handles token injection for every request

### 2. Error Interceptor

Transforms Axios errors into consistent `ApiError` objects.

```typescript
import { get } from '@repo/api';
import type { ApiError } from '@repo/types';

try {
  await get('/products/invalid-id');
} catch (error) {
  const apiError = error as ApiError;
  
  console.log(apiError.code);        // 'NOT_FOUND'
  console.log(apiError.message);     // 'The requested resource was not found.'
  console.log(apiError.statusCode);  // 404
  console.log(apiError.timestamp);   // '2024-01-15T10:30:00Z'
  
  // Show to user
  showToast(apiError.message, 'error');
}
```

**Error transformation:**
- Network errors → `NETWORK_ERROR`
- Timeout → `TIMEOUT`
- 400 → `VALIDATION_ERROR`
- 401 → `UNAUTHORIZED`
- 403 → `FORBIDDEN`
- 404 → `NOT_FOUND`
- 429 → `RATE_LIMIT_EXCEEDED`
- 500 → `INTERNAL_SERVER_ERROR`
- 503 → `SERVICE_UNAVAILABLE`

### 3. Retry Interceptor

Automatically retries failed requests with exponential backoff.

```typescript
// Retries automatically for retryable errors
await get('/products'); 

// Retryable errors:
// - Network errors
// - 408 Request Timeout
// - 429 Too Many Requests
// - 500 Internal Server Error
// - 502 Bad Gateway
// - 503 Service Unavailable
// - 504 Gateway Timeout

// Non-retryable errors (fails immediately):
// - 400 Bad Request
// - 401 Unauthorized
// - 403 Forbidden
// - 404 Not Found
```

**Retry strategy:**
- Max attempts: 3 (from `config.api.retryAttempts`)
- Exponential backoff: 1s, 2s, 4s, 8s, ...
- Base delay: 1000ms (from `config.api.retryDelay`)
- Logs retry attempts in development

### 4. Logging Interceptor (Development Only)

Logs all requests and responses in development mode.

```
🚀 API Request: {
  method: 'GET',
  url: '/products',
  params: { page: 1, limit: 20 },
  headers: { Authorization: 'Bearer ...' }
}

✅ API Response: {
  method: 'GET',
  url: '/products',
  status: 200,
  data: { ... }
}
```

**When enabled:**
- Only in `process.env.NODE_ENV === 'development'`
- Automatically disabled in production
- Logs request before sending
- Logs response after receiving
- Logs errors with ❌ prefix

## API Reference

### Client

```typescript
import { apiClient, createApiClient } from '@repo/api';

// Default client (pre-configured with interceptors)
apiClient.get('/products');

// Create custom client
const customClient = createApiClient({
  baseURL: 'https://custom-api.com',
  timeout: 5000,
});
```

### Request Functions

```typescript
// GET
get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>

// POST
post<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>>

// PUT
put<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>>

// PATCH
patch<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>>

// DELETE
del<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>

// Paginated GET
getPaginated<T>(
  url: string,
  params: PaginationParams,
  config?: AxiosRequestConfig
): Promise<PaginatedResponse<T>>
```

### Upload Functions

```typescript
// Single file
uploadFile(
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<FileUploadResponse>

// Multiple files
uploadFiles(
  url: string,
  files: File[],
  onProgress?: (progress: number) => void
): Promise<FileUploadResponse[]>

// File with additional data
uploadWithData<T>(
  url: string,
  file: File,
  data: T,
  onProgress?: (progress: number) => void
): Promise<FileUploadResponse>
```

### Auth Functions

```typescript
// Save token (auto-inject in requests)
saveAuthToken(token: string): void

// Save refresh token
saveRefreshToken(token: string): void

// Clear all tokens
clearAuthTokens(): void
```

### Utility Functions

```typescript
// Build query string
buildQueryString(params: Record<string, unknown>): string

// Check if error is Axios error
isAxiosError(error: unknown): boolean

// Transform Axios error to ApiError
transformError(error: AxiosError): ApiError
```

## Usage Examples

### Example 1: Authentication Flow

```typescript
import { post, saveAuthToken, clearAuthTokens } from '@repo/api';
import type { UserSession, UserLoginCredentials } from '@repo/types';

// Login
const login = async (credentials: UserLoginCredentials) => {
  try {
    const response = await post<UserSession>('/auth/login', credentials);
    
    // Save tokens
    saveAuthToken(response.data.accessToken);
    if (response.data.refreshToken) {
      saveRefreshToken(response.data.refreshToken);
    }
    
    return response.data;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message);
  }
};

// Logout
const logout = async () => {
  await post('/auth/logout');
  clearAuthTokens();
};
```

### Example 2: CRUD Operations

```typescript
import { get, post, put, del } from '@repo/api';
import type { Product, ApiResponse } from '@repo/types';

// List products
const listProducts = async () => {
  const response = await get<Product[]>('/products');
  return response.data;
};

// Get single product
const getProduct = async (id: string) => {
  const response = await get<Product>(`/products/${id}`);
  return response.data;
};

// Create product
const createProduct = async (data: Partial<Product>) => {
  const response = await post<Product>('/products', data);
  return response.data;
};

// Update product
const updateProduct = async (id: string, data: Partial<Product>) => {
  const response = await put<Product>(`/products/${id}`, data);
  return response.data;
};

// Delete product
const deleteProduct = async (id: string) => {
  await del(`/products/${id}`);
};
```

### Example 3: Pagination

```typescript
import { getPaginated } from '@repo/api';
import type { Product, PaginationParams } from '@repo/types';

const fetchProducts = async (params: PaginationParams) => {
  const response = await getPaginated<Product[]>('/products', {
    page: params.page,
    limit: params.limit,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  
  console.log(response.data);         // Product[]
  console.log(response.meta.total);   // Total count
  console.log(response.meta.page);    // Current page
  console.log(response.meta.limit);   // Items per page
  console.log(response.meta.pages);   // Total pages
  
  return response;
};
```

### Example 4: File Upload

```typescript
import { uploadFile, uploadWithData } from '@repo/api';

// Upload single file with progress
const handleUpload = async (file: File) => {
  try {
    const response = await uploadFile(
      '/products/images',
      file,
      (progress) => {
        console.log(`Upload progress: ${progress}%`);
        setUploadProgress(progress);
      }
    );
    
    console.log('Uploaded:', response.url);
    return response;
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

// Upload with metadata
const uploadProductImage = async (file: File, productId: string) => {
  return uploadWithData(
    '/products/images',
    file,
    { productId, type: 'main' },
    (progress) => console.log(`${progress}%`)
  );
};
```

### Example 5: Error Handling

```typescript
import { post } from '@repo/api';
import type { ApiError } from '@repo/types';
import { HTTP_STATUS, API_ERROR_MESSAGES } from '@repo/constants';

const createOrder = async (orderData: CreateOrderRequest) => {
  try {
    const response = await post('/orders', orderData);
    return response.data;
  } catch (error) {
    const apiError = error as ApiError;
    
    // Handle specific errors
    switch (apiError.statusCode) {
      case HTTP_STATUS.UNAUTHORIZED:
        // Redirect to login
        router.push('/login');
        showToast(API_ERROR_MESSAGES.UNAUTHORIZED, 'error');
        break;
        
      case HTTP_STATUS.BAD_REQUEST:
        // Show validation errors
        if (apiError.details) {
          apiError.details.forEach(detail => {
            showFieldError(detail.field, detail.message);
          });
        }
        break;
        
      case HTTP_STATUS.CONFLICT:
        // Handle out of stock
        showToast(API_ERROR_MESSAGES.OUT_OF_STOCK, 'warning');
        break;
        
      default:
        // Generic error
        showToast(apiError.message, 'error');
    }
    
    throw error;
  }
};
```

### Example 6: Query String Building

```typescript
import { buildQueryString, get } from '@repo/api';

const searchProducts = async (filters: ProductFilters) => {
  const queryString = buildQueryString({
    category: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    brands: filters.brands, // Array
    inStock: filters.inStock,
  });
  
  // /products/search?category=electronics&minPrice=10&maxPrice=100&brands=apple&brands=samsung&inStock=true
  const url = `/products/search?${queryString}`;
  
  const response = await get<Product[]>(url);
  return response.data;
};
```

## Configuration

API client uses configuration from `@repo/config`:

```typescript
{
  api: {
    baseUrl: 'http://localhost:4000/api',  // From environment
    timeout: 30000,                         // 30 seconds
    retryAttempts: 3,                       // Max retry attempts
    retryDelay: 1000,                       // Base delay (ms)
  }
}
```

## Interceptor Order

Interceptors are applied in specific order for correct behavior:

**Request interceptors (bottom-up):**
1. Logging - Log original request
2. Auth - Add auth token

**Response interceptors (top-down):**
1. Retry - Retry failed requests
2. Error - Transform errors
3. Logging - Log final response

## Testing

```typescript
import { apiClient, createApiClient } from '@repo/api';
import MockAdapter from 'axios-mock-adapter';

describe('API Client', () => {
  let mock: MockAdapter;
  
  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });
  
  afterEach(() => {
    mock.reset();
  });
  
  it('should fetch products', async () => {
    const products = [{ id: '1', name: 'Product 1' }];
    mock.onGet('/products').reply(200, { data: products });
    
    const response = await get<Product[]>('/products');
    expect(response.data).toEqual(products);
  });
  
  it('should handle errors', async () => {
    mock.onGet('/products/invalid').reply(404);
    
    await expect(get('/products/invalid')).rejects.toMatchObject({
      code: 'NOT_FOUND',
      statusCode: 404,
    });
  });
});
```

## Best Practices

### DO ✅

```typescript
// Use helper functions for type safety
const response = await get<Product>(`/products/${id}`);

// Handle errors properly
try {
  await post('/orders', data);
} catch (error) {
  const apiError = error as ApiError;
  showToast(apiError.message);
}

// Save tokens after login
saveAuthToken(token);

// Clear tokens on logout
clearAuthTokens();
```

### DON'T ❌

```typescript
// Don't use raw axios without types
const response = await axios.get('/products'); // ❌

// Don't ignore errors
await post('/orders', data); // ❌ No error handling

// Don't manually add auth headers
apiClient.get('/profile', {
  headers: { Authorization: `Bearer ${token}` } // ❌ Use interceptor
});

// Don't store tokens in variables
const token = 'abc123'; // ❌ Use saveAuthToken()
```

## Troubleshooting

### Token not being sent

```typescript
// Check if token is saved
const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
if (!token) {
  saveAuthToken(yourToken);
}
```

### CORS errors

Make sure server allows credentials:

```typescript
// Server-side
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
```

### Timeout errors

Increase timeout for slow endpoints:

```typescript
await get('/large-data', {
  timeout: 60000, // 60 seconds
});
```

## Related Packages

- `@repo/types` - TypeScript type definitions
- `@repo/config` - Configuration (API base URL, timeout)
- `@repo/constants` - HTTP status codes, error messages, storage keys

## License

Private - Internal use only
