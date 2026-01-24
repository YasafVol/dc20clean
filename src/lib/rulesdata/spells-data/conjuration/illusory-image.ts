import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const illusoryImage: Spell = {
	id: 'illusory-image',
	name: 'Illusory Image',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Illusion', 'Scent', 'Sound'],

	cost: { ap: 1 },
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You create an up to Medium size visual illusion of an object, creature, or effect within range. The illusion is purely visual, it can't create sound, light, smell, or physical interaction. It appears real to the eye but doesn't cast shadows or leave tracks. Make a DC 15 Spell Check. Failure: Creatures gain ADV on Checks made to Discern the Illusion. Success: Creatures make Checks to Discern the Illusion as normal. Success (5): Creatures gain DisADV on Checks made to Discern the Illusion. Discern the Illusion: If the illusion is an image, any physical interaction with the image reveals it to be an illusion. Alternatively, a creature can spend 1 AP to examine the image (or any effects from the Senses Enhancement) to attempt to determine if the illusion is real. The creature makes an Investigation Check against your Save DC. Success: The creature discerns the illusion for what it is, revealing the illusion to be false. If the illusion is an image, the illusion becomes partially transparent to the creature and no longer blocks their vision."
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
			name: 'Duration',
			description:
				'The duration increased by 1 step (1 min -> 10 min -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Size',
			description: 'The Size of the illusion increases by 1 (e.g Medium -> Large -> Huge).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Senses',
			description: 'The illusion can include one additional sense: sound, smell, or temperature.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Programmed Image',
			description:
				'You can set a simple repeating behavior (such as pacing, nodding, waving) that loops for the duration.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Triggered Image',
			description:
				"You set a simple trigger when casting the spell (such as 'when someone enters this area' or 'when the door opens'). When the trigger occurs, the illusion appears instantly and lasts for the Spell duration. Until triggered, the Spell lies dormant."
		}
	]
};
