import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const windTunnel: Spell = {
	id: 'wind-tunnel',
	name: 'Wind Tunnel',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: [],
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You create a 4 Space Line of forceful wind within range for the duration, designating one end as the Point of Origin.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Length',
			description: 'The length of the Line increases by 6 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Width',
			description:
				'The width of the Line increases by 1 Space. The cost of this Enhancement increases by 1 MP for each time the Length Enhancement has been used.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Distance',
			description:
				'A creature that fails its Save against the Gale-force effect is pushed up to 1 additional Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Buffeting Winds',
			description:
				'Creatures in the area gain another stack of Slowed when moving toward the Point of Origin, and move 1 additional Space for every 1 Space of movement spent when moving away from the Point of Origin.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Projectiles Tunnel',
			description:
				'Ranged Martial Attacks have ADV if made inside the area and away from the Point of Origin. Conversely, the same Attacks have DisADV if they are made inside the area and toward the Point of Origin. ## Enchantment'
		}
	]
};
