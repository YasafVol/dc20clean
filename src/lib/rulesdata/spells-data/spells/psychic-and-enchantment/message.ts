import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';

export const message: Spell = {
	name: 'Message',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Divination,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: '1 Round (each way)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Whisper Message',
			description:
				'You point your finger toward a creature you can see within range and verbally whisper a message. The target hears the message in their head and they can reply back with a whisper that you can hear in your head. If you’re familiar with a creature, but you can’t see them or you know they’re beyond a wall or barrier, you can still target them with this Spell but the range is reduced by half.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Range', description: 'You increase the range to 30 Spaces.' }
	]
};
