import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EQUIPMENT_RULES_VERSION } from '../schemas/baseEquipment';
import {
	exportEquipmentToJson,
	getAllCustomWeapons,
	importEquipmentFromJson,
	saveCustomWeapon
} from './equipmentStorage';

const STORAGE_KEY = 'customEquipment';

describe('custom equipment storage compatibility', () => {
	const values = new Map<string, string>();

	beforeEach(() => {
		values.clear();
		vi.stubGlobal('localStorage', {
			getItem: (key: string) => values.get(key) ?? null,
			setItem: (key: string, value: string) => values.set(key, value),
			removeItem: (key: string) => values.delete(key),
			clear: () => values.clear()
		});
	});

	it('identifies the current equipment rules as v0.10.5', () => {
		expect(EQUIPMENT_RULES_VERSION).toBe('0.10.5');
	});

	it('preserves stable v0.10 weapon property IDs through import and export', () => {
		const legacyPayload = {
			version: 1,
			weapons: [
				{
					id: 'legacy-returning-spear',
					name: 'Legacy Returning Spear',
					category: 'weapon',
					weaponType: 'melee',
					style: 'spear',
					damageType: 'piercing',
					baseDamage: 1,
					finalDamage: 1,
					range: '10/20',
					properties: ['thrown', 'returning'],
					pointsSpent: 3,
					maxPoints: 3,
					createdAt: '2026-01-01T00:00:00.000Z',
					updatedAt: '2026-01-01T00:00:00.000Z'
				}
			],
			armor: [],
			shields: [],
			spellFocuses: []
		};

		// eslint-disable-next-line no-restricted-syntax
		expect(importEquipmentFromJson(JSON.stringify(legacyPayload))).toEqual({ success: true });
		expect(getAllCustomWeapons()[0].properties).toEqual(['thrown', 'returning']);
		// eslint-disable-next-line no-restricted-syntax
		const legacyExport = JSON.parse(exportEquipmentToJson());
		expect(legacyExport.rulesVersion).toBe('0.10');
		expect(legacyExport.weapons[0].properties).toEqual(['thrown', 'returning']);
		expect(values.has(STORAGE_KEY)).toBe(true);
	});

	it('marks new and edited custom equipment with the current rules version', () => {
		const weapon = {
			id: 'current-sword',
			name: 'Current Sword',
			category: 'weapon',
			weaponType: 'melee',
			style: 'sword',
			damageType: 'slashing',
			baseDamage: 1,
			finalDamage: 1,
			range: 'melee',
			properties: [],
			pointsSpent: 0,
			maxPoints: 3,
			createdAt: '2026-06-13T00:00:00.000Z',
			updatedAt: '2026-06-13T00:00:00.000Z'
		};

		saveCustomWeapon(weapon as Parameters<typeof saveCustomWeapon>[0]);

		// eslint-disable-next-line no-restricted-syntax
		expect(JSON.parse(exportEquipmentToJson()).rulesVersion).toBe(EQUIPMENT_RULES_VERSION);
	});
});
