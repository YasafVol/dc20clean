import type { ClassDefinition } from '../../schemas/character.schema';

export const spellbladeClass: ClassDefinition = {
	className: 'Spellblade',
	startingEquipment: {
		weaponsOrShields: ['3 Weapons', '1 Shield'],
		armor: '1 set of Light Armor',
		packs: 'X or Y Packs (Adventuring Packs Coming Soon)'
	},
	hybridPath: {
		martialAspect: {
			combatTraining: {
				weapons: ['Weapons'],
				armor: ['Light Armor', 'Heavy Armor'],
				shields: ['All Shields']
			},
			maneuvers: {
				learnsAllAttack: true,
				additionalKnown: 'Maneuvers Known column of the Spellblade Class Table'
			},
			techniques: {
				additionalKnown: 'Techniques Known column of the Spellblade Class Table'
			},
			staminaPoints: {
				maximumIncreasesBy: 'Stamina Points column of the Spellblade Class Table'
			}
		},
		spellcastingAspect: {
			ritualCasting: false,
			spellPreparation: false
		}
	},
	coreFeatures: [
		{
			featureName: 'Fighting Style',
			levelGained: 1,
			description:
				'You adopt a particular style of fighting as your specialty. Choose one Fighting Style.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'fighting_style',
					value: {
						prompt: 'Choose a Fighting Style',
						options: [
							'defense',
							'dueling',
							'great_weapon_fighting',
							'protection',
							'two_weapon_fighting'
						]
					},
					userChoice: {
						prompt: 'Choose your Fighting Style',
						options: [
							'Defense (+1 AD while wearing armor)',
							'Dueling (+2 damage with one-handed weapons)',
							'Great Weapon Fighting (reroll 1s and 2s on damage)',
							'Protection (use reaction to impose DisADV)',
							'Two-Weapon Fighting (add ability modifier to off-hand damage)'
						]
					}
				}
			]
		},
		{
			featureName: 'Spellstrike',
			levelGained: 2,
			description:
				'When you cast a spell that requires a Spell Attack, you can deliver the spell through a weapon attack.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'spellstrike',
					value: 'Deliver touch spells through weapon attacks.'
				}
			]
		},
		{
			id: 'arcane_weapon',
			featureName: 'Arcane Weapon',
			levelGained: 2,
			description:
				"You can use a bonus action to imbue a weapon you're holding with magical energy.",
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'arcane_weapon',
					value: 'Imbue weapons with magical energy for enhanced damage.'
				}
			]
		}
	]
};
