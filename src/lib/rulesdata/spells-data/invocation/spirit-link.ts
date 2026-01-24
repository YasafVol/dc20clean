import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const spiritLink: Spell = {
	id: 'spirit-link',
	name: 'Spirit Link',
	sources: [SpellSource.Divine],
	school: SpellSchool.Invocation,
	tags: ['Blood', 'Curse', 'Spirit', 'Ward'],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"Make a Spell Check against the Repeated Charisma Save of 2 creatures within range that don't share their HP. Check Success: If both targets fail the Save, they're Linked for the Duration. DC Tip: A creature can choose to fail a Save if it wants. Linked: While within 10 Spaces of each other, whenever one Linked creature regains or loses HP, the amount is shared with the other Linked creature. Example: You target yourself and an enemy, they fail the Save and you choose to fail the Save making you Linked to each other. When the enemy drinks a healing potion to heal 2 HP, you instead heal for 1 HP each, splitting the healing between you."
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
			name: 'Extended Link',
			description: 'The maximum range of the Link increases by 5 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: "Lion's Heart",
			description:
				'While within range of the link, each target gains Resistance to Charmed, Taunted, Intimidated, Frightened, and Terrified.'
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Transference',
			description:
				'Instead of sharing HP regained or lost while Linked, choose 1 target to receive all the changes in HP.'
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Profane',
			description:
				'Instead of sharing loses of HP while Linked, both creatures lose the full amount of HP.'
		}
	]
};
