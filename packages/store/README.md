# @repo/store

📦 **Redux Toolkit Store for E-Commerce**

Centralized state management with 8 slices covering authentication, cart, products, orders, user profile, wishlist, theme, and notifications.

## Overview

This package provides a complete Redux Toolkit store configuration with:
- ✅ 8 domain slices (Auth, Cart, Products, Orders, Wishlist, User, Theme, Notifications)
- ✅ Typed hooks (useAppDispatch, useAppSelector)
- ✅ Persistence middleware for cart/auth/theme
- ✅ Redux DevTools integration
- ✅ Full TypeScript support

## Slices

### 1. Auth Slice
Manages user authentication state and tokens.

**State:**
```typescript
{
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

**Actions:**
- `loginStart` - Begin login
- `loginSuccess` - Login successful
- `loginFailure` - Login failed
- `logout` - Clear auth state
- `refreshStart/Success/Failure` - Token refresh
- `updateUser` - Update current user
- `restoreAuth` - Restore from storage

**Usage:**
```typescript
const dispatch = useAppDispatch();
dispatch(loginSuccess({ 
  user: userData, 
  token: accessToken,
  refreshToken: refreshToken 
}));

const { user, token } = useAppSelector(state => state.auth);
```

### 2. Cart Slice
Shopping cart with items and totals.

**State:**
```typescript
{
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  appliedCouponCode?: string;
  isLoading: boolean;
  error: string | null;
}
```

**Actions:**
- `addItem` - Add to cart
- `removeItem` - Remove from cart
- `updateQuantity` - Change quantity
- `clearCart` - Empty cart
- `setShipping` - Set shipping cost
- `applyCoupon` - Apply discount code
- `removeCoupon` - Remove discount

**Persistence:** Automatically saves to localStorage on changes.

**Usage:**
```typescript
dispatch(addItem(cartItem));
dispatch(updateQuantity({ productId: '123', quantity: 5 }));
dispatch(applyCoupon({ code: 'SUMMER20', discount: 1000 }));

const { items, total } = useAppSelector(state => state.cart);
```

### 3. Wishlist Slice
Favorite/bookmarked products.

**State:**
```typescript
{
  items: WishlistItem[];
}
```

**Actions:**
- `addToWishlist` - Add product
- `removeFromWishlist` - Remove product
- `clearWishlist` - Clear all
- `isInWishlist` - Check if present

**Usage:**
```typescript
dispatch(addToWishlist(productId));
const inWishlist = useAppSelector(state => 
  state.wishlist.items.some(i => i.productId === productId)
);
```

### 4. User Slice
User profile and preferences.

**State:**
```typescript
{
  profile: User | null;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    emailNotifications: boolean;
  };
  isLoading: boolean;
  error: string | null;
}
```

**Actions:**
- `fetchProfileStart/Success/Failure` - Load profile
- `updateProfileStart/Success/Failure` - Update profile
- `updatePreferences` - Update settings
- `setTheme` - Change theme preference
- `setLanguage` - Change language
- `clearProfile` - Clear on logout

**Usage:**
```typescript
dispatch(updatePreferences({ theme: 'dark', language: 'es' }));
const profile = useAppSelector(state => state.user.profile);
```

### 5. Products Slice
Product listing with filters and pagination.

**State:**
```typescript
{
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
```

**Actions:**
- `fetchStart/Success/Failure` - Fetch products
- `setFilters` - Replace all filters (resets to page 1)
- `updateFilters` - Update specific filters
- `setSortBy` - Change sort order
- `setPage` - Navigate pages
- `setLimit` - Change items per page
- `resetFilters` - Clear all filters

**Usage:**
```typescript
dispatch(setFilters({ 
  categoryId: '5', 
  minPrice: 100, 
  maxPrice: 1000 
}));
dispatch(setSortBy('price-asc'));
dispatch(setPage(2));

const { items, total, totalPages } = useAppSelector(state => state.products);
```

### 6. Orders Slice
Order history and current order.

**State:**
```typescript
{
  items: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}
```

**Actions:**
- `fetchStart/Success/Failure` - Load orders
- `setCurrentOrder` - View specific order
- `createStart/Success/Failure` - Create new order
- `updateSuccess` - Update order status
- `cancelOrder` - Cancel an order
- `clearError` - Clear error

**Usage:**
```typescript
dispatch(createSuccess(newOrder));
dispatch(cancelOrder(orderId));

const orders = useAppSelector(state => state.orders.items);
const currentOrder = useAppSelector(state => state.orders.currentOrder);
```

### 7. Theme Slice
Application theme (light/dark/system).

**State:**
```typescript
{
  mode: 'light' | 'dark' | 'system';
  resolvedMode: 'light' | 'dark';
}
```

**Actions:**
- `setThemeMode` - Set preference
- `setResolvedMode` - Set resolved theme
- `toggleTheme` - Switch light/dark
- `syncWithSystem` - Sync with OS preference

**Persistence:** Automatically saves preference to localStorage.

**Usage:**
```typescript
dispatch(setThemeMode('dark'));
dispatch(toggleTheme());

const theme = useAppSelector(state => state.theme.resolvedMode);
```

### 8. Notifications Slice
Toast/snackbar notifications queue.

**State:**
```typescript
{
  items: Notification[];
}
```

**Actions:**
- `addNotification` - Add custom notification
- `removeNotification` - Remove by ID
- `clearNotifications` - Clear all
- `success` - Success notification
- `error` - Error notification
- `warning` - Warning notification
- `info` - Info notification

**Usage:**
```typescript
dispatch(notificationSuccess({ 
  message: 'Order placed successfully',
  duration: 3000 
}));
dispatch(notificationError({ 
  message: 'Failed to process payment' 
}));

const notifications = useAppSelector(state => state.notifications.items);
```

## Typed Hooks

### useAppDispatch
Type-safe dispatch hook.

```typescript
const dispatch = useAppDispatch();
dispatch(loginSuccess({ user, token })); // ✅ Type-checked
```

### useAppSelector
Type-safe selector hook.

```typescript
const user = useAppSelector(state => state.auth.user);
const cartTotal = useAppSelector(state => state.cart.total);
```

## Middleware

### Persistence Middleware
Automatically syncs state changes to localStorage:
- **Auth**: token, refreshToken, isAuthenticated
- **Cart**: Full cart state
- **Theme**: Theme preference

### Hydration
Restore persisted state on app start:

```typescript
import { createHydrationThunk } from '@repo/store';

const hydration = createHydrationThunk();
const auth = hydration.hydrateAuth();
const cart = hydration.hydrateCart();
const theme = hydration.hydrateTheme();
```

## Usage Examples

### Complete Authentication Flow

```typescript
import { useAppDispatch, useAppSelector, loginSuccess, logout } from '@repo/store';

function AuthComponent() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);

  const handleLogin = async (email: string, password: string) => {
    const { user, token } = await loginApi(email, password);
    dispatch(loginSuccess({ user, token }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) return <LoginForm onLogin={handleLogin} />;
  return <Dashboard user={user} onLogout={handleLogout} />;
}
```

### Shopping Cart

```typescript
import { useAppDispatch, useAppSelector, addItem, removeItem } from '@repo/store';

function ShoppingCart() {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector(state => state.cart);

  return (
    <>
      {items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={() => dispatch(removeItem(item.productId))}
        />
      ))}
      <Total amount={total} />
    </>
  );
}
```

### Product Listing with Filters

```typescript
import { useAppDispatch, useAppSelector, setFilters, setSortBy, setPage } from '@repo/store';

