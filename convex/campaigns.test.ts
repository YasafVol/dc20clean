import { convexTest } from 'convex-test';
import { describe, expect, it } from 'vitest';
import { api } from './_generated/api';
import type { Id } from './_generated/dataModel';
import schema from './schema';

const modules = import.meta.glob('./**/*.ts');
const NOW = '2026-07-20T00:00:00.000Z';

type SheetPresentation = 'primary' | 'alternative';

function characterDocument(userId: Id<'users'>, id: string, name: string) {
	return {
		userId,
		id,
		finalName: name,
		finalPlayerName: 'Owner',
		level: 1,
		classId: 'fighter',
		className: 'Fighter',
		finalMight: 2,
		finalAgility: 1,
		finalCharisma: 0,
		finalIntelligence: 0,
		finalPrimeModifierValue: 2,
		finalPrimeModifierAttribute: 'might',
		finalCombatMastery: 1,
		finalSaveMight: 2,
		finalSaveAgility: 1,
		finalSaveCharisma: 0,
		finalSaveIntelligence: 0,
		finalHPMax: 10,
		finalSPMax: 4,
		finalMPMax: 0,
		finalPD: 12,
		finalAD: 10,
		finalPDR: 0,
		finalSaveDC: 12,
		finalDeathThreshold: 5,
		finalMoveSpeed: 5,
		finalJumpDistance: 2,
		finalRestPoints: 5,
		finalGritPoints: 3,
		finalInitiativeBonus: 1,
		finalAttackSpellCheck: 3,
		finalMartialCheck: 3,
		selectedTraitIds: [],
		selectedFeatureChoices: {},
		skillsData: {},
		tradesData: {},
		languagesData: {},
		spells: [],
		maneuvers: [],
		characterState: {
			resources: {
				current: {
					currentHP: 10,
					currentSP: 4,
					currentMP: 0,
					currentGritPoints: 3,
					currentRestPoints: 5,
					tempHP: 0,
					actionPointsUsed: 0,
					exhaustionLevel: 0,
					deathSteps: 0,
					isDead: false
				}
			},
			ui: { manualDefenseOverrides: {} },
			inventory: { items: [], currency: { gold: 0, silver: 0, copper: 0 } },
			notes: { playerNotes: '' }
		},
		breakdowns: {},
		createdAt: NOW,
		lastModified: NOW,
		completedAt: NOW,
		schemaVersion: '2.2.0',
		rulesVersion: '0.10.5'
	};
}

async function givenMemberWithCharacter() {
	const t = convexTest(schema, modules);
	const seeded = await t.run(async (ctx) => {
		const ownerId = await ctx.db.insert('users', { name: 'Owner' });
		const campaignDocId = await ctx.db.insert('campaigns', {
			userId: ownerId,
			id: 'camp-one',
			code: 'ABC234',
			name: 'Campaign One',
			createdAt: NOW,
			lastModified: NOW
		});
		const memberDocId = await ctx.db.insert('campaignMembers', {
			campaignId: campaignDocId,
			userId: ownerId,
			role: 'dm' as const,
			sharedCharacterIds: [],
			displayName: 'Owner',
			joinedAt: NOW
		});
		const characterDocId = await ctx.db.insert(
			'characters',
			characterDocument(ownerId, 'character-one', 'Arpeggio')
		);
		return { ownerId, campaignDocId, memberDocId, characterDocId };
	});
	const owner = t.withIdentity({ subject: `${seeded.ownerId}|test-session` });
	return { t, owner, ...seeded };
}

