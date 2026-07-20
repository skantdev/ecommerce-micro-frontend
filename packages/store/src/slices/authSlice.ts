import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@repo/types';

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

/**
 * Auth slice - Manage user authentication state
 * 
 * Stores current user, access/refresh tokens, and auth status
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string; refreshToken?: string }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || state.refreshToken;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Token refresh
    refreshStart: (state) => {
      state.isLoading = true;
    },
    refreshSuccess: (state, action: PayloadAction<{ token: string; refreshToken?: string }>) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || state.refreshToken;
      state.error = null;
    },
    refreshFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Update user profile
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Restore state from storage
    restoreAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  refreshStart,
  refreshSuccess,
  refreshFailure,
  updateUser,
  restoreAuth,
} = authSlice.actions;

export default authSlice.reducer;
