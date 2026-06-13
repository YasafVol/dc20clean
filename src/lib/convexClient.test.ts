import { afterEach, describe, expect, it, vi } from 'vitest';
import {
	getConvexClient,
	getOptionalConvexClient,
	isConvexEnabled,
	resetConvexClientForTests
} from './convexClient';

describe('Convex client configuration', () => {
	afterEach(() => {
		vi.unstubAllEnvs();
		resetConvexClientForTests();
	});

	it('given localStorage mode without a URL, when loading the app client, then Convex stays disabled', () => {
		vi.stubEnv('VITE_USE_CONVEX', 'false');
		vi.stubEnv('VITE_CONVEX_URL', '');

		expect(isConvexEnabled()).toBe(false);
		expect(getOptionalConvexClient()).toBeNull();
	});

	it('given Convex mode without a URL, when creating the client, then configuration fails clearly', () => {
		vi.stubEnv('VITE_USE_CONVEX', 'true');
		vi.stubEnv('VITE_CONVEX_URL', '');

		expect(() => getConvexClient()).toThrow(
			'VITE_CONVEX_URL is required when VITE_USE_CONVEX=true.'
		);
	});
});
