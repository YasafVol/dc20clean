import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const acidRain: Spell = {
	id: 'acid-rain',
	name: 'Acid Rain',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Corrosion', 'Enfeeble', 'Water'],

	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You create a 6 Space tall, 2 Space diameter Cylinder of acid rain that fills an area within range for the duration. When you cast the Spell, make an Area Spell Attack against the AD of each target within the area. Hit: The target takes 1 Corrosion damage. Hazardous Area: When a creature enters the area for the first time on its turn or starts its turn there, it makes an Agility Save against your Save DC. Save Failure: The target takes 1 Corrosion damage. Moving the Cylinder: When you Sustain this Spell or by spending 1 AP, you can move the Cylinder up to 5 Spaces to another Space within range.'
		}
	],
	spellPassive:
		'Acidic: Mundane materials (wood, leather, rope, non-magical metals) not being worn or held erode or decay, weakening structures and gear over time.',
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
			description: 'The diameter of the Cylinder increases by 1 Space and the height by 3 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Dissolving',
			description:
				'When a creature fails a Save against Hazardous Area, it loses PDR and EDR for 1 round.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Corrode Armament',
			description:
				'When a creature fails a Save against Hazardous Area, any equipment it is holding is damaged by the acid. Damaged equipment deal -1 damage with Martial Attacks. A creature can spend 1 hour (which can coincide with a Rest) to repair any equipment damaged this way.'
		}
	]
};
