import type { Talent } from './talent.types';

export const generalTalents: Talent[] = [
	{
		id: 'general_ancestry_increase',
		name: 'Ancestry Increase',
		category: 'General',
		description: 'You gain 2 Ancestry Points.',
		effects: [{ type: 'MODIFY_STAT', target: 'ancestryPoints', value: 2 }]
	},
	{
		id: 'general_attribute_increase',
		name: 'Attribute Increase',
		category: 'General',
		description: 'You gain 2 Attribute Points to put into any Attributes of your choice.',
		effects: [{ type: 'MODIFY_STAT', target: 'attributePoints', value: 2 }]
	},
	{
		id: 'general_skill_increase',
		name: 'Skill Increase',
		category: 'General',
		description:
			'You gain 4 Skill Points. You can convert these to Trade or Language Points as normal.',
		effects: [{ type: 'MODIFY_STAT', target: 'skillPoints', value: 4 }]
	},
	{
		id: 'general_martial_expansion',
		name: 'Martial Expansion',
		category: 'General',
		description:
			'You gain Combat Training with Weapons, Armor, and Shields. You learn 2 additional Maneuvers. You gain the Stamina Regen of a Class of your choice.',
		effects: [
			{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
			{ type: 'GRANT_COMBAT_TRAINING', target: 'Armor', value: true },
			{ type: 'GRANT_COMBAT_TRAINING', target: 'Shields', value: true },
			{ type: 'MODIFY_STAT', target: 'maneuversKnown', value: 2 },
			{
				type: 'GRANT_ABILITY',
				target: 'stamina_regen_class_choice',
				value: 'Gain Stamina Regen of a Class of your choice.'
			}
		]
	},
	{
		id: 'general_spellcasting_expansion',
		name: 'Spellcasting Expansion',
		category: 'General',
		description:
			'You gain Combat Training with Spell Focuses. Your Maximum Mana Points increases by 2. Add 1 Spell Source or 3 Spell Schools to your Spell List. You learn 3 additional Spells.',
		effects: [
			{ type: 'GRANT_COMBAT_TRAINING', target: 'Spell_Focuses', value: true },
			{ type: 'MODIFY_STAT', target: 'mpMax', value: 2 },
			{
				type: 'GRANT_ABILITY',
				target: 'spell_list_expansion',
				value: 'Add 1 Spell Source or 3 Spell Schools to your Spell List.'
			},
			{ type: 'MODIFY_STAT', target: 'spellsKnown', value: 3 }
		]
	}
];

export const multiclassTalents: Talent[] = [
	{
		id: 'multiclass_novice',
		name: 'Novice Multiclass',
		category: 'Multiclass',
		description: 'You can choose a 1st Level Class Feature from any Class.',
		effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_feature_level_1', value: 1 }]
	},
	{
		id: 'multiclass_adept',
		name: 'Adept Multiclass',
		category: 'Multiclass',
		description: 'You can choose a 2nd Level Class Feature from any Class.',
		prerequisites: { level: 4 },
		effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_feature_level_2', value: 1 }]
	},
	{
		id: 'multiclass_expert',
		name: 'Expert Multiclass',
		category: 'Multiclass',
		description:
			'Choose a 5th Level Class Feature OR a 3rd Level Subclass Feature from a class you have at least 1 feature from.',
		prerequisites: { level: 7 },
		effects: [
			{ type: 'GRANT_CHOICE', target: 'multiclass_feature_level_5_or_subclass_3', value: 1 }
		]
	},
	{
		id: 'multiclass_master',
		name: 'Master Multiclass',
		category: 'Multiclass',
		description:
			'Choose a 6th Level Subclass Feature from a subclass you have at least 1 feature from.',
		prerequisites: { level: 10 },
		effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_subclass_feature_level_6', value: 1 }]
	},
	{
		id: 'multiclass_grandmaster',
		name: 'Grandmaster Multiclass',
		category: 'Multiclass',
		description:
			'Choose an 8th Level Class Capstone Feature from any Class you have at least 2 Class Features from.',
		prerequisites: { level: 13 },
		effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_capstone_feature_level_8', value: 1 }]
	},
	{
		id: 'multiclass_legendary',
		name: 'Legendary Multiclass',
		category: 'Multiclass',
		description:
			'Choose a 9th Level Subclass Capstone Feature from any Subclass you have at least 2 Subclass Features from.',
		prerequisites: { level: 17 },
		effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_subclass_capstone_level_9', value: 1 }]
	}
];
