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
				selectedTraitIds: ['beastborn_natural_weapon'],
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
		expect(within(row).queryByRole('combobox')).not.toBeInTheDocument();
		expect(within(row).queryByTitle('characterSheet.attacksRemoveWeapon')).not.toBeInTheDocument();
	});
});
