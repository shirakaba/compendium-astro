import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

// Any changes saved to a React CSR component will apply via HMR (if possible).
export function Client({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <h1 className={twMerge('text-4xl', className)}>{children}</h1>;
}
