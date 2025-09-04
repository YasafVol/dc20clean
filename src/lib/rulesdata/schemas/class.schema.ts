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

// ADD THESE SCHEMAS
const combatTrainingSchema = z.object({
    weapons: z.array(z.string()).optional(),
    armor: z.array(z.string()).optional(),
    shields: z.array(z.string()).optional()
}).optional();

const martialPathSchema = z.object({
    combatTraining: combatTrainingSchema,
    maneuvers: z.object({ learnsAllAttack: z.boolean().optional(), additionalKnown: z.string().optional() }).optional(),
    techniques: z.object({ additionalKnown: z.string().optional() }).optional(),
    staminaPoints: z.object({ maximumIncreasesBy: z.string().optional() }).optional(),
    staminaRegen: z.object({ description: z.string().optional(), conditions: z.array(z.string()).optional() }).optional()
}).optional();

const spellcasterPathSchema = z.object({
    spellcastingProgression: z.string(),
    spellcastingAttribute: z.string(),
    spellList: z.any().optional(),
    cantrips: z.object({ description: z.string() }).optional(),
    spells: z.object({ description: z.string() }).optional(),
    manaPoints: z.object({ maximumIncreasesBy: z.string().optional() }).optional(),
}).optional();

const hybridPathSchema = z.object({
    martialAspect: martialPathSchema,
    spellcastingAspect: spellcasterPathSchema
}).optional();

// Schema for IClassDefinition
export const classSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),

	level1Stats: z.object({
		healthPoints: z.number(),
		staminaPoints: z.number(),
		manaPoints: z.number(),
		skillPoints: z.number(),
		tradePoints: z.number(),
		maneuversKnown: z.number(),
		techniquesKnown: z.number(),
		cantripsKnown: z.number(),
		spellsKnown: z.number(),
	}),

	levelProgression: z.array(
		z.object({
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
			features: z.string()
		})
	),

	martialPath: martialPathSchema,
	spellcasterPath: spellcasterPathSchema,
	hybridPath: hybridPathSchema,

	level1Features: z.array(classFeatureSchema).optional(),
	featureChoicesLvl1: z.array(classFeatureChoiceSchema).optional()
});

// Schema for an array of class definitions
export const classesDataSchema = z.array(classSchema);

// Infer the TypeScript type from the schema
export type IClassDefinition = z.infer<typeof classSchema>;
