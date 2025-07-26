import { Spell, SpellSchool, SpellList, PremadeSpellList } from '../../types/spell.types';

export const gust: Spell = {
	name: 'Gust',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Push Creature',
			description:
				'Choose a Medium or smaller creature and make a Spell Check contested by their Might Save. Success: Target is pushed 1 Space in a direction of your choice. Success (each 5): +1 Space.'
		},
		{
			title: 'Push Object',
			description:
				'Choose an object that’s neither held nor carried and that weighs no more than 5 pounds. Make a DC 10 Spell Check. Success: The object is pushed up to 3 Spaces away from you. Success (each 5): +1 Space. Failure: Only 2 Spaces.'
		},
		{
			title: 'Sensory Effect',
			description:
				'You create a harmless sensory effect using air, such as causing leaves to rustle, wind to slam shutters closed, or your clothing to ripple as in a breeze.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Wind Tunnel',
			description:
				'You create a 10 Space long and 2 Space wide Line that lasts 1 minute and requires the Sustain Action. The start of the Wind Tunnel must be within 5 Spaces of you. You choose the direction the Line goes in and what direction the wind is blowing. Creatures in the Wind Tunnel are Slowed 1 moving against the wind, but can move 2 Spaces for every 1 Space spent moving the same direction as the wind. Any creature that starts their turn in the Wind Tunnel must make a Might Save or be pushed 4 Spaces in the direction of the wind. You can spend 1 AP to reverse the direction of the wind in the tunnel.'
		}
	]
};
