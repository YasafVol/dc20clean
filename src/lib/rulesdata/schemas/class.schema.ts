import { z } from 'zod';

// Schema for IEffect
const effectSchema = z.object({
	type: z.string(),
	target: z.string().optional(),
	value: z.any().optional(),
	condition: z.string().optional(),
	userChoiceRequired: z
		.object({
			prompt: z.string(),
			options: z.array(z.string()).optional()
		})
		.optional(),
	descriptionOverride: z.string().optional(),
	subFeature: z.string().optional(),
	schools: z.array(z.string()).optional()
});

// Schema for IClassFeatureChoiceOption
const classFeatureChoiceOptionSchema = z.object({
	value: z.string(),
	label: z.string(),
	description: z.string().optional(),
	effectsOnChoice: z.array(effectSchema).optional()
});

// Schema for IClassFeatureChoice
const classFeatureChoiceSchema = z.object({
	id: z.string(),
	prompt: z.string(),
	type: z.enum(['select_one', 'select_multiple']),
	maxSelections: z.number().optional(),
	options: z.array(classFeatureChoiceOptionSchema)
});

// Schema for IBenefit
const benefitSchema = z.object({
	name: z.string(),
	description: z.string(),
	effects: z.array(effectSchema).optional()
});

// Schema for IClassFeature
const classFeatureSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	level: z.number(),
	effects: z.array(effectSchema).optional(),
	benefits: z.array(benefitSchema).optional()
});

// Schema for IClassDefinition
export const classSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	baseHpContribution: z.number(),
	startingSP: z.number(),
	startingMP: z.number(),
	skillPointGrantLvl1: z.number().optional(),
	tradePointGrantLvl1: z.number().optional(),
	combatTraining: z.array(z.string()).optional(),
	maneuversKnownLvl1: z.union([z.string(), z.number()]).optional(),
	techniquesKnownLvl1: z.number().optional(),
	saveDCBase: z.number(),
	deathThresholdBase: z.number(),
	moveSpeedBase: z.number(),
	restPointsBase: z.number(),
	gritPointsBase: z.number(),
	initiativeBonusBase: z.number(),
	cantripsKnownLvl1: z.number().optional(),
	spellsKnownLvl1: z.number().optional(),
	// Level progression data for future level gaining
	levelProgression: z.array(z.object({
		level: z.number(),
		healthPoints: z.number(),
		attributePoints: z.number(),
		skillPoints: z.number(),
		tradePoints: z.number(),
		staminaPoints: z.number(),
		maneuversKnown: z.number(),
		techniquesKnown: z.number(),
		manaPoints: z.number(),
		cantripsKnown: z.number(),
		spellsKnown: z.number(),
		features: z.string() // Description of features gained at this level
	})),
	// Features should be handled by class-features.loader.ts, but keeping for schema compatibility
	level1Features: z.array(classFeatureSchema).optional(),
	featureChoicesLvl1: z.array(classFeatureChoiceSchema).optional()
});

// Schema for an array of class definitions
export const classesDataSchema = z.array(classSchema);

// Infer the TypeScript type from the schema
export type IClassDefinition = z.infer<typeof classSchema>;
