/**
 * Convex Schema for DC20 Character Creator
 *
 * Convex schema for character storage.
 *
 * This schema maps the SavedCharacter TypeScript interface to Convex validators.
 * See src/lib/types/dataContracts.ts for the source interface.
 */

import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

// Reusable validators for nested objects

const masteryLadderValidator = v.record(v.string(), v.boolean());

const denormalizedMasteryEntryValidator = v.object({
	governingAttributes: v.array(v.string()),
	baseAttributeValues: v.object({
		might: v.number(),
		agility: v.number(),
		charisma: v.number(),
		intelligence: v.number(),
	}),
	masteryLevel: v.number(),
	masteryLadder: masteryLadderValidator,
	finalValue: v.number(),
});

const movementTypeValidator = v.object({
	half: v.boolean(),
	full: v.boolean(),
});

const movementValidator = v.object({
	burrow: movementTypeValidator,
	swim: movementTypeValidator,
	fly: movementTypeValidator,
	climb: movementTypeValidator,
	glide: movementTypeValidator,
});

const currencyValidator = v.object({
	gold: v.number(),
	silver: v.number(),
	copper: v.number(),
});

const resourcesCurrentValidator = v.object({
	currentHP: v.number(),
	currentSP: v.number(),
	currentMP: v.number(),
	currentGritPoints: v.number(),
	currentRestPoints: v.number(),
	tempHP: v.number(),
	actionPointsUsed: v.number(),
	exhaustionLevel: v.number(),
	deathSteps: v.number(),
	isDead: v.boolean(),
});

const resourcesOriginalValidator = v.object({
	maxHP: v.number(),
	maxSP: v.number(),
	maxMP: v.number(),
	maxGritPoints: v.number(),
	maxRestPoints: v.number(),
});

const uiStateValidator = v.object({
	manualDefenseOverrides: v.object({
		PD: v.optional(v.number()),
		AD: v.optional(v.number()),
		PDR: v.optional(v.number()),
	}),
});

const inventoryValidator = v.object({
	items: v.array(v.any()), // InventoryItemData - flexible for now
	currency: currencyValidator,
});

const notesValidator = v.object({
	playerNotes: v.string(),
});

const characterStateValidator = v.object({
	resources: v.object({
		current: resourcesCurrentValidator,
		original: v.optional(resourcesOriginalValidator),
	}),
	ui: uiStateValidator,
	inventory: inventoryValidator,
	notes: notesValidator,
	attacks: v.optional(v.array(v.any())),
	spells: v.optional(v.array(v.any())),
	maneuvers: v.optional(v.array(v.any())),
});

const practicalTradeEntryValidator = v.object({
	label: v.string(),
	ladder: masteryLadderValidator,
	finalValue: v.number(),
});

const languageMasteryEntryValidator = v.object({
	name: v.string(),
	limited: v.boolean(),
	fluent: v.boolean(),
});

const pathPointAllocationsValidator = v.object({
	martial: v.optional(v.number()),
	spellcasting: v.optional(v.number()),
});

