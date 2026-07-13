/**
 * Application route paths
 */
export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Product routes
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  PRODUCT_CATEGORY: '/products/category/:slug',
  PRODUCT_SEARCH: '/products/search',

  // Cart and Checkout
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout/success',
  CHECKOUT_CANCEL: '/checkout/cancel',

  // User routes (protected)
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_ADDRESSES: '/profile/addresses',
  PROFILE_PASSWORD: '/profile/password',
  PROFILE_PREFERENCES: '/profile/preferences',
  
  // Order routes (protected)
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  ORDER_TRACKING: '/orders/:id/tracking',

  // Wishlist (protected)
  WISHLIST: '/wishlist',

  // Admin routes (admin only)
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRODUCTS_NEW: '/admin/products/new',
  ADMIN_PRODUCTS_EDIT: '/admin/products/:id/edit',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ORDERS_DETAIL: '/admin/orders/:id',
  ADMIN_USERS: '/admin/users',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SETTINGS: '/admin/settings',

  // Error routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  FORBIDDEN: '/403',
  SERVER_ERROR: '/500',
} as const;

/**
 * Helper function to build route with params
 * @example buildRoute(ROUTES.PRODUCT_DETAIL, { id: '123' }) => '/products/123'
 */
export function buildRoute(route: string, params: Record<string, string | number>): string {
  let result = route;
  
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(`:${key}`, String(value));
  }
  
  return result;
}

/**
 * Helper function to build route with query params
 * @example buildRouteWithQuery(ROUTES.PRODUCTS, { page: 1, limit: 20 }) => '/products?page=1&limit=20'
 */
export function buildRouteWithQuery(
  route: string,
  params?: Record<string, string | number>,
  query?: Record<string, string | number | boolean>
): string {
  let result = params ? buildRoute(route, params) : route;
  
  if (query && Object.keys(query).length > 0) {
    const queryString = new URLSearchParams(
      Object.entries(query).map(([key, value]) => [key, String(value)])
    ).toString();
    result += `?${queryString}`;
  }
  
  return result;
}
