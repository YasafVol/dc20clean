/**
 * Monster Features (Seed Data)
 *
 * Official features from Bestiary Vol 1-3.
 * All features use pre-generated UUIDs to ensure consistency across installations.
 *
 * Features are organized by point cost (1-5 points).
 * Custom features are stored in Convex, not here.
 */

import { type MonsterFeature } from '../schemas/monster.schema';

// ============================================================================
// PRE-GENERATED FEATURE IDS
// These UUIDs are stable and should never change once created.
// ============================================================================

const FEATURE_IDS = {
	// 1-Point Features
	keenSmell: 'feat_d4e5f678-1234-4abc-9def-012345678901',
	keenSight: 'feat_a1b2c3d4-5678-4ef0-1234-567890abcdef',
	largeLungs: 'feat_b2c3d4e5-6789-4f01-2345-678901bcdefa',
	falseAppearance: 'feat_c3d4e5f6-789a-4012-3456-789012cdefab',
	hover: 'feat_d4e5f6a7-89ab-4123-4567-890123defabc',
	brightEnergy: 'feat_e5f6a7b8-9abc-4234-5678-901234efabcd',
	forestStride: 'feat_f6a7b8c9-abcd-4345-6789-012345fabcde',
	amorphous: 'feat_a7b8c9d0-bcde-4456-789a-123456abcdef',
	keenSenses: 'feat_b8c9d0e1-cdef-4567-89ab-234567bcdefa',

	// 2-Point Features
	incorporealMovement: 'feat_c9d0e1f2-def0-4678-9abc-345678cdefab',
	wispyForm: 'feat_d0e1f2a3-ef01-4789-abcd-456789defabc',
	fieryRetribution: 'feat_e1f2a3b4-f012-489a-bcde-567890efabcd',
	forceful: 'feat_f2a3b4c5-0123-49ab-cdef-678901fabcde',
	packTactics: 'feat_a3b4c5d6-1234-4abc-def0-789012abcdef',
	telepathicLink: 'feat_b4c5d6e7-2345-4bcd-ef01-890123bcdefa',
	tunneler: 'feat_c5d6e7f8-3456-4cde-f012-901234cdefab',
	spiderClimb: 'feat_d6e7f8a9-4567-4def-0123-012345defabc',
	webWalk: 'feat_e7f8a9b0-5678-4ef0-1234-123456efabcd',

	// 3-Point Features
	spellcaster: 'feat_f8a9b0c1-6789-4f01-2345-234567fabcde',
	unrelenting: 'feat_a9b0c1d2-789a-4012-3456-345678abcdef',
	stress: 'feat_b0c1d2e3-89ab-4123-4567-456789bcdefa',
	dimensionalDisruption: 'feat_c1d2e3f4-9abc-4234-5678-567890cdefab',
	immutableForm: 'feat_d2e3f4a5-abcd-4345-6789-678901defabc'
} as const;

// ============================================================================
// 1-POINT FEATURES
// ============================================================================

const ONE_POINT_FEATURES: MonsterFeature[] = [
	{
		id: FEATURE_IDS.keenSmell,
		name: 'Keen Smell',
		description: 'ADV on Awareness Checks using smell.',
		pointCost: 1,
		isOfficial: true,
		effects: [
			{
				type: 'advantage',
				target: 'awareness_smell',
				description: 'Advantage on smell-based Awareness Checks'
			}
		]
	},
	{
		id: FEATURE_IDS.keenSight,
		name: 'Keen Sight',
		description: 'ADV on Awareness Checks using sight.',
		pointCost: 1,
		isOfficial: true,
		effects: [
			{
				type: 'advantage',
				target: 'awareness_sight',
				description: 'Advantage on sight-based Awareness Checks'
			}
		]
	},
	{
		id: FEATURE_IDS.largeLungs,
		name: 'Large Lungs',
		description: 'Can hold breath for 1 hour.',
		pointCost: 1,
		isOfficial: true,
		effects: [
			{
				type: 'hold_breath',
				value: 60, // minutes
				description: 'Can hold breath for 1 hour'
			}
		]
	},
	{
		id: FEATURE_IDS.falseAppearance,
		name: 'False Appearance',
		description: 'Indistinguishable from object while motionless.',
		pointCost: 1,
		isOfficial: true,
		effects: [
			{
				type: 'stealth',
				target: 'disguise',
				description: 'Appears as an object while motionless'
			}
		]
	},
	{
		id: FEATURE_IDS.hover,
		name: 'Hover',
		description: 'Stays aloft even when Prone.',
		pointCost: 1,
		isOfficial: true,
		effects: [
			{
				type: 'movement',
				target: 'hover',
				description: 'Maintains flight even when Prone'
			}
		]
	},
	{
		id: FEATURE_IDS.brightEnergy,
		name: 'Bright Energy',
		description: 'Emits Bright Light within 3 spaces.',
		pointCost: 1,
		isOfficial: true,
		effects: [
			{
				type: 'light',
				target: 'bright',
				value: 3, // spaces
				description: 'Emits bright light in 3-space radius'
			}
		]
	},
	{
		id: FEATURE_IDS.forestStride,
		name: 'Forest Stride',
		description: 'Ignore Difficult Terrain from plants.',
		pointCost: 1,
		isOfficial: true,
		effects: [
			{
				type: 'movement',
				target: 'ignore_difficult_terrain',
				value: 'plants',
				description: 'Ignores plant-based difficult terrain'
			}
		]
	},
	{
		id: FEATURE_IDS.amorphous,
		name: 'Amorphous',
		description: 'Move through 1-inch spaces without squeezing.',
		pointCost: 1,
		isOfficial: true,
		effects: [
			{
				type: 'movement',
				target: 'squeeze',
				value: 1, // inches
				description: 'Can fit through 1-inch gaps without squeezing'
			}
		]
	},
	{
		id: FEATURE_IDS.keenSenses,
		name: 'Keen Senses',
		description: 'ADV on Awareness Checks using hearing or smell.',
		pointCost: 1,
		isOfficial: true,
		effects: [
			{
				type: 'advantage',
				target: 'awareness_hearing',
				description: 'Advantage on hearing-based Awareness Checks'
			},
			{
				type: 'advantage',
				target: 'awareness_smell',
				description: 'Advantage on smell-based Awareness Checks'
			}
		]
	}
];

