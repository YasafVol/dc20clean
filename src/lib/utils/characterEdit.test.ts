import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { SavedCharacter } from '../types/dataContracts';

const saveCharacterMock = vi.fn();
const saveAllCharactersMock = vi.fn();
const getAllCharactersMock = vi.fn();

vi.mock('../storage', () => ({
	getDefaultStorage: () => ({
		getAllCharacters: getAllCharactersMock,
		saveCharacter: saveCharacterMock,
		saveAllCharacters: saveAllCharactersMock
	})
}));

vi.mock('./characterState', () => ({
	getCharacterState: vi.fn(async () => null),
	updateCharacterState: vi.fn()
}));

vi.mock('./debug', () => ({
	debug: {
		character: vi.fn(),
		storage: vi.fn(),
		warn: vi.fn(),
		error: vi.fn()
	}
}));

import { completeCharacterEdit } from './characterEdit';

const existingCharacter = {
	id: 'char-1',
	finalName: 'Before',
	selectedFeatureChoices: {},
	skillMasteryLimitElevations: {},
	tradeMasteryLimitElevations: {},
	breakdowns: {},
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
} as SavedCharacter;

describe('completeCharacterEdit', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		getAllCharactersMock.mockResolvedValue([
			existingCharacter,
			{ ...existingCharacter, id: 'char-2', finalName: 'Other character' }
		]);
	});

	it('saves only the edited character instead of batch-saving every character', async () => {
		await completeCharacterEdit(
			'char-1',
			{
				attribute_might: 1,
				attribute_agility: 0,
				attribute_charisma: 0,
				attribute_intelligence: 0,
				level: 1,
				combatMastery: 1,
				classId: 'barbarian',
				finalName: 'After',
				finalPlayerName: 'Player',
				selectedFeatureChoices: {},
				skillsData: {},
				tradesData: {},
				languagesData: {},
				skillMasteryLimitElevations: {},
				tradeMasteryLimitElevations: {},
				selectedSpells: {},
				selectedManeuvers: [],
				pathPointAllocations: {},
				selectedTalents: {}
			},
			async () =>
				({
					id: 'char-1',
					finalName: 'After',
					breakdowns: { hpMax: { total: 10 } }
				}) as SavedCharacter
		);

		expect(saveAllCharactersMock).not.toHaveBeenCalled();
		expect(saveCharacterMock).toHaveBeenCalledTimes(1);
		expect(saveCharacterMock.mock.calls[0][0]).toMatchObject({
			id: 'char-1',
			finalName: 'After'
		});
	});
});
