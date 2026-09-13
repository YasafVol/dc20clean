import type { AttackData } from '../../types';
import type { Weapon } from '../../lib/rulesdata/inventoryItems';
import { calculateDamage, getDamageType, getVersatileDamage } from '../../lib/utils/weaponUtils';

export function createAttackDataFromWeapon(weapon: Weapon, id = ''): AttackData {
	const versatileInfo = getVersatileDamage(weapon);
	const damage = versatileInfo
		? `${versatileInfo.oneHanded} (${versatileInfo.twoHanded} two-handed)`
		: weapon.damage;

	return {
		id,
		weaponName: weapon.name,
		name: weapon.name,
		attackBonus: 0,
		damage,
		damageType: getDamageType(weapon.damage),
		brutalDamage: calculateDamage(weapon, 'brutal'),
		heavyHitEffect: weapon.properties.includes('Impact') ? '+1 damage on Heavy Hit' : ''
	};
}
