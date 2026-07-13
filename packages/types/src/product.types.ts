import type { ID, Timestamp, Money, Image } from './common.types';

/**
 * Product category
 */
export interface Category {
  id: ID;
  name: string;
  slug: string;
  description?: string;
  image?: Image;
  parentId?: ID;
  children?: Category[];
  productCount: number;
  isActive: boolean;
}

/**
 * Product brand
 */
export interface Brand {
  id: ID;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  website?: string;
}

/**
 * Product status
 */
export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED',
}

/**
 * Product variant (e.g., size, color)
 */
export interface ProductVariant {
  id: ID;
  productId: ID;
  sku: string;
  name: string;
  attributes: Record<string, string>; // e.g., { size: 'M', color: 'Blue' }
  price: Money;
  compareAtPrice?: Money; // Original price for showing discounts
  stock: number;
  image?: Image;
  isAvailable: boolean;
}

/**
 * Product review
 */
export interface ProductReview {
  id: ID;
  productId: ID;
  userId: ID;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  images?: Image[];
  helpful: number; // Number of helpful votes
  verified: boolean; // Verified purchase
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Product rating summary
 */
export interface ProductRating {
  average: number;
  count: number;
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

/**
 * Product entity
 */
export interface Product {
  id: ID;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: Money;
  compareAtPrice?: Money;
  images: Image[];
  category: Category;
  brand?: Brand;
  status: ProductStatus;
  stock: number;
  lowStockThreshold: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
  variants?: ProductVariant[];
  rating: ProductRating;
  reviewCount: number;
  weight?: number; // in grams
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  specifications?: Record<string, string>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Product list item (simplified for lists)
 */
export interface ProductListItem {
  id: ID;
  name: string;
  slug: string;
  shortDescription?: string;
  price: Money;
  compareAtPrice?: Money;
  primaryImage: Image;
  category: Pick<Category, 'id' | 'name' | 'slug'>;
  rating: Pick<ProductRating, 'average' | 'count'>;
  isAvailable: boolean;
  isFeatured: boolean;
  isNew: boolean;
  badge?: 'sale' | 'new' | 'hot' | 'limited';
}

/**
 * Product filter options
 */
export interface ProductFilters {
  categoryId?: ID;
  brandId?: ID;
  minPrice?: Money;
  maxPrice?: Money;
  rating?: number;
  inStock?: boolean;
  tags?: string[];
  search?: string;
}

/**
 * Product sort options
 */
export type ProductSortBy =
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'newest'
  | 'rating'
  | 'popular';
