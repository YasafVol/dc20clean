import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const windBlessing: Spell = {
	id: 'wind-blessing',
	name: 'Wind Blessing',
	sources: [SpellSource.Primal],
	school: SpellSchool.Transmutation,
	tags: ['Air', 'Embolden', 'Motion'],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You imbue a target within range with wind for the duration. Make a DC 15 Spell Check. Failure: The target's Speed and Jump distance is increased by 2. Success: The target's Speed and Jump distance is increased by 3. Success (Each 10): +1 Speed and Jump Distance. Repelling Winds: You can spend 2 AP to end the Spell, when you do make a Spell Check against the Might Save of each target within 1 Space of the imbued target. Check Success: The target is pushed horizontally 1 Space away from you. Success (each 5): up to +1 Space. When you use Repelling Winds you can spend MP to increase the distance pushed by 1 per MP spent."
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
			name: 'One with Wind',
			description: "The target's Speed and Jump Distance increases by an additional 1.",
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Wind Barrier',
			description:
				'Ranged Attacks that deal Physical or Elemental damage made against the target have DisADV. # CHAPTER 3: General Rules ## Environment ## Spaces & Distance'
		}
	]
};
