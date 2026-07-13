/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  // Success (2xx)
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Redirection (3xx)
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,

  // Client errors (4xx)
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // Server errors (5xx)
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

/**
 * API error messages
 */
export const API_ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',
  
  // Authentication errors
  UNAUTHORIZED: 'You need to log in to access this resource.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  TOKEN_INVALID: 'Authentication token is invalid.',
  
  // Authorization errors
  FORBIDDEN: 'You do not have permission to perform this action.',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions.',
  
  // Resource errors
  NOT_FOUND: 'The requested resource was not found.',
  RESOURCE_NOT_FOUND: 'Resource not found.',
  
  // Validation errors
  VALIDATION_ERROR: 'Please check your input and try again.',
  INVALID_INPUT: 'Invalid input provided.',
  MISSING_REQUIRED_FIELD: 'Required field is missing.',
  
  // Business logic errors
  OUT_OF_STOCK: 'This product is currently out of stock.',
  INSUFFICIENT_STOCK: 'Not enough items in stock.',
  INVALID_COUPON: 'Invalid or expired coupon code.',
  ORDER_ALREADY_CANCELLED: 'This order has already been cancelled.',
  PAYMENT_FAILED: 'Payment processing failed. Please try again.',
  
  // Conflict errors
  DUPLICATE_ENTRY: 'This entry already exists.',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists.',
  
  // Rate limiting
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.',
  
  // Server errors
  INTERNAL_SERVER_ERROR: 'An internal server error occurred. Please try again later.',
  SERVICE_UNAVAILABLE: 'Service is temporarily unavailable. Please try again later.',
  
  // Generic
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  DEFAULT: 'Something went wrong. Please try again.',
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  // Authentication
  LOGIN_SUCCESS: 'Logged in successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  REGISTER_SUCCESS: 'Account created successfully!',
  PASSWORD_RESET_SENT: 'Password reset email sent!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  
  // Profile
  PROFILE_UPDATED: 'Profile updated successfully!',
  AVATAR_UPDATED: 'Profile picture updated!',
  PREFERENCES_SAVED: 'Preferences saved!',
  
  // Cart
  ADDED_TO_CART: 'Added to cart!',
  REMOVED_FROM_CART: 'Removed from cart!',
  CART_UPDATED: 'Cart updated!',
  CART_CLEARED: 'Cart cleared!',
  
  // Wishlist
  ADDED_TO_WISHLIST: 'Added to wishlist!',
  REMOVED_FROM_WISHLIST: 'Removed from wishlist!',
  
  // Order
  ORDER_PLACED: 'Order placed successfully!',
  ORDER_CANCELLED: 'Order cancelled successfully!',
  
  // Review
  REVIEW_SUBMITTED: 'Review submitted successfully!',
  REVIEW_UPDATED: 'Review updated!',
  REVIEW_DELETED: 'Review deleted!',
  
  // Admin
  PRODUCT_CREATED: 'Product created successfully!',
  PRODUCT_UPDATED: 'Product updated successfully!',
  PRODUCT_DELETED: 'Product deleted successfully!',
  
  // Generic
  SAVED: 'Saved successfully!',
  DELETED: 'Deleted successfully!',
  UPDATED: 'Updated successfully!',
  SENT: 'Sent successfully!',
} as const;

/**
 * Confirmation messages
 */
export const CONFIRM_MESSAGES = {
  DELETE_ACCOUNT: 'Are you sure you want to delete your account? This action cannot be undone.',
  DELETE_ADDRESS: 'Are you sure you want to delete this address?',
  DELETE_PRODUCT: 'Are you sure you want to delete this product?',
  CANCEL_ORDER: 'Are you sure you want to cancel this order?',
  CLEAR_CART: 'Are you sure you want to clear your cart?',
  LOGOUT: 'Are you sure you want to log out?',
  UNSAVED_CHANGES: 'You have unsaved changes. Are you sure you want to leave?',
} as const;
