import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const luminousBurst: Spell = {
	id: 'luminous-burst',
	name: 'Luminous Burst',
	sources: [SpellSource.Divine],
	school: SpellSchool.Invocation,
	tags: ['Radiant'],

	cost: { ap: 2, mp: 1 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a flash of brilliant light in a 1 Space Aura. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Radiant damage.'
		}
	],
	spellPassive:
		'Illuminate: The Light level of the area increases by 1 until the end of the turn.',
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
			name: 'Expand',
			description: 'The radius of the Aura increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Expose',
			description:
				'Each target makes a Physical Save. Save Failure: The target is Exposed for 1 Round.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Divine Chains',
			description:
				'Each target makes a Repeated Intelligence Save. Save Failure: The target is Tethered to the area for 1 minute.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Punishing Chains',
			description:
				'Requires Divine Chains. Creatures Tethered by Divine Chains take X Radiant damage at the start of each of their turns.',
			variable: true
		}
	]
};
