/**
 * Ability Collection Module
 *
 * Collects granted abilities, movements, resistances, senses,
 * combat training, and conditional modifiers from resolved effects.
 */

import type { AttributedEffect } from '../../types/effectSystem';

export interface GrantedAbility {
	name: string;
	description: string;
	source: AttributedEffect['source'];
	type: 'active';
	isConditional: boolean;
	condition?: string;
}

export interface Movement {
	type: string;
	speed: string;
	source: AttributedEffect['source'];
}

export interface ConditionalModifier {
	effect: AttributedEffect;
	condition: string;
	description: string;
	affectedStats: string[];
}

/**
 * Collect granted abilities from resolved effects
 */
export function collectGrantedAbilities(resolvedEffects: AttributedEffect[]): GrantedAbility[] {
	return resolvedEffects
		.filter((effect) => effect.resolved && (effect as any).type === 'GRANT_ABILITY')
		.map((effect) => ({
			name: (effect as any).target,
			description: (effect as any).value as string,
			source: effect.source,
			type: 'active' as const,
			isConditional: !!(effect as any).condition,
			condition: (effect as any).condition
		}));
}

/**
 * Collect movements from GRANT_MOVEMENT effects, resolving speed
 * references like "equal_to_speed", "half_speed", "double_speed"
 */
export function collectMovements(
	resolvedEffects: AttributedEffect[],
	finalMoveSpeed: number
): Movement[] {
	return resolvedEffects
		.filter((effect) => effect.resolved && (effect as any).type === 'GRANT_MOVEMENT')
		.map((effect) => {
			const value = (effect as any).value;
			let speed: string;
			if (value === 'equal_to_speed') {
				speed = `${finalMoveSpeed}`;
			} else if (value === 'half_speed') {
				speed = `${Math.floor(finalMoveSpeed / 2)}`;
			} else if (value === 'double_speed') {
				speed = `${finalMoveSpeed * 2}`;
			} else if (typeof value === 'number') {
				speed = `${value}`;
			} else {
				speed = value as string;
			}
			return {
				type: (effect as any).target,
				speed,
				source: effect.source
			};
		});
}

/**
 * Collect conditional modifiers from resolved effects
 */
export function collectConditionalModifiers(
	resolvedEffects: AttributedEffect[]
): ConditionalModifier[] {
	return resolvedEffects
		.filter((effect) => effect.resolved && (effect as any).condition)
		.map((effect) => {
			const e = effect as any;
			return {
				effect,
				condition: e.condition!,
				description: `${effect.source.name}: ${e.value > 0 ? '+' : ''}${e.value} ${e.target} while ${e.condition}`,
				affectedStats: [e.target]
			};
		});
}
