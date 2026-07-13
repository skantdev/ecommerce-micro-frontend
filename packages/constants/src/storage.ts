/**
 * LocalStorage keys
 * All keys are prefixed to avoid conflicts with other applications
 */
export const STORAGE_KEYS = {
  // Authentication
  AUTH_TOKEN: 'ecommerce_auth_token',
  REFRESH_TOKEN: 'ecommerce_refresh_token',
  TOKEN_EXPIRY: 'ecommerce_token_expiry',
  REMEMBER_ME: 'ecommerce_remember_me',

  // User data
  USER: 'ecommerce_user',
  USER_PREFERENCES: 'ecommerce_user_preferences',

  // Cart
  CART: 'ecommerce_cart',
  CART_ID: 'ecommerce_cart_id',

  // Wishlist
  WISHLIST: 'ecommerce_wishlist',

  // Recently viewed
  RECENTLY_VIEWED: 'ecommerce_recently_viewed',
  
  // UI preferences
  THEME: 'ecommerce_theme',
  LANGUAGE: 'ecommerce_language',
  CURRENCY: 'ecommerce_currency',
  SIDEBAR_COLLAPSED: 'ecommerce_sidebar_collapsed',

  // Filters and sorting
  PRODUCT_FILTERS: 'ecommerce_product_filters',
  PRODUCT_SORT: 'ecommerce_product_sort',
  
  // Onboarding
  ONBOARDING_COMPLETED: 'ecommerce_onboarding_completed',
  TOUR_COMPLETED: 'ecommerce_tour_completed',

  // Analytics
  ANALYTICS_CONSENT: 'ecommerce_analytics_consent',
  TRACKING_ID: 'ecommerce_tracking_id',

  // Temporary data
  REDIRECT_URL: 'ecommerce_redirect_url',
  LAST_VISITED_PAGE: 'ecommerce_last_visited_page',
} as const;

/**
 * SessionStorage keys (cleared when browser closes)
 */
export const SESSION_KEYS = {
  // Session state
  SESSION_ID: 'ecommerce_session_id',
  SESSION_START: 'ecommerce_session_start',
  
  // Checkout flow
  CHECKOUT_STEP: 'ecommerce_checkout_step',
  CHECKOUT_DATA: 'ecommerce_checkout_data',
  
  // Search
  SEARCH_HISTORY: 'ecommerce_search_history',
  
  // Filters (session-only)
  ACTIVE_FILTERS: 'ecommerce_active_filters',
} as const;

/**
 * Cookie names
 */
export const COOKIE_KEYS = {
  // Authentication (httpOnly)
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  
  // User preferences
  THEME: 'theme',
  LANGUAGE: 'language',
  
  // Tracking
  ANALYTICS_ID: 'analytics_id',
  
  // GDPR consent
  COOKIE_CONSENT: 'cookie_consent',
} as const;
