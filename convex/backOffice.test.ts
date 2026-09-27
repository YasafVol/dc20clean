import { convexTest } from 'convex-test';
import { describe, expect, it } from 'vitest';
import schema from './schema';
import type { Doc } from './_generated/dataModel';
import { backOfficeApi } from '../src/routes/back-office/backOfficeApi';

const modules = import.meta.glob('./**/*.ts');
const NOW = '2026-09-27T09:00:00.000Z';
const monsterData = (overrides: Partial<Omit<Doc<'monsters'>, '_id' | '_creationTime'>> = {}) => ({
	id: 'mon-review',
	name: 'Review Goblin',
	level: 1,
	tier: 'standard' as const,
	roleId: 'brute' as const,
	finalHP: 15,
	finalPD: 12,
	finalAD: 10,
	finalAttack: 3,
	finalSaveDC: 12,
	finalBaseDamage: 2,
	attributes: { might: 1, agility: 2, charisma: 0, intelligence: -1 },
	featureIds: [],
	featurePointsSpent: 0,
	featurePointsMax: 2,
	actions: [],
	visibility: 'private' as const,
	approvalStatus: 'draft' as const,
	isHomebrew: false,
	createdAt: NOW,
	lastModified: NOW,
	schemaVersion: '1.0.0',
	breakdowns: {},
	...overrides
});

async function setup(email = 'yasaf.vol@gmail.com', verified = true) {
	const t = convexTest(schema, modules);
	const userId = await t.run((ctx) =>
		ctx.db.insert('users', {
			email,
			...(verified ? { emailVerificationTime: Date.now() } : {})
		})
	);
	return { t, userId, reviewer: t.withIdentity({ subject: `${userId}|test-session` }) };
}

async function expectContentDenied(
	requester: ReturnType<typeof convexTest>,
	monsterId: Doc<'monsters'>['_id']
) {
	await expect(requester.query(backOfficeApi.access, {})).resolves.toBe(false);
	await expect(requester.query(backOfficeApi.listSystems, {})).rejects.toThrow('restricted');
	await expect(
		requester.query(backOfficeApi.getSystem, { id: 'DATABASE_SYSTEM.MD' })
	).rejects.toThrow('restricted');
	await expect(
		requester.query(backOfficeApi.listMonsters, { paginationOpts: { numItems: 30, cursor: null } })
	).rejects.toThrow('restricted');
	await expect(requester.query(backOfficeApi.getMonster, { id: monsterId })).rejects.toThrow(
		'restricted'
	);
}

