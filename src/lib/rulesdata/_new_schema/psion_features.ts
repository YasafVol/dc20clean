import type { ClassDefinition } from '../schemas/character.schema';

/**
 * Psion Class Definition – Draft implementation derived from Spellblade template.
 * Focuses on psychic spellcasting and telekinetic abilities.
 */
export const psionClass: ClassDefinition = {
	className: 'Psion',
	startingEquipment: {
		weaponsOrShields: ['1 Weapon'],
		armor: '1 set of Novice Light Armor',
		packs: 'X or Y Packs (Adventuring Packs Coming Soon)'
	},
	hybridPath: {
		martialAspect: {
			combatTraining: {
				weapons: ['Weapons'],
				armor: ['Light Armor']
			},
			maneuvers: {
				learnsAllAttack: false,
				additionalKnown: 'Maneuvers Known column of the Psion Class Table'
			},
			techniques: {
				additionalKnown: 'Techniques Known column of the Psion Class Table'
			},
			staminaPoints: {
				maximumIncreasesBy: 'Stamina Points column of the Psion Class Table'
			},
			staminaRegen: {
				description: 'Once per round, you can regain up to half your maximum SP when you succeed on a spell attack.',
			}
		},
		spellcastingAspect: {
			spellcastingProgression: 'full',
			spellcastingAttribute: 'intelligence',
			spellList: {
				description: 'Psychic or Gravity Spell Tags plus Divination, Enchantment, Illusion, Protection schools',
				type: 'specific'
			},
			cantrips: {
				description: 'Cantrips Known column of the Psion Class Table'
			},
			spells: {
				description: 'Spells Known column of the Psion Class Table'
			},
			manaPoints: {
				maximumIncreasesBy: 'Mana Points column of the Psion Class Table'
			}
		}
	},
	coreFeatures: [
		{
			id: 'psion_spellcasting',
			featureName: 'Psion Spellcasting',
			levelGained: 1,
			description: 'You can cast spells from the Psychic or Gravity tags and the schools of Divination, Enchantment, Illusion, or Protection. Your combat masteries include Weapons, Light Armor, and Spellcasting. Your Cantrips Known, Spells Known, Mana Points, and Stamina Points advance as per the Psion class table.'
		},
		{
			id: 'psion_stamina',
			featureName: 'Psion Stamina',
			levelGained: 1,
			description: 'Once per round, if you take a turn in combat without expending SP you regain 1 SP.'
		},
		{
			id: 'psionic_mind',
			featureName: 'Psionic Mind',
			levelGained: 1,
			description: 'You learn the Psi Bolt cantrip, your MD increases by 2, you can spend SP on AP enhancements, and you gain the Daze and Disruption spell enhancements as well as the Psionic enhancement (1 MP) removing verbal and somatic components.'
		},
		{
			id: 'telekinesis',
			featureName: 'Telekinesis',
			levelGained: 1,
			description: 'You can use the Object action to manipulate objects up to 100 lbs within 5 spaces via telekinesis.'
		},
		{
			id: 'telekinetic_grapple',
			featureName: 'Telekinetic Grapple',
			levelGained: 1,
			description: 'You gain Grapple maneuvers which you perform with telekinesis. You may target creatures within 5 spaces and use Spell Checks instead of Might for related checks. Additional rules modify Body Block, Grapple, Shove, and Throw.'
		},
		{
			id: 'telepathy',
			featureName: 'Telepathy',
			levelGained: 1,
			isFlavor: true,
			description: 'You can communicate telepathically with any creature you can see within 10 spaces that knows at least one language.'
		},
		// Level 2 Features
		{
			id: 'mind_sense',
			featureName: 'Mind Sense',
			levelGained: 2,
			description: 'Spend 1 AP and 1 MP to sense creatures within 10 spaces (Int ≥ -3) for 1 minute.'
		},
		{
			id: 'invade_mind',
			featureName: 'Invade Mind',
			levelGained: 2,
			description: 'While Mind Sense is active, spend 1 AP and 1 SP to Assault Mind, Read Emotions, or Read Thoughts of a sensed creature within 10 spaces.'
		},
		{
			id: 'psionic_resolve',
			featureName: 'Psionic Resolve',
			levelGained: 2,
			description: 'During combat, when you make an Attribute Save, you may spend 1 SP to instead roll a different Attribute Save of your choice.'
		},
		{
			id: 'talent',
			featureName: 'Talent',
			levelGained: 2,
			description: 'You gain one Talent of your choice for which you meet the prerequisites.'
		}
	],
	subclasses: []
};
