import { ALL_SPELLS as allSpells } from '../rulesdata/spells-data';
import { SpellSchool } from '../rulesdata/schemas/spell.schema';
import type { SpellData } from '../../types/character';
import { findClassByName } from '../rulesdata/loaders/class-features.loader';
import { classesData } from '../rulesdata/loaders/class.loader';
import { parseJsonSafe } from '../utils/storageUtils';
import { debug } from '../utils/debug';

export interface SpellAssignmentOptions {
	className: string;
	level: number;
	selectedFeatureChoices: Record<string, string>; // Typed feature choices
}

/**
 * Automatically assigns spells to a character based on their class and level
 */
export const assignSpellsToCharacter = (options: SpellAssignmentOptions): SpellData[] => {
	const { className, level, selectedFeatureChoices } = options;

	// Get class data
	const classData = classesData.find((c) => c.name === className);
	if (!classData) {
		debug.warn('Spells', `Class data not found for: ${className}`);
		return [];
	}

	// Get class features
	const classFeatures = findClassByName(className);
	if (!classFeatures) {
		debug.warn('Spells', `Class features not found for: ${className}`);
		return [];
	}

	// Use feature choices directly
	const featureChoices: { [key: string]: string } = selectedFeatureChoices || {};

	// Get available spell schools for this class
	let availableSchools = getAvailableSpellSchools(classFeatures, featureChoices);

	// If no schools were determined from feature choices, use default schools
	if (availableSchools.length === 0) {
		availableSchools = getDefaultSpellSchools(className);
		debug.spells(
			`No spell schools determined from choices, using defaults for ${className}:`,
			availableSchools
		);
	}

	// Get spell counts for this level
	const levelData = classData.levelProgression?.find((l) => l.level === level);
	if (!levelData) {
		debug.warn('Spells', `Level data not found for ${className} level ${level}`);
		return [];
	}

	const cantripsToAssign = levelData.cantripsKnown || 0;
	const spellsToAssign = levelData.spellsKnown || 0;

	debug.spells(`Assigning spells for ${className} level ${level}:`, {
		cantripsToAssign,
		spellsToAssign,
		availableSchools
	});

	// Get available spells for this class and schools
	const availableSpells = getAvailableSpellsForClass(className, availableSchools);

	debug.spells(
		`Found ${availableSpells.length} available spells for ${className} with schools ${availableSchools}:`,
		availableSpells.map((s) => ({ name: s.name, school: s.school, isCantrip: s.isCantrip }))
	);

	// Separate cantrips and spells
	const availableCantrips = availableSpells.filter((spell) => spell.isCantrip);
	const availableRegularSpells = availableSpells.filter((spell) => !spell.isCantrip);

	debug.spells(
		`Available cantrips: ${availableCantrips.length}`,
		availableCantrips.map((s) => s.name)
	);
	debug.spells(
		`Available regular spells: ${availableRegularSpells.length}`,
		availableRegularSpells.map((s) => s.name)
	);

	// Assign cantrips first
	const assignedSpells: SpellData[] = [];

	// Assign cantrips
	for (let i = 0; i < cantripsToAssign && i < availableCantrips.length; i++) {
		const cantrip = availableCantrips[i];
		assignedSpells.push(createSpellData(cantrip));
	}

	// Assign regular spells
	for (let i = 0; i < spellsToAssign && i < availableRegularSpells.length; i++) {
		const spell = availableRegularSpells[i];
		assignedSpells.push(createSpellData(spell));
	}

	debug.spells(
		`Assigned ${assignedSpells.length} spells:`,
		assignedSpells.map((s) => s.spellName)
	);

	return assignedSpells;
};

/**
 * Get available spell schools for a class based on feature choices
 */
