/**
 * Convex Monster CRUD Functions (DM Tools)
 *
 * Handles all monster persistence operations including:
 * - Basic CRUD (create, read, update, delete)
 * - Soft delete with trash/restore
 * - Fork tracking for homebrew
 * - Approval workflow for community sharing
 */

import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

// ============================================================================
// QUERIES
// ============================================================================

/**
 * List all monsters for the authenticated user (excluding deleted) + official monsters
 */
export const list = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);

		// Always include official monsters (available to everyone)
		const officialMonsters = await ctx.db
			.query('monsters')
			.withIndex('by_official', (q) => q.eq('isOfficial', true))
			.filter((q) => q.eq(q.field('deletedAt'), undefined))
			.collect();

		// If authenticated, also include user's own monsters
		let userMonsters: typeof officialMonsters = [];
		if (userId) {
			userMonsters = await ctx.db
				.query('monsters')
				.withIndex('by_user', (q) => q.eq('userId', userId))
				.filter((q) =>
					q.and(
						q.eq(q.field('deletedAt'), undefined),
						q.neq(q.field('isOfficial'), true) // Don't double-count official
					)
				)
				.collect();
		}

		return [...officialMonsters, ...userMonsters];
	},
});

/**
 * List only official monsters (Bestiary)
 */
export const listOfficial = query({
	args: {
		level: v.optional(v.number()),
		tier: v.optional(
			v.union(v.literal('standard'), v.literal('apex'), v.literal('legendary'))
		),
		roleId: v.optional(v.string()),
		monsterType: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		let query = ctx.db
			.query('monsters')
			.withIndex('by_official', (q) => q.eq('isOfficial', true))
			.filter((q) => q.eq(q.field('deletedAt'), undefined));

		// Apply filters
		if (args.level !== undefined) {
			query = query.filter((q) => q.eq(q.field('level'), args.level));
		}
		if (args.tier !== undefined) {
			query = query.filter((q) => q.eq(q.field('tier'), args.tier));
		}
		if (args.roleId !== undefined) {
			query = query.filter((q) => q.eq(q.field('roleId'), args.roleId));
		}
		if (args.monsterType !== undefined) {
			query = query.filter((q) => q.eq(q.field('monsterType'), args.monsterType));
		}

		return await query.collect();
	},
});

/**
 * Get a single monster by ID (official, user's own, or approved homebrew)
 */
export const getById = query({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);

		// Check for official monster first (available to everyone)
		const officialMonster = await ctx.db
			.query('monsters')
			.filter((q) =>
				q.and(q.eq(q.field('id'), args.id), q.eq(q.field('isOfficial'), true))
			)
			.first();

		if (officialMonster) {
			return officialMonster;
		}

		// Try to find user's own monster
		if (userId) {
			const ownMonster = await ctx.db
				.query('monsters')
				.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
				.first();

			if (ownMonster) {
				return ownMonster;
			}
		}

		// Check for approved homebrew (public)
		const monsters = await ctx.db
			.query('monsters')
			.filter((q) =>
				q.and(q.eq(q.field('id'), args.id), q.eq(q.field('approvalStatus'), 'approved'))
			)
			.first();

		return monsters ?? null;
	},
});

/**
 * List approved homebrew monsters (public library)
 */
export const listHomebrew = query({
	args: {
		level: v.optional(v.number()),
		tier: v.optional(
			v.union(v.literal('standard'), v.literal('apex'), v.literal('legendary'))
		),
		roleId: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		let query = ctx.db
			.query('monsters')
			.withIndex('by_approval_status', (q) => q.eq('approvalStatus', 'approved'));

		// Apply filters
		if (args.level !== undefined) {
			query = query.filter((q) => q.eq(q.field('level'), args.level));
		}
		if (args.tier !== undefined) {
			query = query.filter((q) => q.eq(q.field('tier'), args.tier));
		}
		if (args.roleId !== undefined) {
			query = query.filter((q) => q.eq(q.field('roleId'), args.roleId));
		}

		const monsters = await query.collect();
		return monsters;
	},
});

/**
 * List deleted monsters for the authenticated user (trash)
 */
export const listTrash = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return [];
		}

		const monsters = await ctx.db
			.query('monsters')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.filter((q) => q.neq(q.field('deletedAt'), undefined))
			.collect();

		return monsters;
	},
});

// ============================================================================
// MUTATIONS
// ============================================================================

/**
 * Create a new monster
 */
export const create = mutation({
	args: {
		monster: v.any(), // Full SavedMonster object (minus userId)
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const now = new Date().toISOString();
		if (!args.monster?.id) {
			throw new Error('Monster id is required');
		}

		const monsterId = await ctx.db.insert('monsters', {
			...args.monster,
			userId,
			createdAt: now,
			lastModified: now,
		});

		return monsterId;
	},
});

