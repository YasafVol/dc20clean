/**
 * @file src/lib/rulesdata/equipment/options/armorOptions.ts
 * @description Armor types, properties, and presets from DC20 0.10.
 */

import { ArmorTypeDefinition, ArmorProperty, PresetArmor } from '../schemas/armorSchema';

// ================================================================= //
// ARMOR TYPES
// ================================================================= //

export const ARMOR_TYPES: ArmorTypeDefinition[] = [
	{
		id: 'light',
		name: 'Light Armor',
		description:
			'Light Armor is a type of protection worn by most creatures to protect them from injury. Leather coats, padded jackets, and heavy robes are types of Light Armor.',
		donTime: '1 minute',
		doffTime: '1 minute',
		isMetal: false,
		specialNotes: [
			'Light Armor can be described to be made of many things but is not made of enough metal to be considered Metal Armor for the purpose of game mechanics unless otherwise stated.'
		]
	},
	{
		id: 'heavy',
		name: 'Heavy Armor',
		description:
			'Heavy Armor is designed with greater attention in protecting the wearer in traditional warfare, requiring extensive combat training to use most effectively. Lamellar, laminar, and plate armor are types of Heavy Armor.',
		donTime: '10 minutes',
		doffTime: '10 minutes',
		isMetal: true,
		specialNotes: [
			'All Heavy Armor is considered to be Metal Armor for the purpose of game mechanics unless otherwise stated.',
			'Your Unarmed Strikes deal +1 damage on Heavy Hits while wearing Heavy Armor.'
		]
	}
];

// ================================================================= //
// ARMOR PROPERTIES
// ================================================================= //

export const LIGHT_ARMOR_PROPERTIES: ArmorProperty[] = [
	{
		id: 'pd-increase',
		name: 'PD Increase',
		description: "The Armor's PD Bonus increases by 1.",
		cost: 1,
		lightOnly: true,
		maxStacks: 2,
		modifies: { stat: 'pd', value: 1 }
	},
	{
		id: 'ad-increase',
		name: 'AD Increase',
		description: "The Armor's AD Bonus increases by 1.",
		cost: 1,
		lightOnly: true,
		maxStacks: 2,
		modifies: { stat: 'ad', value: 1 }
	},
	{
		id: 'edr-light',
		name: 'EDR',
		description: 'The Armor grants Elemental Damage Reduction.',
		cost: 2,
		lightOnly: true
	}
];

export const HEAVY_ARMOR_PROPERTIES: ArmorProperty[] = [
	{
		id: 'pd-increase-heavy',
		name: 'PD Increase',
		description: "The Armor's PD Bonus increases by 1.",
		cost: 1,
		heavyOnly: true,
		maxStacks: 2,
		modifies: { stat: 'pd', value: 1 }
	},
	{
		id: 'ad-increase-heavy',
		name: 'AD Increase',
		description: "The Armor's AD Bonus increases by 1.",
		cost: 1,
		heavyOnly: true,
		maxStacks: 2,
		modifies: { stat: 'ad', value: 1 }
	},
	{
		id: 'pdr',
		name: 'PDR',
		description: 'The Armor grants Physical Damage Reduction.',
		cost: 2,
		heavyOnly: true
	},
	{
		id: 'edr-heavy',
		name: 'EDR',
		description: 'The Armor grants Elemental Damage Reduction.',
		cost: 2,
		heavyOnly: true
	},
	{
		id: 'bulky',
		name: 'Bulky',
		description: 'Your Speed is reduced by 1.',
		cost: -1,
		heavyOnly: true,
		modifies: { stat: 'speed', value: -1 }
	},
	{
		id: 'rigid',
		name: 'Rigid',
		description: 'You have DisADV on Agility Checks.',
		cost: -1,
		heavyOnly: true
	}
];

export const ALL_ARMOR_PROPERTIES: ArmorProperty[] = [
	...LIGHT_ARMOR_PROPERTIES,
	...HEAVY_ARMOR_PROPERTIES
];

// ================================================================= //
// PRESET ARMOR (from rulebook examples)
// ================================================================= //

export const PRESET_ARMOR: PresetArmor[] = [
	// ===== LIGHT ARMOR =====
	{
		id: 'light-defensive',
		name: 'Light Defensive Armor',
		armorType: 'light',
		pdBonus: 1,
		adBonus: 1,
		hasPdr: false,
		speedPenalty: 0,
		hasAgilityDisadvantage: false
	},
	{
		id: 'light-deflecting',
		name: 'Light Deflecting Armor',
		armorType: 'light',
		pdBonus: 2,
		adBonus: 0,
		hasPdr: false,
		speedPenalty: 0,
		hasAgilityDisadvantage: false
	},
	{
		id: 'light-fortified',
		name: 'Light Fortified Armor',
		armorType: 'light',
		pdBonus: 0,
		adBonus: 2,
		hasPdr: false,
		speedPenalty: 0,
		hasAgilityDisadvantage: false
	},
	// ===== HEAVY ARMOR =====
	{
		id: 'heavy-defensive',
		name: 'Heavy Defensive Armor',
		armorType: 'heavy',
		pdBonus: 1,
		adBonus: 1,
		hasPdr: true,
		speedPenalty: -1,
		hasAgilityDisadvantage: true
	},
	{
		id: 'heavy-deflecting',
		name: 'Heavy Deflecting Armor',
		armorType: 'heavy',
		pdBonus: 2,
		adBonus: 0,
		hasPdr: true,
		speedPenalty: -1,
		hasAgilityDisadvantage: true
	},
	{
		id: 'heavy-fortified',
		name: 'Heavy Fortified Armor',
		armorType: 'heavy',
		pdBonus: 0,
		adBonus: 2,
		hasPdr: true,
		speedPenalty: -1,
		hasAgilityDisadvantage: true
	},
	{
		id: 'heavy-highly-defensive',
		name: 'Heavy Highly Defensive Armor',
		armorType: 'heavy',
		pdBonus: 2,
		adBonus: 2,
		hasPdr: false, // Note: This one doesn't have PDR according to the table
		speedPenalty: -1,
		hasAgilityDisadvantage: true
	}
];

// ================================================================= //
// HELPER FUNCTIONS
// ================================================================= //

export const getArmorType = (id: string): ArmorTypeDefinition | undefined =>
	ARMOR_TYPES.find((t) => t.id === id);

export const getArmorProperty = (id: string): ArmorProperty | undefined =>
	ALL_ARMOR_PROPERTIES.find((p) => p.id === id);

export const getPresetArmor = (id: string): PresetArmor | undefined =>
	PRESET_ARMOR.find((a) => a.id === id);

export const getPropertiesForArmorType = (armorType: 'light' | 'heavy'): ArmorProperty[] => {
	if (armorType === 'light') {
		return LIGHT_ARMOR_PROPERTIES;
	}
	return HEAVY_ARMOR_PROPERTIES;
};
