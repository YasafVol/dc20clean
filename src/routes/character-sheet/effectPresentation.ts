import type { AttributedEffect, EffectSource } from '../../lib/types/effectSystem';

export type EffectPresentationCategory = 'applied' | 'collected' | 'rules' | 'unmapped';

export interface EffectPresentationRow {
	id: string;
	category: EffectPresentationCategory;
	label: string;
	detail: string;
	source: EffectSource;
	condition?: string;
}

const COLLECTED_TYPES = new Set([
	'GRANT_MOVEMENT',
	'GRANT_SENSE',
	'GRANT_RESISTANCE',
	'GRANT_VULNERABILITY',
	'GRANT_COMBAT_TRAINING'
]);

const APPLIED_TYPES = new Set([
	'MODIFY_STAT',
	'MODIFY_ATTRIBUTE',
	'MODIFY_SKILL_MASTERY_CAP',
	'MODIFY_TRADE_MASTERY_CAP',
	'INCREASE_SKILL_MASTERY_CAP',
	'INCREASE_TRADE_MASTERY_CAP'
]);

export function presentCharacterEffects(effects: AttributedEffect[] = []): EffectPresentationRow[] {
	return effects.map((effect, index) => {
		const raw = effect as AttributedEffect & {
			target?: string;
			value?: unknown;
			condition?: string;
		};
		const category: EffectPresentationCategory = APPLIED_TYPES.has(effect.type)
			? 'applied'
			: COLLECTED_TYPES.has(effect.type)
				? 'collected'
				: effect.type === 'GRANT_ABILITY' || effect.type.startsWith('GRANT_ADV_')
					? 'rules'
					: 'unmapped';
		const value =
			typeof raw.value === 'object' ? JSON.stringify(raw.value) : String(raw.value ?? '');

		return {
			id: `${effect.source.type}:${effect.source.id}:${effect.type}:${raw.target ?? index}`,
			category,
			label: raw.target?.replaceAll('_', ' ') || effect.type.replaceAll('_', ' '),
			detail: value,
			source: effect.source,
			condition: raw.condition
		};
	});
}

export function resolveCharacterSize(effects: AttributedEffect[] = []): string | undefined {
	return [...effects]
		.reverse()
		.find((effect) => effect.type === 'SET_VALUE' && (effect as any).target === 'size')
		?.value?.toString();
}
