/**
 * Convex User Queries
 *
 * Queries for retrieving user information.
 */

import { query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

/**
 * Get the current authenticated user
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    return user ? { userId: userId.toString(), name: (user as any).name as string | undefined } : null;
  },
});
