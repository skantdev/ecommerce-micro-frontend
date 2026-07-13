# @repo/constants

Application constants and reusable values for the E-Commerce Micro Frontend platform.

## Overview

This package provides centralized constants for:

- Application routes and navigation
- Storage keys (localStorage, sessionStorage, cookies)
- Validation rules and regex patterns
- HTTP status codes and error messages
- Date/time formats and localization
- Application limits and defaults
- UI constants (breakpoints, z-index)

## Installation

This package is internal to the monorepo and automatically available to all apps and packages.

```typescript
import { ROUTES, STORAGE_KEYS, VALIDATION, HTTP_STATUS } from '@repo/constants';
```

## Usage

### Routes

```typescript
import { ROUTES, buildRoute, buildRouteWithQuery } from '@repo/constants';

// Use route constants
<Link to={ROUTES.PRODUCTS}>Products</Link>
<Link to={ROUTES.CART}>Cart</Link>

// Build route with params
const productUrl = buildRoute(ROUTES.PRODUCT_DETAIL, { id: '123' });
// => '/products/123'

// Build route with query params
const productsUrl = buildRouteWithQuery(
  ROUTES.PRODUCTS,
  undefined,
  { page: 1, limit: 20, category: 'electronics' }
);
// => '/products?page=1&limit=20&category=electronics'

// Navigate programmatically
navigate(buildRoute(ROUTES.ORDER_DETAIL, { id: order.id }));
```

### Storage Keys

```typescript
import { STORAGE_KEYS, SESSION_KEYS, COOKIE_KEYS } from '@repo/constants';

// LocalStorage (prefixed to avoid conflicts)
localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
const cart = JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]');

// SessionStorage (cleared on browser close)
sessionStorage.setItem(SESSION_KEYS.CHECKOUT_STEP, '2');
const step = sessionStorage.getItem(SESSION_KEYS.CHECKOUT_STEP);

// Cookies
document.cookie = `${COOKIE_KEYS.THEME}=dark; max-age=31536000`;
```

### Validation

```typescript
import {
  EMAIL_REGEX,
  PASSWORD_STRONG_REGEX,
  PHONE_REGEX,
  VALIDATION,
  VALIDATION_MESSAGES,
} from '@repo/constants';

// Regex validation
const isValidEmail = EMAIL_REGEX.test(email);
const isStrongPassword = PASSWORD_STRONG_REGEX.test(password);
const isValidPhone = PHONE_REGEX.test(phone);

// Validation constraints
if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
  return VALIDATION_MESSAGES.PASSWORD_TOO_SHORT;
}

if (username.length < VALIDATION.USERNAME_MIN_LENGTH) {
  return VALIDATION_MESSAGES.USERNAME_TOO_SHORT;
}

// Product validation
if (product.price < VALIDATION.PRODUCT_PRICE_MIN) {
  return 'Price must be greater than 0';
}

if (product.name.length > VALIDATION.PRODUCT_NAME_MAX_LENGTH) {
  return `Name must be less than ${VALIDATION.PRODUCT_NAME_MAX_LENGTH} characters`;
}
```

### HTTP Status & Messages

```typescript
import { HTTP_STATUS, API_ERROR_MESSAGES, SUCCESS_MESSAGES } from '@repo/constants';

// Check status codes
if (response.status === HTTP_STATUS.UNAUTHORIZED) {
  showError(API_ERROR_MESSAGES.UNAUTHORIZED);
  redirectToLogin();
}

if (response.status === HTTP_STATUS.NOT_FOUND) {
  showError(API_ERROR_MESSAGES.NOT_FOUND);
}

// Success messages
const handleAddToCart = async () => {
  await addToCart(product);
  showSuccess(SUCCESS_MESSAGES.ADDED_TO_CART);
};

const handleProfileUpdate = async () => {
  await updateProfile(data);
  showSuccess(SUCCESS_MESSAGES.PROFILE_UPDATED);
};
```

### Date & Currency Formats

```typescript
import {
  DATE_FORMATS,
  CURRENCY_CODES,
  CURRENCY_SYMBOLS,
  LANGUAGE_CODES,
} from '@repo/constants';

// Date formatting (with date-fns or similar)
const formattedDate = format(new Date(), DATE_FORMATS.MEDIUM);
// => "Jan 15, 2024"

const formattedDateTime = format(new Date(), DATE_FORMATS.DATETIME_MEDIUM);
// => "Jan 15, 2024 14:30"

// Currency
const currency = CURRENCY_CODES.USD;
const symbol = CURRENCY_SYMBOLS[currency]; // "$"

// Price display
const formatPrice = (cents: number, currency: string = 'USD') => {
  const symbol = CURRENCY_SYMBOLS[currency];
  const amount = (cents / 100).toFixed(2);
  return `${symbol}${amount}`;
};

console.log(formatPrice(1999)); // "$19.99"
```

### Application Limits

```typescript
import { LIMITS, DEFAULTS, BREAKPOINTS } from '@repo/constants';

// Pagination
const [page, setPage] = useState(DEFAULTS.PAGE);
const [pageSize, setPageSize] = useState(DEFAULTS.PAGE_SIZE);

// Validation limits
if (cartItems.length >= LIMITS.MAX_CART_ITEMS) {
  showError('Cart is full');
}

if (searchQuery.length < LIMITS.MIN_SEARCH_LENGTH) {
  return; // Don't search yet
}

// Responsive design
const isMobile = window.innerWidth < BREAKPOINTS.MD;
const isDesktop = window.innerWidth >= BREAKPOINTS.LG;
```

### Z-Index Layers

```typescript
import { Z_INDEX } from '@repo/constants';

// Use in styled components or CSS-in-JS
const Modal = styled.div`
  z-index: ${Z_INDEX.MODAL};
