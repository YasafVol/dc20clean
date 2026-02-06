/**
 * Ability Collection Module
 *
 * Collects granted abilities, movements, resistances, senses,
 * combat training, and conditional modifiers from resolved effects.
 */

import type { AttributedEffect } from '../../types/effectSystem';

export interface GrantedAbility {
	name: string;
	description: string | number;
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
		.filter((effect) => effect.resolved && effect.type === 'GRANT_ABILITY')
		.map((effect) => ({
			name: effect.target,
			description: effect.value as string,
			source: effect.source,
			type: 'active' as const,
			isConditional: !!effect.condition,
			condition: effect.condition
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
		.filter((effect) => effect.resolved && effect.type === 'GRANT_MOVEMENT')
		.map((effect) => {
			let speed: string;
			if (effect.value === 'equal_to_speed') {
				speed = `${finalMoveSpeed}`;
			} else if (effect.value === 'half_speed') {
				speed = `${Math.floor(finalMoveSpeed / 2)}`;
			} else if (effect.value === 'double_speed') {
				speed = `${finalMoveSpeed * 2}`;
			} else if (typeof effect.value === 'number') {
				speed = `${effect.value}`;
			} else {
				speed = effect.value as string;
			}
			return {
				type: effect.target,
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
		.filter((effect) => effect.resolved && effect.condition)
		.map((effect) => ({
			effect,
			condition: effect.condition!,
			description: `${effect.source.name}: ${effect.value > 0 ? '+' : ''}${effect.value} ${effect.target} while ${effect.condition}`,
			affectedStats: [effect.target]
		}));
}
