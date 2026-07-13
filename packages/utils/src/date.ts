/**
 * Date and Time Utilities
 * 
 * Functions for formatting and manipulating dates using date-fns
 */

import { 
  format as dateFnsFormat, 
  formatDistanceToNow,
  parseISO,
  isValid,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  addDays,
  addHours,
  addMinutes,
  startOfDay,
  endOfDay,
  isAfter,
  isBefore,
  isSameDay,
} from 'date-fns';
import { DATE_FORMATS } from '@repo/constants';

/**
 * Format date to specified format
 */
export function formatDate(date: Date | string | number, formatStr: string = DATE_FORMATS.MEDIUM): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  
  if (!isValid(dateObj)) {
    return 'Invalid Date';
  }
  
  return dateFnsFormat(dateObj, formatStr);
}

/**
 * Format date to short format (MM/DD/YYYY)
 */
export function formatDateShort(date: Date | string | number): string {
  return formatDate(date, DATE_FORMATS.SHORT);
}

/**
 * Format date to medium format (MMM DD, YYYY)
 */
export function formatDateMedium(date: Date | string | number): string {
  return formatDate(date, DATE_FORMATS.MEDIUM);
}

/**
 * Format date to long format (MMMM DD, YYYY)
 */
export function formatDateLong(date: Date | string | number): string {
  return formatDate(date, DATE_FORMATS.LONG);
}

/**
 * Format date with time (MMM DD, YYYY HH:mm)
 */
export function formatDateTime(date: Date | string | number): string {
  return formatDate(date, DATE_FORMATS.DATETIME_MEDIUM);
}

/**
 * Format time only (hh:mm A)
 */
export function formatTime(date: Date | string | number): string {
  return formatDate(date, DATE_FORMATS.TIME_12H);
}

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 */
export function formatRelativeTime(date: Date | string | number): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  
  if (!isValid(dateObj)) {
    return 'Invalid Date';
  }
  
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  return isSameDay(dateObj, new Date());
}

/**
 * Check if date is in the past
 */
export function isPast(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  return isBefore(dateObj, new Date());
}

/**
 * Check if date is in the future
 */
export function isFuture(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  return isAfter(dateObj, new Date());
}

/**
 * Get days difference between two dates
 */
export function getDaysDifference(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return differenceInDays(d1, d2);
}

/**
 * Get hours difference between two dates
 */
export function getHoursDifference(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return differenceInHours(d1, d2);
}

/**
 * Get minutes difference between two dates
 */
export function getMinutesDifference(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return differenceInMinutes(d1, d2);
}

/**
 * Add days to date
 */
export function addDaysToDate(date: Date | string, days: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return addDays(dateObj, days);
}

/**
 * Add hours to date
 */
export function addHoursToDate(date: Date | string, hours: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return addHours(dateObj, hours);
}

/**
 * Add minutes to date
 */
export function addMinutesToDate(date: Date | string, minutes: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return addMinutes(dateObj, minutes);
}

/**
 * Get start of day (00:00:00)
 */
export function getStartOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return startOfDay(dateObj);
}

/**
 * Get end of day (23:59:59)
 */
export function getEndOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return endOfDay(dateObj);
}

/**
 * Parse ISO string to Date
 */
export function parseDate(dateString: string): Date {
  return parseISO(dateString);
}

/**
 * Check if date is valid
 */
export function isValidDate(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  return isValid(dateObj);
}
