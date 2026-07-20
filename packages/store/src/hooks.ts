import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from './store';

/**
 * Typed dispatch hook
 * 
 * Use instead of plain useDispatch for type-safe action dispatching
 * 
 * @example
 * ```tsx
 * const dispatch = useAppDispatch();
 * dispatch(loginSuccess({ user, token }));
 * ```
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed selector hook
 * 
 * Use instead of plain useSelector for type-safe state access
 * 
 * @example
 * ```tsx
 * const user = useAppSelector(state => state.auth.user);
 * const cartItems = useAppSelector(state => state.cart.items);
 * ```
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
