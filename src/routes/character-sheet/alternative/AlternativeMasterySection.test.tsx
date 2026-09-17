import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { SavedCharacter } from '../../../lib/types/dataContracts';
import AlternativeMasterySection from './AlternativeMasterySection';

const mockState = vi.hoisted(() => ({
	manaVisible: true,
	metaMagic: false,
	raging: false
}));

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const labels: Record<string, string> = {
				'characterSheet.attrCombatMastery': 'Combat Mastery',
				'characterSheet.attrManaSpendLimit': 'Mana Spend Limit',
				'characterSheet.manaSpendLimitOpenInfo': 'Open Mana Spend Limit rules',
				'characterSheet.manaSpendLimitCloseInfo': 'Close Mana Spend Limit rules',
				'characterSheet.manaSpendLimitIntro': 'Mana Spend Limit introduction',
				'characterSheet.manaSpendLimitRule': 'Mana Spend Limit rule',
				'characterSheet.manaSpendLimitCalculation': 'Combat Mastery calculation',
				'characterSheet.manaSpendLimitExampleHeading': 'Example from the rules',
				'characterSheet.manaSpendLimitExample': 'Level 6 Sorcerer example',
				'characterSheet.manaSpendLimitExceptionHeading': 'Exception: Sorcerer Meta Magic',
				'characterSheet.manaSpendLimitException':
					'MP spent on Meta Magic enhancements does not count toward your Mana Spend Limit. Other MP spent on the spell still counts.',
				'characterSheet.manaSpendLimitMetaMagicChip': 'Meta Magic',
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
		finalMPMax: 4,
		finalCombatMastery: 2,
		skillsData: {
			awareness: 1,
			athletics: 1
		}
	} as SavedCharacter;

	return {
		useCharacterSheet: () => ({
			state: {
				character: {
					...character,
					characterState: {
						ui: { combatToggles: { isRaging: mockState.raging } }
					}
				}
			}
		}),
		useCharacterSheetPresentation: () => ({
			resources: {
				mana: {
					current: mockState.manaVisible ? 4 : 0,
					maximum: mockState.manaVisible ? 4 : 0,
					visible: mockState.manaVisible
				}
			},
			access: { spells: false, maneuvers: false },
			features: { metaMagic: mockState.metaMagic, rage: false }
		}),
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

beforeEach(() => {
	mockState.manaVisible = true;
	mockState.metaMagic = false;
	mockState.raging = false;
});
afterEach(cleanup);

describe('AlternativeMasterySection', () => {
	it('groups real skills and trades with their roll actions', () => {
		const onRoll = vi.fn();
		render(<AlternativeMasterySection onRoll={onRoll} />);
		const sectionText = screen.getByLabelText('Attributes, skills, and trades').textContent ?? '';

		expect(screen.getByText('Combat Mastery')).toBeTruthy();
		expect(screen.getByText('Mana Spend Limit')).toBeTruthy();
		expect(sectionText.indexOf('Mana Spend Limit')).toBeLessThan(sectionText.indexOf('+2'));
		expect(screen.getByText('Prime')).toBeTruthy();
		expect(sectionText.indexOf('Prime')).toBeLessThan(sectionText.indexOf('Combat Mastery'));
		expect(screen.getByRole('button', { name: 'Roll Awareness +5' })).toBeTruthy();
		expect(screen.getByRole('button', { name: 'Roll Athletics +5' })).toBeTruthy();
		expect(screen.getByRole('button', { name: 'Roll Blacksmithing +5' })).toBeTruthy();

		fireEvent.click(screen.getByRole('button', { name: 'Roll MIGHT save +5' }));
		expect(onRoll).toHaveBeenCalledWith('MIGHT SAVE', 5, 'might-save');

		fireEvent.click(screen.getByRole('button', { name: 'Roll Blacksmithing +5' }));
		expect(onRoll).toHaveBeenLastCalledWith('Blacksmithing', 5, 'physical-check');
	});

	it('marks the Might Save with the active Rage advantage source', () => {
		mockState.raging = true;
		const onRoll = vi.fn();
		render(<AlternativeMasterySection onRoll={onRoll} />);

		expect(screen.getByText('ADV (Rage)')).toBeVisible();
		fireEvent.click(screen.getByRole('button', { name: 'Roll MIGHT save +5' }));
		expect(onRoll).toHaveBeenCalledWith('MIGHT SAVE', 5, 'might-save');
	});

	it('opens the Mana Spend Limit rules from the Combat Mastery card', () => {
		render(<AlternativeMasterySection onRoll={vi.fn()} />);

		fireEvent.click(screen.getByRole('button', { name: 'Open Mana Spend Limit rules' }));

		expect(screen.getByRole('dialog', { name: 'Mana Spend Limit' })).toBeTruthy();
		expect(screen.getByText('Mana Spend Limit rule')).toBeTruthy();
		expect(screen.queryByText('Exception: Sorcerer Meta Magic')).toBeNull();

		fireEvent.click(screen.getByRole('button', { name: 'Close Mana Spend Limit rules' }));
		expect(screen.queryByRole('dialog')).toBeNull();
	});

	it('shows the provider-resolved Meta Magic exemption', () => {
		mockState.metaMagic = true;
		render(<AlternativeMasterySection onRoll={vi.fn()} />);

		expect(screen.getByText('Meta Magic')).toBeTruthy();
		expect(
			screen.getByText(
				'MP spent on Meta Magic enhancements does not count toward your Mana Spend Limit. Other MP spent on the spell still counts.'
			)
		).toBeTruthy();

		fireEvent.click(screen.getByRole('button', { name: 'Open Mana Spend Limit rules' }));
		expect(screen.getByText('Exception: Sorcerer Meta Magic')).toBeTruthy();
	});

	it('hides Mana Spend Limit and Meta Magic affordances for characters without Mana', () => {
		mockState.manaVisible = false;
		mockState.metaMagic = true;
		render(<AlternativeMasterySection onRoll={vi.fn()} />);

		expect(screen.getByText('Combat Mastery')).toBeTruthy();
		expect(screen.queryByText('Mana Spend Limit')).toBeNull();
		expect(screen.queryByText('Meta Magic')).toBeNull();
		expect(screen.queryByRole('button', { name: 'Open Mana Spend Limit rules' })).toBeNull();
	});
});
