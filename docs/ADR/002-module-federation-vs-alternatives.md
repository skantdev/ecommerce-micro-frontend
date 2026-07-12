# ADR-002: Module Federation vs Alternative Micro Frontend Patterns

**Status**: ✅ Accepted  
**Date**: 2026-07-13  
**Deciders**: Architecture Team  

---

## Context

We need to choose a **micro frontend integration strategy** to enable independent deployment of 9 micro frontends while maintaining a cohesive user experience.

### Requirements

1. **Independent Deployment** - Deploy MFEs without redeploying host
2. **Shared Dependencies** - Avoid duplicate React/Redux bundles
3. **Type Safety** - Maintain TypeScript across boundaries
4. **Performance** - Fast load times, minimal overhead
5. **Developer Experience** - Easy to develop locally
6. **Error Isolation** - Failures in one MFE don't break others

---

## Decision

We will use **Module Federation** (via `@originjs/vite-plugin-federation`) for runtime micro frontend integration.

---

## Rationale

### Module Federation Advantages

1. **Runtime Integration**
   - Load MFEs dynamically without rebuilding host
   - True independent deployment
   - Version each MFE independently

2. **Shared Dependencies**
   - Share React, Redux, Router as singletons
   - Reduce bundle size by 60-70%
   - One version of libraries loaded in browser

3. **Vite Support**
   - `@originjs/vite-plugin-federation` brings Module Federation to Vite
   - Fast HMR in development
   - Optimal build performance

4. **Developer Experience**
   - Run each MFE independently during development
   - Easy to debug and test in isolation
   - Clear contracts between host and remotes

5. **Production Ready**
   - Used by major companies (Microsoft, Amazon, PayPal)
   - Battle-tested pattern
   - Active community and ecosystem

6. **Lazy Loading**
   - Load MFEs on demand (route-based)
   - Better initial load performance
   - Reduced time to interactive

---

## Alternatives Considered

### 1. ❌ Iframe-Based Composition

```html
<!-- Host Page -->
<iframe src="https://products.example.com" />
<iframe src="https://cart.example.com" />
```

**Pros**:
- ✅ Maximum isolation
- ✅ Simple to implement
- ✅ No shared state issues

