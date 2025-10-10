/**
 * Character-to-Context Converter
 * 
 * Converts a SavedCharacter back into CharacterInProgressStoreData
 * for level-up and respec functionality.
 */

import type { SavedCharacter } from '../types/dataContracts';
import type { CharacterInProgressStoreData } from '../stores/characterContext';

export function convertSavedCharacterToContext(
	character: SavedCharacter
): Partial<CharacterInProgressStoreData> {
	return {
		// Core identity
		classId: character.classId,
		level: character.level,

		// Ancestry
		ancestry1Id: character.ancestry1Id || null,
		ancestry2Id: character.ancestry2Id || null,
		selectedTraitIds: character.selectedTraitIds || [],
		selectedTraitChoices: character.selectedTraitChoices || {},

		// Attributes
		attribute_might: character.finalMight,
		attribute_agility: character.finalAgility,
		attribute_charisma: character.finalCharisma,
		attribute_intelligence: character.finalIntelligence,

		// Background
		skillsData: character.skillsData || {},
		tradesData: character.tradesData || {},
		languagesData: character.languagesData || { common: { fluency: 'fluent' } },
		skillToTradeConversions: character.skillToTradeConversions || 0,
		tradeToSkillConversions: character.tradeToSkillConversions || 0,
		tradeToLanguageConversions: character.tradeToLanguageConversions || 0,

		// Leveling
		selectedTalents: character.selectedTalents || {},
		pathPointAllocations: character.pathPointAllocations || { martial: 0, spellcasting: 0 },
		selectedSubclass: character.selectedSubclass,
		selectedFeatureChoices: character.selectedFeatureChoices || {},

		// Spells & Maneuvers
		selectedSpells: character.spells?.map((s) => s.id) || [],
		selectedManeuvers: character.maneuvers?.map((m) => m.id) || [],

		// Character Name
		finalName: character.finalName,
		finalPlayerName: character.finalPlayerName || null
	};
}