function ProductListing() {
  const dispatch = useAppDispatch();
  const { items, filters, sortBy, page, totalPages } = useAppSelector(
    state => state.products
  );

  return (
    <>
      <FilterSidebar
        filters={filters}
        onFilterChange={(f) => dispatch(setFilters(f))}
      />
      <SortDropdown
        value={sortBy}
        onChange={(s) => dispatch(setSortBy(s))}
      />
      <ProductGrid products={items} />
      <Pagination
        current={page}
        total={totalPages}
        onChange={(p) => dispatch(setPage(p))}
      />
    </>
  );
}
```

### Notifications

```typescript
import { useAppDispatch, useAppSelector, notificationSuccess } from '@repo/store';

function OrderForm() {
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    try {
      await createOrder(data);
      dispatch(notificationSuccess({
        message: '✓ Order placed successfully!',
        duration: 5000
      }));
    } catch (error) {
      dispatch(notificationError({
        message: 'Failed to place order'
      }));
    }
  };

  return <Form onSubmit={handleSubmit} />;
}
```

## Redux DevTools

Redux DevTools is automatically enabled in development:
- Time-travel debugging
- Action history
- State inspection
- Action replay

Access via browser extension or standalone app.

## State Hydration

```typescript
// In your app initialization
import store, { createHydrationThunk } from '@repo/store';

const hydration = createHydrationThunk();

// Restore persisted state
if (typeof window !== 'undefined') {
  const authState = hydration.hydrateAuth();
  if (authState) {
    store.dispatch(restoreAuth(authState));
  }

  const cartState = hydration.hydrateCart();
  if (cartState) {
    store.dispatch(restoreCart(cartState));
  }
}
```

## File Structure

```
packages/store/
├── src/
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── cartSlice.ts
│   │   ├── wishlistSlice.ts
│   │   ├── userSlice.ts
│   │   ├── productsSlice.ts
│   │   ├── ordersSlice.ts
│   │   ├── themeSlice.ts
│   │   └── notificationsSlice.ts
│   ├── middleware/
│   │   └── persistenceMiddleware.ts
│   ├── store.ts
│   ├── hooks.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

```json
{
  "@reduxjs/toolkit": "^1.9.7",
  "react-redux": "^8.1.3",
  "@repo/types": "workspace:*"
}
```

## Next Steps

- Integrate with host application (Step 13)
- Create @repo/auth package with authentication middleware
- Use in micro frontends (Steps 14-21)
- Add async thunks for API calls

## Version

1.0.0

## License

Proprietary
