import { useCharacter } from '../../lib/stores/characterContext';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

function AncestryPointsCounter() {
	const { t } = useTranslation();
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
				{t('characterCreation.ancestryPoints')}: {ancestryPointsRemaining}/{ancestryPointsSpent + ancestryPointsRemaining}
			</h2>
			<div className="text-muted-foreground mt-2 text-sm">
				{t('characterCreation.spent')}: {ancestryPointsSpent} | {t('characterCreation.remaining')}: {ancestryPointsRemaining}
				{isOverBudget && <span className="text-destructive"> {t('characterCreation.overBudget')}</span>}
			</div>
		</div>
	);
}

export default AncestryPointsCounter;
