import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
  mode: 'light' | 'dark' | 'system';
  resolvedMode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: 'system',
  resolvedMode:
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : 'light',
};

/**
 * Theme slice - Manage application theme
 * 
 * Stores theme preference and resolved theme
 */
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Set theme preference
    setThemeMode: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.mode = action.payload;
      if (action.payload !== 'system') {
        state.resolvedMode = action.payload;
      }
    },

    // Set resolved theme (actual theme being used)
    setResolvedMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.resolvedMode = action.payload;
    },

    // Toggle between light and dark
    toggleTheme: (state) => {
      state.resolvedMode = state.resolvedMode === 'light' ? 'dark' : 'light';
      state.mode = state.resolvedMode;
    },

    // Sync with system preference
    syncWithSystem: (state, action: PayloadAction<'light' | 'dark'>) => {
      if (state.mode === 'system') {
        state.resolvedMode = action.payload;
      }
    },
  },
});

export const { setThemeMode, setResolvedMode, toggleTheme, syncWithSystem } =
  themeSlice.actions;

export default themeSlice.reducer;
