import type {
	SpellCost,
	SpellEnhancement,
	SpellResourceAmount,
	SpellResourceCost
} from '../schemas/spell.schema';

const formatAmount = (amount: SpellResourceAmount, resource: 'AP' | 'MP'): string =>
	`${amount} ${resource}`;

export function formatResourceCost(cost: SpellResourceCost): string {
	return [
		cost.ap === undefined ? undefined : formatAmount(cost.ap, 'AP'),
		cost.mp === undefined ? undefined : formatAmount(cost.mp, 'MP')
	]
		.filter((part): part is string => Boolean(part))
		.join(' + ');
}

export function formatSpellCost(cost: SpellCost): string {
	if (cost.raw) {
		return cost.raw;
	}

	return formatResourceCost({ ap: cost.ap, mp: cost.mp });
}

export function formatSpellEnhancementCost(enhancement: SpellEnhancement): string {
	if (enhancement.costText) {
		return enhancement.costText;
	}

	if (typeof enhancement.cost === 'number') {
		return `${enhancement.cost} ${enhancement.type ?? ''}`.trim();
	}

	const costs = [enhancement.cost, ...(enhancement.alternativeCosts ?? [])];
	return costs.map(formatResourceCost).join(' or ');
}
