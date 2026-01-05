/**
 * Wizard Class Definition - New Effect Schema
 * Based on DC20 Wizard features with spell school specialization
 */

import type { ClassDefinition } from '../../schemas/character.schema';

export const wizardClass: ClassDefinition = {
	className: 'Wizard',
	spellcasterPath: {
		spellList: {
			description: 'Arcane spells from multiple schools of magic',
			type: 'arcane'
		},
		cantrips: {
			description: 'Cantrips Known column of the Wizard Class Table'
		},
		spells: {
			description: 'Spells Known column of the Wizard Class Table'
		},
		manaPoints: {
			maximumIncreasesBy: 'Mana Points column of the Wizard Class Table'
		}
	},
	coreFeatures: [
		{
			id: 'wizard_spellcasting_path',
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description: 'You gain the ability to cast arcane spells.',
			effects: [{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true }]
		},
		{
			id: 'wizard_spell_school_initiate',
			featureName: 'Spell School Initiate',
			levelGained: 1,
			description: 'You have completed training in a specialized School of Magic.',
			choices: [
				{
					id: 'wizard_spell_school_initiate_0',
					prompt: 'Choose your specialized Spell School',
					count: 1,
					options: [
						{
							name: 'Astromancy',
							description: 'Specialize in time, space, and gravity magic.',
							effects: [
								{ type: 'GRANT_SPELL', target: 'astromancy_school', value: 2 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_astromancy',
									value:
										'Reduce MP cost by 1 for Astromancy spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							name: 'Conjuration',
							description: 'Specialize in creating physical material from nothing.',
							effects: [
								{ type: 'GRANT_SPELL', target: 'conjuration_school', value: 2 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_conjuration',
									value:
										'Reduce MP cost by 1 for Conjuration spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							name: 'Divination',
							description: 'Specialize in gaining information through magic.',
							effects: [
								{ type: 'GRANT_SPELL', target: 'divination_school', value: 2 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_divination',
									value:
										'Reduce MP cost by 1 for Divination spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							name: 'Elemental',
							description: 'Specialize in manipulating the elements.',
							effects: [
								{ type: 'GRANT_SPELL', target: 'elemental_school', value: 2 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_elemental',
									value:
										'Reduce MP cost by 1 for Elemental spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							name: 'Enchantment',
							description: 'Specialize in mental alteration (buff & debuff).',
							effects: [
								{ type: 'GRANT_SPELL', target: 'enchantment_school', value: 2 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_enchantment',
									value:
										'Reduce MP cost by 1 for Enchantment spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							name: 'Invocation',
							description: 'Specialize in positive energy (life and spirit).',
							effects: [
								{ type: 'GRANT_SPELL', target: 'invocation_school', value: 2 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_invocation',
									value:
										'Reduce MP cost by 1 for Invocation spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							name: 'Nullification',
							description: 'Specialize in negative energy (destroy matter or spirit).',
							effects: [
								{ type: 'GRANT_SPELL', target: 'nullification_school', value: 2 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_nullification',
									value:
										'Reduce MP cost by 1 for Nullification spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							name: 'Transmutation',
							description: 'Specialize in physical alteration (change form, shape, or matter).',
							effects: [
								{ type: 'GRANT_SPELL', target: 'transmutation_school', value: 2 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_transmutation',
									value:
										'Reduce MP cost by 1 for Transmutation spells (once per Long Rest, regain on Initiative).'
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'wizard_arcane_sigil',
			featureName: 'Arcane Sigil',
			levelGained: 1,
			description:
				'You can spend 1 AP and 1 MP to create a 1 Space diameter Arcane Sigil on the ground beneath you that lasts for 1 minute.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'arcane_sigil',
					value:
						'Create Arcane Sigil (1 AP + 1 MP): 1 Space area, choose School/Tag, creatures within have ADV on Spell Checks for that type. Can teleport sigil 1 AP within 10 spaces.'
				}
			]
		},
		{
			id: 'wizard_ritual_caster',
			featureName: 'Ritual Caster',
			levelGained: 1,
			description:
				'You learn Arcane Spells with the Ritual Spell Tag and can cast them as rituals.',
			isFlavor: true,
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'ritual_caster',
					value:
						'Learn 1 Ritual Spell per Wizard level. Can study and learn Ritual Spells from external sources (hours = MP cost).'
				}
			]
		},
		{
			id: 'wizard_prepared_spell',
			featureName: 'Prepared Spell',
			levelGained: 2,
			description:
				'When you complete a Long Rest, choose 1 Spell you know to become your Prepared Spell.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'prepared_spell',
					value:
						'Choose 1 Prepared Spell per Long Rest: Mana Limit Break (+1 to Spend Limit once per Long Rest, regain on Initiative) and Rehearsed Casting (opponents have DisADV in Spell Duels).'
				}
			]
		}
	],
	subclasses: [
		{
			subclassName: 'Portal Mage',
			description: 'Masters of dimensional magic and teleportation.',
			features: [
				{
					id: 'portal_magic',
					featureName: 'Portal Magic',
					levelGained: 3,
					description:
						'When you use your Arcane Sigil, you can spend 1 additional MP to create a linked Arcane Portal within 10 Spaces. Creatures can spend 1 Space of Movement to teleport between the Sigil and Portal. You can cast spells or make attacks from either location.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'portal_magic',
							value: 'Enhances Arcane Sigil to create a linked teleportation portal.'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'teleportation_expert',
							value:
								'When you learn a new Spell, you can choose any Spell with the Teleportation Spell Tag.'
						}
					]
				},
				{
					id: 'portal_sage',
					featureName: 'Portal Sage',
					levelGained: 3,
					description:
						'You have ADV on Checks to learn about the Astromancy Spell School. You can spend 1 minute observing a portal to make a DC 10 Spell Check to understand its destination and duration.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'portal_sage',
							value: 'ADV on checks related to Astromancy. Can analyze portals.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Witch',
			description: 'You specialize in curses and debilitating hexes.',
			features: [
				{
					id: 'covens_gift',
					featureName: "Coven's Gift",
					levelGained: 3,
					description:
						'You learn a Spell with the Curse Spell Tag. When you learn a new Spell, you can choose any Spell with the Curse Spell Tag. Spells with this tag count as being part of your chosen Spell School.',
					effects: [
						{
							type: 'GRANT_SPELL',
							target: 'curse_tag',
							value: 1
						},
						{
							type: 'GRANT_ABILITY',
							target: 'curse_school_specialization',
							value: 'Curse spells count as part of your chosen Spell School.'
						}
					]
				},
				{
					id: 'hex_enhancements',
					featureName: 'Hex Enhancements',
					levelGained: 3,
					description:
						'You can add a Hex Enhancement to any Spell you cast, forcing a target to make a Repeated Charisma Save or suffer an effect for 1 minute.',
					choices: [
						{
							id: 'witch_hex_enhancements_0',
							prompt: 'When casting a spell, you may add one of the following Hexes',
							count: 1,
							options: [
								{
									name: 'Bewitching Hex',
									description: '(1 MP) The target becomes Charmed by you for the duration.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'hex_bewitching',
											value: '1 MP: Target becomes Charmed.'
										}
									]
								},
								{
									name: 'Reaping/Life Hex',
									description:
										'(1 MP) The target takes 1 True damage and you regain 1 HP at the end of each of its turns for the duration.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'hex_reaping_life',
											value: '1 MP: Target takes 1 True damage and you regain 1 HP each turn.'
										}
									]
								},
								{
									name: 'Vermin Hex',
									description:
										"(1 MP) The target can't speak and its Size decreases by 1 at the end of each of its turns until it's tiny.",
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'hex_vermin',
											value: '1 MP: Target is silenced and shrinks over time.'
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'curse_expert',
					featureName: 'Curse Expert',
					levelGained: 3,
					description:
						'You can spend 1 minute to detect the presence of Curses within 20 Spaces. If you spend 10 minutes in contact with a Cursed creature or object, you learn the nature of the Curse.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'curse_expert',
							value: 'Can detect and analyze curses.'
						}
					]
				}
			]
		}
	]
};
