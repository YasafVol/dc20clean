import { describe, expect, it } from 'vitest';
import { aggregateEquipmentEffects, getCustomEquipmentEffects } from './equipmentEffects';
import type { CustomWeapon } from './schemas/weaponSchema';
import type { CustomSpellFocus } from './schemas/spellFocusSchema';

describe('equipmentEffects', () => {
	it('derives Guard as a PD effect for custom weapons', () => {
		const weapon: CustomWeapon = {
			id: 'custom-guard-weapon',
			category: 'weapon',
			name: 'Guard Blade',
			weaponType: 'melee',
			style: 'sword',
			damageType: 'slashing',
			baseDamage: 1,
			finalDamage: 1,
			range: '1',
			properties: ['guard'],
			pointsSpent: 1,
			maxPoints: 2,
			createdAt: '2026-06-19T00:00:00.000Z',
			updatedAt: '2026-06-19T00:00:00.000Z'
		};

		expect(getCustomEquipmentEffects(weapon)).toContainEqual({
			type: 'MODIFY_STAT',
			target: 'pd',
			value: 1
		});
	});

	it('only aggregates effects from equipped inventory rows', () => {
		const effects = aggregateEquipmentEffects([
			{
				id: 'equipped-sword',
				itemType: 'Weapon',
				itemName: 'Short Sword',
				isEquipped: true
			},
			{
				id: 'carried-sword',
				itemType: 'Weapon',
				itemName: 'Short Sword',
				isEquipped: false
			}
		]);

		expect(effects.filter((effect) => effect.type === 'MODIFY_STAT')).toHaveLength(1);
		expect(effects[0]).toMatchObject({
			type: 'MODIFY_STAT',
			target: 'pd',
			value: 1,
			source: { type: 'equipment', id: 'equipped-sword', name: 'Short Sword' }
		});
	});

	it('derives spell focus effects from focus properties', () => {
		const focus: CustomSpellFocus = {
			id: 'custom-protective-focus',
			category: 'spellFocus',
			name: 'Protective Relic',
			hands: 'two-handed',
			properties: ['two-handed-focus', 'protective', 'warded'],
			pointsSpent: 1,
			maxPoints: 2,
			spellCheckBonus: 0,
			spellAttackBonus: 0,
			spellDamageBonus: 0,
			adBonus: 1,
			hasMdr: true,
			longRangeBonus: 0,
			reachBonus: 0,
			hasCloseQuarters: false,
			hasMuffled: false,
			hasReactive: false,
			createdAt: '2026-06-19T00:00:00.000Z',
			updatedAt: '2026-06-19T00:00:00.000Z'
		};

		expect(getCustomEquipmentEffects(focus)).toEqual(
			expect.arrayContaining([
				{ type: 'MODIFY_STAT', target: 'ad', value: 1 },
				{ type: 'GRANT_RESISTANCE', target: 'mystical', value: true }
			])
		);
	});
});
