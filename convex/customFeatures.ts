/**
 * Convex Custom Feature CRUD Functions (DM Tools)
 *
 * Handles custom monster feature persistence including:
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
 * List all custom features for the authenticated user (excluding deleted)
 */
export const list = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return [];
		}

		const features = await ctx.db
			.query('customFeatures')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.filter((q) => q.eq(q.field('deletedAt'), undefined))
			.collect();

		return features;
	}
});

/**
 * Get a single custom feature by ID
 */
export const getById = query({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);

		// First try to find user's own feature
		if (userId) {
			const ownFeature = await ctx.db
				.query('customFeatures')
				.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
				.first();

			if (ownFeature) {
				return ownFeature;
			}
		}

		// Check for approved homebrew (public)
		const feature = await ctx.db
			.query('customFeatures')
			.filter((q) =>
				q.and(q.eq(q.field('id'), args.id), q.eq(q.field('approvalStatus'), 'approved'))
			)
			.first();

		return feature ?? null;
	}
});

/**
 * List approved homebrew features (public library)
 */
export const listHomebrew = query({
	args: {
		pointCost: v.optional(v.number())
	},
	handler: async (ctx, args) => {
		let query = ctx.db
			.query('customFeatures')
			.withIndex('by_approval_status', (q) => q.eq('approvalStatus', 'approved'));

		// Apply filters
		if (args.pointCost !== undefined) {
			query = query.filter((q) => q.eq(q.field('pointCost'), args.pointCost));
		}

		const features = await query.collect();
		return features;
	}
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
			.query('customFeatures')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.filter((q) => q.neq(q.field('deletedAt'), undefined))
			.collect();

		return features;
	}
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
			effects: v.optional(v.array(v.any()))
		})
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const now = new Date().toISOString();

		const featureId = await ctx.db.insert('customFeatures', {
			...args.feature,
			userId,
			isOfficial: false, // Custom features are never official
			visibility: 'private',
			approvalStatus: 'draft',
			isHomebrew: false,
			createdAt: now,
			lastModified: now,
			schemaVersion: '1.0.0'
		});

		return featureId;
	}
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
			effects: v.optional(v.array(v.any()))
		})
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('customFeatures')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Feature not found or access denied');
		}

		// Cannot update approved homebrew
		if (existing.approvalStatus === 'approved' && existing.isHomebrew) {
			throw new Error('Cannot modify approved homebrew. Fork it to create your own copy.');
		}

		await ctx.db.patch(existing._id, {
			...args.updates,
			lastModified: new Date().toISOString()
		});

		return existing._id;
	}
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
			.query('customFeatures')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Feature not found or access denied');
		}

		const now = new Date().toISOString();
		const purgeDate = new Date();
		purgeDate.setDate(purgeDate.getDate() + 30);

		await ctx.db.patch(existing._id, {
			deletedAt: now,
			deletedBy: userId,
			scheduledPurgeAt: purgeDate.toISOString(),
			lastModified: now
		});

		return { success: true };
	}
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
			.query('customFeatures')
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
			lastModified: new Date().toISOString()
		});

		return { success: true };
	}
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
			.query('customFeatures')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Feature not found or access denied');
		}

		await ctx.db.delete(existing._id);

		return { success: true };
	}
});

/**
 * Fork a custom feature (create a copy with fork tracking)
 */
export const fork = mutation({
	args: {
		sourceId: v.string(),
		sourceType: v.union(v.literal('official'), v.literal('custom'), v.literal('homebrew')),
		sourceData: v.any() // The feature data to fork
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const now = new Date().toISOString();
		const newId = `feat_${crypto.randomUUID()}`;

		let sourceFeature = args.sourceData;
		let sourceName = sourceFeature?.name ?? 'Unknown';
		let sourceUserId: string | undefined;

		// If forking from DB, get the source and update fork stats
		if (args.sourceType !== 'official') {
			const dbFeature = await ctx.db
				.query('customFeatures')
				.filter((q) => q.eq(q.field('id'), args.sourceId))
				.first();

			if (dbFeature) {
				sourceFeature = dbFeature;
				sourceName = dbFeature.name;
				sourceUserId = dbFeature.userId;

				// Update fork stats on source
				await ctx.db.patch(dbFeature._id, {
					forkStats: {
						forkCount: (dbFeature.forkStats?.forkCount ?? 0) + 1,
						lastForkedAt: now
					}
				});
			}
		}

		// Create the forked feature
		const forkedFeature = {
			id: newId,
			userId,
			name: `${sourceName} (Fork)`,
			description: sourceFeature?.description ?? '',
			pointCost: sourceFeature?.pointCost ?? 1,
			effects: sourceFeature?.effects,
			isOfficial: false,
			visibility: 'private' as const,
			approvalStatus: 'draft' as const,
			isHomebrew: false,
			forkedFrom: {
				id: args.sourceId,
				type: args.sourceType,
				name: sourceName,
				userId: sourceUserId,
				forkedAt: now
			},
			createdAt: now,
			lastModified: now,
			schemaVersion: '1.0.0'
		};

		const docId = await ctx.db.insert('customFeatures', forkedFeature);

		return { id: newId, _id: docId };
	}
});

/**
 * Submit a custom feature for homebrew review
 */
export const submitForReview = mutation({
	args: {
		id: v.string(),
		visibility: v.union(v.literal('public_anonymous'), v.literal('public_credited'))
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('customFeatures')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		if (!existing) {
			throw new Error('Feature not found or access denied');
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
			lastModified: now
		});

		return { success: true };
	}
});
