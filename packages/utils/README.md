# @repo/utils

Comprehensive utility functions for the E-Commerce Micro Frontend platform. A collection of reusable helpers for common operations across all micro frontends.

## Overview

This package provides 8 categories of utilities:

1. **Date** - Date/time formatting and manipulation (date-fns)
2. **Currency** - Money calculations (cents-based, no floating-point issues)
3. **String** - String manipulation and formatting
4. **Validation** - Form validation and data checking
5. **Storage** - Type-safe localStorage/sessionStorage wrappers
6. **Array** - Array operations (groupBy, unique, chunk, etc.)
7. **Object** - Object manipulation (pick, omit, deepMerge, etc.)
8. **Number** - Number utilities (clamp, random, formatting, etc.)

## Installation

This package is internal to the monorepo and automatically available to all apps and packages.

```typescript
import { formatDate, formatCurrency, capitalize } from '@repo/utils';
```

## Usage

### Date Utilities

Powered by `date-fns` for reliable date manipulation.

```typescript
import {
  formatDate,
  formatDateShort,
  formatDateTime,
  formatRelativeTime,
  isToday,
  isPast,
  getDaysDifference,
  addDaysToDate,
} from '@repo/utils';

// Format dates
formatDate(new Date());                 // "Jan 15, 2024"
formatDateShort('2024-01-15');          // "01/15/2024"
formatDateTime(new Date());             // "Jan 15, 2024 14:30"

// Relative time
formatRelativeTime('2024-01-14');       // "1 day ago"
formatRelativeTime('2024-01-16');       // "in 2 days"

// Date checks
isToday(new Date());                    // true
isPast('2023-01-01');                   // true

// Date calculations
getDaysDifference('2024-01-20', '2024-01-15');  // 5
addDaysToDate(new Date(), 7);           // Date 7 days from now
```

**Available functions:**
- `formatDate()`, `formatDateShort()`, `formatDateMedium()`, `formatDateLong()`
- `formatDateTime()`, `formatTime()`
- `formatRelativeTime()` - "2 hours ago", "in 3 days"
- `isToday()`, `isPast()`, `isFuture()`
- `getDaysDifference()`, `getHoursDifference()`, `getMinutesDifference()`
- `addDaysToDate()`, `addHoursToDate()`, `addMinutesToDate()`
- `getStartOfDay()`, `getEndOfDay()`
- `parseDate()`, `isValidDate()`

### Currency Utilities

All prices stored in cents to avoid floating-point precision issues.

```typescript
import {
  formatCurrency,
  formatMoney,
  parseCurrency,
  applyDiscount,
  calculateTax,
  formatPriceWithTax,
} from '@repo/utils';

// Format currency (cents to display)
formatCurrency(1999);                   // "$19.99"
formatCurrency(1999, 'EUR');            // "€19.99"
formatCurrency(1999, 'USD', false);     // "19.99" (no symbol)

// Parse currency string
parseCurrency('$19.99');                // 1999 (cents)
parseCurrency('19.99');                 // 1999

// Calculations (all in cents)
applyDiscount(10000, 20);               // 8000 (20% off $100)
calculateTax(10000, 8.5);               // 850 (8.5% tax on $100)

// Format with tax
formatPriceWithTax(10000, 8.5);
// {
//   subtotal: "$100.00",
//   tax: "$8.50",
//   total: "$108.50"
// }
```

**Available functions:**
- `formatCurrency()`, `formatMoney()`
- `parseCurrency()` - "$19.99" → 1999 cents
- `addCurrency()`, `subtractCurrency()`, `multiplyCurrency()`, `divideCurrency()`
- `calculatePercentage()`, `applyDiscount()`, `calculateTax()`
- `formatPriceWithTax()`
- `compareCurrency()`, `isZero()`, `isPositive()`, `isNegative()`

### String Utilities

Common string operations and formatting.

