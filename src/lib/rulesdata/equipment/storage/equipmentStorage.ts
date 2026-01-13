/**
 * @file src/lib/rulesdata/equipment/storage/equipmentStorage.ts
 * @description localStorage utilities for custom equipment.
 */

import { CustomEquipment } from '../schemas';
import { CustomWeapon } from '../schemas/weaponSchema';
import { CustomArmor } from '../schemas/armorSchema';
import { CustomShield } from '../schemas/shieldSchema';
import { CustomSpellFocus } from '../schemas/spellFocusSchema';

const STORAGE_KEY = 'customEquipment';
const STORAGE_VERSION = 1;

interface StoredEquipmentData {
	version: number;
	weapons: CustomWeapon[];
	armor: CustomArmor[];
	shields: CustomShield[];
	spellFocuses: CustomSpellFocus[];
}

// ================================================================= //
// INTERNAL HELPERS
// ================================================================= //

function getDefaultStorageData(): StoredEquipmentData {
	return {
		version: STORAGE_VERSION,
		weapons: [],
		armor: [],
		shields: [],
		spellFocuses: []
	};
}

function loadStorageData(): StoredEquipmentData {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) {
			return getDefaultStorageData();
		}

		const parsed = JSON.parse(raw) as StoredEquipmentData;

		// Ensure all arrays exist (migration safety)
		return {
			version: parsed.version || STORAGE_VERSION,
			weapons: parsed.weapons || [],
			armor: parsed.armor || [],
			shields: parsed.shields || [],
			spellFocuses: parsed.spellFocuses || []
		};
	} catch (error) {
		console.error('Failed to load custom equipment from storage:', error);
		return getDefaultStorageData();
	}
}

function saveStorageData(data: StoredEquipmentData): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch (error) {
		console.error('Failed to save custom equipment to storage:', error);
	}
}

// ================================================================= //
// PUBLIC API - WEAPONS
// ================================================================= //

export function getAllCustomWeapons(): CustomWeapon[] {
	return loadStorageData().weapons;
}

export function getCustomWeapon(id: string): CustomWeapon | undefined {
	return loadStorageData().weapons.find((w) => w.id === id);
}

export function saveCustomWeapon(weapon: CustomWeapon): void {
	const data = loadStorageData();
	const existingIndex = data.weapons.findIndex((w) => w.id === weapon.id);

	if (existingIndex >= 0) {
		data.weapons[existingIndex] = { ...weapon, updatedAt: new Date().toISOString() };
	} else {
		data.weapons.push({
			...weapon,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		});
	}

	saveStorageData(data);
}

export function deleteCustomWeapon(id: string): void {
	const data = loadStorageData();
	data.weapons = data.weapons.filter((w) => w.id !== id);
	saveStorageData(data);
}

// ================================================================= //
// PUBLIC API - ARMOR
// ================================================================= //

export function getAllCustomArmor(): CustomArmor[] {
	return loadStorageData().armor;
}

export function getCustomArmor(id: string): CustomArmor | undefined {
	return loadStorageData().armor.find((a) => a.id === id);
}

export function saveCustomArmor(armor: CustomArmor): void {
	const data = loadStorageData();
	const existingIndex = data.armor.findIndex((a) => a.id === armor.id);

	if (existingIndex >= 0) {
		data.armor[existingIndex] = { ...armor, updatedAt: new Date().toISOString() };
	} else {
		data.armor.push({
			...armor,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		});
	}

	saveStorageData(data);
}

export function deleteCustomArmor(id: string): void {
	const data = loadStorageData();
	data.armor = data.armor.filter((a) => a.id !== id);
	saveStorageData(data);
}

// ================================================================= //
// PUBLIC API - SHIELDS
// ================================================================= //

export function getAllCustomShields(): CustomShield[] {
	return loadStorageData().shields;
}

export function getCustomShield(id: string): CustomShield | undefined {
	return loadStorageData().shields.find((s) => s.id === id);
}

