import React from 'react';
import { clsx } from 'clsx';

export function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-gray-200 bg-white shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
