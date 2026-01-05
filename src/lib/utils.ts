import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge.
 * This utility is used by shadcn/ui components for conditional class application.
 *
 * @param inputs - Class values to combine
 * @returns Merged class string
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary', className)
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
