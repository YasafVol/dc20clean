// Character Sheet Types and Interfaces

import type { EnhancedStatBreakdown } from '../lib/types/effectSystem';

export interface CharacterSheetProps {
	characterId: string;
	onBack: () => void;
}

// Import ManeuverData type
export interface ManeuverData {
	id: string;
	name: string;
	type?: string;
	description?: string;
	cost?: {
		ap: number;
		mp?: number;
	};
	isReaction?: boolean;
	notes?: string;
}

export interface CharacterSheetData {
	// Basic Info
	id: string;
	finalName: string;
	finalPlayerName?: string;
	finalLevel: number;

	// Attributes
	finalMight: number;
	finalAgility: number;
	finalCharisma: number;
	finalIntelligence: number;

	// Calculated Stats
	finalPrimeModifierValue: number;
	finalPrimeModifierAttribute: string;
	usePrimeCapRule?: boolean;
	finalCombatMastery: number;

	// Saves (Attribute + Combat Mastery)
	finalSaveMight: number;
	finalSaveAgility: number;
	finalSaveCharisma: number;
	finalSaveIntelligence: number;

	// Health & Resources
	finalHPMax: number;
	finalSPMax: number;
	finalMPMax: number;

	// Defenses
	finalPD: number; // Precision Defense
	finalAD: number; // Area Defense

	// Manual Defense Overrides (optional)
	manualPD?: number;
	manualAD?: number;
	manualPDR?: number;

	// PDR (Precision Damage Reduction)
	finalPDR: number;

	// Other Stats
	finalSaveDC: number;
	finalDeathThreshold: number;
	finalMoveSpeed: number;
	finalJumpDistance: number;
	finalRestPoints: number;
	finalGritPoints: number;
	finalInitiativeBonus: number;

	// Class & Ancestry Info
	className: string;
	ancestry1Name?: string;
	ancestry2Name?: string;

	// JSON data fields
	skillsJson?: string;
	tradesJson?: string;
	languagesJson?: string;
	selectedTraitIds?: string; // JSON string of selected trait IDs
	selectedFeatureChoices?: string; // JSON string of selected feature choices

	// Current values (optional, may not exist on first load)
	currentHP?: number;
	currentSP?: number;
	currentMP?: number;
	currentGritPoints?: number;
	currentRestPoints?: number;
	tempHP?: number;
	actionPointsUsed?: number;
	exhaustionLevel?: number;

	// Spells and Maneuvers
	spells?: SpellData[];
	maneuvers?: ManeuverData[];
}

export interface SkillData {
	id: string;
	name: string;
	attribute: string;
	proficiency: number; // 0-5
	bonus?: number; // Calculated bonus: Attribute + Mastery*2
}

export interface TradeData {
	id: string;
	name: string;
	proficiency: number; // 0-5
	primaryAttribute: 'might' | 'agility' | 'charisma' | 'intelligence';
	bonus?: number; // Calculated bonus: Attribute + Mastery*2 (knowledge trades)
	bonuses?: Array<{
		attribute: 'might' | 'agility' | 'charisma' | 'intelligence';
		total: number;
	}>;
}

export interface LanguageData {
	id: string;
	name: string;
	fluency: 'limited' | 'fluent';
}

export interface FeatureData {
	id: string;
	name: string;
	description: string;
	source: 'ancestry' | 'class' | 'choice';
	sourceDetail?: string; // e.g., "Human (Default)", "Barbarian Lvl 1", etc.
}

export interface CurrentValues {
	currentHP: number;
	currentSP: number;
	currentMP: number;
	currentGritPoints: number;
	currentRestPoints: number;
	tempHP: number;
	actionPointsUsed: number;
	exhaustionLevel: number; // 0-5
	// Death tracking
	deathSteps: number; // Current death step (0 = alive, 1+ = steps toward death)
	isDead: boolean; // True when character has reached final death step
	// Currency
	goldPieces: number;
	silverPieces: number;
	copperPieces: number;
	electrumPieces: number;
	platinumPieces: number;
}

// Comprehensive character state that includes both original (calculated) and current (modified) values
export interface CharacterState {
	// Core resource values
	resources: {
		original: {
			maxHP: number;
			maxSP: number;
			maxMP: number;
			maxGritPoints: number;
			maxRestPoints: number;
		};
		current: {
			currentHP: number;
			currentSP: number;
			currentMP: number;
			currentGritPoints: number;
			currentRestPoints: number;
			tempHP: number;
			actionPointsUsed: number;
			exhaustionLevel: number;
		};
	};

	// Currency with original and current values
	currency: {
		original: {
			goldPieces: number;
			silverPieces: number;
			copperPieces: number;
			electrumPieces: number;
			platinumPieces: number;
		};
		current: {
			goldPieces: number;
			silverPieces: number;
			copperPieces: number;
			electrumPieces: number;
			platinumPieces: number;
		};
	};

	// Attacks - original is calculated from character build, current is user-modified
	attacks: {
		original: AttackData[];
		current: AttackData[];
	};

	// Spells - original is empty/default, current is user-selected
	spells: {
		original: SpellData[];
		current: SpellData[];
	};

	// Maneuvers - original is empty/default, current is user-selected
	maneuvers: {
		original: ManeuverData[];
		current: ManeuverData[];
	};

	// Inventory - original is empty/default, current is user-modified
	inventory: {
		original: InventoryItemData[];
		current: InventoryItemData[];
	};

	// Defense notes (already integrated)
	defenseNotes?: {
		manualPD?: { value: number; reason: string; timestamp: string };
		manualPDR?: { value: number; reason: string; timestamp: string };
		manualAD?: { value: number; reason: string; timestamp: string };
	};

	// Centralized manual defense overrides (authoritative values)
	manualDefenses?: {
		manualPD?: number;
		manualPDR?: number;
		manualAD?: number;
	};

	// Persisted calculation breakdowns for drill-down tooltips
	calculation?: {
		breakdowns: Record<string, EnhancedStatBreakdown>;
	};
}

export interface AttackData {
	id: string;
	weaponName: string; // Changed from weaponId to weaponName to match inventory system
	name: string;
	attackBonus: number;
	damage: string;
	damageType: string;
	critRange: string;
	critDamage: string;
	brutalDamage: string;
	heavyHitEffect: string;
}

export interface SpellData {
	id: string;
	spellName: string;
	school: string;
	isCantrip: boolean;
	cost: {
		ap: number;
		mp?: number;
	};
	range: string;
	duration: string;
	isPrepared?: boolean;
	notes?: string;
	// Additional properties needed for spell popup
	effects?: Array<{
		description: string;
		damage?: any;
		healing?: any;
		modifier?: any;
	}>;
	enhancements?: Array<any>;
	isRitual?: boolean;
	cantripPassive?: string;
}

export interface InventoryItemData {
	id: string;
	itemType: 'Weapon' | 'Armor' | 'Shield' | 'Adventuring Supply' | 'Potion' | '';
	itemName: string;
	count: number;
	cost?: string;
}
