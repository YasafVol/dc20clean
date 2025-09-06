// weaponUtils.ts
// Utility functions for working with inventory weapons in the attack system

import { Weapon, WeaponType } from '../rulesdata/inventoryItems';

export interface ParsedDamage {
	amount: number;
	type: 'S' | 'P' | 'B' | 'S/P' | 'B/P';
	typeDisplay:
		| 'slashing'
		| 'piercing'
		| 'bludgeoning'
		| 'slashing/piercing'
		| 'bludgeoning/piercing';
}

/**
 * Parse damage string like "1 S", "2 B", "1 S/P" into structured data
 */
export function parseDamage(damageStr: string): ParsedDamage {
	const match = damageStr.trim().match(/^(\d+)\s+([SPBG/]+)$/);
	if (!match) {
		// Fallback for malformed damage strings
		return { amount: 0, type: 'B', typeDisplay: 'bludgeoning' };
	}

	const amount = parseInt(match[1]);
	const type = match[2] as ParsedDamage['type'];

	let typeDisplay: ParsedDamage['typeDisplay'];
	switch (type) {
		case 'S':
			typeDisplay = 'slashing';
			break;
		case 'P':
			typeDisplay = 'piercing';
			break;
		case 'B':
			typeDisplay = 'bludgeoning';
			break;
		case 'S/P':
			typeDisplay = 'slashing/piercing';
			break;
		case 'B/P':
			typeDisplay = 'bludgeoning/piercing';
			break;
		default:
			typeDisplay = 'bludgeoning';
			break;
	}

	return { amount, type, typeDisplay };
}

/**
 * Get primary damage type for simple string representation
 */
export function getDamageType(damageStr: string): string {
	const parsed = parseDamage(damageStr);
	return parsed.typeDisplay;
}

/**
 * Check if weapon is ranged
 */
export function isRangedWeapon(weapon: Weapon): boolean {
	return weapon.type === WeaponType.Ranged;
}

/**
 * Get range from weapon properties (parse "Range (15/45)")
 */
export function getWeaponRange(weapon: Weapon): { short: number; long: number } | null {
	const rangeProp = weapon.properties.find((prop) => prop.includes('Range'));
	if (rangeProp) {
		const match = rangeProp.match(/Range \((\d+)\/(\d+)\)/);
		if (match) {
			return {
				short: parseInt(match[1]),
				long: parseInt(match[2])
			};
		}
	}
	return null;
}

/**
 * Get reload value from properties
 */
export function getReloadValue(weapon: Weapon): number | null {
	const reloadProp = weapon.properties.find((prop) => prop === 'Reload');
	// For now, return a default reload value if property exists
	// Could be enhanced to parse specific reload numbers if they exist in properties
	return reloadProp ? 1 : null;
}

/**
 * Calculate attack bonus based on weapon type and character stats
 */
export function calculateAttackBonus(
	weapon: Weapon,
	combatMastery: number,
	mightMod: number,
	agilityMod: number
): number {
	const statMod = isRangedWeapon(weapon) ? agilityMod : mightMod;
	return combatMastery + statMod;
}

/**
 * Calculate damage for different hit types
 */
export function calculateDamage(weapon: Weapon, hitType: 'normal' | 'heavy' | 'brutal'): string {
	const baseDamage = parseDamage(weapon.damage);
	const hasImpact = weapon.properties.includes('Impact');

	let totalDamage = baseDamage.amount;

	switch (hitType) {
		case 'heavy':
			totalDamage += 1;
			if (hasImpact) totalDamage += 1;
			break;
		case 'brutal':
			totalDamage += 2;
			if (hasImpact) totalDamage += 1;
			break;
		default:
			// normal hit, no bonus
			break;
	}

	return `${totalDamage} ${baseDamage.type}`;
}

/**
 * Get versatile damage options for versatile weapons
 */
export function getVersatileDamage(
	weapon: Weapon
): { oneHanded: string; twoHanded: string } | null {
	if (weapon.handedness === 'Versatile') {
		const baseDamage = parseDamage(weapon.damage);
		const twoHandedAmount = baseDamage.amount + 1;

		return {
			oneHanded: weapon.damage,
			twoHanded: `${twoHandedAmount} ${baseDamage.type}`
		};
	}
	return null;
}

/**
 * Get weapon features based on properties
 */
export function getWeaponFeatures(weapon: Weapon): string[] {
	const features: string[] = [];

	weapon.properties.forEach((prop) => {
		switch (prop) {
			case 'Impact':
				features.push('+1 damage on Heavy Hit');
				break;
			case 'Guard':
				features.push('Defensive bonus');
				break;
			case 'Reach':
				features.push('Extended reach');
				break;
			case 'Versatile':
				features.push('Can be used one or two-handed');
				break;
			case 'Heavy':
				features.push('Heavy weapon');
				break;
			case 'Two-Handed':
				features.push('Requires two hands');
				break;
			case 'Concealable':
				features.push('Easy to hide');
				break;
			case 'Silent':
				features.push('Silent attacks');
				break;
			case 'Unwieldy':
				features.push('Difficult to use effectively');
				break;
			default:
				if (prop.includes('Toss') || prop.includes('Thrown')) {
					features.push('Can be thrown');
				} else if (prop.includes('Range')) {
					const range = getWeaponRange(weapon);
					if (range) {
						features.push(`Range: ${range.short}/${range.long}`);
					}
				} else if (prop.includes('Capture')) {
					features.push('Can capture/entangle');
				} else if (prop === 'Ammo') {
					features.push('Requires ammunition');
				} else if (prop === 'Reload') {
					features.push('Must be reloaded');
				}
				break;
		}
	});

	return features;
}

/**
 * Create empty attack data for fallback cases
 */
export function createEmptyAttackData(weaponName?: string): any {
	return {
		id: '',
		weaponName: weaponName || 'unknown',
		name: weaponName || 'Unknown Weapon',
		attackBonus: 0,
		damage: '0 B',
		damageType: 'bludgeoning',
		critRange: '20',
		critDamage: '0 B',
		brutalDamage: '0 B',
		heavyHitEffect: ''
	};
}