export function saveCustomShield(shield: CustomShield): void {
	const data = loadStorageData();
	const existingIndex = data.shields.findIndex((s) => s.id === shield.id);

	if (existingIndex >= 0) {
		data.shields[existingIndex] = { ...shield, updatedAt: new Date().toISOString() };
	} else {
		data.shields.push({
			...shield,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		});
	}

	saveStorageData(data);
}

export function deleteCustomShield(id: string): void {
	const data = loadStorageData();
	data.shields = data.shields.filter((s) => s.id !== id);
	saveStorageData(data);
}

// ================================================================= //
// PUBLIC API - SPELL FOCUSES
// ================================================================= //

export function getAllCustomSpellFocuses(): CustomSpellFocus[] {
	return loadStorageData().spellFocuses;
}

export function getCustomSpellFocus(id: string): CustomSpellFocus | undefined {
	return loadStorageData().spellFocuses.find((f) => f.id === id);
}

export function saveCustomSpellFocus(focus: CustomSpellFocus): void {
	const data = loadStorageData();
	const existingIndex = data.spellFocuses.findIndex((f) => f.id === focus.id);

	if (existingIndex >= 0) {
		data.spellFocuses[existingIndex] = { ...focus, updatedAt: new Date().toISOString() };
	} else {
		data.spellFocuses.push({
			...focus,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		});
	}

	saveStorageData(data);
}

export function deleteCustomSpellFocus(id: string): void {
	const data = loadStorageData();
	data.spellFocuses = data.spellFocuses.filter((f) => f.id !== id);
	saveStorageData(data);
}

// ================================================================= //
// PUBLIC API - GENERIC
// ================================================================= //

export function getAllCustomEquipment(): CustomEquipment[] {
	const data = loadStorageData();
	return [...data.weapons, ...data.armor, ...data.shields, ...data.spellFocuses];
}

export function saveCustomEquipment(equipment: CustomEquipment): void {
	switch (equipment.category) {
		case 'weapon':
			saveCustomWeapon(equipment as CustomWeapon);
			break;
		case 'armor':
			saveCustomArmor(equipment as CustomArmor);
			break;
		case 'shield':
			saveCustomShield(equipment as CustomShield);
			break;
		case 'spellFocus':
			saveCustomSpellFocus(equipment as CustomSpellFocus);
			break;
	}
}

export function deleteCustomEquipment(category: string, id: string): void {
	switch (category) {
		case 'weapon':
			deleteCustomWeapon(id);
			break;
		case 'armor':
			deleteCustomArmor(id);
			break;
		case 'shield':
			deleteCustomShield(id);
			break;
		case 'spellFocus':
			deleteCustomSpellFocus(id);
			break;
	}
}

// ================================================================= //
// EXPORT / IMPORT
// ================================================================= //

export function exportEquipmentToJson(): string {
	return JSON.stringify(loadStorageData(), null, 2);
}

export function importEquipmentFromJson(jsonString: string): { success: boolean; error?: string } {
	try {
		const parsed = JSON.parse(jsonString) as StoredEquipmentData;

		// Basic validation
		if (!parsed.weapons || !Array.isArray(parsed.weapons)) {
			return { success: false, error: 'Invalid data: missing weapons array' };
		}
		if (!parsed.armor || !Array.isArray(parsed.armor)) {
			return { success: false, error: 'Invalid data: missing armor array' };
		}
		if (!parsed.shields || !Array.isArray(parsed.shields)) {
			return { success: false, error: 'Invalid data: missing shields array' };
		}
		if (!parsed.spellFocuses || !Array.isArray(parsed.spellFocuses)) {
			return { success: false, error: 'Invalid data: missing spellFocuses array' };
		}

		saveStorageData({
			version: STORAGE_VERSION,
			weapons: parsed.weapons,
			armor: parsed.armor,
			shields: parsed.shields,
			spellFocuses: parsed.spellFocuses
		});

		return { success: true };
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to parse JSON'
		};
	}
}

// ================================================================= //
// CLEAR ALL
// ================================================================= //

export function clearAllCustomEquipment(): void {
	saveStorageData(getDefaultStorageData());
}
