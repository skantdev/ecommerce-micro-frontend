import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { CartItem, ProductListItem, ID } from '@repo/types';

export interface UseCartReturn {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: ProductListItem, quantity?: number) => void;
  removeItem: (productId: ID) => void;
  updateQuantity: (productId: ID, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: ID) => boolean;
  getItem: (productId: ID) => CartItem | undefined;
}

/**
 * useCart - Shopping cart operations backed by localStorage
 *
 * @returns Cart state and mutation functions
 *
 * @example
 * ```tsx
 * const { items, addItem, removeItem, totalPrice } = useCart();
 *
 * return (
 *   <Button onClick={() => addItem(product)}>
 *     Add to Cart ({items.length})
 *   </Button>
 * );
 * ```
 */
export function useCart(): UseCartReturn {
  const [items, setItems, clearStorage] = useLocalStorage<CartItem[]>('cart-items', []);

  const addItem = useCallback(
    (product: ProductListItem, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === product.id);
        if (existing) {
          return prev.map((i) =>
            i.productId === product.id
              ? { ...i, quantity: i.quantity + quantity, subtotal: i.price * (i.quantity + quantity) }
              : i,
          );
        }
        const newItem: CartItem = {
          id: `cart-${product.id}-${Date.now()}`,
          productId: product.id,
          product,
          quantity,
          price: product.price,
          subtotal: product.price * quantity,
          isAvailable: product.isAvailable,
          addedAt: new Date().toISOString(),
        };
        return [...prev, newItem];
      });
    },
    [setItems],
  );

  const removeItem = useCallback(
    (productId: ID) => {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    },
    [setItems],
  );

  const updateQuantity = useCallback(
    (productId: ID, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity, subtotal: i.price * quantity }
            : i,
        ),
      );
    },
    [setItems, removeItem],
  );

  const clearCart = useCallback(() => clearStorage(), [clearStorage]);

  const isInCart = useCallback(
    (productId: ID) => items.some((i) => i.productId === productId),
    [items],
  );

  const getItem = useCallback(
    (productId: ID) => items.find((i) => i.productId === productId),
    [items],
  );

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItem,
  };
}
