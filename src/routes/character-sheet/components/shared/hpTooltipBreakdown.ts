import type { EffectSource, EnhancedStatBreakdown } from '../../../../lib/types/effectSystem';

type HPTooltipEffect = EnhancedStatBreakdown['effects'][number] & { name?: string };

export type HPTooltipBreakdown = Omit<EnhancedStatBreakdown, 'effects'> & {
	baseLabel: string;
	effects: HPTooltipEffect[];
};

function formatSourceLabel(source: EffectSource): string {
	const prefix = (() => {
		switch (source.type) {
			case 'trait':
			case 'ancestry_default':
				return 'Ancestry';
			case 'equipment':
				return 'Equipment';
			case 'talent':
				return 'Talent';
			case 'class_feature':
				return 'Class';
			case 'subclass_feature_choice':
				return 'Subclass';
			case 'multiclass_feature':
				return 'Multiclass';
			case 'choice':
				return 'Choice';
			case 'base':
			default:
				return '';
		}
	})();

	return prefix ? `${prefix} · ${source.name}` : source.name;
}

/**
 * The calculator's HP base is class progression HP + final Might. Split those
 * terms for the tooltip while preserving every attributed HP effect and total.
 */
export function createHPTooltipBreakdown(
	breakdown: EnhancedStatBreakdown,
	finalMight: number,
	level: number,
	className: string
): HPTooltipBreakdown {
	return {
		...breakdown,
		baseLabel: `Level ${level} · ${className}`,
		base: breakdown.base - finalMight,
		effects: [
			{
				source: { type: 'base', id: 'might', name: 'Might' },
				name: 'Might',
				value: finalMight,
				description: `Might: ${finalMight > 0 ? '+' : ''}${finalMight}`,
				isActive: true
			},
			...breakdown.effects.map((effect) => ({
				...effect,
				name: formatSourceLabel(effect.source)
			}))
		]
	};
}

/**
 * Death Threshold is stored as a positive magnitude but displayed as the
 * negative HP boundary. Negate each term so the tooltip formula sums directly
 * to the displayed threshold.
 */
export function createDeathThresholdTooltipBreakdown(
	breakdown: EnhancedStatBreakdown,
	primeValue: number,
	primeAttributeLabel: string,
	combatMastery: number
): HPTooltipBreakdown {
	return {
		...breakdown,
		statName: 'deathThreshold',
		baseLabel: `Prime Attribute (${primeAttributeLabel})`,
		base: -primeValue,
		effects: [
			{
				source: { type: 'base', id: 'combat-mastery', name: 'Combat Mastery' },
				name: 'Combat Mastery',
				value: -combatMastery,
				description: `Combat Mastery: -${combatMastery}`,
				isActive: true
			},
			...breakdown.effects.map((effect) => ({
				...effect,
				name: formatSourceLabel(effect.source),
				value: -effect.value
			}))
		],
		total: -breakdown.total
	};
}
