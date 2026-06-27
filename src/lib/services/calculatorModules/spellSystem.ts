/**
 * Spell System Module (M3.20)
 *
 * Handles global magic profile calculation and spell slot generation.
 * Extracted from enhancedCharacterCalculator.ts.
 */

import type {
	EnhancedCharacterBuildData,
	AttributedEffect,
	GlobalMagicProfile,
	SpellsKnownSlot
} from '../../types/effectSystem';
import type { SpellSource, SpellSchool, SpellTag } from '../../rulesdata/schemas/spell.schema';
import { ALL_SPELLS, getSpellById } from '../../rulesdata/spells-data';
import { findClassByName } from '../../rulesdata/loaders/class-features.loader';
import type { ClassDefinition } from '../../rulesdata/schemas/character.schema';

const normalizeSpellLookupKey = (value: string): string =>
	value
		.trim()
		.toLowerCase()
		.replace(/[_\s]+/g, ' ');

function getExactSpellIdForTarget(target: string): string | undefined {
	const directMatch = getSpellById(target);
	if (directMatch) {
		return directMatch.id;
	}

	const normalizedTarget = normalizeSpellLookupKey(target);
	const normalizedIdTarget = normalizedTarget.replace(/\s+/g, '-');
	return ALL_SPELLS.find(
		(spell) =>
			spell.id === normalizedIdTarget || normalizeSpellLookupKey(spell.name) === normalizedTarget
	)?.id;
}

/**
 * Aggregates the character's global magic profile by combining class defaults
 * with expansion effects from features and talents.
 */
export function calculateGlobalMagicProfile(
	buildData: EnhancedCharacterBuildData,
	effects: AttributedEffect[]
): GlobalMagicProfile {
	// Get spell restrictions from class features (single source of truth)
	const classFeatures = findClassByName(buildData.classId || '');
	const spellList =
		(classFeatures as any)?.spellcasterPath?.spellList ??
		(classFeatures as any)?.spellcastingPath?.spellList ??
		(classFeatures as any)?.hybridPath?.spellcastingAspect?.spellList;

	const profile: GlobalMagicProfile = {
		// DC20 v0.10: No source restriction - filtering is by school/tag only
		sources: [],
		// Copy the source arrays — expansion effects below push onto these, and returning the
		// class-data array by reference would permanently mutate the shared rules data.
		schools: [...((spellList?.specificSchools as SpellSchool[]) || [])],
		tags: [
			...((spellList?.spellTags as SpellTag[]) || []),
			...((spellList?.tags as SpellTag[]) || [])
		]
	};

	// Expansion effects (talents/features) ADD a school/tag to the accessible list.
	// A profile with no schools AND no tags is a wildcard: every school/tag is already
	// allowed (see matchesSchoolOrTag). Pushing a single school/tag onto a wildcard would
	// invert the OR-matching from "everything" into "only this one", silently narrowing the
	// caster's spell list (e.g. a Wizard who picks Portal Mage collapsing to Teleportation
	// spells only). Expansions are no-ops on a wildcard, so skip them entirely.
	const isWildcardProfile = profile.schools.length === 0 && profile.tags.length === 0;

	// Process Expansion Effects (talents/features that expand spell access)
	for (const effect of effects) {
		if (!effect.resolved) continue;
		if (isWildcardProfile) continue;

		// Portal Magic Expansion - adds Teleportation tag
		if ((effect as any).target === 'teleportation_expert') {
			if (!profile.tags.includes('Teleportation' as SpellTag)) {
				profile.tags.push('Teleportation' as SpellTag);
			}
		}

		// Coven's Gift Expansion - adds Curse tag
		if ((effect as any).target === 'curse_school_specialization') {
			if (!profile.tags.includes('Curse' as SpellTag)) {
				profile.tags.push('Curse' as SpellTag);
			}
		}

		// Spellcasting Expansion Talent - adds schools from choice
		if ((effect as any).target === 'spell_list_expansion') {
			const selection = buildData.featureChoices?.['spell_list_expansion'];
			if (selection) {
				if (Array.isArray(selection)) {
					selection.forEach((school) => {
						if (!profile.schools.includes(school as SpellSchool)) {
							profile.schools.push(school as SpellSchool);
						}
					});
				}
			}
		}
	}

	return profile;
}

