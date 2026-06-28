import { beforeEach, describe, expect, it, vi } from 'vitest';

const saveCharacterMock = vi.fn();
const saveAllCharactersMock = vi.fn();

vi.mock('../storage', () => ({
	getDefaultStorage: () => ({
		saveCharacter: saveCharacterMock,
		saveAllCharacters: saveAllCharactersMock
	})
}));

vi.mock('./enhancedCharacterCalculator', () => ({
	convertToEnhancedBuildData: (data: unknown) => data,
	calculateCharacterWithBreakdowns: () => ({
		stats: {
			className: 'Barbarian',
			ancestry1Name: 'Human',
			ancestry2Name: 'Unknown',
			finalMight: 1,
			finalAgility: 0,
			finalCharisma: 0,
			finalIntelligence: 0,
			finalPrimeModifierValue: 1,
			finalPrimeModifierAttribute: 'might',
			finalCombatMastery: 1,
			finalHPMax: 10,
			finalSPMax: 2,
			finalMPMax: 0,
			finalPD: 10,
			finalAD: 10,
			finalPDR: 0,
			finalSaveDC: 10,
			finalDeathThreshold: 5,
			finalMoveSpeed: 25,
			finalJumpDistance: 5,
			finalRestPoints: 1,
			finalGritPoints: 1,
			finalInitiativeBonus: 0,
			finalAttackSpellCheck: 1,
			finalMartialCheck: 1
		},
		movements: [],
		resistances: [],
		vulnerabilities: [],
		senses: [],
		combatTraining: [],
		resolvedFeatures: {
			unlockedFeatures: [],
			availableSubclassChoice: false
		},
		breakdowns: {}
	})
}));

vi.mock('../utils/storageUtils', () => ({
	getInitializedCharacterState: () => ({
		resources: {
			current: {
				currentHP: 10,
				currentSP: 2,
				currentMP: 0,
				currentGritPoints: 1,
				currentRestPoints: 1,
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
	})
}));

vi.mock('./denormalizeMastery', () => ({
	denormalizeMastery: () => ({
		skillTotals: {},
		skillMastery: {},
		knowledgeTradeMastery: {},
		masteryLadders: {},
		languageMastery: {}
	})
}));

vi.mock('./spellAssignment', () => ({
	assignSpellsToCharacter: () => []
}));

vi.mock('../rulesdata/spells-data', () => ({
	ALL_SPELLS: [],
	getSpellById: () => null
}));

vi.mock('../rulesdata/martials/maneuvers', () => ({
	allManeuvers: []
}));

vi.mock('../utils/logger', () => ({
	logger: {
		info: vi.fn(),
		debug: vi.fn(),
		warn: vi.fn(),
		track: vi.fn()
	}
}));

import { completeCharacter } from './characterCompletion';

const characterState = {
	attribute_might: 1,
	attribute_agility: 0,
	attribute_charisma: 0,
	attribute_intelligence: 0,
	level: 1,
	classId: 'barbarian',
	ancestry1Id: 'human',
	ancestry2Id: null,
	selectedTraitIds: [],
	selectedFeatureChoices: {},
	finalName: 'New Character',
	finalPlayerName: 'Player',
	skillsData: {},
	tradesData: {},
	languagesData: { common: { fluency: 'fluent' } },
	selectedSpells: {},
	selectedManeuvers: []
};

describe('completeCharacter', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('saves only the completed character instead of batch-saving all characters', async () => {
		const completed = await completeCharacter(characterState, {
			onShowSnackbar: vi.fn()
		});

		expect(completed?.finalName).toBe('New Character');
		expect(saveCharacterMock).toHaveBeenCalledTimes(1);
		expect(saveCharacterMock.mock.calls[0][0]).toMatchObject({
			finalName: 'New Character',
			classId: 'barbarian'
		});
		expect(saveAllCharactersMock).not.toHaveBeenCalled();
	});

	it('can build a completed character without persisting it', async () => {
		const completed = await completeCharacter(characterState, {
			onShowSnackbar: vi.fn(),
			persist: false
		});

		expect(completed?.finalName).toBe('New Character');
		expect(saveCharacterMock).not.toHaveBeenCalled();
		expect(saveAllCharactersMock).not.toHaveBeenCalled();
	});
});
