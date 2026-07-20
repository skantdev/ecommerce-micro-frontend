/**
 * @repo/store - Redux Toolkit Store Configuration
 *
 * Centralized state management for the ecommerce application.
 * Includes 8 slices covering authentication, cart, products, orders, and more.
 *
 * @packageDocumentation
 */

// Store and configuration
export { store, type RootState, type AppDispatch } from './store';
export { persistenceMiddleware, createHydrationThunk } from './middleware/persistenceMiddleware';

// Typed hooks
export { useAppDispatch, useAppSelector } from './hooks';

// Auth slice
export { default as authReducer } from './slices/authSlice';
export {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  refreshStart,
  refreshSuccess,
  refreshFailure,
  updateUser,
  restoreAuth,
  type AuthState,
} from './slices/authSlice';

// Cart slice
export { default as cartReducer } from './slices/cartSlice';
export {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setShipping,
  applyCoupon,
  removeCoupon,
  restoreCart,
  type CartState,
} from './slices/cartSlice';

// Wishlist slice
export { default as wishlistReducer } from './slices/wishlistSlice';
export {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  isInWishlist,
  type WishlistState,
  type WishlistItem,
} from './slices/wishlistSlice';

// User slice
export { default as userReducer } from './slices/userSlice';
export {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  updatePreferences,
  setTheme,
  setLanguage,
  clearProfile,
  type UserState,
} from './slices/userSlice';

// Products slice
export { default as productsReducer } from './slices/productsSlice';
export {
  fetchStart as productsFetchStart,
  fetchSuccess as productsFetchSuccess,
  fetchFailure as productsFetchFailure,
  setFilters,
  updateFilters,
  setSortBy,
  setPage,
  setLimit,
  resetFilters,
  clearError as productsClearError,
  type ProductsState,
  type ProductFilters,
} from './slices/productsSlice';

// Orders slice
export { default as ordersReducer } from './slices/ordersSlice';
export {
  fetchStart as ordersFetchStart,
  fetchSuccess as ordersFetchSuccess,
  fetchFailure as ordersFetchFailure,
  setCurrentOrder,
  createStart,
  createSuccess,
  createFailure,
  updateSuccess,
  cancelOrder,
  clearError as ordersClearError,
  type OrdersState,
} from './slices/ordersSlice';

// Theme slice
export { default as themeReducer } from './slices/themeSlice';
export {
  setThemeMode,
  setResolvedMode,
  toggleTheme,
  syncWithSystem,
  type ThemeState,
} from './slices/themeSlice';

// Notifications slice
export { default as notificationsReducer } from './slices/notificationsSlice';
export {
  addNotification,
  removeNotification,
  clearNotifications,
  success as notificationSuccess,
  error as notificationError,
  warning as notificationWarning,
  info as notificationInfo,
  type NotificationsState,
  type Notification,
  type NotificationType,
} from './slices/notificationsSlice';
