/**
 * @repo/constants - Application constants for E-Commerce Micro Frontend
 *
 * This package contains all shared constants, validation rules, messages,
 * and configuration values used across micro frontends.
 *
 * @packageDocumentation
 */

// Routes
export { ROUTES, buildRoute, buildRouteWithQuery } from './routes';

// Storage keys
export { STORAGE_KEYS, SESSION_KEYS, COOKIE_KEYS } from './storage';

// Validation
export {
  EMAIL_REGEX,
  PASSWORD_STRONG_REGEX,
  PASSWORD_MEDIUM_REGEX,
  PHONE_REGEX,
  US_PHONE_REGEX,
  US_ZIP_REGEX,
  UK_POSTCODE_REGEX,
  CREDIT_CARD_REGEX,
  CVV_REGEX,
  URL_REGEX,
  SLUG_REGEX,
  ALPHANUMERIC_REGEX,
  USERNAME_REGEX,
  HEX_COLOR_REGEX,
  VALIDATION,
  VALIDATION_MESSAGES,
} from './validation';

// Messages
export {
  HTTP_STATUS,
  API_ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  CONFIRM_MESSAGES,
} from './messages';

// Formats
export {
  DATE_FORMATS,
  CURRENCY_CODES,
  CURRENCY_SYMBOLS,
  LANGUAGE_CODES,
  COUNTRY_CODES,
  TIMEZONES,
  NUMBER_FORMATS,
  FILE_SIZE_UNITS,
  FILE_SIZE_BYTES,
} from './formats';

// App constants
export {
  LIMITS,
  BREAKPOINTS,
  Z_INDEX,
  DEFAULTS,
  SOCIAL_PLATFORMS,
  PAYMENT_PROVIDERS,
  SHIPPING_CARRIERS,
} from './app';
