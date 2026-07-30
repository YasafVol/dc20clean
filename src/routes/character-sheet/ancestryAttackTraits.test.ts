import { describe, expect, it } from 'vitest';
import { getAncestryAttackTraits } from './ancestryAttackTraits';

describe('getAncestryAttackTraits', () => {
	it('applies Brutal Strikes only to martial melee attacks', () => {
		const selectedTraitIds = ['orc_brutal_strikes'];

		expect(
			getAncestryAttackTraits({
				selectedTraitIds,
				isNaturalWeapon: false,
				isMartialMelee: true,
				isSupportedAttack: true
			})
		).toMatchObject({ brutalDamageBonus: 1 });

		expect(
			getAncestryAttackTraits({
				selectedTraitIds,
				isNaturalWeapon: false,
				isMartialMelee: false,
				isSupportedAttack: true
			})
		).toMatchObject({ brutalDamageBonus: 0 });
	});

	it('keeps Finishing Blow and Charge as scoped notes', () => {
		const result = getAncestryAttackTraits({
			selectedTraitIds: '["orc_finishing_blow","beastborn_charge"]',
			isNaturalWeapon: false,
			isMartialMelee: true,
			isSupportedAttack: true
		});

		expect(result.brutalDamageBonus).toBe(0);
		expect(result.notes).toEqual([
			{ source: 'Finishing Blow', text: '+1 damage vs Well-Bloodied' },
			{ source: 'Charge', text: '+1 damage after moving 2+ Spaces straight' }
		]);
	});

	it('maps Natural Weapon properties and condition riders without applying their outcomes', () => {
		const result = getAncestryAttackTraits({
			selectedTraitIds: [
				'beastborn_extended_natural_weapon',
				'beastborn_long_limbed',
				'beastborn_natural_projectile',
				'beastborn_natural_weapon_style',
				'beastborn_retractable_natural_weapon',
				'beastborn_rend',
				'beastborn_venomous_natural_weapon'
			],
			isNaturalWeapon: true,
			isMartialMelee: true,
			isSupportedAttack: true
		});

		expect(result.properties).toEqual([
			'Reach +1 Space',
			'Reach',
			'Ranged 10 Spaces',
			'Concealable'
		]);
		expect(result.notes).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ source: 'Natural Weapon Style' }),
				expect.objectContaining({ source: 'Retractable' }),
				expect.objectContaining({ source: 'Rend' }),
				expect.objectContaining({ source: 'Venomous' })
			])
		);
		expect(result.brutalDamageBonus).toBe(0);
	});
});
