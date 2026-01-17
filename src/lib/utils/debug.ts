/**
 * Debug utility for controlled console logging
 *
 * In development mode (import.meta.env.DEV), all debug logs are shown.
 * In production mode, debug logs are suppressed unless explicitly enabled.
 *
 * Usage:
 *   import { debug, debugGroup } from '@/lib/utils/debug';
 *
 *   debug.log('Character', 'Loading character:', characterId);
 *   debug.calculation('Stat calculation:', { stat, value });
 *
 *   debugGroup('Character Load', () => {
 *     debug.log('Character', 'Step 1...');
 *     debug.log('Character', 'Step 2...');
 *   });
 */

type DebugCategory =
	| 'Character'
	| 'Calculation'
	| 'Migration'
	| 'Storage'
	| 'Spells'
	| 'Equipment'
	| 'Loader'
	| 'State'
	| 'PDF'
	| 'UI'
	| 'General';

const CATEGORY_PREFIXES: Record<DebugCategory, string> = {
	Character: '👤',
	Calculation: '🔢',
	Migration: '📦',
	Storage: '💾',
	Spells: '✨',
	Equipment: '⚔️',
	Loader: '📥',
	State: '🔄',
	PDF: '📄',
	UI: '🖥️',
	General: '📋',
};

// Check if we're in development mode
const isDev = import.meta.env.DEV;

// Allow enabling debug in production via localStorage
const isDebugEnabled = (): boolean => {
	if (isDev) return true;
	try {
		return localStorage.getItem('DEBUG_ENABLED') === 'true';
	} catch {
		return false;
	}
};

// Check if a specific category is enabled
const isCategoryEnabled = (category: DebugCategory): boolean => {
	if (!isDebugEnabled()) return false;
	try {
		const disabledCategories = localStorage.getItem('DEBUG_DISABLED_CATEGORIES');
		if (disabledCategories) {
			const disabled = JSON.parse(disabledCategories) as string[];
			return !disabled.includes(category);
		}
	} catch {
		// Ignore localStorage errors
	}
	return true;
};

/**
 * Debug logging utility
 */
export const debug = {
	/**
	 * Log a debug message with a category
	 */
	log: (category: DebugCategory, ...args: unknown[]): void => {
		if (!isCategoryEnabled(category)) return;
		const prefix = CATEGORY_PREFIXES[category];
		console.log(`${prefix} [${category}]`, ...args);
	},

	/**
	 * Log a warning (always shown in dev, respects debug flag in prod)
	 */
	warn: (category: DebugCategory, ...args: unknown[]): void => {
		if (!isCategoryEnabled(category)) return;
		const prefix = CATEGORY_PREFIXES[category];
		console.warn(`${prefix} [${category}]`, ...args);
	},

	/**
	 * Log an error (always shown)
	 */
	error: (category: DebugCategory, ...args: unknown[]): void => {
		const prefix = CATEGORY_PREFIXES[category];
		console.error(`${prefix} [${category}]`, ...args);
	},

	/**
	 * Log a table (useful for data inspection)
	 */
	table: (category: DebugCategory, data: unknown, columns?: string[]): void => {
		if (!isCategoryEnabled(category)) return;
		const prefix = CATEGORY_PREFIXES[category];
		console.log(`${prefix} [${category}] Table:`);
		console.table(data, columns);
	},

	// Convenience methods for common categories
	character: (...args: unknown[]) => debug.log('Character', ...args),
	calculation: (...args: unknown[]) => debug.log('Calculation', ...args),
	migration: (...args: unknown[]) => debug.log('Migration', ...args),
	storage: (...args: unknown[]) => debug.log('Storage', ...args),
	spells: (...args: unknown[]) => debug.log('Spells', ...args),
	equipment: (...args: unknown[]) => debug.log('Equipment', ...args),
	loader: (...args: unknown[]) => debug.log('Loader', ...args),
	state: (...args: unknown[]) => debug.log('State', ...args),
	pdf: (...args: unknown[]) => debug.log('PDF', ...args),
	ui: (...args: unknown[]) => debug.log('UI', ...args),
};

/**
 * Create a debug group (collapsed in console)
 */
export const debugGroup = (
	label: string,
	fn: () => void,
	category: DebugCategory = 'General'
): void => {
	if (!isCategoryEnabled(category)) {
		fn();
		return;
	}
	const prefix = CATEGORY_PREFIXES[category];
	console.groupCollapsed(`${prefix} [${category}] ${label}`);
	try {
		fn();
	} finally {
		console.groupEnd();
	}
};

/**
 * Debug utilities for localStorage management
 */
export const debugConfig = {
	/**
	 * Enable debug logging (useful in production)
	 */
	enable: (): void => {
		localStorage.setItem('DEBUG_ENABLED', 'true');
		console.log('🔧 Debug logging enabled');
	},

	/**
	 * Disable debug logging
	 */
	disable: (): void => {
		localStorage.removeItem('DEBUG_ENABLED');
		console.log('🔧 Debug logging disabled');
	},

	/**
	 * Disable specific categories
	 */
	disableCategories: (categories: DebugCategory[]): void => {
		localStorage.setItem('DEBUG_DISABLED_CATEGORIES', JSON.stringify(categories));
		console.log('🔧 Disabled categories:', categories);
	},

	/**
	 * Enable all categories
	 */
	enableAllCategories: (): void => {
		localStorage.removeItem('DEBUG_DISABLED_CATEGORIES');
		console.log('🔧 All debug categories enabled');
	},

	/**
	 * Show current debug configuration
	 */
	status: (): void => {
		console.log('🔧 Debug Configuration:');
		console.log('  - Development mode:', isDev);
		console.log('  - Debug enabled:', isDebugEnabled());
		try {
			const disabled = localStorage.getItem('DEBUG_DISABLED_CATEGORIES');
			console.log('  - Disabled categories:', disabled ? JSON.parse(disabled) : 'none');
		} catch {
			console.log('  - Disabled categories: none');
		}
	},
};

// Expose debugConfig to window for easy access in browser console
if (typeof window !== 'undefined') {
	(window as unknown as Record<string, unknown>).debugConfig = debugConfig;
}

export default debug;
