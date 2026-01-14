import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const massHeal: Spell = {
	id: 'mass-heal',
	name: 'Mass Heal',
	sources: [SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Invocation,
	tags: ['Healing'],

	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You heal creatures within a 2 Space diameter Sphere within range. Make a DC 15 Spell Check. Failure: Each creature of your choice in the area regains 1 HP. Success: Each creature of your choice regains 2 HP. Success (Each 5): Each creature regain +1 HP.'
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
			name: 'Area',
			description: 'The diameter of the Sphere increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Increased Healing',
			description: 'Each target regains +1 HP.',
			repeatable: true
		}
	]
};
