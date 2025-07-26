import { Spell, SpellSchool, SpellList, PremadeSpellList } from '../../types/spell.types';

export const command: Spell = {
	name: 'Command',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: '1 Round',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Issue Command',
			description:
				'You speak a command to a creature that you can see within range that can hear you. You don’t have to see the creature if you’ve seen them within the last minute. Make a Spell Check contested by the target’s Charisma Save. Success: The creature immediately spends 2 AP to follow the command given, regardless of its usual AP cost. The creature can’t spend any resources (AP, SP, or MP) to modify the Action it takes. Ignoring a Command: The Spell has no effect if the target doesn’t understand your language, if it’s unable to follow your command, or if your command is directly harmful to itself. Choosing a Command: You can choose from the list of example commands below or improvise your own at the GM’s discretion. Move: The target moves up to its Speed to a location (or in a direction) of your choice. Prone: The target falls Prone. Drop: The target drops anything it’s holding. Attack: The target makes 1 Attack Check or Spell Check (your choice) that normally costs 1 AP. You choose the target of the Attack, which must be within the commanded creature’s range.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Duration', description: 'You increase the duration by 1 Round.' },
		{ type: 'MP', cost: 2, name: 'Targets', description: 'You can add 1 additional target.' }
	]
};
