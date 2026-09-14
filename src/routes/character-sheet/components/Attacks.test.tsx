import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { AttackData, InventoryItemData } from '../../../types';
import Attacks from './Attacks';

const mockSheet = vi.hoisted(() => ({
	attacks: [] as AttackData[],
	inventoryItems: [] as InventoryItemData[],
	selectedTraitIds: [] as string[],
	readOnly: false,
	addAttack: vi.fn(),
	removeAttack: vi.fn(),
	updateAttack: vi.fn()
}));

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string, options?: { weapon?: string }) => {
			const translations: Record<string, string> = {
				'characterSheet.attacksNaturalWeapon': 'Natural Weapon',
				'characterSheet.attacksNaturalWeaponMeta': 'Unarmed Strike · Derived',
				'characterSheet.attacksAddWeapon': 'Add Weapon',
				'characterSheet.weaponPickerTitle': 'Add weapon',
				'characterSheet.weaponPickerClose': 'Close weapon picker',
				'characterSheet.weaponPickerInventoryWeapons': 'Inventory weapons',
				'characterSheet.weaponPickerCatalogWeapons': 'Full weapon list',
				'characterSheet.weaponPickerListLabel': 'Available weapons',
				'characterSheet.weaponPickerEmptyInventory': 'No standard weapons are in your inventory.',
				'characterSheet.weaponPickerSelectPrompt': 'Select a weapon.',
				'characterSheet.weaponPickerSource': 'Weapon source',
				'characterSheet.weaponPickerInventory': 'Inventory',
				'characterSheet.weaponPickerFullList': 'Full list',
				'characterSheet.weaponPickerCancel': 'Cancel',
				'characterSheet.weaponPickerAdd': 'Add weapon'
			};
			if (key === 'characterSheet.attacksViewDetails') {
				return `View details for ${options?.weapon}`;
			}
			return translations[key] ?? key;
		}
	})
}));

vi.mock('../hooks/CharacterSheetProvider', () => ({
	useCharacterAttacks: () => mockSheet.attacks,
	useCharacterInventory: () => ({ items: mockSheet.inventoryItems }),
	useCharacterCalculatedData: () => ({ conditionalModifiers: [] }),
	useCharacterSheet: () => ({
		addAttack: mockSheet.addAttack,
		removeAttack: mockSheet.removeAttack,
		updateAttack: mockSheet.updateAttack,
		state: {
			character: {
				selectedTraitIds: mockSheet.selectedTraitIds,
				characterState: { ui: { activeConditions: {} } }
			}
		},
		readOnly: mockSheet.readOnly
	})
}));

afterEach(cleanup);

beforeEach(() => {
	mockSheet.attacks.length = 0;
	mockSheet.inventoryItems.length = 0;
	mockSheet.selectedTraitIds.length = 0;
	mockSheet.readOnly = false;
	mockSheet.addAttack.mockReset();
	mockSheet.removeAttack.mockReset();
	mockSheet.updateAttack.mockReset();
});

