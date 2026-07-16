import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * Table columns
   */
  columns: Array<{
    key: string;
    header: ReactNode;
    width?: string;
    align?: 'left' | 'center' | 'right';
  }>;

  /**
   * Table rows
   */
  rows: Array<{
    id: string | number;
    [key: string]: ReactNode;
  }>;

  /**
   * Show striped rows
   */
  striped?: boolean;

  /**
   * Show hover effect
   */
  hoverable?: boolean;

  /**
   * Table size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show border
   */
  bordered?: boolean;
}

/**
 * Table Component
 *
 * Data table component with columns and rows.
 *
 * @example
 * ```tsx
 * <Table
 *   columns={[
 *     { key: 'name', header: 'Name' },
 *     { key: 'email', header: 'Email' },
 *   ]}
 *   rows={[
 *     { id: 1, name: 'John', email: 'john@example.com' },
 *   ]}
 * />
 * ```
 */
export const Table: FC<TableProps> = ({
  columns,
  rows,
  striped = false,
  hoverable = true,
  size = 'md',
  bordered = true,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
      <table
        className={cn('w-full border-collapse', className)}
        {...props}
      >
        <thead className="bg-neutral-50 dark:bg-neutral-900 border-b-2 border-neutral-200 dark:border-neutral-700">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  sizeStyles[size],
                  alignStyles[column.align || 'left'],
                  'font-semibold text-neutral-900 dark:text-neutral-100'
                )}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={cn(
                'border-b border-neutral-200 dark:border-neutral-700 transition-smooth',
                striped && rowIndex % 2 === 1 && 'bg-neutral-50 dark:bg-neutral-900',
                hoverable && 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              )}
            >
              {columns.map((column) => (
                <td
                  key={`${row.id}-${column.key}`}
                  className={cn(sizeStyles[size], alignStyles[column.align || 'left'])}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
