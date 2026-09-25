import { describe, expect, it } from 'vitest';
import { buildCustomWeapon, calculateRulebookPropertyPoints } from './customWeapon';

describe('custom weapon rules', () => {
	it('treats inherent ranged Two-Handed as free and charges one point to remove it', () => {
		expect(calculateRulebookPropertyPoints('ranged', ['ammo', 'two-handed', 'impact'])).toBe(1);
		expect(calculateRulebookPropertyPoints('ranged', ['ammo', 'impact'])).toBe(2);
	});

	it('builds a self-contained custom weapon snapshot from canonical choices', () => {
		const weapon = buildCustomWeapon({
			id: 'custom-weapon-test',
			name: 'Rift Hook',
			weaponType: 'melee',
			style: 'axe',
			damageType: 'slashing',
			properties: ['toss', 'returning']
		});

		expect(weapon).toEqual(
			expect.objectContaining({
				id: 'custom-weapon-test',
				name: 'Rift Hook',
				finalDamage: 1,
				range: '5/10',
				pointsSpent: 2,
				maxPoints: 2
			})
		);
	});
});
