import type { Talent } from './talent.types';

export const championTalents: Talent[] = [
	{
		id: 'champion_champions_resolve',
		name: 'Champion’s Resolve',
		category: 'Class',
		description:
			'When you use a Tactical Die, your Assault deals +1 damage, and your Deflect deals 1 damage of a physical type of your choice to the attacker if the Attack Misses.',
		prerequisites: { classId: 'champion', feature: 'Adaptive Tactics', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'champions_resolve',
				value: 'Enhances Tactical Die: Assault deals +1 damage, Deflect deals 1 damage on miss.'
			}
		]
	},
	{
		id: 'champion_disciplined_combatant',
		name: 'Disciplined Combatant',
		category: 'Class',
		// DC20 v0.10 p.156: "Once on each of your turns, you can spend 2 SP to gain the benefit of Combat Readiness."
		description:
			'Once on each of your turns, you can spend 2 SP to gain the benefit of Combat Readiness. Additionally, you can use Second Wind without being Bloodied.',
		prerequisites: { classId: 'champion', feature: 'Fighting Spirit', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'disciplined_combatant',
				value: 'Spend 2 SP for Combat Readiness benefit. Can use Second Wind while not Bloodied.'
			}
		]
	}
];