// ============================================================================
// 2-POINT FEATURES
// ============================================================================

const TWO_POINT_FEATURES: MonsterFeature[] = [
	{
		id: FEATURE_IDS.incorporealMovement,
		name: 'Incorporeal Movement',
		description:
			'Move through creatures and objects as difficult terrain. Take 3-10 True Damage if ending turn inside.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'movement',
				target: 'incorporeal',
				description: 'Can move through creatures and objects as difficult terrain'
			},
			{
				type: 'damage',
				target: 'self',
				value: { min: 3, max: 10, type: 'true' },
				description: 'Takes True Damage if ending turn inside solid object'
			}
		]
	},
	{
		id: FEATURE_IDS.wispyForm,
		name: 'Wispy Form',
		description: 'Opportunity Attacks against creature have DisADV.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'defense',
				target: 'opportunity_attacks',
				description: 'Attackers have disadvantage on opportunity attacks'
			}
		]
	},
	{
		id: FEATURE_IDS.fieryRetribution,
		name: 'Fiery Retribution',
		description: 'Creatures touching or hitting with Melee take 1 Fire damage.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'retribution',
				target: 'melee_attackers',
				value: { amount: 1, type: 'fire' },
				description: 'Deals 1 Fire damage to melee attackers'
			}
		]
	},
	{
		id: FEATURE_IDS.forceful,
		name: 'Forceful',
		description: 'ADV on Grapple/Shove checks; targets have DisADV on Saves.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'advantage',
				target: 'grapple',
				description: 'Advantage on Grapple checks'
			},
			{
				type: 'advantage',
				target: 'shove',
				description: 'Advantage on Shove checks'
			},
			{
				type: 'impose_disadvantage',
				target: 'saves_vs_grapple_shove',
				description: 'Targets have disadvantage on saves against grapple/shove'
			}
		]
	},
	{
		id: FEATURE_IDS.packTactics,
		name: 'Pack Tactics',
		description: '+2 bonus to Attacks while Flanking.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'attack_bonus',
				target: 'flanking',
				value: 2,
				description: '+2 to attack rolls when flanking'
			}
		]
	},
	{
		id: FEATURE_IDS.telepathicLink,
		name: 'Telepathic Link',
		description: 'Telepathic link with master at any distance on same plane.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'telepathy',
				target: 'master',
				value: 'same_plane',
				description: 'Telepathic communication with master anywhere on same plane'
			}
		]
	},
	{
		id: FEATURE_IDS.tunneler,
		name: 'Tunneler',
		description: 'Burrow through solid stone, leaving 1-space tunnel.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'movement',
				target: 'burrow_stone',
				value: 1, // spaces
				description: 'Can burrow through stone, leaving 1-space tunnel'
			}
		]
	},
	{
		id: FEATURE_IDS.spiderClimb,
		name: 'Spider Climb',
		description: 'Walk on ceilings and vertical surfaces without check.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'movement',
				target: 'climb',
				description: 'Can walk on ceilings and walls without Athletics check'
			}
		]
	},
	{
		id: FEATURE_IDS.webWalk,
		name: 'Web Walk',
		description: 'Walk through webs unimpeded; know location of creatures on same web.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'movement',
				target: 'web',
				description: 'Moves freely through webs'
			},
			{
				type: 'sense',
				target: 'web_sense',
				description: 'Knows location of creatures touching same web'
			}
		]
	}
];

// ============================================================================
// 3-POINT FEATURES
// ============================================================================

