/**
 * Application limits and thresholds
 */
export const LIMITS = {
  // Pagination
  MIN_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Product
  MAX_PRODUCT_IMAGES: 10,
  MAX_PRODUCT_VARIANTS: 50,
  MAX_CART_QUANTITY: 99,
  MIN_PRODUCT_PRICE: 0.01,
  MAX_PRODUCT_PRICE: 999999.99,
  
  // Search
  MIN_SEARCH_LENGTH: 2,
  MAX_SEARCH_LENGTH: 100,
  SEARCH_DEBOUNCE_MS: 300,
  MAX_SEARCH_SUGGESTIONS: 10,
  MAX_RECENT_SEARCHES: 10,
  
  // Review
  MAX_REVIEW_IMAGES: 5,
  MAX_RATING: 5,
  MIN_RATING: 1,
  
  // Cart
  MAX_CART_ITEMS: 50,
  CART_PERSISTENCE_DAYS: 30,
  
  // Wishlist
  MAX_WISHLIST_ITEMS: 100,
  
  // Recently viewed
  MAX_RECENTLY_VIEWED: 20,
  
  // File upload
  MAX_FILE_SIZE_MB: 5,
  MAX_BULK_UPLOAD: 10,
  
  // API
  API_TIMEOUT_MS: 30000,        // 30 seconds
  API_RETRY_ATTEMPTS: 3,
  API_RETRY_DELAY_MS: 1000,
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: 60000,  // 1 minute
  RATE_LIMIT_MAX_REQUESTS: 100,
  
  // Session
  SESSION_TIMEOUT_MINUTES: 30,
  REMEMBER_ME_DAYS: 30,
  
  // Cache
  CACHE_TTL_SECONDS: 300,       // 5 minutes
  CACHE_MAX_SIZE_MB: 50,
  
  // Text lengths
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MAX_NAME_LENGTH: 50,
  MAX_EMAIL_LENGTH: 254,
  MAX_DESCRIPTION_LENGTH: 5000,
  MAX_COMMENT_LENGTH: 2000,
  MAX_ADDRESS_LENGTH: 100,
  
  // Animation durations (ms)
  ANIMATION_FAST: 150,
  ANIMATION_NORMAL: 300,
  ANIMATION_SLOW: 500,
  
  // Toast notifications
  TOAST_DURATION_MS: 5000,
  MAX_TOASTS: 5,
  
  // Autocomplete
  AUTOCOMPLETE_MIN_CHARS: 2,
  AUTOCOMPLETE_DEBOUNCE_MS: 300,
  AUTOCOMPLETE_MAX_RESULTS: 10,
} as const;

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  XS: 320,   // Extra small devices (phones)
  SM: 640,   // Small devices (tablets)
  MD: 768,   // Medium devices (small laptops)
  LG: 1024,  // Large devices (desktops)
  XL: 1280,  // Extra large devices (large desktops)
  XXL: 1536, // 2X large devices (ultra-wide)
} as const;

/**
 * Z-index layers
 */
export const Z_INDEX = {
  BASE: 0,
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
  LOADING_OVERLAY: 1090,
} as const;

/**
 * Default values
 */
export const DEFAULTS = {
  // Pagination
  PAGE: 1,
  PAGE_SIZE: 20,
  
  // Theme
  THEME: 'light' as const,
  
  // Language
  LANGUAGE: 'en',
  
  // Currency
  CURRENCY: 'USD',
  
  // Country
  COUNTRY: 'US',
  
  // Timezone
  TIMEZONE: 'UTC',
  
  // Image
  PRODUCT_IMAGE_PLACEHOLDER: '/images/placeholder-product.png',
  USER_AVATAR_PLACEHOLDER: '/images/placeholder-avatar.png',
  
  // Sort
  SORT_BY: 'relevance' as const,
  SORT_ORDER: 'desc' as const,
  
  // Rating
  RATING: 0,
  
  // Quantity
  QUANTITY: 1,
} as const;

/**
 * Social media platforms
 */
export const SOCIAL_PLATFORMS = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  YOUTUBE: 'youtube',
  PINTEREST: 'pinterest',
  TIKTOK: 'tiktok',
} as const;

/**
 * Payment providers
 */
export const PAYMENT_PROVIDERS = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  CASH_ON_DELIVERY: 'cash_on_delivery',
  BANK_TRANSFER: 'bank_transfer',
} as const;

/**
 * Shipping carriers
 */
export const SHIPPING_CARRIERS = {
  USPS: 'USPS',
  FEDEX: 'FedEx',
  UPS: 'UPS',
  DHL: 'DHL',
  AMAZON: 'Amazon Logistics',
  OTHER: 'Other',
} as const;
