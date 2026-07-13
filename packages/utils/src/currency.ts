/**
 * Currency Utilities
 * 
 * Functions for formatting and manipulating currency values
 * Note: All prices are stored in cents to avoid floating-point precision issues
 */

import { CURRENCY_CODES, CURRENCY_SYMBOLS, NUMBER_FORMATS } from '@repo/constants';
import type { Money } from '@repo/types';

/**
 * Format cents to currency string
 * @param cents - Amount in cents
 * @param currency - Currency code (default: USD)
 * @param showSymbol - Show currency symbol (default: true)
 */
export function formatCurrency(
  cents: number,
  currency: string = CURRENCY_CODES.USD,
  showSymbol: boolean = true
): string {
  const amount = cents / 100;
  const symbol = CURRENCY_SYMBOLS[currency] || CURRENCY_SYMBOLS.USD;
  
  const formatted = amount.toFixed(NUMBER_FORMATS.CURRENCY_DECIMALS);
  
  if (showSymbol) {
    return `${symbol}${formatted}`;
  }
  
  return formatted;
}

/**
 * Format Money (cents) to currency string
 * Alias for formatCurrency with default USD currency
 */
export function formatMoney(
  cents: Money,
  currency: string = 'USD',
  showSymbol: boolean = true
): string {
  return formatCurrency(cents, currency, showSymbol);
}

/**
 * Parse currency string to cents
 * @param value - Currency string (e.g., "$19.99", "19.99")
 */
export function parseCurrency(value: string): number {
  // Remove currency symbols and whitespace
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const amount = parseFloat(cleaned);
  
  if (isNaN(amount)) {
    return 0;
  }
  
  // Convert to cents
  return Math.round(amount * 100);
}

/**
 * Add two currency amounts
 */
export function addCurrency(cents1: number, cents2: number): number {
  return cents1 + cents2;
}

/**
 * Subtract currency amounts
 */
export function subtractCurrency(cents1: number, cents2: number): number {
  return cents1 - cents2;
}

/**
 * Multiply currency by factor
 */
export function multiplyCurrency(cents: number, factor: number): number {
  return Math.round(cents * factor);
}

/**
 * Divide currency by divisor
 */
export function divideCurrency(cents: number, divisor: number): number {
  return Math.round(cents / divisor);
}

/**
 * Calculate percentage of amount
 */
export function calculatePercentage(cents: number, percentage: number): number {
  return Math.round((cents * percentage) / 100);
}

/**
 * Apply discount to amount
 */
export function applyDiscount(cents: number, discountPercent: number): number {
  const discount = calculatePercentage(cents, discountPercent);
  return cents - discount;
}

/**
 * Calculate tax
 */
export function calculateTax(cents: number, taxRate: number): number {
  return calculatePercentage(cents, taxRate);
}

/**
 * Format price with tax
 */
export function formatPriceWithTax(
  cents: number,
  taxRate: number,
  currency: string = CURRENCY_CODES.USD
): { subtotal: string; tax: string; total: string } {
  const tax = calculateTax(cents, taxRate);
  const total = cents + tax;
  
  return {
    subtotal: formatCurrency(cents, currency),
    tax: formatCurrency(tax, currency),
    total: formatCurrency(total, currency),
  };
}

/**
 * Compare two currency amounts
 */
export function compareCurrency(cents1: number, cents2: number): -1 | 0 | 1 {
  if (cents1 < cents2) return -1;
  if (cents1 > cents2) return 1;
  return 0;
}

/**
 * Check if amount is zero
 */
export function isZero(cents: number): boolean {
  return cents === 0;
}

/**
 * Check if amount is positive
 */
export function isPositive(cents: number): boolean {
  return cents > 0;
}

/**
 * Check if amount is negative
 */
export function isNegative(cents: number): boolean {
  return cents < 0;
}

/**
 * Get absolute value
 */
export function absoluteValue(cents: number): number {
  return Math.abs(cents);
}

/**
 * Round to nearest cent
 */
export function roundCurrency(cents: number): number {
  return Math.round(cents);
}
