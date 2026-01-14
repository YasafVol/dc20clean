import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const command: Spell = {
	id: 'command',
	name: 'Command',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Enchantment,
	tags: [],

	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You speak a command to a creature within range that can hear you. Make a Spell Check against the target's Charisma Save. Check Success: The target immediately follows the command given by spending 1 AP (if it can). If the creature can't spend the AP to follow the command, it becomes Stunned until the start of its turn. The number of stacks of Stunned it gains is equal to the amount of AP it couldn't spend to follow the command. The creature can't willingly fail their Check or spend any resources (AP, SP, or MP) to modify the Action it takes. Ignoring a Command: The Spell has no effect if the target doesn't understand your language, if it's unable to follow your command (such as commanding an immobilized creature to move), or if your command is directly harmful to itself. Choosing a Command: You can choose from the list of example commands below or improvise your own at the GM's discretion."
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
			name: 'Word of Authority',
			description:
				"The Spell no longer fails if the target doesn't understand your Language, it follows the command as if it can understand it."
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Extended Command',
			description:
				'You can command the creature to perform up to 2 actions. The target spends 2 AP to follow all of the given commands.'
		}
	]
};
