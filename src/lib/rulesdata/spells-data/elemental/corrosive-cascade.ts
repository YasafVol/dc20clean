import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const corrosiveCascade: Spell = {
	id: 'corrosive-cascade',
	name: 'Corrosive Cascade',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Corrosion', 'Enfeeble'],

	cost: { ap: 2 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a deluge of acid that envelops a 6 Space tall, 2 Space diameter Cylinder within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Corrosion damage.'
		}
	],
	spellPassive:
		'Acidic: Mundane materials in the area (wood, leather, rope, non-magical metals) that are not being worn or held partially erode or decay, weakening structures and gear.',
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
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The diameter of the Cylinder increases by 1 Space and the Height by 3 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Dissolve',
			description:
				'Each target makes a Repeated Agility Save. Save Failure: The target no longer benefits from PDR or EDR for 1 minute.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Pitted Terrain',
			description: 'Surfaces in the area become Difficult Terrain until the surfaces are repaired.'
		}
	]
};
