import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Order } from '@repo/types';

export interface OrdersState {
  items: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

/**
 * Orders slice - Manage orders and order history
 * 
 * Stores user orders and current order details
 */
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Fetch orders
    fetchStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSuccess: (state, action: PayloadAction<Order[]>) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Set current order
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },

    // Create order
    createStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createSuccess: (state, action: PayloadAction<Order>) => {
      state.isLoading = false;
      state.items.unshift(action.payload);
      state.currentOrder = action.payload;
    },
    createFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update order
    updateSuccess: (state, action: PayloadAction<Order>) => {
      const index = state.items.findIndex((o) => o.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = action.payload;
      }
      if (state.currentOrder?.id === action.payload.id) {
        state.currentOrder = action.payload;
      }
    },

    // Cancel order
    cancelOrder: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((o) => o.id === action.payload);
      if (index >= 0) {
        state.items[index].status = 'CANCELLED';
      }
      if (state.currentOrder?.id === action.payload) {
        state.currentOrder.status = 'CANCELLED';
      }
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
  setCurrentOrder,
  createStart,
  createSuccess,
  createFailure,
  updateSuccess,
  cancelOrder,
  clearError,
} = ordersSlice.actions;

export default ordersSlice.reducer;
