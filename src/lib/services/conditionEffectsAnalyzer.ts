/**
 * Condition Effects Analyzer
 *
 * Analyzes active conditions and determines which visual indicators (badges)
 * and dice modifiers should be applied to various attributes and actions.
 */

import { resolveConditionDefinition } from '../rulesdata/conditions/conditions.data';
import type { ConditionBadgeType } from '../../routes/character-sheet/components/ConditionBadge';

type AnalyzerEffectType = ConditionBadgeType | 'penalty';

export interface ConditionEffect {
	type: AnalyzerEffectType;
	value?: number;
	tooltip: string;
}

export interface ConditionEffects {
	attacks: ConditionEffect[];
	agilitySaves: ConditionEffect[];
	physicalSaves: ConditionEffect[];
	mentalSaves: ConditionEffect[];
	physicalChecks: ConditionEffect[];
	mentalChecks: ConditionEffect[];
	movement: ConditionEffect[];
	allChecks: ConditionEffect[];
	allSaves: ConditionEffect[];
}

export interface DiceModifier {
	mode: 'advantage' | 'disadvantage' | 'normal';
	stacks: number; // For ADV X or DisADV X
	penalty: number; // Flat numeric penalties such as Exhaustion
}

function sumEffectsByType(effects: ConditionEffect[], effectType: AnalyzerEffectType): number {
	return effects
		.filter((effect) => effect.type === effectType)
		.reduce((sum, effect) => sum + (effect.value || 1), 0);
}

function getStackValue(conditionId: string, fallback = 1): number {
	return resolveConditionDefinition(conditionId).stackValue ?? fallback;
}

/**
 * Analyzes active conditions and returns their effects on various attributes
 */
export function analyzeConditionEffects(activeConditionIds: string[]): ConditionEffects {
	const effects: ConditionEffects = {
		attacks: [],
		agilitySaves: [],
		physicalSaves: [],
		mentalSaves: [],
		physicalChecks: [],
		mentalChecks: [],
		movement: [],
		allChecks: [],
		allSaves: []
	};

	for (const conditionId of activeConditionIds) {
		const { normalizedId, definition } = resolveConditionDefinition(conditionId, {
			includeEffectSpecific: true
		});
		if (!definition) continue;

		// ATTACKS
		if (normalizedId === 'restrained') {
			effects.attacks.push({
				type: 'disadvantage',
				tooltip: 'Restrained: Your attacks have DisADV'
			});
		} else if (normalizedId === 'hindered-x') {
			const xValue = getStackValue(conditionId);
			effects.attacks.push({
				type: 'disadvantage',
				value: xValue,
				tooltip: `Hindered ${xValue}: You have DisADV ${xValue} on Attacks`
			});
		}

		// PHYSICAL CHECKS
		if (normalizedId === 'impaired-x') {
			const xValue = getStackValue(conditionId);
			effects.physicalChecks.push({
				type: 'disadvantage',
				value: xValue > 1 ? xValue : undefined,
				tooltip: `Impaired ${xValue}: You have DisADV ${xValue} on Physical Checks`
			});
		}

		// MENTAL CHECKS
		if (normalizedId === 'dazed-x') {
			const xValue = getStackValue(conditionId);
			effects.mentalChecks.push({
				type: 'disadvantage',
				value: xValue,
				tooltip: `Dazed ${xValue}: You have DisADV ${xValue} on Mental Checks`
			});
		}

		// SAVE EFFECTS
		if (normalizedId === 'immobilized' || normalizedId === 'restrained') {
			effects.agilitySaves.push({
				type: 'disadvantage',
				tooltip: `${definition.name}: DisADV on Agility Saves`
			});
		}

		if (normalizedId === 'weakened-x') {
			const xValue = getStackValue(conditionId);
			effects.physicalSaves.push({
				type: 'disadvantage',
				value: xValue,
				tooltip: `Weakened ${xValue}: You have DisADV ${xValue} on Physical Saves`
			});
		}

		if (normalizedId === 'disoriented-x') {
			const xValue = getStackValue(conditionId);
			effects.mentalSaves.push({
				type: 'disadvantage',
				value: xValue,
				tooltip: `Disoriented ${xValue}: You have DisADV ${xValue} on Mental Saves`
			});
		}

		// ALL CHECKS & SAVES (Exhaustion)
		if (normalizedId === 'exhaustion-x') {
			const xValue = getStackValue(conditionId);
			const tooltip = `Exhaustion ${xValue}: Penalty of ${xValue} on all Checks and Saves`;

			effects.allChecks.push({
				type: 'penalty',
				value: xValue,
				tooltip
			});
			effects.allSaves.push({
				type: 'penalty',
				value: xValue,
				tooltip
			});
		}

		// MOVEMENT
		if (normalizedId === 'immobilized' || normalizedId === 'restrained') {
			effects.movement.push({
				type: 'immobilized',
				tooltip: `${definition.name}: You can't move`
			});
		} else if (normalizedId === 'slowed-x') {
			const xValue = getStackValue(conditionId);
			effects.movement.push({
				type: 'speed-penalty',
				value: xValue,
				tooltip: `Slowed ${xValue}: Every 1 Space you move costs an extra ${xValue} Spaces of movement`
			});
		} else if (normalizedId === 'stunned-x') {
			const xValue = getStackValue(conditionId);
			if (xValue >= 4) {
				effects.movement.push({
					type: 'immobilized',
					tooltip: `Stunned ${xValue}: You’re Incapacitated and can’t move`
				});
			}
		}
	}

	return effects;
}