// Main character table schema
const characterValidator = {
	// Owner reference (Convex Auth user ID)
	userId: v.id('users'),

	// Core Identity
	id: v.string(),
	finalName: v.string(),
	finalPlayerName: v.optional(v.string()),
	level: v.number(),

	// Classes & Ancestry
	classId: v.string(),
	className: v.string(),
	ancestry1Id: v.optional(v.string()),
	ancestry1Name: v.optional(v.string()),
	ancestry2Id: v.optional(v.union(v.string(), v.null())),
	ancestry2Name: v.optional(v.union(v.string(), v.null())),

	// Attributes
	finalMight: v.number(),
	finalAgility: v.number(),
	finalCharisma: v.number(),
	finalIntelligence: v.number(),

	// Calculated stats
	finalPrimeModifierValue: v.number(),
	finalPrimeModifierAttribute: v.string(),
	usePrimeCapRule: v.optional(v.boolean()),
	finalCombatMastery: v.number(),
	finalSaveMight: v.number(),
	finalSaveAgility: v.number(),
	finalSaveCharisma: v.number(),
	finalSaveIntelligence: v.number(),
	finalHPMax: v.number(),
	finalSPMax: v.number(),
	finalMPMax: v.number(),
	finalPD: v.number(),
	finalAD: v.number(),
	finalPDR: v.number(),
	finalSaveDC: v.number(),
	finalDeathThreshold: v.number(),
	finalMoveSpeed: v.number(),
	finalJumpDistance: v.number(),
	finalRestPoints: v.number(),
	finalGritPoints: v.number(),
	finalInitiativeBonus: v.number(),

	// Movement types
	movement: v.optional(movementValidator),
	holdBreath: v.optional(v.number()),

	// Derived thresholds
	finalPDHeavyThreshold: v.optional(v.number()),
	finalPDBrutalThreshold: v.optional(v.number()),
	finalADHeavyThreshold: v.optional(v.number()),
	finalADBrutalThreshold: v.optional(v.number()),

	// Bloodied values
	bloodiedValue: v.optional(v.number()),
	wellBloodiedValue: v.optional(v.number()),

	// Combat stats
	finalAttackSpellCheck: v.number(),
	finalMartialCheck: v.number(),

	// Typed data (no JSON strings)
	selectedTraitIds: v.array(v.string()),
	selectedFeatureChoices: v.any(), // Record<string, string>
	skillsData: v.any(), // Record<string, number>
	tradesData: v.any(), // Record<string, number>
	languagesData: v.any(), // Complex language map

	// Level progression data
	selectedTalents: v.optional(v.array(v.string())),
	pathPointAllocations: v.optional(pathPointAllocationsValidator),
	unlockedFeatureIds: v.optional(v.array(v.string())),
	selectedSubclass: v.optional(v.string()),
	pendingSubclassChoice: v.optional(v.boolean()),

	// Multiclass selections
	selectedMulticlassOption: v.optional(
		v.union(
			v.literal('novice'),
			v.literal('adept'),
			v.literal('expert'),
			v.literal('master'),
			v.literal('grandmaster'),
			v.literal('legendary'),
			v.null()
		)
	),
	selectedMulticlassClass: v.optional(v.string()),
	selectedMulticlassFeature: v.optional(v.string()),

	// Precomputed values
	skillTotals: v.optional(v.any()), // Record<string, number>
	skillMastery: v.optional(v.any()), // Record<string, DenormalizedMasteryEntry>
	knowledgeTradeMastery: v.optional(v.any()), // Record<knowledge keys, DenormalizedMasteryEntry>
	masteryLadders: v.optional(
		v.object({
			skills: v.optional(v.any()), // Record<string, MasteryLadder>
			knowledgeTrades: v.optional(v.any()),
			practicalTrades: v.optional(
				v.object({
					A: v.optional(practicalTradeEntryValidator),
					B: v.optional(practicalTradeEntryValidator),
					C: v.optional(practicalTradeEntryValidator),
					D: v.optional(practicalTradeEntryValidator),
				})
			),
		})
	),
	languageMastery: v.optional(
		v.object({
			A: v.optional(languageMasteryEntryValidator),
			B: v.optional(languageMasteryEntryValidator),
			C: v.optional(languageMasteryEntryValidator),
			D: v.optional(languageMasteryEntryValidator),
		})
	),

	// Spells and maneuvers at root level
	spells: v.array(v.any()), // SpellData[]
	maneuvers: v.array(v.any()), // ManeuverData[]

	// Background point conversions
	skillToTradeConversions: v.optional(v.number()),
	tradeToSkillConversions: v.optional(v.number()),
	tradeToLanguageConversions: v.optional(v.number()),

	// Dynamic state
	characterState: characterStateValidator,

	// Calculation breakdowns
	breakdowns: v.any(), // Record<string, EnhancedStatBreakdown>

	// Metadata
	createdAt: v.string(),
	lastModified: v.string(),
	completedAt: v.string(),
	schemaVersion: v.string(),
};

export default defineSchema({
	...authTables,
	characters: defineTable(characterValidator)
		.index('by_user', ['userId'])
		.index('by_user_and_id', ['userId', 'id'])
		.index('by_user_and_name', ['userId', 'finalName']),
});
