# Architecture Overview

## Table of Contents

1. [System Overview](#system-overview)
2. [Micro Frontend Architecture](#micro-frontend-architecture)
3. [Technology Stack](#technology-stack)
4. [Module Federation Strategy](#module-federation-strategy)
5. [Communication Patterns](#communication-patterns)
6. [State Management](#state-management)
7. [Authentication Flow](#authentication-flow)
8. [Deployment Architecture](#deployment-architecture)
9. [Performance Targets](#performance-targets)
10. [Security Considerations](#security-considerations)

---

## System Overview

This is an **enterprise-scale e-commerce platform** built with **Micro Frontend Architecture**, enabling:

- **Independent deployment** of each micro frontend
- **Team autonomy** - different teams can own different business domains
- **Technology flexibility** - ability to upgrade dependencies independently
- **Fault isolation** - failures in one MFE don't cascade to others
- **Scalable development** - multiple teams working in parallel

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Host Application (Shell)                    │   │
│  │  - React Router v7                                       │   │
│  │  - Global Error Boundary                                 │   │
│  │  - Authentication Context                                │   │
│  │  - Redux Store Provider                                  │   │
│  │  - Theme Provider                                        │   │
│  └───────────┬─────────────────────────────────────────────┘   │
│              │  (Module Federation - Runtime Integration)       │
│              │                                                   │
│  ┌───────────┴──────────────────────────────────────────────┐  │
│  │                  Micro Frontends                          │  │
│  │                                                           │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │  │
│  │  │  Auth   │  │  Home   │  │Products │  │  Cart   │   │  │
│  │  │  MFE    │  │  MFE    │  │  MFE    │  │  MFE    │   │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │  │
│  │                                                           │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │  │
│  │  │Checkout │  │ Orders  │  │ Profile │  │  Admin  │   │  │
│  │  │  MFE    │  │  MFE    │  │  MFE    │  │  MFE    │   │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────┴───────────────────────────────┐  │
│  │              Shared Packages (Imported)                    │  │
│  │  @repo/ui  @repo/hooks  @repo/api  @repo/types             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                   │
└───────────────────────────────┬───────────────────────────────────┘
                                │
                                │  (HTTP/REST)
                                │
                    ┌───────────┴───────────┐
                    │   Backend Services    │
                    │  - Authentication     │
                    │  - Products API       │
                    │  - Orders API         │
                    │  - Payment Gateway    │
                    └───────────────────────┘
```

---

## Micro Frontend Architecture

### Design Principles

1. **Domain-Driven Design** - Each MFE represents a business domain (Auth, Products, Cart, etc.)
2. **Independent Deployment** - Deploy MFEs without redeploying the host
3. **Technology Agnostic** - Each MFE can use different versions (within reason)
4. **Shared Nothing** - MFEs don't directly import from each other
5. **Communication via Events** - Loose coupling through event bus
6. **Shared UI Library** - Consistency through `@repo/ui` package

### Micro Frontend Breakdown

| MFE | Purpose | Dependencies | Port |
|-----|---------|-------------|------|
| **Host** | Shell, routing, orchestration | All MFEs | 3000 |
| **Auth** | Login, registration, password reset | None | 3001 |
| **Home** | Landing page, hero, featured products | Products API | 3002 |
| **Products** | Catalog, search, filters, details | None | 3003 |
| **Cart** | Shopping cart CRUD | Products data | 3004 |
| **Checkout** | Multi-step checkout flow | Cart, Auth | 3005 |
| **Orders** | Order history, tracking | Auth | 3006 |
| **Profile** | User settings, addresses | Auth | 3007 |
| **Admin** | Dashboard, management | Auth (admin role) | 3008 |

### Ownership Model

```
┌─────────────────────────────────────────────────────────┐
│                    Team Structure                        │
├─────────────────────────────────────────────────────────┤
│  Platform Team       → Host, Shared Packages            │
│  Auth Team           → Authentication MFE               │
│  Catalog Team        → Products, Home MFEs              │
│  Commerce Team       → Cart, Checkout MFEs              │
│  Customer Team       → Orders, Profile MFEs             │
│  Admin Team          → Admin MFE                        │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Core Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | 19.x | UI library |
| **Language** | TypeScript | 5.5+ | Type safety |
| **Build Tool** | Vite | 5.x | Fast builds, HMR |
| **Styling** | Tailwind CSS | 3.x | Utility-first CSS |
| **Routing** | React Router | 7.x | Client-side routing |
| **State Management** | Redux Toolkit | 2.x | Global state |
| **Server State** | React Query | 5.x | API caching, sync |
| **Forms** | React Hook Form | 7.x | Form management |
| **Validation** | Zod | 3.x | Schema validation |
| **Animations** | Framer Motion | 11.x | UI animations |
| **HTTP Client** | Axios | 1.x | API requests |
| **Testing** | Vitest | 1.x | Unit/integration tests |
| **E2E Testing** | Cypress | 13.x | End-to-end tests |
| **Monorepo** | Turborepo | 2.x | Build orchestration |
| **Package Manager** | pnpm | 9.x | Efficient dependency management |
| **Module Federation** | @originjs/vite-plugin-federation | 0.3.x | Runtime integration |

### Why These Choices?

See [Architecture Decision Records](./ADR/) for detailed rationale.

---

## Module Federation Strategy

### Configuration

Each micro frontend exposes components via Module Federation:

```typescript
// apps/products/vite.config.ts
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': './src/features/product-list/ProductList',
        './ProductDetail': './src/features/product-detail/ProductDetail',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
        'react-router-dom': { singleton: true },
        'redux': { singleton: true },
        'react-redux': { singleton: true },
      },
    }),
  ],
});
```

### Host Configuration

The host dynamically loads remotes:

```typescript
// apps/host/vite.config.ts
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'host',
      remotes: {
        auth: 'http://localhost:3001/assets/remoteEntry.js',
        home: 'http://localhost:3002/assets/remoteEntry.js',
        products: 'http://localhost:3003/assets/remoteEntry.js',
        cart: 'http://localhost:3004/assets/remoteEntry.js',
        checkout: 'http://localhost:3005/assets/remoteEntry.js',
        orders: 'http://localhost:3006/assets/remoteEntry.js',
        profile: 'http://localhost:3007/assets/remoteEntry.js',
        admin: 'http://localhost:3008/assets/remoteEntry.js',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router-dom': { singleton: true },
        'redux': { singleton: true },
      },
    }),
  ],
});
```

### Lazy Loading Pattern

```typescript
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from '@repo/ui';
import { Loader } from '@repo/ui';

// Lazy load remote component
const ProductList = lazy(() => import('products/ProductList'));

export function ProductsRoute() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<Loader />}>
        <ProductList />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

## Communication Patterns

### 1. Shared Redux Store

Used for global state that multiple MFEs need to access:

```typescript
// @repo/store
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    theme: themeReducer,
  },
});
```

### 2. Custom Event Bus

Used for loosely-coupled communication:

```typescript
// @repo/utils/eventBus.ts
type EventCallback = (data: any) => void;

class EventBus {
  private events: Map<string, EventCallback[]> = new Map();

  subscribe(event: string, callback: EventCallback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  publish(event: string, data?: any) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }

  unsubscribe(event: string, callback: EventCallback) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }
}

export const eventBus = new EventBus();
```

### 3. Context Providers

Used for authentication and theme:

```typescript
// Host provides contexts
<AuthProvider>
  <ThemeProvider>
    <ReduxProvider>
      <RouterProvider router={router} />
    </ReduxProvider>
  </ThemeProvider>
</AuthProvider>
```

### Event Types

```typescript
// @repo/types/events.ts
export enum AppEvent {
  USER_LOGGED_IN = 'user:logged-in',
  USER_LOGGED_OUT = 'user:logged-out',
  CART_UPDATED = 'cart:updated',
  CART_ITEM_ADDED = 'cart:item-added',
  CART_ITEM_REMOVED = 'cart:item-removed',
  THEME_CHANGED = 'theme:changed',
  ORDER_PLACED = 'order:placed',
}
```

---

## State Management

### Redux Toolkit - Global State

Used for:
- ✅ Authentication state
- ✅ Cart state
- ✅ Wishlist
- ✅ Theme preferences
- ✅ User profile

### React Query - Server State

Used for:
- ✅ Product data
- ✅ Order data
- ✅ User data fetching
- ✅ Caching and invalidation

### Local State

Used for:
- ✅ Form inputs
- ✅ UI toggles (modals, dropdowns)
- ✅ Component-specific state

### State Management Decision Tree

```
Is the state needed across multiple MFEs?
├─ Yes → Use Redux Toolkit (global store)
└─ No → Is it server data?
    ├─ Yes → Use React Query (caching + sync)
    └─ No → Use local state (useState/useReducer)
```

---

## Authentication Flow

### JWT-Based Authentication

```
┌──────────┐           ┌──────────┐           ┌──────────┐
│  Client  │           │   Auth   │           │ Backend  │
│  (Host)  │           │   MFE    │           │   API    │
└────┬─────┘           └────┬─────┘           └────┬─────┘
     │                      │                      │
     │ 1. Navigate to /login                      │
     ├─────────────────────>│                      │
     │                      │                      │
     │                 2. Enter credentials        │
     │                      │                      │
     │                      │ 3. POST /api/auth/login
     │                      ├─────────────────────>│
     │                      │                      │
     │                      │ 4. JWT tokens        │
     │                      │<─────────────────────┤
     │                      │  (access + refresh)  │
     │                      │                      │
     │ 5. Store in Redux + localStorage           │
     │<─────────────────────┤                      │
     │                      │                      │
     │ 6. Publish USER_LOGGED_IN event            │
     │                      │                      │
     │ 7. Redirect to /dashboard                  │
     │                      │                      │
```

### Token Refresh Flow

```typescript
// @repo/api/interceptors.ts
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        const { data } = await axios.post('/api/auth/refresh', {
          refreshToken,
        });

        setAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

---

## Deployment Architecture

### Production Deployment

```
┌─────────────────────────────────────────────────────────────┐
│                       AWS CloudFront (CDN)                   │
└───────────────────────────┬─────────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            │                               │
    ┌───────▼────────┐          ┌──────────▼──────────┐
    │  S3: Host App  │          │  S3: MFE Buckets    │
    │  /host/*       │          │  /auth/*            │
    └────────────────┘          │  /products/*        │
                                │  /cart/*            │
                                │  /checkout/*        │
                                │  /orders/*          │
                                │  /profile/*         │
                                │  /admin/*           │
                                └─────────────────────┘
```

### Deployment Strategy

1. **Independent Deployments** - Each MFE deploys to its own S3 bucket
2. **Versioning** - Use semantic versioning (remoteEntry.v1.2.3.js)
3. **Rollback** - Switch CloudFront to previous version
4. **Canary Deployments** - Route 10% traffic to new version
5. **Feature Flags** - Gradual rollout of features

---

## Performance Targets

### Load Performance

| Metric | Target | Strategy |
|--------|--------|----------|
| **First Contentful Paint (FCP)** | < 1.5s | Code splitting, CDN |
| **Largest Contentful Paint (LCP)** | < 2.5s | Image optimization, lazy loading |
| **Time to Interactive (TTI)** | < 3.5s | Minimal main thread work |
| **Total Blocking Time (TBT)** | < 300ms | Async chunks |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Reserve space for dynamic content |
| **Bundle Size (per MFE)** | < 500KB gzipped | Tree shaking, code splitting |

### Runtime Performance

| Metric | Target |
|--------|--------|
| **60 FPS animations** | All interactions |
| **React Query cache hit rate** | > 80% |
| **Redux action processing** | < 16ms |

### Optimization Techniques

1. **Code Splitting** - Route-based and component-based
2. **Tree Shaking** - Remove unused code
3. **Lazy Loading** - Load MFEs on demand
4. **Memoization** - useMemo, useCallback, React.memo
5. **Virtualization** - Virtual scrolling for large lists
6. **Image Optimization** - WebP format, lazy loading, responsive images
7. **Bundle Analysis** - Regular bundle size audits

---

## Security Considerations

### Authentication & Authorization

- ✅ JWT tokens with short expiration (15 minutes)
- ✅ Refresh tokens stored in httpOnly cookies
- ✅ CSRF protection
- ✅ Role-based access control (RBAC)
- ✅ Permission-based UI rendering

### Data Protection

- ✅ HTTPS only
- ✅ Content Security Policy (CSP)
- ✅ XSS protection (React's built-in escaping)
- ✅ Input validation (Zod schemas)
- ✅ Rate limiting on API calls

### Secure Communication

- ✅ API requests authenticated with Bearer tokens
- ✅ Sensitive data never in localStorage (use sessionStorage or memory)
- ✅ Audit logging for admin actions

---

## Monitoring & Observability

### Metrics to Track

1. **Performance Metrics** - Lighthouse scores, Core Web Vitals
2. **Error Rates** - ErrorBoundary catches, API errors
3. **User Analytics** - Page views, conversion rates
4. **Bundle Sizes** - Per MFE, per route
5. **API Latency** - Response times, timeout rates

### Tools (Future Implementation)

- **Sentry** - Error tracking
- **DataDog** - APM and monitoring
- **Google Analytics** - User analytics
- **Webpack Bundle Analyzer** - Bundle size visualization

---

## Future Enhancements

1. **Server-Side Rendering (SSR)** - Improve SEO and initial load
2. **Progressive Web App (PWA)** - Offline support, app-like experience
3. **Internationalization (i18n)** - Multi-language support
4. **A/B Testing Framework** - Experiment with features
5. **Real-Time Features** - WebSocket for live updates
6. **GraphQL Migration** - Reduce over-fetching
7. **Micro Frontends on Edge** - Edge rendering with Cloudflare Workers

---

## References

- [Micro Frontends - Martin Fowler](https://martinfowler.com/articles/micro-frontends.html)
- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [React 19 Documentation](https://react.dev/)
- [Turborepo Documentation](https://turbo.build/repo/docs)

---

**Last Updated**: Step 1 - Initial Architecture
**Status**: 🟢 Foundation Complete
