import type { ClassDefinition } from '../../schemas/character.schema';

export const rogueClass: ClassDefinition = {
	className: 'Rogue',
	startingEquipment: {
		weaponsOrShields: ['3 Weapons', '1 Shield'],
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
			additionalKnown: 'Maneuvers Known column of the Rogue Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Rogue Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Rogue Class Table'
		}
	},
	coreFeatures: [
		{
			featureName: 'Expertise',
			levelGained: 1,
			description:
				'Choose 2 Skills. Your Mastery Cap and Mastery Level in those Skills both increase by 1.',
			effects: [
				{
					type: 'INCREASE_SKILL_MASTERY_CAP',
					count: 2,
					value: 1
				}
			]
		},
		{
			featureName: 'Sneak Attack',
			levelGained: 1,
			description:
				'Once per turn, you can deal extra damage when you have ADV on an Attack Check or when you Flank the target.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'sneak_attack',
					value: 'Once per turn: extra damage on attacks with ADV or when Flanking.'
				}
			]
		},
		{
			featureName: "Thieves' Cant",
			levelGained: 1,
			description:
				'You know a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'thieves_cant',
					value: 'Secret language for hiding messages in normal conversation.'
				}
			]
		},
		{
			featureName: 'Cunning Action',
			levelGained: 2,
			description: 'You can use your Minor Action to take the Disengage, Hide, or Dash action.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'cunning_action',
					value: 'Use Minor Action for Disengage, Hide, or Dash.'
				}
			]
		}
	]
};
