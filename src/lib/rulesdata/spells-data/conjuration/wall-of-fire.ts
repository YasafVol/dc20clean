import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const wallOfFire: Spell = {
	id: 'wall-of-fire',
	name: 'Wall of Fire',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Burning', 'Fire'],
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure persistent flames that fills a 4 Space long, 2 Space tall Wall. When you cast the Spell, make an Area Spell Attack against the AD of each target within the area. Hit: The target takes 1 fire damage. Hazardous Area: When a creature enters the area for the first time on its turn or starts its turn there, it makes a Might Save against your Save DC. Save Failure: The target takes 1 Fire damage.'
		}
	],
	cantripPassive:
		"Ignite: Flammable objects that are not being worn or held in the target's Space catch fire. A creature can spend 1 AP to put out a mundane fire within 1 Space of them.",
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
			cost: 2,
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The length of the Wall increases by 6 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Ringwall',
			description:
				'The area becomes a 3 Space diameter Ringwall. The diameter of the Ringwall increases by 1 each time you use the Area Enhancement.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Burning',
			description:
				'When a creature fails the Save against the Hazardous Area it begins Burning. A creature can make a Repeated Physical Save at the end of each of its turns, ending the Burning on a Success.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Smoke',
			description:
				"The area becomes Fully Concealed by thick black smoke. Creatures in the area that can't hold their breath begin Suffocating. The smoke lasts for 1 minute or until a wind of moderate or greater speed disperses it."
		}
	]
};
