/**
 * Storage Utilities
 * 
 * Type-safe wrappers for localStorage and sessionStorage
 */

/**
 * Get item from localStorage
 */
export function getLocalStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting localStorage item "${key}":`, error);
    return null;
  }
}

/**
 * Set item in localStorage
 */
export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage item "${key}":`, error);
  }
}

/**
 * Remove item from localStorage
 */
export function removeLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage item "${key}":`, error);
  }
}

/**
 * Clear all localStorage
 */
export function clearLocalStorage(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

/**
 * Check if key exists in localStorage
 */
export function hasLocalStorageKey(key: string): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(key) !== null;
}

/**
 * Get item from sessionStorage
 */
export function getSessionStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting sessionStorage item "${key}":`, error);
    return null;
  }
}

/**
 * Set item in sessionStorage
 */
export function setSessionStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting sessionStorage item "${key}":`, error);
  }
}

/**
 * Remove item from sessionStorage
 */
export function removeSessionStorage(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing sessionStorage item "${key}":`, error);
  }
}

/**
 * Clear all sessionStorage
 */
export function clearSessionStorage(): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
  }
}

/**
 * Check if key exists in sessionStorage
 */
export function hasSessionStorageKey(key: string): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(key) !== null;
}

/**
 * Get storage size in bytes
 */
export function getStorageSize(storage: Storage): number {
  let size = 0;
  
  for (const key in storage) {
    if (storage.hasOwnProperty(key)) {
      size += key.length + storage.getItem(key)!.length;
    }
  }
  
  return size;
}

/**
 * Get localStorage size
 */
export function getLocalStorageSize(): number {
  if (typeof window === 'undefined') return 0;
  return getStorageSize(localStorage);
}

/**
 * Get sessionStorage size
 */
export function getSessionStorageSize(): number {
  if (typeof window === 'undefined') return 0;
  return getStorageSize(sessionStorage);
}
