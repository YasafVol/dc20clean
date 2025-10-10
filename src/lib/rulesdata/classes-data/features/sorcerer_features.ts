import type { ClassDefinition } from '../../schemas/character.schema';

export const sorcererClass: ClassDefinition = {
	className: 'Sorcerer',
	startingEquipment: {
		weaponsOrShields: ['1 Weapon'],
		armor: '1 set of Light Armor',
		packs: 'X or Y "Packs" (Adventuring Packs Coming Soon)',
	},
	spellcasterPath: {
		spellList: ['Arcane', 'Divine', 'Primal'],
		cantrips: {
			description:
				'The number of Cantrips you know increases as shown in the Cantrips Known column of the Sorcerer Class Table.',
		},
		spells: {
			description:
				'The number of Spells you know increases as shown in the Spells Known column of the Sorcerer Class Table.',
		},
		manaPoints: {
			maximumIncreasesBy: 'as shown in the Mana Points column of the Sorcerer Class Table.',
		},
	},
	coreFeatures: [
		{
			id: 'sorcerer_innate_power',
			featureName: 'Innate Power',
			levelGained: 1,
			description:
				'Choose a Sorcerous Origin that grants you a benefit: Intuitive Magic, Resilient Magic, or Unstable Magic. Additionally, you gain the following benefits.',
			benefits: [
				{
					name: 'Increased Maximum MP',
					description: 'Your maximum MP increases by 1.',
					effects: [{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 }],
				},
				{
					name: 'Free Spell Enhancement',
					description:
						'Once per Long Rest, you can use a 1 MP Spell Enhancement without spending any MP (up to your Mana Spend Limit). You regain the ability to use this benefit when you roll for Initiative.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'free_spell_enhancement',
							value: 'Once per Long Rest, use a 1 MP Spell Enhancement for free.',
						},
					],
				},
			],
			choices: [
				{
					id: 'sorcerous_origin',
					prompt: 'Choose a Sorcerous Origin',
					count: 1,
					options: [
						{
							name: 'Intuitive Magic',
							description:
								'Learn an additional Spell and Cantrip from your Sorcerer Spell List.',
							effects: [
								{
									type: 'GRANT_SPELL',
									target: 'sorcerer_spell_list',
									value: 1,
									userChoice: {
										prompt: 'Choose an additional spell from the sorcerer list',
									},
								},
								{
									type: 'GRANT_CANTRIP',
									target: 'sorcerer_spell_list',
									value: 1,
								},
							],
						},
						{
							name: 'Resilient Magic',
							description: 'You gain Dazed Resistance.',
							effects: [{ type: 'GRANT_RESISTANCE', target: 'Dazed', value: true }],
						},
						{
							name: 'Unstable Magic',
							description:
								'When you Critically Succeed or Fail on a Spell Check, roll on the Wild Magic Table.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'unstable_magic',
									value:
										'When you Critically Succeed or Fail on a Spell Check, roll on the Wild Magic Table.',
								},
							],
						},
					],
				},
			],
		},
		{
			id: 'sorcerer_overload_magic',
			featureName: 'Overload Magic',
			levelGained: 1,
			description:
				'You can spend 2 AP in Combat to channel raw magical energy for 1 minute, or until you become Incapacitated, die, or choose to end it early at any time for free.',
			benefits: [
				{
					name: 'Spell Check Bonus',
					description: 'You gain +5 to all Spell Checks you make.',
					effects: [
						{
							type: 'MODIFY_STAT',
							target: 'spellCheck',
							value: 5,
							condition: 'While Overload Magic is active',
						},
					],
				},
				{
					name: 'Overload Strain',
					description:
						'You must immediately make an Attribute Save (your choice) against your Save DC upon using this Feature, and again at the start of each of your turns. Failure: you gain Exhaustion. You lose any Exhaustion gained in this way when you complete a Short Rest.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'overload_strain',
							value:
								'Must save vs Exhaustion when using Overload Magic and at the start of each turn.',
						},
					],
				},
			],
		},
		{
			id: 'sorcerer_sorcery_spell',
			featureName: 'Sorcery',
			levelGained: 1,
			isFlavor: true,
			description: 'You learn the Sorcery Spell.',
			effects: [{ type: 'GRANT_SPELL', target: 'Sorcery', value: 1 }],
		},
		{
			id: 'sorcerer_meta_magic',
			featureName: 'Meta Magic',
			levelGained: 2,
			description:
				"You gain 2 unique Spell Enhancements from the list below. You can only use 1 of these Spell Enhancements per Spell you cast. MP spent on these Spell Enhancements doesn't count against your Mana Spend Limit.",
			choices: [
				{
					id: 'meta_magic_choice',
					prompt: 'Choose 2 Spell Enhancements',
					count: 2,
					options: [
						{
							name: 'Careful Spell',
							description:
								"When you Cast a Spell that targets an Area of Effect, you can choose to protect some of the creatures from the Spell's full force. Spend 1 MP and choose a number of creatures up to your Prime Modifier. All chosen creatures are immune to the Spell's damage and effects.",
							effects: [],
						},
						{
							name: 'Heightened Spell',
							description:
								'When you Cast a Spell that forces a creature to make a Save to resist its effects, you can spend 1 MP to give 1 target DisADV on its first Save against the Spell.',
							effects: [],
						},
						{
							name: 'Quickened Spell',
							description:
								'You can spend 1 MP to reduce the AP cost of a Spell by 1 (minimum of 1 AP).',
							effects: [],
						},
						{
							name: 'Subtle Spell',
							description:
								'When you cast a Spell, you can spend 1 MP to cast it without any Somatic or Verbal Components.',
							effects: [],
						},
						{
							name: 'Transmuted Spell',
							description:
								'When you cast a Spell that deals a type of damage from the following list, you can spend 1 MP to change that damage type to one of the other listed types: Cold, Corrosion, Fire, Lightning, Poison, or Sonic.',
							effects: [],
						},
					],
				},
			],
		},
		{
			id: 'sorcerer_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'talent',
					value: 1,
					userChoice: { prompt: 'Choose 1 Talent' },
				},
			],
		},
	],
	subclasses: [
		{
			subclassName: 'Angelic',
			features: [
				{
					featureName: 'Celestial Spark',
					levelGained: 1,
					description:
						'You can use a Minor Action to emit Bright Light within a 5 Space Radius and can end the effect at any time. You also gain the following abilities:',
					benefits: [
						{
							name: 'Celestial Origin',
							description: 'You gain 2 Ancestry Points that can only be spent on Angelborn Traits.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'celestial_origin',
									value: 'Gain 2 Ancestry Points for Angelborn Traits.',
								},
							],
						},
						{
							name: 'Celestial Protection',
							description:
								'You learn the Careful Spell Meta Magic option (choose another Meta Magic option if you already know it) and Careful Spell now costs 0 MP to use.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'careful_spell',
									value: 'Learn Careful Spell. It costs 0 MP.',
								},
							],
						},
						{
							name: 'Celestial Overload',
							description:
								"Once per Combat while you're Overloaded, you can spend 1 AP to release a burst of radiant light in a 5 Space Aura. Creatures of your choice within range are either healed or seared by the light (your choice for each creature).",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'celestial_overload',
									value: 'Spend 1 AP while overloaded for AoE heal/damage.',
								},
							],
						},
					],
				},
				{
					featureName: 'Celestial Appearance (Flavor Feature)',
					levelGained: 1,
					isFlavor: true,
					description:
						"You gain additional angelic features such as sparkling skin, feathers, a faint halo, or other changes of your choice. If you already have these features, they're enhanced or expanded upon. Additionally, if you're already Fluent in Celestial, you gain 1 level of Language Mastery in another Language of your choice.",
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'celestial_appearance',
							value:
								'Gain angelic features. If already fluent in Celestial, gain 1 Language Mastery.',
						},
					],
				},
			],
		},
		{
			subclassName: 'Draconic',
			features: [
				{
					featureName: 'Draconic Spark',
					levelGained: 1,
					description: 'You gain the following abilities:',
					benefits: [
						{
							name: 'Draconic Origin',
							description:
								'You gain 2 Ancestry Points that can only be spent on Dragonborn Traits. Additionally, choose a Draconic Origin from the Dragonborn Ancestry if you haven’t already.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'draconic_origin',
									value:
										'Gain 2 Ancestry Points for Dragonborn Traits & choose a Draconic Origin.',
								},
							],
						},
						{
							name: 'Draconic Overload',
							description:
								'While Overloaded, you gain Resistance (1) to Physical damage and your Draconic Origin damage type.',
							effects: [
								{
									type: 'GRANT_RESISTANCE',
									target: 'Physical',
									value: 1
								},
								{
									type: 'GRANT_RESISTANCE',
									target: 'Draconic Origin Damage Type',
									value: 1
								}
							]
						},
						{
							name: 'Draconic Transmutation',
							description:
								'You gain the Transmuted Spell Meta Magic (choose another Meta Magic option if you already have Transmuted Spell). Transmuted Spell now costs you 0 MP to use if you change the damage type to your Draconic Origin damage type.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'draconic_transmutation',
									value:
										'Gain Transmuted Spell. Cost is 0 MP if changing to Draconic Origin damage type.',
								},
							],
						},
					],
				},
				{
					featureName: 'Draconic Appearance (Flavor Feature)',
					levelGained: 1,
					isFlavor: true,
					description:
						"You gain additional draconic features such as scales, fangs, claws, or other changes of your choice. If you already have these features, they're enhanced or expanded upon. Additionally, you gain 1 level of Language Mastery in Draconic. If you're already Fluent in Draconic, you gain 1 level of Language Mastery in another Language of your choice.",
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'draconic_appearance',
							value:
								'Gain draconic features and 1 level of Language Mastery in Draconic (or another language if already fluent).',
						},
					],
				},
			],
		},
	],
};
