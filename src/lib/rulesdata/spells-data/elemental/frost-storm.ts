import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const frostStorm: Spell = {
	id: 'frost-storm',
	name: 'Frost Storm',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Cold', 'Slowed'],

	cost: { ap: 2 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'The temperature rapidly decreases in a 6 Space tall, 2 Space diameter Cylinder within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Cold damage.'
		}
	],
	spellPassive:
		'Freezing: Liquids and objects not being held or carried in the area frost over, causing them to adhere to nearby surfaces. A creature can use a Minor Action to make a Might Check against your Save DC to dislodge an object.',
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
			name: 'Slow',
			description:
				'Each target makes a Repeated Might Save. Save Failure: The target is Slowed for 1 Round.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Freeze',
			description:
				'The area is covered ice, becoming Difficult Terrain. A Space stops being after 1 minute or when it takes fire damage. When a creature starts their turn on a Space covered by ice or enters it for the first time on their turn, it makes an Agility Save against your Save DC. Save Failure: The target falls Prone.'
		}
	]
};
