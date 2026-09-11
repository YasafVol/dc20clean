import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Attacks from './Attacks';

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string, options?: { weapon?: string }) => {
			const translations: Record<string, string> = {
				'characterSheet.attacksNaturalWeapon': 'Natural Weapon',
				'characterSheet.attacksNaturalWeaponMeta': 'Unarmed Strike · Derived'
			};
			if (key === 'characterSheet.attacksViewDetails') {
				return `View details for ${options?.weapon}`;
			}
			return translations[key] ?? key;
		}
	})
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
		const onAttackClick = vi.fn();
		render(<Attacks onAttackClick={onAttackClick} />);

		const row = screen.getByTestId('natural-weapon-attack-row');
		expect(row).toHaveTextContent('Natural Weapon');
		expect(row).toHaveTextContent('Unarmed Strike · Derived');
		expect(within(row).getByTestId('weapon-damage')).toHaveTextContent('1');
		expect(within(row).getByTestId('weapon-heavy-damage')).toHaveTextContent('2');
		expect(within(row).getByTestId('weapon-brutal-damage')).toHaveTextContent('3');
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
		expect(onAttackClick).toHaveBeenCalledWith(expect.any(Object), null);
	});
});
