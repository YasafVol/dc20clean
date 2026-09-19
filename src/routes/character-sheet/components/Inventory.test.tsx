import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { InventoryItemData } from '../../../types';
import type { CustomEquipment } from '../../../lib/rulesdata/equipment/schemas';
import Inventory from './Inventory';

const inventoryState = vi.hoisted(() => ({
	items: [
		{
			id: 'test-item',
			itemType: 'Weapon' as const,
			itemName: '',
			count: 1,
			cost: '-',
			isEquipped: false
		}
	] as InventoryItemData[],
	readOnly: false,
	customEquipment: [] as CustomEquipment[],
	updateInventory: vi.fn()
}));

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				'characterSheet.inventoryAddItem': 'Add Item',
				'characterSheet.inventoryPickerTitle': 'Add inventory item',
				'characterSheet.inventoryPickerClose': 'Close inventory picker',
				'characterSheet.inventoryPickerCatalogTitle': 'Item catalog',
				'characterSheet.inventoryPickerCustomTitle': 'Custom items',
				'characterSheet.inventoryPickerListLabel': 'Available inventory items',
				'characterSheet.inventoryPickerSearchLabel': 'Search inventory items',
				'characterSheet.inventoryPickerSearchPlaceholder': 'Search items...',
				'characterSheet.inventoryPickerFilterLabel': 'Filter inventory items by type',
				'characterSheet.inventoryPickerNoMatches': 'No matching items.',
				'characterSheet.inventoryPickerSelectPrompt': 'Select an item.',
				'characterSheet.inventoryPickerSource': 'Inventory item source',
				'characterSheet.inventoryPickerCatalog': 'Catalog',
				'characterSheet.inventoryPickerCustomItems': 'Custom items',
				'characterSheet.inventoryPickerCancel': 'Cancel',
				'characterSheet.inventoryPickerAdd': 'Add item',
				'characterSheet.inventoryPickerQuantity': 'Quantity',
				'characterSheet.inventoryPickerDecreaseQuantity': 'Decrease quantity',
				'characterSheet.inventoryPickerIncreaseQuantity': 'Increase quantity',
				'characterSheet.inventoryPickerEquipNow': 'Equip now',
				'characterSheet.inventoryPickerCustomItem': 'Custom item',
				'characterSheet.inventoryPickerFreeformMeta': 'Create a freeform item',
				'characterSheet.inventoryPickerCustom': 'Custom',
				'characterSheet.inventoryPickerName': 'Name',
				'characterSheet.inventoryPickerNamePlaceholder': 'Enter item name...',
				'characterSheet.inventoryPickerDescription': 'Description / Notes',
				'characterSheet.inventoryPickerDescriptionPlaceholder': 'Describe this item...',
				'characterSheet.inventoryPickerCost': 'Cost',
				'characterSheet.inventoryPickerCostPlaceholder': 'e.g. 5g',
				'characterSheet.inventoryPickerWeapon': 'Weapon',
				'characterSheet.inventoryPickerArmor': 'Armor',
				'characterSheet.inventoryPickerShield': 'Shield',
				'characterSheet.inventoryPickerSupply': 'Adventuring Supply',
				'characterSheet.inventoryPickerSpellFocus': 'Spell Focus',
				'characterSheet.inventoryPickerPotion': 'Potion',
				'characterSheet.inventoryPickerCustomGeneral': 'Custom General Equipment',
				'characterSheet.pickerFilterAll': 'All'
			};
			return translations[key] ?? key;
		}
	})
}));

vi.mock('../../../lib/rulesdata/equipment/storage/equipmentStorage', () => ({
	getAllCustomEquipment: () => inventoryState.customEquipment
}));

vi.mock('../hooks/CharacterSheetProvider', () => ({
	useCharacterInventory: () => ({ items: inventoryState.items }),
	useCharacterSheet: () => ({
		updateInventory: inventoryState.updateInventory,
		readOnly: inventoryState.readOnly
	})
}));

