/**
 * @repo/hooks - Custom React Hooks Library
 *
 * A comprehensive collection of reusable React hooks for the ecommerce
 * micro-frontend application.
 *
 * @packageDocumentation
 */

// Generic async API hook
export { useApi } from './useApi';
export type { UseApiOptions, UseApiReturn } from './useApi';

// Authentication hooks
export { useAuth, usePermission, AuthContext } from './useAuth';
export type { AuthState, AuthContextValue } from './useAuth';

// Cart management
export { useCart } from './useCart';
export type { UseCartReturn } from './useCart';

// Click outside detection
export { useClickOutside } from './useClickOutside';

// Debounce
export { useDebounce } from './useDebounce';

// Disclosure (open/close state)
export { useDisclosure } from './useDisclosure';
export type { UseDisclosureOptions, UseDisclosureReturn } from './useDisclosure';

// Infinite scrolling
export { useInfiniteScroll } from './useInfiniteScroll';
export type { UseInfiniteScrollOptions, UseInfiniteScrollReturn } from './useInfiniteScroll';

// localStorage persistence
export { useLocalStorage } from './useLocalStorage';
export type { StorageSerializer } from './useLocalStorage';

// Modal state
export { useModal } from './useModal';
export type { UseModalReturn } from './useModal';

// Pagination
export { usePagination } from './usePagination';
export type { UsePaginationOptions, UsePaginationReturn } from './usePagination';

// Previous value tracker
export { usePrevious } from './usePrevious';

// Product fetching
export { useProducts } from './useProducts';
export type { UseProductsFilters, UseProductsReturn } from './useProducts';

// Search with debounce
export { useSearch } from './useSearch';
export type { UseSearchOptions, UseSearchReturn } from './useSearch';

// Theme management
export { useTheme } from './useTheme';
export type { Theme, UseThemeReturn } from './useTheme';
