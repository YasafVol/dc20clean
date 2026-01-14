/**
 * Bard Class Definition - New Effect Schema
 * Based on DC20 Bard features with spellcasting and performance abilities
 */

import type { ClassDefinition } from '../../schemas/character.schema';

export const bardClass: ClassDefinition = {
	className: 'Bard',
	startingEquipment: {
		weaponsOrShields: ['1 Weapon or Light Shield'],
		armor: ['1 set of Light Armor'],
		spellFocus: ['1 Spell Focus (Musical Instrument)'],
		packs: 'Adventuring Pack (Coming Soon)'
	},
	spellcasterPath: {
		combatTraining: {
			armor: ['Light_Armor'],
			shields: ['Light_Shields']
		},
		spellList: {
			description:
				'When you learn a new Spell, you can choose any Spell from the Enchantment Spell School or with the following Spell Tags: Embolden, Enfeeble, Healing, Illusion, or Sound.',
			type: 'schools',
			specificSchools: ['Enchantment'],
			spellTags: ['Embolden', 'Enfeeble', 'Healing', 'Illusion', 'Sound']
		},
		spells: {
			description: 'Spells Known column of the Bard Class Table'
		},
		manaPoints: {
			maximumIncreasesBy: 'Mana Points column of the Bard Class Table'
		}
	},
	coreFeatures: [
		{
			id: 'bard_spellcasting_path',
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description:
				'You gain spellcasting abilities. You can choose Spells from the Enchantment School or with Embolden, Enfeeble, Healing, Illusion, or Sound tags.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Spell_Focuses', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Shields', value: true }
			]
		},
		{
			id: 'bard_font_of_inspiration',
			featureName: 'Font of Inspiration',
			levelGained: 1,
			description: 'You are an ever present source of aid for your allies.',
			benefits: [
				{
					name: 'Ranged Help Attack',
					description:
						'The range of your Help Action when aiding an Attack increases to 10 Spaces.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'ranged_help_attack',
							value: 'Help Action range for attacks extends to 10 Spaces.'
						}
					]
				},
				{
					name: 'Help Reaction',
					description:
						"When a creature you can see makes a Check, you can take the Help Action as a Reaction to aid them with their Check, provided you're within range to do so.",
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'help_reaction',
							value: 'Take Help Action as Reaction when creatures make Checks.'
						}
					]
				}
			]
		},
		{
			id: 'bard_remarkable_repertoire',
			featureName: 'Remarkable Repertoire',
			levelGained: 1,
			description: "You've picked up a few tricks along your travels.",
			benefits: [
				{
					name: 'Jack of All Trades',
					description: 'You gain 2 Skill Points.',
					effects: [{ type: 'MODIFY_STAT', target: 'skillPoints', value: 2 }]
				},
				{
					name: 'Magical Secrets',
					description: 'You learn any 2 Spells of your choice from any Spell List.',
					effects: [{ type: 'GRANT_SPELL', target: 'any_spell_list', value: 2 }]
				},
				{
					name: 'Magical Expression',
					description:
						'You learn to express your art in a unique manner, granting you the ability to alter how you cast Spells.',
					effects: [
						{
							type: 'GRANT_CHOICE',
							target: 'magical_expression',
							value: 1,
							userChoice: {
								prompt: 'Choose your magical expression style',
								options: ['Visual', 'Auditory']
							}
						}
					]
				}
			]
		},
		{
			id: 'bard_crowd_pleaser',
			featureName: 'Crowd Pleaser',
			levelGained: 1,
			description:
				"When you spend at least 5 minutes performing an Artistry Trade for one or more people who are actively watching or listening to your performance, you can make an Artistry Trade Check Contested by the targets' Charisma Save.",
			isFlavor: true,
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'crowd_pleaser',
					value: 'ADV on Charisma Checks against targets who watched your performance for 1 hour.'
				}
			]
		},
		{
			id: 'bard_bardic_performance',
			featureName: 'Bardic Performance',
			levelGained: 2,
			description:
				'You can spend 1 AP and 1 MP to start a performance that grants you a 10 Space Aura for 1 minute.',
			choices: [
				{
					id: 'bardic_performance_choice',
					prompt: 'Choose a performance type',
					count: 1,
					options: [
						{
							name: 'Battle Ballad',
							description:
								'The chosen creatures gain a d4 bonus to the first Attack Check they make on each of their turns.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'battle_ballad',
									value: 'Allies in aura gain d4 bonus to first Attack Check each turn.'
								}
							]
						},
						{
							name: 'Fast Tempo',
							description: 'The chosen creatures gain +1 Speed.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'fast_tempo',
									value: 'Allies in aura gain +1 Speed.'
								}
							]
						},
						{
							name: 'Inspiring',
							description:
								'The chosen creatures gain 1 Temp HP at the start of each of their turns.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'inspiring_performance',
									value: 'Allies in aura gain 1 Temp HP at start of their turns.'
								}
							]
						},
						{
							name: 'Emotional',
							description:
								'Choose 1 of the following Conditions: Charmed, Frightened, Intimidated, or Taunted. The chosen creatures have Resistance against the chosen Condition. If a target is affected by the chosen Condition at the start of its turn, it can immediately attempt to end the Condition on itself by Repeating its Save.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'emotional_performance',
									value:
										'Allies in aura gain Resistance to chosen condition and can repeat saves at start of turn.'
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'bard_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		},
		{
			id: 'bard_level_5_placeholder',
			featureName: 'Virtuoso (Placeholder)',
			levelGained: 5,
			isFlavor: true,
			description: 'Placeholder feature for Level 5. See CH6 for final design.'
		},
		{
			id: 'bard_level_8_capstone_placeholder',
			featureName: 'Magnum Opus (Placeholder)',
			levelGained: 8,
			isFlavor: true,
			description: 'Placeholder capstone for Level 8. See CH6 for final design.'
		}
	],
	subclasses: [
		{
			subclassName: 'Eloquence',
			description: 'Masters of persuasion and charm magic.',
			features: [
				{
					featureName: 'Beguiling Presence',
					levelGained: 3,
					description: 'You gain enhanced charm abilities and magical persuasion.',
					benefits: [
						{
							name: 'Enthrall',
							description:
								"You learn the Charm Spell, and it doesn't end as a result of the target taking damage. If you already know it, you instead learn another spell with the Charmed Tag.",
							effects: [
								{ type: 'GRANT_SPELL', target: 'charm', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'enhanced_charm',
									value: "Charm spell doesn't end from target taking damage."
								}
							]
						},
						{
							name: 'Misleading Muse',
							description:
								'When a creature within your Bardic Performance targets only you with an Attack, you can redirect it.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'misleading_muse',
									value: 'Spend 1 AP as Reaction to charm attacker and redirect attack.'
								}
							]
						},
						{
							name: 'Mind Games',
							description:
								'When the Charmed Condition ends on a creature Charmed by you, you can deal psychic damage.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'mind_games',
									value: 'Deal 1 Psychic damage when charm ends.'
								}
							]
						}
					]
				},
				{
					featureName: 'Eloquent Orator',
					levelGained: 3,
					description:
						'Your speech is magically enchanted. Creatures can always understand the words you speak, provided they speak at least 1 Language.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'eloquent_orator',
							value: 'All creatures with language can understand your speech.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Jester',
			description: 'Comedic performers who use humor and chaos in battle.',
			features: [
				{
					featureName: 'Antagonizing Act',
					levelGained: 3,
					description: 'You gain abilities that frustrate and distract enemies.',
					benefits: [
						{
							name: 'Heckle',
							description:
								"Once per Round when a creature within your Bardic Performance fails a Save, they're Taunted.",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'heckle',
									value: 'Taunt creatures who fail saves in your performance aura.'
								}
							]
						},
						{
							name: 'Distraction',
							description:
								"When a hostile creature within 10 Spaces of you makes an Attack, you can spend 1 AP as a Reaction to roll a Help Die and subtract the result from the target's Check.",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'distraction',
									value:
										"Spend 1 AP as Reaction to subtract Help Die from attacker's Check within 10 Spaces."
								}
							]
						},
						{
							name: 'Pratfall',
							description: 'When you fail a Save, you can grant an ally ADV on their next Check.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'pratfall',
									value: 'Grant ally ADV on Check when you fail a save.'
								}
							]
						}
					]
				},
				{
					featureName: 'Comedian',
					levelGained: 3,
					description: 'You have ADV on Checks to make other creatures laugh.',
					isFlavor: true,
					effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'comedy', value: 'ADV' }]
				}
			]
		}
	]
};
