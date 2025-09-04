/**
 * @file src/lib/rulesdata/schemas/character.schema.ts
 * @description The definitive schema for all character creation data, designed for robust, machine-readable processing.
 */

// ================================================================= //
// I. CORE EFFECT MODEL - The Heart of the System
// ================================================================= //

/**
 * A universal, machine-readable representation of a single mechanical effect.
 * This can be attached to traits, class features, choices, items, etc.
 */
export interface Effect {
	/** The action to be performed by the calculation engine. */
	type: // --- Stat & Attribute Modification ---
	| 'MODIFY_ATTRIBUTE' // Modifies a core attribute (Might, Agility, etc.).
		| 'MODIFY_STAT' // Modifies a derived or resource stat (hpMax, pd, moveSpeed, etc.).
		| 'SET_VALUE' // Overrides a stat with a specific value or another stat's value.

		// --- Grants & Abilities ---
		| 'GRANT_ABILITY' // Grants a descriptive, in-game ability or feature.
		| 'GRANT_RESISTANCE' // Grants resistance to damage types or conditions.
		| 'GRANT_VULNERABILITY' // Grants vulnerability to a damage type.
		| 'GRANT_ADV_ON_SAVE' // Grants advantage on saves against specific conditions or types.
		| 'GRANT_ADV_ON_CHECK' // Grants advantage on specific skill/ability checks.
		| 'GRANT_COMBAT_TRAINING' // Grants proficiency with armor, weapons, or shields.
		| 'GRANT_MOVEMENT' // Grants a special movement type like Climb or Swim.
		| 'GRANT_SENSE' // Grants a sense like Darkvision or Tremorsense.

		// --- Choices & Progression ---
		| 'GRANT_CHOICE' // Grants the player a choice (e.g., learn 2 maneuvers).
		| 'GRANT_SKILL_EXPERTISE' // A specific effect for Human/Rogue skill expertise.
		| 'GRANT_TRADE_EXPERTISE' // A specific effect for Human trade expertise.
		| 'GRANT_SPELL' // Grants a known spell.
		| 'GRANT_CANTRIP' // Grants a known cantrip.
		| 'GRANT_MANEUVERS' // Grants knowledge of maneuvers.
		| 'GRANT_TECHNIQUES'; // Grants knowledge of techniques.

	/** The specific stat, attribute, or item being affected. Standardized for the calculator. */
	target: string; // e.g., 'might', 'hpMax', 'pd', 'ad', 'moveSpeed', 'jumpDistance', 'deathThresholdModifier', 'skillPoints', 'attributePoints', 'ancestryPoints', 'maneuver', 'technique', 'Poison', 'Charmed', 'Heavy_Armor', 'climb', 'darkvision', 'any_attribute', 'any_skill'

	/** The value of the effect. Can be a number, string, or complex object. */
	value: number | string | boolean | { [key: string]: any }; // e.g., 1, -1, 'half', 'equal_to_speed', true, { capIncrease: 1, levelIncrease: 1 }

	/** An optional condition under which this effect is active. */
	condition?: string; // e.g., 'not_wearing_armor', 'bloodied'

	/** If this effect requires a choice from the player to be resolved. */
	userChoice?: {
		prompt: string;
		options?: string[]; // e.g., ['might', 'agility', 'charisma', 'intelligence']
	};
}

// ================================================================= //
// II. ANCESTRY & TRAIT SCHEMAS
// ================================================================= //

export interface Trait {
	id: string;
	name: string;
	description: string;
	cost: number;
	isMinor?: boolean;
	isNegative?: boolean;
	prerequisites?: string[];
	effects: Effect[]; // Every mechanical benefit is now an Effect.
}

export interface Ancestry {
	id: string;
	name: string;
	description: string;
	defaultTraitIds: string[];
	expandedTraitIds: string[];
	/** Reference to the PDF / patch version the rules were sourced from. */
	rulesSource?: string;
	origin?: {
		prompt: string;
		options: string[];
	};
	variantTraits?: Trait[];
}

// ================================================================= //
// III. CLASS & FEATURE SCHEMAS
// ================================================================= //

/** A named benefit within a larger class feature, containing its own effects. */
export interface FeatureBenefit {
	name: string;
	description: string;
	effects: Effect[];
}

/** An option a player can select as part of a feature choice. */
export interface FeatureChoiceOption {
	name: string; // The value/ID of the option.
	description: string;
	effects: Effect[]; // Effects granted if this specific option is chosen.
}

