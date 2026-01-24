import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const message: Spell = {
	id: 'message',
	name: 'Message',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Enchantment,
	tags: ['Communication', 'Thoughts'],

	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You send a brief telepathic message to a creature within range. The creature hears the message in their mind and can immediately respond telepathically. The message and response can take the form of a thought, a mental image or a verbal message of up to 20 words long. This Spell doesn't require Verbal Components."
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
			type: 'AP',
			cost: 1,
			name: 'Group Message',
			description:
				'You can target every creature of your choice within range. Only you can telepathically perceive answers from the targets.'
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Sending',
			description:
				"You can target any creature you have met previously, provided they're on the same plane as you. The word count of your message and the target answer can be up to 40 words long."
		}
	]
};
