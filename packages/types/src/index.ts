/**
 * @repo/types - Shared TypeScript types for E-Commerce Micro Frontend
 *
 * This package contains all shared type definitions, interfaces, and enums
 * used across micro frontends in the e-commerce application.
 *
 * @packageDocumentation
 */

// Common types and utilities
export type {
  Nullable,
  Optional,
  DeepPartial,
  ID,
  Timestamp,
  Money,
  PaginationParams,
  PaginationMeta,
  PaginatedResponse,
  Address,
  Image,
} from './common.types';

// User types
export {
  UserRole,
  UserPermission,
  UserStatus,
} from './user.types';

export type {
  User,
  UserProfile,
  UserPreferences,
  UserRegistration,
  UserLoginCredentials,
  UserSession,
  PasswordResetRequest,
  PasswordResetConfirm,
} from './user.types';

// Product types
export {
  ProductStatus,
} from './product.types';

export type {
  Category,
  Brand,
  ProductVariant,
  ProductReview,
  ProductRating,
  Product,
  ProductListItem,
  ProductFilters,
  ProductSortBy,
} from './product.types';

// Cart types
export type {
  CartItem,
  Cart,
  Coupon,
  AddToCartRequest,
  UpdateCartItemRequest,
  ApplyCouponRequest,
  CartSummary,
} from './cart.types';

// Order types
export {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from './order.types';

export type {
  ShippingMethod,
  OrderItem,
  PaymentInfo,
  ShippingInfo,
  OrderStatusHistory,
  Order,
  OrderListItem,
  CreateOrderRequest,
  OrderFilters,
  CancelOrderRequest,
  ReturnRequest,
} from './order.types';

// API types
export {
  ApiErrorCode,
} from './api.types';

export type {
  ApiResponse,
  ApiErrorResponse,
  ApiError,
  ValidationError,
  ApiRequestOptions,
  ApiPaginationParams,
  FileUploadResponse,
  HealthCheckResponse,
} from './api.types';
