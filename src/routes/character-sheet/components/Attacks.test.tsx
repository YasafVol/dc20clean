import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Attacks from './Attacks';

vi.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('../hooks/CharacterSheetProvider', () => ({
	useCharacterAttacks: () => [],
	useCharacterInventory: () => ({ items: [] }),
	useCharacterCalculatedData: () => ({ conditionalModifiers: [] }),
	useCharacterSheet: () => ({
		addAttack: vi.fn(),
		removeAttack: vi.fn(),
		updateAttack: vi.fn(),
		state: {
			character: {
				selectedTraitIds: [
					'beastborn_natural_weapon',
					'beastborn_extended_natural_weapon',
					'beastborn_long_limbed',
					'beastborn_natural_projectile',
					'beastborn_natural_weapon_style',
					'beastborn_retractable_natural_weapon',
					'beastborn_rend',
					'beastborn_venomous_natural_weapon'
				],
				characterState: { ui: { activeConditions: {} } }
			}
		}
	})
}));

afterEach(cleanup);

describe('Attacks', () => {
	it('renders Beastborn Natural Weapon as a read-only Unarmed Strike', () => {
		render(<Attacks onAttackClick={vi.fn()} />);

		const row = screen.getByTestId('natural-weapon-attack-row');
		expect(row).toHaveTextContent('Natural Weapon (Unarmed Strike)');
		expect(row).toHaveTextContent('1 B/P/S');
		expect(row).toHaveTextContent('2 B/P/S');
		expect(row).toHaveTextContent('3 B/P/S');
		expect(row).toHaveTextContent('Reach +1 Space');
		expect(row).toHaveTextContent('Reach');
		expect(row).toHaveTextContent('Ranged 10 Spaces');
		expect(row).toHaveTextContent('Concealable');
		expect(row).toHaveTextContent('Natural Weapon Style');
		expect(row).toHaveTextContent('Rend');
		expect(row).toHaveTextContent('Venomous');
		expect(within(row).queryByRole('combobox')).not.toBeInTheDocument();
		expect(within(row).queryByTitle('characterSheet.attacksRemoveWeapon')).not.toBeInTheDocument();
	});
});
