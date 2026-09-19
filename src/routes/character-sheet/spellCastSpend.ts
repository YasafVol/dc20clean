import type {
	SpellCost,
	SpellEnhancement,
	SpellResourceAmount,
	SpellResourceCost
} from '../../lib/rulesdata/schemas/spell.schema';

export interface SpellEnhancementSelection {
	quantity: number;
	costOptionIndex: number;
}

export type SpellEnhancementSelections = Record<string, SpellEnhancementSelection>;

export interface SpellCastSpend {
	ap: number;
	mp: number;
}

export function getSpellEnhancementKey(enhancement: SpellEnhancement, index: number): string {
	return enhancement.id ?? `${enhancement.name}-${index}`;
}

export function getSpellEnhancementCostOptions(enhancement: SpellEnhancement): SpellResourceCost[] {
	const primaryCost: SpellResourceCost =
		typeof enhancement.cost === 'number'
			? { [enhancement.type === 'AP' ? 'ap' : 'mp']: enhancement.cost }
			: enhancement.cost;

	return [primaryCost, ...(enhancement.alternativeCosts ?? [])];
}

export function hasVariableResourceCost(cost: SpellResourceCost): boolean {
	return cost.ap === 'X' || cost.mp === 'X';
}

function resolveAmount(
	amount: SpellResourceAmount | undefined,
	quantity: number,
	multiplier: number
): number {
	if (amount === undefined) return 0;
	if (amount === 'X') return quantity;
	return amount * multiplier;
}

export function calculateSpellEnhancementSpend(
	enhancement: SpellEnhancement,
	selection: SpellEnhancementSelection | undefined
): SpellCastSpend {
	const quantity = Math.max(0, selection?.quantity ?? 0);
	if (quantity === 0) return { ap: 0, mp: 0 };

	const options = getSpellEnhancementCostOptions(enhancement);
	const optionIndex = Math.min(Math.max(0, selection?.costOptionIndex ?? 0), options.length - 1);
	const cost = options[optionIndex] ?? {};
	const multiplier = hasVariableResourceCost(cost) ? 1 : enhancement.repeatable ? quantity : 1;

	return {
		ap: resolveAmount(cost.ap, quantity, multiplier),
		mp: resolveAmount(cost.mp, quantity, multiplier)
	};
}

export function calculateSpellCastSpend(
	baseCost: SpellCost,
	enhancements: SpellEnhancement[],
	selections: SpellEnhancementSelections,
	baseVariableMp: number
): SpellCastSpend {
	const baseMp = baseCost.mp === 'X' ? Math.max(0, baseVariableMp) : Math.max(0, baseCost.mp ?? 0);

	return enhancements.reduce<SpellCastSpend>(
		(total, enhancement, index) => {
			const spend = calculateSpellEnhancementSpend(
				enhancement,
				selections[getSpellEnhancementKey(enhancement, index)]
			);
			return { ap: total.ap + spend.ap, mp: total.mp + spend.mp };
		},
		{ ap: Math.max(0, baseCost.ap), mp: baseMp }
	);
}

export function areSpellEnhancementRequirementsMet(
	enhancement: SpellEnhancement,
	enhancements: SpellEnhancement[],
	selections: SpellEnhancementSelections
): boolean {
	if (!enhancement.requires?.length) return true;

	return enhancement.requires.every((requiredId) => {
		const requiredIndex = enhancements.findIndex((candidate) => candidate.id === requiredId);
		if (requiredIndex < 0) return false;
		const required = enhancements[requiredIndex];
		return (selections[getSpellEnhancementKey(required, requiredIndex)]?.quantity ?? 0) > 0;
	});
}
