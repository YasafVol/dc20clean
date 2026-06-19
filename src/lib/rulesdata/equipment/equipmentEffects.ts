/**
 * @file src/lib/rulesdata/equipment/equipmentEffects.ts
 * @description Bridges Equipage item data to canonical calculator effects.
 */

import type { Effect } from '../schemas/character.schema';
import type { AttributedEffect } from '../../types/effectSystem';
import {
	allItems,
	type Armor,
	type InventoryItem,
	type Shield,
	type Weapon
} from '../inventoryItems';
import { getAllCustomEquipment } from './storage/equipmentStorage';
import type { CustomEquipment } from './schemas';
import type { CustomWeapon } from './schemas/weaponSchema';
import type { CustomArmor } from './schemas/armorSchema';
import type { CustomShield } from './schemas/shieldSchema';
import type { CustomSpellFocus } from './schemas/spellFocusSchema';
import { getWeaponProperty } from './options/weaponOptions';
import { getArmorProperty } from './options/armorOptions';
import { getShieldProperty } from './options/shieldOptions';
import { getSpellFocusProperty } from './options/spellFocusOptions';

export interface EquipmentInventoryItem {
	id?: string;
	itemType?: string;
	itemName?: string;
	customEquipmentId?: string;
	isEquipped?: boolean;
}

function cloneEffects(effects: Effect[] | undefined): Effect[] {
	return (effects ?? []).map((effect) => ({ ...effect }));
}

function ability(target: string, value: string): Effect {
	return { type: 'GRANT_ABILITY', target, value };
}

function stat(target: string, value: number): Effect {
	return { type: 'MODIFY_STAT', target, value };
}

function resistance(target: string, value: string): Effect {
	return { type: 'GRANT_RESISTANCE', target, value };
}

function repeatStat(target: string, value: number, count: number): Effect[] {
	return Array.from({ length: Math.max(0, count) }, () => stat(target, value));
}

function propertyEffects(
	propertyIds: string[],
	getProperty: (id: string) => { effects?: Effect[]; effect?: string; name: string } | undefined,
	options: { includeFallbackAbilities?: boolean; omitTypes?: string[] } = {}
): Effect[] {
	const result: Effect[] = [];
	const omitTypes = new Set(options.omitTypes ?? []);

	for (const propertyId of propertyIds) {
		const property = getProperty(propertyId);
		if (!property) continue;

		const structured = cloneEffects(property.effects).filter((effect) => !omitTypes.has(effect.type));
		if (structured.length > 0) {
			result.push(...structured);
			continue;
		}

		if (options.includeFallbackAbilities && property.effect) {
			result.push(ability(`equipment_property_${propertyId}`, `${property.name}: ${property.effect}`));
		}
	}

	return result;
}

export function getCustomEquipmentEffects(equipment: CustomEquipment): Effect[] {
	if (equipment.effects?.length) {
		return cloneEffects(equipment.effects);
	}

	switch (equipment.category) {
		case 'weapon': {
			const weapon = equipment as CustomWeapon;
			return propertyEffects(weapon.properties, getWeaponProperty, { includeFallbackAbilities: true });
		}
		case 'armor': {
			const armor = equipment as CustomArmor;
			const effects: Effect[] = [
				...repeatStat('pd', 1, armor.pdBonus),
				...repeatStat('ad', 1, armor.adBonus)
			];

			if (armor.hasPdr) effects.push(resistance('physical', 'half'));
			if (armor.hasEdr) effects.push(resistance('elemental', 'half'));
			if (armor.speedPenalty) effects.push(stat('moveSpeed', armor.speedPenalty));
			if (armor.hasAgilityDisadvantage) {
				effects.push(
					ability('armor_agility_disadvantage', 'You have DisADV on Agility Checks while wearing this Armor.')
				);
			}
			if (armor.armorType === 'heavy') {
				effects.push(
					ability(
						'heavy_armor_unarmed_heavy_hit',
						'Your Unarmed Strikes deal +1 damage on Heavy Hits while wearing Heavy Armor.'
					)
				);
			}

			return effects;
		}
		case 'shield': {
			const shield = equipment as CustomShield;
			return [
				...repeatStat('pd', 1, shield.pdBonus),
				...repeatStat('ad', 1, shield.adBonus),
				...(shield.hasPdr ? [resistance('physical', 'half')] : []),
				...(shield.hasEdr ? [resistance('elemental', 'half')] : []),
				...(shield.speedPenalty ? [stat('moveSpeed', shield.speedPenalty)] : []),
				...(shield.hasAgilityDisadvantage
					? [
							ability(
								'shield_agility_disadvantage',
								'You have DisADV on Agility Checks while wielding this Shield.'
							)
						]
					: []),
				...propertyEffects(shield.properties, getShieldProperty, {
					includeFallbackAbilities: true,
					omitTypes: ['MODIFY_STAT', 'GRANT_RESISTANCE']
				})
			];
		}
		case 'spellFocus': {
			const focus = equipment as CustomSpellFocus;
			return propertyEffects(focus.properties, getSpellFocusProperty, { includeFallbackAbilities: true });
		}
	}
}