describe.each<SheetPresentation>(['primary', 'alternative'])(
	'Scenario Outline: Connect a character from either sheet presentation — %s',
	(sheet) => {
		it('connects the underlying character record and exposes one roster entry', async () => {
			// Given the member opened the same persisted character through this presentation.
			expect(sheet).toMatch(/primary|alternative/);
			const { t, owner, memberDocId, characterDocId } = await givenMemberWithCharacter();

			// When the member connects that character to the campaign.
			await owner.mutation(api.campaigns.shareCharacter, {
				campaignId: 'camp-one',
				characterId: 'character-one'
			});

			// Then membership references the database record, not a presentation.
			const member = await t.run((ctx) => ctx.db.get(memberDocId));
			expect((member as any)?.sharedCharacterDocIds).toEqual([characterDocId]);

			// And campaign queries resolve the same connection exactly once.
			const roster = await owner.query(api.campaigns.getRoster, { campaignId: 'camp-one' });
			expect(roster).toHaveLength(1);
			expect(roster[0]).toMatchObject({
				characterId: 'character-one',
				characterName: 'Arpeggio'
			});
			const connections = await owner.query(api.campaigns.getCampaignsForCharacter, {
				characterId: 'character-one'
			});
			expect(connections).toHaveLength(1);
		});
	}
);

describe('Scenario: Reconnecting the same character is idempotent', () => {
	it('keeps one record reference, one roster entry, and one connection event', async () => {
		const { t, owner, memberDocId, characterDocId, campaignDocId } =
			await givenMemberWithCharacter();

		await owner.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});
		await owner.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});

		const member = await t.run((ctx) => ctx.db.get(memberDocId));
		expect((member as any)?.sharedCharacterDocIds).toEqual([characterDocId]);
		expect(await owner.query(api.campaigns.getRoster, { campaignId: 'camp-one' })).toHaveLength(1);
		const events = await t.run((ctx) =>
			ctx.db
				.query('campaignEvents')
				.withIndex('by_campaign', (q) => q.eq('campaignId', campaignDocId))
				.collect()
		);
		expect(events.filter((event) => event.type === 'character_shared')).toHaveLength(1);
	});
});

describe('Scenario: Legacy character connections remain readable', () => {
	it('resolves an application ID only within the member who connected it', async () => {
		const t = convexTest(schema, modules);
		const { ownerId, ownerCharacterDocId } = await t.run(async (ctx) => {
			const otherUserId = await ctx.db.insert('users', { name: 'Other' });
			const ownerId = await ctx.db.insert('users', { name: 'Owner' });
			const campaignDocId = await ctx.db.insert('campaigns', {
				userId: ownerId,
				id: 'camp-legacy',
				code: 'LEG234',
				name: 'Legacy Campaign',
				createdAt: NOW,
				lastModified: NOW
			});
			await ctx.db.insert('characters', characterDocument(otherUserId, 'duplicate-id', 'Wrong'));
			const ownerCharacterDocId = await ctx.db.insert(
				'characters',
				characterDocument(ownerId, 'duplicate-id', 'Right')
			);
			await ctx.db.insert('campaignMembers', {
				campaignId: campaignDocId,
				userId: ownerId,
				role: 'dm' as const,
				sharedCharacterIds: ['duplicate-id'],
				displayName: 'Owner',
				joinedAt: NOW
			});
			return { ownerId, ownerCharacterDocId };
		});
		const owner = t.withIdentity({ subject: `${ownerId}|test-session` });

		const roster = await owner.query(api.campaigns.getRoster, { campaignId: 'camp-legacy' });
		expect(roster).toHaveLength(1);
		expect(roster[0]).toMatchObject({
			characterDocId: ownerCharacterDocId,
			characterName: 'Right'
		});
	});
});

