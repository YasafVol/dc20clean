/**
 * Breakdown Generation Module
 *
 * Pure functions for creating stat breakdowns with effect attribution.
 * Extracted from enhancedCharacterCalculator.ts.
 */

import type { AttributedEffect, EnhancedStatBreakdown } from '../../types/effectSystem';

/**
 * Create detailed stat breakdown showing base value, effects, and total
 */
export function createStatBreakdown(
	statName: string,
	baseValue: number,
	effects: AttributedEffect[],
	activeConditions?: Set<string>
): EnhancedStatBreakdown {
	const relevantEffects = effects.filter((effect) => {
		if (!effect.resolved) return false;

		// Map effect types to stat names
		if ((effect as any).type === 'MODIFY_ATTRIBUTE') {
			return (
				statName === `attribute_${(effect as any).target}` || statName === (effect as any).target
			);
		}
		if ((effect as any).type === 'MODIFY_STAT') {
			return statName === (effect as any).target;
		}

		return false;
	});

	const breakdown: EnhancedStatBreakdown = {
		statName,
		base: baseValue,
		effects: relevantEffects.map((effect) => {
			const e = effect as any;
			const isActive = !e.condition || activeConditions?.has(e.condition);
			return {
				source: effect.source,
				value: e.value as number,
				condition: e.condition as string | undefined,
				description: `${effect.source.name}: ${e.value > 0 ? '+' : ''}${e.value}${e.condition ? ` (${e.condition})` : ''}`,
				isActive: !!isActive
			};
		}),
		total:
			baseValue +
			relevantEffects.reduce((sum, effect) => {
				const e = effect as any;
				if (!e.condition || activeConditions?.has(e.condition)) {
					return sum + (e.value as number);
				}
				return sum;
			}, 0)
	};

	// Calculate conditional total
	breakdown.conditionalTotal =
		baseValue +
		relevantEffects.reduce((sum, effect) => {
			return sum + ((effect as any).value as number);
		}, 0);

	return breakdown;
}

/**
 * Create the initiative breakdown showing Combat Mastery + Agility components
 */
export function createInitiativeBreakdown(
	combatMastery: number,
	finalAgility: number,
	finalInitiativeBonus: number
): EnhancedStatBreakdown {
	return {
		statName: 'Initiative',
		base: 0,
		effects: [
			{
				source: { name: 'Combat Mastery', id: 'combatMastery', type: 'base' },
				value: combatMastery,
				description: `Combat Mastery: ${combatMastery}`,
				isActive: true
			},
			{
				source: { name: 'Agility Modifier', id: 'agility', type: 'base' },
				value: finalAgility,
				description: `Agility Modifier: ${finalAgility}`,
				isActive: true
			}
		],
		total: finalInitiativeBonus
	};
}

/**
 * Create the martial check breakdown showing Acrobatics vs Athletics options
 */
export function createMartialCheckBreakdown(
	finalAgility: number,
	finalMight: number,
	acrobaticsProficiency: number,
	athleticsProficiency: number,
	finalMartialCheck: number
): EnhancedStatBreakdown {
	const acrobaticsTotal = finalAgility + acrobaticsProficiency * 2;
	const athleticsTotal = finalMight + athleticsProficiency * 2;

	return {
		statName: 'Martial Check',
		base: Math.max(finalAgility, finalMight),
		effects: [
			{
				source: { name: 'Acrobatics Option', id: 'acrobatics', type: 'base' },
				value: acrobaticsTotal,
				description: `Agility (${finalAgility}) + Proficiency ×2 (${acrobaticsProficiency * 2}) = ${acrobaticsTotal}`,
				isActive: true
			},
			{
				source: { name: 'Athletics Option', id: 'athletics', type: 'base' },
				value: athleticsTotal,
				description: `Might (${finalMight}) + Proficiency ×2 (${athleticsProficiency * 2}) = ${athleticsTotal}`,
				isActive: true
			}
		],
		total: finalMartialCheck
	};
}
