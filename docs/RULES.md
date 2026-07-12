# Development Rules & Standards

This document defines the **coding standards**, **conventions**, and **best practices** that MUST be followed when developing this application.

## Table of Contents

1. [Folder Structure](#folder-structure)
2. [Naming Conventions](#naming-conventions)
3. [Import Rules](#import-rules)
4. [Component Structure](#component-structure)
5. [TypeScript Rules](#typescript-rules)
6. [State Management Rules](#state-management-rules)
7. [Testing Requirements](#testing-requirements)
8. [Git Commit Conventions](#git-commit-conventions)
9. [Code Review Checklist](#code-review-checklist)
10. [Performance Guidelines](#performance-guidelines)

---

## Folder Structure

### Feature-Based Architecture

Each micro frontend MUST follow this structure:

```
apps/[mfe-name]/
├── src/
│   ├── app/                      # App entry point
│   │   ├── App.tsx               # Root component
│   │   ├── App.test.tsx          # Root tests
│   │   └── router.tsx            # Route configuration
│   ├── features/                 # Feature modules
│   │   ├── [feature-name]/
│   │   │   ├── components/       # Feature-specific components
│   │   │   │   ├── FeatureComponent.tsx
│   │   │   │   ├── FeatureComponent.test.tsx
│   │   │   │   └── index.ts      # Barrel export
│   │   │   ├── hooks/            # Feature-specific hooks
│   │   │   │   ├── useFeature.ts
│   │   │   │   ├── useFeature.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/         # API services
│   │   │   │   ├── featureService.ts
│   │   │   │   ├── featureService.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── store/            # Feature state (Redux slice)
│   │   │   │   ├── featureSlice.ts
│   │   │   │   ├── featureSlice.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/            # Feature-specific types
│   │   │   │   ├── feature.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/            # Feature-specific utilities
│   │   │   │   ├── featureUtils.ts
│   │   │   │   ├── featureUtils.test.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts          # Feature barrel export
│   ├── pages/                    # Page components (route handlers)
│   │   ├── HomePage.tsx
│   │   ├── HomePage.test.tsx
│   │   └── index.ts
│   ├── layouts/                  # Layout components
│   │   ├── MainLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── index.ts
│   ├── providers/                # Context providers
│   │   ├── AppProviders.tsx
│   │   └── index.ts
│   ├── routes/                   # Route definitions
│   │   ├── routes.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── index.ts
│   ├── utils/                    # App-level utilities
│   │   └── index.ts
│   ├── constants/                # App-level constants
│   │   └── index.ts
│   ├── assets/                   # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── styles/                   # Global styles
│   │   └── index.css
│   ├── main.tsx                  # Entry point
│   └── vite-env.d.ts             # Vite types
├── public/                       # Public assets
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
├── package.json                  # Package config
└── README.md                     # App documentation
```

### Shared Package Structure

```
packages/[package-name]/
├── src/
│   ├── index.ts                  # Main export
│   ├── [feature]/
│   │   ├── Component.tsx
│   │   ├── Component.test.tsx
│   │   └── index.ts
│   └── types/
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

### ✅ DO

```
✅ Group by feature, not by file type
✅ Keep components close to where they're used
✅ Use index.ts for barrel exports
✅ Colocate tests with source files
```

### ❌ DON'T

```
❌ Don't create /components, /hooks, /utils at root level
❌ Don't mix business logic with UI components
❌ Don't create deep nesting (max 3 levels)
```

---

## Naming Conventions

### Files

| Type | Convention | Example |
|------|-----------|---------|
| **React Components** | PascalCase | `UserProfile.tsx` |
| **Hooks** | camelCase with `use` prefix | `useAuth.ts` |
| **Utilities** | camelCase | `formatDate.ts` |
| **Types/Interfaces** | PascalCase | `User.types.ts` |
| **Constants** | UPPER_SNAKE_CASE | `API_ENDPOINTS.ts` |
| **Tests** | Match source + `.test.tsx/.ts` | `UserProfile.test.tsx` |
| **Styles** | kebab-case | `user-profile.css` |
| **Config Files** | kebab-case | `vite.config.ts` |

### Variables & Functions

```typescript
// ✅ DO
const userId = '123';
const isAuthenticated = true;
const getUserById = (id: string) => { };
const handleSubmit = () => { };

// ❌ DON'T
const UserId = '123';               // PascalCase for variables
const is_authenticated = true;      // snake_case
const get_user = () => { };         // snake_case
```

### React Components

```typescript
// ✅ DO - PascalCase for components
export function UserProfile() { }
export const ProductCard: FC<ProductCardProps> = () => { };

// ❌ DON'T
export function userProfile() { }   // camelCase
export const product_card = () => { }; // snake_case
```

### Types & Interfaces

```typescript
// ✅ DO
interface User {
  id: string;
  name: string;
}

type UserRole = 'admin' | 'user';

interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

// Props interfaces end with 'Props'
interface ButtonProps { }
interface ModalProps { }

// ❌ DON'T
interface IUser { }                 // Hungarian notation
interface user { }                  // lowercase
type UserRoleType = 'admin';        // Redundant 'Type' suffix
```

### Constants

```typescript
// ✅ DO
export const API_BASE_URL = 'https://api.example.com';
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
} as const;

// ❌ DON'T
export const apiBaseUrl = '...';    // camelCase for constants
export const MaxFileSize = 5;       // PascalCase for constants
```

### Enums

```typescript
// ✅ DO - PascalCase for enum name and keys
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

enum OrderStatus {
  Pending = 'PENDING',
  Shipped = 'SHIPPED',
  Delivered = 'DELIVERED',
}

// ❌ DON'T
enum userRole { }                   // camelCase
enum ORDER_STATUS { }               // UPPER_SNAKE_CASE
```

---

## Import Rules

### Import Order

```typescript
// 1. React imports
import { useState, useEffect } from 'react';
import type { FC } from 'react';

// 2. External libraries (alphabetical)
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { z } from 'zod';

// 3. Internal packages (@repo/*)
import { Button, Modal } from '@repo/ui';
import { useDebounce } from '@repo/hooks';
import { formatCurrency } from '@repo/utils';
import type { User } from '@repo/types';

// 4. Relative imports (parent, sibling)
import { UserService } from '../../services';
import { useUserStore } from '../store';

// 5. Type imports (at the end)
import type { UserProfileProps } from './UserProfile.types';
```

### Absolute Imports

Configure path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@repo/ui": ["../../packages/ui/src"],
      "@repo/hooks": ["../../packages/hooks/src"],
      "@repo/types": ["../../packages/types/src"]
    }
  }
}
```

### ✅ DO

```typescript
// Use barrel exports
import { Button, Modal, Input } from '@repo/ui';

// Use type imports for types
import type { User, Product } from '@repo/types';

// Group imports logically
import { useState, useEffect, useMemo } from 'react';
```

### ❌ DON'T

```typescript
// Don't use relative imports for shared packages
import { Button } from '../../../packages/ui/src/Button';

// Don't import everything
import * as UI from '@repo/ui';

// Don't create circular dependencies
// A imports B, B imports A ❌
```

---

## Component Structure

### Functional Component Template

```typescript
// UserProfile.tsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import type { FC } from 'react';

import { Button } from '@repo/ui';
import { useAuth } from '@repo/hooks';

import type { User } from './UserProfile.types';

// 1. Props interface
interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
  className?: string;
}

// 2. Component definition (FC or function)
export const UserProfile: FC<UserProfileProps> = ({
  userId,
  onUpdate,
  className,
}) => {
  // 3. Hooks (in order: state, effects, custom hooks)
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // 4. Effects
  useEffect(() => {
    // Fetch user data
  }, [userId]);

  // 5. Memoized values
  const displayName = useMemo(() => {
    return user ? `${user.firstName} ${user.lastName}` : '';
  }, [user]);

  // 6. Callbacks
  const handleUpdate = useCallback(() => {
    if (user && onUpdate) {
      onUpdate(user);
    }
  }, [user, onUpdate]);

  // 7. Early returns
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 8. Main render
  return (
    <div className={className}>
      <h2>{displayName}</h2>
      <Button onClick={handleUpdate}>Update</Button>
    </div>
  );
};

// 9. Display name (for debugging)
UserProfile.displayName = 'UserProfile';
```

### Component Best Practices

✅ **DO**
- Use functional components with hooks
- Define props interface above component
- Use FC type for components with props
- Extract complex logic to custom hooks
- Use early returns for loading/error states
- Memoize expensive computations with useMemo
- Memoize callbacks with useCallback

❌ **DON'T**
- Use class components (deprecated)
- Define components inline
- Use any type for props
- Put business logic in components
- Nest components (define outside)

---

## TypeScript Rules

### Strict Mode

**ALWAYS** use strict TypeScript:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Type Annotations

```typescript
// ✅ DO - Explicit return types for functions
function getUserById(id: string): Promise<User> {
  return api.get(`/users/${id}`);
}

// ✅ DO - Type function parameters
const formatUser = (user: User, locale: string): string => {
  return `${user.name} (${locale})`;
};

// ✅ DO - Use type inference for simple cases
const count = 0; // Inferred as number
const users = []; // Annotate if empty: User[]

// ❌ DON'T use 'any'
function processData(data: any) { } // ❌

// ✅ DO use 'unknown' if type is truly unknown
function processData(data: unknown) {
  if (typeof data === 'string') {
    // Type narrowing
  }
}
```

### Type vs Interface

```typescript
// ✅ Use INTERFACE for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Use TYPE for unions, intersections, utilities
type UserRole = 'admin' | 'user' | 'guest';
type Result<T> = { success: true; data: T } | { success: false; error: string };

// ✅ Extend interfaces
interface Employee extends User {
  employeeId: string;
  department: string;
}

// ✅ Compose types
type AdminUser = User & {
  permissions: string[];
};
```

### Avoid Type Assertions

```typescript
// ❌ DON'T use type assertions unless absolutely necessary
const user = data as User;

// ✅ DO validate and type guard
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data
  );
}

if (isUser(data)) {
  // data is now typed as User
}
```

---

## State Management Rules

### When to Use What?

```typescript
// ✅ LOCAL STATE - Component-specific, not shared
const [isOpen, setIsOpen] = useState(false);

// ✅ REDUX - Shared across multiple MFEs (auth, cart)
const user = useSelector((state) => state.auth.user);
dispatch(addToCart(product));

// ✅ REACT QUERY - Server data with caching
const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});

// ✅ CONTEXT - Limited scope sharing (theme, locale)
const { theme, setTheme } = useTheme();
```

### Redux Slice Pattern

```typescript
// ✅ DO - Use Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.total += action.payload.price;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.total -= state.items[index].price;
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
```

---

## Testing Requirements

### Coverage Requirements

- **Minimum**: 80% code coverage
- **Business Logic**: 100% coverage required
- **UI Components**: 70% coverage minimum

### Test File Location

```
src/features/user/
├── components/
│   ├── UserCard.tsx
│   └── UserCard.test.tsx        ✅ Colocated
├── hooks/
│   ├── useUser.ts
│   └── useUser.test.ts          ✅ Colocated
```

### Test Structure

```typescript
// UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { UserCard } from './UserCard';

describe('UserCard', () => {
  // Setup
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  };

  it('renders user information', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    render(<UserCard user={mockUser} onDelete={onDelete} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith(mockUser.id);
  });

  it('shows loading state', () => {
    render(<UserCard user={mockUser} isLoading={true} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
```

### Testing Best Practices

✅ **DO**
- Test user behavior, not implementation
- Use data-testid for elements hard to query
- Mock external dependencies (API calls)
- Test edge cases and error states

❌ **DON'T**
- Test implementation details
- Test third-party libraries
- Write overly complex tests

---

## Git Commit Conventions

### Conventional Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(products): add product filtering` |
| `fix` | Bug fix | `fix(cart): resolve quantity update issue` |
| `docs` | Documentation | `docs(readme): update setup instructions` |
| `style` | Formatting | `style(ui): apply prettier formatting` |
| `refactor` | Code refactoring | `refactor(auth): simplify token refresh logic` |
| `test` | Add tests | `test(cart): add cart service tests` |
| `chore` | Maintenance | `chore(deps): update dependencies` |
| `perf` | Performance | `perf(products): optimize product list rendering` |
| `ci` | CI/CD | `ci: add GitHub Actions workflow` |

### Examples

```bash
# Good commits
feat(auth): implement JWT refresh token logic
fix(checkout): prevent duplicate order submission
docs(architecture): add module federation diagram
refactor(ui): extract Button component variants
test(cart): add integration tests for cart service
perf(products): add virtual scrolling to product list

# Bad commits
❌ "fixed bug"
❌ "WIP"
❌ "asdfasdf"
❌ "Updated files"
```

---

## Code Review Checklist

### Before Submitting PR

- [ ] Code compiles without errors (`pnpm build`)
- [ ] All tests pass (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Formatting is correct (`pnpm format:check`)
- [ ] No console.log statements (use console.warn/error if needed)
- [ ] Types are properly defined (no `any`)
- [ ] Tests added for new features
- [ ] Documentation updated if needed

### Code Review Focus

- [ ] **Correctness** - Does it work as expected?
- [ ] **Tests** - Are there adequate tests?
- [ ] **Performance** - Any performance concerns?
- [ ] **Security** - Any security vulnerabilities?
- [ ] **Maintainability** - Is it easy to understand?
- [ ] **Consistency** - Follows coding standards?
- [ ] **Architecture** - Fits the overall design?

---

## Performance Guidelines

### Optimization Techniques

```typescript
// ✅ DO - Memoize expensive computations
const sortedProducts = useMemo(() => {
  return products.sort((a, b) => a.price - b.price);
}, [products]);

// ✅ DO - Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// ✅ DO - Lazy load routes
const ProductsPage = lazy(() => import('./pages/ProductsPage'));

// ✅ DO - Code split large dependencies
const HeavyChart = lazy(() => import('./components/HeavyChart'));

// ❌ DON'T - Premature optimization
// Only optimize when you have a proven performance issue
```

### Bundle Size

- Each micro frontend should be < 500KB gzipped
- Monitor bundle size with every PR
- Use dynamic imports for large dependencies

### Images

```tsx
// ✅ DO - Lazy load images
<img src={url} loading="lazy" alt="Product" />

// ✅ DO - Use responsive images
<img
  srcSet="image-320w.jpg 320w, image-640w.jpg 640w"
  sizes="(max-width: 640px) 320px, 640px"
  src="image-640w.jpg"
  alt="Product"
/>

// ✅ DO - Use modern formats (WebP)
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Product" />
</picture>
```

---

## Enforcement

These rules are enforced through:

1. **ESLint** - Syntax and import rules
2. **TypeScript** - Type safety
3. **Prettier** - Code formatting
4. **Husky** - Pre-commit hooks
5. **CI/CD** - Automated checks in pipeline
6. **Code Reviews** - Manual enforcement

---

**Last Updated**: Step 1
**Status**: 🟢 Rules Established
