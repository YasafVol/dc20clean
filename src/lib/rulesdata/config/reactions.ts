/**
 * Reaction Triggers Configuration - DC20 v0.10
 *
 * Data-driven configuration for reaction prompts and validation.
 * Enables UI to display appropriate reaction options based on triggers.
 */

/**
 * Trigger types for Opportunity Attacks
 */
export type OATrigger =
	| 'leave_reach' // Creature leaves your reach
	| 'draw_weapon' // Creature draws a weapon in reach
	| 'draw_focus' // Creature draws a spell focus in reach
	| 'pickup_item' // Creature picks up an item in reach
	| 'object_action'; // Creature takes Object action in reach

/**
 * Configuration for a reaction type
 */
export interface ReactionConfig {
	/** Unique identifier */
	id: string;
	/** Display name */
	name: string;
	/** Description of the reaction */
	description: string;
	/** Prerequisite path or feature */
	prerequisite?: string;
	/** AP cost to use */
	apCost: number;
	/** Additional resource cost */
	resourceCost?: {
		type: 'MP' | 'SP';
		amount: number | 'variable'; // 'variable' = up to MSL/SSL
	};
	/** Range in spaces (null = melee reach) */
	range?: number | null;
	/** What triggers this reaction */
	triggers?: string[];
	/** Special rules or notes */
	notes?: string;
}

/**
 * Core reaction configurations from DC20 v0.10 rules
 */
export const REACTION_CONFIGS: ReactionConfig[] = [
	// Opportunity Attack (Martial Path)
	{
		id: 'opportunity_attack',
		name: 'Opportunity Attack',
		description:
			'You can make a Melee Attack against a creature when they perform a triggering action within your reach.',
		prerequisite: 'martial_path',
		apCost: 1,
		range: null, // Melee reach
		triggers: ['leave_reach', 'draw_weapon', 'draw_focus', 'pickup_item', 'object_action'],
		notes: 'Requires Martial Path. Uses your Reaction for the round.'
	},

	// Spell Duel (Spellcaster Path)
	{
		id: 'spell_duel',
		name: 'Spell Duel',
		description: 'You attempt to stop an MP Effect being cast by making a contested Spell Check.',
		prerequisite: 'spellcasting_path',
		apCost: 1, // Matches base AP cost of spell being countered
		resourceCost: {
			type: 'MP',
			amount: 'variable' // 1+ MP, up to MSL
		},
		range: 5,
		triggers: ['mp_effect_cast'],
		notes:
			'Caster or target must be within 5 spaces. Contest: Spell Check + (2 × MP spent). Tie = Wild Magic Surge.'
	},

	// Combo Casting (Spellcaster Path)
	{
		id: 'combo_casting',
		name: 'Combo Casting',
		description:
			"You assist another spellcaster's spell, adding a +2 bonus to their Spell Check and Save DC.",
		prerequisite: 'spellcasting_path',
		apCost: 1, // Matches base AP cost of assisted spell
		resourceCost: {
			type: 'MP',
			amount: 'variable' // Optional additional MP
		},
		range: 5,
		triggers: ['ally_casts_known_spell'],
		notes:
			"Must know the same spell. MP spent adds to total (limited to primary caster's MSL). Range 5 spaces."
	},

	// Combo Maneuver (Martial Path)
	{
		id: 'combo_maneuver',
		name: 'Combo Maneuver',
		description: "You assist another martial's maneuver, adding a +2 bonus to their Martial Check.",
		prerequisite: 'martial_path',
		apCost: 1, // Matches base AP cost of assisted maneuver
		resourceCost: {
			type: 'SP',
			amount: 'variable' // Optional additional SP
		},
		range: null, // 2 spaces (melee adjacent)
		triggers: ['ally_performs_maneuver'],
		notes: 'Must be within 2 spaces. Both martials can spend up to their SSL (combined total).'
	}
];

/**
 * Get reaction config by ID
 */
export function getReactionConfig(id: string): ReactionConfig | undefined {
	return REACTION_CONFIGS.find((r) => r.id === id);
}

/**
 * Get all reactions available to a character with the given paths
 */
export function getAvailableReactions(paths: {
	martial?: boolean;
	spellcasting?: boolean;
}): ReactionConfig[] {
	return REACTION_CONFIGS.filter((reaction) => {
		if (!reaction.prerequisite) return true;
		if (reaction.prerequisite === 'martial_path') return paths.martial;
		if (reaction.prerequisite === 'spellcasting_path') return paths.spellcasting;
		return false;
	});
}
