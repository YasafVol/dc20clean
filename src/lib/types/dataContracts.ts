/**
 * Unified Data Contracts for Character System
 *
 * This file establishes the single source of truth for character data schemas.
 * All components should use these types instead of legacy JSON string patterns.
 */

import type { EnhancedStatBreakdown } from './effectSystem';

// Re-export necessary types from existing files
export type { ManeuverData, SpellData, InventoryItemData } from '../../types/character';

// Optional denormalized mastery structures (Task 0)
export interface MasteryLadder {
	'2': boolean;
	'4': boolean;
	'6': boolean;
	'8': boolean;
	'10': boolean;
}

export interface DenormalizedMasteryEntry {
	governingAttributes: string[];
	baseAttributeValues: { might: number; agility: number; charisma: number; intelligence: number };
	masteryLevel: number; // rank × 2
	masteryLadder: MasteryLadder;
	finalValue: number; // max(allowed base attr) + masteryLevel
}

export interface CharacterState {
	resources: {
		current: {
			currentHP: number;
			currentSP: number;
			currentMP: number;
			currentGritPoints: number;
			currentRestPoints: number;
			tempHP: number;
			actionPointsUsed: number;
			exhaustionLevel: number;
			// Death tracking
			deathSteps: number; // Current death step (0 = alive, 1+ = steps toward death)
			isDead: boolean; // True when character has reached final death step
		};
		original?: {
			maxHP: number;
			maxSP: number;
			maxMP: number;
			maxGritPoints: number;
			maxRestPoints: number;
		};
	};
	ui: {
		manualDefenseOverrides: {
			PD?: number;
			AD?: number;
			PDR?: number;
		};
		activeConditions?: Record<string, boolean>;
	};
	inventory: {
		items: any[]; // Will use proper InventoryItemData once imported
		currency: {
			gold: number;
			silver: number;
			copper: number;
		};
	};
	notes: {
		playerNotes: string;
	};
	// Active conditions (IDs from conditions.data.ts that are currently affecting the character)
	activeConditions?: string[];
	// attacks are an array of attack objects. We enforce array-only shape.
	attacks?: any[];
	spells?: any[];
	maneuvers?: any[];
}

/**
 * The unified character schema - replaces CharacterSheetData
 * Uses 'final*' naming convention throughout for consistency
 */
export interface SavedCharacter {
	// Core Identity
	id: string;
	finalName: string;
	finalPlayerName?: string;
	level: number;

	// Classes & Ancestry
	classId: string;
	className: string;
	ancestry1Id?: string;
	ancestry1Name?: string;
	ancestry2Id?: string;
	ancestry2Name?: string;

	// UNIFIED SCHEMA: Only 'final*' names used throughout
	finalMight: number;
	finalAgility: number;
	finalCharisma: number;
	finalIntelligence: number;

	// All calculated stats
	finalPrimeModifierValue: number;
	finalPrimeModifierAttribute: string;
	usePrimeCapRule?: boolean;
	finalCombatMastery: number;
	finalSaveMight: number;
	finalSaveAgility: number;
	finalSaveCharisma: number;
	finalSaveIntelligence: number;
	finalHPMax: number;
	finalSPMax: number;
	finalMPMax: number;
	finalPD: number;
	finalAD: number;
	finalPDR: number;
	finalSaveDC: number;
	finalDeathThreshold: number;
	finalMoveSpeed: number;
	finalJumpDistance: number;
	finalRestPoints: number;
	finalGritPoints: number;
	finalInitiativeBonus: number;

	// Movement types (derived from GRANT_MOVEMENT effects)
	movement?: {
		burrow: { half: boolean; full: boolean };
		swim: { half: boolean; full: boolean };
		fly: { half: boolean; full: boolean };
		climb: { half: boolean; full: boolean };
		glide: { half: boolean; full: boolean };
	};
	holdBreath?: number; // Equals Might attribute

	// Derived thresholds
	finalPDHeavyThreshold?: number;
	finalPDBrutalThreshold?: number;
	finalADHeavyThreshold?: number;
	finalADBrutalThreshold?: number;

	// Bloodied values
	bloodiedValue?: number; // ceil(HPMax / 2)
	wellBloodiedValue?: number; // ceil(HPMax / 4)

	// Combat stats with breakdowns
	finalAttackSpellCheck: number;
	finalMartialCheck: number; // max(Acrobatics, Athletics)

	// TYPED DATA: No more JSON strings
	selectedTraitIds: string[];
	selectedFeatureChoices: Record<string, string>;
	skillsData: Record<string, number>;
	tradesData: Record<string, number>;
	// Languages can be either a list of names or a map of name -> { fluency }
	languagesData: any;

