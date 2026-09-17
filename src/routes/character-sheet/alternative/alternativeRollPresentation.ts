import type { DiceModifier } from '../../../lib/services/conditionEffectsAnalyzer';
import type { RollMode } from '../components/DiceRoller';

export function getRollModeWithFeatureAdvantage(
	diceModifier: DiceModifier,
	featureAdvantageStacks: number
): RollMode {
	const conditionStacks =
		diceModifier.mode === 'advantage'
			? diceModifier.stacks
			: diceModifier.mode === 'disadvantage'
				? -diceModifier.stacks
				: 0;
	const netStacks = conditionStacks + featureAdvantageStacks;

	if (netStacks > 0) return 'advantage';
	if (netStacks < 0) return 'disadvantage';
	return 'normal';
}
