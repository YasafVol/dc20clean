/**
 * Unified Classes Loader
 * Combines class feature data with progression table data
 * Provides single source of truth for all class information
 */

import type { ClassDefinition } from '../schemas/character.schema';

// Import all class feature definitions
import { barbarianClass } from '../classes-data/features/barbarian_features';
import { bardClass } from '../classes-data/features/bard_features';
import { championClass } from '../classes-data/features/champion_features';
import { clericClass } from '../classes-data/features/cleric_features';
import { commanderClass } from '../classes-data/features/commander_features';
import { druidClass } from '../classes-data/features/druid_features';
import { hunterClass } from '../classes-data/features/hunter_features';
import { monkClass } from '../classes-data/features/monk_features';
import { psionClass } from '../classes-data/features/psion_features';
import { rogueClass } from '../classes-data/features/rogue_features';
import { sorcererClass } from '../classes-data/features/sorcerer_features';
import { spellbladeClass } from '../classes-data/features/spellblade_features';
import { warlockClass } from '../classes-data/features/warlock_features';
import { wizardClass } from '../classes-data/features/wizard_features';

// Import progression table data manually for now
// TODO: Implement dynamic loading if needed
import barbarianTable from '../classes-data/tables/barbarian_table.json';
import bardTable from '../classes-data/tables/bard_table.json';
import championTable from '../classes-data/tables/champion_table.json';
import clericTable from '../classes-data/tables/cleric_table.json';
import commanderTable from '../classes-data/tables/commander_table.json';
import druidTable from '../classes-data/tables/druid_table.json';
import hunterTable from '../classes-data/tables/hunter_table.json';
import monkTable from '../classes-data/tables/monk_table.json';
import psionTable from '../classes-data/tables/psion_table.json';
import rogueTable from '../classes-data/tables/rogue_table.json';
import sorcererTable from '../classes-data/tables/sorcerer_table.json';
import spellbladeTable from '../classes-data/tables/spellblade_table.json';
import warlockTable from '../classes-data/tables/warlock_table.json';
import wizardTable from '../classes-data/tables/wizard_table.json';

// Create lookup map for table data
const progressionTables = new Map<string, any>([
	['Barbarian', barbarianTable],
	['Bard', bardTable],
	['Champion', championTable],
	['Cleric', clericTable],
	['Commander', commanderTable],
	['Druid', druidTable],
	['Hunter', hunterTable],
	['Monk', monkTable],
	['Psion', psionTable],
	['Rogue', rogueTable],
	['Sorcerer', sorcererTable],
	['Spellblade', spellbladeTable],
	['Warlock', warlockTable],
	['Wizard', wizardTable],
]);

// Enhanced class interface with additional metadata for UI
export interface EnhancedClassDefinition extends ClassDefinition {
	id: string;
	description: string;
	pathType: 'martial' | 'spellcaster' | 'hybrid';
	level1Stats?: {
		healthPoints: number;
		staminaPoints: number;
		manaPoints: number;
		skillPoints: number;
		tradePoints: number;
		maneuversKnown: number;
		techniquesKnown: number;
		cantripsKnown: number;
		spellsKnown: number;
	};
	levelProgression?: any[];
}

// Class descriptions for UI
const classDescriptions: Record<string, string> = {
	Barbarian: 'A fierce warrior who channels primal rage to gain strength and resist harm in combat.',
	Bard: 'A charismatic performer whose songs and stories inspire allies and manipulate enemies through magic.',
	Champion: 'A martial master focused on critical strikes, resilience, and battlefield leadership.',
	Cleric: 'A divine spellcaster empowered by a god to heal, protect, and smite enemies with holy might.',
	Commander: 'A tactical leader who inspires and directs allies with strategic maneuvers and commanding presence.',
	Druid: 'A nature-bound spellcaster who wields primal magic and transforms into beasts to protect the wilds.',
	Hunter: 'A skilled tracker and marksman who specializes in slaying monsters and surviving the wilderness.',
	Monk: 'A disciplined martial artist who channels inner energy for rapid strikes and supernatural movement.',
	Psion: 'A psionic warrior who manipulates minds and reality through pure mental discipline and psychic power.',
	Rogue: 'A stealthy and cunning adventurer who excels in ambushes, trickery, and precise strikes.',
	Sorcerer: 'A natural-born spellcaster who harnesses raw arcane or elemental power from an innate source.',
	Spellblade: 'A warrior-mage hybrid who combines martial prowess with arcane magic to enchant weapons and defend.',
	Warlock: 'A spellcaster who draws power from a pact with a mysterious or dark patron, gaining unique abilities.',
	Wizard: 'A scholarly arcane caster who learns spells through study and masters a broad range of magical effects.'
};

// Determine path type based on class features
function determinePathType(classData: ClassDefinition): 'martial' | 'spellcaster' | 'hybrid' {
	const hasMartial = !!classData.martialPath;
	const hasSpellcaster = !!classData.spellcasterPath;
	const hasHybrid = !!classData.hybridPath;
	
	if (hasHybrid) return 'hybrid';
	if (hasMartial && hasSpellcaster) return 'hybrid';
	if (hasSpellcaster) return 'spellcaster';
	return 'martial';
}

// Enhanced class data with progression tables and metadata
function enhanceClassData(classData: ClassDefinition): EnhancedClassDefinition {
	const table = progressionTables.get(classData.className);
	const level1Stats = table?.levelProgression?.[0];
	
	return {
		...classData,
		id: classData.className.toLowerCase(),
		description: classDescriptions[classData.className] || `${classData.className} class`,
		pathType: determinePathType(classData),
		level1Stats: level1Stats ? {
			healthPoints: level1Stats.healthPoints || 0,
			staminaPoints: level1Stats.staminaPoints || 0,
			manaPoints: level1Stats.manaPoints || 0,
			skillPoints: level1Stats.skillPoints || 0,
			tradePoints: level1Stats.tradePoints || 0,
			maneuversKnown: level1Stats.maneuversKnown || 0,
			techniquesKnown: level1Stats.techniquesKnown || 0,
			cantripsKnown: level1Stats.cantripsKnown || 0,
			spellsKnown: level1Stats.spellsKnown || 0
		} : undefined,
		levelProgression: table?.levelProgression
	};
}

// All available classes with enhanced data
export const allClasses: EnhancedClassDefinition[] = [
	barbarianClass,
	bardClass,
	championClass,
	clericClass,
	commanderClass,
	druidClass,
	hunterClass,
	monkClass,
	psionClass,
	rogueClass,
	sorcererClass,
	spellbladeClass,
	warlockClass,
	wizardClass
].map(enhanceClassData);

// Helper functions for UI
export const getClassById = (id: string): EnhancedClassDefinition | undefined =>
	allClasses.find(cls => cls.id === id);

export const getClassesByPathType = (pathType: 'martial' | 'spellcaster' | 'hybrid'): EnhancedClassDefinition[] =>
	allClasses.filter(cls => cls.pathType === pathType);

export const getMartialClasses = (): EnhancedClassDefinition[] => getClassesByPathType('martial');
export const getSpellcasterClasses = (): EnhancedClassDefinition[] => getClassesByPathType('spellcaster');
export const getHybridClasses = (): EnhancedClassDefinition[] => getClassesByPathType('hybrid');

// Main export for components
export { allClasses as classesData };