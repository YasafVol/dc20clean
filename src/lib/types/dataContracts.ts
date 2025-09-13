/**
 * Unified Data Contracts for Character System
 *
 * This file establishes the single source of truth for character data schemas.
 * All components should use these types instead of legacy JSON string patterns.
 */

import type { EnhancedStatBreakdown } from './effectSystem';

// Re-export necessary types from existing files
export type { ManeuverData, SpellData, InventoryItemData } from '../../types/character';

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
