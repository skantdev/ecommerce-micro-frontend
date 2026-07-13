# @repo/types

Shared TypeScript type definitions for the E-Commerce Micro Frontend platform.

## Overview

This package contains all shared interfaces, types, and enums used across micro frontends. It ensures type safety and consistency throughout the application.

## Installation

This package is internal to the monorepo and automatically available to all apps and packages.

```typescript
// Import types in any app or package
import type { User, Product, Cart, Order } from '@repo/types';
import { UserRole, OrderStatus, PaymentMethod } from '@repo/types';
```

## Type Categories

### Common Types (`common.types.ts`)

Utility types and common interfaces:

- `Nullable<T>` - Makes type nullable
- `Optional<T>` - Makes type optional and nullable
- `DeepPartial<T>` - Recursively makes all properties optional
- `ID` - Entity identifier type
- `Timestamp` - ISO 8601 timestamp string
- `Money` - Currency amount in cents
- `PaginationParams` - Pagination parameters
- `PaginatedResponse<T>` - Generic paginated API response
- `Address` - Shipping/billing address
- `Image` - Image metadata

### User Types (`user.types.ts`)

User authentication and profile types:

**Enums:**
- `UserRole` - User roles (GUEST, CUSTOMER, ADMIN, SUPER_ADMIN)
- `UserPermission` - Fine-grained permissions
- `UserStatus` - Account status (ACTIVE, INACTIVE, SUSPENDED, DELETED)

**Interfaces:**
- `User` - Core user entity
- `UserProfile` - Extended user profile with preferences
- `UserPreferences` - User settings and preferences
- `UserRegistration` - Registration form data
- `UserLoginCredentials` - Login form data
- `UserSession` - Authentication session with tokens
- `PasswordResetRequest` - Password reset request
- `PasswordResetConfirm` - Password reset confirmation

### Product Types (`product.types.ts`)

Product catalog types:

**Enums:**
- `ProductStatus` - Product status (ACTIVE, INACTIVE, OUT_OF_STOCK, DISCONTINUED)

**Interfaces:**
- `Product` - Complete product entity
- `ProductListItem` - Simplified product for lists
- `ProductVariant` - Product variations (size, color, etc.)
- `ProductReview` - Customer reviews
- `ProductRating` - Rating statistics
- `Category` - Product categories
- `Brand` - Product brands
- `ProductFilters` - Filter options for product search
- `ProductSortBy` - Sort options

### Cart Types (`cart.types.ts`)

Shopping cart types:

- `Cart` - Shopping cart entity
- `CartItem` - Item in cart
- `Coupon` - Discount coupon
- `CartSummary` - Cart totals summary
- `AddToCartRequest` - Add item to cart
- `UpdateCartItemRequest` - Update cart item quantity
- `ApplyCouponRequest` - Apply discount code

### Order Types (`order.types.ts`)

Order and checkout types:

**Enums:**
- `OrderStatus` - Order lifecycle status
- `PaymentMethod` - Payment methods (CREDIT_CARD, PAYPAL, etc.)
- `PaymentStatus` - Payment status (PENDING, PAID, FAILED, etc.)

**Interfaces:**
- `Order` - Complete order entity
- `OrderListItem` - Simplified order for lists
- `OrderItem` - Item in order
- `PaymentInfo` - Payment transaction details
- `ShippingInfo` - Shipping details and tracking
- `ShippingMethod` - Available shipping options
- `OrderStatusHistory` - Order status change log
- `CreateOrderRequest` - Checkout request
- `CancelOrderRequest` - Order cancellation
- `ReturnRequest` - Return/refund request

### API Types (`api.types.ts`)

API response and error handling types:

**Enums:**
- `ApiErrorCode` - Standardized error codes

**Interfaces:**
- `ApiResponse<T>` - Success response wrapper
- `ApiErrorResponse` - Error response wrapper
- `ApiError` - Detailed error information
- `ValidationError` - Validation error details
- `ApiRequestOptions` - Request configuration
- `FileUploadResponse` - File upload result
- `HealthCheckResponse` - Service health status