/** A choice presented to the player by a class feature. */
export interface FeatureChoice {
	id: string; // A unique ID for this choice, e.g., "cleric_divine_domain_choice"
	prompt: string;
	count: number; // Number of options the player must select.
	options: FeatureChoiceOption[];
}

/** A single class feature, either core or from a subclass. */
export interface ClassFeature {
	featureName: string;
	levelGained: number;
	description: string;
	isFlavor?: boolean;
	/** Direct effects of the feature, applied automatically. */
	effects?: Effect[];
	/** Named sub-sections of a feature, each with its own effects. */
	benefits?: FeatureBenefit[];
	/** Choices the player must make to fully define the feature. */
	choices?: FeatureChoice[];
}

/** A subclass option for a given class. */
export interface Subclass {
	subclassName: string;
	description?: string;
	features: ClassFeature[];
}

/** The complete, robust definition for a single class. */
export interface ClassDefinition {
	className: string;
	// Path objects define the class's progression mechanics
	martialPath?: {
		combatTraining?: {
			weapons?: string[];
			armor?: string[];
			shields?: string[];
		};
		maneuvers?: {
			learnsAllAttack?: boolean;
			additionalKnown?: string;
		};
		techniques?: {
			additionalKnown?: string;
		};
		staminaPoints?: {
			maximumIncreasesBy?: string;
		};
		staminaRegen?: {
			description?: string;
			conditions?: string[];
		};
	};
	spellcasterPath?: {
		spellcastingProgression?: string;
		spellcastingAttribute?: string;
		spellList?: any;
		cantrips?: {
			description?: string;
		};
		spells?: {
			description?: string;
		};
		manaPoints?: {
			maximumIncreasesBy?: string;
		};
	};
	hybridPath?: {
		martialAspect?: {
			combatTraining?: {
				weapons?: string[];
				armor?: string[];
				shields?: string[];
			};
			maneuvers?: {
				learnsAllAttack?: boolean;
				additionalKnown?: string;
			};
			techniques?: {
				additionalKnown?: string;
			};
			staminaPoints?: {
				maximumIncreasesBy?: string;
			};
			staminaRegen?: {
				description?: string;
				conditions?: string[];
			};
		};
		spellcastingAspect?: {
			spellcastingProgression?: string;
			spellcastingAttribute?: string;
			spellList?: any;
			cantrips?: {
				description?: string;
			};
			spells?: {
				description?: string;
			};
			manaPoints?: {
				maximumIncreasesBy?: string;
			};
		};
	};
	coreFeatures: ClassFeature[];
	subclasses: Subclass[];
}

// ================================================================= //
// IV. CALCULATION DATA STRUCTURES
// ================================================================= //

/** Aggregated stat modifiers from all effects */
export interface StatModifiers {
	// Attributes
	might: number;
	agility: number;
	charisma: number;
	intelligence: number;

	// Core Stats
	hpMax: number;
	spMax: number;
	mpMax: number;
	pd: number;
	ad: number;
	pdr: number;

	// Movement & Combat
	moveSpeed: number;
	jumpDistance: number;
	deathThresholdModifier: number;
	saveDC: number;
	initiativeBonus: number;

	// Resource Stats
	skillPoints: number;
	tradePoints: number;
	languagePoints: number;
	attributePoints: number;
	ancestryPoints: number;
	restPoints: number;
	gritPoints: number;

	// Learning Stats
	maneuversKnown: number;
	techniquesKnown: number;
	cantripsKnown: number;
	spellsKnown: number;
	skillMasteryLimit: number;
	tradeMasteryLimit: number;
	knowledgeMasteryLimit: number;
}

/** Conditional modifiers that depend on circumstances */
export interface ConditionalModifier {
	effect: Effect;
	condition: string;
	description: string;
}

/** Abilities granted to the character (displayed as features) */
export interface GrantedAbility {
	name: string;
	description: string;
	source: string; // e.g., "Human Trait: Determination"
	type: 'passive' | 'active' | 'resistance' | 'advantage';
}

/** Result of effect processing */
export interface EffectProcessingResult {
	statModifiers: StatModifiers;
	conditionalModifiers: ConditionalModifier[];
	grantedAbilities: GrantedAbility[];
	combatTraining: string[];
	resistances: Array<{ type: string; value: string }>;
	vulnerabilities: Array<{ type: string; value: string }>;
	senses: Array<{ type: string; range: number }>;
	movements: Array<{ type: string; speed: string }>;
}