describe('Back office access and content', () => {
	it.each(['yasaf.vol@gmail.com', 'nzinger@gmail.com'])(
		'allows the verified reviewer %s',
		async (email) => {
			const { reviewer } = await setup(email);
			await expect(reviewer.query(backOfficeApi.access, {})).resolves.toBe(true);
			const documents = await reviewer.query(backOfficeApi.listSystems, {});
			expect(documents.some((entry) => entry.id === 'BACK_OFFICE_SYSTEM.MD')).toBe(true);
			expect(documents[0]).not.toHaveProperty('markdown');
			const document = await reviewer.query(backOfficeApi.getSystem, { id: 'DATABASE_SYSTEM.MD' });
			expect(document?.markdown).toContain('hybrid');
		}
	);

	it('denies every content query to signed-out, other, deleted, and unverified accounts', async () => {
		const { t, reviewer, userId } = await setup();
		const monsterId = await t.run((ctx) => ctx.db.insert('monsters', monsterData()));
		await expectContentDenied(t, monsterId);
		const otherId = await t.run((ctx) =>
			ctx.db.insert('users', { email: 'other@example.com', emailVerificationTime: Date.now() })
		);
		await expectContentDenied(
			t.withIdentity({ subject: `${otherId}|test-session`, email: 'nzinger@gmail.com' }),
			monsterId
		);
		const unverifiedId = await t.run((ctx) =>
			ctx.db.insert('users', { email: 'nzinger@gmail.com' })
		);
		await expectContentDenied(
			t.withIdentity({ subject: `${unverifiedId}|test-session` }),
			monsterId
		);
		await t.run((ctx) => ctx.db.delete(userId));
		await expectContentDenied(reviewer, monsterId);
	});

	it('searches full document text and returns null for unknown paths', async () => {
		const { reviewer } = await setup();
		const matches = await reviewer.query(backOfficeApi.listSystems, {
			search: 'normalizeCharacterStateForStorage'
		});
		expect(matches.some((entry) => entry.id === 'DATABASE_SYSTEM.MD')).toBe(true);
		await expect(reviewer.query(backOfficeApi.getSystem, { id: '../auth.ts' })).resolves.toBeNull();
	});

	it('paginates cross-owner private records without returning deleted monsters', async () => {
		const { t, reviewer } = await setup();
		await t.run(async (ctx) => {
			const other = await ctx.db.insert('users', { email: 'other@example.com' });
			for (let i = 0; i < 7; i++)
				await ctx.db.insert(
					'monsters',
					monsterData({ id: `mon-${i}`, userId: other, name: `Goblin ${i}` })
				);
			await ctx.db.insert('monsters', monsterData({ id: 'deleted', deletedAt: NOW }));
		});
		const first = await reviewer.query(backOfficeApi.listMonsters, {
			paginationOpts: { numItems: 3, cursor: null }
		});
		expect(first.page).toHaveLength(3);
		expect(first.isDone).toBe(false);
		const second = await reviewer.query(backOfficeApi.listMonsters, {
			paginationOpts: { numItems: 3, cursor: first.continueCursor }
		});
		expect(new Set([...first.page, ...second.page].map((entry) => entry._id)).size).toBe(6);
		const third = await reviewer.query(backOfficeApi.listMonsters, {
			paginationOpts: { numItems: 3, cursor: second.continueCursor }
		});
		expect(third.page).toHaveLength(1);
		expect(third.isDone).toBe(true);
	});

	it('applies name, role, and tier filters to the full catalog', async () => {
		const { t, reviewer } = await setup();
		await t.run(async (ctx) => {
			await ctx.db.insert('monsters', monsterData({ name: 'Goblin chief', tier: 'apex' }));
			await ctx.db.insert('monsters', monsterData({ name: 'Goblin scout', roleId: 'lurker' }));
			await ctx.db.insert('monsters', monsterData({ name: 'Wolf', tier: 'apex' }));
			await ctx.db.insert(
				'monsters',
				monsterData({ name: 'Goblin dead', tier: 'apex', deletedAt: NOW })
			);
		});
		for (const filters of [
			{ roleId: 'lurker' as const },
			{ tier: 'apex' as const },
			{ roleId: 'brute' as const, tier: 'apex' as const },
			{ search: 'Goblin', roleId: 'brute' as const, tier: 'apex' as const }
		]) {
			const result = await reviewer.query(backOfficeApi.listMonsters, {
				...filters,
				paginationOpts: { numItems: 30, cursor: null }
			});
			expect(result.page.length).toBe(filters.search ? 1 : filters.roleId === 'lurker' ? 1 : 2);
			expect(result.page.map((entry) => entry.name)).not.toContain('Goblin dead');
		}
	});

	it('preserves saved stats, resolves feature text, and exposes unresolved references', async () => {
		const { t, reviewer, userId } = await setup();
		const { id, deletedId } = await t.run(async (ctx) => {
			const base = {
				name: 'Keen Smell',
				id: 'feat-smell',
				description: 'ADV on smell checks.',
				pointCost: 1,
				visibility: 'private' as const,
				approvalStatus: 'approved' as const,
				isHomebrew: false,
				createdAt: NOW,
				lastModified: NOW,
				schemaVersion: '1.0.0'
			};
			await ctx.db.insert('features', { ...base, isOfficial: true });
			await ctx.db.insert('features', { ...base, userId, description: 'Owner variant' });
			const id = await ctx.db.insert(
				'monsters',
				monsterData({ userId, finalHP: 93, featureIds: ['feat-smell', 'feat-missing'] })
			);
			const deletedId = await ctx.db.insert('monsters', monsterData({ deletedAt: NOW }));
			return { id, deletedId };
		});
		const detail = await reviewer.query(backOfficeApi.getMonster, { id });
		expect(detail?.monster.finalHP).toBe(93);
		expect(detail?.features[0].description).toBe('ADV on smell checks.');
		expect(detail?.missingFeatureIds).toEqual(['feat-missing']);
		await expect(reviewer.query(backOfficeApi.getMonster, { id: deletedId })).resolves.toBeNull();
	});
});