export function withEquipmentEffects<T extends CustomEquipment>(equipment: T): T {
	return {
		...equipment,
		effects: getCustomEquipmentEffects(equipment)
	};
}

function getCustomEquipmentSafely(): CustomEquipment[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		return getAllCustomEquipment();
	} catch {
		return [];
	}
}

function effectsForStandardItem(item: InventoryItem): Effect[] {
	switch (item.itemType) {
		case 'Weapon': {
			const weapon = item as Weapon;
			const effects: Effect[] = [];
			if (weapon.properties.includes('Guard')) {
				effects.push(stat('pd', 1));
			}
			return effects;
		}
		case 'Armor': {
			const armor = item as Armor;
			return [
				...repeatStat('pd', 1, armor.pdBonus),
				...repeatStat('ad', 1, armor.adBonus),
				...(armor.pdr ? [resistance('physical', 'half')] : []),
				...(armor.speedPenalty ? [stat('moveSpeed', armor.speedPenalty)] : []),
				...(armor.agilityCheckDisadvantage
					? [
							ability(
								'armor_agility_disadvantage',
								'You have DisADV on Agility Checks while wearing this Armor.'
							)
						]
					: [])
			];
		}
		case 'Shield': {
			const shield = item as Shield;
			return [
				...repeatStat('pd', 1, shield.pdBonus),
				...repeatStat('ad', 1, shield.adBonus),
				...(shield.speedPenalty ? [stat('moveSpeed', shield.speedPenalty)] : []),
				...(shield.agilityCheckDisadvantage
					? [
							ability(
								'shield_agility_disadvantage',
								'You have DisADV on Agility Checks while wielding this Shield.'
							)
						]
					: [])
			];
		}
		default:
			return [];
	}
}

export function aggregateEquipmentEffects(
	inventoryItems: EquipmentInventoryItem[] = []
): AttributedEffect[] {
	const customEquipment = getCustomEquipmentSafely();
	const effects: AttributedEffect[] = [];

	for (const inventoryItem of inventoryItems) {
		if (!inventoryItem.isEquipped) continue;

		const custom = inventoryItem.customEquipmentId
			? customEquipment.find((equipment) => equipment.id === inventoryItem.customEquipmentId)
			: undefined;
		const standardItem = allItems.find((item) => item.name === inventoryItem.itemName);
		const itemEffects = custom
			? getCustomEquipmentEffects(custom)
			: standardItem
				? effectsForStandardItem(standardItem as InventoryItem)
				: [];

		if (!itemEffects?.length) continue;

		const itemId = custom?.id ?? inventoryItem.id ?? inventoryItem.itemName ?? 'equipment';
		const itemName = custom?.name ?? inventoryItem.itemName ?? 'Equipment';

		for (const effect of itemEffects) {
			effects.push({
				...effect,
				source: {
					type: 'equipment',
					id: itemId,
					name: itemName,
					description: custom?.description,
					category: custom ? `Equipage ${custom.category}` : inventoryItem.itemType || 'Equipment'
				},
				resolved: true
			} as AttributedEffect);
		}
	}

	return effects;
}
