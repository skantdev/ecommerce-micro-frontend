import type { ID, Timestamp, Address } from './common.types';

/**
 * User roles for authorization
 */
export enum UserRole {
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

/**
 * User permissions for fine-grained access control
 */
export enum UserPermission {
  // Product permissions
  VIEW_PRODUCTS = 'VIEW_PRODUCTS',
  CREATE_PRODUCTS = 'CREATE_PRODUCTS',
  UPDATE_PRODUCTS = 'UPDATE_PRODUCTS',
  DELETE_PRODUCTS = 'DELETE_PRODUCTS',

  // Order permissions
  VIEW_ORDERS = 'VIEW_ORDERS',
  VIEW_ALL_ORDERS = 'VIEW_ALL_ORDERS',
  UPDATE_ORDERS = 'UPDATE_ORDERS',
  CANCEL_ORDERS = 'CANCEL_ORDERS',

  // User permissions
  VIEW_USERS = 'VIEW_USERS',
  CREATE_USERS = 'CREATE_USERS',
  UPDATE_USERS = 'UPDATE_USERS',
  DELETE_USERS = 'DELETE_USERS',

  // Admin permissions
  MANAGE_SETTINGS = 'MANAGE_SETTINGS',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
}

/**
 * User account status
 */
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

/**
 * User entity
 */
export interface User {
  id: ID;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  permissions: UserPermission[];
  emailVerified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
}

/**
 * User profile with additional details
 */
export interface UserProfile extends User {
  bio?: string;
  dateOfBirth?: string;
  addresses: Address[];
  defaultShippingAddressId?: ID;
  defaultBillingAddressId?: ID;
  preferences: UserPreferences;
}

/**
 * User preferences for personalization
 */
export interface UserPreferences {
  newsletter: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: string;
  currency: string;
  theme: 'light' | 'dark' | 'auto';
}

/**
 * User registration data
 */
export interface UserRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  acceptTerms: boolean;
}

/**
 * User login credentials
 */
export interface UserLoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * User authentication session
 */
export interface UserSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: Timestamp;
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password reset confirmation
 */
export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}
