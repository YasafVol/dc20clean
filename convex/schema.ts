/**
 * Convex Schema for DC20 Character Creator
 *
 * Convex schema for character and DM tools storage.
 *
 * This schema maps TypeScript interfaces to Convex validators.
 * See src/lib/types/dataContracts.ts for character interface.
 * See src/lib/rulesdata/schemas/monster.schema.ts for monster interface.
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
		intelligence: v.number()
	}),
	masteryLevel: v.number(),
	masteryLadder: masteryLadderValidator,
	finalValue: v.number()
});

const movementTypeValidator = v.object({
	half: v.boolean(),
	full: v.boolean()
});

const movementValidator = v.object({
	burrow: movementTypeValidator,
	swim: movementTypeValidator,
	fly: movementTypeValidator,
	climb: movementTypeValidator,
	glide: movementTypeValidator
});

const currencyValidator = v.object({
	gold: v.number(),
	silver: v.number(),
	copper: v.number()
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
	isDead: v.boolean()
});

const resourcesOriginalValidator = v.object({
	maxHP: v.number(),
	maxSP: v.number(),
	maxMP: v.number(),
	maxGritPoints: v.number(),
	maxRestPoints: v.number()
});

const uiStateValidator = v.object({
	manualDefenseOverrides: v.object({
		PD: v.optional(v.number()),
		AD: v.optional(v.number()),
		PDR: v.optional(v.number())
	})
});

const inventoryValidator = v.object({
	items: v.array(v.any()), // InventoryItemData - flexible for now
	currency: currencyValidator
});

const notesValidator = v.object({
	playerNotes: v.string()
});

const characterStateValidator = v.object({
	resources: v.object({
		current: resourcesCurrentValidator,
		original: v.optional(resourcesOriginalValidator)
	}),
	ui: uiStateValidator,
	inventory: inventoryValidator,
	notes: notesValidator,
	attacks: v.optional(v.array(v.any())),
	spells: v.optional(v.array(v.any())),
	maneuvers: v.optional(v.array(v.any()))
});

const practicalTradeEntryValidator = v.object({
	label: v.string(),
	ladder: masteryLadderValidator,
	finalValue: v.number()
});

const languageMasteryEntryValidator = v.object({
	name: v.string(),
	limited: v.boolean(),
	fluent: v.boolean()
});

const pathPointAllocationsValidator = v.object({
	martial: v.optional(v.number()),
	spellcasting: v.optional(v.number())
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
	// Note: App uses Record<string, number> internally but converts to array for storage
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
					D: v.optional(practicalTradeEntryValidator)
				})
			)
		})
	),
	languageMastery: v.optional(
		v.object({
			A: v.optional(languageMasteryEntryValidator),
			B: v.optional(languageMasteryEntryValidator),
			C: v.optional(languageMasteryEntryValidator),
			D: v.optional(languageMasteryEntryValidator)
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
	schemaVersion: v.string()
};

// ============================================================================
// DM TOOLS: MONSTER SCHEMA
// ============================================================================

// Monster action validator
const monsterActionValidator = v.object({
	id: v.string(), // act_<uuid>
	name: v.string(),
	apCost: v.number(),
	type: v.union(v.literal('martial'), v.literal('spell'), v.literal('special')),
	targetDefense: v.union(v.literal('pd'), v.literal('ad')),
	damage: v.number(),
	damageType: v.optional(v.string()),
	range: v.optional(v.number()),
	area: v.optional(v.string()),
	description: v.string()
});

// Monster attributes validator
const monsterAttributesValidator = v.object({
	might: v.number(),
	agility: v.number(),
	charisma: v.number(),
	intelligence: v.number()
});

// Fork tracking validator
const forkedFromValidator = v.object({
	id: v.string(),
	type: v.union(v.literal('official'), v.literal('custom'), v.literal('homebrew')),
	name: v.string(),
	userId: v.optional(v.string()),
	forkedAt: v.string()
});

const forkStatsValidator = v.object({
	forkCount: v.number(),
	lastForkedAt: v.optional(v.string())
});

// Main monster table schema
const monsterValidator = {
	// Owner reference (Convex Auth user ID)
	userId: v.id('users'),

	// Identity
	id: v.string(), // mon_<uuid>
	name: v.string(),
	description: v.optional(v.string()),
	level: v.number(), // -1 to 10
	tier: v.union(v.literal('standard'), v.literal('apex'), v.literal('legendary')),
	roleId: v.union(
		v.literal('artillerist'),
		v.literal('brute'),
		v.literal('controller'),
		v.literal('defender'),
		v.literal('leader'),
		v.literal('lurker'),
		v.literal('skirmisher'),
		v.literal('support')
	),

	// Flavor/Lore
	size: v.optional(
		v.union(
			v.literal('Tiny'),
			v.literal('Small'),
			v.literal('Medium'),
			v.literal('Large'),
			v.literal('Huge'),
			v.literal('Gargantuan')
		)
	),
	monsterType: v.optional(
		v.union(
			v.literal('Aberration'),
			v.literal('Beast'),
			v.literal('Celestial'),
			v.literal('Construct'),
			v.literal('Dragon'),
			v.literal('Elemental'),
			v.literal('Fey'),
			v.literal('Fiend'),
			v.literal('Giant'),
			v.literal('Humanoid'),
			v.literal('Monstrosity'),
			v.literal('Ooze'),
			v.literal('Plant'),
			v.literal('Undead')
		)
	),
	alignment: v.optional(
		v.union(
			v.literal('Lawful Good'),
			v.literal('Neutral Good'),
			v.literal('Chaotic Good'),
			v.literal('Lawful Neutral'),
			v.literal('True Neutral'),
			v.literal('Chaotic Neutral'),
			v.literal('Lawful Evil'),
			v.literal('Neutral Evil'),
			v.literal('Chaotic Evil'),
			v.literal('Unaligned'),
			v.literal('Varies')
		)
	),
	lore: v.optional(v.string()),
	tactics: v.optional(v.string()),

	// Calculated Stats
	finalHP: v.number(),
	finalPD: v.number(),
	finalAD: v.number(),
	finalAttack: v.number(),
	finalSaveDC: v.number(),
	finalBaseDamage: v.number(),

	// Attributes (flavor/roleplay)
	attributes: monsterAttributesValidator,

	// Features
	featureIds: v.array(v.string()),
	featurePointsSpent: v.number(),
	featurePointsMax: v.number(),

	// Actions
	actions: v.array(monsterActionValidator),

	// Sharing
	visibility: v.union(
		v.literal('private'),
		v.literal('public_anonymous'),
		v.literal('public_credited')
	),
	approvalStatus: v.union(
		v.literal('draft'),
		v.literal('pending_review'),
		v.literal('approved'),
		v.literal('rejected')
	),
	isHomebrew: v.boolean(),
	rejectionReason: v.optional(v.string()),
	submittedAt: v.optional(v.string()),
	approvedAt: v.optional(v.string()),
	approvedBy: v.optional(v.string()),

	// Fork Tracking
	forkedFrom: v.optional(forkedFromValidator),
	forkStats: v.optional(forkStatsValidator),

	// Soft Delete
	deletedAt: v.optional(v.string()),
	deletedBy: v.optional(v.string()),
	scheduledPurgeAt: v.optional(v.string()),

	// Metadata
	createdAt: v.string(),
	lastModified: v.string(),
	schemaVersion: v.string(),

	// Calculation Breakdowns
	breakdowns: v.any() // Record<string, StatBreakdown>
};

// ============================================================================
// DM TOOLS: CUSTOM FEATURE SCHEMA
// ============================================================================

// Feature effect validator
const featureEffectValidator = v.object({
	type: v.string(),
	target: v.optional(v.string()),
	value: v.optional(v.any()),
	description: v.optional(v.string())
});

// ============================================================================
// DM TOOLS: ENCOUNTER SCHEMA
// ============================================================================

// Party config validator
const partyConfigValidator = v.object({
	size: v.number(), // 1-8 players
	averageLevel: v.number() // 0-10
});

// Monster slot validator
const encounterMonsterSlotValidator = v.object({
	id: v.string(), // slot_<uuid>
	monsterId: v.union(v.string(), v.null()),
	quantity: v.number(),
	cost: v.number(),
	notes: v.optional(v.string())
});

// Encounter table schema
const encounterValidator = {
	// Owner reference (Convex Auth user ID)
	userId: v.id('users'),

	// Identity
	id: v.string(), // enc_<uuid>
	name: v.string(),
	description: v.optional(v.string()),

	// Party Configuration
	party: partyConfigValidator,
	difficulty: v.union(
		v.literal('trivial'),
		v.literal('easy'),
		v.literal('medium'),
		v.literal('hard'),
		v.literal('deadly')
	),

	// Budget (all calculated)
	baseBudget: v.number(),
	difficultyModifier: v.number(),
	adjustedBudget: v.number(),
	spentBudget: v.number(),
	remainingBudget: v.number(),

	// Monster Slots
	monsters: v.array(encounterMonsterSlotValidator),

	// Environment & Notes
	environment: v.optional(v.string()),
	gmNotes: v.optional(v.string()),

	// Sharing
	visibility: v.union(
		v.literal('private'),
		v.literal('public_anonymous'),
		v.literal('public_credited')
	),
	approvalStatus: v.union(
		v.literal('draft'),
		v.literal('pending_review'),
		v.literal('approved'),
		v.literal('rejected')
	),
	isHomebrew: v.boolean(),
	rejectionReason: v.optional(v.string()),
	submittedAt: v.optional(v.string()),
	approvedAt: v.optional(v.string()),
	approvedBy: v.optional(v.string()),

	// Fork Tracking
	forkedFrom: v.optional(forkedFromValidator),
	forkStats: v.optional(forkStatsValidator),

	// Soft Delete
	deletedAt: v.optional(v.string()),
	deletedBy: v.optional(v.string()),
	scheduledPurgeAt: v.optional(v.string()),

	// Metadata
	createdAt: v.string(),
	lastModified: v.string(),
	schemaVersion: v.string()
};

// Custom feature table schema
const customFeatureValidator = {
	// Owner reference (Convex Auth user ID)
	userId: v.id('users'),

	// Identity
	id: v.string(), // feat_<uuid>
	name: v.string(),
	description: v.string(),
	pointCost: v.number(), // 1-5
	isOfficial: v.boolean(), // Always false for custom
	effects: v.optional(v.array(featureEffectValidator)),

	// Sharing (same as monster)
	visibility: v.union(
		v.literal('private'),
		v.literal('public_anonymous'),
		v.literal('public_credited')
	),
	approvalStatus: v.union(
		v.literal('draft'),
		v.literal('pending_review'),
		v.literal('approved'),
		v.literal('rejected')
	),
	isHomebrew: v.boolean(),
	rejectionReason: v.optional(v.string()),
	submittedAt: v.optional(v.string()),
	approvedAt: v.optional(v.string()),
	approvedBy: v.optional(v.string()),

	// Fork Tracking
	forkedFrom: v.optional(forkedFromValidator),
	forkStats: v.optional(forkStatsValidator),

	// Soft Delete
	deletedAt: v.optional(v.string()),
	deletedBy: v.optional(v.string()),
	scheduledPurgeAt: v.optional(v.string()),

	// Metadata
	createdAt: v.string(),
	lastModified: v.string(),
	schemaVersion: v.string()
};

export default defineSchema({
	...authTables,
	characters: defineTable(characterValidator)
		.index('by_user', ['userId'])
		.index('by_user_and_id', ['userId', 'id'])
		.index('by_user_and_name', ['userId', 'finalName']),

	// DM Tools: Monsters
	monsters: defineTable(monsterValidator)
		.index('by_user', ['userId'])
		.index('by_user_and_id', ['userId', 'id'])
		.index('by_approval_status', ['approvalStatus'])
		.index('by_user_and_deleted', ['userId', 'deletedAt']),

	// DM Tools: Custom Features
	customFeatures: defineTable(customFeatureValidator)
		.index('by_user', ['userId'])
		.index('by_user_and_id', ['userId', 'id'])
		.index('by_approval_status', ['approvalStatus'])
		.index('by_user_and_deleted', ['userId', 'deletedAt']),

	// DM Tools: Encounters
	encounters: defineTable(encounterValidator)
		.index('by_user', ['userId'])
		.index('by_user_and_id', ['userId', 'id'])
		.index('by_approval_status', ['approvalStatus'])
		.index('by_user_and_deleted', ['userId', 'deletedAt'])
});
