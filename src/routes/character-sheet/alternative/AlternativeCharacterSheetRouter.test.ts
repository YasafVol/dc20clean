import { describe, expect, it } from 'vitest';
import type { SavedCharacter } from '../../../lib/types/dataContracts';
import { selectMostRecentlyModifiedCharacter } from './AlternativeCharacterSheetRouter';

function character(id: string, lastModified: string): SavedCharacter {
	return {
		id,
		lastModified,
		completedAt: lastModified,
		createdAt: lastModified
	} as SavedCharacter;
}

describe('selectMostRecentlyModifiedCharacter', () => {
	it('selects the latest saved character without changing the input order', () => {
		const characters = [
			character('older', '2026-01-01T00:00:00.000Z'),
			character('newer', '2026-07-24T00:00:00.000Z')
		];

		expect(selectMostRecentlyModifiedCharacter(characters)?.id).toBe('newer');
		expect(characters.map(({ id }) => id)).toEqual(['older', 'newer']);
	});

	it('returns null for an empty character list', () => {
		expect(selectMostRecentlyModifiedCharacter([])).toBeNull();
	});
});
