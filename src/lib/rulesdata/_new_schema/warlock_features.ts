import type { ClassDefinition } from '../schemas/character.schema';

export const warlockClass: ClassDefinition = {
	className: 'Warlock',
	startingEquipment: {
		weaponsOrShields: ['2 Weapons'],
		armor: '1 set of Light Armor',
		packs: 'X or Y Packs (Adventuring Packs Coming Soon)'
	},
	spellcasterPath: {
		spellcastingProgression: 'warlock',
		spellcastingAttribute: 'charisma',
		spellsKnown: {
			description: 'Spells Known column of the Warlock Class Table'
		},
		ritualCasting: false,
		spellPreparation: false
	},
	coreFeatures: [
		{
			id: 'otherworldly_patron',
			featureName: 'Otherworldly Patron',
			levelGained: 1,
			description: 'You have struck a pact with an otherworldly being. Choose your patron type.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'warlock_patron',
					value: {
						prompt: 'Choose your Otherworldly Patron',
						options: ['archfey', 'fiend', 'great_old_one', 'celestial', 'hexblade']
					},
					userChoice: {
						prompt: 'Choose your Otherworldly Patron',
						options: [
							'The Archfey',
							'The Fiend',
							'The Great Old One',
							'The Celestial',
							'The Hexblade'
						]
					}
				}
			]
		},
		{
			id: 'pact_magic',
			featureName: 'Pact Magic',
			levelGained: 1,
			description:
				'Your arcane research and magic bestowed by your patron have given you facility with spells.',
			effects: [
				{
					type: 'GRANT_SPELLCASTING',
					target: 'warlock_spellcasting',
					value: 'Pact Magic: short rest spell slot recovery'
				}
			]
		},
		{
			id: 'eldritch_invocations',
			featureName: 'Eldritch Invocations',
			levelGained: 2,
			description:
				'You learn eldritch invocations, fragments of forbidden knowledge that imbue you with an abiding magical ability.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'eldritch_invocations',
					value: {
						prompt: 'Choose 2 Eldritch Invocations',
						count: 2,
						options: [
							'agonizing_blast',
							'armor_of_shadows',
							'beast_speech',
							'beguiling_influence',
							'devil_sight',
							'eldritch_sight',
							'eyes_of_rune_keeper',
							'fiendish_vigor'
						]
					},
					userChoice: {
						prompt: 'Choose 2 Eldritch Invocations',
						options: [
							'Agonizing Blast',
							'Armor of Shadows',
							'Beast Speech',
							'Beguiling Influence',
							"Devil's Sight",
							'Eldritch Sight',
							'Eyes of the Rune Keeper',
							'Fiendish Vigor'
						]
					}
				}
			]
		},
		{
			id: 'pact_boon',
			featureName: 'Pact Boon',
			levelGained: 3,
			description: 'Your otherworldly patron bestows a gift upon you for your loyal service.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'pact_boon',
					value: {
						prompt: 'Choose your Pact Boon',
						options: ['chain', 'blade', 'tome']
					},
					userChoice: {
						prompt: 'Choose your Pact Boon',
						options: [
							'Pact of the Chain (familiar)',
							'Pact of the Blade (magical weapon)',
							'Pact of the Tome (ritual spells)'
						]
					}
				}
			]
		}
	]
};
