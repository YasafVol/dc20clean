import type { ClassDefinition } from '../schemas/character.schema';

export const sorcererClass: ClassDefinition = {
	className: 'Sorcerer',
	startingEquipment: {
		weaponsOrShields: ['2 Weapons'],
		armor: '1 set of Light Armor',
		packs: 'X or Y Packs (Adventuring Packs Coming Soon)'
	},
	spellcasterPath: {
		spellcastingProgression: 'full',
		spellcastingAttribute: 'charisma',
		spellsKnown: {
			description: 'Spells Known column of the Sorcerer Class Table'
		},
		ritualCasting: false,
		spellPreparation: false
	},
	coreFeatures: [
		{
			id: 'draconic_bloodline',
			featureName: 'Draconic Bloodline',
			levelGained: 1,
			description:
				'Choose a draconic ancestor. You gain resistance to the associated damage type and bonus spells.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'draconic_bloodline',
					value: {
						prompt: 'Choose your Draconic Bloodline',
						options: [
							'red',
							'blue',
							'green',
							'black',
							'white',
							'gold',
							'silver',
							'bronze',
							'copper',
							'brass'
						]
					},
					userChoice: {
						prompt: 'Choose your Draconic Ancestor',
						options: [
							'Red Dragon (Fire)',
							'Blue Dragon (Lightning)',
							'Green Dragon (Poison)',
							'Black Dragon (Acid)',
							'White Dragon (Cold)',
							'Gold Dragon (Fire)',
							'Silver Dragon (Cold)',
							'Bronze Dragon (Lightning)',
							'Copper Dragon (Acid)',
							'Brass Dragon (Fire)'
						]
					}
				}
			]
		},
		{
			id: 'draconic_resilience',
			featureName: 'Draconic Resilience',
			levelGained: 1,
			description:
				'Your hit point maximum increases by 1, and it increases by 1 again whenever you gain a level in this class.',
			effects: [
				{
					type: 'MODIFY_STAT',
					target: 'hpMax',
					value: 1
				}
			]
		},
		{
			id: 'sorcery_points',
			featureName: 'Sorcery Points',
			levelGained: 2,
			description:
				'You have sorcery points equal to your sorcerer level. You can use these to cast additional spells or enhance your magic.',
			effects: [
				{
					type: 'GRANT_RESOURCE',
					target: 'sorcery_points',
					value: 'level'
				}
			]
		},
		{
			id: 'metamagic',
			featureName: 'Metamagic',
			levelGained: 3,
			description:
				'You gain the ability to twist your spells to suit your needs. You learn metamagic options that you can use with sorcery points.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'metamagic_options',
					value: {
						prompt: 'Choose 2 Metamagic options',
						count: 2,
						options: [
							'careful_spell',
							'distant_spell',
							'empowered_spell',
							'extended_spell',
							'heightened_spell',
							'quickened_spell',
							'subtle_spell',
							'twinned_spell'
						]
					},
					userChoice: {
						prompt: 'Choose 2 Metamagic options',
						options: [
							'Careful Spell',
							'Distant Spell',
							'Empowered Spell',
							'Extended Spell',
							'Heightened Spell',
							'Quickened Spell',
							'Subtle Spell',
							'Twinned Spell'
						]
					}
				}
			]
		}
	]
};
