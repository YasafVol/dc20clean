import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';
import { query } from './_generated/server';
import { hasBackOfficeAccess, requireBackOfficeAccess } from './lib/backOfficeAccess';
import { monsterValidator } from './schema';
import systems from './backOfficeData/systems.json';

const systemSummary = v.object({
	id: v.string(),
	ordinal: v.number(),
	title: v.string(),
	purpose: v.string(),
	owns: v.string(),
	excludes: v.string(),
	authoritativeSource: v.string(),
	updated: v.string()
});
const monsterSummary = v.object({
	_id: v.id('monsters'),
	name: v.string(),
	level: v.number(),
	roleId: monsterValidator.roleId,
	tier: monsterValidator.tier,
	isOfficial: v.boolean(),
	isHomebrew: v.boolean(),
	approvalStatus: monsterValidator.approvalStatus,
	lastModified: v.string()
});
const featureSummary = v.object({
	id: v.string(),
	name: v.string(),
	description: v.string(),
	pointCost: v.number()
});

export const access = query({
	args: {},
	returns: v.boolean(),
	handler: hasBackOfficeAccess
});

export const listSystems = query({
	args: { search: v.optional(v.string()) },
	returns: v.array(systemSummary),
	handler: async (ctx, { search }) => {
		await requireBackOfficeAccess(ctx);
		const matching = search?.trim().toLowerCase();
		return systems
			.filter((entry) => !matching || entry.markdown.toLowerCase().includes(matching))
			.map((entry) => ({
				id: entry.id,
				ordinal: entry.ordinal,
				title: entry.title,
				purpose: entry.purpose,
				owns: entry.owns,
				excludes: entry.excludes,
				authoritativeSource: entry.authoritativeSource,
				updated: entry.updated
			}));
	}
});

export const getSystem = query({
	args: { id: v.string() },
	returns: v.union(v.null(), v.object({ ...systemSummary.fields, markdown: v.string() })),
	handler: async (ctx, { id }) => {
		await requireBackOfficeAccess(ctx);
		return systems.find((document) => document.id === id) ?? null;
	}
});

export const listMonsters = query({
	args: {
		paginationOpts: paginationOptsValidator,
		search: v.optional(v.string()),
		roleId: v.optional(monsterValidator.roleId),
		tier: v.optional(monsterValidator.tier)
	},
	returns: v.object({
		page: v.array(monsterSummary),
		isDone: v.boolean(),
		continueCursor: v.string(),
		splitCursor: v.optional(v.union(v.string(), v.null())),
		pageStatus: v.optional(
			v.union(v.literal('SplitRecommended'), v.literal('SplitRequired'), v.null())
		)
	}),
	handler: async (ctx, args) => {
		await requireBackOfficeAccess(ctx);
		const table = ctx.db.query('monsters');
		const search = args.search?.trim();
		const rows = search
			? table.withSearchIndex('search_name', (q) => {
					let searchQuery = q.search('name', search).eq('deletedAt', undefined);
					if (args.roleId) searchQuery = searchQuery.eq('roleId', args.roleId);
					if (args.tier) searchQuery = searchQuery.eq('tier', args.tier);
					return searchQuery;
				})
			: args.roleId && args.tier
				? table
						.withIndex('by_deleted_and_role_and_tier', (q) =>
							q.eq('deletedAt', undefined).eq('roleId', args.roleId!).eq('tier', args.tier!)
						)
						.order('desc')
				: args.roleId
					? table
							.withIndex('by_deleted_and_role', (q) =>
								q.eq('deletedAt', undefined).eq('roleId', args.roleId!)
							)
							.order('desc')
					: args.tier
						? table
								.withIndex('by_deleted_and_tier', (q) =>
									q.eq('deletedAt', undefined).eq('tier', args.tier!)
								)
								.order('desc')
						: table.withIndex('by_deleted', (q) => q.eq('deletedAt', undefined)).order('desc');
		const result = await rows.paginate({
			...args.paginationOpts,
			numItems: Math.min(args.paginationOpts.numItems, 50)
		});
		return {
			...result,
			page: result.page.map((monster) => ({
				_id: monster._id,
				name: monster.name,
				level: monster.level,
				roleId: monster.roleId,
				tier: monster.tier,
				isOfficial: monster.isOfficial === true,
				isHomebrew: monster.isHomebrew,
				approvalStatus: monster.approvalStatus,
				lastModified: monster.lastModified
			}))
		};
	}
});

export const getMonster = query({
	args: { id: v.id('monsters') },
	returns: v.union(
		v.null(),
		v.object({
			monster: v.object({ ...monsterValidator, _id: v.id('monsters'), _creationTime: v.number() }),
			features: v.array(featureSummary),
			missingFeatureIds: v.array(v.string())
		})
	),
	handler: async (ctx, { id }) => {
		await requireBackOfficeAccess(ctx);
		const monster = await ctx.db.get(id);
		if (!monster || monster.deletedAt) return null;
		// Resolve in the same ownership order as the existing feature picker.
		const resolved = await Promise.all(
			monster.featureIds.map(async (featureId) => {
				const candidates = await ctx.db
					.query('features')
					.withIndex('by_app_id', (q) => q.eq('id', featureId))
					.take(50);
				const active = candidates.filter((feature) => !feature.deletedAt);
				return (
					active.find((feature) => feature.isOfficial) ??
					active.find((feature) => feature.userId === monster.userId) ??
					active.find(
						(feature) => feature.approvalStatus === 'approved' && feature.visibility !== 'private'
					)
				);
			})
		);
		return {
			monster,
			features: resolved.flatMap((feature) =>
				feature
					? [
							{
								id: feature.id,
								name: feature.name,
								description: feature.description,
								pointCost: feature.pointCost
							}
						]
					: []
			),
			missingFeatureIds: monster.featureIds.filter((_id, index) => !resolved[index])
		};
	}
});