```typescript
import {
  capitalize,
  capitalizeWords,
  truncate,
  slugify,
  unslugify,
  mask,
  maskEmail,
  formatPhoneNumber,
  pluralize,
} from '@repo/utils';

// Capitalization
capitalize('hello world');              // "Hello world"
capitalizeWords('hello world');         // "Hello World"

// Truncation
truncate('Long text here', 10);         // "Long te..."
truncateWords('One two three four', 2); // "One two..."

// Slugs
slugify('Hello World!');                // "hello-world"
unslugify('hello-world');               // "Hello World"

// Masking
mask('1234567890', 4, 4);               // "1234**7890"
maskEmail('user@example.com');          // "us**@example.com"
maskCreditCard('1234 5678 9012 3456');  // "1234 **** **** 3456"

// Formatting
formatPhoneNumber('1234567890');        // "(123) 456-7890"
formatCreditCard('1234567890123456');   // "1234 5678 9012 3456"

// Pluralization
pluralize('item', 1);                   // "item"
pluralize('item', 5);                   // "items"
pluralize('person', 5, 'people');       // "people"

// Initials
getInitials('John Smith');              // "JS"
getInitials('John Q. Public', 3);       // "JQP"
```

**Available functions:**
- `capitalize()`, `capitalizeWords()`, `uppercase()`, `lowercase()`
- `truncate()`, `truncateWords()`
- `slugify()`, `unslugify()`
- `normalizeWhitespace()`, `removeWhitespace()`, `isEmpty()`
- `mask()`, `maskEmail()`, `maskCreditCard()`
- `formatPhoneNumber()`, `formatCreditCard()`
- `randomString()`, `pluralize()`, `getInitials()`
- `escapeHtml()`, `stripHtml()`

### Validation Utilities

Form validation with regex patterns from `@repo/constants`.

```typescript
import {
  isValidEmail,
  isStrongPassword,
  getPasswordStrength,
  isValidPhone,
  isValidCreditCard,
  isValidCreditCardLuhn,
  isValidAge,
  isRequired,
  hasMinLength,
} from '@repo/utils';

// Email
isValidEmail('user@example.com');       // true
isValidEmail('invalid');                // false

// Password
isStrongPassword('Pass123!');           // true (uppercase, lowercase, number, special)
isMediumPassword('Pass123');            // true (uppercase, lowercase, number)
getPasswordStrength('Pass123!');        // 4 (0-4 scale)

// Phone
isValidPhone('+14155551234');           // true
isValidUSPhone('(415) 555-1234');       // true

// Credit card
isValidCreditCard('4111111111111111');  // true (format check)
isValidCreditCardLuhn('4111111111111111'); // true (Luhn algorithm)

// Age
isValidAge(new Date('2000-01-01'), 18); // true (18+)
isValidAge(new Date('2010-01-01'), 18); // false

// General
isRequired('');                         // false
isRequired('hello');                    // true
hasMinLength('hello', 3);               // true
hasMaxLength('hello', 10);              // true
isInRange(5, 1, 10);                    // true
```

**Available functions:**
- `isValidEmail()`, `isStrongPassword()`, `isMediumPassword()`, `getPasswordStrength()`
- `isValidPhone()`, `isValidUSPhone()`
- `isValidUSZip()`, `isValidUKPostcode()`
- `isValidCreditCard()`, `isValidCreditCardLuhn()`, `isValidCVV()`
- `isValidURL()`, `isValidSlug()`, `isValidUsername()`, `isAlphanumeric()`
- `isValidHexColor()`, `isValidAge()`
- `isRequired()`, `hasMinLength()`, `hasMaxLength()`, `isInRange()`
- `isValidFileType()`, `isValidFileSize()`, `isValidImage()`

### Storage Utilities

Type-safe wrappers for localStorage and sessionStorage.

```typescript
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  getSessionStorage,
  setSessionStorage,
} from '@repo/utils';

// LocalStorage (persists across sessions)
setLocalStorage('cart', { items: [], total: 0 });
const cart = getLocalStorage<Cart>('cart');
removeLocalStorage('cart');

// SessionStorage (cleared on browser close)
setSessionStorage('searchQuery', 'laptops');
const query = getSessionStorage<string>('searchQuery');

// Storage management
hasLocalStorageKey('cart');             // true
getLocalStorageSize();                  // bytes used
clearLocalStorage();                    // clear all
```

**Features:**
- Type-safe with generics
- Automatic JSON serialization/deserialization
- Server-side safe (checks `typeof window`)
- Error handling with console logs
- Storage size calculation