**Cons**:
- ❌ Poor UX (nested scrolling, sizing issues)
- ❌ No shared state (duplication of auth, theme)
- ❌ Difficult navigation (can't use React Router)
- ❌ Performance overhead (multiple React instances)
- ❌ SEO challenges
- ❌ Accessibility issues

**Decision**: Not chosen due to poor UX and lack of shared state

---

### 2. ❌ Web Components

```javascript
// Define custom element
class ProductList extends HTMLElement {
  connectedCallback() {
    // Render React app
  }
}
customElements.define('product-list', ProductList);
```

**Pros**:
- ✅ Framework agnostic
- ✅ Native browser API
- ✅ Good encapsulation

**Cons**:
- ❌ Immature ecosystem for React
- ❌ Difficult to share React context
- ❌ CSS isolation makes theming hard
- ❌ Event communication is complex
- ❌ TypeScript support is limited

**Decision**: Not chosen due to React integration challenges

---

### 3. ❌ Server-Side Composition (ESI/SSI)

```html
<!-- Host HTML -->
<!--#include virtual="/products/fragment" -->
<!--#include virtual="/cart/fragment" -->
```

**Pros**:
- ✅ Good for SEO
- ✅ Fast initial load
- ✅ Server-side rendering

**Cons**:
- ❌ Requires backend infrastructure
- ❌ No client-side navigation
- ❌ Difficult to share state
- ❌ Complex deployment
- ❌ Less interactive

**Decision**: Not chosen as we need client-side interactivity

---

### 4. ❌ NPM Package Publishing

```json
{
  "dependencies": {
    "@company/products-mfe": "^1.2.3",
    "@company/cart-mfe": "^1.2.3"
  }
}
```

**Pros**:
- ✅ Type safety via npm packages
- ✅ Versioned dependencies
- ✅ Standard package management

**Cons**:
- ❌ **NOT true micro frontends** - no independent deployment
- ❌ Must rebuild and redeploy host for any MFE change
- ❌ Tight coupling
- ❌ Versioning hell
- ❌ Slower release cycles

**Decision**: Not chosen as it violates independent deployment requirement

---

### 5. ❌ Single-SPA

```javascript
// Host registration
registerApplication({
  name: 'products',
  app: () => import('https://products.example.com/main.js'),
  activeWhen: '/products',
});
```

**Pros**:
- ✅ Framework for micro frontends
- ✅ Lifecycle management
- ✅ Supports multiple frameworks

**Cons**:
- ❌ More complex than Module Federation
- ❌ Additional abstraction layer
- ❌ Requires Single-SPA knowledge
- ❌ Less modern than Module Federation
- ❌ More boilerplate

**Decision**: Not chosen as Module Federation is more modern and simpler

---

## Comparison Table

| Pattern | Independent Deploy | Shared Deps | Type Safety | Performance | DX | Verdict |
|---------|-------------------|-------------|-------------|-------------|----|----|
| **Module Federation** | ✅ Yes | ✅ Yes | ✅ Good | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ **Selected** |
| Iframes | ✅ Yes | ❌ No | ❌ No | ⭐⭐ | ⭐⭐ | ❌ |
| Web Components | ✅ Yes | ⚠️ Partial | ⚠️ Limited | ⭐⭐⭐ | ⭐⭐⭐ | ❌ |
| SSI/ESI | ✅ Yes | ❌ No | ❌ No | ⭐⭐⭐⭐ | ⭐⭐ | ❌ |
| NPM Packages | ❌ **No** | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ |
| Single-SPA | ✅ Yes | ⚠️ Manual | ⚠️ Limited | ⭐⭐⭐⭐ | ⭐⭐⭐ | ❌ |

---

## Implementation

### Host Configuration

```typescript
// apps/host/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        products: 'http://localhost:3003/assets/remoteEntry.js',
        cart: 'http://localhost:3004/assets/remoteEntry.js',
        // ... other remotes
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
        'react-router-dom': { singleton: true },
        'redux': { singleton: true },
      },
    }),
  ],
});
```

### Remote Configuration

```typescript
// apps/products/vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': './src/features/product-list/ProductList',
        './ProductDetail': './src/features/product-detail/ProductDetail',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  build: {
    target: 'esnext',
  },
});
```

### Usage in Host

```typescript
// apps/host/src/routes/routes.tsx
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from '@repo/ui';

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

## Consequences

### Positive

✅ **Independent Deployment** - Deploy products MFE without touching host  
✅ **Shared Dependencies** - React loaded once, saves ~300KB  
✅ **Fast HMR** - Changes reflect instantly in development  
✅ **Error Isolation** - ErrorBoundary catches MFE crashes  
✅ **Lazy Loading** - Load MFEs on demand  
✅ **Type Safety** - TypeScript works across boundaries  
✅ **Battle Tested** - Used in production by major companies  

### Negative

❌ **Learning Curve** - Team needs to learn Module Federation concepts  
❌ **Debugging Complexity** - Source maps across remotes can be tricky  
❌ **Version Management** - Need to manage shared dependency versions carefully  
❌ **Bundle Size Tracking** - More complex than monolith  

### Mitigation

- **Training**: Architecture documentation and team workshops
- **Debugging**: Configure source maps properly, use React DevTools
- **Versioning**: Use `requiredVersion` in shared config, enforce in CI
- **Monitoring**: Use bundle analyzer, track each MFE size separately

---

## Success Metrics

- ✅ Each MFE deploys independently (verified in CI/CD)
- ✅ Shared React bundle reduces total size by 60%+
- ✅ Initial load time < 3 seconds
- ✅ MFE load on demand reduces TTI by 40%+
- ✅ Zero MFE crashes affect other MFEs

---

## References

- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [@originjs/vite-plugin-federation](https://github.com/originjs/vite-plugin-federation)
- [Micro Frontends - Martin Fowler](https://martinfowler.com/articles/micro-frontends.html)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)

---

## Notes

- If Vite native federation is released, consider migration
- Monitor performance metrics closely
- Keep shared dependencies in sync across MFEs
- Consider fallback strategies if remote fails to load

---

**Reviewed By**: Senior Frontend Architect  
**Next Review Date**: 2027-01-01 (6 months)
