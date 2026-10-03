import { convexTest } from 'convex-test';
import { describe, expect, it } from 'vitest';
import { api } from './_generated/api';
import schema from './schema';
import fixtures from '../e2e/fixtures/save-reports.json';
import { prepareCharacterForSave } from '../src/lib/storage/convexStorageAdapter';
import { upgradeCharacterToCurrentRules } from '../src/lib/rulesdata/versioning/characterUpgrade';
import type { SavedCharacter } from '../src/lib/types/dataContracts';

const modules = import.meta.glob('./**/*.ts');

describe('Userback save reports: authenticated import and upgrade', () => {
	for (const classId of ['cleric', 'wizard'] as const) {
		it(`${classId}: saves imported metadata and upgrades without changing the original`, async () => {
			const t = convexTest(schema, modules);
			const userId = await t.run((ctx) => ctx.db.insert('users', { name: 'Save report owner' }));
			const owner = t.withIdentity({ subject: `${userId}|save-test` });
			const legacy = {
				...fixtures[classId],
				rulesVersion: 'dc20-0.10',
				importedAt: '2026-10-03T00:00:00.000Z'
			} as unknown as SavedCharacter;
			// A real strict-schema rejection is the negative control for the live error.
			await expect(
				owner.mutation(api.characters.create, {
					character: { ...prepareCharacterForSave(legacy), importedAt: '2026-10-03T00:00:00.000Z' }
				})
			).rejects.toThrow(/importedAt/);
			await owner.mutation(api.characters.create, { character: prepareCharacterForSave(legacy) });
			const original = await owner.query(api.characters.getById, { id: legacy.id });
			const upgradeInput = {
				...legacy,
				characterState: {
					...legacy.characterState,
					resources: { current: { currentHP: 7, currentMP: 1 } },
					inventory: { items: [], currency: { gold: 4 } },
					notes: { playerNotes: 'Preserve legacy note' }
				}
			};
			const { upgradedCharacter } = upgradeCharacterToCurrentRules(upgradeInput as SavedCharacter);
			await owner.mutation(api.characters.create, {
				character: prepareCharacterForSave(upgradedCharacter)
			});
			const saved = await owner.query(api.characters.getById, { id: upgradedCharacter.id });
			expect(saved).toMatchObject({
				classId,
				level: fixtures[classId].level,
				rulesVersion: 'dc20-0.10.5',
				rulesUpgradeSourceId: legacy.id,
				selectedTalents: ['general_spellcasting_expansion'],
				pathPointAllocations: { spellcasting: 1 }
			});
			expect(saved!.characterState.resources.current).toMatchObject({
				currentHP: 7,
				currentMP: 1,
				deathSteps: 0,
				isDead: false
			});
			expect(saved!.characterState.inventory.currency).toEqual({ gold: 4, silver: 0, copper: 0 });
			expect(saved!.characterState.notes.playerNotes).toBe('Preserve legacy note');
			expect(saved).not.toHaveProperty('importedAt');
			expect(saved!.spells).toEqual(fixtures[classId].spells);
			if (classId === 'cleric')
				expect(saved!.skillMasteryLimitElevations).toEqual({
					medicine: { source: 'spent_points', value: 1 }
				});
			expect(await owner.query(api.characters.getById, { id: legacy.id })).toEqual(original);
		});
	}
});
