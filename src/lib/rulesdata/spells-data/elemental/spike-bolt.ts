import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const spikeBolt: Spell = {
	id: 'spike-bolt',
	name: 'Spike Bolt',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Piercing'],

	cost: { ap: 1 },
	range: '10 Space',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a sharp spike of earth or plant matter that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Piercing damage.'
		}
	],
	spellPassive:
		'Natural Destruction: This Spell leaves debris imbedded in the Space it lands in.',
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Damage',
			description: 'The damage increases by 1 for 1 target of your choice.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Impair',
			description:
				'1 target of your choice makes an Agility Save. Save Failure: The target is Impaired for 1 Round.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Piercing',
			description:
				"The Spell pierces the target, continuing up to 3 Spaces in a Line beyond the target. Each creature within the Spell's path beyond the original target also become targets of the Attack. These targets do not benefit from cover provided by other targets of this Spell."
		}
	]
};
