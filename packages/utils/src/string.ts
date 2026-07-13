/**
 * String Utilities
 * 
 * Functions for string manipulation and formatting
 */

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Convert string to uppercase
 */
export function uppercase(str: string): string {
  return str.toUpperCase();
}

/**
 * Convert string to lowercase
 */
export function lowercase(str: string): string {
  return str.toLowerCase();
}

/**
 * Truncate string to specified length
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Truncate string to word boundary
 */
export function truncateWords(str: string, maxWords: number, suffix: string = '...'): string {
  if (!str) return '';
  const words = str.split(' ');
  if (words.length <= maxWords) return str;
  return words.slice(0, maxWords).join(' ') + suffix;
}

/**
 * Convert string to URL-friendly slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with single dash
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
}

/**
 * Convert slug to title
 */
export function unslugify(slug: string): string {
  return slug
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Remove extra whitespace
 */
export function normalizeWhitespace(str: string): string {
  return str.trim().replace(/\s+/g, ' ');
}

/**
 * Remove all whitespace
 */
export function removeWhitespace(str: string): string {
  return str.replace(/\s/g, '');
}

/**
 * Check if string is empty or whitespace
 */
export function isEmpty(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
}

/**
 * Check if string contains substring (case-insensitive)
 */
export function containsIgnoreCase(str: string, search: string): boolean {
  return str.toLowerCase().includes(search.toLowerCase());
}

/**
 * Count words in string
 */
export function wordCount(str: string): number {
  if (!str) return 0;
  return str.trim().split(/\s+/).length;
}

/**
 * Extract initials from name
 */
export function getInitials(name: string, maxLength: number = 2): string {
  if (!name) return '';
  
  const words = name.trim().split(/\s+/);
  const initials = words
    .map(word => word.charAt(0).toUpperCase())
    .join('');
  
  return initials.slice(0, maxLength);
}

/**
 * Mask string (e.g., for credit cards, emails)
 */
export function mask(str: string, visibleStart: number = 4, visibleEnd: number = 4, maskChar: string = '*'): string {
  if (!str || str.length <= visibleStart + visibleEnd) return str;
  
  const start = str.slice(0, visibleStart);
  const end = str.slice(-visibleEnd);
  const masked = maskChar.repeat(str.length - visibleStart - visibleEnd);
  
  return start + masked + end;
}

/**
 * Mask email address
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (!domain) return email;
  
  const maskedUsername = mask(username, 2, 0);
  return `${maskedUsername}@${domain}`;
}

/**
 * Mask credit card number
 */
export function maskCreditCard(cardNumber: string): string {
  const cleaned = removeWhitespace(cardNumber);
  return mask(cleaned, 4, 4);
}

/**
 * Format credit card number (add spaces)
 */
export function formatCreditCard(cardNumber: string): string {
  const cleaned = removeWhitespace(cardNumber);
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
}

/**
 * Format phone number (US format)
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = removeWhitespace(phone).replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
}

/**
 * Generate random string
 */
export function randomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Pluralize word based on count
 */
export function pluralize(word: string, count: number, plural?: string): string {
  if (count === 1) return word;
  return plural || `${word}s`;
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  
  return str.replace(/[&<>"']/g, char => htmlEscapes[char]);
}

/**
 * Strip HTML tags
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}
