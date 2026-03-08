import { describe, expect, it } from 'vitest';
import { convertSavedCharacterToContext } from './characterToContext';
import type { SavedCharacter } from '../types/dataContracts';

describe('convertSavedCharacterToContext', () => {
	it('maps selected maneuvers to canonical names for level-up rehydration', () => {
		const character = {
			classId: 'rogue',
			level: 2,
			finalMight: 1,
			finalAgility: 2,
			finalCharisma: 0,
			finalIntelligence: 1,
			finalName: 'Test Rogue',
			maneuvers: [
				{
					id: 'maneuver_123',
					name: 'Parry'
				},
				{
					id: 'maneuver_124',
					name: 'Brace'
				}
			]
		} as unknown as SavedCharacter;

		const context = convertSavedCharacterToContext(character);

		expect(context.selectedManeuvers).toEqual(['Parry', 'Brace']);
	});
});
