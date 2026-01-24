import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const unholyAura: Spell = {
	id: 'unholy-aura',
	name: 'Unholy Aura',
	sources: [SpellSource.Divine],
	school: SpellSchool.Conjuration,
	tags: ['Death', 'Doomed', 'Shadow', 'Tethered'],

	cost: { ap: 2, mp: 2 },
	range: 'Self',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'Umbral energy surrounds you in a 1 Space Aura for the duration. When you cast the Spell, make a Spell Check against the Repeated Charisma Save of each target within the area. Check Success: The target is Doomed for the duration. Doomed Area: When a creature enters the area for the first time on its turn or starts its turn there, it makes a Repeated Charisma Save against your Save DC. Save Failure: The target is Doomed for the duration.'
		}
	],
	spellPassive:
		'Obscure: Mundane lights produced by tiny or smaller sources stop working while within the Aura.',
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The radius of the Aura increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Doomed',
			description:
				'Whenever a target gains Doomed from this Spell, it gains an additional stack for each time you use this Enhancement.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Deathly Conversion',
			description:
				'When a Doomed creature dies within the Aura, you gain 2 Temp HP. The Temp HP increases by 2 each time you use this Enhancement.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Grasping Wisps',
			description: 'Creatures Doomed by this Spell are also Tethered to the Unholy Aura.'
		}
	]
};
