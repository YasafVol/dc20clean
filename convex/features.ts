/**
 * Convex Feature CRUD Functions (DM Tools)
 *
 * Handles monster feature persistence including:
 * - Official Bestiary features (isOfficial: true)
 * - User-created custom features (isOfficial: false)
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
 * List all features: official + user's custom (excluding deleted)
 */
export const list = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);

		// Always include official features (available to everyone)
		const officialFeatures = await ctx.db
			.query('features')
			.withIndex('by_official', (q) => q.eq('isOfficial', true))
			.filter((q) => q.eq(q.field('deletedAt'), undefined))
			.collect();

		// If authenticated, also include user's custom features
		let userFeatures: typeof officialFeatures = [];
		if (userId) {
			userFeatures = await ctx.db
				.query('features')
				.withIndex('by_user', (q) => q.eq('userId', userId))
				.filter((q) =>
					q.and(
						q.eq(q.field('deletedAt'), undefined),
						q.neq(q.field('isOfficial'), true) // Don't double-count official
					)
				)
				.collect();
		}

		return [...officialFeatures, ...userFeatures];
	},
});

/**
 * List only official features (Bestiary)
 */
export const listOfficial = query({
	args: {
		pointCost: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		let query = ctx.db
			.query('features')
			.withIndex('by_official', (q) => q.eq('isOfficial', true))
			.filter((q) => q.eq(q.field('deletedAt'), undefined));

		if (args.pointCost !== undefined) {
			query = query.filter((q) => q.eq(q.field('pointCost'), args.pointCost));
		}

		return await query.collect();
	},
});

/**
 * Get a single feature by ID (official, user's own, or approved homebrew)
 */
export const getById = query({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);

		// Check for official feature first
		const officialFeature = await ctx.db
			.query('features')
			.filter((q) =>
				q.and(q.eq(q.field('id'), args.id), q.eq(q.field('isOfficial'), true))
			)
			.first();

		if (officialFeature) {
			return officialFeature;
		}

		// Try to find user's own feature
		if (userId) {
			const ownFeature = await ctx.db
				.query('features')
				.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
				.first();

			if (ownFeature) {
				return ownFeature;
			}
		}

		// Check for approved homebrew (public)
		const feature = await ctx.db
			.query('features')
			.filter((q) =>
				q.and(q.eq(q.field('id'), args.id), q.eq(q.field('approvalStatus'), 'approved'))
			)
			.first();

		return feature ?? null;
	},
});

/**
 * List approved homebrew features (public library)
 */
export const listHomebrew = query({
	args: {
		pointCost: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		let query = ctx.db
			.query('features')
			.withIndex('by_approval_status', (q) => q.eq('approvalStatus', 'approved'))
			.filter((q) => q.neq(q.field('isOfficial'), true)); // Exclude official

		if (args.pointCost !== undefined) {
			query = query.filter((q) => q.eq(q.field('pointCost'), args.pointCost));
		}

		return await query.collect();
	},
});

/**
 * List deleted features for the authenticated user (trash)
 */
export const listTrash = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return [];
		}

		const features = await ctx.db
			.query('features')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.filter((q) => q.neq(q.field('deletedAt'), undefined))
			.collect();

		return features;
	},
});

// ============================================================================
// MUTATIONS
// ============================================================================

/**
 * Create a new custom feature
 */
export const create = mutation({
	args: {
		feature: v.object({
			id: v.string(),
			name: v.string(),
			description: v.string(),
			pointCost: v.number(),
			effects: v.optional(v.array(v.any())),
		}),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const now = new Date().toISOString();

		const featureId = await ctx.db.insert('features', {
			...args.feature,
			userId,
			isOfficial: false, // Custom features are never official
			visibility: 'private',
			approvalStatus: 'draft',
			isHomebrew: false,
			createdAt: now,
			lastModified: now,
			schemaVersion: '1.0.0',
		});

		return featureId;
	},
});

/**
 * Update an existing custom feature
 */
export const update = mutation({
	args: {
		id: v.string(),
		updates: v.object({
			name: v.optional(v.string()),
			description: v.optional(v.string()),
			pointCost: v.optional(v.number()),
			effects: v.optional(v.array(v.any())),
		}),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('features')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Feature not found or access denied');
		}

		// Cannot update official features
		if (existing.isOfficial) {
			throw new Error('Cannot modify official features. Fork it to create your own copy.');
		}

		// Cannot update approved homebrew
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
 * Soft delete a custom feature (move to trash)
 */
export const softDelete = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('features')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Feature not found or access denied');
		}

		if (existing.isOfficial) {
			throw new Error('Cannot delete official features');
		}

		const now = new Date().toISOString();
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
 * Restore a custom feature from trash
 */
export const restore = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('features')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Feature not found or access denied');
		}

		if (!existing.deletedAt) {
			throw new Error('Feature is not in trash');
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
 * Permanently delete a custom feature
 */
export const hardDelete = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('features')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Feature not found or access denied');
		}

		if (existing.isOfficial) {
			throw new Error('Cannot delete official features');
		}

		await ctx.db.delete(existing._id);

		return { success: true };
	},
});

