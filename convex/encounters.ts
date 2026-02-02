/**
 * Encounter Convex Functions
 *
 * Queries and mutations for encounter management.
 */

import { v } from 'convex/values';
import { query, mutation } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

// ============================================================================
// QUERIES
// ============================================================================

/**
 * List user's encounters (excluding soft-deleted)
 */
export const list = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return [];

		const encounters = await ctx.db
			.query('encounters')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.filter((q) => q.eq(q.field('deletedAt'), undefined))
			.collect();

		return encounters;
	}
});

/**
 * Get a single encounter by ID
 */
export const getById = query({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return null;

		const encounter = await ctx.db
			.query('encounters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		return encounter;
	}
});

/**
 * List approved homebrew encounters (public)
 */
export const listHomebrew = query({
	args: {},
	handler: async (ctx) => {
		const encounters = await ctx.db
			.query('encounters')
			.withIndex('by_approval_status', (q) => q.eq('approvalStatus', 'approved'))
			.filter((q) =>
				q.and(q.eq(q.field('isHomebrew'), true), q.eq(q.field('deletedAt'), undefined))
			)
			.collect();

		return encounters;
	}
});

/**
 * List user's deleted encounters (trash)
 */
export const listTrash = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return [];

		const encounters = await ctx.db
			.query('encounters')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.filter((q) => q.neq(q.field('deletedAt'), undefined))
			.collect();

		return encounters;
	}
});

// ============================================================================
// MUTATIONS
// ============================================================================

/**
 * Create a new encounter
 */
export const create = mutation({
	args: {
		encounter: v.object({
			id: v.string(),
			name: v.string(),
			description: v.optional(v.string()),
			party: v.object({
				size: v.number(),
				averageLevel: v.number()
			}),
			difficulty: v.union(
				v.literal('trivial'),
				v.literal('easy'),
				v.literal('medium'),
				v.literal('hard'),
				v.literal('deadly')
			),
			baseBudget: v.number(),
			difficultyModifier: v.number(),
			adjustedBudget: v.number(),
			spentBudget: v.number(),
			remainingBudget: v.number(),
			monsters: v.array(
				v.object({
					id: v.string(),
					monsterId: v.union(v.string(), v.null()),
					quantity: v.number(),
					cost: v.number(),
					notes: v.optional(v.string())
				})
			),
			environment: v.optional(v.string()),
			gmNotes: v.optional(v.string()),
			visibility: v.union(
				v.literal('private'),
				v.literal('public_anonymous'),
				v.literal('public_credited')
			),
			approvalStatus: v.union(
				v.literal('draft'),
				v.literal('pending_review'),
				v.literal('approved'),
				v.literal('rejected')
			),
			isHomebrew: v.boolean(),
			createdAt: v.string(),
			lastModified: v.string(),
			schemaVersion: v.string()
		})
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error('Not authenticated');

		await ctx.db.insert('encounters', {
			...args.encounter,
			userId
		});

		return { id: args.encounter.id };
	}
});

/**
 * Update an existing encounter
 */
