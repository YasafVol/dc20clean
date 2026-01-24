import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const banish: Spell = {
	id: 'banish',
	name: 'Banish',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Astromancy,
	tags: ['Incapacitated', 'Planes', 'Psychic', 'Teleportation'],

	cost: { ap: 1, mp: 2 },
	range: '10 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You attempt to sever a target's link to this plane. Make a Spell Check against the Repeated Charisma Save of a target within range. Check Success: The target is banished to a harmless demiplane for the duration. If the target is native to another plane, it is sent back to its home plane instead. While banished, the target is Incapacitated and cannot affect or be affected by anything on the plane it is banished from. When the Spell ends, the creature reappears in the Space it left, or the nearest unoccupied Space. If it was banished to its home plane for 1 minute, the effect becomes permanent (GMs discretion)."
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
			name: 'Severing Seal',
			description:
				"If the effect of the Spell becomes permanent, you can create a temporary seal preventing the creature from returning. The creature can't return to the plane it was banished from for 24 hours."
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Planar Tear',
			description:
				'You cause a tear in the fabric of the planes to appear in a 3 Space diameter Sphere centered on the Spaces the creature occupied. When a creature enters the area for the first time on its turn, or starts its turn there, it makes a Charisma Save against your Save DC. Save Failure: The target takes X Psychic damage. The tear disappears when the Spell ends.',
			variable: true
		}
	]
};
