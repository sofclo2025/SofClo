import React from 'react';
import { clsx } from 'clsx';

export function Button({ children, className, size = 'md', ...props }) {
  return (
    <button
      className={clsx(
        'rounded-md font-semibold transition-colors',
        {
          'px-4 py-2 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
