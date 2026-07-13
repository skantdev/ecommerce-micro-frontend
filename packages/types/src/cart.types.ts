import type { ID, Timestamp, Money } from './common.types';
import type { ProductListItem, ProductVariant } from './product.types';

/**
 * Cart item entity
 */
export interface CartItem {
  id: ID;
  productId: ID;
  variantId?: ID;
  product: ProductListItem;
  variant?: ProductVariant;
  quantity: number;
  price: Money; // Price at time of adding to cart
  subtotal: Money; // price * quantity
  isAvailable: boolean; // Product still in stock
  addedAt: Timestamp;
}

/**
 * Shopping cart
 */
export interface Cart {
  id: ID;
  userId?: ID; // null for guest carts
  items: CartItem[];
  itemCount: number;
  subtotal: Money;
  tax: Money;
  shipping: Money;
  discount: Money;
  total: Money;
  appliedCoupon?: Coupon;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Coupon/discount code
 */
export interface Coupon {
  id: ID;
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // Percentage (0-100) or fixed amount in cents
  minPurchase?: Money;
  maxDiscount?: Money;
  expiresAt?: Timestamp;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
}

/**
 * Add to cart request
 */
export interface AddToCartRequest {
  productId: ID;
  variantId?: ID;
  quantity: number;
}

/**
 * Update cart item request
 */
export interface UpdateCartItemRequest {
  itemId: ID;
  quantity: number;
}

/**
 * Apply coupon request
 */
export interface ApplyCouponRequest {
  code: string;
}

/**
 * Cart summary for display
 */
export interface CartSummary {
  itemCount: number;
  subtotal: Money;
  tax: Money;
  shipping: Money;
  discount: Money;
  total: Money;
  savings?: Money; // Total amount saved
}
