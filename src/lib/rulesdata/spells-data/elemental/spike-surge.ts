import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const spikeSurge: Spell = {
	id: 'spike-surge',
	name: 'Spike Surge',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Earth', 'Impaired', 'Piercing', 'Plants'],

	cost: { ap: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a wave of spikes or thorns that emerge from the ground in a 1 Space Arc. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Piercing damage.'
		}
	],
	spellPassive: 'Natural Destruction: This Spell leaves debris imbedded in objects in the area.',
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: "The Area's radius increases by 1 Space.",
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Aura',
			description: 'The Area becomes an Aura instead.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Impair',
			description:
				'Each target makes an Agility Save. Save Failure: The target is Impaired for 1 Round.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Spikey Terrain',
			description:
				'The area becomes Spikey Terrain for 1 Round. Creatures take X Piercing damage when they enter a Space within the area.',
			variable: true
		}
	]
};
