import { describe, expect, it } from 'vitest';
import type { SavedCharacter } from '../types/dataContracts';
import { prepareCharacterForSave } from './convexStorageAdapter';

const baseCharacter = {
	id: 'char-1',
	finalName: 'Test',
	level: 1,
	selectedTalents: { tough: 2 },
	skillMasteryLimitElevations: {},
	tradeMasteryLimitElevations: {},
	characterState: {
		resources: {
			current: {
				currentHP: 1,
				currentSP: 0,
				currentMP: 0,
				currentGritPoints: 0,
				currentRestPoints: 0,
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
	}
} as unknown as SavedCharacter;

describe('prepareCharacterForSave', () => {
	it('omits empty mastery elevation records for stale Convex schema compatibility', () => {
		const payload = prepareCharacterForSave(baseCharacter);

		expect('skillMasteryLimitElevations' in payload).toBe(false);
		expect('tradeMasteryLimitElevations' in payload).toBe(false);
		expect(payload.selectedTalents).toEqual(['tough', 'tough']);
	});

	it('preserves non-empty mastery elevation records', () => {
		const payload = prepareCharacterForSave({
			...baseCharacter,
			skillMasteryLimitElevations: {
				athletics: { source: 'spent_points', value: 1 }
			}
		});

		expect(payload.skillMasteryLimitElevations).toEqual({
			athletics: { source: 'spent_points', value: 1 }
		});
		expect('tradeMasteryLimitElevations' in payload).toBe(false);
	});

	it('removes export, creation-input, and calculator-only fields before Convex saves', () => {
		const payload = prepareCharacterForSave({
			...baseCharacter,
			exportedAt: '2026-07-11T18:54:03.816Z',
			exportVersion: '1.0',
			selectedSpells: { first: 'mockery' },
			selectedManeuvers: ['trip'],
			finalAttributePoints: 12,
			manaSpendLimit: 1,
			staminaSpendLimit: 1,
			grantedAbilities: [],
			conditionalModifiers: []
		} as SavedCharacter & Record<string, unknown>);

		for (const field of [
			'exportedAt',
			'exportVersion',
			'selectedSpells',
			'selectedManeuvers',
			'finalAttributePoints',
			'manaSpendLimit',
			'staminaSpendLimit',
			'grantedAbilities',
			'conditionalModifiers'
		]) {
			expect(field in payload).toBe(false);
		}
	});
});