### Array Utilities

Powerful array manipulation functions.

```typescript
import {
  unique,
  uniqueBy,
  groupBy,
  chunk,
  shuffle,
  randomItem,
  sortBy,
  intersection,
  difference,
  sum,
  average,
} from '@repo/utils';

// Unique values
unique([1, 2, 2, 3, 3, 4]);            // [1, 2, 3, 4]
uniqueBy(products, 'id');               // Unique by ID

// Grouping
groupBy(products, 'category');
// {
//   'electronics': [...],
//   'clothing': [...]
// }

// Chunking
chunk([1, 2, 3, 4, 5], 2);             // [[1, 2], [3, 4], [5]]

// Shuffling and random
shuffle([1, 2, 3, 4, 5]);              // Randomized order
randomItem(['a', 'b', 'c']);           // Random item
randomItems(['a', 'b', 'c', 'd'], 2);  // 2 random items

// Sorting
sortBy(products, 'price', 'asc');      // Sort ascending
sortBy(products, 'price', 'desc');     // Sort descending

// Set operations
intersection([1, 2, 3], [2, 3, 4]);    // [2, 3]
difference([1, 2, 3], [2, 3, 4]);      // [1]
union([1, 2, 3], [3, 4, 5]);           // [1, 2, 3, 4, 5]

// Math operations
sum([1, 2, 3, 4, 5]);                  // 15
average([1, 2, 3, 4, 5]);              // 3
min([1, 2, 3, 4, 5]);                  // 1
max([1, 2, 3, 4, 5]);                  // 5
```

**Available functions:**
- `unique()`, `uniqueBy()`, `dedupe()`
- `groupBy()`, `chunk()`, `flatten()`
- `shuffle()`, `randomItem()`, `randomItems()`
- `sortBy()`, `partition()`
- `difference()`, `intersection()`, `union()`
- `sum()`, `average()`, `min()`, `max()`
- `remove()`, `removeAt()`, `insertAt()`, `move()`

### Object Utilities

Object manipulation and transformation.

```typescript
import {
  pick,
  omit,
  deepClone,
  deepMerge,
  isEmpty,
  getNestedValue,
  setNestedValue,
  keys,
  values,
  entries,
} from '@repo/utils';

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  age: 30,
  address: { city: 'NYC', zip: '10001' }
};

// Pick/Omit
pick(user, ['id', 'name']);            // { id: 1, name: 'John' }
omit(user, ['email', 'age']);          // { id: 1, name: 'John', address: {...} }

// Deep operations
const cloned = deepClone(user);        // Full deep copy
const merged = deepMerge(user, { age: 31 }); // Deep merge

// Nested properties
getNestedValue(user, 'address.city');  // 'NYC'
setNestedValue(user, 'address.zip', '10002');

// Empty check
isEmpty({});                           // true
isEmpty({ a: 1 });                     // false

// Type-safe keys/values/entries
keys(user);                            // ['id', 'name', 'email', ...]
values(user);                          // [1, 'John', 'john@...', ...]
entries(user);                         // [['id', 1], ['name', 'John'], ...]

// Transform
mapValues(user, (val, key) => val);    // Transform values
filterObject(user, (val) => val > 0);  // Filter by predicate
flattenObject(user);                   // { id: 1, name: 'John', 'address.city': 'NYC', ... }
```

**Available functions:**
- `pick()`, `omit()`
- `deepClone()`, `deepMerge()`
- `isEmpty()`, `getNestedValue()`, `setNestedValue()`
- `mapValues()`, `filterObject()`, `invert()`
- `keys()`, `values()`, `entries()` - Type-safe
- `arrayToObject()`, `flattenObject()`, `areObjectsEqual()`

### Number Utilities

Number manipulation and formatting.

