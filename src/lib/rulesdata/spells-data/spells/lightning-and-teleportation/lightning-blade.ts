import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const lightningBlade: Spell = {
	name: 'Lightning Blade',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: 'Self (1 Space radius)',
	duration: '1 round',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Imbue Weapon',
			description:
				'You imbue a Melee Weapon you’re wielding with crackling energy. The next Attack Check that hits with this weapon sheathes the target in booming energy. If the target leaves, or is moved from, the current Space they’re in, they automatically take 2 Lightning damage and the Spell ends. This effect can be stacked multiple times from the same or different sources.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: 'You increase the Lightning damage dealt by 2.'
		},
		{ type: 'MP', cost: 1, name: 'Duration', description: 'You increase the duration to 1 minute.' }
	]
};
