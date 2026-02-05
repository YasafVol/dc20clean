/**
 * Convex Auth configuration - Social Login
 *
 * Uses Google OAuth for authentication.
 * No email/password - social login only for simplicity.
 */

import { convexAuth } from '@convex-dev/auth/server';
import Google from '@auth/core/providers/google';

const authSecret = process.env.AUTH_SECRET;
const siteUrl = process.env.SITE_URL;
if (!authSecret) {
	throw new Error('Missing environment variable `AUTH_SECRET`');
}
if (!siteUrl) {
	throw new Error('Missing environment variable `SITE_URL`');
}

const normalizedSiteUrl = siteUrl.replace(/\/$/, '');
const productionHost = new URL(normalizedSiteUrl).hostname;
const allowedHostSuffix = '.vercel.app';

function isAllowedRedirectHost(hostname: string): boolean {
	return (
		hostname === productionHost ||
		hostname === 'localhost' ||
		hostname === '127.0.0.1' ||
		hostname.endsWith(allowedHostSuffix)
	);
}

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	secret: [authSecret],
	callbacks: {
		async redirect({ redirectTo }) {
			try {
				const url = new URL(redirectTo, normalizedSiteUrl);
				if (isAllowedRedirectHost(url.hostname)) {
					return url.toString();
				}
			} catch {
				// Fall back to SITE_URL below.
			}

			return normalizedSiteUrl;
		}
	},
	providers: [
		// Google OAuth - most users have a Google account
		Google()
	]
});
