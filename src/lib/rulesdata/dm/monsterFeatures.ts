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
	troopTactics: 'feat_v3b1c2d3-1111-4111-1111-111111111111',
	drawnToSound: 'feat_v3b2c3d4-2222-4222-2222-222222222222',
	sweetScent: 'feat_v3b3c4d5-3333-4333-3333-333333333333',

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
	reconstitution: 'feat_v3c1d2e3-4444-4444-4444-444444444444',
	invisibility: 'feat_v3c2d3e4-5555-4555-5555-555555555555',
	shadowMerge: 'feat_v3c3d4e5-6666-4666-6666-666666666666',
	fieryWake: 'feat_v3c4d5e6-7777-4777-7777-777777777777',
	elementalSiphon: 'feat_v3c5d6e7-8888-4888-8888-888888888888',
	plagueBody: 'feat_v3c6d7e8-9999-4999-9999-999999999999',
	frostAura: 'feat_v3c7d8e9-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
	telepathicLure: 'feat_v3c8d9e0-bbbb-4bbb-bbbb-bbbbbbbbbbbb',
	toxicGrowth: 'feat_v3c9d0e1-cccc-4ccc-cccc-cccccccccccc',
	toxicVines: 'feat_v3d0e1f2-dddd-4ddd-dddd-dddddddddddd',
	wranglingVines: 'feat_v3d1e2f3-eeee-4eee-eeee-eeeeeeeeeeee',

	// 3-Point Features
	spellcaster: 'feat_f8a9b0c1-6789-4f01-2345-234567fabcde',
	unrelenting: 'feat_a9b0c1d2-789a-4012-3456-345678abcdef',
	stress: 'feat_b0c1d2e3-89ab-4123-4567-456789bcdefa',
	dimensionalDisruption: 'feat_c1d2e3f4-9abc-4234-5678-567890cdefab',
	immutableForm: 'feat_d2e3f4a5-abcd-4345-6789-678901defabc',
	soulCollector: 'feat_v3e1f2a3-ffff-4fff-ffff-ffffffffffff',
	waterBody: 'feat_v3e2f3a4-0000-4000-0000-000000000000',
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
				description: 'Advantage on smell-based Awareness Checks',
			},
		],
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
				description: 'Advantage on sight-based Awareness Checks',
			},
		],
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
				description: 'Can hold breath for 1 hour',
			},
		],
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
				description: 'Appears as an object while motionless',
			},
		],
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
				description: 'Maintains flight even when Prone',
			},
		],
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
				description: 'Emits bright light in 3-space radius',
			},
		],
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
				description: 'Ignores plant-based difficult terrain',
			},
		],
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
				description: 'Can fit through 1-inch gaps without squeezing',
			},
		],
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
				description: 'Advantage on hearing-based Awareness Checks',
			},
			{
				type: 'advantage',
				target: 'awareness_smell',
				description: 'Advantage on smell-based Awareness Checks',
			},
		],
	},
	{
		id: FEATURE_IDS.troopTactics,
		name: 'Troop Tactics',
		description: 'Help Dice granted start as a d10.',
		pointCost: 1,
		isOfficial: true,
		effects: [
			{
				type: 'help_dice',
				target: 'starting_die',
				value: 10,
				description: 'Help Dice start as d10 instead of d4',
			},
		],
	},
	{
		id: FEATURE_IDS.drawnToSound,
		name: 'Drawn to Sound',
		description: 'Taunted by high-pitched sounds (music, screams, verbal components) within 10 spaces.',
		pointCost: 1,
		isOfficial: true,
		effects: [
			{
				type: 'vulnerability',
				target: 'sound',
				value: 10,
				description: 'Taunted by high-pitched sounds within 10 spaces',
			},
		],
	},
	{
		id: FEATURE_IDS.sweetScent,
		name: 'Sweet Scent',
		description: '5 Space Aura: Allies gain +1 to Attacks.',
		pointCost: 1,
		isOfficial: true,
		effects: [
			{
				type: 'aura',
				target: 'allies',
				value: { radius: 5, attackBonus: 1 },
				description: 'Allies within 5 spaces gain +1 to attack rolls',
			},
		],
	},
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
				description: 'Can move through creatures and objects as difficult terrain',
			},
			{
				type: 'damage',
				target: 'self',
				value: { min: 3, max: 10, type: 'true' },
				description: 'Takes True Damage if ending turn inside solid object',
			},
		],
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
				description: 'Attackers have disadvantage on opportunity attacks',
			},
		],
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
				description: 'Deals 1 Fire damage to melee attackers',
			},
		],
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
				description: 'Advantage on Grapple checks',
			},
			{
				type: 'advantage',
				target: 'shove',
				description: 'Advantage on Shove checks',
			},
			{
				type: 'impose_disadvantage',
				target: 'saves_vs_grapple_shove',
				description: 'Targets have disadvantage on saves against grapple/shove',
			},
		],
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
				description: '+2 to attack rolls when flanking',
			},
		],
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
				description: 'Telepathic communication with master anywhere on same plane',
			},
		],
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
				description: 'Can burrow through stone, leaving 1-space tunnel',
			},
		],
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
				description: 'Can walk on ceilings and walls without Athletics check',
			},
		],
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
				description: 'Moves freely through webs',
			},
			{
				type: 'sense',
				target: 'web_sense',
				description: 'Knows location of creatures touching same web',
			},
		],
	},
	{
		id: FEATURE_IDS.reconstitution,
		name: 'Reconstitution',
		description: 'Reaction: Self or Thrall within 15 spaces gains 2 Temp HP on damage.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'reaction',
				target: 'self_or_ally',
				value: { range: 15, tempHP: 2, trigger: 'on_damage' },
				description: 'Grant 2 Temp HP to self or allied Thrall when damaged',
			},
		],
	},
	{
		id: FEATURE_IDS.invisibility,
		name: 'Invisibility',
		description: 'Invisible while in Dim Light or Darkness.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'stealth',
				target: 'invisibility',
				value: { condition: 'dim_light_or_darkness' },
				description: 'Becomes invisible in dim light or darkness',
			},
		],
	},
	{
		id: FEATURE_IDS.shadowMerge,
		name: 'Shadow Merge',
		description: 'Become Invisible when taking the Hide action in Dim Light.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'stealth',
				target: 'invisibility',
				value: { condition: 'hide_in_dim_light' },
				description: 'Becomes invisible when hiding in dim light',
			},
		],
	},
	{
		id: FEATURE_IDS.fieryWake,
		name: 'Fiery Wake',
		description: 'Leaves a trail of flames that deal 1 Fire damage.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'trail',
				target: 'movement',
				value: { damageType: 'fire', damage: 1 },
				description: 'Movement leaves flames dealing 1 Fire damage',
			},
		],
	},
	{
		id: FEATURE_IDS.elementalSiphon,
		name: 'Elemental Siphon',
		description: 'Reaction: Split lightning damage with a nearby creature.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'reaction',
				target: 'damage_sharing',
				value: { damageType: 'lightning' },
				description: 'Can split lightning damage with nearby creature',
			},
		],
	},
	{
		id: FEATURE_IDS.plagueBody,
		name: 'Plague Body',
		description: 'Creatures ending turn nearby contract Rot Plague.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'aura',
				target: 'enemies',
				value: { disease: 'rot_plague', trigger: 'end_turn' },
				description: 'Creatures ending turn nearby contract Rot Plague',
			},
		],
	},
	{
		id: FEATURE_IDS.frostAura,
		name: 'Frost Aura',
		description: 'Regain 1 HP and slow nearby enemies at start of turn.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'aura',
				target: 'mixed',
				value: { selfHeal: 1, enemyCondition: 'slowed', trigger: 'start_turn' },
				description: 'Regain 1 HP and slow enemies at start of turn',
			},
		],
	},
	{
		id: FEATURE_IDS.telepathicLure,
		name: 'Telepathic Lure',
		description: '10 Space Aura: Humanoids must Save or be Taunted by familiar voices.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'aura',
				target: 'humanoids',
				value: { radius: 10, condition: 'taunted', saveNegates: true },
				description: 'Humanoids within 10 spaces must save or be taunted',
			},
		],
	},
	{
		id: FEATURE_IDS.toxicGrowth,
		name: 'Toxic Growth',
		description: 'Gain Toxic Mass stacks from Corrosion/Poison damage; +1 to Attacks per stack.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'stacking',
				target: 'attacks',
				value: { triggers: ['corrosion', 'poison'], bonusPerStack: 1 },
				description: '+1 Attack per Toxic Mass stack from Corrosion/Poison damage',
			},
		],
	},
	{
		id: FEATURE_IDS.toxicVines,
		name: 'Toxic Vines',
		description: 'Creatures with conditions from you take 1 Poison damage at start of turn.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'passive_damage',
				target: 'conditioned_enemies',
				value: { damage: 1, damageType: 'poison', trigger: 'start_turn' },
				description: 'Conditioned creatures take 1 Poison at start of turn',
			},
		],
	},
	{
		id: FEATURE_IDS.wranglingVines,
		name: 'Wrangling Vines',
		description: 'Can Grapple up to 4 different creatures at once.',
		pointCost: 2,
		isOfficial: true,
		effects: [
			{
				type: 'grapple',
				target: 'capacity',
				value: 4,
				description: 'Can grapple up to 4 creatures simultaneously',
			},
		],
	},
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
				description: 'Cannot make Opportunity Attacks',
			},
			{
				type: 'bonus',
				target: 'spell_duel',
				value: 2,
				description: '+2 to Spell Duel checks',
			},
		],
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
				description: 'Cannot be reduced below 1 HP except by Heavy Hit or Radiant damage',
			},
		],
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
				description: 'At 3 Stress: loses DR and -5 to all Defenses',
			},
		],
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
				description: 'Radiant damage disables Engulf and Swallow abilities',
			},
		],
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
				description: 'Immune to polymorph, petrification, and other form-altering effects',
			},
		],
	},
	{
		id: FEATURE_IDS.soulCollector,
		name: 'Soul Collector',
		description: 'Collects souls of those who die within 5 spaces.',
		pointCost: 3,
		isOfficial: true,
		effects: [
			{
				type: 'passive',
				target: 'soul_harvest',
				value: { radius: 5 },
				description: 'Collects souls of creatures that die within 5 spaces',
			},
		],
	},
	{
		id: FEATURE_IDS.waterBody,
		name: 'Water Body',
		description: 'Occupy same space as others. Creatures inside take 2 Corrosion and are Slowed.',
		pointCost: 3,
		isOfficial: true,
		effects: [
			{
				type: 'body',
				target: 'engulf',
				value: { damage: 2, damageType: 'corrosion', condition: 'slowed' },
				description: 'Can occupy same space; creatures inside take 2 Corrosion and are Slowed',
			},
		],
	},
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
	...THREE_POINT_FEATURES,
] as const;

/**
 * Feature lookup map by ID for O(1) access
 */
export const OFFICIAL_FEATURES_BY_ID: ReadonlyMap<string, MonsterFeature> = new Map(
	OFFICIAL_MONSTER_FEATURES.map((f) => [f.id, f])
);

/**
 * Feature lookup map by name (case-insensitive) for O(1) access
 */
const OFFICIAL_FEATURES_BY_NAME: ReadonlyMap<string, MonsterFeature> = new Map(
	OFFICIAL_MONSTER_FEATURES.map((f) => [f.name.toLowerCase(), f])
);

/**
 * Features grouped by point cost
 */
export const FEATURES_BY_COST: Readonly<Record<number, readonly MonsterFeature[]>> = {
	1: ONE_POINT_FEATURES,
	2: TWO_POINT_FEATURES,
	3: THREE_POINT_FEATURES,
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
 * Gets an official feature by name (case-insensitive)
 *
 * @param name - Feature name (e.g., "Keen Smell", "Pack Tactics")
 * @returns The feature or undefined if not found
 */
export function getOfficialFeatureByName(name: string): MonsterFeature | undefined {
	return OFFICIAL_FEATURES_BY_NAME.get(name.toLowerCase());
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
		overBy,
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
