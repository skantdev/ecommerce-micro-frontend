/**
 * Validation Utilities
 * 
 * Functions for validating common data formats
 */

import {
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
} from '@repo/constants';

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validate strong password (uppercase, lowercase, number, special char)
 */
export function isStrongPassword(password: string): boolean {
  return PASSWORD_STRONG_REGEX.test(password);
}

/**
 * Validate medium password (uppercase, lowercase, number)
 */
export function isMediumPassword(password: string): boolean {
  return PASSWORD_MEDIUM_REGEX.test(password);
}

/**
 * Get password strength (0-4)
 */
export function getPasswordStrength(password: string): number {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length
  if (password.length >= VALIDATION.PASSWORD_MIN_LENGTH) strength++;
  if (password.length >= 12) strength++;
  
  // Character types
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[@$!%*?&#]/.test(password)) strength++;
  
  return Math.min(strength, 4);
}

/**
 * Validate phone number (international)
 */
export function isValidPhone(phone: string): boolean {
  return PHONE_REGEX.test(phone);
}

/**
 * Validate US phone number
 */
export function isValidUSPhone(phone: string): boolean {
  return US_PHONE_REGEX.test(phone);
}

/**
 * Validate US ZIP code
 */
export function isValidUSZip(zip: string): boolean {
  return US_ZIP_REGEX.test(zip);
}

/**
 * Validate UK postcode
 */
export function isValidUKPostcode(postcode: string): boolean {
  return UK_POSTCODE_REGEX.test(postcode);
}

/**
 * Validate credit card number (basic format check)
 */
export function isValidCreditCard(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s/g, '');
  return CREDIT_CARD_REGEX.test(cleaned);
}

/**
 * Validate credit card with Luhn algorithm
 */
export function isValidCreditCardLuhn(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!CREDIT_CARD_REGEX.test(cleaned)) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

/**
 * Validate CVV
 */
export function isValidCVV(cvv: string): boolean {
  return CVV_REGEX.test(cvv);
}

/**
 * Validate URL
 */
export function isValidURL(url: string): boolean {
  return URL_REGEX.test(url);
}

/**
 * Validate slug
 */
export function isValidSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug);
}

/**
 * Validate username
 */
export function isValidUsername(username: string): boolean {
  return USERNAME_REGEX.test(username);
}

/**
 * Validate alphanumeric string
 */
export function isAlphanumeric(str: string): boolean {
  return ALPHANUMERIC_REGEX.test(str);
}

/**
 * Validate hex color
 */
export function isValidHexColor(color: string): boolean {
  return HEX_COLOR_REGEX.test(color);
}

/**
 * Validate age (minimum age)
 */
export function isValidAge(birthDate: Date | string, minAge: number = 18): boolean {
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= minAge;
  }
  
  return age >= minAge;
}

/**
 * Validate required field
 */
export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Validate min length
 */
export function hasMinLength(str: string, minLength: number): boolean {
  return str.length >= minLength;
}

/**
 * Validate max length
 */
export function hasMaxLength(str: string, maxLength: number): boolean {
  return str.length <= maxLength;
}

/**
 * Validate range
 */
export function isInRange(num: number, min: number, max: number): boolean {
  return num >= min && num <= max;
}

/**
 * Validate date range
 */
export function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate;
}

/**
 * Validate file type
 */
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

/**
 * Validate file size
 */
export function isValidFileSize(file: File, maxSizeMB: number): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
}

/**
 * Validate image file
 */
export function isValidImage(file: File): boolean {
  return isValidFileType(file, [...VALIDATION.ALLOWED_IMAGE_TYPES]) &&
         isValidFileSize(file, VALIDATION.IMAGE_MAX_SIZE_MB);
}
