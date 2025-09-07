import type { ClassDefinition } from '../../schemas/character.schema';

export const monkClass: ClassDefinition = {
	className: 'Monk',
	startingEquipment: {
		weaponsOrShields: ['2 Weapons', '3 Weapons with the Toss or Thrown Property'],
		armor: '1 set of Light Armor',
		packs: 'X or Y Packs (Adventuring Packs Coming Soon)'
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light Armor']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Monk Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Monk Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Monk Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, you can regain up to half your maximum SP when you succeed on an Attack Check, Athletics Check, or Acrobatics Check.',
			conditions: []
		}
	},
	coreFeatures: [
		{
			featureName: 'Monk Training',
			levelGained: 1,
			description: 'Your martial arts training grants you greater offense, defense, and movement.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'iron_palm',
					value:
						'Your limbs are considered Natural Weapons with the Impact Property that deal 1 Bludgeoning damage.'
				},
				{
					type: 'MODIFY_STAT',
					target: 'pd',
					value: 2,
					condition: 'not_wearing_armor'
				},
				{
					type: 'MODIFY_STAT',
					target: 'moveSpeed',
					value: 1,
					condition: 'not_wearing_armor'
				},
				{
					type: 'MODIFY_STAT',
					target: 'jumpDistance',
					value: 1,
					condition: 'not_wearing_armor'
				},
				{
					type: 'GRANT_ABILITY',
					target: 'step_of_wind',
					value:
						'While not wearing Armor: move on vertical surfaces and across liquids, use Prime Modifier for Jump Distance and Fall damage.'
				}
			]
		},
		{
			id: 'monk_stance',
			featureName: 'Monk Stance',
			levelGained: 1,
			description:
				'You learn 2 Monk Stances. You can enter/swap stances at the start of your turn or spend 1 SP to swap during your turn.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'monk_stances',
					value: {
						prompt: 'Learn 2 Monk Stances',
						count: 2,
						options: [
							'bear_stance',
							'bull_stance',
							'cobra_stance',
							'gazelle_stance',
							'tiger_stance',
							'turtle_stance'
						]
					},
					userChoice: {
						prompt: 'Choose 2 Monk Stances to learn',
						options: [
							'Bear Stance (Big Hits)',
							'Bull Stance (Knockback)',
							'Cobra Stance (Counter)',
							'Gazelle Stance (Nimble)',
							'Tiger Stance (Mobility)',
							'Turtle Stance (Defense)'
						]
					}
				}
			]
		},
	]
};
