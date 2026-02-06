/**
 * Condition Effects Analyzer
 *
 * Analyzes active conditions and determines which visual indicators (badges)
 * and dice modifiers should be applied to various attributes and actions.
 */

import { ALL_CONDITIONS } from '../rulesdata/conditions/conditions.data';
import type { ConditionBadgeType } from '../../routes/character-sheet/components/ConditionBadge';

export interface ConditionEffect {
	type: ConditionBadgeType;
	value?: number;
	tooltip: string;
}

export interface ConditionEffects {
	attacks: ConditionEffect[];
	agilitySaves: ConditionEffect[];
	physicalChecks: ConditionEffect[];
	mentalChecks: ConditionEffect[];
	movement: ConditionEffect[];
	allChecks: ConditionEffect[];
	allSaves: ConditionEffect[];
}

export interface DiceModifier {
	mode: 'advantage' | 'disadvantage' | 'normal';
	stacks: number; // For ADV X or DisADV X
}

/**
 * Analyzes active conditions and returns their effects on various attributes
 */
export function analyzeConditionEffects(activeConditionIds: string[]): ConditionEffects {
	const effects: ConditionEffects = {
		attacks: [],
		agilitySaves: [],
		physicalChecks: [],
		mentalChecks: [],
		movement: [],
		allChecks: [],
		allSaves: []
	};

	for (const conditionId of activeConditionIds) {
		const condition = ALL_CONDITIONS.find((c) => c.id === conditionId);
		if (!condition) continue;

		// Parse condition effects based on description
		const desc = condition.description.toLowerCase();

		// ATTACKS
		if (conditionId === 'restrained') {
			effects.attacks.push({
				type: 'disadvantage',
				tooltip: 'Restrained: Your attacks have DisADV'
			});
		} else if (conditionId.startsWith('hindered-')) {
			const xValue = parseInt(conditionId.split('-')[1], 10) || 1;
			effects.attacks.push({
				type: 'disadvantage',
				value: xValue,
				tooltip: `Hindered ${xValue}: You have DisADV ${xValue} on Attacks`
			});
		}

		// PHYSICAL CHECKS
		if (conditionId === 'poisoned' || conditionId.startsWith('impaired-')) {
			const xValue = conditionId.startsWith('impaired-')
				? parseInt(conditionId.split('-')[1], 10) || 1
				: 1;
			effects.physicalChecks.push({
				type: 'disadvantage',
				value: xValue > 1 ? xValue : undefined,
				tooltip:
					conditionId === 'poisoned'
						? 'Poisoned: Impaired (DisADV on Physical Checks)'
						: `Impaired ${xValue}: You have DisADV ${xValue} on Physical Checks`
			});
		}

		// MENTAL CHECKS
		if (conditionId.startsWith('dazed-')) {
			const xValue = parseInt(conditionId.split('-')[1], 10) || 1;
			effects.mentalChecks.push({
				type: 'disadvantage',
				value: xValue,
				tooltip: `Dazed ${xValue}: You have DisADV ${xValue} on Mental Checks`
			});
		}

		// AGILITY SAVES
		if (conditionId === 'immobilized' || conditionId === 'restrained') {
			effects.agilitySaves.push({
				type: 'disadvantage',
				tooltip: `${condition.name}: DisADV on Agility Saves`
			});
		} else if (conditionId.startsWith('weakened-')) {
			const xValue = parseInt(conditionId.split('-')[1], 10) || 1;
			effects.allSaves.push({
				type: 'disadvantage',
				value: xValue,
				tooltip: `Weakened ${xValue}: You have DisADV ${xValue} on Physical Saves`
			});
		}

		// MENTAL SAVES
		if (conditionId.startsWith('disoriented-')) {
			const xValue = parseInt(conditionId.split('-')[1], 10) || 1;
			effects.allSaves.push({
				type: 'disadvantage',
				value: xValue,
				tooltip: `Disoriented ${xValue}: You have DisADV ${xValue} on Mental Saves`
			});
		}

		// ALL CHECKS & SAVES (Exhaustion)
		if (conditionId.startsWith('exhaustion-')) {
			const xValue = parseInt(conditionId.split('-')[1], 10) || 1;
			effects.allChecks.push({
				type: 'disadvantage',
				value: xValue,
				tooltip: `Exhaustion ${xValue}: Penalty of ${xValue} on all Checks and Saves`
			});
			effects.allSaves.push({
				type: 'disadvantage',
				value: xValue,
				tooltip: `Exhaustion ${xValue}: Penalty of ${xValue} on all Checks and Saves`
			});
		}

		// MOVEMENT
		if (conditionId === 'immobilized') {
			effects.movement.push({
				type: 'immobilized',
				tooltip: "Immobilized: You can't move"
			});
		} else if (conditionId.startsWith('slowed-')) {
			const xValue = parseInt(conditionId.split('-')[1], 10) || 1;
			effects.movement.push({
				type: 'speed-penalty',
				value: xValue,
				tooltip: `Slowed ${xValue}: Every 1 Space you move costs an extra ${xValue} Spaces of movement`
			});
		}
	}

	return effects;
}

/**
 * Determines dice modifier (advantage/disadvantage) based on active conditions
 * and the action being performed
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

	// Aggregate effects based on action type
	switch (actionType) {
		case 'attack':
			disadvantageStacks = effects.attacks.reduce((sum, e) => sum + (e.value || 1), 0);
			break;
		case 'physical-check':
			disadvantageStacks = effects.physicalChecks.reduce((sum, e) => sum + (e.value || 1), 0);
			disadvantageStacks += effects.allChecks.reduce((sum, e) => sum + (e.value || 1), 0);
			break;
		case 'mental-check':
			disadvantageStacks = effects.mentalChecks.reduce((sum, e) => sum + (e.value || 1), 0);
			disadvantageStacks += effects.allChecks.reduce((sum, e) => sum + (e.value || 1), 0);
			break;
		case 'agility-save':
			disadvantageStacks = effects.agilitySaves.reduce((sum, e) => sum + (e.value || 1), 0);
			disadvantageStacks += effects.allSaves.reduce((sum, e) => sum + (e.value || 1), 0);
			break;
		case 'physical-save':
		case 'mental-save':
			disadvantageStacks = effects.allSaves.reduce((sum, e) => sum + (e.value || 1), 0);
			break;
	}

	// Net stacks (advantage - disadvantage)
	const netStacks = advantageStacks - disadvantageStacks;

	if (netStacks > 0) {
		return { mode: 'advantage', stacks: netStacks };
	} else if (netStacks < 0) {
		return { mode: 'disadvantage', stacks: Math.abs(netStacks) };
	} else {
		return { mode: 'normal', stacks: 0 };
	}
}

/**
 * Gets all condition badges that should be displayed for a specific attribute
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
			return [...effects.agilitySaves, ...effects.allSaves];
		default:
			return [];
	}
}
