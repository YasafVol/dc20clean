// src/lib/rulesdata/types.ts

// Interface for Attribute Data
export interface IAttributeData {
	id: 'might' | 'agility' | 'charisma' | 'intelligence';
	name: string;
	description: string;
	derivedStats?: Array<{ statName: string; formula: string }>;
}

// Interface for Trait Effects
export interface ITraitEffect {
	type: string; // e.g., 'MODIFY_ATTRIBUTE', 'GRANT_SKILL_EXPERTISE', 'GRANT_FEATURE'
	target?: string; // e.g., attribute ID ('might'), skill ID ('athletics'), feature ID ('rage')
	value?: any; // e.g., number for attribute modification, object for skill expertise details
	condition?: string; // Optional condition for the effect to apply
	userChoiceRequired?: {
		// Details if the user needs to make a choice for this effect
		prompt: string; // Prompt shown to the user
		options?: string[]; // Optional list of specific options (e.g., skill IDs, attribute IDs)
	};
	descriptionOverride?: string; // Optional override for how this effect is described
	subFeature?: string; // Optional sub-feature identifier for complex effects
	schools?: string[]; // Optional list of spell schools associated with the effect
}

// Interface for Traits
export interface ITrait {
	id: string;
	name: string;
	description: string;
	cost: number; // Ancestry points cost
	isMinor?: boolean; // True if this is a Minor Trait
	isNegative?: boolean; // True if this is a Negative Trait (grants points)
	effects?: ITraitEffect[]; // Array of effects the trait grants
	prerequisites?: any[]; // Optional prerequisites for taking this trait
	sourceAncestryId?: string; // ID of the ancestry this trait belongs to (for combined lists)
}

// Interface for Ancestries
export interface IAncestry {
	id: string;
	name: string;
	description: string;
	defaultTraitIds?: string[]; // Traits automatically granted
	expandedTraitIds: string[]; // Traits available for selection
	rulesSource?: string; // e.g., 'DC20Beta0.95' to track PDF/patch version
	origin?: {
		// Optional origin property for ancestries with specific origins (e.g., Dragonborn, Fiendborn, Beastborn)
		prompt: string; // Prompt shown to the user for choosing an origin
		options?: string[]; // Optional list of specific options for the origin
	};
	variantTraits?: ITrait[]; // Optional list of variant traits (e.g., Fallen Angelborn, Redeemed Fiendborn)
}

// Interface for Class Feature Choice Options
export interface IClassFeatureChoiceOption {
	value: string; // Internal value for the choice
	label: string; // Display label for the choice
	description?: string; // Optional description for the choice
	effectsOnChoice?: ITraitEffect[]; // Effects granted if this option is chosen
}

// Interface for Class Feature Choices
export interface IClassFeatureChoice {
	id: string; // Internal ID for the choice (e.g., 'sorcerousOrigin')
	prompt: string; // Prompt shown to the user
	type: 'select_one' | 'select_multiple'; // Type of selection
	maxSelections?: number; // Max number of options if type is 'select_multiple'
	options: IClassFeatureChoiceOption[]; // Available options for the choice
}

// Interface for Class Features
export interface IClassFeature {
	id: string;
	name: string;
	description: string;
	level: number; // Level at which the feature is gained
	effects?: ITraitEffect[]; // Effects granted by the feature
}

// Interface for Class Definitions
export interface IClassDefinition {
	id: string;
	name: string;
	description: string;
	// Base stats granted by the class at Level 1
	baseHpContribution: number;
	startingSP: number;
	startingMP: number;
	skillPointGrantLvl1?: number; // Additional skill points granted at Lvl 1 (beyond Int mod)
	tradePointGrantLvl1?: number; // Additional trade points granted at Lvl 1 (beyond Int mod)
	combatTraining?: string[]; // Array of combat training proficiencies (e.g., 'Weapons', 'All Armor')
	maneuversKnownLvl1?: string | number; // Maneuvers known at Level 1 (can be 'All Attack' or a number)
	techniquesKnownLvl1?: number; // Techniques known at Level 1
	saveDCBase: number;
	deathThresholdBase: number;
	moveSpeedBase: number;
	restPointsBase: number;
	gritPointsBase: number; // Base grit points (before Charisma mod)
	initiativeBonusBase: number; // Base initiative bonus (before Agility mod)
	// Add cantripsKnownLvl1, spellsKnownLvl1 if applicable (not for Barbarian L1)
	cantripsKnownLvl1?: number;
	spellsKnownLvl1?: number;

	level1Features: IClassFeature[]; // Features gained at Level 1
	featureChoicesLvl1?: IClassFeatureChoice[]; // Choices available for features at Level 1
	// ... other level-specific data to be added later
}

// Interface for Skill Data
export interface ISkillData {
	id: string;
	name: string;
	attributeAssociation: 'might' | 'agility' | 'charisma' | 'intelligence' | 'prime'; // Associated attribute
	description: string;
}

// Interface for Trade Data
export interface ITradeData {
	id: string;
	name: string;
	attributeAssociation: 'might' | 'agility' | 'charisma' | 'intelligence'; // Associated attribute
	description: string;
	tools?: string; // Required tools for the trade
}

// Interface for Language Data
export interface ILanguageData {
	id: string;
	name: string;
	type: 'standard' | 'exotic'; // Type of language
	description: string;
}