afterEach(() => {
	cleanup();
	inventoryState.items[0] = {
		id: 'test-item',
		itemType: 'Weapon',
		itemName: '',
		count: 1,
		cost: '-',
		isEquipped: false
	};
	inventoryState.readOnly = false;
	inventoryState.customEquipment = [];
	inventoryState.updateInventory.mockReset();
});

describe('Inventory catalog selectors', () => {
	it('sorts weapon names alphabetically', () => {
		render(<Inventory showTitle={false} onItemClick={vi.fn()} />);

		const itemSelect = screen.getByTestId('item-name');
		const names = within(itemSelect)
			.getAllByRole('option')
			.slice(1)
			.map((option) => option.textContent ?? '');

		expect(names).toEqual(
			[...names].sort((left, right) =>
				left.localeCompare(right, undefined, { sensitivity: 'base' })
			)
		);
	});

	it('offers preset spell focuses as a standard inventory type', () => {
		inventoryState.items[0] = {
			...inventoryState.items[0],
			itemType: 'Spell Focus'
		};
		render(<Inventory showTitle={false} onItemClick={vi.fn()} />);

		const typeSelect = screen.getAllByRole('combobox')[0];
		expect(within(typeSelect).getByRole('option', { name: 'Spell Focus' })).toBeInTheDocument();

		const focusNames = within(screen.getByTestId('item-name'))
			.getAllByRole('option')
			.slice(1)
			.map((option) => option.textContent);

		expect(focusNames).toContain('Orb');
		expect(focusNames).toContain('Wand');
	});

	it('adds a populated item through the alternative picker with search and filtering', () => {
		inventoryState.items.length = 0;
		render(
			<Inventory showTitle={false} explicitEditMode useInventoryPicker onItemClick={vi.fn()} />
		);

		fireEvent.click(screen.getByTestId('add-item'));
		expect(inventoryState.updateInventory).not.toHaveBeenCalled();
		const picker = screen.getByTestId('inventory-picker');
		fireEvent.click(within(picker).getByRole('button', { name: 'Adventuring Supply' }));
		for (const option of within(picker).getAllByRole('option')) {
			expect(option).toHaveTextContent('Adventuring Supply');
		}

		fireEvent.change(within(picker).getByRole('searchbox', { name: 'Search inventory items' }), {
			target: { value: 'First Aid Kit' }
		});
		expect(within(picker).getAllByRole('option')).toHaveLength(1);
		fireEvent.click(within(picker).getByRole('option', { name: /First Aid Kit/ }));
		fireEvent.click(within(picker).getByRole('button', { name: 'Increase quantity' }));
		fireEvent.click(within(picker).getByRole('checkbox', { name: 'Equip now' }));
		fireEvent.click(within(picker).getByTestId('inventory-picker-confirm'));

		expect(inventoryState.updateInventory).toHaveBeenCalledWith([
			expect.objectContaining({
				id: expect.stringMatching(/^inventory_/),
				itemType: 'Adventuring Supply',
				itemName: 'First Aid Kit',
				count: 2,
				cost: '-',
				isEquipped: true
			})
		]);
		expect(screen.queryByTestId('inventory-picker')).not.toBeInTheDocument();
	});

	it('preserves inventory search and filtering when the source changes', () => {
		inventoryState.items.length = 0;
		render(
			<Inventory showTitle={false} explicitEditMode useInventoryPicker onItemClick={vi.fn()} />
		);

		fireEvent.click(screen.getByTestId('add-item'));
		const picker = screen.getByTestId('inventory-picker');
		const search = within(picker).getByRole('searchbox', { name: 'Search inventory items' });
		const weaponFilter = within(picker).getByRole('button', { name: 'Weapon' });
		fireEvent.change(search, { target: { value: 'Hand' } });
		fireEvent.click(weaponFilter);
		fireEvent.click(within(picker).getByRole('button', { name: 'Custom items' }));

		expect(search).toHaveValue('Hand');
		expect(weaponFilter).toHaveAttribute('aria-pressed', 'true');
		expect(within(picker).queryAllByRole('option')).toHaveLength(0);

		fireEvent.click(within(picker).getByRole('button', { name: 'Catalog' }));
		expect(search).toHaveValue('Hand');
		expect(weaponFilter).toHaveAttribute('aria-pressed', 'true');
		expect(within(picker).getByRole('option', { name: /Hand Axe/ })).toBeVisible();
	});

	it('creates a freeform custom item only after its required name is entered', () => {
		inventoryState.items.length = 0;
		render(
			<Inventory showTitle={false} explicitEditMode useInventoryPicker onItemClick={vi.fn()} />
		);

		fireEvent.click(screen.getByTestId('add-item'));
		const picker = screen.getByTestId('inventory-picker');
		fireEvent.click(within(picker).getByRole('button', { name: 'Custom items' }));
		expect(within(picker).getByTestId('inventory-picker-confirm')).toBeDisabled();

		fireEvent.change(within(picker).getByRole('textbox', { name: 'Name' }), {
			target: { value: 'Cipher Key' }
		});
		fireEvent.change(within(picker).getByRole('textbox', { name: 'Description / Notes' }), {
			target: { value: 'Opens the archive lock.' }
		});
		fireEvent.change(within(picker).getByRole('textbox', { name: 'Cost' }), {
			target: { value: '12g' }
		});
		fireEvent.click(within(picker).getByTestId('inventory-picker-confirm'));

		expect(inventoryState.updateInventory).toHaveBeenCalledWith([
			expect.objectContaining({
				itemType: 'Custom',
				itemName: 'Cipher Key',
				count: 1,
				cost: '12g',
				isEquipped: false,
				description: 'Opens the archive lock.'
			})
		]);
	});

	it('adds saved general equipment with its description and cost', () => {
		inventoryState.items.length = 0;
		inventoryState.customEquipment = [
			{
				id: 'custom-general-climbing-kit',
				category: 'general',
				name: 'Climbing Kit',
				description: 'Rope, pitons, and a compact hammer.',
				cost: '8g',
				properties: [],
				pointsSpent: 0,
				maxPoints: 0,
				effects: [],
				createdAt: '2026-09-19T00:00:00.000Z',
				updatedAt: '2026-09-19T00:00:00.000Z'
			}
		];
		render(
			<Inventory showTitle={false} explicitEditMode useInventoryPicker onItemClick={vi.fn()} />
		);

		fireEvent.click(screen.getByTestId('add-item'));
		const picker = screen.getByTestId('inventory-picker');
		fireEvent.click(within(picker).getByRole('button', { name: 'Custom items' }));
		fireEvent.click(within(picker).getByRole('button', { name: 'Custom General Equipment' }));
		fireEvent.click(within(picker).getByRole('option', { name: /Climbing Kit/ }));
		expect(within(picker).getByText('Rope, pitons, and a compact hammer.')).toBeInTheDocument();
		fireEvent.click(within(picker).getByTestId('inventory-picker-confirm'));

		expect(inventoryState.updateInventory).toHaveBeenCalledWith([
			expect.objectContaining({
				itemType: 'Custom',
				itemName: 'Climbing Kit',
				cost: '8g',
				customEquipmentId: 'custom-general-climbing-kit',
				customEquipmentCategory: 'general'
			})
		]);
	});
});

it('renders inventory values without mutation controls in read-only mode', () => {
	inventoryState.readOnly = true;
	inventoryState.items[0] = {
		...inventoryState.items[0],
		itemName: 'Hand Axe',
		isEquipped: true
	};

	render(<Inventory showTitle={false} onItemClick={vi.fn()} explicitEditMode />);

	expect(screen.queryByTestId('add-item')).not.toBeInTheDocument();
	expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
	expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
	expect(screen.getByRole('checkbox', { name: 'item-equipped-1' })).toBeDisabled();
	expect(screen.queryByRole('button', { name: 'Edit inventory item' })).not.toBeInTheDocument();
});
