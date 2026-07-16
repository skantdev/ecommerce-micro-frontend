/**
 * Utility function for merging class names
 * Handles conditional classes and removes duplicates
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter((cls) => typeof cls === 'string' && cls.length > 0)
    .join(' ')
    .split(' ')
    .filter((cls, index, array) => array.indexOf(cls) === index)
    .join(' ');
}

/**
 * Converts variant and size to CSS class names
 * @example variantClasses('button', { variant: 'primary', size: 'md' })
 */
export function variantClasses(
  baseVariant: string,
  options: Record<string, string | undefined>
): string {
  return Object.entries(options)
    .filter(([, value]) => value)
    .map(([, value]) => `${baseVariant}-${value}`)
    .join(' ');
}

/**
 * Safely merge styles object
 */
export function mergeStyles(
  ...styles: (React.CSSProperties | undefined | null)[]
): React.CSSProperties {
  return Object.assign({}, ...styles.filter(Boolean));
}