```typescript
import {
  clamp,
  random,
  randomInt,
  round,
  formatNumber,
  formatPercentage,
  formatBytes,
  percentage,
  percentageChange,
  mean,
  median,
} from '@repo/utils';

// Clamping
clamp(150, 0, 100);                    // 100 (clamped to max)
clamp(-10, 0, 100);                    // 0 (clamped to min)

// Random
random(0, 100);                        // 42.3512... (float)
randomInt(1, 10);                      // 7 (integer)

// Rounding
round(3.14159, 2);                     // 3.14
round(3.14159, 0);                     // 3

// Formatting
formatNumber(1234567);                 // "1,234,567"
formatNumber(3.14159, 2);              // "3.14"
formatPercentage(75.5);                // "75.5%"
formatBytes(1536);                     // "1.50 KB"
formatBytes(1048576);                  // "1.00 MB"

// Calculations
percentage(25, 100);                   // 25 (25 is 25% of 100)
percentageChange(100, 150);            // 50 (50% increase)
percentageChange(100, 75);             // -25 (25% decrease)

// Statistics
mean([1, 2, 3, 4, 5]);                // 3
median([1, 2, 3, 4, 5]);              // 3
median([1, 2, 3, 4]);                 // 2.5
mode([1, 2, 2, 3, 3, 3]);             // 3
standardDeviation([1, 2, 3, 4, 5]);   // 1.414...

// Checks
isEven(4);                             // true
isOdd(5);                              // true
isInteger(5);                          // true
isFloat(5.5);                          // true
```

**Available functions:**
- `clamp()`, `random()`, `randomInt()`
- `round()`, `abs()`
- `formatNumber()`, `formatPercentage()`, `formatBytes()`
- `percentage()`, `percentageChange()`
- `lerp()`, `map()` - Range mapping
- `mean()`, `median()`, `mode()`, `standardDeviation()`
- `isEven()`, `isOdd()`, `isInteger()`, `isFloat()`, `isPositive()`, `isNegative()`
- `safeDivide()` - Avoid division by zero

## Design Principles

### 1. Type Safety
All functions are fully typed with TypeScript generics where appropriate.

```typescript
const cart = getLocalStorage<Cart>('cart');  // Type: Cart | null
const products = sortBy<Product>(items, 'price', 'asc');
```

### 2. Immutability
Array and object utilities return new instances, never mutate inputs.

```typescript
const shuffled = shuffle(originalArray);  // originalArray unchanged
const merged = deepMerge(obj1, obj2);     // obj1 and obj2 unchanged
```

### 3. Cents-Based Currency
All prices stored in cents (integers) to avoid floating-point precision issues.

```typescript
const price = 1999;  // $19.99
formatCurrency(price);  // "$19.99"
```

### 4. Server-Side Safe
Storage utilities check for `typeof window` before accessing browser APIs.

```typescript
// Works in both browser and Node.js
setLocalStorage('key', 'value');  // No-op on server
```

### 5. Error Handling
Functions handle errors gracefully with fallbacks and console warnings.

```typescript
getLocalStorage('key');  // Returns null on error, logs to console
```

## Best Practices

### DO ✅

```typescript
// Use utility functions for consistency
formatCurrency(1999);  // "$19.99"

// Store prices in cents
const product = { price: 1999 };  // $19.99

// Use type-safe storage
const cart = getLocalStorage<Cart>('cart');

// Use date-fns through utilities
formatDate(new Date());

// Use immutable operations
const shuffled = shuffle(items);
```

### DON'T ❌

```typescript
// Don't use floating-point for money
const price = 19.99;  // ❌ Precision issues

// Don't directly parse JSON
const cart = JSON.parse(localStorage.getItem('cart'));  // ❌ No type safety

// Don't mutate arrays
items.sort();  // ❌ Mutates original
```

## Testing

```typescript
import { formatCurrency, slugify, unique } from '@repo/utils';

describe('Utils', () => {
  it('should format currency', () => {
    expect(formatCurrency(1999)).toBe('$19.99');
  });

  it('should slugify strings', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  it('should get unique values', () => {
    expect(unique([1, 2, 2, 3])).toEqual([1, 2, 3]);
  });
});
```

## Dependencies

- **date-fns** (^3.3.1) - Date manipulation and formatting
- **@repo/constants** - Validation regex, formats, limits
- **@repo/types** - TypeScript types (Money, etc.)

## Related Packages

- `@repo/types` - TypeScript type definitions
- `@repo/constants` - Constants and validation rules
- `@repo/config` - Configuration management

## License

Private - Internal use only
