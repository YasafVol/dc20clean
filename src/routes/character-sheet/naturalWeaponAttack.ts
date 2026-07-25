import type { AttackData } from '../../types';

export const NATURAL_WEAPON_ATTACK_ID = 'derived_beastborn_natural_weapon';

function normalizeTraitIds(selectedTraitIds: unknown): string[] {
	if (Array.isArray(selectedTraitIds)) {
		return selectedTraitIds.filter((traitId): traitId is string => typeof traitId === 'string');
	}

	if (typeof selectedTraitIds !== 'string') return [];

	try {
		const parsed = JSON.parse(selectedTraitIds);
		return Array.isArray(parsed)
			? parsed.filter((traitId): traitId is string => typeof traitId === 'string')
			: [];
	} catch {
		return [];
	}
}

export function getNaturalWeaponAttack(selectedTraitIds: unknown): AttackData | null {
	if (!normalizeTraitIds(selectedTraitIds).includes('beastborn_natural_weapon')) return null;

	return {
		id: NATURAL_WEAPON_ATTACK_ID,
		weaponName: 'Unarmed Strike',
		name: 'Natural Weapon (Unarmed Strike)',
		attackBonus: 0,
		damage: '1 B/P/S',
		damageType: 'bludgeoning/piercing/slashing',
		critRange: '20',
		critDamage: '1 B/P/S',
		brutalDamage: '3 B/P/S',
		heavyHitEffect: ''
	};
}

export function isNaturalWeaponAttack(attack: AttackData): boolean {
	return attack.id === NATURAL_WEAPON_ATTACK_ID;
}
