import { describe, expect, it } from 'vitest';
import { filterEquipmentPresets } from './presetSearch';

const presets = [
	{ name: 'Longsword', type: 'melee', properties: ['versatile'] },
	{ name: 'Longbow', type: 'ranged', properties: ['two-handed', 'long-ranged'] }
];

const terms = (preset: (typeof presets)[number]) => [
	preset.name,
	preset.type,
	...preset.properties
];

describe('filterEquipmentPresets', () => {
	it('returns all presets for an empty query', () => {
		expect(filterEquipmentPresets(presets, '  ', terms)).toEqual(presets);
	});

	it('matches every query token across name, type, and properties', () => {
		expect(filterEquipmentPresets(presets, 'RANGED long', terms)).toEqual([presets[1]]);
		expect(filterEquipmentPresets(presets, 'melee versatile', terms)).toEqual([presets[0]]);
	});

	it('returns an empty list when no preset matches', () => {
		expect(filterEquipmentPresets(presets, 'shield', terms)).toEqual([]);
	});
});
