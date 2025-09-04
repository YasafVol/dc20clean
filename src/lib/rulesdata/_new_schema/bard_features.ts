/**
 * Bard Class Definition - New Effect Schema
 * Based on DC20 Bard features with spellcasting and performance abilities
 */

import type { ClassDefinition } from '../schemas/character.schema';

export const bardClass: ClassDefinition = {
	className: 'Bard',
	spellcasterPath: {
		spellcastingProgression: 'full',
		spellcastingAttribute: 'charisma',
		spellList: {
			description: 'You learn any 2 Spells of your choice from any Spell List.',
			type: 'any'
		},
		cantrips: {
			description: 'Cantrips Known column of the Bard Class Table'
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
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description: 'You gain the ability to cast spells from multiple schools.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Shields', value: true }
			]
		},
		{
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
								'The chosen creatures deal +1 damage against 1 target of their choice on an Attack they make once on each of their turns.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'battle_ballad',
									value:
										'Allies in aura deal +1 damage on first attack per turn against chosen target.'
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
								'Choose 1 of the following Conditions: Charmed, Frightened, Intimidated, or Taunted. The chosen creatures have Resistance against the chosen Condition.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'emotional_performance',
									value: 'Allies in aura gain Resistance to chosen condition and can repeat saves.'
								}
							]
						}
					]
				}
			]
		},
		{
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
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
								"You learn the Befriend Spell, and it doesn't end as a result of the target taking damage.",
							effects: [
								{ type: 'GRANT_SPELL', target: 'befriend', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'enhanced_befriend',
									value: "Befriend spell doesn't end from target taking damage."
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
								'When a hostile creature within 10 Spaces makes an Attack, you can impose DisADV.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'distraction',
									value: 'Spend 1 AP as Reaction to impose DisADV on nearby attacks.'
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
