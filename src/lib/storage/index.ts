/**
 * Character Storage - Main Export
 *
 * This module provides a unified storage interface that automatically
 * selects the appropriate backend (localStorage or Convex) based on
 * configuration.
 */

export type {
	CharacterStorage,
	CharacterStorageWithEvents,
	StorageEventType,
	StorageEvent,
	StorageEventListener,
	StorageProvider,
} from './characterStorage';

export { getStorageProvider } from './characterStorage';
export { getLocalStorageAdapter, localStorageAdapter } from './localStorageAdapter';
export { getConvexStorageAdapter, convexStorageAdapter } from './convexStorageAdapter';

import type { CharacterStorageWithEvents } from './characterStorage';
import { getStorageProvider } from './characterStorage';
import { getLocalStorageAdapter } from './localStorageAdapter';
import { getConvexStorageAdapter } from './convexStorageAdapter';

/**
 * Get the appropriate storage adapter based on configuration
 *
 * Uses VITE_USE_CONVEX environment variable to determine which backend to use.
 * Defaults to localStorage if not configured.
 */
export function getStorageAdapter(): CharacterStorageWithEvents {
	const provider = getStorageProvider();

	switch (provider) {
		case 'convex':
			return getConvexStorageAdapter();
		case 'localStorage':
		default:
			return getLocalStorageAdapter();
	}
}

/**
 * Default storage adapter (singleton)
 */
let defaultAdapter: CharacterStorageWithEvents | null = null;

/**
 * Get the default storage adapter (cached singleton)
 */
export function getDefaultStorage(): CharacterStorageWithEvents {
	if (!defaultAdapter) {
		defaultAdapter = getStorageAdapter();
	}
	return defaultAdapter;
}

/**
 * Reset the default storage adapter (useful for testing or switching backends)
 */
export function resetDefaultStorage(): void {
	defaultAdapter = null;
}