`;

const Tooltip = styled.div`
  z-index: ${Z_INDEX.TOOLTIP};
`;

const Toast = styled.div`
  z-index: ${Z_INDEX.TOAST};
`;
```

## Constants Reference

### Routes (40+ routes)
- Public: HOME, LOGIN, REGISTER, PRODUCTS, etc.
- Protected: PROFILE, ORDERS, WISHLIST, etc.
- Admin: ADMIN_DASHBOARD, ADMIN_PRODUCTS, etc.
- Error: NOT_FOUND, UNAUTHORIZED, FORBIDDEN, etc.

### Storage Keys (25+ keys)
- Authentication: AUTH_TOKEN, REFRESH_TOKEN, USER
- Shopping: CART, WISHLIST, RECENTLY_VIEWED
- Preferences: THEME, LANGUAGE, CURRENCY
- UI State: SIDEBAR_COLLAPSED, FILTERS, etc.

### Validation Patterns (15+ regex)
- EMAIL_REGEX, PASSWORD_STRONG_REGEX, PASSWORD_MEDIUM_REGEX
- PHONE_REGEX, US_PHONE_REGEX, UK_POSTCODE_REGEX
- CREDIT_CARD_REGEX, CVV_REGEX, URL_REGEX
- USERNAME_REGEX, SLUG_REGEX, HEX_COLOR_REGEX

### Validation Constraints (30+ limits)
- User: password length, username length, name length
- Product: name length, description length, price range
- Review: rating range, comment length
- Image: max size (5MB), allowed types
- Pagination: min/max page size

### HTTP Status Codes (25+ codes)
- Success: OK (200), CREATED (201), NO_CONTENT (204)
- Client Errors: BAD_REQUEST (400), UNAUTHORIZED (401), FORBIDDEN (403), NOT_FOUND (404)
- Server Errors: INTERNAL_SERVER_ERROR (500), SERVICE_UNAVAILABLE (503)

### Messages (50+ messages)
- API Errors: NETWORK_ERROR, TIMEOUT, UNAUTHORIZED, etc.
- Success: LOGIN_SUCCESS, ORDER_PLACED, PROFILE_UPDATED, etc.
- Confirmations: DELETE_ACCOUNT, CANCEL_ORDER, CLEAR_CART, etc.

### Formats
- Date formats: ISO, SHORT, MEDIUM, LONG, FULL, RELATIVE
- Currencies: 12 currency codes with symbols
- Languages: 12 language codes (ISO 639-1)
- Countries: 14 country codes (ISO 3166-1)
- Timezones: 10 major timezones

### Application Limits (40+ limits)
- Pagination, search, cart, wishlist, reviews
- File uploads, API timeouts, rate limiting
- Session timeouts, cache TTL
- Animation durations, toast durations

### UI Constants
- Breakpoints: XS (320), SM (640), MD (768), LG (1024), XL (1280), XXL (1536)
- Z-Index: BASE (0), MODAL (1050), TOOLTIP (1070), TOAST (1080)
- Defaults: theme, language, currency, pagination

## Best Practices

### DO ✅

```typescript
// Use constants instead of magic strings
navigate(ROUTES.PRODUCTS);

// Use storage keys with prefix
localStorage.setItem(STORAGE_KEYS.CART, data);

// Use validation regex
if (!EMAIL_REGEX.test(email)) {
  showError(VALIDATION_MESSAGES.EMAIL_INVALID);
}

// Use HTTP status codes
if (status === HTTP_STATUS.NOT_FOUND) { }
```

### DON'T ❌

```typescript
// Don't use magic strings
navigate('/products'); // ❌

// Don't use unprefixed keys
localStorage.setItem('cart', data); // ❌ Conflicts possible

// Don't hardcode validation
if (!email.includes('@')) { } // ❌ Use EMAIL_REGEX

// Don't use magic numbers
if (status === 404) { } // ❌ Use HTTP_STATUS.NOT_FOUND
```

## Adding New Constants

1. **Identify the category** (routes, storage, validation, etc.)
2. **Add to the appropriate file**:
   - Routes → `routes.ts`
   - Storage → `storage.ts`
   - Validation → `validation.ts`
   - Messages → `messages.ts`
   - Formats → `formats.ts`
   - App constants → `app.ts`
3. **Export from `index.ts`**
4. **Document in this README**

Example:

```typescript
// In routes.ts
export const ROUTES = {
  // ... existing routes
  NEW_FEATURE: '/new-feature',
} as const;

// In index.ts
export { ROUTES, buildRoute } from './routes';
```

## Type Safety

All constants use `as const` for type narrowing:

```typescript
// TypeScript knows exact values
const route: typeof ROUTES.HOME = '/'; // ✅
const route: typeof ROUTES.HOME = '/products'; // ❌ Type error

// Autocomplete works
STORAGE_KEYS. // IDE shows all available keys
```

## Testing

```typescript
import { ROUTES, EMAIL_REGEX, VALIDATION } from '@repo/constants';

describe('Constants', () => {
  it('should have correct route paths', () => {
    expect(ROUTES.HOME).toBe('/');
    expect(ROUTES.PRODUCTS).toBe('/products');
  });

  it('should validate emails', () => {
    expect(EMAIL_REGEX.test('test@example.com')).toBe(true);
    expect(EMAIL_REGEX.test('invalid')).toBe(false);
  });

  it('should have correct validation limits', () => {
    expect(VALIDATION.PASSWORD_MIN_LENGTH).toBe(8);
  });
});
```

## Related Packages

- `@repo/types` - TypeScript type definitions
- `@repo/config` - Configuration management
- `@repo/utils` - Utility functions (uses these constants)

## License

Private - Internal use only