export const update = mutation({
	args: {
		id: v.string(),
		updates: v.object({
			name: v.optional(v.string()),
			description: v.optional(v.string()),
			party: v.optional(
				v.object({
					size: v.number(),
					averageLevel: v.number()
				})
			),
			difficulty: v.optional(
				v.union(
					v.literal('trivial'),
					v.literal('easy'),
					v.literal('medium'),
					v.literal('hard'),
					v.literal('deadly')
				)
			),
			baseBudget: v.optional(v.number()),
			difficultyModifier: v.optional(v.number()),
			adjustedBudget: v.optional(v.number()),
			spentBudget: v.optional(v.number()),
			remainingBudget: v.optional(v.number()),
			monsters: v.optional(
				v.array(
					v.object({
						id: v.string(),
						monsterId: v.union(v.string(), v.null()),
						quantity: v.number(),
						cost: v.number(),
						notes: v.optional(v.string())
					})
				)
			),
			environment: v.optional(v.string()),
			gmNotes: v.optional(v.string()),
			visibility: v.optional(
				v.union(v.literal('private'), v.literal('public_anonymous'), v.literal('public_credited'))
			)
		})
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error('Not authenticated');

		const encounter = await ctx.db
			.query('encounters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!encounter) throw new Error('Encounter not found');

		await ctx.db.patch(encounter._id, {
			...args.updates,
			lastModified: new Date().toISOString()
		});

		return { id: args.id };
	}
});

/**
 * Add a monster slot to an encounter
 */
export const addMonsterSlot = mutation({
	args: {
		encounterId: v.string(),
		slot: v.object({
			id: v.string(),
			monsterId: v.union(v.string(), v.null()),
			quantity: v.number(),
			cost: v.number(),
			notes: v.optional(v.string())
		})
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error('Not authenticated');

		const encounter = await ctx.db
			.query('encounters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.encounterId))
			.first();

		if (!encounter) throw new Error('Encounter not found');

		const updatedMonsters = [...encounter.monsters, args.slot];
		const newSpentBudget = updatedMonsters.reduce((sum, m) => sum + m.cost, 0);

		await ctx.db.patch(encounter._id, {
			monsters: updatedMonsters,
			spentBudget: newSpentBudget,
			remainingBudget: encounter.adjustedBudget - newSpentBudget,
			lastModified: new Date().toISOString()
		});

		return { slotId: args.slot.id };
	}
});

/**
 * Update a monster slot
 */
export const updateMonsterSlot = mutation({
	args: {
		encounterId: v.string(),
		slotId: v.string(),
		updates: v.object({
			monsterId: v.optional(v.union(v.string(), v.null())),
			quantity: v.optional(v.number()),
			cost: v.optional(v.number()),
			notes: v.optional(v.string())
		})
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error('Not authenticated');

		const encounter = await ctx.db
			.query('encounters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.encounterId))
			.first();

		if (!encounter) throw new Error('Encounter not found');

		const updatedMonsters = encounter.monsters.map((slot) => {
			if (slot.id !== args.slotId) return slot;
			return { ...slot, ...args.updates };
		});

		const newSpentBudget = updatedMonsters.reduce((sum, m) => sum + m.cost, 0);

		await ctx.db.patch(encounter._id, {
			monsters: updatedMonsters,
			spentBudget: newSpentBudget,
			remainingBudget: encounter.adjustedBudget - newSpentBudget,
			lastModified: new Date().toISOString()
		});
	}
});

/**
 * Remove a monster slot
 */
export const removeMonsterSlot = mutation({
	args: {
		encounterId: v.string(),
		slotId: v.string()
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error('Not authenticated');

		const encounter = await ctx.db
			.query('encounters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.encounterId))
			.first();

		if (!encounter) throw new Error('Encounter not found');

		const updatedMonsters = encounter.monsters.filter((slot) => slot.id !== args.slotId);
		const newSpentBudget = updatedMonsters.reduce((sum, m) => sum + m.cost, 0);

		await ctx.db.patch(encounter._id, {
			monsters: updatedMonsters,
			spentBudget: newSpentBudget,
			remainingBudget: encounter.adjustedBudget - newSpentBudget,
			lastModified: new Date().toISOString()
		});
	}
});

/**
 * Soft delete an encounter
 */
export const softDelete = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error('Not authenticated');

		const encounter = await ctx.db
			.query('encounters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!encounter) throw new Error('Encounter not found');

		const now = new Date();
		const purgeDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

		await ctx.db.patch(encounter._id, {
			deletedAt: now.toISOString(),
			deletedBy: userId,
			scheduledPurgeAt: purgeDate.toISOString(),
			lastModified: now.toISOString()
		});
	}
});

/**
 * Restore an encounter from trash
 */
export const restore = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error('Not authenticated');

		const encounter = await ctx.db
			.query('encounters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!encounter) throw new Error('Encounter not found');

		await ctx.db.patch(encounter._id, {
			deletedAt: undefined,
			deletedBy: undefined,
			scheduledPurgeAt: undefined,
			lastModified: new Date().toISOString()
		});
	}
});

/**
 * Hard delete an encounter (permanent)
 */
export const hardDelete = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error('Not authenticated');

		const encounter = await ctx.db
			.query('encounters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!encounter) throw new Error('Encounter not found');

		await ctx.db.delete(encounter._id);
	}
});

/**
 * Fork an encounter (copy from homebrew)
 */
export const fork = mutation({
	args: {
		sourceId: v.string(),
		sourceType: v.union(v.literal('official'), v.literal('custom'), v.literal('homebrew')),
		sourceData: v.any()
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error('Not authenticated');

		const now = new Date().toISOString();

		// Create new encounter with forked data
		const newEncounter = {
			...args.sourceData,
			userId,
			visibility: 'private' as const,
			approvalStatus: 'draft' as const,
			isHomebrew: false,
			forkedFrom: {
				id: args.sourceId,
				type: args.sourceType,
				name: args.sourceData.name,
				forkedAt: now
			},
			createdAt: now,
			lastModified: now
		};

		await ctx.db.insert('encounters', newEncounter);

		return { id: args.sourceData.id };
	}
});

/**
 * Submit encounter for homebrew review
 */
export const submitForReview = mutation({
	args: {
		id: v.string(),
		visibility: v.union(v.literal('public_anonymous'), v.literal('public_credited'))
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error('Not authenticated');

		const encounter = await ctx.db
			.query('encounters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!encounter) throw new Error('Encounter not found');

		const now = new Date().toISOString();

		await ctx.db.patch(encounter._id, {
			visibility: args.visibility,
			approvalStatus: 'pending_review',
			isHomebrew: true,
			submittedAt: now,
			lastModified: now
		});
	}
});

/**
 * Duplicate an encounter
 */
export const duplicate = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error('Not authenticated');

		const encounter = await ctx.db
			.query('encounters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!encounter) throw new Error('Encounter not found');

		const now = new Date().toISOString();
		const newId = `enc_${crypto.randomUUID()}`;

		// Create duplicate
		const duplicate = {
			...encounter,
			_id: undefined,
			id: newId,
			name: `${encounter.name} (Copy)`,
			visibility: 'private' as const,
			approvalStatus: 'draft' as const,
			isHomebrew: false,
			forkedFrom: undefined,
			forkStats: undefined,
			deletedAt: undefined,
			deletedBy: undefined,
			scheduledPurgeAt: undefined,
			createdAt: now,
			lastModified: now
		};

		// Generate new slot IDs
		duplicate.monsters = encounter.monsters.map((slot) => ({
			...slot,
			id: `slot_${crypto.randomUUID()}`
		}));

		await ctx.db.insert('encounters', duplicate as any);

		return { id: newId };
	}
});
