/**
 * Date and time formats
 */
export const DATE_FORMATS = {
  // Common formats
  ISO: 'YYYY-MM-DD',                    // 2024-01-15
  ISO_DATETIME: 'YYYY-MM-DDTHH:mm:ss',  // 2024-01-15T14:30:00
  
  // Display formats
  SHORT: 'MM/DD/YYYY',                  // 01/15/2024
  MEDIUM: 'MMM DD, YYYY',               // Jan 15, 2024
  LONG: 'MMMM DD, YYYY',                // January 15, 2024
  FULL: 'dddd, MMMM DD, YYYY',          // Monday, January 15, 2024
  
  // Time formats
  TIME_12H: 'hh:mm A',                  // 02:30 PM
  TIME_24H: 'HH:mm',                    // 14:30
  TIME_WITH_SECONDS: 'HH:mm:ss',        // 14:30:45
  
  // DateTime formats
  DATETIME_SHORT: 'MM/DD/YYYY HH:mm',   // 01/15/2024 14:30
  DATETIME_MEDIUM: 'MMM DD, YYYY HH:mm', // Jan 15, 2024 14:30
  DATETIME_LONG: 'MMMM DD, YYYY HH:mm:ss', // January 15, 2024 14:30:45
  
  // Relative formats
  RELATIVE: 'relative',                 // "2 hours ago", "in 3 days"
  
  // API formats
  API_REQUEST: 'YYYY-MM-DD HH:mm:ss',
  API_RESPONSE: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
} as const;

/**
 * Currency codes (ISO 4217)
 */
export const CURRENCY_CODES = {
  USD: 'USD', // US Dollar
  EUR: 'EUR', // Euro
  GBP: 'GBP', // British Pound
  JPY: 'JPY', // Japanese Yen
  CAD: 'CAD', // Canadian Dollar
  AUD: 'AUD', // Australian Dollar
  CHF: 'CHF', // Swiss Franc
  CNY: 'CNY', // Chinese Yuan
  INR: 'INR', // Indian Rupee
  MXN: 'MXN', // Mexican Peso
  BRL: 'BRL', // Brazilian Real
  ZAR: 'ZAR', // South African Rand
} as const;

/**
 * Currency symbols
 */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'CA$',
  AUD: 'A$',
  CHF: 'Fr',
  CNY: '¥',
  INR: '₹',
  MXN: 'MX$',
  BRL: 'R$',
  ZAR: 'R',
} as const;

/**
 * Language codes (ISO 639-1)
 */
export const LANGUAGE_CODES = {
  EN: 'en', // English
  ES: 'es', // Spanish
  FR: 'fr', // French
  DE: 'de', // German
  IT: 'it', // Italian
  PT: 'pt', // Portuguese
  RU: 'ru', // Russian
  ZH: 'zh', // Chinese
  JA: 'ja', // Japanese
  KO: 'ko', // Korean
  AR: 'ar', // Arabic
  HI: 'hi', // Hindi
} as const;

/**
 * Country codes (ISO 3166-1 alpha-2)
 */
export const COUNTRY_CODES = {
  US: 'US', // United States
  GB: 'GB', // United Kingdom
  CA: 'CA', // Canada
  AU: 'AU', // Australia
  DE: 'DE', // Germany
  FR: 'FR', // France
  IT: 'IT', // Italy
  ES: 'ES', // Spain
  JP: 'JP', // Japan
  CN: 'CN', // China
  IN: 'IN', // India
  BR: 'BR', // Brazil
  MX: 'MX', // Mexico
  ZA: 'ZA', // South Africa
} as const;

/**
 * Time zones
 */
export const TIMEZONES = {
  UTC: 'UTC',
  EST: 'America/New_York',      // Eastern Time
  CST: 'America/Chicago',        // Central Time
  MST: 'America/Denver',         // Mountain Time
  PST: 'America/Los_Angeles',    // Pacific Time
  GMT: 'Europe/London',          // Greenwich Mean Time
  CET: 'Europe/Paris',           // Central European Time
  JST: 'Asia/Tokyo',             // Japan Standard Time
  IST: 'Asia/Kolkata',           // India Standard Time
  AEST: 'Australia/Sydney',      // Australian Eastern Time
} as const;

/**
 * Number formats
 */
export const NUMBER_FORMATS = {
  DECIMAL_SEPARATOR: '.',
  THOUSANDS_SEPARATOR: ',',
  CURRENCY_DECIMALS: 2,
  PERCENTAGE_DECIMALS: 1,
  WEIGHT_DECIMALS: 2,
  RATING_DECIMALS: 1,
} as const;

/**
 * File size units
 */
export const FILE_SIZE_UNITS = {
  BYTES: 'B',
  KILOBYTES: 'KB',
  MEGABYTES: 'MB',
  GIGABYTES: 'GB',
  TERABYTES: 'TB',
} as const;

/**
 * File size bytes
 */
export const FILE_SIZE_BYTES = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
} as const;
