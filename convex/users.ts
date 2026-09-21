/**
 * Convex User Queries
 *
 * Queries for retrieving user information.
 */

import { query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

/**
 * Get the current authenticated user
 */
export const getCurrentUser = query({
	args: {},
	returns: v.union(
		v.null(),
		v.object({
			userId: v.string(),
			name: v.optional(v.string()),
			createdAt: v.number()
		})
	),
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return null;
		const user = await ctx.db.get(userId);
		if (!user) return null;

		const result = {
			userId: userId.toString(),
			createdAt: user._creationTime
		};
		return typeof user.name === 'string' ? { ...result, name: user.name } : result;
	}
});
