import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
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
	],
	readOnly: false
}));

vi.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('../../../lib/rulesdata/equipment/storage/equipmentStorage', () => ({
	getAllCustomEquipment: () => []
}));

vi.mock('../hooks/CharacterSheetProvider', () => ({
	useCharacterInventory: () => ({ items: inventoryState.items }),
	useCharacterSheet: () => ({ updateInventory: vi.fn(), readOnly: inventoryState.readOnly })
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
