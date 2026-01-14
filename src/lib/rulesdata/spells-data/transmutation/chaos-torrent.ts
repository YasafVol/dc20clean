import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const chaosTorrent: Spell = {
	id: 'chaos-torrent',
	name: 'Chaos Torrent',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Transmutation,
	tags: ['Chaos'],

	cost: { ap: 2, mp: 1 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"A spiraling surge of warped energy erupts from you in a 4 Space Line. Make a Spell Check against the Intelligence Save of each target in the area. Check Success: The target roll a d6 on the table below. D6 Effect 1.  The target can't take Reactions until the end of its next turn. 2.  The target is Slowed 2 for 1 Round. 3.  The target must immediately makes a Melee Martial Attack as a Reaction against a random creature within its Melee range. 4.  The target is teleported a d4 Spaces in a random direction. 5.  The target is Weakened for 1 Round. 6.  The target is Disoriented for 1 Round."
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Remote',
			description:
				'The range becomes 5 Spaces, with the origin of the Line becoming the chosen space.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Length',
			description: 'The length of the Line increases by 6 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Width',
			description: 'The width of the Line increases by 1 Space.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Chaos Surge',
			description:
				'Each target rolls twice and suffers both effects. If a target rolls the same number twice, it rolls again until it gets two different results.'
		}
	]
};
