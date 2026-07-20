import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@repo/types';

export interface UserState {
  profile: User | null;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    emailNotifications: boolean;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  preferences: {
    theme: 'system',
    language: 'en',
    emailNotifications: true,
  },
  isLoading: false,
  error: null,
};

/**
 * User slice - Manage user profile and preferences
 * 
 * Stores detailed user information and settings
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Fetch profile
    fetchProfileStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.profile = action.payload;
    },
    fetchProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update profile
    updateProfileStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.profile = action.payload;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update preferences
    updatePreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },

    // Set theme
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.preferences.theme = action.payload;
    },

    // Set language
    setLanguage: (state, action: PayloadAction<string>) => {
      state.preferences.language = action.payload;
    },

    // Clear profile (on logout)
    clearProfile: (state) => {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
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
} = userSlice.actions;

export default userSlice.reducer;
