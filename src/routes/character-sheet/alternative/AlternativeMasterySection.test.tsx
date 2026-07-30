import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { SavedCharacter } from '../../../lib/types/dataContracts';
import AlternativeMasterySection from './AlternativeMasterySection';

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const labels: Record<string, string> = {
				'characterSheet.attrCombatMastery': 'Combat Mastery',
				'characterSheet.attrPrime': 'Prime',
				'characterSheet.attrMight': 'MIGHT',
				'characterSheet.attrAgility': 'AGILITY',
				'characterSheet.attrCharisma': 'CHARISMA',
				'characterSheet.attrIntelligence': 'INTELLIGENCE',
				'characterSheet.attrSave': 'SAVE'
			};
			return labels[key] ?? key;
		}
	})
}));

vi.mock('../hooks/CharacterSheetProvider', () => {
	const character = {
		id: 'test-character',
		finalMight: 3,
		finalAgility: 2,
		finalCharisma: 1,
		finalIntelligence: 0,
		finalSaveMight: 5,
		finalSaveAgility: 4,
		finalSaveCharisma: 3,
		finalSaveIntelligence: 2,
		finalPrimeModifierValue: 3,
		finalCombatMastery: 2,
		skillsData: {
			awareness: 1,
			athletics: 1
		}
	} as SavedCharacter;

	return {
		useCharacterSheet: () => ({ state: { character } }),
		useCharacterCalculatedData: () => null,
		useCharacterTrades: () => [
			{
				id: 'blacksmithing',
				name: 'Blacksmithing',
				proficiency: 1,
				primaryAttribute: 'might',
				bonus: 5,
				bonuses: [{ attribute: 'might', total: 5 }]
			}
		]
	};
});

afterEach(cleanup);

describe('AlternativeMasterySection', () => {
	it('groups real skills and trades with their roll actions', () => {
		const onRoll = vi.fn();
		render(<AlternativeMasterySection onRoll={onRoll} />);
		const sectionText = screen.getByLabelText('Attributes, skills, and trades').textContent ?? '';

		expect(screen.getByText('Combat Mastery')).toBeTruthy();
		expect(screen.getByText('Prime')).toBeTruthy();
		expect(sectionText.indexOf('Prime')).toBeLessThan(sectionText.indexOf('Combat Mastery'));
		expect(screen.getByRole('button', { name: 'Roll Awareness +5' })).toBeTruthy();
		expect(screen.getByRole('button', { name: 'Roll Athletics +5' })).toBeTruthy();
		expect(screen.getByRole('button', { name: 'Roll Blacksmithing +5' })).toBeTruthy();

		fireEvent.click(screen.getByRole('button', { name: 'Roll MIGHT save +5' }));
		expect(onRoll).toHaveBeenCalledWith('MIGHT SAVE', 5, 'physical-save');

		fireEvent.click(screen.getByRole('button', { name: 'Roll Blacksmithing +5' }));
		expect(onRoll).toHaveBeenLastCalledWith('Blacksmithing', 5, 'physical-check');
	});
});
