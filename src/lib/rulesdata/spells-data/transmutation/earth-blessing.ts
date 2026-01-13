import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const earthBlessing: Spell = {
	id: 'earth-blessing',
	name: 'Earth Blessing',
	sources: [SpellSource.Primal],
	school: SpellSchool.Transmutation,
	tags: [],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You imbue a creature within range with earthen magic for the duration. Make a DC 15 Spell Check. Failure: The target ignores Difficult Terrain on the ground and it gains Tremorsense 2 Spaces. Success: The target gains Tremorsense 3 Spaces instead. Success (Each 5): The range of the Tremorsense increases by 1 Space.'
		}
	],
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
			type: 'MP',
			cost: 1,
			name: 'Increased Tremorsense',
			description: 'The range of Tremorsense increases by 2 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Walk of Earth',
			description:
				'The target can transform Spaces into Difficult Terrain when it enter them. Creatures can spend 1 AP to remove this Difficult Terrain from a Space.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Burrow Speed',
			description: 'The target gains a Burrow Speed equal to half its Speed.'
		}
	]
};
