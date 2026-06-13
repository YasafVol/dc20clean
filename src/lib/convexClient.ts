import { ConvexReactClient } from 'convex/react';

let convexClient: ConvexReactClient | null = null;

export function isConvexEnabled(): boolean {
	return import.meta.env.VITE_USE_CONVEX === 'true';
}

export function getOptionalConvexClient(): ConvexReactClient | null {
	if (!isConvexEnabled()) return null;
	return getConvexClient();
}

export function getConvexClient(): ConvexReactClient {
	const convexUrl = import.meta.env.VITE_CONVEX_URL;
	if (!convexUrl) {
		throw new Error('VITE_CONVEX_URL is required when VITE_USE_CONVEX=true.');
	}
	if (!convexClient) {
		convexClient = new ConvexReactClient(convexUrl);
	}
	return convexClient;
}

export function resetConvexClientForTests(): void {
	convexClient = null;
}
