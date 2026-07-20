import { useContext, createContext } from 'react';
import { UserRole } from '@repo/types';
import type { User } from '@repo/types';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * AuthContext - React context for authentication state
 *
 * Provide this at the application root via AuthProvider.
 * Access via useAuth() hook.
 */
export const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * useAuth - Access authentication state and actions
 *
 * Must be used inside an AuthProvider.
 *
 * @returns Authentication state and methods
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, logout } = useAuth();
 *
 * if (!isAuthenticated) return <Redirect to="/login" />;
 *
 * return <div>Welcome, {user.name}</div>;
 * ```
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

/**
 * usePermission - Check if the current user has a specific role
 *
 * @param role - Role to check
 * @returns boolean
 *
 * @example
 * ```tsx
 * const canManageProducts = usePermission('admin');
 *
 * return canManageProducts ? <AdminPanel /> : null;
 * ```
 */
export function usePermission(role: UserRole): boolean {
  const { user } = useAuth();
  if (!user) return false;
  // Support role hierarchy: SUPER_ADMIN > ADMIN > CUSTOMER > GUEST
  const hierarchy: UserRole[] = [
    UserRole.GUEST,
    UserRole.CUSTOMER,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
  ];
  const userLevel = hierarchy.indexOf(user.role);
  const requiredLevel = hierarchy.indexOf(role);
  return userLevel >= requiredLevel;
}
