import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries/ancestries';
import { traitsData } from '../../lib/rulesdata/ancestries/traits';
import TraitChoiceSelector from './components/TraitChoiceSelector';
import type { IAncestry, ITrait, ITraitEffect } from '../../lib/rulesdata/types';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../lib/utils';

function SelectedAncestries() {
	const { state, dispatch, calculationResult } = useCharacter();

	// Use centralized calculator for ancestry points (includes Cleric domain bonuses, etc.)
	const ancestryData = calculationResult.ancestry || {
		baseAncestryPoints: 5,
		ancestryPointsUsed: 0,
		ancestryPointsRemaining: 5
	};
	const {
		baseAncestryPoints: totalAncestryPoints,
		ancestryPointsUsed: ancestryPointsSpent,
		ancestryPointsRemaining
	} = ancestryData;

	const selectedAncestry1 = ancestriesData.find((a) => a.id === state.ancestry1Id);
	const selectedAncestry2 = ancestriesData.find((a) => a.id === state.ancestry2Id);
	// NEW: Use typed data instead of JSON parsing
	const selectedTraits: string[] = state.selectedTraitIds || [];

	function getTrait(traitId: string): ITrait | undefined {
		return traitsData.find((t) => t.id === traitId);
	}

	function handleToggleTrait(traitId: string) {
		const trait = getTrait(traitId);
		if (!trait) return;

		let currentTraits = [...selectedTraits];
		const isCurrentlySelected = currentTraits.includes(traitId);

		if (isCurrentlySelected) {
			// Deselect - always allowed
			currentTraits = currentTraits.filter((id) => id !== traitId);
		} else {
			// Select - check if we have enough points
			const newPointsSpent = ancestryPointsSpent + trait.cost;
			if (newPointsSpent > totalAncestryPoints) {
				// Would exceed budget, don't allow selection
				return;
			}
			currentTraits.push(traitId);
		}

		dispatch({ type: 'SET_TRAITS', selectedTraitIds: currentTraits });
	}

	function renderTraitItem(traitId: string) {
		const trait = getTrait(traitId);
		if (!trait) return null;
		const isSelected = selectedTraits.includes(traitId);
		const wouldExceedBudget = !isSelected && ancestryPointsSpent + trait.cost > totalAncestryPoints;

		return (
			<li key={traitId} className="border-primary mb-3 rounded border-l bg-white/5 p-2">
				<label
					className={cn(
						'text-foreground hover:text-primary flex cursor-pointer items-start gap-3 text-sm leading-relaxed',
						wouldExceedBudget && 'opacity-50'
					)}
				>
					<input
						type="checkbox"
						checked={isSelected}
						disabled={wouldExceedBudget}
						onChange={() => handleToggleTrait(traitId)}
						className="accent-primary mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer"
					/>
					<span>
						{trait.name} ({trait.cost} pts) - {trait.description}
						{wouldExceedBudget && <span className="text-destructive"> (Not enough points)</span>}
					</span>
				</label>

				{/* Render choice selectors if trait is selected and has user choices */}
				{isSelected &&
					trait.effects?.map((effect: ITraitEffect, effectIndex: number) => {
						if (effect.userChoiceRequired) {
							return (
								<TraitChoiceSelector
									key={`${traitId}-${effectIndex}`}
									trait={trait}
									effect={effect}
									effectIndex={effectIndex}
								/>
							);
						}
						return null;
					})}
			</li>
		);
	}

	function renderAncestryTraits(ancestry: IAncestry) {
		return (
			<Card key={ancestry.id} className="border-white/50 bg-transparent">
				<CardHeader className="pb-2">
					<CardTitle className="text-primary text-center text-xl tracking-wide uppercase">
						{ancestry.name}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<h3 className="text-primary border-b border-white/50 pb-1 text-lg font-bold">
							Default Traits
						</h3>
						<ul className="mt-3 list-none p-0">
							{(ancestry.defaultTraitIds || []).map((traitId) => renderTraitItem(traitId))}
						</ul>
					</div>

					<div>
						<h3 className="text-primary border-b border-white/50 pb-1 text-lg font-bold">
							Expanded Traits
						</h3>
						<ul className="mt-3 list-none p-0">
							{(ancestry.expandedTraitIds || []).map((traitId) => renderTraitItem(traitId))}
						</ul>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="mt-8 border-white/50 bg-transparent">
			<CardHeader>
				<CardTitle className="text-primary font-cinzel text-center text-3xl font-bold tracking-wide">
					Ancestry Traits
				</CardTitle>
				<div
					className={cn(
						'mt-2 text-center text-sm',
						ancestryPointsRemaining < 0 ? 'text-destructive' : 'text-muted-foreground'
					)}
				>
					Spent: {ancestryPointsSpent} | Remaining: {ancestryPointsRemaining}/
					{ancestryPointsSpent + ancestryPointsRemaining}
					{ancestryPointsRemaining < 0 && <span className="text-destructive"> (Over budget!)</span>}
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				{selectedAncestry1 && renderAncestryTraits(selectedAncestry1)}
				{selectedAncestry2 && renderAncestryTraits(selectedAncestry2)}
			</CardContent>
		</Card>
	);
}

export default SelectedAncestries;