/**
 * Determines dice modifier (advantage/disadvantage) based on active conditions
 * and the action being performed.
 */
export function getDiceModifierForAction(
	activeConditionIds: string[],
	actionType:
		| 'attack'
		| 'physical-check'
		| 'mental-check'
		| 'physical-save'
		| 'mental-save'
		| 'agility-save'
): DiceModifier {
	const effects = analyzeConditionEffects(activeConditionIds);

	const advantageStacks = 0;
	let disadvantageStacks = 0;
	let penalty = 0;

	switch (actionType) {
		case 'attack':
			disadvantageStacks = sumEffectsByType(effects.attacks, 'disadvantage');
			break;
		case 'physical-check':
			disadvantageStacks = sumEffectsByType(effects.physicalChecks, 'disadvantage');
			penalty = sumEffectsByType(effects.allChecks, 'penalty');
			break;
		case 'mental-check':
			disadvantageStacks = sumEffectsByType(effects.mentalChecks, 'disadvantage');
			penalty = sumEffectsByType(effects.allChecks, 'penalty');
			break;
		case 'agility-save':
			disadvantageStacks =
				sumEffectsByType(effects.agilitySaves, 'disadvantage') +
				sumEffectsByType(effects.physicalSaves, 'disadvantage');
			penalty = sumEffectsByType(effects.allSaves, 'penalty');
			break;
		case 'physical-save':
			disadvantageStacks = sumEffectsByType(effects.physicalSaves, 'disadvantage');
			penalty = sumEffectsByType(effects.allSaves, 'penalty');
			break;
		case 'mental-save':
			disadvantageStacks = sumEffectsByType(effects.mentalSaves, 'disadvantage');
			penalty = sumEffectsByType(effects.allSaves, 'penalty');
			break;
	}

	const netStacks = advantageStacks - disadvantageStacks;

	if (netStacks > 0) {
		return { mode: 'advantage', stacks: netStacks, penalty };
	}

	if (netStacks < 0) {
		return { mode: 'disadvantage', stacks: Math.abs(netStacks), penalty };
	}

	return { mode: 'normal', stacks: 0, penalty };
}

/**
 * Gets all condition badges that should be displayed for a specific attribute.
 */
export function getConditionBadgesForAttribute(
	activeConditionIds: string[],
	attribute: 'attack' | 'movement' | 'physical-check' | 'mental-check' | 'agility-save'
): ConditionEffect[] {
	const effects = analyzeConditionEffects(activeConditionIds);

	switch (attribute) {
		case 'attack':
			return effects.attacks;
		case 'movement':
			return effects.movement;
		case 'physical-check':
			return [...effects.physicalChecks, ...effects.allChecks];
		case 'mental-check':
			return [...effects.mentalChecks, ...effects.allChecks];
		case 'agility-save':
			return [...effects.agilitySaves, ...effects.physicalSaves, ...effects.allSaves];
		default:
			return [];
	}
}