	// LEVEL PROGRESSION DATA (M2.7)
	selectedTalents?: string[]; // IDs of talents chosen
	pathPointAllocations?: { martial?: number; spellcasting?: number }; // Path point distribution
	unlockedFeatureIds?: string[]; // Features gained from leveling
	selectedSubclass?: string; // Subclass name if chosen
	pendingSubclassChoice?: boolean; // True if subclass choice is available but not made

	// MULTICLASS SELECTIONS (M3.17)
	selectedMulticlassOption?:
		| 'novice'
		| 'adept'
		| 'expert'
		| 'master'
		| 'grandmaster'
		| 'legendary'
		| null; // Multiclass tier
	selectedMulticlassClass?: string; // Class ID for multiclass feature
	selectedMulticlassFeature?: string; // Feature name from multiclass

	// Precomputed values for PDF/UI consumption (no calculations in transformers/components)
	// Optional for backward compatibility; FE should consume if present
	// Totals per skill (finalValue)
	skillTotals?: Record<string, number>; // e.g., { acrobatics: 4, athletics: 3, ... }
	// Full denormalized mastery entries
	skillMastery?: Record<string, DenormalizedMasteryEntry>;
	knowledgeTradeMastery?: Record<
		'arcana' | 'history' | 'nature' | 'occultism' | 'religion',
		DenormalizedMasteryEntry
	>;
	// Lightweight ladders for easy consumption
	masteryLadders?: {
		skills?: Record<
			string,
			{ '2': boolean; '4': boolean; '6': boolean; '8': boolean; '10': boolean }
		>;
		knowledgeTrades?: Record<
			'arcana' | 'history' | 'nature' | 'occultism' | 'religion',
			{ '2': boolean; '4': boolean; '6': boolean; '8': boolean; '10': boolean }
		>;
		practicalTrades?: {
			A?: {
				label: string;
				ladder: { '2': boolean; '4': boolean; '6': boolean; '8': boolean; '10': boolean };
				finalValue: number;
			};
			B?: {
				label: string;
				ladder: { '2': boolean; '4': boolean; '6': boolean; '8': boolean; '10': boolean };
				finalValue: number;
			};
			C?: {
				label: string;
				ladder: { '2': boolean; '4': boolean; '6': boolean; '8': boolean; '10': boolean };
				finalValue: number;
			};
			D?: {
				label: string;
				ladder: { '2': boolean; '4': boolean; '6': boolean; '8': boolean; '10': boolean };
				finalValue: number;
			};
		};
	};
	// Fixed language mastery A–D derived from languagesData
	languageMastery?: {
		A?: { name: string; limited: boolean; fluent: boolean };
		B?: { name: string; limited: boolean; fluent: boolean };
		C?: { name: string; limited: boolean; fluent: boolean };
		D?: { name: string; limited: boolean; fluent: boolean };
	};
	spells: any[]; // Will use proper SpellData once imported
	maneuvers: any[]; // Will use proper ManeuverData once imported

	// Background point conversions - CRITICAL for editing characters
	skillToTradeConversions?: number;
	tradeToSkillConversions?: number;
	tradeToLanguageConversions?: number;

	// Dynamic state as nested object
	characterState: CharacterState;

	// Calculation transparency
	breakdowns: Record<string, EnhancedStatBreakdown>;

	// Metadata
	createdAt: string;
	lastModified: string;
	completedAt: string;
	schemaVersion: string; // For migration tracking
}

/**
 * Legacy character interface for backwards compatibility during migration
 * This will be removed after migration is complete
 */
export interface LegacyCharacter {
	id: string;
	finalName: string;
	finalPlayerName?: string;
	finalLevel: number;

	// Legacy JSON string fields that need migration
	selectedTraitIds?: string; // JSON string
	selectedTraitsJson?: string; // Alternative JSON string
	selectedFeatureChoices?: string; // JSON string
	skillsJson?: string; // JSON string
	tradesJson?: string; // JSON string
	languagesJson?: string; // JSON string

	// Legacy duplicate fields that need removal
	currentHP?: number;
	currentSP?: number;
	currentMP?: number;
	currentGritPoints?: number;
	currentRestPoints?: number;
	tempHP?: number;
	actionPointsUsed?: number;
	exhaustionLevel?: number;
	manualPD?: number;
	manualAD?: number;
	manualPDR?: number;

	// Character state (may or may not exist)
	characterState?: CharacterState;

	// All other fields from SavedCharacter
	[key: string]: any;
}
