import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AttackData } from '../../../types';
import { weapons } from '../../../lib/rulesdata/inventoryItems';
import { getAttackPresentation } from '../attackPresentation';
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

		render(
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

		expect(screen.queryByText(/Crit Range/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Crit Damage/i)).not.toBeInTheDocument();
		expect(screen.getByRole('columnheader', { name: 'Hit' })).toBeInTheDocument();
		expect(screen.getByRole('columnheader', { name: 'Heavy Hit (+5)' })).toBeInTheDocument();
		expect(screen.getByRole('columnheader', { name: 'Brutal Hit (+10)' })).toBeInTheDocument();
		expect(screen.getAllByRole('cell').map((cell) => cell.textContent)).toEqual(['1', '2', '4']);
		expect(screen.queryByText('Hit: 1 B/P/S')).not.toBeInTheDocument();
		expect(screen.queryByText(/Attack Bonus/i)).not.toBeInTheDocument();

		const closeButton = screen.getByRole('button', { name: 'Close attack details' });
		expect(getComputedStyle(closeButton).backgroundColor).toBe('rgba(0, 0, 0, 0)');
		expect(getComputedStyle(closeButton).position).toBe('absolute');
	});

	it('shows Hand Axe rules with aligned disclosure chips and nested recovery details', () => {
		const weapon = weapons.find((candidate) => candidate.name === 'Hand Axe');
		expect(weapon).toBeDefined();
		if (!weapon) return;

		const attack: AttackData = {
			id: 'hand-axe',
			weaponName: weapon.name,
			name: weapon.name,
			attackBonus: 0,
			damage: weapon.damage,
			damageType: 'slashing',
			brutalDamage: '',
			heavyHitEffect: ''
		};

		render(
			<AttackPopup
				selectedAttack={{
					attack,
					weapon,
					presentation: getAttackPresentation({ attack, weapon })
				}}
				onClose={vi.fn()}
			/>
		);

		expect(screen.getByText('Easy to hide')).toBeInTheDocument();
		expect(screen.getByText('Can be thrown')).toBeInTheDocument();
		expect(
			screen.getByText(/Drawing the Weapon doesn't provoke Opportunity Attacks/)
		).toBeInTheDocument();
		expect(screen.getByText(/Axe style · Bleed enhancement/)).toBeInTheDocument();
		expect(screen.getByText(/The target makes a Repeated Physical Save/)).toBeInTheDocument();
		expect(screen.getByText(/Bleeding condition & recovery/)).toBeInTheDocument();

		const propertySummary = screen.getByTestId('attack-properties-summary');
		const styleSummary = screen.getByTestId('attack-style-summary');
		expect(getComputedStyle(propertySummary).gridTemplateColumns).toBe(
			getComputedStyle(styleSummary).gridTemplateColumns
		);
		expect(getComputedStyle(screen.getByTestId('attack-properties-chip')).width).toBe(
			getComputedStyle(screen.getByTestId('attack-style-chip')).width
		);
	});
});
