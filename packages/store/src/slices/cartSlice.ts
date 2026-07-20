import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@repo/types';

export interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  appliedCouponCode?: string;
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  total: 0,
  isLoading: false,
  error: null,
};

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { subtotal };
};

/**
 * Cart slice - Manage shopping cart state
 * 
 * Stores cart items and calculations
 */
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((i) => i.productId === action.payload.productId);
      if (existing) {
        existing.quantity += action.payload.quantity;
        existing.subtotal = existing.price * existing.quantity;
      } else {
        state.items.push(action.payload);
      }
      const { subtotal } = calculateTotals(state.items);
      state.subtotal = subtotal;
      state.total = subtotal + state.tax + state.shipping - state.discount;
    },

    // Remove item
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      const { subtotal } = calculateTotals(state.items);
      state.subtotal = subtotal;
      state.total = subtotal + state.tax + state.shipping - state.discount;
    },

    // Update quantity
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find((i) => i.productId === action.payload.productId);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.productId !== action.payload.productId);
        } else {
          item.quantity = action.payload.quantity;
          item.subtotal = item.price * item.quantity;
        }
      }
      const { subtotal } = calculateTotals(state.items);
      state.subtotal = subtotal;
      state.total = subtotal + state.tax + state.shipping - state.discount;
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.shipping = 0;
      state.discount = 0;
      state.total = 0;
      state.appliedCouponCode = undefined;
    },

    // Set shipping cost
    setShipping: (state, action: PayloadAction<number>) => {
      state.shipping = action.payload;
      state.total = state.subtotal + state.tax + state.shipping - state.discount;
    },

    // Apply coupon
    applyCoupon: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      state.appliedCouponCode = action.payload.code;
      state.discount = action.payload.discount;
      state.total = state.subtotal + state.tax + state.shipping - state.discount;
    },

    // Remove coupon
    removeCoupon: (state) => {
      state.appliedCouponCode = undefined;
      state.discount = 0;
      state.total = state.subtotal + state.tax + state.shipping;
    },

    // Restore from storage
    restoreCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setShipping,
  applyCoupon,
  removeCoupon,
  restoreCart,
} = cartSlice.actions;

export default cartSlice.reducer;
