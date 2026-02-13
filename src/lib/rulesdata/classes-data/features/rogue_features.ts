import type { ClassDefinition } from '../../schemas/character.schema';

export const rogueClass: ClassDefinition = {
	className: 'Rogue',
	classCategory: 'martial',
	startingEquipment: {
		weaponsOrShields: ['3 Weapons or Light Shields'],
		rangedWeapons: ['Ranged Weapon with 20 Ammo', '3 Weapons with the Toss or Thrown Property'],
		armor: ['1 set of Light Armor'],
		tradeTools: ['1 set of Trade Tools'],
		packs: ['X or Y Packs (Adventuring Packs Coming Soon)']
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light Armor'],
			shields: ['Light Shields']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Rogue Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Rogue Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, regain up to half your maximum SP when you hit a Flanked or Prone target, hit a target with any Condition, hit a target you are Hidden from, or gain the benefits of your Cunning Action.'
		}
	},
	coreFeatures: [
		{
			id: 'rogue_source_of_power',
			featureName: 'Source of Power',
			levelGained: 1,
			isFlavor: true,
			description:
				'Rogues exploit weakness through nimbleness and cunning, whether learned as thieves, nobles, or assassins.'
		},
		{
			id: 'rogue_debilitating_strike',
			featureName: 'Debilitating Strike',
			levelGained: 1,
		description:
			'When you hit with a weapon attack you may spend 1 SP. The target makes a Physical Save vs your Save DC; on failure, choose Deafened, Exposed, Hindered, or Slowed 2. The effect lasts for 1 Round and different choices may stack but not duplicates.'
		},
		{
			id: 'rogue_roguish_finesse',
			featureName: 'Roguish Finesse',
			levelGained: 1,
			description: 'Blend agility, expertise, and opportunism in combat and exploration.',
			benefits: [
				{
					name: 'Cunning Action',
					description:
						'When you take the Disengage, Feint, or Hide actions, gain free movement equal to half your Speed immediately before or after the action.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'rogue_cunning_action',
							value:
								'Gain movement equal to half Speed when taking Disengage, Feint, or Hide; movement occurs immediately before or after the action.'
						}
					]
				},
				{
					name: 'Skill Expertise',
					description:
						'Increase one Skill Mastery Limit by 1, up to Grandmaster (+10); only one increase per skill.',
					effects: [
						{
							type: 'INCREASE_SKILL_MASTERY_CAP',
							count: 1,
							value: 1
						}
					]
				},
				{
					name: 'Multi-Skilled',
					description: 'Gain 1 Skill Point.',
					effects: [{ type: 'MODIFY_STAT', target: 'skillPoints', value: 1 }]
				}
			]
		},
		{
			id: 'rogue_cypher_speech',
			featureName: 'Cypher Speech',
			levelGained: 1,
			isFlavor: true,
			description:
				'Become fluent in a Mortal language and craft hidden messages for a demographic of your choice, embedding simple directives in speech or writing.'
		},
		{
			id: 'rogue_cheap_shot',
			featureName: 'Cheap Shot',
			levelGained: 2,
			description:
				'You deal +1 damage on Martial Attacks against targets that are Flanked, Prone, conditioned (except Invisible), or unaware of you due to being Hidden.'
		},
		{
			id: 'rogue_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. You must meet any prerequisites to select it.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		},
		{
			id: 'rogue_level_5_placeholder',
			featureName: 'Shadow Master (Placeholder)',
			levelGained: 5,
			isFlavor: true,
			description: 'Placeholder feature for Level 5. See CH6 for final design.'
		},
		{
			id: 'rogue_level_8_capstone_placeholder',
			featureName: 'Perfect Crime (Placeholder)',
			levelGained: 8,
			isFlavor: true,
			description: 'Placeholder capstone for Level 8. See CH6 for final design.'
		}
	],
	subclasses: [
		{
			subclassName: 'Long Death',
			description: 'Rogues who inflict lingering, inescapable wounds.',
			features: [
				{
					id: 'rogue_thousand_cuts',
					featureName: 'Thousand Cuts',
					levelGained: 3,
					description:
						'Creatures that fail their Save against your Debilitating Strike also begin Bleeding (ignores immunity). Ending the Bleeding requires your Save DC and cannot be done by regaining HP.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'rogue_thousand_cuts',
							value:
								'On failed Debilitating Strike saves, inflict Bleeding; DC to end equals your Save DC and regaining HP cannot end it.'
						}
					]
				},
				{
					id: 'rogue_hundred_ways_to_die',
					featureName: 'Hundred Ways to Die',
					levelGained: 3,
					isFlavor: true,
					description:
						'Gain ADV on checks to determine causes of death or ways to kill, including identifying poisons, toxins, or lethal materials.'
				}
			]
		},
		{
			subclassName: 'Swashbuckler',
			description: 'Flashy duelists who taunt foes and seize every opening.',
			features: [
				{
					id: 'rogue_renegade_duelist',
					featureName: 'Renegade Duelist',
					levelGained: 3,
					description: 'Expand Cunning Action, taunt foes, and counterattack when they falter.',
					benefits: [
						{
							name: 'Flourishes',
							description: 'Cunning Action also grants movement when you take Disarm or Dodge.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'rogue_flourishes',
									value:
										'Cunning Action now includes Disarm and Dodge, providing the same free movement before or after the action.'
								}
							]
						},
						{
					name: 'Taunting Shot',
						description:
							'Once per round when attacking a conditioned foe, forgo Cheap Shot damage to force a Charisma Save or Taunt the target until your next turn ends.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'rogue_taunting_shot',
									value:
										'When an attack targets a creature with a Condition, you may forego Cheap Shot damage to force a Charisma Save. Failure: the creature is Taunted until the end of your next turn.'
								}
							]
						},
						{
							name: 'Riposte',
							description:
								'Creatures that miss you with melee attacks provoke an Opportunity Attack.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'rogue_riposte',
									value:
										'When a creature within your melee range misses you with an attack, it provokes an Opportunity Attack from you.'
								}
							]
						}
					]
				},
				{
					id: 'rogue_tall_tales',
					featureName: 'Tall Tales',
					levelGained: 3,
					isFlavor: true,
					description:
						'Spin captivating stories for up to five minutes to distract non-hostile crowds, giving them DisADV on Awareness Checks while enthralled.'
				}
			]
		}
	]
};