function getAvailableSpellSchools(
	classFeatures: any,
	featureChoices: { [key: string]: string }
): SpellSchool[] {
	const schools: SpellSchool[] = [];

	// Check if class has spellcasting
	if (!classFeatures.spellcastingPath?.spellList) {
		return schools;
	}

	const spellList = classFeatures.spellcastingPath.spellList;

	// Handle different spell list types
	if (spellList.type === 'all_schools' && spellList.schoolCount) {
		// Warlock-style: get chosen schools from feature choices
		const choiceId = `${classFeatures.className.toLowerCase()}_spell_schools`;
		const choice = featureChoices[choiceId];
		if (choice) {
			const selectedSchools = parseJsonSafe<string[]>(choice) ?? [choice];
			schools.push(...selectedSchools);
		}
	} else if (spellList.type === 'schools') {
		// Spellblade-style: specific schools + additional chosen schools
		if (spellList.specificSchools) {
			schools.push(...spellList.specificSchools);
		}

		if (spellList.schoolCount && spellList.schoolCount > 0) {
			const choiceId = `${classFeatures.className.toLowerCase()}_additional_spell_schools`;
			const choice = featureChoices[choiceId];
			if (choice) {
				const additionalSchools =
					spellList.schoolCount > 1 ? (parseJsonSafe<string[]>(choice) ?? [choice]) : [choice];
				schools.push(...additionalSchools);
			}
		}
	} else if (spellList.type === 'any') {
		// Sorcerer-style: any spell list (Arcane, Divine, Primal)
		// For now, default to Arcane spells
		schools.push(SpellSchool.Arcane);
	}

	// Add schools from feature-based choices (like Wizard's Spell School Initiate)
	classFeatures.coreFeatures?.forEach((feature: any) => {
		if (feature.levelGained === 1) {
			const description = feature.description.toLowerCase();
			const isCharacterCreationChoice =
				(description.includes('choose a spell school') ||
					description.includes('choose 1 spell school')) &&
				!description.includes('when you create') &&
				!description.includes('when you cast') &&
				!description.includes('you can spend') &&
				(description.includes('training') ||
					description.includes('specialize') ||
					description.includes('initiate') ||
					description.includes('you gain the following benefits'));

			if (isCharacterCreationChoice) {
				const choiceId = `${classFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_school`;
				const choice = featureChoices[choiceId];
				if (choice) {
					schools.push(choice as SpellSchool);
				}
			}
		}
	});

	return schools;
}

/**
 * Get available spells for a class and spell schools
 */
function getAvailableSpellsForClass(className: string, schools: SpellSchool[]): any[] {
	// Filter spells by class and schools
	return allSpells.filter((spell) => {
		// Check if spell is available to this class
		// Since many spells have empty availableClasses arrays, we'll use a more flexible approach
		const availableClasses = Array.isArray(spell.availableClasses) ? spell.availableClasses : [];
		const isAvailableToClass =
			availableClasses.length === 0 || availableClasses.includes(className as ClassName);

		// Check if spell is in one of the available schools
		const isInAvailableSchool = schools.includes(spell.school);

		return isAvailableToClass && isInAvailableSchool;
	});
}

/**
 * Create SpellData from Spell
 */
function createSpellData(spell: any): SpellData {
	return {
		id: `spell_${Date.now()}_${Math.random()}`,
		spellName: spell.name,
		school: spell.school,
		isCantrip: spell.isCantrip,
		cost: spell.cost,
		range: spell.range,
		duration: spell.duration,
		isPrepared: false,
		notes: ''
	};
}

/**
 * Get default spell schools for a class when no choices have been made
 */
export const getDefaultSpellSchools = (className: string): SpellSchool[] => {
	switch (className.toLowerCase()) {
		case 'wizard':
			return [SpellSchool.Arcane];
		case 'sorcerer':
			return [SpellSchool.Arcane]; // Default to Arcane for Sorcerer
		case 'cleric':
			return [SpellSchool.Restoration];
		case 'druid':
			return [SpellSchool.Restoration];
		case 'warlock':
			return [SpellSchool.Arcane]; // Default to Arcane, but should be chosen
		case 'spellblade':
			return [SpellSchool.Arcane]; // Default schools + chosen additional
		default:
			return [];
	}
};
