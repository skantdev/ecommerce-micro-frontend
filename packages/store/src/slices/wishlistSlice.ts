import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ID } from '@repo/types';

export interface WishlistItem {
  productId: ID;
  addedAt: string;
}

export interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

/**
 * Wishlist slice - Manage wishlist/favorites
 * 
 * Stores products marked as favorites
 */
export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Add to wishlist
    addToWishlist: (state, action: PayloadAction<ID>) => {
      const exists = state.items.some((i) => i.productId === action.payload);
      if (!exists) {
        state.items.push({
          productId: action.payload,
          addedAt: new Date().toISOString(),
        });
      }
    },

    // Remove from wishlist
    removeFromWishlist: (state, action: PayloadAction<ID>) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },

    // Clear wishlist
    clearWishlist: (state) => {
      state.items = [];
    },

    // Check if in wishlist
    isInWishlist: (state, action: PayloadAction<ID>) => {
      return state.items.some((i) => i.productId === action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, isInWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
