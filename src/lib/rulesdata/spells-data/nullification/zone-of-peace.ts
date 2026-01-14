import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const zoneOfPeace: Spell = {
	id: 'zone-of-peace',
	name: 'Zone of Peace',
	sources: [SpellSource.Divine],
	school: SpellSchool.Nullification,
	tags: [],

	cost: { ap: 2, mp: 1 },
	range: 'Self',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You create a 3 Space diameter Sphere centered on yourself where violence is prohibited within range for the duration. Attacks made by or against creatures in the area are Hindered.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Range',
			description:
				'When you create the Sphere, you can center it on a Space within 5 Spaces instead.'
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
			name: 'Tethered',
			description:
				'When you cast the spell, make a Spell Check against the Repeated Intelligence Save of creatures of your choice within the area. Check Success: The target is Tethered to the area for the duration.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Enforced Peace',
			description:
				"When a creature makes an Attack affected by this Spell, it makes an Intelligence Save against your Save DC. Save Failure: The target can't perform the Attack (it still spends the resources used on the Attack)."
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Restraining Order',
			description:
				"Requires Enforced Peace. If a creature fails the Save against Enforced Peace, it can't Attack for 1 round. ## Transmutation"
		}
	]
};
