/**
 * Number Utilities
 * 
 * Functions for number manipulation and operations
 */

/**
 * Clamp number between min and max
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Generate random number between min and max
 */
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(random(min, max + 1));
}

/**
 * Round number to specified decimal places
 */
export function round(num: number, decimals: number = 0): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(num * multiplier) / multiplier;
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number, decimals: number = 0): string {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format percentage
 */
export function formatPercentage(num: number, decimals: number = 1): string {
  return `${round(num, decimals)}%`;
}

/**
 * Convert bytes to human-readable size
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${round(bytes / Math.pow(k, i), decimals)} ${sizes[i]}`;
}

/**
 * Check if number is even
 */
export function isEven(num: number): boolean {
  return num % 2 === 0;
}

/**
 * Check if number is odd
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0;
}

/**
 * Check if number is integer
 */
export function isInteger(num: number): boolean {
  return Number.isInteger(num);
}

/**
 * Check if number is float
 */
export function isFloat(num: number): boolean {
  return !Number.isInteger(num);
}

/**
 * Check if number is positive
 */
export function isPositive(num: number): boolean {
  return num > 0;
}

/**
 * Check if number is negative
 */
export function isNegative(num: number): boolean {
  return num < 0;
}

/**
 * Get absolute value
 */
export function abs(num: number): number {
  return Math.abs(num);
}

/**
 * Calculate percentage of total
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Calculate percentage change
 */
export function percentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Lerp (linear interpolation) between two numbers
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Map number from one range to another
 */
export function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Calculate average (mean)
 */
export function mean(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

/**
 * Calculate median
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  
  return sorted[mid];
}

/**
 * Calculate mode (most frequent number)
 */
export function mode(numbers: number[]): number {
  const frequency: Record<number, number> = {};
  let maxFreq = 0;
  let modeValue = numbers[0];
  
  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
      modeValue = num;
    }
  });
  
  return modeValue;
}

/**
 * Calculate standard deviation
 */
export function standardDeviation(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  
  const avg = mean(numbers);
  const squareDiffs = numbers.map(num => Math.pow(num - avg, 2));
  const avgSquareDiff = mean(squareDiffs);
  
  return Math.sqrt(avgSquareDiff);
}

/**
 * Safe divide (avoid division by zero)
 */
export function safeDivide(numerator: number, denominator: number, fallback: number = 0): number {
  return denominator === 0 ? fallback : numerator / denominator;
}
