import { ConvexReactClient } from 'convex/react';

const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
	throw new Error('VITE_CONVEX_URL is required to use Convex.');
}

const convexClient = new ConvexReactClient(convexUrl);

export function getConvexClient(): ConvexReactClient {
	return convexClient;
}
