import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { SavedCharacter } from '../types/dataContracts';
import { getAllSavedCharacters, saveCharacter } from './storageUtils';

vi.mock('./logger', () => ({
	logger: {
		debug: vi.fn(),
		info: vi.fn(),
		warn: vi.fn(),
		error: vi.fn()
	}
}));

function makeCharacter(id: string, finalName: string): SavedCharacter {
	return {
		id,
		finalName,
		rulesVersion: 'dc20-0.10',
		schemaVersion: '2.2.0',
		selectedTraitIds: [],
		selectedFeatureChoices: {},
		skillsData: {},
		tradesData: {},
		languagesData: {},
		spells: [],
		maneuvers: [],
		characterState: {
			resources: { current: {} },
			ui: { manualDefenseOverrides: {} },
			inventory: { items: [], currency: {} },
			notes: { playerNotes: '' }
		}
	} as unknown as SavedCharacter;
}

describe('saveCharacter', () => {
	let values: Map<string, string>;

	beforeEach(() => {
		values = new Map();
		vi.stubGlobal('localStorage', {
			getItem: (key: string) => values.get(key) ?? null,
			setItem: (key: string, value: string) => values.set(key, value),
			removeItem: (key: string) => values.delete(key),
			clear: () => values.clear()
		});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('given a new character ID, when saving, then it creates a persisted record', () => {
		saveCharacter(makeCharacter('new-character', 'New Character'));

		expect(getAllSavedCharacters()).toEqual([
			expect.objectContaining({
				id: 'new-character',
				finalName: 'New Character',
				rulesVersion: 'dc20-0.10'
			})
		]);
	});

	it('given an existing character ID, when saving, then it updates without duplicating', () => {
		saveCharacter(makeCharacter('existing-character', 'Before'));
		saveCharacter(makeCharacter('existing-character', 'After'));

		expect(getAllSavedCharacters()).toHaveLength(1);
		expect(getAllSavedCharacters()[0]).toMatchObject({
			id: 'existing-character',
			finalName: 'After'
		});
	});
});
