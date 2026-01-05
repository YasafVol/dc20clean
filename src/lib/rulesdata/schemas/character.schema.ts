/**
 * @file src/lib/rulesdata/schemas/character.schema.ts
 * @description The definitive schema for all character creation data, designed for robust, machine-readable processing.
 */

// ================================================================= //
// I. CORE EFFECT MODEL - The Heart of the System
// ================================================================= //

/** A universal, machine-readable representation of a single mechanical effect. */
export type Effect =
	| ModifyAttributeEffect
	| ModifyStatEffect
	| SetValueEffect
	| GrantAbilityEffect
	| GrantResistanceEffect
	| GrantVulnerabilityEffect
	| GrantAdvantageOnSaveEffect
	| GrantAdvantageOnCheckEffect
	| GrantCombatTrainingEffect
	| GrantMovementEffect
	| GrantSenseEffect
	| GrantChoiceEffect
	| GrantSkillExpertiseEffect
	| GrantTradeExpertiseEffect
	| GrantSpellEffect
	| GrantCantripEffect
	| GrantManeuverEffect
	| ModifyMasteryCapEffect
	| IncreaseMasteryCapEffect
	// Condition interaction effects (from CONDITIONS_SPEC.md)
	| GrantConditionImmunityEffect
	| GrantConditionResistanceEffect
	| GrantConditionVulnerabilityEffect;

// --- Effect Type Interfaces ---

export interface ModifyAttributeEffect {
	type: 'MODIFY_ATTRIBUTE';
	target: string;
	value: number;
	userChoice?: { prompt: string; options?: string[] };
}

export interface ModifyStatEffect {
	type: 'MODIFY_STAT';
	target: string;
	value: number;
	condition?: string;
}

export interface SetValueEffect {
	type: 'SET_VALUE';
	target: string;
	value: string | number;
}

export interface GrantAbilityEffect {
	type: 'GRANT_ABILITY';
	target: string;
	value: string;
}

export interface GrantResistanceEffect {
	type: 'GRANT_RESISTANCE';
	target: string;
	value: string | number | boolean;
	optional?: string;
}

export interface GrantVulnerabilityEffect {
	type: 'GRANT_VULNERABILITY';
	target: string;
	value: number;
}

export interface GrantAdvantageOnSaveEffect {
	type: 'GRANT_ADV_ON_SAVE';
	target: string;
	value: string | boolean;
}

export interface GrantAdvantageOnCheckEffect {
	type: 'GRANT_ADV_ON_CHECK';
	target: string;
	value: string | boolean;
}

export interface GrantCombatTrainingEffect {
	type: 'GRANT_COMBAT_TRAINING';
	target: string;
	value: boolean;
}

export interface GrantMovementEffect {
	type: 'GRANT_MOVEMENT';
	target: string;
	value: string;
}

export interface GrantSenseEffect {
	type: 'GRANT_SENSE';
	target: string;
	value: number;
}

export interface GrantChoiceEffect {
	type: 'GRANT_CHOICE';
	target: string;
	value: number;
	userChoice?: { prompt: string; options?: string[] };
}

export interface GrantSkillExpertiseEffect {
	type: 'GRANT_SKILL_EXPERTISE';
	target: string;
	value: { capIncrease: number; levelIncrease: number };
	userChoice?: { prompt: string; count?: number };
}

export interface GrantTradeExpertiseEffect {
	type: 'GRANT_TRADE_EXPERTISE';
	target: string;
	value: { capIncrease: number; levelIncrease: number };
	userChoice?: { prompt: string };
}

export interface GrantSpellEffect {
	type: 'GRANT_SPELL';
	target: string;
	value: number | string;
	userChoice?: { prompt: string; options?: string[] };
}

export interface GrantCantripEffect {
	type: 'GRANT_CANTRIP';
	target: string;
	value: number;
}

export interface GrantManeuverEffect {
	type: 'GRANT_MANEUVERS';
	target: string;
	value: number;
}

export interface ModifyMasteryCapEffect {
	type: 'MODIFY_SKILL_MASTERY_CAP' | 'MODIFY_TRADE_MASTERY_CAP';
	tier: 'Adept' | 'Expert' | 'Master' | 'Grandmaster';
	count: number;
	options?: string[];
}

export interface IncreaseMasteryCapEffect {
	type: 'INCREASE_SKILL_MASTERY_CAP' | 'INCREASE_TRADE_MASTERY_CAP';
	count: number;
	value: number;
	options?: string[];
}

// --- Condition Interaction Effect Interfaces (CONDITIONS_SPEC.md) ---

/**
 * Grants complete immunity to a specific condition.
 * The character cannot be affected by this condition at all.
 */
export interface GrantConditionImmunityEffect {
	type: 'GRANT_CONDITION_IMMUNITY';
	/** The condition ID (e.g., 'charmed', 'frightened', 'poisoned') */
	target: string;
	/** Optional source description for UI display */
	source?: string;
}

/**
 * Grants resistance to a specific condition.
 * May grant ADV on saves, reduce duration/stacks, or provide other mitigation.
 */
export interface GrantConditionResistanceEffect {
	type: 'GRANT_CONDITION_RESISTANCE';
	/** The condition ID (e.g., 'charmed', 'frightened', 'exhaustion-x') */
	target: string;
	/** The type of resistance: 'advantage' for ADV on saves, 'reduction' for stack reduction */
	value: 'advantage' | 'reduction' | 'half';
	/** Optional source description for UI display */
	source?: string;
}

/**
 * Grants vulnerability to a specific condition.
 * May impose DisADV on saves or increase duration/stacks.
 */
export interface GrantConditionVulnerabilityEffect {
	type: 'GRANT_CONDITION_VULNERABILITY';
	/** The condition ID (e.g., 'psychic-damage', 'taunted') */
	target: string;
	/** The severity of vulnerability: 'disadvantage' for DisADV on saves, 'double' for double stacks */
	value: 'disadvantage' | 'double';
	/** Optional source description for UI display */
	source?: string;
}

// ================================================================= //
// II. ANCESTRY & TRAIT SCHEMAS
// ================================================================= //

export interface Trait {
	id: string;
	name: string;
	description: string;
	cost: number;
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
	id?: string;
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
	startingEquipment?: {
		weaponsOrShields?: string | string[];
		rangedWeapons?: string | string[];
		armor?: string | string[];
		packs?: string | string[];
		[key: string]: unknown;
	};
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
		staminaPoints?: {
			maximumIncreasesBy?: string;
		};
		staminaRegen?: {
			description?: string;
			conditions?: string[];
		};
	};
	spellcasterPath?: {
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
			staminaPoints?: {
				maximumIncreasesBy?: string;
			};
			staminaRegen?: {
				description?: string;
				conditions?: string[];
			};
		};
		spellcastingAspect?: {
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