describe('Attacks', () => {
	it('renders Beastborn Natural Weapon as a read-only Unarmed Strike', () => {
		mockSheet.selectedTraitIds.push(
			'beastborn_natural_weapon',
			'orc_brutal_strikes',
			'beastborn_extended_natural_weapon',
			'beastborn_long_limbed',
			'beastborn_natural_projectile',
			'beastborn_natural_weapon_style',
			'beastborn_retractable_natural_weapon',
			'beastborn_rend',
			'beastborn_venomous_natural_weapon'
		);
		const onAttackClick = vi.fn();
		render(<Attacks onAttackClick={onAttackClick} />);

		const row = screen.getByTestId('natural-weapon-attack-row');
		expect(row).toHaveTextContent('Natural Weapon');
		expect(row).toHaveTextContent('Unarmed Strike · Derived');
		expect(within(row).getByTestId('weapon-damage')).toHaveTextContent('1');
		expect(within(row).getByTestId('weapon-heavy-damage')).toHaveTextContent('2');
		expect(within(row).getByTestId('weapon-brutal-damage')).toHaveTextContent('4');
		expect(within(row).getByTestId('weapon-damage-type')).toHaveTextContent('B / P / S');
		expect(within(row).getByTestId('weapon-damage-type')).toHaveAccessibleName(
			'bludgeoning/piercing/slashing damage'
		);
		expect(row).toHaveTextContent('Reach +1 Space');
		expect(row).toHaveTextContent('Reach');
		expect(row).toHaveTextContent('Ranged 10 Spaces');
		expect(row).toHaveTextContent('Concealable');
		expect(row).toHaveTextContent('Natural Weapon Style');
		expect(row).toHaveTextContent('Rend');
		expect(row).toHaveTextContent('Venomous');
		expect(within(row).queryByRole('combobox')).not.toBeInTheDocument();
		expect(within(row).queryByTitle('characterSheet.attacksRemoveWeapon')).not.toBeInTheDocument();
		fireEvent.click(within(row).getByRole('button', { name: 'View details for Natural Weapon' }));
		expect(onAttackClick).toHaveBeenCalledWith(
			expect.any(Object),
			null,
			expect.objectContaining({
				baseDamage: '1 B/P/S',
				heavyDamage: '2 B/P/S',
				brutalDamage: '4 B/P/S'
			})
		);
	});

	it('sorts catalog weapons alphabetically', () => {
		mockSheet.attacks.push({
			id: 'attack-new',
			weaponName: '',
			name: '',
			attackBonus: 0,
			damage: '',
			damageType: 'slashing',
			brutalDamage: '',
			heavyHitEffect: ''
		});

		render(<Attacks onAttackClick={vi.fn()} />);
		fireEvent.click(screen.getByLabelText('characterSheet.attacksShowAllWeapons'));

		const optionValues = within(screen.getByTestId('weapon-name'))
			.getAllByRole('option')
			.map((option) => (option as HTMLOptionElement).value)
			.filter(Boolean);

		expect(optionValues).toEqual(
			[...optionValues].sort((left, right) =>
				left.localeCompare(right, undefined, { sensitivity: 'base' })
			)
		);
	});

	it('adds a populated weapon from the alternative-sheet picker without a blank row', () => {
		mockSheet.inventoryItems.push({
			id: 'inventory-hand-axe',
			itemType: 'Weapon',
			itemName: 'Hand Axe',
			count: 1
		});

		render(<Attacks onAttackClick={vi.fn()} explicitEditMode useWeaponPicker />);

		expect(screen.queryByLabelText('characterSheet.attacksShowAllWeapons')).not.toBeInTheDocument();
		fireEvent.click(screen.getByTestId('add-weapon'));

		const picker = screen.getByTestId('weapon-picker');
		expect(within(picker).getByRole('option', { name: /Hand Axe/ })).toHaveAttribute(
			'aria-selected',
			'true'
		);
		expect(within(picker).getByText('Damage calculations')).toBeInTheDocument();
		fireEvent.click(within(picker).getByTestId('weapon-picker-confirm'));

		expect(mockSheet.addAttack).toHaveBeenCalledTimes(1);
		expect(mockSheet.addAttack).toHaveBeenCalledWith(
			expect.objectContaining({
				id: expect.stringMatching(/^attack_/),
				weaponName: 'Hand Axe',
				name: 'Hand Axe',
				damage: '1 S',
				damageType: 'slashing'
			})
		);
		expect(screen.queryByTestId('weapon-picker')).not.toBeInTheDocument();
	});

	it('switches the picker to the alphabetized full catalog', () => {
		render(<Attacks onAttackClick={vi.fn()} explicitEditMode useWeaponPicker />);
		fireEvent.click(screen.getByTestId('add-weapon'));

		const picker = screen.getByTestId('weapon-picker');
		expect(within(picker).getByText('No standard weapons are in your inventory.')).toBeVisible();
		fireEvent.click(within(picker).getByRole('button', { name: 'Full list' }));

		const optionNames = within(picker)
			.getAllByRole('option')
			.map((option) => option.textContent?.split(' · ')[0] ?? '');
		expect(optionNames).toEqual(
			[...optionNames].sort((left, right) =>
				left.localeCompare(right, undefined, { sensitivity: 'base' })
			)
		);
	});

	it('keeps the info action after the row edit action', () => {
		mockSheet.attacks.push({
			id: 'attack-hand-axe',
			weaponName: 'Hand Axe',
			name: 'Hand Axe',
			attackBonus: 0,
			damage: '1 S',
			damageType: 'slashing',
			brutalDamage: '3 S',

			heavyHitEffect: ''
		});
		mockSheet.inventoryItems.push({
			id: 'inventory-hand-axe',
			itemType: 'Weapon',
			itemName: 'Hand Axe',
			count: 1
		});

		render(<Attacks onAttackClick={vi.fn()} explicitEditMode />);

		const editAction = screen.getByRole('button', { name: 'Edit weapon' });
		const infoAction = screen.getByRole('button', { name: 'View details for Hand Axe' });
		expect(editAction.compareDocumentPosition(infoAction)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
		expect(window.getComputedStyle(infoAction).borderTopWidth).toBe('0px');
	});

	it('suppresses mutation controls while keeping attack details available in read-only mode', () => {
		mockSheet.readOnly = true;
		mockSheet.attacks.push({
			id: 'attack-hand-axe',
			weaponName: 'Hand Axe',
			name: 'Hand Axe',
			attackBonus: 0,
			damage: '1 S',
			damageType: 'slashing',
			brutalDamage: '3 S',
			heavyHitEffect: ''
		});
		mockSheet.inventoryItems.push({
			id: 'inventory-hand-axe',
			itemType: 'Weapon',
			itemName: 'Hand Axe',
			count: 1
		});

		render(<Attacks onAttackClick={vi.fn()} explicitEditMode />);

		expect(screen.queryByTestId('add-weapon')).not.toBeInTheDocument();
		expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Edit weapon' })).not.toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'View details for Hand Axe' })).toBeInTheDocument();
	});
});