/**
 * Generates the array of SpellsKnownSlots for the character.
 * Processes progression table gains, GRANT_SPELL effects, and talent bonuses.
 */
export function generateSpellsKnownSlots(
	buildData: EnhancedCharacterBuildData,
	progressionGains: any,
	effects: AttributedEffect[],
	talentSpellBonus: number = 0,
	classDefinition: ClassDefinition | null = null
): SpellsKnownSlot[] {
	const slots: SpellsKnownSlot[] = [];

	// 1. Generate Global Class Progression Slots
	const totalProgressionSpellSlots =
		(progressionGains.totalSpellsKnown ?? 0) + (progressionGains.totalCantripsKnown ?? 0);
	for (let i = 0; i < totalProgressionSpellSlots; i++) {
		slots.push({
			id: `global_spell_${i}`,
			type: 'spell',
			sourceName: `${classDefinition?.className || 'Class'} Progression`,
			isGlobal: true
		});
	}

	// 1b. Generate Global Talent Bonus Slots (from MODIFY_STAT spellsKnown)
	for (let i = 0; i < talentSpellBonus; i++) {
		slots.push({
			id: `talent_spell_${i}`,
			type: 'spell',
			sourceName: 'Talent Bonus',
			isGlobal: true
		});
	}

	// 2. Generate Specialized Slots from GRANT_SPELL effects
	effects.forEach((effect, index) => {
		if ((effect as any).type === 'GRANT_SPELL' || (effect as any).type === 'GRANT_CANTRIP') {
			if (!effect.resolved) return;

			const count = Number((effect as any).value) || 1;

			for (let i = 0; i < count; i++) {
				const slot: SpellsKnownSlot = {
					id: `specialized_${effect.source.id}_${index}_${i}`,
					type: 'spell',
					sourceName: effect.source.name,
					isGlobal: false,
					specificRestrictions: {}
				};

				// Map common GRANT_SPELL targets to restrictions
				const target = (effect as any).target;
				if (target === 'astromancy_school')
					slot.specificRestrictions!.schools = ['Astromancy' as SpellSchool];
				if (target === 'conjuration_school')
					slot.specificRestrictions!.schools = ['Conjuration' as SpellSchool];
				if (target === 'divination_school')
					slot.specificRestrictions!.schools = ['Divination' as SpellSchool];
				if (target === 'elemental_school')
					slot.specificRestrictions!.schools = ['Elemental' as SpellSchool];
				if (target === 'enchantment_school')
					slot.specificRestrictions!.schools = ['Enchantment' as SpellSchool];
				if (target === 'invocation_school')
					slot.specificRestrictions!.schools = ['Invocation' as SpellSchool];
				if (target === 'nullification_school')
					slot.specificRestrictions!.schools = ['Nullification' as SpellSchool];
				if (target === 'transmutation_school')
					slot.specificRestrictions!.schools = ['Transmutation' as SpellSchool];
				if (target === 'illusion_school')
					slot.specificRestrictions!.schools = ['Illusion' as SpellSchool];

				if (target === 'Divine_Spell_List')
					slot.specificRestrictions!.sources = ['Divine' as SpellSource];

				if (target === 'curse_tag') slot.specificRestrictions!.tags = ['Curse' as SpellTag];
				if (target === 'any_psychic_tag') slot.specificRestrictions!.tags = ['Psychic' as SpellTag];
				if (target === 'by_tag' && (effect as any).userChoice) {
					const chosenTag =
						(effect as any).resolvedValue ??
						((effect as any).dependsOnChoice
							? buildData.featureChoices?.[(effect as any).dependsOnChoice]
							: undefined);
					if (chosenTag) slot.specificRestrictions!.tags = [chosenTag as SpellTag];
				}

				// Surgical grants
				if (target === 'druidcraft') slot.specificRestrictions!.exactSpellId = 'druidcraft';
				if (target === 'Sorcery') slot.specificRestrictions!.exactSpellId = 'sorcery';
				slot.specificRestrictions!.exactSpellId ??= getExactSpellIdForTarget(target);

				// Bard Magical Secrets (Special case: no restrictions)
				if (
					target === 'any_spell_list' ||
					target === 'any_source' ||
					effect.source.id === 'bard_magical_secrets'
				) {
					slot.specificRestrictions = {};
				}

				slots.push(slot);
			}
		}
	});

	return slots;
}
