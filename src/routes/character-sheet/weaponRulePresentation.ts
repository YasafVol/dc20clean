import type { Weapon, WeaponProperty, WeaponStyle } from '../../lib/rulesdata/inventoryItems';
import { MEDICINE_ACTION, type CoreActionRule } from '../../lib/rulesdata/coreActions';
import {
	PRESET_WEAPONS,
	WEAPON_ENHANCEMENT_RULE,
	getWeaponProperty,
	getWeaponStyle
} from '../../lib/rulesdata/equipment/options/weaponOptions';
import type {
	WeaponProperty as WeaponPropertyDefinition,
	WeaponStyleDefinition
} from '../../lib/rulesdata/equipment/schemas/weaponSchema';
import { resolveConditionDefinition } from '../../lib/rulesdata/conditions/conditions.data';
import type { ResolvedConditionDefinition } from '../../lib/rulesdata/conditions/conditions.types';

export interface WeaponPropertyPresentation {
	label: string;
	feature?: string;
	definition?: WeaponPropertyDefinition;
}

export interface WeaponStylePresentation {
	definition: WeaponStyleDefinition;
	condition?: ResolvedConditionDefinition;
	recoveryAction?: CoreActionRule;
}

export interface WeaponRulePresentation {
	properties: WeaponPropertyPresentation[];
	styles: WeaponStylePresentation[];
	features: string[];
	weaponEnhancementRule: string;
	unresolvedProperties: string[];
	unresolvedStyles: string[];
}

const PROPERTY_IDS: Record<WeaponProperty, string> = {
	Ammo: 'ammo',
	Concealable: 'concealable',
	Cumbersome: 'cumbersome',
	Deft: 'deft',
	Guard: 'guard',
	Heavy: 'heavy',
	Impact: 'impact',
	'Long-Ranged': 'long-ranged',
	'Multi-Faceted': 'multi-faceted',
	Reach: 'reach',
	Reload: 'reload',
	Silent: 'silent',
	'Toss (5/10)': 'toss',
	'Thrown (10/20)': 'thrown',
	'Two-Handed': 'two-handed',
	Unwieldy: 'unwieldy',
	Versatile: 'versatile',
	Returning: 'returning',
	'Capture (5/10)': 'capture',
	'Capture (10/20)': 'capture',
	'Range (15/45)': 'range',
	'Range (30/90)': 'range'
};

const PROPERTY_FEATURES: Record<string, string> = {
	ammo: 'Requires ammunition',
	concealable: 'Easy to hide',
	guard: 'Improves defense',
	cumbersome: 'Slower to draw or stow',
	deft: 'Usable while prone',
	heavy: 'Higher base damage',
	'heavy-ranged': 'Higher base damage',
	impact: 'Stronger Heavy Hits',
	'long-ranged': 'Extended range',
	'multi-faceted': 'Multiple weapon styles',
	reach: 'Extended reach',
	reload: 'Requires reloading',
	returning: 'Returns after a miss',
	silent: 'Quiet attacks',
	toss: 'Can be thrown',
	thrown: 'Can be thrown',
	'two-handed': 'Requires two hands',
	unwieldy: 'Awkward at close range',
	versatile: 'One or two hands'
};

const STYLE_IDS: Record<WeaponStyle, string[]> = {
	Axe: ['axe'],
	Fist: ['fist'],
	Hammer: ['hammer'],
	Pick: ['pick'],
	Spear: ['spear'],
	Sword: ['sword'],
	Whip: ['whip'],
	Chained: [],
	Bow: ['bow'],
	Crossbow: ['crossbow'],
	'Axe/Pick': ['axe', 'pick'],
	'Hammer/Pick': ['hammer', 'pick'],
	Sling: ['sling'],
	'Sword/Spear': ['sword', 'spear'],
	'Chained/Hammer': ['hammer', 'whip'],
	Staff: ['staff']
};

const CONDITION_IDS_BY_ENHANCEMENT: Record<string, string> = {
	Bleed: 'bleeding-x',
	Grapple: 'grappled',
	Hinder: 'hindered',
	Slow: 'slowed-x',
	Trip: 'prone'
};

const splitPresetNames = (name: string): string[] => name.split('/').map((part) => part.trim());

const getPresetStyleIds = (weapon: Weapon): string[] | null => {
	const preset = PRESET_WEAPONS.find((candidate) =>
		splitPresetNames(candidate.name).some(
			(name) => name.localeCompare(weapon.name, undefined, { sensitivity: 'base' }) === 0
		)
	);
	return preset?.styles ?? null;
};

const getLegacyStyleIds = (style: WeaponStyle | WeaponStyle[]): string[] =>
	(Array.isArray(style) ? style : [style]).flatMap((value) => STYLE_IDS[value]);

const resolveProperty = (property: WeaponProperty, weapon: Weapon): WeaponPropertyPresentation => {
	let propertyId = PROPERTY_IDS[property];
	if (propertyId === 'heavy' && weapon.type === 'Ranged') propertyId = 'heavy-ranged';

	return {
		label: property,
		feature: PROPERTY_FEATURES[propertyId],
		definition: getWeaponProperty(propertyId)
	};
};

const resolveStyle = (styleId: string): WeaponStylePresentation | null => {
	const definition = getWeaponStyle(styleId);
	if (!definition) return null;

	const conditionId = CONDITION_IDS_BY_ENHANCEMENT[definition.enhancement.name];
	const condition = conditionId ? resolveConditionDefinition(conditionId) : undefined;

	return {
		definition,
		condition,
		recoveryAction: condition?.definition?.id === 'bleeding-x' ? MEDICINE_ACTION : undefined
	};
};

export function getWeaponRulePresentation(weapon: Weapon): WeaponRulePresentation {
	const properties = weapon.properties
		.filter((property) => !property.startsWith('Range ('))
		.map((property) => resolveProperty(property, weapon));
	const featureSet = new Set(properties.flatMap((property) => property.feature ?? []));
	const presetStyleIds = getPresetStyleIds(weapon);
	const styleIds = presetStyleIds ?? getLegacyStyleIds(weapon.style);
	const styles = styleIds
		.map(resolveStyle)
		.filter((style): style is WeaponStylePresentation => style !== null);

	const legacyStyles = Array.isArray(weapon.style) ? weapon.style : [weapon.style];
	const unresolvedStyles =
		presetStyleIds === null
			? legacyStyles.filter((style) => STYLE_IDS[style].length === 0)
			: styleIds.filter((styleId) => !getWeaponStyle(styleId));

	return {
		properties,
		styles,
		features: [...featureSet],
		weaponEnhancementRule: WEAPON_ENHANCEMENT_RULE,
		unresolvedProperties: properties
			.filter((property) => !property.definition)
			.map((property) => property.label),
		unresolvedStyles
	};
}
