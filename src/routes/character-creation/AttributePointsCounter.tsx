import { useCharacter } from '../../lib/stores/characterContext';
import { cn } from '../../lib/utils';

function AttributePointsCounter({ totalAttributePoints }: { totalAttributePoints: number }) {
	const { calculationResult } = useCharacter();
	const limits = calculationResult.validation.attributeLimits;
	const total = totalAttributePoints;
	// Each attribute baseline is -2; spent is sum(base + 2)
	const spent = Object.values(limits).reduce((sum, lim) => sum + (lim.base + 2), 0);
	const remaining = total - spent;

	const isOverBudget = remaining < 0;

	return (
		<div className="mb-4 p-4 text-center">
			<h2
				className={cn(
					'font-cinzel m-0 pb-2 text-2xl font-bold tracking-wide uppercase',
					isOverBudget ? 'text-destructive' : 'text-primary'
				)}
			>
				Attribute Points: {remaining}/{total}
			</h2>
			<div className="text-muted-foreground mt-2 text-sm">
				Spent: {spent} | Remaining: {remaining}
				{isOverBudget && <span className="text-destructive"> (Over budget!)</span>}
			</div>
		</div>
	);
}

export default AttributePointsCounter;