/**
 * Fork a feature (create a copy with fork tracking)
 * Works for official features, user features, and homebrew
 */
export const fork = mutation({
	args: {
		sourceId: v.string(),
		sourceType: v.union(v.literal('official'), v.literal('custom'), v.literal('homebrew')),
		sourceData: v.optional(v.any()),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const now = new Date().toISOString();
		const newId = `feat_${crypto.randomUUID()}`;

		// Get source feature from DB
		const dbFeature = await ctx.db
			.query('features')
			.filter((q) => q.eq(q.field('id'), args.sourceId))
			.first();

		let sourceFeature = dbFeature ?? args.sourceData;
		if (!sourceFeature) {
			throw new Error('Source feature not found');
		}

		const sourceName = sourceFeature.name ?? 'Unknown';
		const sourceUserId = dbFeature?.userId ?? undefined;

		// Update fork stats on source (only for non-official)
		if (dbFeature && !dbFeature.isOfficial) {
			await ctx.db.patch(dbFeature._id, {
				forkStats: {
					forkCount: (dbFeature.forkStats?.forkCount ?? 0) + 1,
					lastForkedAt: now,
				},
			});
		}

		// Create the forked feature (remove isOfficial flag!)
		const forkedFeature = {
			id: newId,
			userId,
			name: `${sourceName} (Fork)`,
			description: sourceFeature.description ?? '',
			pointCost: sourceFeature.pointCost ?? 1,
			effects: sourceFeature.effects,
			isOfficial: false, // Forked features are never official
			visibility: 'private' as const,
			approvalStatus: 'draft' as const,
			isHomebrew: false,
			forkedFrom: {
				id: args.sourceId,
				type: args.sourceType,
				name: sourceName,
				userId: sourceUserId,
				forkedAt: now,
			},
			createdAt: now,
			lastModified: now,
			schemaVersion: '1.0.0',
		};

		const docId = await ctx.db.insert('features', forkedFeature);

		return { id: newId, _id: docId };
	},
});

/**
 * Submit a custom feature for homebrew review
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
			.query('features')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Feature not found or access denied');
		}

		if (existing.isOfficial) {
			throw new Error('Cannot submit official features for review');
		}

		if (existing.approvalStatus === 'pending_review') {
			throw new Error('Feature is already pending review');
		}

		if (existing.approvalStatus === 'approved') {
			throw new Error('Feature is already approved');
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
 * Seed official Bestiary features (admin function)
 */
export const seedOfficialFeatures = mutation({
	args: {
		features: v.array(v.any()),
	},
	handler: async (ctx, args) => {
		// Note: In production, add admin role check here
		const now = new Date().toISOString();
		const results: Array<{ id: string; name: string; success: boolean; error?: string }> = [];

		for (const feature of args.features) {
			try {
				// Check if official feature with same ID already exists
				const existing = await ctx.db
					.query('features')
					.filter((q) =>
						q.and(
							q.eq(q.field('id'), feature.id),
							q.eq(q.field('isOfficial'), true)
						)
					)
					.first();

				if (existing) {
					// Update existing official feature
					await ctx.db.patch(existing._id, {
						...feature,
						isOfficial: true,
						userId: undefined,
						lastModified: now,
					});
					results.push({
						id: feature.id,
						name: feature.name,
						success: true,
						error: 'Updated existing',
					});
					continue;
				}

				// Create new official feature
				await ctx.db.insert('features', {
					...feature,
					isOfficial: true,
					userId: undefined,
					visibility: 'private',
					approvalStatus: 'approved',
					isHomebrew: false,
					createdAt: now,
					lastModified: now,
					schemaVersion: '1.0.0',
				});

				results.push({
					id: feature.id,
					name: feature.name,
					success: true,
				});
			} catch (err) {
				results.push({
					id: feature.id,
					name: feature.name,
					success: false,
					error: err instanceof Error ? err.message : 'Unknown error',
				});
			}
		}

		return results;
	},
});

/**
 * Clear all official features (admin function for re-seeding)
 */
export const clearOfficialFeatures = mutation({
	args: {},
	handler: async (ctx) => {
		// Note: In production, add admin role check here
		const officialFeatures = await ctx.db
			.query('features')
			.withIndex('by_official', (q) => q.eq('isOfficial', true))
			.collect();

		for (const feature of officialFeatures) {
			await ctx.db.delete(feature._id);
		}

		return { deleted: officialFeatures.length };
	},
});