describe('Scenario: Character updates remain visible to the campaign', () => {
	it('reads current state from the connected record without creating another connection', async () => {
		const { t, owner, characterDocId, memberDocId } = await givenMemberWithCharacter();
		await owner.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});

		await t.run((ctx) =>
			ctx.db.patch(characterDocId, {
				finalName: 'Arpeggio Updated',
				characterState: {
					...characterDocument('ignored' as Id<'users'>, 'ignored', 'ignored').characterState,
					resources: {
						current: {
							...characterDocument('ignored' as Id<'users'>, 'ignored', 'ignored').characterState
								.resources.current,
							currentHP: 4
						}
					}
				}
			})
		);

		const roster = await owner.query(api.campaigns.getRoster, { campaignId: 'camp-one' });
		expect(roster).toHaveLength(1);
		expect(roster[0]).toMatchObject({
			characterDocId,
			characterName: 'Arpeggio Updated',
			currentHP: 4
		});
		const member = await t.run((ctx) => ctx.db.get(memberDocId));
		expect((member as any)?.sharedCharacterDocIds).toEqual([characterDocId]);
	});
});

describe.each<SheetPresentation>(['primary', 'alternative'])(
	'Scenario Outline: Character activity is presentation-independent — %s',
	(sheet) => {
		it('records activity against the connected character record', async () => {
			expect(sheet).toMatch(/primary|alternative/);
			const { owner, campaignDocId } = await givenMemberWithCharacter();
			await owner.mutation(api.campaigns.shareCharacter, {
				campaignId: 'camp-one',
				characterId: 'character-one'
			});
			await owner.mutation(api.campaigns.postEvent, {
				campaignId: 'camp-one',
				characterId: 'character-one',
				type: 'dice_roll',
				payload: { total: 17 }
			});

			const events = await owner.query(api.campaigns.listEvents, { campaignId: 'camp-one' });
			expect(events).toContainEqual(
				expect.objectContaining({
					campaignId: campaignDocId,
					characterId: 'character-one',
					type: 'dice_roll'
				})
			);
		});
	}
);

describe('Scenario: A campaign member can view either sheet without editing', () => {
	it('returns the connected record read-only and rejects owner-scoped writes and events', async () => {
		const { t, owner, campaignDocId, characterDocId } = await givenMemberWithCharacter();
		await owner.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});
		const viewerId = await t.run(async (ctx) => {
			const viewerId = await ctx.db.insert('users', { name: 'Viewer' });
			await ctx.db.insert('campaignMembers', {
				campaignId: campaignDocId,
				userId: viewerId,
				role: 'player' as const,
				sharedCharacterIds: [],
				sharedCharacterDocIds: [],
				displayName: 'Viewer',
				joinedAt: NOW
			});
			return viewerId;
		});
		const viewer = t.withIdentity({ subject: `${viewerId}|test-session` });

		const visible = await viewer.query(api.characters.getByIdForMember, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});
		expect(visible?._id).toBe(characterDocId);
		await expect(
			viewer.mutation(api.characters.update, {
				id: 'character-one',
				updates: { finalName: 'Tampered' }
			})
		).rejects.toThrow(/access denied/i);
		await expect(
			viewer.mutation(api.campaigns.postEvent, {
				campaignId: 'camp-one',
				characterId: 'character-one',
				type: 'dice_roll',
				payload: { total: 20 }
			})
		).rejects.toThrow(/not shared by caller/i);
	});
});

describe('Scenario: Disconnect a character', () => {
	it('removes roster access and event production but preserves the character', async () => {
		const { owner } = await givenMemberWithCharacter();
		await owner.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});

		await owner.mutation(api.campaigns.unshareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});

		expect(await owner.query(api.campaigns.getRoster, { campaignId: 'camp-one' })).toEqual([]);
		await expect(
			owner.mutation(api.campaigns.postEvent, {
				campaignId: 'camp-one',
				characterId: 'character-one',
				type: 'dice_roll',
				payload: { total: 12 }
			})
		).rejects.toThrow(/not shared by caller/i);
		expect(await owner.query(api.characters.getById, { id: 'character-one' })).not.toBeNull();
	});
});

