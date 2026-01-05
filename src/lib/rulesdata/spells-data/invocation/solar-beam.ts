import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const solarBeam: Spell = {
	id: 'solar-beam',
	name: 'Solar Beam',
	sources: [SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Invocation,
	tags: ['Blinded', 'Burning', 'Radiant'],
	isCantrip: true,
	cost: { ap: 2 },
	range: 'Self',
	duration: '1 Minute (Sustained)',
	effects: [
		{
			title: 'Effect',
			description:
				'You store a radiant power within yourself for the duration. You gain 1 Charge plus another Charge each time you Sustain this Spell (up to a maximum of 4). Sunlight: Once on each of your turns while in an area of Sunlight, you can spend 1 AP to gain a Charge.'
		}
	],
	cantripPassive:
		'Light Beacon: For the duration of the Spell, the Light Level of any Space you occupy increases by 1.',
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
			description: 'The length of the Line increases by 6 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Burning Radiance',
			description:
				'Each target makes a Repeated Physical Save. Save Failure: The target begins Burning for 1 minute. Burning damage from this Enhancement deals Radiant damage.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 4,
			name: 'Blinding',
			description:
				'Each target makes a Physical Save. Save Failure: The target is Blinded for 1 Round.'
		}
	]
};