/**
 * Update an existing monster
 */
export const update = mutation({
	args: {
		id: v.string(),
		updates: v.any(), // Partial<SavedMonster>
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('monsters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Monster not found or access denied');
		}

		// Cannot update approved homebrew (must fork instead)
		if (existing.approvalStatus === 'approved' && existing.isHomebrew) {
			throw new Error('Cannot modify approved homebrew. Fork it to create your own copy.');
		}

		await ctx.db.patch(existing._id, {
			...args.updates,
			lastModified: new Date().toISOString(),
		});

		return existing._id;
	},
});

/**
 * Soft delete a monster (move to trash)
 */
export const softDelete = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('monsters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Monster not found or access denied');
		}

		const now = new Date().toISOString();
		// Schedule purge for 30 days from now
		const purgeDate = new Date();
		purgeDate.setDate(purgeDate.getDate() + 30);

		await ctx.db.patch(existing._id, {
			deletedAt: now,
			deletedBy: userId,
			scheduledPurgeAt: purgeDate.toISOString(),
			lastModified: now,
		});

		return { success: true };
	},
});

/**
 * Restore a monster from trash
 */
export const restore = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('monsters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Monster not found or access denied');
		}

		if (!existing.deletedAt) {
			throw new Error('Monster is not in trash');
		}

		await ctx.db.patch(existing._id, {
			deletedAt: undefined,
			deletedBy: undefined,
			scheduledPurgeAt: undefined,
			lastModified: new Date().toISOString(),
		});

		return { success: true };
	},
});

/**
 * Permanently delete a monster (hard delete)
 */
export const hardDelete = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('monsters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Monster not found or access denied');
		}

		await ctx.db.delete(existing._id);

		return { success: true };
	},
});

/**
 * Fork a monster (create a copy with fork tracking)
 * Works for official monsters, user monsters, and homebrew
 */
export const fork = mutation({
	args: {
		sourceId: v.string(),
		sourceType: v.union(v.literal('official'), v.literal('custom'), v.literal('homebrew')),
		sourceData: v.optional(v.any()), // Optional - will fetch from DB if not provided
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const now = new Date().toISOString();
		const newId = `mon_${crypto.randomUUID()}`;

		// Get source monster data (from DB or provided data)
		let sourceMonster = args.sourceData;
		let sourceName = sourceMonster?.name ?? 'Unknown';
		let sourceUserId: string | undefined;

		// Try to get from DB (works for official, custom, and homebrew)
		const dbMonster = await ctx.db
			.query('monsters')
			.filter((q) => q.eq(q.field('id'), args.sourceId))
			.first();

		if (dbMonster) {
			sourceMonster = dbMonster;
			sourceName = dbMonster.name;
			sourceUserId = dbMonster.userId ?? undefined;

			// Update fork stats on source (only for non-official)
			if (!dbMonster.isOfficial) {
				await ctx.db.patch(dbMonster._id, {
					forkStats: {
						forkCount: (dbMonster.forkStats?.forkCount ?? 0) + 1,
						lastForkedAt: now,
					},
				});
			}
		}

		if (!sourceMonster) {
			throw new Error('Source monster not found');
		}

		// Create the forked monster (remove isOfficial flag!)
		const { _id, _creationTime, isOfficial, ...monsterData } = sourceMonster;

		const forkedMonster = {
			...monsterData,
			id: newId,
			userId,
			isOfficial: false, // Forked monsters are never official
			name: `${sourceName} (Fork)`,
			visibility: 'private',
			approvalStatus: 'draft',
			isHomebrew: false,
			forkedFrom: {
				id: args.sourceId,
				type: args.sourceType,
				name: sourceName,
				userId: sourceUserId,
				forkedAt: now,
			},
			forkStats: undefined,
			deletedAt: undefined,
			deletedBy: undefined,
			scheduledPurgeAt: undefined,
			rejectionReason: undefined,
			submittedAt: undefined,
			approvedAt: undefined,
			approvedBy: undefined,
			createdAt: now,
			lastModified: now,
		};

		const docId = await ctx.db.insert('monsters', forkedMonster);

		return { id: newId, _id: docId };
	},
});

/**
 * Submit a monster for homebrew review
 */
export const submitForReview = mutation({
	args: {
		id: v.string(),
		visibility: v.union(v.literal('public_anonymous'), v.literal('public_credited')),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('monsters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Monster not found or access denied');
		}

		if (existing.approvalStatus === 'pending_review') {
			throw new Error('Monster is already pending review');
		}

		if (existing.approvalStatus === 'approved') {
			throw new Error('Monster is already approved');
		}

		const now = new Date().toISOString();

		await ctx.db.patch(existing._id, {
			visibility: args.visibility,
			approvalStatus: 'pending_review',
			isHomebrew: true,
			submittedAt: now,
			rejectionReason: undefined,
			lastModified: now,
		});

		return { success: true };
	},
});

