# ADR-003: Redux Toolkit vs Zustand vs Jotai for State Management

**Status**: ✅ Accepted  
**Date**: 2026-07-13  
**Deciders**: Architecture Team  

---

## Context

We need a **global state management solution** for:
- Authentication state (user, tokens)
- Shopping cart state
- User preferences (theme, locale)
- Wishlist
- Notifications

The state must be accessible across all 9 micro frontends.

---

## Decision

We will use **Redux Toolkit** as our primary global state management library.

---

## Rationale

### Redux Toolkit Advantages

1. **User Requirement**
   - Explicitly requested in project specification
   - Industry standard for enterprise applications
   - Expected knowledge in senior interviews

2. **Micro Frontend Support**
   - Excellent for shared state across MFEs
   - Single store can be provided at host level
   - Well-tested pattern for distributed apps

3. **DevTools**
   - Redux DevTools provide time-travel debugging
   - Inspect state changes across MFEs
   - Essential for complex state debugging

4. **Middleware Ecosystem**
   - Redux Thunk for async logic
   - Redux Persist for localStorage sync
   - Redux Logger for development

5. **Type Safety**
   - Excellent TypeScript support
   - Typed hooks (useAppDispatch, useAppSelector)
   - Type-safe actions and reducers

6. **Predictable State Updates**
   - Immutable updates
   - Clear action/reducer pattern
   - Easy to trace state changes

7. **Enterprise Adoption**
   - Used by major companies
   - Large community and ecosystem
   - Extensive documentation

8. **Redux Toolkit Simplifies Boilerplate**
   - `createSlice` reduces code by 60%
   - Built-in Immer for immutability
   - RTK Query for API caching (optional)

---

## Alternatives Considered

### 1. ⚠️ Zustand (Strong Alternative)

```typescript
// Zustand example
import create from 'zustand';

const useStore = create((set) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ 
    cart: [...state.cart, item] 
  })),
}));
```

**Pros**:
- ✅ **Much simpler** - Less boilerplate (50% less code)
- ✅ **Smaller bundle** - 1KB vs Redux Toolkit's 8KB
- ✅ **No Provider** - Works out of the box
- ✅ **Easy to learn** - Minimal concepts
- ✅ **Good TypeScript support**
- ✅ **No actions/reducers** - Direct state updates

**Cons**:
- ❌ **Not requested** - User specified Redux Toolkit
- ❌ **Less mature** - Smaller community
- ❌ **Fewer DevTools** - Basic debugging
- ❌ **Less enterprise adoption**

**Why Not Chosen**: User requirement specified Redux Toolkit, and it's more expected in senior-level interviews.

---

### 2. ⚠️ Jotai (Atomic State)

```typescript
// Jotai example
import { atom, useAtom } from 'jotai';

const cartAtom = atom([]);

function Cart() {
  const [cart, setCart] = useAtom(cartAtom);
  // ...
}
```

**Pros**:
- ✅ **Atomic approach** - Fine-grained reactivity
- ✅ **Minimal re-renders** - Only subscribers update
- ✅ **Small bundle** - 3KB
- ✅ **TypeScript first**
- ✅ **No Provider needed** - Import and use

**Cons**:
- ❌ **Not requested** - User specified Redux Toolkit
- ❌ **Different mental model** - Atoms vs store
- ❌ **Less familiar** - Newer pattern
- ❌ **Limited DevTools**

**Why Not Chosen**: User requirement + different mental model requires more training.

---

### 3. ❌ Recoil (Facebook's Atomic State)

```typescript
// Recoil example
import { atom, useRecoilState } from 'recoil';

const cartState = atom({
  key: 'cart',
  default: [],
});
```

**Pros**:
- ✅ Atomic state management
- ✅ Built by Facebook
- ✅ Good for complex state graphs

**Cons**:
- ❌ **Experimental** - Still in beta
- ❌ Not production-ready
- ❌ Uncertain future
- ❌ Less adoption

**Why Not Chosen**: Not production-ready, uncertain future.

---

### 4. ❌ MobX