describe('Scenario: Move a character between campaigns', () => {
	it('removes the first connection before allowing the second', async () => {
		const { t, owner, ownerId, characterDocId } = await givenMemberWithCharacter();
		await t.run(async (ctx) => {
			const campaignDocId = await ctx.db.insert('campaigns', {
				userId: ownerId,
				id: 'camp-two',
				code: 'XYZ234',
				name: 'Campaign Two',
				createdAt: NOW,
				lastModified: NOW
			});
			await ctx.db.insert('campaignMembers', {
				campaignId: campaignDocId,
				userId: ownerId,
				role: 'dm' as const,
				sharedCharacterIds: [],
				sharedCharacterDocIds: [],
				displayName: 'Owner',
				joinedAt: NOW
			});
		});

		await owner.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});
		await expect(
			owner.mutation(api.campaigns.shareCharacter, {
				campaignId: 'camp-two',
				characterId: 'character-one'
			})
		).rejects.toThrow(/already shared/i);

		await owner.mutation(api.campaigns.unshareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});
		await owner.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-two',
			characterId: 'character-one'
		});

		expect(await owner.query(api.campaigns.getRoster, { campaignId: 'camp-one' })).toEqual([]);
		expect(await owner.query(api.campaigns.getRoster, { campaignId: 'camp-two' })).toEqual([
			expect.objectContaining({ characterDocId })
		]);
		await expect(
			owner.mutation(api.campaigns.postEvent, {
				campaignId: 'camp-one',
				characterId: 'character-one',
				type: 'dice_roll',
				payload: { total: 12 }
			})
		).rejects.toThrow(/not shared by caller/i);
		expect(await owner.query(api.characters.getById, { id: 'character-one' })).not.toBeNull();
	});
});

describe('Scenario: A legacy connection upgrades without duplicating its lifecycle event', () => {
	it('adds the record identity when connect is called again', async () => {
		const { t, owner, memberDocId, characterDocId } = await givenMemberWithCharacter();
		await t.run((ctx) => ctx.db.patch(memberDocId, { sharedCharacterIds: ['character-one'] }));

		await owner.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});

		const member = await t.run((ctx) => ctx.db.get(memberDocId));
		expect((member as any)?.sharedCharacterDocIds).toEqual([characterDocId]);
		const events = await owner.query(api.campaigns.listEvents, { campaignId: 'camp-one' });
		expect(events.filter((event) => event.type === 'character_shared')).toEqual([]);
	});
});

describe("Scenario: Selecting a roster character opens that member's character", () => {
	it('uses the record identity when campaign members share the same application ID', async () => {
		const t = convexTest(schema, modules);
		const seeded = await t.run(async (ctx) => {
			const firstOwnerId = await ctx.db.insert('users', { name: 'First Owner' });
			const secondOwnerId = await ctx.db.insert('users', { name: 'Second Owner' });
			const viewerId = await ctx.db.insert('users', { name: 'Viewer' });
			const campaignDocId = await ctx.db.insert('campaigns', {
				userId: firstOwnerId,
				id: 'camp-duplicate-ids',
				code: 'DUP234',
				name: 'Duplicate IDs',
				createdAt: NOW,
				lastModified: NOW
			});
			const firstCharacterDocId = await ctx.db.insert(
				'characters',
				characterDocument(firstOwnerId, 'shared-app-id', 'First Character')
			);
			const secondCharacterDocId = await ctx.db.insert(
				'characters',
				characterDocument(secondOwnerId, 'shared-app-id', 'Second Character')
			);
			for (const [userId, characterDocId, name] of [
				[firstOwnerId, firstCharacterDocId, 'First Owner'],
				[secondOwnerId, secondCharacterDocId, 'Second Owner']
			] as const) {
				await ctx.db.insert('campaignMembers', {
					campaignId: campaignDocId,
					userId,
					role: userId === firstOwnerId ? ('dm' as const) : ('player' as const),
					sharedCharacterIds: ['shared-app-id'],
					sharedCharacterDocIds: [characterDocId],
					displayName: name,
					joinedAt: NOW
				});
			}
			await ctx.db.insert('campaignMembers', {
				campaignId: campaignDocId,
				userId: viewerId,
				role: 'player',
				sharedCharacterIds: [],
				sharedCharacterDocIds: [],
				displayName: 'Viewer',
				joinedAt: NOW
			});
			return { viewerId, secondCharacterDocId };
		});
		const viewer = t.withIdentity({ subject: `${seeded.viewerId}|test-session` });

		const character = await viewer.query(api.characters.getByIdForMember, {
			campaignId: 'camp-duplicate-ids',
			characterId: 'shared-app-id',
			characterDocId: seeded.secondCharacterDocId
		});
		expect(character).toMatchObject({
			_id: seeded.secondCharacterDocId,
			finalName: 'Second Character'
		});
		await expect(
			viewer.query(api.characters.getByIdForMember, {
				campaignId: 'camp-duplicate-ids',
				characterId: 'different-app-id',
				characterDocId: seeded.secondCharacterDocId
			})
		).resolves.toBeNull();
	});
});

