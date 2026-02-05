/**
 * Convex Character CRUD Mutations and Queries
 *
 * Convex character CRUD functions.
 *
 * These functions handle all character persistence operations.
 */

import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

// ============================================================================
// QUERIES
// ============================================================================

/**
 * List all characters for the authenticated user
 */
export const list = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return [];
		}

		const characters = await ctx.db
			.query('characters')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.collect();

		return characters;
	}
});

/**
 * Get a single character by ID (must belong to authenticated user)
 */
export const getById = query({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return null;
		}

		const character = await ctx.db
			.query('characters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();

		return character ?? null;
	}
});

/**
 * Get a character by name (for the authenticated user)
 */
export const getByName = query({
	args: { name: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return null;
		}

		const character = await ctx.db
			.query('characters')
			.withIndex('by_user_and_name', (q) => q.eq('userId', userId).eq('finalName', args.name))
			.first();

		return character;
	}
});

// ============================================================================
// MUTATIONS
// ============================================================================

/**
 * Create a new character
 */
export const create = mutation({
	args: {
		character: v.any() // Full SavedCharacter object (minus ID and userId)
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const now = new Date().toISOString();
		if (!args.character?.id) {
			throw new Error('Character id is required');
		}

		const characterId = await ctx.db.insert('characters', {
			...args.character,
			userId,
			createdAt: now,
			lastModified: now
		});

		return characterId;
	}
});

/**
 * Update an existing character
 */
export const update = mutation({
	args: {
		id: v.string(),
		updates: v.any() // Partial<SavedCharacter>
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('characters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();
		if (!existing) {
			throw new Error('Character not found or access denied');
		}

		await ctx.db.patch(existing._id, {
			...args.updates,
			lastModified: new Date().toISOString()
		});

		return existing._id;
	}
});

/**
 * Update only the characterState (for frequent saves during gameplay)
 */
export const updateState = mutation({
	args: {
		id: v.string(),
		characterState: v.any() // CharacterState object
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('characters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();
		if (!existing) {
			throw new Error('Character not found or access denied');
		}

		await ctx.db.patch(existing._id, {
			characterState: args.characterState,
			lastModified: new Date().toISOString()
		});

		return existing._id;
	}
});

/**
 * Delete a character
 */
export const remove = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('characters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();
		if (!existing) {
			throw new Error('Character not found or access denied');
		}

		await ctx.db.delete(existing._id);

		return { success: true };
	}
});

/**
 * Duplicate a character (creates a copy with new ID)
 */
export const duplicate = mutation({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Not authenticated');
		}

		const existing = await ctx.db
			.query('characters')
			.withIndex('by_user_and_id', (q) => q.eq('userId', userId).eq('id', args.id))
			.first();
		if (!existing) {
			throw new Error('Character not found or access denied');
		}

		const now = new Date().toISOString();

		// Create copy with new name
		const { _id, _creationTime, ...characterData } = existing;
		const newCharacterId = await ctx.db.insert('characters', {
			...characterData,
			id: `${existing.id}_copy_${Date.now()}`,
			finalName: `${existing.finalName} (Copy)`,
			createdAt: now,
			lastModified: now
		});

		return newCharacterId;
	}
});
