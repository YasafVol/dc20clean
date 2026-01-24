import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const hex: Spell = {
	id: 'hex',
	name: 'Hex',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Enchantment,
	tags: ['Curse', 'Enfeeble'],

	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'Make a Spell Check against the Repeated Charisma Save of a target within range. Check Success: The target is Cursed for the duration. While Cursed this way, it gains Vulnerability (1) to a damage type of your choice. The Curse can be removed by any effect that ends a Basic Curse.'
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
			name: 'Expanded',
			description:
				'The target becomes Vulnerable to a category of damage (Physical, Elemental or Mystical) of your choice instead of 1 damage type.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Break Resistance',
			description:
				"The target doesn't benefit from Resistance to the damage types they're Vulnerable to due to the Curse for the duration."
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Improved Vulnerability',
			description: 'The Vulnerability increases by 1.',
			repeatable: true
		}
	]
};
