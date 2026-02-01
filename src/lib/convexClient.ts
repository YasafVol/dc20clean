import { ConvexReactClient } from 'convex/react';

let convexClient: ConvexReactClient | null = null;

export function getConvexClient(): ConvexReactClient {
	const convexUrl = import.meta.env.VITE_CONVEX_URL;

	if (!convexUrl) {
		throw new Error('VITE_CONVEX_URL is required to use Convex. Set VITE_USE_CONVEX=false to use localStorage instead.');
	}

	if (!convexClient) {
		convexClient = new ConvexReactClient(convexUrl);
	}

	return convexClient;
}