const THREE_POINT_FEATURES: MonsterFeature[] = [
	{
		id: FEATURE_IDS.spellcaster,
		name: 'Spellcaster',
		description: 'Cannot make Opportunity Attacks, but +2 bonus to Spell Duels.',
		pointCost: 3,
		isOfficial: true,
		effects: [
			{
				type: 'restriction',
				target: 'opportunity_attacks',
				description: 'Cannot make Opportunity Attacks'
			},
			{
				type: 'bonus',
				target: 'spell_duel',
				value: 2,
				description: '+2 to Spell Duel checks'
			}
		]
	},
	{
		id: FEATURE_IDS.unrelenting,
		name: 'Unrelenting',
		description: 'Only reduced below 1 HP by Heavy Hit or Radiant damage.',
		pointCost: 3,
		isOfficial: true,
		effects: [
			{
				type: 'damage_threshold',
				target: 'hp_minimum',
				value: 1,
				description: 'Cannot be reduced below 1 HP except by Heavy Hit or Radiant damage'
			}
		]
	},
	{
		id: FEATURE_IDS.stress,
		name: 'Stress',
		description: 'Lose DR and -5 to Defenses at 3 Stress points.',
		pointCost: 3,
		isOfficial: true,
		effects: [
			{
				type: 'stress_weakness',
				target: 'defenses',
				value: { threshold: 3, defense_penalty: -5, lose_dr: true },
				description: 'At 3 Stress: loses DR and -5 to all Defenses'
			}
		]
	},
	{
		id: FEATURE_IDS.dimensionalDisruption,
		name: 'Dimensional Disruption',
		description: 'Radiant damage prevents "Engulf" or "Swallow" abilities.',
		pointCost: 3,
		isOfficial: true,
		effects: [
			{
				type: 'vulnerability',
				target: 'radiant',
				description: 'Radiant damage disables Engulf and Swallow abilities'
			}
		]
	},
	{
		id: FEATURE_IDS.immutableForm,
		name: 'Immutable Form',
		description: 'Immune to any spell or effect that would alter form.',
		pointCost: 3,
		isOfficial: true,
		effects: [
			{
				type: 'immunity',
				target: 'form_alteration',
				description: 'Immune to polymorph, petrification, and other form-altering effects'
			}
		]
	}
];

// ============================================================================
// COMBINED EXPORTS
// ============================================================================

/**
 * All official monster features from the Bestiary
 */
export const OFFICIAL_MONSTER_FEATURES: readonly MonsterFeature[] = [
	...ONE_POINT_FEATURES,
	...TWO_POINT_FEATURES,
	...THREE_POINT_FEATURES
] as const;

/**
 * Feature lookup map by ID for O(1) access
 */
export const OFFICIAL_FEATURES_BY_ID: ReadonlyMap<string, MonsterFeature> = new Map(
	OFFICIAL_MONSTER_FEATURES.map((f) => [f.id, f])
);

/**
 * Features grouped by point cost
 */
export const FEATURES_BY_COST: Readonly<Record<number, readonly MonsterFeature[]>> = {
	1: ONE_POINT_FEATURES,
	2: TWO_POINT_FEATURES,
	3: THREE_POINT_FEATURES
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Gets an official feature by ID
 *
 * @param id - Feature ID (feat_<uuid>)
 * @returns The feature or undefined if not found
 */
export function getOfficialFeature(id: string): MonsterFeature | undefined {
	return OFFICIAL_FEATURES_BY_ID.get(id);
}

/**
 * Gets all official features with a specific point cost
 *
 * @param cost - Point cost (1-5)
 * @returns Array of features with that cost
 */
export function getFeaturesByCost(cost: number): readonly MonsterFeature[] {
	return FEATURES_BY_COST[cost] ?? [];
}

/**
 * Calculates total point cost for a list of feature IDs
 *
 * @param featureIds - Array of feature IDs
 * @param customFeatures - Optional map of custom features for non-official lookups
 * @returns Total point cost
 */
export function calculateFeaturePointCost(
	featureIds: string[],
	customFeatures?: Map<string, MonsterFeature>
): number {
	return featureIds.reduce((total, id) => {
		const official = OFFICIAL_FEATURES_BY_ID.get(id);
		if (official) {
			return total + official.pointCost;
		}
		const custom = customFeatures?.get(id);
		if (custom) {
			return total + custom.pointCost;
		}
		// Unknown feature - don't count it
		console.warn(`Unknown feature ID: ${id}`);
		return total;
	}, 0);
}

/**
 * Validates that feature IDs don't exceed the budget
 *
 * @param featureIds - Array of feature IDs
 * @param maxPoints - Maximum points allowed
 * @param customFeatures - Optional map of custom features
 * @returns Validation result
 */
export function validateFeatureBudget(
	featureIds: string[],
	maxPoints: number,
	customFeatures?: Map<string, MonsterFeature>
): { valid: boolean; spent: number; remaining: number; overBy: number } {
	const spent = calculateFeaturePointCost(featureIds, customFeatures);
	const remaining = maxPoints - spent;
	const overBy = Math.max(0, -remaining);

	return {
		valid: spent <= maxPoints,
		spent,
		remaining: Math.max(0, remaining),
		overBy
	};
}

/**
 * Checks if a feature ID is an official feature
 *
 * @param id - Feature ID to check
 * @returns true if official feature
 */
export function isOfficialFeature(id: string): boolean {
	return OFFICIAL_FEATURES_BY_ID.has(id);
}
