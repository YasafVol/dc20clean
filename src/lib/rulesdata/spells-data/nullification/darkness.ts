import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const darkness: Spell = {
	id: 'darkness',
	name: 'Darkness',
	sources: [SpellSource.Arcane, SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Nullification,
	tags: [],
	isCantrip: true,
	cost: { ap: 2 },
	range: '5 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You create a 2 Space Sphere of Darkness within range. Relocate: When you Sustain this Spell or by spending 1 AP, you can move the Sphere up to 5 Spaces within range. Attach: When you cast the Spell, you can attach it to an object or creature within range. If you do, the target sheds Darkness in a 1 Space Aura and you can no longer use Relocate. If the target is not willing, make a Spell Check against the target's Agility Save. Check Success: The target becomes the source of the Darkness."
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
			description: 'The duration increases by 1 step (10 min -> 1 hour -> Long Rest).',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Light Eater',
			description: 'Mundane light sources within the area are extinguished.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Grasping Gloom',
			description:
				'When a creature enters the area for the first time on its turn or starts its turn there, it makes an Agility Save against your Save DC. Save Failure: The target is Slowed for 1 round.'
		}
	]
};
