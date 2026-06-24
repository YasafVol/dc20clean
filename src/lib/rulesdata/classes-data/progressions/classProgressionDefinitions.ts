import type { ClassProgressionLevel } from '../progressionTypes';
import { casterProgressionTemplate } from './templates/caster.template';
import { createClassProgression } from './templates/createClassProgression';
import { martialProgressionTemplate } from './templates/martial.template';
import { spellbladeProgressionTemplate } from './templates/spellblade.template';

export type ClassProgressionCategory = 'fullMartial' | 'fullCaster' | 'hybrid';

export type ClassFeatureSchedule = Partial<Record<number, string[]>>;

export interface ClassProgressionDefinition {
	category: ClassProgressionCategory;
	featureSchedule: ClassFeatureSchedule;
	explicitProgression?: readonly ClassProgressionLevel[];
}

const rogueExplicitProgression: ClassProgressionLevel[] = [
	{
		level: 1,
		gainedHealth: 8,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 2,
		gainedManeuversKnown: 2,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { classFeatures: [] }
	},
	{
		level: 2,
		gainedHealth: 1,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { talents: 1, pathProgression: true, classFeatures: [] }
	},
	{
		level: 3,
		gainedHealth: 2,
		gainedAttributePoints: 1,
		gainedSkillPoints: 1,
		gainedTradePoints: 1,
		gainedStaminaPoints: 1,
		gainedManeuversKnown: 1,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { subclassFeatureChoice: true }
	},
	{
		level: 4,
		gainedHealth: 1,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { talents: 1, pathProgression: true, ancestryPoints: 2 }
	},
	{
		level: 5,
		gainedHealth: 2,
		gainedAttributePoints: 1,
		gainedSkillPoints: 2,
		gainedTradePoints: 1,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 1,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { classFeatures: [] }
	},
	{
		level: 6,
		gainedHealth: 1,
		gainedAttributePoints: 0,
		gainedSkillPoints: 1,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { talents: 1, pathProgression: true }
	},
	{
		level: 7,
		gainedHealth: 2,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 1,
		gainedManeuversKnown: 1,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { subclassFeatureChoice: true }
	},
	{
		level: 8,
		gainedHealth: 1,
		gainedAttributePoints: 1,
		gainedSkillPoints: 1,
		gainedTradePoints: 1,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { talents: 1, pathProgression: true, ancestryPoints: 2 }
	},
	{
		level: 9,
		gainedHealth: 2,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 1,
		gainedManeuversKnown: 1,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { classFeatures: [] }
	},
	{
		level: 10,
		gainedHealth: 1,
		gainedAttributePoints: 1,
		gainedSkillPoints: 2,
		gainedTradePoints: 1,
		gainedStaminaPoints: 1,
		gainedManeuversKnown: 1,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { subclassFeatureChoice: true }
	}
];

const warlockExplicitProgression: ClassProgressionLevel[] = [
	{
		level: 1,
		gainedHealth: 8,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 6,
		gainedSpellsKnown: 4,
		gains: { classFeatures: [] }
	},
	{
		level: 2,
		gainedHealth: 1,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { talents: 1, pathProgression: true, classFeatures: [] }
	},
	{
		level: 3,
		gainedHealth: 2,
		gainedAttributePoints: 1,
		gainedSkillPoints: 1,
		gainedTradePoints: 1,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 3,
		gainedSpellsKnown: 1,
		gains: { subclassFeatureChoice: true }
	},
	{
		level: 4,
		gainedHealth: 1,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { talents: 1, pathProgression: true, ancestryPoints: 2 }
	},
	{
		level: 5,
		gainedHealth: 2,
		gainedAttributePoints: 1,
		gainedSkillPoints: 2,
		gainedTradePoints: 1,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 3,
		gainedSpellsKnown: 1,
		gains: { classFeatures: [] }
	},
	{
		level: 6,
		gainedHealth: 1,
		gainedAttributePoints: 0,
		gainedSkillPoints: 1,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { talents: 1, pathProgression: true }
	},
	{
		level: 7,
		gainedHealth: 2,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 3,
		gainedSpellsKnown: 1,
		gains: { subclassFeatureChoice: true }
	},
	{
		level: 8,
		gainedHealth: 1,
		gainedAttributePoints: 1,
		gainedSkillPoints: 1,
		gainedTradePoints: 1,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 0,
		gainedSpellsKnown: 0,
		gains: { talents: 1, pathProgression: true, ancestryPoints: 2 }
	},
	{
		level: 9,
		gainedHealth: 2,
		gainedAttributePoints: 0,
		gainedSkillPoints: 0,
		gainedTradePoints: 0,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 3,
		gainedSpellsKnown: 1,
		gains: { classFeatures: [] }
	},
	{
		level: 10,
		gainedHealth: 1,
		gainedAttributePoints: 1,
		gainedSkillPoints: 2,
		gainedTradePoints: 1,
		gainedStaminaPoints: 0,
		gainedManeuversKnown: 0,
		gainedManaPoints: 3,
		gainedSpellsKnown: 1,
		gains: { subclassFeatureChoice: true }
	}
];

