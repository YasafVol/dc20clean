import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const burningFlames: Spell = {
	name: 'Burning Flames',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: 'Self (10 Spaces)',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Area of Effect',
			description:
				'A brilliant flame manifests around you. Choose a type of area: Line, Cone, or Sphere. You are the Spell’s Point of Origin. Line: The Spell affects every target in a 1 Space wide and 10 Space long line. Cone: The Spell creates a 3 Space long Cone. Sphere: The Spell affects every target in a 2 Space radius. Make a Spell Check against every target’s AD within the Spell’s area. Hit: The target takes 2 Fire damage.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Burning',
			description:
				'Each target makes a Physical Save. Failure: The target begins Burning until a creature (including itself) within 1 Space spends 1 AP to put it out.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Range',
			description:
				'The Point of Origin of the Spell becomes a point of your choice within 15 Spaces (instead of Self).'
		}
	]
};