describe('Scenario: Replacing a deleted character requires a new connection', () => {
	it('requires an explicit connection for a replacement record with the same application ID', async () => {
		const { t, owner, ownerId, campaignDocId } = await givenMemberWithCharacter();
		await owner.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});
		await owner.mutation(api.characters.remove, { id: 'character-one' });
		const replacementDocId = await t.run((ctx) =>
			ctx.db.insert('characters', characterDocument(ownerId, 'character-one', 'Replacement'))
		);

		expect(await owner.query(api.campaigns.getRoster, { campaignId: 'camp-one' })).toEqual([]);
		expect(
			await owner.query(api.campaigns.getCampaignsForCharacter, {
				characterId: 'character-one'
			})
		).toEqual([]);

		await owner.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});
		expect(await owner.query(api.campaigns.getRoster, { campaignId: 'camp-one' })).toEqual([
			expect.objectContaining({ characterDocId: replacementDocId, characterName: 'Replacement' })
		]);
		const events = await t.run((ctx) =>
			ctx.db
				.query('campaignEvents')
				.withIndex('by_campaign', (q) => q.eq('campaignId', campaignDocId))
				.collect()
		);
		expect(events.filter((event) => event.type === 'character_shared')).toHaveLength(2);
	});
});

describe('Scenario: Ending membership ends its active character connections', () => {
	it('removes a leaving player from the roster without deleting the character', async () => {
		const t = convexTest(schema, modules);
		const seeded = await t.run(async (ctx) => {
			const dmId = await ctx.db.insert('users', { name: 'DM' });
			const playerId = await ctx.db.insert('users', { name: 'Player' });
			const campaignDocId = await ctx.db.insert('campaigns', {
				userId: dmId,
				id: 'camp-leave',
				code: 'OUT234',
				name: 'Leave Campaign',
				createdAt: NOW,
				lastModified: NOW
			});
			await ctx.db.insert('campaignMembers', {
				campaignId: campaignDocId,
				userId: dmId,
				role: 'dm',
				sharedCharacterIds: [],
				sharedCharacterDocIds: [],
				displayName: 'DM',
				joinedAt: NOW
			});
			await ctx.db.insert('campaignMembers', {
				campaignId: campaignDocId,
				userId: playerId,
				role: 'player',
				sharedCharacterIds: [],
				sharedCharacterDocIds: [],
				displayName: 'Player',
				joinedAt: NOW
			});
			const characterDocId = await ctx.db.insert(
				'characters',
				characterDocument(playerId, 'player-character', 'Player Character')
			);
			return { dmId, playerId, characterDocId };
		});
		const dm = t.withIdentity({ subject: `${seeded.dmId}|test-session` });
		const player = t.withIdentity({ subject: `${seeded.playerId}|test-session` });
		await player.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-leave',
			characterId: 'player-character'
		});

		await player.mutation(api.campaigns.leaveCampaign, { campaignId: 'camp-leave' });

		expect(await dm.query(api.campaigns.getRoster, { campaignId: 'camp-leave' })).toEqual([]);
		expect(await player.query(api.characters.getById, { id: 'player-character' })).toMatchObject({
			_id: seeded.characterDocId
		});

		await player.mutation(api.campaigns.joinByCode, { code: 'OUT234' });
		expect(await dm.query(api.campaigns.getRoster, { campaignId: 'camp-leave' })).toEqual([]);
	});

	it('removes a kicked player from the roster without deleting the character', async () => {
		const { t, owner: dm, campaignDocId } = await givenMemberWithCharacter();
		const seeded = await t.run(async (ctx) => {
			const playerId = await ctx.db.insert('users', { name: 'Player' });
			await ctx.db.insert('campaignMembers', {
				campaignId: campaignDocId,
				userId: playerId,
				role: 'player',
				sharedCharacterIds: [],
				sharedCharacterDocIds: [],
				displayName: 'Player',
				joinedAt: NOW
			});
			const characterDocId = await ctx.db.insert(
				'characters',
				characterDocument(playerId, 'kicked-character', 'Kicked Character')
			);
			return { playerId, characterDocId };
		});
		const player = t.withIdentity({ subject: `${seeded.playerId}|test-session` });
		await player.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-one',
			characterId: 'kicked-character'
		});

		await dm.mutation(api.campaigns.kickMember, {
			campaignId: 'camp-one',
			targetUserId: seeded.playerId.toString()
		});

		expect(await dm.query(api.campaigns.getRoster, { campaignId: 'camp-one' })).toEqual([]);
		expect(await player.query(api.characters.getById, { id: 'kicked-character' })).toMatchObject({
			_id: seeded.characterDocId
		});

		await player.mutation(api.campaigns.joinByCode, { code: 'ABC234' });
		expect(await dm.query(api.campaigns.getRoster, { campaignId: 'camp-one' })).toEqual([]);
	});
});

