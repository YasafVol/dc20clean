import { useCharacter } from '../../lib/stores/characterContext';
import { cn } from '../../lib/utils';

function AncestryPointsCounter() {
	const { calculationResult } = useCharacter();

	// Use centralized calculator for ancestry points (includes Cleric domain bonuses, etc.)
	const ancestryData = calculationResult.ancestry || {
		baseAncestryPoints: 5,
		ancestryPointsUsed: 0,
		ancestryPointsRemaining: 5
	};
	const { ancestryPointsUsed: ancestryPointsSpent, ancestryPointsRemaining } = ancestryData;

	const isOverBudget = ancestryPointsRemaining < 0;

	return (
		<div className="mb-4 p-4 text-center">
			<h2
				className={cn(
					'font-cinzel m-0 pb-2 text-2xl font-bold tracking-wide uppercase',
					isOverBudget ? 'text-destructive' : 'text-primary'
				)}
			>
				Ancestry Points: {ancestryPointsRemaining}/{ancestryPointsSpent + ancestryPointsRemaining}
			</h2>
			<div className="text-muted-foreground mt-2 text-sm">
				Spent: {ancestryPointsSpent} | Remaining: {ancestryPointsRemaining}
				{isOverBudget && <span className="text-destructive"> (Over budget!)</span>}
			</div>
		</div>
	);
}

export default AncestryPointsCounter;
