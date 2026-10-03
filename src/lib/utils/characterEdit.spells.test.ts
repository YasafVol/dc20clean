import { describe, expect, it } from 'vitest';
import fixtures from '../../../e2e/fixtures/save-reports.json';
import { convertCharacterToInProgress } from './characterEdit';
import {
	calculateCharacterWithBreakdowns,
	convertToEnhancedBuildData
} from '../services/enhancedCharacterCalculator';
import { getSpellById } from '../rulesdata/spells-data';
import { matchesSpellSlot } from '../services/spellFiltering';
import type { SavedCharacter } from '../types/dataContracts';

for (const classId of ['cleric', 'wizard'] as const) {
	describe(`${classId} saved-spell restoration`, () => {
		it('restores every saved spell into a real eligible slot so finishing is possible', () => {
			// Put restricted-school spells first to prove restoration is not positional.
			const character = {
				...fixtures[classId],
				spells: [...fixtures[classId].spells].reverse()
			} as unknown as SavedCharacter;
			const restored = convertCharacterToInProgress(character);
			const result = calculateCharacterWithBreakdowns(convertToEnhancedBuildData(restored));
			expect(Object.values(restored.selectedSpells)).toHaveLength(character.spells.length);
			for (const slot of result.spellsKnownSlots) {
				const spell = getSpellById(restored.selectedSpells[slot.id]);
				expect(spell, `Empty real slot ${slot.id}`).toBeDefined();
				expect(matchesSpellSlot(spell!, slot, result.globalMagicProfile)).toBe(true);
			}
		});
	});
}
