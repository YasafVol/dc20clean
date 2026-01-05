// Filename: conditions.types.ts

/**
 * Defines the core mechanical behavior of a condition.
 * - stacking: Effects intensify with multiple applications (e.g., Exhaustion X).
 * - overlapping: Can be applied by multiple sources, but effects don't intensify. Lasts until all sources are gone.
 * - absolute: A simple on/off state that doesn't stack or overlap (e.g., Blinded).
 */
export type ConditionType = 'stacking' | 'overlapping' | 'absolute';

/**
 * Optional tags for filtering and categorization in your UI.
 */
export type ConditionTag = 'physical' | 'mental' | 'sensory' | 'movement' | 'damage';

/**
 * The static definition of a single condition. This data is universal to the game.
 */
export interface ConditionDefinition {
	/** A unique identifier for the condition, e.g., "bleeding-x" */
	id: string;
	/** The display name of the condition, e.g., "Bleeding X" */
	name: string;
	/** The full rules description of the condition. */
	description: string;
	/**
	 * The core mechanical type that governs its behavior.
	 * If type is 'stacking', it implies the condition uses an "X" value.
	 */
	type: ConditionType;
	/** An array of descriptive tags for easier filtering. */
	tags: ConditionTag[];
}

/**
 * Defines a character's specific relationship to a condition.
 * 'resistance' implies ADV on saves, and 'vulnerability' implies DisADV on saves.
 */
export type ConditionInteractionType = 'immunity' | 'resistance' | 'vulnerability';

/**
 * Describes a single source of interaction a character has with a condition.
 * A character can have multiple sources of interaction for the same condition.
 */
export interface ConditionInteraction {
	/** The type of interaction. */
	type: ConditionInteractionType;
	/** The source of the interaction (e.g., "Dwarf Ancestry", "Iron Resolve", "Ring of Mind Shielding"). */
	source: string;
	/** Optional field for conditional effects (e.g., "Only while in direct sunlight", "Against spells only"). */
	details?: string;
}

/**
 * Represents the status of a single condition for a specific character.
 */
export interface CharacterConditionStatus {
	/** Links to the ConditionDefinition's id. */
	conditionId: string;
	/** An array of all interactions the character has with this condition. An empty array means no special interaction. */
	interactions: ConditionInteraction[];
}

/**
 * A simplified representation of a character sheet focusing on conditions.
 */
export interface CharacterSheet {
	id: string;
	name: string;
	// ... other character properties

	/**
	 * A comprehensive list of every possible condition and the character's relationship to it.
	 */
	conditions: CharacterConditionStatus[];
}
