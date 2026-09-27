import { getAuthUserId } from '@convex-dev/auth/server';
import { ConvexError } from 'convex/values';
import type { QueryCtx } from '../_generated/server';

// Server-owned identities. Never accept an email or access flag from the client.
const REVIEWER_EMAILS = new Set(['yasaf.vol@gmail.com', 'nzinger@gmail.com']);

export async function hasBackOfficeAccess(ctx: QueryCtx): Promise<boolean> {
	const userId = await getAuthUserId(ctx);
	if (!userId) return false;
	const user = await ctx.db.get(userId);
	return Boolean(
		user?.emailVerificationTime && user.email && REVIEWER_EMAILS.has(user.email.toLowerCase())
	);
}

export async function requireBackOfficeAccess(ctx: QueryCtx): Promise<void> {
	if (!(await hasBackOfficeAccess(ctx))) {
		throw new ConvexError('Back office access is restricted.');
	}
}
