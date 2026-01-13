import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const oilSlick: Spell = {
	id: 'oil-slick',
	name: 'Oil Slick',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Burning'],
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'An oily substance covers the ground in 2 Space diameter Sphere area within range. When you cast the Spell, make a Spell Check against the Agility Save of each target in the area. Check Success: The target falls Prone. Covered: The affected Spaces are Difficult Terrain for the duration. When a creature enters the area for the first time on its turn or starts its turn there, it makes an Agility Save against your Save DC. Save Failure: The target falls Prone.'
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
			description: 'The diameter of the Sphere increases by 1 space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Spreading Oil',
			description:
				'Whenever a creature falls Prone in a Covered Space, it becomes afflicted by Spreading Oil for the duration. When the creature enters a Space, that Space becomes Covered. A creature afflicted by Spreading Oil makes a Repeated Agility Save at the end of each of its turns, ending the effect on a Success.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Flammable',
			description:
				'Any oil produced by this Spell becomes flammable. If fire touches the Space it ignites. When a creature enters the area for the first time on its turn, or starts its turn in an ignited Space, it makes a Repeated Physical Save against your Save DC. Save Failure: The target begins Burning X for 1 minute.',
			variable: true
		}
	]
};