export const CLASS_PROGRESSION_DEFINITIONS = {
	barbarian: {
		category: 'fullMartial',
		featureSchedule: {
			1: [
				'barbarian_martial_path',
				'barbarian_rage',
				'barbarian_berserker',
				'barbarian_shattering_force'
			],
			2: ['barbarian_battlecry'],
			5: ['barbarian_level_5_placeholder']
		}
	},
	bard: {
		category: 'fullCaster',
		featureSchedule: {
			1: [
				'bard_spellcasting_path',
				'bard_font_of_inspiration',
				'bard_remarkable_repertoire',
				'bard_crowd_pleaser'
			],
			2: ['bard_bardic_performance'],
			5: ['bard_level_5_placeholder']
		}
	},
	champion: {
		category: 'fullMartial',
		featureSchedule: {
			1: [
				'champion_martial_path',
				'champion_master_at_arms',
				'champion_fighting_spirit',
				'champion_know_your_enemy'
			],
			2: ['champion_adaptive_tactics'],
			5: ['champion_level_5_placeholder']
		}
	},
	cleric: {
		category: 'fullCaster',
		featureSchedule: {
			1: [
				'cleric_spellcasting_path',
				'cleric_order',
				'cleric_divine_blessing',
				'cleric_divine_omen'
			],
			2: ['cleric_channel_divinity'],
			5: ['cleric_level_5_placeholder']
		}
	},
	commander: {
		category: 'fullMartial',
		featureSchedule: {
			1: [
				'commander_martial_path',
				'commander_inspiring_presence',
				'commander_commanders_call',
				'commander_natural_leader'
			],
			2: ['commander_commanding_aura'],
			5: ['commander_level_5_placeholder']
		}
	},
	druid: {
		category: 'fullCaster',
		featureSchedule: {
			1: ['druid_spellcasting_path', 'druid_domain', 'druid_wild_form', 'druid_wild_speech'],
			2: ['druid_natures_torrent'],
			5: ['druid_level_5_placeholder']
		}
	},
	hunter: {
		category: 'fullMartial',
		featureSchedule: {
			1: ['hunter_martial_path', 'hunter_mark', 'hunter_favored_terrain', 'hunter_bestiary'],
			2: ['hunter_strike'],
			5: ['hunter_level_5_placeholder']
		}
	},
	monk: {
		category: 'fullMartial',
		featureSchedule: {
			1: ['monk_martial_path', 'monk_training', 'monk_stance', 'monk_meditation'],
			2: ['monk_spiritual_balance'],
			5: ['monk_level_5_placeholder']
		}
	},
	rogue: {
		category: 'fullMartial',
		featureSchedule: {
			1: [
				'rogue_martial_path',
				'rogue_debilitating_strike',
				'rogue_roguish_finesse',
				'rogue_cypher_speech'
			],
			2: ['rogue_cheap_shot'],
			5: ['rogue_level_5_placeholder']
		},
		explicitProgression: rogueExplicitProgression
	},
	sorcerer: {
		category: 'fullCaster',
		featureSchedule: {
			1: [
				'sorcerer_spellcasting_path',
				'sorcerer_innate_power',
				'sorcerer_overload_magic',
				'sorcerer_sorcery_spell'
			],
			2: ['sorcerer_meta_magic'],
			5: ['sorcerer_level_5_placeholder']
		}
	},
	spellblade: {
		category: 'hybrid',
		featureSchedule: {
			1: [
				'spellblade_martial_path',
				'spellblade_spellcasting_path',
				'spellblade_bound_weapon',
				'spellblade_disciplines',
				'spellblade_sense_magic'
			],
			2: ['spellblade_spellstrike'],
			5: ['spellblade_level_5_placeholder']
		}
	},
	warlock: {
		category: 'fullCaster',
		featureSchedule: {
			1: ['warlock_spellcasting_path', 'warlock_pact_boon', 'warlock_beseech_patron'],
			2: ['warlock_contract'],
			5: ['warlock_level_5_placeholder']
		},
		explicitProgression: warlockExplicitProgression
	},
	wizard: {
		category: 'fullCaster',
		featureSchedule: {
			1: [
				'wizard_spellcasting_path',
				'wizard_spell_school_initiate',
				'wizard_arcane_sigil',
				'wizard_ritual_caster'
			],
			2: ['wizard_prepared_spell'],
			5: ['wizard_level_5_placeholder']
		}
	}
} satisfies Record<string, ClassProgressionDefinition>;

export type ClassIdWithProgression = keyof typeof CLASS_PROGRESSION_DEFINITIONS;

export function getCategoryProgressionTable(
	category: ClassProgressionCategory
): readonly ClassProgressionLevel[] {
	switch (category) {
		case 'fullMartial':
			return martialProgressionTemplate;
		case 'fullCaster':
			return casterProgressionTemplate;
		case 'hybrid':
			return spellbladeProgressionTemplate;
	}
}

export function resolveClassProgressionTable(
	classId: ClassIdWithProgression
): ClassProgressionLevel[] {
	const definition = CLASS_PROGRESSION_DEFINITIONS[classId];
	const baseTable =
		definition.explicitProgression ?? getCategoryProgressionTable(definition.category);

	return createClassProgression(baseTable, definition.featureSchedule);
}
