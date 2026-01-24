import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const radiantBolt: Spell = {
	id: 'radiant-bolt',
	name: 'Radiant Bolt',
	sources: [SpellSource.Divine],
	school: SpellSchool.Invocation,
	tags: ['Blinded', 'Exposed', 'Light', 'Radiant'],

	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a bolt of light that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Radiant damage.'
		}
	],
	spellPassive:
		"Illuminate: The Light level in the target's Space increases by 1 until the end of the turn.",
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
			type: 'AP',
			cost: 1,
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Expose',
			description:
				'The target makes a Physical Save. Save Failure: The target is Exposed and emits a 1 Space Aura of Bright Light for 1 Round.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Blinding',
			description:
				'The target makes a Physical Save. Save Failure: The target is Blinded for 1 Round.'
		}
	]
};
