import { withEquipmentEffects } from './equipmentEffects';
import { ALL_WEAPON_PROPERTIES, getWeaponStyle } from './options/weaponOptions';
import type { PhysicalDamageType } from './schemas/baseEquipment';
import type { CustomWeapon, WeaponStyle, WeaponType } from './schemas/weaponSchema';

export interface CustomWeaponBuildInput {
	id?: string;
	createdAt?: string;
	name: string;
	weaponType: WeaponType;
	style: WeaponStyle;
	secondaryStyle?: WeaponStyle;
	damageType: PhysicalDamageType;
	secondaryDamageType?: PhysicalDamageType;
	properties: string[];
	isPreset?: boolean;
	presetOrigin?: string;
}

export function getCustomWeaponMaxPoints(weaponType: WeaponType): number {
	return weaponType === 'ranged' ? 1 : 2;
}

export function calculateCustomWeaponPoints(properties: string[]): number {
	return properties.reduce((total, propertyId) => {
		const property = ALL_WEAPON_PROPERTIES.find((candidate) => candidate.id === propertyId);
		return total + (property?.cost ?? 0);
	}, 0);
}

export function calculateRulebookPropertyPoints(
	weaponType: WeaponType,
	properties: string[]
): number {
	const internalPoints = calculateCustomWeaponPoints(properties);
	return weaponType === 'ranged' ? internalPoints + 1 : internalPoints;
}

export function calculateCustomWeaponDamage(properties: string[]): number {
	let damage = 1;
	if (properties.includes('heavy') || properties.includes('heavy-ranged')) damage += 1;
	if (properties.includes('reload')) damage += 1;
	return damage;
}

export function calculateCustomWeaponRange(weaponType: WeaponType, properties: string[]): string {
	if (weaponType === 'ranged') {
		return properties.includes('long-ranged') ? '30/90' : '15/45';
	}
	if (properties.includes('thrown')) return '10/20';
	if (properties.includes('toss')) return '5/10';
	return properties.includes('reach') ? '2' : '1';
}

export function buildCustomWeapon(input: CustomWeaponBuildInput): CustomWeapon {
	const now = new Date().toISOString();
	const secondaryDamageType = input.secondaryStyle
		? (input.secondaryDamageType ?? getWeaponStyle(input.secondaryStyle)?.defaultDamageType)
		: undefined;
	const weapon: CustomWeapon = {
		id: input.id ?? `custom-weapon-${Date.now()}`,
		category: 'weapon',
		name: input.name.trim(),
		weaponType: input.weaponType,
		style: input.style,
		secondaryStyle: input.secondaryStyle,
		damageType: input.damageType,
		secondaryDamageType,
		baseDamage: 1,
		finalDamage: calculateCustomWeaponDamage(input.properties),
		range: calculateCustomWeaponRange(input.weaponType, input.properties),
		properties: input.properties,
		pointsSpent: calculateCustomWeaponPoints(input.properties),
		maxPoints: getCustomWeaponMaxPoints(input.weaponType),
		isPreset: input.isPreset,
		presetOrigin: input.presetOrigin,
		createdAt: input.createdAt ?? now,
		updatedAt: now
	};

	return withEquipmentEffects(weapon);
}
