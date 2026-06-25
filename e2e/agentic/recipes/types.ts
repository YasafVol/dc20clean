export interface TraitSelection {
	label: RegExp;
	expectedId?: string;
}

export interface BackgroundSelection {
	skills: Record<string, number>;
	trades: Record<string, number>;
	languages: Record<string, 'Limited' | 'Fluent'>;
	conversions?: {
		skillToTrade?: number;
		tradeToLanguage?: number;
	};
}

export interface LearnSelections {
	mode: 'first-available' | 'by-id';
	maxSelections: number;
	optional?: boolean;
	ids?: string[];
}

export interface ExpectedSavedCharacterSlice {
	identity: {
		classId: string;
		ancestry1Id: string;
		ancestry2Id?: string | null;
		level: number;
	};
	finalStats: Record<string, number | string | boolean>;
	selectedTraitIds: string[];
	skillsData: Record<string, number>;
	tradesData: Record<string, number>;
	languagesData: Record<string, 'limited' | 'fluent'>;
	spells: string[];
	maneuvers: string[];
	combatTraining: string[];
	selectedFeatureChoices?: Record<string, string | string[]>;
	selectedTalents?: Record<string, number>;
	pathPointAllocations?: {
		martial?: number;
		spellcasting?: number;
	};
	selectedSubclass?: string;
	senses?: Record<string, number>;
	backgroundConversions?: {
		skillToTrade?: number;
		tradeToLanguage?: number;
	};
}

export interface ExpectedSheetSlice {
	visibleText: string[];
}

export interface AgenticCharacterRecipe {
	id: string;
	name: string;
	tags: string[];
	characterName: string;
	playerName: string;
	level?: number;
	classId: string;
	classChoices?: Array<{
		selector?: string;
		testId?: string;
		description: string;
	}>;
	subclass?: {
		id: string;
	};
	leveling?: {
		talents?: Record<string, number>;
		pathPointAllocations?: {
			martial?: number;
			spellcasting?: number;
		};
	};
	ancestry: {
		id: string;
		ids?: string[];
		traits: TraitSelection[];
	};
	attributeClicks: {
		might: number;
		agility: number;
		charisma: number;
		intelligence: number;
	};
	background: BackgroundSelection;
	spells?: LearnSelections;
	maneuvers?: LearnSelections;
	expectedSaved: ExpectedSavedCharacterSlice;
	expectedSheet: ExpectedSheetSlice;
}
