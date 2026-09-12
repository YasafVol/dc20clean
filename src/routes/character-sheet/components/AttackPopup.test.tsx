import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AttackData } from '../../../types';
import AttackPopup from './AttackPopup';

afterEach(cleanup);

describe('AttackPopup', () => {
	it('ignores obsolete crit fields on legacy saved attacks', () => {
		const legacyAttack = {
			id: 'legacy-attack',
			weaponName: 'Unarmed Strike',
			name: 'Natural Weapon (Unarmed Strike)',
			attackBonus: 0,
			damage: '1 B/P/S',
			damageType: 'bludgeoning/piercing/slashing',
			brutalDamage: '3 B/P/S',
			heavyHitEffect: '',
			critRange: '20',
			critDamage: '1 B/P/S'
		} as AttackData & { critRange: string; critDamage: string };

		const { container } = render(
			<AttackPopup
				selectedAttack={{
					attack: legacyAttack,
					weapon: null,
					presentation: {
						isSupportedAttack: true,
						isMartialMelee: true,
						conditionalDamageBonus: 0,
						baseDamage: '1 B/P/S',
						heavyDamage: '2 B/P/S',
						brutalDamage: '4 B/P/S',
						damageType: 'bludgeoning/piercing/slashing'
					}
				}}
				onClose={vi.fn()}
			/>
		);

		expect(screen.queryByText('Crit Range:')).not.toBeInTheDocument();
		expect(screen.queryByText('Crit Damage:')).not.toBeInTheDocument();
		expect(screen.getByText('Hit:')).toBeInTheDocument();
		expect(screen.getByText('Heavy Hit:')).toBeInTheDocument();
		expect(screen.getByText('Brutal Hit:')).toBeInTheDocument();
		expect(container).toHaveTextContent('Hit: 1');
		expect(container).toHaveTextContent('Heavy Hit: 2');
		expect(container).toHaveTextContent('Brutal Hit: 4');
		expect(container).not.toHaveTextContent('Hit: 1 B/P/S');
		expect(screen.queryByText('Attack Bonus:')).not.toBeInTheDocument();
		expect(getComputedStyle(screen.getByTestId('attack-damage-type')).marginTop).toBe('12px');

		const closeButton = screen.getByRole('button', { name: 'Close attack details' });
		expect(getComputedStyle(closeButton).backgroundColor).toBe('rgba(0, 0, 0, 0)');
		expect(getComputedStyle(closeButton).position).toBe('absolute');
		expect(['8px', '12px']).toContain(getComputedStyle(closeButton).top);
		expect(['8px', '12px']).toContain(getComputedStyle(closeButton).right);
	});
});
