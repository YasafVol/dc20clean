import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const light: Spell = {
	id: 'light',
	name: 'Light',
	sources: [SpellSource.Arcane, SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Invocation,
	tags: ['Blinded'],
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You cause Bright Light to shine in a 2 Space diameter Sphere within range and Dim Light a further 1 Spaces. Relocate: When you Sustain this Spell or by spending 1 AP, you can move the Sphere up to 5 Spaces to another Space within range. Attach: When you cast the Spell, you can attach it to an object or creature within range. If you do, the target sheds Bright Light in a 1 Space Aura (and Dim Light 1 Space beyond that) and you can no longer use Relocate. If the target isn't willing, make a Spell Check against the target's Agility Save. Check Success: The target becomes the source of the light. Blind: You can spend 1 AP and 3 MP to end the spell and make a Spell Check against the Physical Save of each target in the area. Check Success: The target is Blinded for 1 Round."
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
			name: 'Area',
			description: 'The diameter of the Sphere increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration increases by 1 step (10 min -> 1 hour -> 8 hour -> Long Rest). You no longer need to Sustain the Spell and can end the spell for free at any time.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Intensify',
			description: 'Light created by this Spell is considered Sunlight.'
		}
	]
};
