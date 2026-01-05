/**
 * Maneuver Schema - DC20 v0.10
 *
 * Maneuvers are tactical martial abilities that cost AP and SP.
 * Note: Techniques have been removed in v0.10 - only Maneuvers remain.
 */

/**
 * Maneuver Types in DC20 v0.10
 */
export enum ManeuverType {
	Attack = 'Attack',
	Defense = 'Defense',
	Grapple = 'Grapple',
	Utility = 'Utility'
}

/**
 * Cost to perform a maneuver
 */
export interface ManeuverCost {
	/** Action Points required */
	ap: number;
	/** Stamina Points required (optional) */
	sp?: number;
}

/**
 * Enhancement options for a maneuver
 */
export interface ManeuverEnhancement {
	/** Enhancement name */
	name: string;
	/** Cost string (e.g., "1 SP, Repeatable") */
	costString: string;
	/** Stamina cost */
	sp?: number;
	/** Action cost */
	ap?: number;
	/** Can be used multiple times? */
	repeatable?: boolean;
	/** Description of what it does */
	description: string;
}

/**
 * Main Maneuver interface - DC20 v0.10
 */
export interface Maneuver {
	/** Unique identifier */
	id: string;
	/** Display name */
	name: string;
	/** Maneuver type/category */
	type: ManeuverType;
	/** Base cost to perform */
	cost: ManeuverCost;
	/** Range description */
	range: string;
	/** Full description */
	description: string;
	/** Is this a reaction? */
	isReaction: boolean;
	/** Trigger for reaction maneuvers */
	trigger?: string;
	/** Enhancement options */
	enhancements: ManeuverEnhancement[];
}