/**
 * Duplicate a monster (creates a copy with new ID, no fork tracking)
 */
export const duplicate = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('monsters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Monster not found or access denied');
		}

		const now = new Date().toISOString();
		const newId = `mon_${crypto.randomUUID()}`;

		// Create copy without Convex internal fields
		const { _id, _creationTime, ...monsterData } = existing;

		const newMonsterId = await ctx.db.insert('monsters', {
			...monsterData,
			id: newId,
			name: `${existing.name} (Copy)`,
			visibility: 'private',
			approvalStatus: 'draft',
			isHomebrew: false,
			forkedFrom: undefined,
			forkStats: undefined,
			deletedAt: undefined,
			deletedBy: undefined,
			scheduledPurgeAt: undefined,
			rejectionReason: undefined,
			submittedAt: undefined,
			approvedAt: undefined,
			approvedBy: undefined,
			createdAt: now,
			lastModified: now,
		});

		return { id: newId, _id: newMonsterId };
	},
});

/**
 * Bulk seed monsters for a user (for importing sample data to user's collection)
 */
export const seedMonsters = mutation({
	args: {
		monsters: v.array(v.any()), // Array of SavedMonster objects (without userId)
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const now = new Date().toISOString();
		const results: Array<{ id: string; name: string; success: boolean; error?: string }> = [];

		for (const monster of args.monsters) {
			try {
				// Check if monster with same name already exists for this user
				const existing = await ctx.db
					.query('monsters')
					.withIndex('by_user', (q) => q.eq('userId', userId))
					.filter((q) =>
						q.and(
							q.eq(q.field('name'), monster.name),
							q.eq(q.field('deletedAt'), undefined)
						)
					)
					.first();

				if (existing) {
					results.push({
						id: monster.id,
						name: monster.name,
						success: false,
						error: 'Monster with this name already exists',
					});
					continue;
				}

				await ctx.db.insert('monsters', {
					...monster,
					userId,
					isOfficial: false, // User-seeded monsters are not official
					createdAt: now,
					lastModified: now,
				});

				results.push({
					id: monster.id,
					name: monster.name,
					success: true,
				});
			} catch (err) {
				results.push({
					id: monster.id,
					name: monster.name,
					success: false,
					error: err instanceof Error ? err.message : 'Unknown error',
				});
			}
		}

		return results;
	},
});

/**
 * Seed official Bestiary monsters (admin function)
 * These monsters are available to all users and cannot be edited directly
 */
export const seedOfficialMonsters = mutation({
	args: {
		monsters: v.array(v.any()), // Array of SavedMonster objects
	},
	handler: async (ctx, args) => {
		// Note: In production, add admin role check here
		const now = new Date().toISOString();
		const results: Array<{ id: string; name: string; success: boolean; error?: string }> = [];

		for (const monster of args.monsters) {
			try {
				// Check if official monster with same ID already exists
				const existing = await ctx.db
					.query('monsters')
					.filter((q) =>
						q.and(
							q.eq(q.field('id'), monster.id),
							q.eq(q.field('isOfficial'), true)
						)
					)
					.first();

				if (existing) {
					// Update existing official monster
					await ctx.db.patch(existing._id, {
						...monster,
						isOfficial: true,
						userId: undefined, // No owner for official content
						lastModified: now,
					});
					results.push({
						id: monster.id,
						name: monster.name,
						success: true,
						error: 'Updated existing',
					});
					continue;
				}

				// Create new official monster
				await ctx.db.insert('monsters', {
					...monster,
					isOfficial: true,
					userId: undefined, // No owner for official content
					visibility: 'private', // Official monsters don't use visibility
					approvalStatus: 'approved', // Official = auto-approved
					isHomebrew: false,
					createdAt: now,
					lastModified: now,
				});

				results.push({
					id: monster.id,
					name: monster.name,
					success: true,
				});
			} catch (err) {
				results.push({
					id: monster.id,
					name: monster.name,
					success: false,
					error: err instanceof Error ? err.message : 'Unknown error',
				});
			}
		}

		return results;
	},
});

/**
 * Clear all official monsters (admin function for re-seeding)
 */
export const clearOfficialMonsters = mutation({
	args: {},
	handler: async (ctx) => {
		// Note: In production, add admin role check here
		const officialMonsters = await ctx.db
			.query('monsters')
			.withIndex('by_official', (q) => q.eq('isOfficial', true))
			.collect();

		for (const monster of officialMonsters) {
			await ctx.db.delete(monster._id);
		}

		return { deleted: officialMonsters.length };
	},
});
