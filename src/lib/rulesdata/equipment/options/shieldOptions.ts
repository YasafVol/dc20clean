/**
 * @file src/lib/rulesdata/equipment/options/shieldOptions.ts
 * @description Shield types, properties, and presets from DC20 0.10.
 */

import { ShieldTypeDefinition, ShieldProperty, PresetShield } from '../schemas/shieldSchema';

// ================================================================= //
// SHIELD TYPES
// ================================================================= //

export const SHIELD_TYPES: ShieldTypeDefinition[] = [
	{
		id: 'light',
		name: 'Light Shield',
		description: 'Light Shields are simple and easy to wield. A Buckler is a type of Light Shield.'
	},
	{
		id: 'heavy',
		name: 'Heavy Shield',
		description:
			'Heavy Shields are designed for warfare. A Tower Shield is a type of Heavy Shield.'
	}
];

// ================================================================= //
// SHIELD RULES
// ================================================================= //

export const SHIELD_RULES = {
	equipCost: '1 AP',
	stowCost: '1 AP',
	attackDamage: 1,
	attackDamageType: 'bludgeoning' as const,
	dualWieldingRules: [
		'You only gain the bonuses of one Shield at a time (your choice).',
		'You can spend a Minor Action to change which wielded Shield to benefit from.',
		'You are immune to Flanking while wielding two shields.'
	]
};

// ================================================================= //
// SHIELD PROPERTIES
// ================================================================= //

export const LIGHT_SHIELD_PROPERTIES: ShieldProperty[] = [
	{
		id: 'pd-increase-light',
		name: 'PD Increase',
		description: "The Shield's PD Bonus increases by 1.",
		cost: 1,
		lightOnly: true,
		modifies: { stat: 'pd', value: 1 }
	},
	{
		id: 'ad-increase-light',
		name: 'AD Increase',
		description: "The Shield's AD Bonus increases by 1.",
		cost: 1,
		lightOnly: true,
		modifies: { stat: 'ad', value: 1 }
	},
	{
		id: 'grasp',
		name: 'Grasp',
		description:
			'The Shield is considered to be a free hand when Grappling, Reloading a Weapon, or Attacking with a Versatile Weapon.',
		cost: 1,
		lightOnly: true
	},
	{
		id: 'toss-shield',
		name: 'Toss',
		description:
			"You can throw the Shield to make a Ranged Martial Attack (5/10). If you throw it further than this range it's considered an Improvised Weapon.",
		cost: 1,
		lightOnly: true
	}
];

export const HEAVY_SHIELD_PROPERTIES: ShieldProperty[] = [
	{
		id: 'pd-increase-heavy',
		name: 'PD Increase',
		description: "The Shield's PD Bonus increases by 1.",
		cost: 1,
		heavyOnly: true,
		maxStacks: 2,
		modifies: { stat: 'pd', value: 1 }
	},
	{
		id: 'ad-increase-heavy',
		name: 'AD Increase',
		description: "The Shield's AD Bonus increases by 1.",
		cost: 1,
		heavyOnly: true,
		maxStacks: 2,
		modifies: { stat: 'ad', value: 1 }
	},
	{
		id: 'mounted',
		name: 'Mounted',
		description: "The Shield's PD and AD Bonuses also apply to your Mount's Defenses.",
		cost: 1,
		heavyOnly: true
	},
	{
		id: 'pdr-shield',
		name: 'PDR',
		description: 'The Shield grants Physical Damage Reduction.',
		cost: 2,
		heavyOnly: true
	},
	{
		id: 'edr-shield',
		name: 'EDR',
		description: 'The Shield grants Elemental Damage Reduction.',
		cost: 2,
		heavyOnly: true
	},
	{
		id: 'bulky-shield',
		name: 'Bulky',
		description: 'Your Speed is reduced by 1.',
		cost: -1,
		heavyOnly: true,
		modifies: { stat: 'speed', value: -1 }
	},
	{
		id: 'rigid-shield',
		name: 'Rigid',
		description: 'You have DisADV on Agility Checks.',
		cost: -1,
		heavyOnly: true
	}
];

export const ALL_SHIELD_PROPERTIES: ShieldProperty[] = [
	...LIGHT_SHIELD_PROPERTIES,
	...HEAVY_SHIELD_PROPERTIES
];

// ================================================================= //
// PRESET SHIELDS (from rulebook examples)
// ================================================================= //

export const PRESET_SHIELDS: PresetShield[] = [
	// ===== LIGHT SHIELDS =====
	{
		id: 'buckler',
		name: 'Buckler',
		shieldType: 'light',
		pdBonus: 1,
		adBonus: 0,
		speedPenalty: 0,
		hasAgilityDisadvantage: false,
		properties: ['grasp']
	},
	{
		id: 'round-shield',
		name: 'Round Shield',
		shieldType: 'light',
		pdBonus: 0,
		adBonus: 1,
		speedPenalty: 0,
		hasAgilityDisadvantage: false,
		properties: ['toss-shield']
	},
	{
		id: 'heater-shield',
		name: 'Heater Shield',
		shieldType: 'light',
		pdBonus: 1,
		adBonus: 1,
		speedPenalty: 0,
		hasAgilityDisadvantage: false,
		properties: []
	},
	// ===== HEAVY SHIELDS =====
	{
		id: 'kite-shield',
		name: 'Kite Shield',
		shieldType: 'heavy',
		pdBonus: 1,
		adBonus: 2,
		speedPenalty: -1,
		hasAgilityDisadvantage: true,
		properties: ['mounted']
	},
	{
		id: 'tower-shield',
		name: 'Tower Shield',
		shieldType: 'heavy',
		pdBonus: 2,
		adBonus: 2,
		speedPenalty: -1,
		hasAgilityDisadvantage: true,
		properties: []
	}
];

// ================================================================= //
// HELPER FUNCTIONS
// ================================================================= //

export const getShieldType = (id: string): ShieldTypeDefinition | undefined =>
	SHIELD_TYPES.find((t) => t.id === id);

export const getShieldProperty = (id: string): ShieldProperty | undefined =>
	ALL_SHIELD_PROPERTIES.find((p) => p.id === id);

export const getPresetShield = (id: string): PresetShield | undefined =>
	PRESET_SHIELDS.find((s) => s.id === id);

export const getPropertiesForShieldType = (shieldType: 'light' | 'heavy'): ShieldProperty[] => {
	if (shieldType === 'light') {
		return LIGHT_SHIELD_PROPERTIES;
	}
	return HEAVY_SHIELD_PROPERTIES;
};