## Usage Examples

### Type Safety in Components

```typescript
import type { Product, ProductListItem } from '@repo/types';
import { ProductStatus } from '@repo/types';

// Component props with type safety
interface ProductCardProps {
  product: ProductListItem;
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isAvailable = product.isAvailable && 
    product.status === ProductStatus.ACTIVE;

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price / 100}</p>
      {isAvailable && (
        <button onClick={() => onAddToCart(product.id)}>
          Add to Cart
        </button>
      )}
    </div>
  );
}
```

### API Response Typing

```typescript
import type { ApiResponse, Product } from '@repo/types';

async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`/api/products/${id}`);
  const data: ApiResponse<Product> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error.message);
  }
  
  return data.data;
}
```

### State Management

```typescript
import type { Cart, User, Order } from '@repo/types';
import { UserRole } from '@repo/types';

interface RootState {
  user: User | null;
  cart: Cart;
  orders: Order[];
}

// Type-safe selector
const selectIsAdmin = (state: RootState): boolean => {
  return state.user?.role === UserRole.ADMIN || 
         state.user?.role === UserRole.SUPER_ADMIN;
};
```

### Form Validation

```typescript
import type { UserRegistration, ValidationError } from '@repo/types';

function validateRegistration(data: UserRegistration): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.email.includes('@')) {
    errors.push({
      field: 'email',
      message: 'Invalid email format',
      code: 'INVALID_EMAIL',
    });
  }

  if (data.password.length < 8) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 8 characters',
      code: 'PASSWORD_TOO_SHORT',
    });
  }

  return errors;
}
```

## Type Utilities

### Money Type

Amounts are stored in cents to avoid floating-point precision issues:

```typescript
import type { Money } from '@repo/types';

const price: Money = 1999; // $19.99
const formattedPrice = `$${(price / 100).toFixed(2)}`; // "$19.99"
```

### Pagination

```typescript
import type { PaginatedResponse, Product, PaginationParams } from '@repo/types';

const params: PaginationParams = {
  page: 1,
  limit: 20,
  sortBy: 'price',
  sortOrder: 'asc',
};

const response: PaginatedResponse<Product> = await fetchProducts(params);
console.log(response.data); // Product[]
console.log(response.meta.totalPages); // 5
```

## Design Principles

1. **Immutability**: All types are designed to be immutable
2. **Strict Typing**: No `any` types; use `unknown` for truly dynamic data
3. **Consistency**: Naming conventions are consistent across all types
4. **Documentation**: All types include JSDoc comments
5. **Enums**: Use enums for fixed sets of values (status, roles, etc.)
6. **Money**: Always in cents to avoid floating-point issues
7. **Timestamps**: ISO 8601 strings for consistency

## Best Practices

### DO ✅

```typescript
// Use specific types
const user: User = { ... };

// Use enums for status values
if (order.status === OrderStatus.SHIPPED) { ... }

// Use type imports
import type { Product } from '@repo/types';

// Use Money type for currency
const price: Money = 1999; // $19.99
```

### DON'T ❌

```typescript
// Don't use 'any'
const user: any = { ... }; // ❌

// Don't use string literals for status
if (order.status === 'shipped') { ... } // ❌

// Don't import types as values
import { Product } from '@repo/types'; // ❌

// Don't use floats for money
const price: number = 19.99; // ❌ Precision issues
```

## Type Evolution

When adding new types:

1. Add to the appropriate `*.types.ts` file
2. Export from `index.ts`
3. Add JSDoc comments
4. Update this README
5. Create migration guide if breaking changes

## Maintenance

This package has no runtime dependencies. It only requires TypeScript for type checking.

## Related Packages

- `@repo/api` - Uses these types for API requests/responses
- `@repo/utils` - Utility functions that operate on these types
- All micro frontends - Import types for type safety

## License

Private - Internal use only
