/**
 * Wizard Class Definition - New Effect Schema
 * Based on DC20 Wizard features with spell school specialization
 */

import type { ClassDefinition } from '../schemas/character.schema';

export const wizardClass: ClassDefinition = {
	className: 'Wizard',
	spellcasterPath: {
		spellcastingProgression: 'full',
		spellcastingAttribute: 'intelligence',
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
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description: 'You gain the ability to cast arcane spells.',
			effects: [{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true }]
		},
		{
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
							name: 'Fire & Flames',
							description: 'Specialize in fire magic and flame manipulation.',
							effects: [
								{ type: 'GRANT_CANTRIP', target: 'fire_flames_school', value: 1 },
								{ type: 'GRANT_SPELL', target: 'fire_flames_school', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_fire',
									value:
										'Reduce MP cost by 1 for Fire & Flames spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							name: 'Ice & Illusions',
							description: 'Specialize in ice magic and illusion spells.',
							effects: [
								{ type: 'GRANT_CANTRIP', target: 'ice_illusions_school', value: 1 },
								{ type: 'GRANT_SPELL', target: 'ice_illusions_school', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_ice',
									value:
										'Reduce MP cost by 1 for Ice & Illusions spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							name: 'Lightning & Teleportation',
							description: 'Specialize in lightning magic and teleportation spells.',
							effects: [
								{ type: 'GRANT_CANTRIP', target: 'lightning_teleportation_school', value: 1 },
								{ type: 'GRANT_SPELL', target: 'lightning_teleportation_school', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_lightning',
									value:
										'Reduce MP cost by 1 for Lightning & Teleportation spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							name: 'Psychic & Enchantment',
							description: 'Specialize in psychic magic and enchantment spells.',
							effects: [
								{ type: 'GRANT_CANTRIP', target: 'psychic_enchantment_school', value: 1 },
								{ type: 'GRANT_SPELL', target: 'psychic_enchantment_school', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_psychic',
									value:
										'Reduce MP cost by 1 for Psychic & Enchantment spells (once per Long Rest, regain on Initiative).'
								}
							]
						}
					]
				}
			]
		},
		{
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
					featureName: 'Portal Magic',
					levelGained: 3,
					description: 'You gain advanced teleportation abilities.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'portal_magic',
							value: 'Advanced teleportation and dimensional magic abilities.'
						}
					]
				}
			]
		}
	]
};