describe('Scenario: Deleting a campaign ends its active character connections', () => {
	it('hides the connection while preserving the underlying character', async () => {
		const { owner, characterDocId } = await givenMemberWithCharacter();
		await owner.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});

		await owner.mutation(api.campaigns.deleteCampaign, { campaignId: 'camp-one' });

		expect(
			await owner.query(api.campaigns.getCampaignsForCharacter, {
				characterId: 'character-one'
			})
		).toEqual([]);
		expect(await owner.query(api.characters.getById, { id: 'character-one' })).toMatchObject({
			_id: characterDocId
		});
	});
});

describe('Scenario: Campaign members receive connected-character activity', () => {
	it('delivers an owner event through the campaign subscription query', async () => {
		const { t, owner, campaignDocId } = await givenMemberWithCharacter();
		const viewerId = await t.run(async (ctx) => {
			const viewerId = await ctx.db.insert('users', { name: 'Viewer' });
			await ctx.db.insert('campaignMembers', {
				campaignId: campaignDocId,
				userId: viewerId,
				role: 'player',
				sharedCharacterIds: [],
				sharedCharacterDocIds: [],
				displayName: 'Viewer',
				joinedAt: NOW
			});
			return viewerId;
		});
		const viewer = t.withIdentity({ subject: `${viewerId}|test-session` });
		await owner.mutation(api.campaigns.shareCharacter, {
			campaignId: 'camp-one',
			characterId: 'character-one'
		});

		await owner.mutation(api.campaigns.postEvent, {
			campaignId: 'camp-one',
			characterId: 'character-one',
			type: 'dice_roll',
			payload: { total: 17 }
		});

		const events = await viewer.query(api.campaigns.listEvents, { campaignId: 'camp-one' });
		expect(events).toContainEqual(
			expect.objectContaining({ characterId: 'character-one', type: 'dice_roll' })
		);
	});
});
