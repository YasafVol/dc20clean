import { z } from 'zod';

// Shared helpers
const masteryLevelSchema = z.object({
	'2': z.boolean(),
	'4': z.boolean(),
	'6': z.boolean(),
	'8': z.boolean(),
	'10': z.boolean()
});

const languageFluencySchema = z.object({
	Limited: z.boolean(),
	Fluent: z.boolean()
});

const movementModeSchema = z.object({
	half: z.boolean(),
	full: z.boolean()
});

const attackSchema = z.object({
	name: z.string(),
	damage: z.string(),
	type: z.string(),
	notes: z.string()
});

const poolWithTempSchema = z.object({
	max: z.number(),
	current: z.number(),
	temp: z.number()
});

const poolSchema = z.object({
	max: z.number(),
	current: z.number()
});

const gritSchema = z.object({
	cap: z.number(),
	current: z.number()
});

const defenseSchema = z.object({
	physical: z.number(),
	physicalHeavyThreshold: z.number(),
	physicalBrutalThreshold: z.number(),
	mental: z.number(),
	mentalHeavyThreshold: z.number(),
	mentalBrutalThreshold: z.number()
});

const resourceSchema = z.object({
	label: z.string(),
	cap: z.number(),
	current: z.number()
});

const reductionSchema = z.object({
	physical: z.boolean(),
	elemental: z.boolean(),
	mental: z.boolean()
});

const languageEntrySchema = z.object({
	name: z.string(),
	limited: z.boolean(),
	fluent: z.boolean()
});

const equippedSchema = z.object({
	head: z.string(),
	neck: z.string(),
	mantle: z.string(),
	body: z.string(),
	waist: z.string(),
	hands: z.string(),
	ringRight: z.string(),
	ringLeft: z.string(),
	feet: z.string()
});

const attunementItemSchema = z.object({
	name: z.string(),
	active: z.boolean()
});

const attunementSchema = z.object({
	slots: z.number(),
	items: z.array(attunementItemSchema).length(5)
});

const inventorySchema = z.object({
	carried: z.string(),
	stored: z.string(),
	supplies: z
		.array(
			z.object({
				label: z.string(),
				amount: z.number()
			})
		)
		.length(11)
});

// Mastery matrix (skills, trades, languages)
const masterySchema = z.object({
	Awareness: masteryLevelSchema,
	Athletics: masteryLevelSchema,
	Intimidation: masteryLevelSchema,
	Acrobatics: masteryLevelSchema,
	Trickery: masteryLevelSchema,
	Stealth: masteryLevelSchema,
	Animal: masteryLevelSchema,
	Influence: masteryLevelSchema,
	Insight: masteryLevelSchema,
	Investigation: masteryLevelSchema,
	Medicine: masteryLevelSchema,
	Survival: masteryLevelSchema,
	Arcana: masteryLevelSchema,
	History: masteryLevelSchema,
	Nature: masteryLevelSchema,
	Occultism: masteryLevelSchema,
	Religion: masteryLevelSchema,
	TradeA: masteryLevelSchema,
	TradeB: masteryLevelSchema,
	TradeC: masteryLevelSchema,
	TradeD: masteryLevelSchema,
	LanguageA: languageFluencySchema,
	LanguageB: languageFluencySchema,
	LanguageC: languageFluencySchema,
	LanguageD: languageFluencySchema
});

const proficiencySchema = z.object({
	expertise: z.boolean(),
	athletics: z.boolean(),
	intimidation: z.boolean(),
	trickery: z.boolean(),
	acrobatics: z.boolean(),
	stealth: z.boolean(),
	influence: z.boolean(),
	animal: z.boolean(),
	insight: z.boolean(),
	medicine: z.boolean(),
	investigation: z.boolean(),
	survival: z.boolean(),
	history: z.boolean(),
	arcana: z.boolean(),
	nature: z.boolean(),
	tradeA: z.boolean(),
	religion: z.boolean(),
	occultism: z.boolean(),
	tradeD: z.boolean(),
	tradeC: z.boolean(),
	tradeB: z.boolean()
});

export const PdfExportDataSchema = z.object({
	// Header
	characterName: z.string(),
	playerName: z.string(),
	level: z.number(),
	ancestry: z.string(),
	classAndSubclass: z.string(),
	features: z.string(),

	// Core attributes
	prime: z.number(),
	might: z.number(),
	agility: z.number(),
	charisma: z.number(),
	intelligence: z.number(),
	combatMastery: z.number(),

	// Saves & skills (sheet totals)
	mightSave: z.number(),
	agilitySave: z.number(),
	charismaSave: z.number(),
	intelligenceSave: z.number(),
	awareness: z.number(),
	athletics: z.number(),
	intimidation: z.number(),
	acrobatics: z.number(),
	trickery: z.number(),
	stealth: z.number(),
	animal: z.number(),
	influence: z.number(),
	insight: z.number(),
	investigation: z.number(),
	medicine: z.number(),
	survival: z.number(),
	arcana: z.number(),
	history: z.number(),
	nature: z.number(),
	occultism: z.number(),
	religion: z.number(),

	// Trades (labels/custom)
	tradeA: z.string(),
	tradeB: z.string(),
	tradeC: z.string(),
	tradeD: z.string(),
	customTradeA: z.string(),
	customTradeB: z.string(),
	customTradeC: z.string(),
	customTradeD: z.string(),

	// Mastery & proficiency
	mastery: masterySchema,
	proficiency: proficiencySchema,

	// Combat
	attackCheck: z.number(),
	saveDC: z.number(),
	initiative: z.number(),
	attacks: z.array(attackSchema).length(4),

	// Pools and resources
	hitPoints: poolWithTempSchema,
	stamina: poolSchema,
	mana: poolSchema,
	grit: gritSchema,
	restPoints: z.object({ cap: z.number(), current: z.number() }),
	resources: z.array(resourceSchema).length(9),

	// Defense & status
	defense: defenseSchema,
	bloodied: z.boolean(),
	wellBloodied: z.boolean(),
	// Numeric values for sheet text fields
	bloodiedValue: z.number().optional(),
	wellBloodiedValue: z.number().optional(),
	reduction: reductionSchema,

	// Movement & misc
	moveSpeed: z.number(),
	movement: z.object({
		burrow: movementModeSchema,
		swim: movementModeSchema,
		fly: movementModeSchema,
		climb: movementModeSchema,
		glide: movementModeSchema
	}),
	jumpDistance: z.number(),
	holdBreath: z.number(),

	// Exhaustion track
	exhaustion: z.object({
		'-1': z.boolean(),
		'-2': z.boolean(),
		'-3': z.boolean(),
		'-4': z.boolean(),
		'-5': z.boolean()
	}),

	// Languages (up to 4 lines)
	languages: z.array(languageEntrySchema).length(4),

	// Equipment & attunement & inventory
	equipped: equippedSchema,
	attunement: attunementSchema,
	inventory: inventorySchema,

	// Notes & death threshold
	misc: z.string(),
	deathThreshold: z.number()
});

export type PdfExportData = z.infer<typeof PdfExportDataSchema>;


