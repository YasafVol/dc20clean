import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const disguiseSelf: Spell = {
	id: 'disguise-self',
	name: 'Disguise Self',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Illusion'],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: '10 Minutes (Sustained)',
	effects: [
		{
			title: 'Effect',
			description:
				'You alter your appearance to that of a specific person that you have seen or a general member of that ancestry. Your new form needs to be of the same size as you and you do not gain the traits, Features, or statistics of that form. Make a DC 15 Spell Check. Failure: Creatures gain ADV on Checks made to identify you. Success: Creatures make Checks to identify you as normal. Success (5): Creatures gain DisADV on Checks made to identify you. Being Identified: A creature can make an Investigation Check against your Save DC to discern that your form is not natural and has been altered by magic.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration increases by 1 step (10 min -> 1 hour -> 8 hour -> Long Rest). You no longer need to Sustain the Spell and you can end it at any time for free.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Size',
			description:
				"You can choose the appearance of a creature 1 Size smaller or larger than you. Your Size doesn't change."
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Mimicry',
			description:
				"You can perfectly mimic the voice, accent, and mannerisms of a creature you've heard speak for at least 1 minute."
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Alter Form',
			description:
				'When you Sustain this Spell or by spending 1 AP, you can alter your appearance to a new form of your choice.'
		}
	]
};