```typescript
// MobX example
import { makeAutoObservable } from 'mobx';

class CartStore {
  items = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  
  addItem(item) {
    this.items.push(item);
  }
}
```

**Pros**:
- ✅ OOP style
- ✅ Mutable state (easier for some)
- ✅ Automatic reactivity

**Cons**:
- ❌ **Declining adoption**
- ❌ OOP vs functional paradigm
- ❌ Not requested
- ❌ Less predictable

**Why Not Chosen**: Declining popularity + OOP doesn't fit functional React.

---

### 5. ❌ Context API Only

```typescript
// Context API
const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
```

**Pros**:
- ✅ Built into React
- ✅ No additional dependencies
- ✅ Simple for small apps

**Cons**:
- ❌ **Performance issues** - Re-renders all consumers
- ❌ No DevTools
- ❌ Difficult to debug
- ❌ Not designed for global state

**Why Not Chosen**: Poor performance for global state in large apps.

---

## Comparison Table

| Feature | Redux Toolkit | Zustand | Jotai | Context API |
|---------|--------------|---------|-------|-------------|
| **Bundle Size** | 8KB | 1KB | 3KB | 0KB (built-in) |
| **Boilerplate** | Medium (with RTK) | Low | Low | Low |
| **DevTools** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| **TypeScript** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Learning Curve** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **MFE Support** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Enterprise Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **Interview Value** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Verdict** | ✅ **Selected** | ⚠️ Strong Alt | ⚠️ Alternative | ❌ |

---

## Implementation

### Store Configuration

```typescript
// packages/store/src/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    theme: themeReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Slice Example

```typescript
// packages/store/src/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@repo/types';

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
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

### Usage in Components

```typescript
// apps/products/src/features/product-card/ProductCard.tsx
import { useAppDispatch, useAppSelector } from '@repo/store';
import { addItem } from '@repo/store/slices/cartSlice';

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    }));
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

---

## Consequences

### Positive

✅ **Meets Requirements** - User specified Redux Toolkit  
✅ **Interview Ready** - Expected knowledge for senior roles  
✅ **Excellent DevTools** - Time-travel debugging across MFEs  
✅ **Type Safety** - Full TypeScript support  
✅ **Enterprise Standard** - Used by major companies  
✅ **Rich Ecosystem** - Middleware, persistence, async logic  
✅ **Predictable** - Clear action/reducer pattern  

### Negative

❌ **More Boilerplate** - Even with Redux Toolkit, more code than Zustand  
❌ **Larger Bundle** - 8KB vs 1KB (Zustand)  
❌ **Learning Curve** - Concepts: actions, reducers, middleware  
❌ **Verbosity** - More code to achieve same result  

### Mitigation

- **Boilerplate**: Use Redux Toolkit's `createSlice` (reduces code by 60%)
- **Bundle Size**: 8KB is acceptable for enterprise app (shared across MFEs)
- **Learning**: Provide training and documentation
- **Verbosity**: Accept as trade-off for predictability and DevTools

---

## Hybrid Approach

For **local component state**, we'll use:
- `useState` for simple state
- `useReducer` for complex component state
- **React Query** for server state (products, orders)

Only use Redux for:
- Authentication (shared across MFEs)
- Cart (shared across MFEs)
- User preferences (theme, locale)
- Global notifications

---

## Success Metrics

- ✅ All global state in Redux
- ✅ DevTools work in development
- ✅ State persists across page refreshes (cart)
- ✅ No prop drilling across components
- ✅ Type-safe dispatch and selectors

---

## References

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Jotai Documentation](https://jotai.org/)
- [When to Use Redux](https://redux.js.org/faq/general#when-should-i-use-redux)

---

## Notes

If the project were greenfield without user requirements, **Zustand would be a strong contender** due to simplicity and smaller bundle size. However, Redux Toolkit is the correct choice for this project due to:
1. User requirements
2. Interview expectations
3. Enterprise standards

---

**Reviewed By**: Senior Frontend Architect  
**Next Review Date**: 2027-01-01 (6 months)
