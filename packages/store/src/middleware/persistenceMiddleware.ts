import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from './store';

/**
 * Persistence middleware - Sync cart state to localStorage
 * 
 * Automatically saves cart when it changes and restores on app start
 */
export const persistenceMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Persist cart
  if (action.type.includes('cart/')) {
    try {
      localStorage.setItem('app-cart-state', JSON.stringify(state.cart));
    } catch (error) {
      console.error('Failed to persist cart state:', error);
    }
  }

  // Persist auth
  if (action.type.includes('auth/')) {
    try {
      localStorage.setItem('app-auth-state', JSON.stringify({
        token: state.auth.token,
        refreshToken: state.auth.refreshToken,
        isAuthenticated: state.auth.isAuthenticated,
      }));
    } catch (error) {
      console.error('Failed to persist auth state:', error);
    }
  }

  // Persist theme
  if (action.type.includes('theme/')) {
    try {
      localStorage.setItem('app-theme-preference', JSON.stringify(state.theme.mode));
    } catch (error) {
      console.error('Failed to persist theme preference:', error);
    }
  }

  return result;
};

/**
 * Hydration middleware - Restore state from localStorage on app start
 * 
 * This should be called once at app initialization
 */
export const createHydrationThunk = () => {
  return {
    hydrateCart: () => {
      try {
        const stored = localStorage.getItem('app-cart-state');
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    },
    hydrateAuth: () => {
      try {
        const stored = localStorage.getItem('app-auth-state');
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    },
    hydrateTheme: () => {
      try {
        const stored = localStorage.getItem('app-theme-preference');
        return stored ? JSON.parse(stored) : 'system';
      } catch {
        return 'system';
      }
    },
  };
};
