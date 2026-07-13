/**
 * Validation rules and patterns
 */

/**
 * Email validation regex (RFC 5322 compliant)
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Strong password regex (min 8 chars, uppercase, lowercase, number, special char)
 */
export const PASSWORD_STRONG_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Medium password regex (min 8 chars, uppercase, lowercase, number)
 */
export const PASSWORD_MEDIUM_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Phone number regex (international format)
 */
export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

/**
 * US phone number regex
 */
export const US_PHONE_REGEX = /^(\+1[-.]?)?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/;

/**
 * Postal code regex (US ZIP code)
 */
export const US_ZIP_REGEX = /^\d{5}(-\d{4})?$/;

/**
 * Postal code regex (UK postcode)
 */
export const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;

/**
 * Credit card number regex (basic validation)
 */
export const CREDIT_CARD_REGEX = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/;

/**
 * CVV regex
 */
export const CVV_REGEX = /^[0-9]{3,4}$/;

/**
 * URL regex
 */
export const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

/**
 * Slug regex (URL-friendly string)
 */
export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Alphanumeric only
 */
export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

/**
 * Username regex (alphanumeric, underscore, dash, 3-20 chars)
 */
export const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;

/**
 * Hex color regex
 */
export const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

/**
 * Validation constraints
 */
export const VALIDATION = {
  // User
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  BIO_MAX_LENGTH: 500,

  // Product
  PRODUCT_NAME_MIN_LENGTH: 3,
  PRODUCT_NAME_MAX_LENGTH: 200,
  PRODUCT_DESCRIPTION_MIN_LENGTH: 10,
  PRODUCT_DESCRIPTION_MAX_LENGTH: 5000,
  PRODUCT_SKU_LENGTH: 20,
  PRODUCT_PRICE_MIN: 0,
  PRODUCT_PRICE_MAX: 999999999, // $9,999,999.99

  // Review
  REVIEW_TITLE_MIN_LENGTH: 5,
  REVIEW_TITLE_MAX_LENGTH: 100,
  REVIEW_COMMENT_MIN_LENGTH: 10,
  REVIEW_COMMENT_MAX_LENGTH: 2000,
  REVIEW_RATING_MIN: 1,
  REVIEW_RATING_MAX: 5,

  // Order
  ORDER_NOTES_MAX_LENGTH: 500,
  ADDRESS_LINE_MAX_LENGTH: 100,
  CITY_MAX_LENGTH: 50,
  STATE_MAX_LENGTH: 50,
  POSTAL_CODE_MAX_LENGTH: 20,

  // Image
  IMAGE_MAX_SIZE_MB: 5,
  IMAGE_MAX_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_IMAGE_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],

  // Search
  SEARCH_MIN_LENGTH: 2,
  SEARCH_MAX_LENGTH: 100,

  // Pagination
  MIN_PAGE_SIZE: 1,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE_SIZE: 20,
} as const;

/**
 * Validation error messages
 */
export const VALIDATION_MESSAGES = {
  // Required fields
  REQUIRED: 'This field is required',
  
  // Email
  EMAIL_INVALID: 'Please enter a valid email address',
  EMAIL_ALREADY_EXISTS: 'This email is already registered',
  
  // Password
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_TOO_WEAK: 'Password must contain uppercase, lowercase, number, and special character',
  PASSWORD_MISMATCH: 'Passwords do not match',
  
  // Username
  USERNAME_TOO_SHORT: `Username must be at least ${VALIDATION.USERNAME_MIN_LENGTH} characters`,
  USERNAME_TOO_LONG: `Username must be at most ${VALIDATION.USERNAME_MAX_LENGTH} characters`,
  USERNAME_INVALID: 'Username can only contain letters, numbers, underscores, and dashes',
  USERNAME_TAKEN: 'This username is already taken',
  
  // Phone
  PHONE_INVALID: 'Please enter a valid phone number',
  
  // Credit card
  CARD_NUMBER_INVALID: 'Please enter a valid card number',
  CVV_INVALID: 'Please enter a valid CVV',
  EXPIRY_INVALID: 'Please enter a valid expiry date',
  
  // General
  INVALID_FORMAT: 'Invalid format',
  TOO_SHORT: 'This field is too short',
  TOO_LONG: 'This field is too long',
  OUT_OF_RANGE: 'Value is out of acceptable range',
  
  // Numeric
  MUST_BE_NUMBER: 'Must be a number',
  MUST_BE_POSITIVE: 'Must be a positive number',
  MUST_BE_INTEGER: 'Must be a whole number',
} as const;
