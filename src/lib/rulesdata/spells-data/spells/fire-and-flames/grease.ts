import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const grease: Spell = {
	name: 'Grease',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Conjuration,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Slick Ground',
			description:
				'Make a DC 10 Spell Check. Success: Slick grease covers the ground in 4 Spaces of your choosing within range. Failure: Only 3 Spaces. The Spaces must connect to each other and all be within range of the Spell. These Spaces are considered to be Difficult Terrain for the duration and are flammable. If fire touches one of these Spaces, the grease ignites and deals 1 Fire damage to any creature within the Space instantly and again to any creature who ends their turn in this Space before the Spell ends. If a creature is standing in one of the Spaces when the grease initially appears, when they end their turn, or when they enter it for the first time on a turn they must make an Agility Save. Failure: They fall Prone.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'More Grease', description: 'You add 4 more Spaces of grease.' },
		{
			type: 'MP',
			cost: 1,
			name: 'More Fire',
			description: 'Fire damage dealt by the Spell is increased by 1.'
		}
	]
};
