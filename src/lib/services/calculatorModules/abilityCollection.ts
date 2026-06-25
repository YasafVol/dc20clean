/**
 * Ability Collection Module
 *
 * Collects granted abilities, movements, resistances, senses,
 * combat training, and conditional modifiers from resolved effects.
 */

import type { AttributedEffect, EffectSource } from '../../types/effectSystem';

export interface GrantedAbility {
	name: string;
	description: string;
	source: AttributedEffect['source'];
	type: 'active' | 'advantage';
	isConditional: boolean;
	condition?: string;
}

export interface Movement {
	type: string;
	speed: string;
	source: AttributedEffect['source'];
	isDefault?: boolean;
}

export interface Resistance {
	type: string;
	value: string;
	source: EffectSource;
}

export interface Vulnerability {
	type: string;
	value: string;
	source: EffectSource;
}

export interface Sense {
	type: string;
	range: number;
	source: EffectSource;
	sources?: EffectSource[];
}

export interface CombatTrainingGrant {
	type: string;
	source: EffectSource;
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
	const abilities = resolvedEffects
		.filter((effect) => effect.resolved && (effect as any).type === 'GRANT_ABILITY')
		.map((effect) => ({
			name: (effect as any).target,
			description: (effect as any).value as string,
			source: effect.source,
			type: 'active' as const,
			isConditional: !!(effect as any).condition,
			condition: (effect as any).condition
		}));

	const advantageNotes = new Map<string, GrantedAbility>();
	for (const effect of resolvedEffects) {
		if (!effect.resolved || (effect as any).type !== 'GRANT_ADV_ON_CHECK') continue;
		const target = String((effect as any).target);
		const key = `${effect.source.type}:${effect.source.id}:${effect.source.name}`;
		if (advantageNotes.has(key)) continue;

		advantageNotes.set(key, {
			name: effect.source.name,
			description: effect.source.description || `ADV on ${target.replace(/_/g, ' ')} Checks.`,
			source: effect.source,
			type: 'advantage',
			isConditional: !!(effect as any).condition,
			condition: (effect as any).condition
		});
	}

	return [...abilities, ...advantageNotes.values()];
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

/**
 * Collect resistances from GRANT_RESISTANCE effects
 */
export function collectResistances(resolvedEffects: AttributedEffect[]): Resistance[] {
	return resolvedEffects
		.filter((effect) => effect.resolved && (effect as any).type === 'GRANT_RESISTANCE')
		.map((effect) => ({
			type: (effect as any).target as string,
			value: String((effect as any).value ?? ''),
			source: effect.source
		}));
}

/**
 * Collect vulnerabilities from GRANT_VULNERABILITY effects
 */
export function collectVulnerabilities(resolvedEffects: AttributedEffect[]): Vulnerability[] {
	return resolvedEffects
		.filter((effect) => effect.resolved && (effect as any).type === 'GRANT_VULNERABILITY')
		.map((effect) => ({
			type: (effect as any).target as string,
			value: String((effect as any).value ?? ''),
			source: effect.source
		}));
}

/**
 * Collect senses from GRANT_SENSE effects
 */
export function collectSenses(resolvedEffects: AttributedEffect[]): Sense[] {
	const grouped = new Map<string, AttributedEffect[]>();

	for (const effect of resolvedEffects) {
		if (!effect.resolved || (effect as any).type !== 'GRANT_SENSE') continue;
		const key = String((effect as any).target ?? '').toLowerCase();
		grouped.set(key, [...(grouped.get(key) ?? []), effect]);
	}

	return Array.from(grouped.values()).map((effects) => {
		const setEffects = effects.filter((effect) => ((effect as any).mode ?? 'set') === 'set');
		const setRange = Math.max(0, ...setEffects.map((effect) => Number((effect as any).value) || 0));
		const unconditionalIncrease = effects
			.filter((effect) => (effect as any).mode === 'increase')
			.reduce((sum, effect) => sum + (Number((effect as any).value) || 0), 0);
		const existingIncrease =
			setEffects.length > 1
				? effects
						.filter((effect) => (effect as any).mode === 'increase_existing')
						.reduce((sum, effect) => sum + (Number((effect as any).value) || 0), 0)
				: 0;
		const sourceEffect = effects[effects.length - 1];

		return {
			type: String((sourceEffect as any).target),
			range: setRange + unconditionalIncrease + existingIncrease,
			source: sourceEffect.source,
			sources: effects.map((effect) => effect.source)
		};
	});
}

/**
 * Collect combat training from GRANT_COMBAT_TRAINING effects
 */
export function collectCombatTraining(resolvedEffects: AttributedEffect[]): CombatTrainingGrant[] {
	return resolvedEffects
		.filter((effect) => effect.resolved && (effect as any).type === 'GRANT_COMBAT_TRAINING')
		.map((effect) => ({
			type: (effect as any).target as string,
			source: effect.source
		}));
}

/**
 * Inject default Climb and Swim movements if not already granted.
 * Per DC20 rules (CH3):
 * - Climb without Climb Speed = Slowed 1 (half ground speed)
 * - Swim without Swim Speed = Slowed 1 (half ground speed)
 * - Fly/Burrow/Glide without speed = not available
 */
export function injectDefaultMovements(movements: Movement[], groundSpeed: number): Movement[] {
	const result = [...movements];
	const defaultSource: EffectSource = {
		type: 'base',
		id: 'default_movement',
		name: 'Default (Slowed 1)'
	};
	if (!result.some((m) => m.type.toLowerCase() === 'climb')) {
		result.push({
			type: 'climb',
			speed: `${Math.floor(groundSpeed / 2)}`,
			source: defaultSource,
			isDefault: true
		});
	}
	if (!result.some((m) => m.type.toLowerCase() === 'swim')) {
		result.push({
			type: 'swim',
			speed: `${Math.floor(groundSpeed / 2)}`,
			source: defaultSource,
			isDefault: true
		});
	}
	return result;
}
