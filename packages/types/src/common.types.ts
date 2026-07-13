/**
 * Common utility types used across the application
 */

/**
 * Makes all properties of T nullable
 */
export type Nullable<T> = T | null;

/**
 * Makes all properties of T optional and nullable
 */
export type Optional<T> = T | null | undefined;

/**
 * Recursively makes all properties of T optional
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Generic ID type for entity identifiers
 */
export type ID = string | number;

/**
 * Timestamp type (ISO 8601 string)
 */
export type Timestamp = string;

/**
 * Currency amount type (in cents to avoid floating point issues)
 */
export type Money = number;

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Generic paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Address type used for shipping and billing
 */
export interface Address {
  id: ID;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

/**
 * Image type for product images, avatars, etc.
 */
export interface Image {
  id: ID;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  thumbnail?: string;
  isPrimary?: boolean;
}
