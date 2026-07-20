import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ProductListItem, ProductSortBy, ID } from '@repo/types';

export interface ProductFilters {
  categoryId?: ID;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  inStock?: boolean;
  tags?: string[];
}

export interface ProductsState {
  items: ProductListItem[];
  filters: ProductFilters;
  sortBy: ProductSortBy;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  filters: {},
  sortBy: 'newest',
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
  isLoading: false,
  error: null,
};

/**
 * Products slice - Manage product listing and filtering state
 * 
 * Stores products, filters, and pagination
 */
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Fetch products
    fetchStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSuccess: (
      state,
      action: PayloadAction<{
        items: ProductListItem[];
        total: number;
        totalPages: number;
      }>,
    ) => {
      state.isLoading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update filters
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.filters = action.payload;
      state.page = 1;
    },
    updateFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },

    // Set sort
    setSortBy: (state, action: PayloadAction<ProductSortBy>) => {
      state.sortBy = action.payload;
      state.page = 1;
    },

    // Pagination
    setPage: (state, action: PayloadAction<number>) => {
      state.page = Math.max(1, Math.min(action.payload, state.totalPages));
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.page = 1;
    },

    // Reset filters
    resetFilters: (state) => {
      state.filters = {};
      state.sortBy = 'newest';
      state.page = 1;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setFilters,
  updateFilters,
  setSortBy,
  setPage,
  setLimit,
  resetFilters,
  clearError,
} = productsSlice.actions;

export default productsSlice.reducer;
