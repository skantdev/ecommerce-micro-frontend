/**
 * @repo/utils - Utility Functions for E-Commerce Micro Frontend
 * 
 * Collection of utility functions for common operations:
 * - Date/time formatting and manipulation (date-fns)
 * - Currency formatting and calculations (cents-based)
 * - String manipulation and formatting
 * - Validation helpers
 * - Storage wrappers (localStorage, sessionStorage)
 * - Array utilities (groupBy, unique, chunk, etc.)
 * - Object utilities (pick, omit, deepMerge, etc.)
 * - Number utilities (clamp, random, formatting, etc.)
 * 
 * @packageDocumentation
 */

// Date utilities
export * from './date';

// Currency utilities
export * from './currency';

// String utilities
export {
  capitalize,
  capitalizeWords,
  uppercase,
  lowercase,
  truncate,
  truncateWords,
  slugify,
  unslugify,
  normalizeWhitespace,
  removeWhitespace,
  isEmpty as isEmptyString,
  containsIgnoreCase,
  wordCount,
  getInitials,
  mask,
  maskEmail,
  maskCreditCard,
  formatCreditCard,
  formatPhoneNumber,
  randomString,
  pluralize,
  formatNumber as formatNumberString,
  escapeHtml,
  stripHtml,
} from './string';

// Validation utilities
export * from './validation';

// Storage utilities
export * from './storage';

// Array utilities
export * from './array';

// Object utilities
export {
  pick,
  omit,
  deepClone,
  deepMerge,
  isEmpty as isEmptyObject,
  getNestedValue,
  setNestedValue,
  mapValues,
  filterObject,
  invert,
  keys,
  values,
  entries,
  arrayToObject,
  flattenObject,
  areObjectsEqual,
} from './object';

// Number utilities
export {
  clamp,
  random,
  randomInt,
  round,
  formatNumber,
  formatPercentage,
  formatBytes,
  isEven,
  isOdd,
  isInteger,
  isFloat,
  isPositive as isPositiveNumber,
  isNegative as isNegativeNumber,
  abs,
  percentage,
  percentageChange,
  lerp,
  map,
  mean,
  median,
  mode,
  standardDeviation,
  safeDivide,
} from './number';
