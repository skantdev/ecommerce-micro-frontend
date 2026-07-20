import { configureStore } from '@reduxjs/toolkit';
import { persistenceMiddleware } from './middleware/persistenceMiddleware';

// Import all slices
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import userReducer from './slices/userSlice';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import themeReducer from './slices/themeSlice';
import notificationsReducer from './slices/notificationsSlice';

/**
 * Configure Redux store with all slices
 * 
 * Includes:
 * - Redux DevTools integration
 * - Persistence middleware for localStorage sync
 * - All 8 slices for application state
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    products: productsReducer,
    orders: ordersReducer,
    theme: themeReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore cart persistence errors due to Cart item functions
        ignoredActions: ['cart/restoreCart'],
        ignoredPaths: ['cart.items'],
      },
    }).concat(persistenceMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
