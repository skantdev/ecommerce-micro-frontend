import type { ID, Timestamp, Money, Address } from './common.types';
import type { CartItem } from './cart.types';
import type { User } from './user.types';

/**
 * Order status enum
 */
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}

/**
 * Payment method enum
 */
export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  STRIPE = 'STRIPE',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

/**
 * Payment status enum
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  AUTHORIZED = 'AUTHORIZED',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

/**
 * Shipping method
 */
export interface ShippingMethod {
  id: ID;
  name: string;
  description?: string;
  price: Money;
  estimatedDays: number;
  carrier?: string;
  trackable: boolean;
}

/**
 * Order item (similar to cart item but immutable)
 */
export interface OrderItem {
  id: ID;
  orderId: ID;
  productId: ID;
  variantId?: ID;
  productName: string;
  productImage: string;
  variantName?: string;
  sku: string;
  quantity: number;
  price: Money;
  subtotal: Money;
}

/**
 * Payment information
 */
export interface PaymentInfo {
  id: ID;
  orderId: ID;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: Money;
  transactionId?: string;
  last4?: string; // Last 4 digits of card
  cardBrand?: string; // Visa, Mastercard, etc.
  paidAt?: Timestamp;
  failureReason?: string;
}

/**
 * Shipping information
 */
export interface ShippingInfo {
  id: ID;
  orderId: ID;
  method: ShippingMethod;
  address: Address;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: Timestamp;
  actualDelivery?: Timestamp;
  shippedAt?: Timestamp;
}

/**
 * Order status history entry
 */
export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: Timestamp;
  note?: string;
  updatedBy?: string;
}

/**
 * Order entity
 */
export interface Order {
  id: ID;
  orderNumber: string; // Human-readable order number (e.g., "ORD-2024-001234")
  userId: ID;
  customer: Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>;
  status: OrderStatus;
  items: OrderItem[];
  itemCount: number;
  subtotal: Money;
  tax: Money;
  shipping: Money;
  discount: Money;
  total: Money;
  couponCode?: string;
  payment: PaymentInfo;
  shippingInfo: ShippingInfo;
  billingAddress: Address;
  notes?: string;
  statusHistory: OrderStatusHistory[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  cancelledAt?: Timestamp;
  cancellationReason?: string;
}

/**
 * Order list item (simplified for lists)
 */
export interface OrderListItem {
  id: ID;
  orderNumber: string;
  status: OrderStatus;
  itemCount: number;
  total: Money;
  createdAt: Timestamp;
  estimatedDelivery?: Timestamp;
}

/**
 * Create order request (checkout)
 */
export interface CreateOrderRequest {
  items: CartItem[];
  shippingAddressId: ID;
  billingAddressId: ID;
  shippingMethodId: ID;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  notes?: string;
}

/**
 * Order filters for searching/filtering
 */
export interface OrderFilters {
  status?: OrderStatus;
  dateFrom?: Timestamp;
  dateTo?: Timestamp;
  minAmount?: Money;
  maxAmount?: Money;
  search?: string; // Search by order number, customer name, etc.
}

/**
 * Cancel order request
 */
export interface CancelOrderRequest {
  orderId: ID;
  reason: string;
}

/**
 * Return/refund request
 */
export interface ReturnRequest {
  orderId: ID;
  items: Array<{
    orderItemId: ID;
    quantity: number;
    reason: string;
  }>;
  refundMethod?: 'original' | 'store_credit';
}
