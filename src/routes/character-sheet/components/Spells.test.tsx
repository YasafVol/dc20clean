import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import type { SpellData } from '../../../types';
import { ALL_SPELLS } from '../../../lib/rulesdata/spells-data';
import type { GlobalMagicProfile, SpellsKnownSlot } from '../../../lib/types/effectSystem';
import Spells from './Spells';

interface MockCalculation {
	spellsKnownSlots: SpellsKnownSlot[];
	globalMagicProfile: GlobalMagicProfile;
	stats: { finalAttackSpellCheck: number };
	grantedAbilities: [];
}

const fireball = ALL_SPELLS.find((spell) => spell.name === 'Fireball');
if (!fireball) throw new Error('Fireball fixture is missing');

const mockSheet = vi.hoisted(() => ({
	spells: [] as SpellData[],
	calculation: {
		spellsKnownSlots: [],
		globalMagicProfile: { sources: [], schools: [], tags: [] },
		stats: { finalAttackSpellCheck: 0 },
		grantedAbilities: []
	} as MockCalculation,
	addSpell: vi.fn(),
	removeSpell: vi.fn(),
	updateSpell: vi.fn()
}));

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				'characterSheet.spellPickerTitle': 'Add spell',
				'characterSheet.spellPickerClose': 'Close spell picker',
				'characterSheet.spellPickerAllowedSpells': 'Allowed spells',
				'characterSheet.spellPickerAllSpells': 'All spells',
				'characterSheet.spellPickerListLabel': 'Available spells',
				'characterSheet.spellPickerEmptyAllowed': 'No matching spells.',
				'characterSheet.spellPickerSelectPrompt': 'Select a spell.',
				'characterSheet.spellPickerSource': 'Spell availability',
				'characterSheet.spellPickerAllowed': 'Allowed spells',
				'characterSheet.spellPickerAll': 'All spells',
				'characterSheet.spellPickerCancel': 'Cancel',
				'characterSheet.spellPickerAdd': 'Add spell',
				'characterSheet.spellPickerSources': 'Sources',
				'characterSheet.spellPickerSchool': 'School',
				'characterSheet.spellPickerTags': 'Tags',
				'characterSheet.spellPickerCost': 'Cost',
				'characterSheet.spellPickerRange': 'Range',
				'characterSheet.spellPickerDuration': 'Duration',
				'characterSheet.spellPickerEffects': 'Effects',
				'characterSheet.spellPickerPassive': 'Spell passive',
				'characterSheet.spellPickerEnhancements': 'Enhancements',
				'characterSheet.spellPickerSustained': 'Sustained',
				'characterSheet.spellsNoSpellsSelected': 'No spells selected.'
			};
			return translations[key] ?? key;
		}
	})
}));

vi.mock('../hooks/CharacterSheetProvider', () => ({
	useCharacterSpells: () => mockSheet.spells,
	useCharacterCalculatedData: () => mockSheet.calculation,
	useCharacterSheet: () => ({
		addSpell: mockSheet.addSpell,
		removeSpell: mockSheet.removeSpell,
		updateSpell: mockSheet.updateSpell,
		state: {
			character: {
				id: 'character-test',
				finalAttackSpellCheck: 0
			}
		}
	})
}));

const renderAlternativeSpells = () =>
	render(
		<MemoryRouter>
			<Spells onSpellClick={vi.fn()} useSpellPicker />
		</MemoryRouter>
	);

afterEach(cleanup);

beforeEach(() => {
	mockSheet.spells.length = 0;
	mockSheet.calculation = {
		spellsKnownSlots: [
			{
				id: 'fireball-slot',
				type: 'spell',
				sourceName: 'Test spell slot',
				isGlobal: false,
				specificRestrictions: { exactSpellId: fireball.id }
			}
		],
		globalMagicProfile: { sources: [], schools: [], tags: [] },
		stats: { finalAttackSpellCheck: 0 },
		grantedAbilities: []
	};
	mockSheet.addSpell.mockReset();
	mockSheet.removeSpell.mockReset();
	mockSheet.updateSpell.mockReset();
});

describe('alternative spell picker', () => {
	it('uses the compact catalog toolbar', () => {
		renderAlternativeSpells();

		expect(screen.getByRole('link', { name: 'Spellbook' })).toHaveAttribute('href', '/spellbook');
		expect(screen.getByText('School')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Expand all' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Collapse all' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Add Spell' })).toBeInTheDocument();
		expect(screen.queryByText('Review Spellbook')).not.toBeInTheDocument();
	});

	it('adds a populated catalog spell without creating a blank row first', () => {
		renderAlternativeSpells();
		fireEvent.click(screen.getByTestId('add-spell'));

		expect(mockSheet.addSpell).not.toHaveBeenCalled();
		const picker = screen.getByTestId('spell-picker');
		expect(within(picker).getByRole('option', { name: /Fireball/ })).toHaveAttribute(
			'aria-selected',
			'true'
		);
		expect(within(picker).getByText('Sources')).toBeInTheDocument();
		expect(within(picker).getByText('Enhancements')).toBeInTheDocument();

		fireEvent.click(within(picker).getByTestId('spell-picker-confirm'));

		expect(mockSheet.addSpell).toHaveBeenCalledTimes(1);
		expect(mockSheet.addSpell).toHaveBeenCalledWith(
			expect.objectContaining({
				id: expect.stringMatching(/^spell_/),
				spellName: fireball.name,
				school: fireball.school,
				cost: fireball.cost,
				range: fireball.range,
				duration: fireball.duration,
				effects: fireball.effects,
				enhancements: fireball.enhancements
			})
		);
		expect(screen.queryByTestId('spell-picker')).not.toBeInTheDocument();
	});

	it('switches from the next-slot rules to the alphabetized full catalog', () => {
		renderAlternativeSpells();
		fireEvent.click(screen.getByTestId('add-spell'));

		const picker = screen.getByTestId('spell-picker');
		expect(within(picker).getAllByRole('option')).toHaveLength(1);
		fireEvent.click(within(picker).getByRole('button', { name: 'All spells' }));

		const optionNames = within(picker)
			.getAllByRole('option')
			.map((option) => option.firstElementChild?.firstElementChild?.textContent ?? '');
		expect(optionNames.length).toBeGreaterThan(1);
		expect(optionNames).toEqual(
			[...optionNames].sort((left, right) =>
				left.localeCompare(right, undefined, { sensitivity: 'base' })
			)
		);
	});
});
