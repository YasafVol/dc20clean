import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { AttackData, InventoryItemData } from '../../../types';
import { buildCustomWeapon } from '../../../lib/rulesdata/equipment/customWeapon';
import { createAttackDataFromCustomWeapon } from '../weaponAttackData';
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
		t: (key: string, options?: { weapon?: string; used?: number; max?: number }) => {
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
				'characterSheet.weaponPickerAdd': 'Add weapon',
				'characterSheet.weaponPickerSearchLabel': 'Search weapons',
				'characterSheet.weaponPickerSearchPlaceholder': 'Search weapons...',
				'characterSheet.weaponPickerFilterLabel': 'Filter weapons by type',
				'characterSheet.weaponPickerFilterMelee': 'Melee',
				'characterSheet.weaponPickerFilterRanged': 'Ranged',
				'characterSheet.weaponPickerNoMatches': 'No matching weapons.',
				'characterSheet.customWeaponSource': 'Custom',
				'characterSheet.customWeaponTitle': 'Create custom weapon',
				'characterSheet.customWeaponCreateAction': 'Create custom weapon',
				'characterSheet.customWeaponClose': 'Close custom weapon builder',
				'characterSheet.customWeaponProgress': 'Custom weapon creation progress',
				'characterSheet.customWeaponTypeHelp': 'Choose the weapon type.',
				'characterSheet.customWeaponStyleHelp': 'Choose any weapon style.',
				'characterSheet.customWeaponDamageHelp': 'Choose a damage type.',
				'characterSheet.customWeaponPropertiesHelp': 'Choose weapon properties.',
				'characterSheet.customWeaponDamageType': 'Damage type',
				'characterSheet.customWeaponNextStyle': 'Next: Style',
				'characterSheet.customWeaponNextProperties': 'Next: Properties',
				'characterSheet.customWeaponBack': 'Back',
				'characterSheet.customWeaponName': 'Weapon name',
				'characterSheet.customWeaponNamePlaceholder': 'Name this weapon...',
				'characterSheet.customWeaponScopeHelp': 'Adds an attack only.',
				'characterSheet.customWeaponPropertyPoints': `Property points: ${options?.used} / ${options?.max}`,
				'characterSheet.customWeaponAutomaticProperties': 'Automatic properties (0 points)',
				'characterSheet.customWeaponOneHanded': 'One-Handed',
				'characterSheet.customWeaponRemoveTwoHanded': 'Remove Two-Handed · 1 point',
				'characterSheet.customWeaponRestoreTwoHanded': 'Restore Two-Handed · refund 1 point',
				'characterSheet.customWeaponSecondaryStyle': 'Second style (Multi-Faceted)',
				'characterSheet.customWeaponSecondaryDamageType': 'Second style damage type',
				'characterSheet.customWeaponPreviewName': 'Custom weapon preview',
				'characterSheet.customWeaponLivePreview': 'Live preview',
				'characterSheet.customWeaponPreviewPrompt': 'Choose a type and style to preview.',
				'characterSheet.customWeaponReviewHelp': 'Review the weapon.',
				'characterSheet.customWeaponReviewType': 'Type',
				'characterSheet.customWeaponReviewStyle': 'Style',
				'characterSheet.customWeaponReviewDamage': 'Damage',
				'characterSheet.customWeaponReviewProperties': 'Properties',
				'characterSheet.customWeaponStepType': 'Type',
				'characterSheet.customWeaponStepStyle': 'Style',
				'characterSheet.customWeaponStepDamage': 'Damage type',
				'characterSheet.customWeaponStepProperties': 'Properties',
				'characterSheet.customWeaponStepReview': 'Review',
				'characterSheet.customWeaponNotStarted': 'Not started',
				'characterSheet.customWeaponNone': 'None',
				'characterSheet.customWeaponNameAndCreate': 'Name and create',
				'characterSheet.customWeaponNext': 'Next',
				'characterSheet.customWeaponCreate': 'Create weapon',
				'characterSheet.customWeaponAdd': 'Add custom weapon',
				'characterSheet.pickerFilterAll': 'All'
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

	it('searches and filters the weapon catalog', () => {
		render(<Attacks onAttackClick={vi.fn()} explicitEditMode useWeaponPicker />);
		fireEvent.click(screen.getByTestId('add-weapon'));
		const picker = screen.getByTestId('weapon-picker');
		fireEvent.click(within(picker).getByRole('button', { name: 'Full list' }));

		fireEvent.change(within(picker).getByRole('searchbox', { name: 'Search weapons' }), {
			target: { value: 'Longbow' }
		});
		expect(within(picker).getAllByRole('option')).toHaveLength(1);
		expect(within(picker).getByRole('option', { name: /Longbow/ })).toBeInTheDocument();

		fireEvent.change(within(picker).getByRole('searchbox', { name: 'Search weapons' }), {
			target: { value: '' }
		});
		fireEvent.click(within(picker).getByRole('button', { name: 'Ranged' }));
		expect(within(picker).getAllByRole('option').length).toBeGreaterThan(1);
		for (const option of within(picker).getAllByRole('option')) {
			expect(option).toHaveTextContent('Ranged');
		}
	});

	it('preserves weapon search and filtering when the source changes', () => {
		mockSheet.inventoryItems.push({
			id: 'inventory-hand-axe',
			itemType: 'Weapon',
			itemName: 'Hand Axe',
			count: 1
		});
		render(<Attacks onAttackClick={vi.fn()} explicitEditMode useWeaponPicker />);
		fireEvent.click(screen.getByTestId('add-weapon'));

		const picker = screen.getByTestId('weapon-picker');
		const search = within(picker).getByRole('searchbox', { name: 'Search weapons' });
		const meleeFilter = within(picker).getByRole('button', { name: 'Melee' });
		fireEvent.change(search, { target: { value: 'Hand' } });
		fireEvent.click(meleeFilter);
		fireEvent.click(within(picker).getByRole('button', { name: 'Full list' }));

		expect(search).toHaveValue('Hand');
		expect(meleeFilter).toHaveAttribute('aria-pressed', 'true');
		expect(within(picker).getByRole('option', { name: /Hand Axe/ })).toBeVisible();

		fireEvent.click(within(picker).getByRole('button', { name: 'Inventory' }));
		expect(search).toHaveValue('Hand');
		expect(meleeFilter).toHaveAttribute('aria-pressed', 'true');
		expect(within(picker).getByRole('option', { name: /Hand Axe/ })).toBeVisible();
	});

	it('creates a character-local custom weapon through the v0.10.5 rule flow', () => {
		render(<Attacks onAttackClick={vi.fn()} explicitEditMode useWeaponPicker />);
		fireEvent.click(screen.getByTestId('add-weapon'));
		const picker = screen.getByTestId('weapon-picker');

		fireEvent.click(within(picker).getByRole('button', { name: 'Create custom weapon' }));
		const builder = screen.getByTestId('custom-weapon-builder');
		expect(screen.queryByTestId('weapon-picker')).not.toBeInTheDocument();
		expect(within(builder).getByText('Choose the weapon type.')).toBeVisible();
		expect(within(builder).queryByText('Choose any weapon style.')).not.toBeInTheDocument();
		fireEvent.click(within(builder).getByRole('button', { name: /^Melee Weapon/ }));
		fireEvent.click(within(builder).getByRole('button', { name: 'Next' }));
		expect(within(builder).queryByText('Choose the weapon type.')).not.toBeInTheDocument();
		expect(within(builder).getByText('Choose any weapon style.')).toBeVisible();
		expect(within(builder).getByRole('button', { name: /^Bow/ })).toBeVisible();
		fireEvent.click(within(builder).getByRole('button', { name: /^Axe/ }));
		fireEvent.click(within(builder).getByRole('button', { name: 'Next' }));
		expect(within(builder).getByRole('button', { name: /^2\.5 Damage type/ })).toBeVisible();
		expect(within(builder).getByText('Choose a damage type.')).toBeVisible();
		fireEvent.click(within(builder).getByRole('button', { name: 'Next' }));
		fireEvent.click(within(builder).getByRole('button', { name: /^Guard/ }));
		fireEvent.click(within(builder).getByRole('button', { name: /^Impact/ }));
		fireEvent.click(within(builder).getByRole('button', { name: 'Next' }));
		fireEvent.change(within(builder).getByRole('textbox', { name: 'Weapon name' }), {
			target: { value: 'Rift Hook' }
		});
		fireEvent.click(within(builder).getByRole('button', { name: 'Create weapon' }));

		expect(mockSheet.addAttack).toHaveBeenCalledWith(
			expect.objectContaining({
				weaponName: 'Rift Hook',
				name: 'Rift Hook',
				damage: '1 S',
				damageType: 'slashing',
				customWeapon: expect.objectContaining({
					category: 'weapon',
					name: 'Rift Hook',
					weaponType: 'melee',
					style: 'axe',
					properties: ['guard', 'impact'],
					pointsSpent: 2,
					maxPoints: 2
				})
			})
		);
		expect(screen.queryByTestId('weapon-picker')).not.toBeInTheDocument();
	});

	it('returns from the separate custom builder without resetting picker search and filters', () => {
		render(<Attacks onAttackClick={vi.fn()} explicitEditMode useWeaponPicker />);
		fireEvent.click(screen.getByTestId('add-weapon'));
		const picker = screen.getByTestId('weapon-picker');
		fireEvent.click(within(picker).getByRole('button', { name: 'Full list' }));
		fireEvent.change(within(picker).getByRole('searchbox', { name: 'Search weapons' }), {
			target: { value: 'Long' }
		});
		fireEvent.click(within(picker).getByRole('button', { name: 'Ranged' }));

		fireEvent.click(within(picker).getByRole('button', { name: 'Create custom weapon' }));
		const builder = screen.getByTestId('custom-weapon-builder');
		fireEvent.click(within(builder).getByRole('button', { name: 'Cancel' }));

		const restoredPicker = screen.getByTestId('weapon-picker');
		expect(within(restoredPicker).getByRole('searchbox', { name: 'Search weapons' })).toHaveValue(
			'Long'
		);
		expect(within(restoredPicker).getByRole('button', { name: 'Ranged' })).toHaveAttribute(
			'aria-pressed',
			'true'
		);
		expect(within(restoredPicker).getByRole('button', { name: 'Full list' })).toHaveAttribute(
			'aria-pressed',
			'true'
		);
	});

	it('restores a custom weapon attack from its embedded rules snapshot', () => {
		const customWeapon = buildCustomWeapon({
			id: 'custom-weapon-rift-hook',
			name: 'Rift Hook',
			weaponType: 'melee',
			style: 'axe',
			damageType: 'slashing',
			properties: ['guard', 'impact']
		});
		mockSheet.attacks.push(
			createAttackDataFromCustomWeapon(customWeapon, 'attack-custom-rift-hook')
		);
		const onAttackClick = vi.fn();
		render(<Attacks onAttackClick={onAttackClick} explicitEditMode />);

		expect(screen.getByText('Rift Hook')).toBeVisible();
		expect(screen.getByTestId('weapon-damage')).toHaveTextContent('1');
		expect(screen.getByTestId('weapon-heavy-damage')).toHaveTextContent('3');
		fireEvent.click(screen.getByRole('button', { name: 'View details for Rift Hook' }));
		expect(onAttackClick).toHaveBeenCalledWith(
			expect.objectContaining({ customWeapon: expect.objectContaining({ id: customWeapon.id }) }),
			expect.objectContaining({ name: 'Rift Hook', properties: ['Guard', 'Impact'] }),
			expect.objectContaining({ isSupportedAttack: true })
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
