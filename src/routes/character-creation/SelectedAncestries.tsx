
import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries';
import { traitsData } from '../../lib/rulesdata/_new_schema/traits';
import TraitChoiceSelector from './components/TraitChoiceSelector';
import type { IAncestry, ITrait, ITraitEffect } from '../../lib/rulesdata/types';
import {
	StyledOuterContainer,
	StyledMainTitle,
	StyledContainer,
	StyledAncestryDetails,
	StyledTitle,
	StyledSubtitle,
	StyledList,
	StyledListItem,
	StyledLabel,
	StyledCheckbox
} from './styles/SelectedAncestries.styles';

function SelectedAncestries() {
	const { state, dispatch, calculationResult } = useCharacter();
	
	// Use centralized calculator for ancestry points (includes Cleric domain bonuses, etc.)
	const ancestryData = calculationResult.ancestry || {
		baseAncestryPoints: 5,
		ancestryPointsUsed: 0,
		ancestryPointsRemaining: 5
	};
	const { baseAncestryPoints: totalAncestryPoints, ancestryPointsUsed: ancestryPointsSpent, ancestryPointsRemaining } = ancestryData;

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

	function renderAncestryTraits(ancestry: IAncestry) {
		return (
			<StyledAncestryDetails>
				<StyledTitle>{ancestry.name}</StyledTitle>

				<StyledSubtitle>Default Traits</StyledSubtitle>
				<StyledList>
					{(ancestry.defaultTraitIds || []).map((traitId) => {
						const trait = getTrait(traitId);
						if (!trait) return null;
						const isSelected = selectedTraits.includes(traitId);
						const wouldExceedBudget = !isSelected && ancestryPointsSpent + trait.cost > totalAncestryPoints;

						return (
							<StyledListItem key={traitId}>
								<StyledLabel style={{ opacity: wouldExceedBudget ? 0.5 : 1 }}>
									<StyledCheckbox
										type="checkbox"
										checked={isSelected}
										disabled={wouldExceedBudget}
										onChange={() => handleToggleTrait(traitId)}
									/>
									{trait.name} ({trait.cost} pts) - {trait.description}
									{wouldExceedBudget && (
										<span style={{ color: '#ff4444' }}> (Not enough points)</span>
									)}
								</StyledLabel>
								
								{/* NEW: Render choice selectors if trait is selected and has user choices */}
								{isSelected && trait.effects?.map((effect: ITraitEffect, effectIndex: number) => {
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
							</StyledListItem>
						);
					})}
				</StyledList>

				<StyledSubtitle>Expanded Traits</StyledSubtitle>
				<StyledList>
					{(ancestry.expandedTraitIds || []).map((traitId) => {
						const trait = getTrait(traitId);
						if (!trait) return null;
						const isSelected = selectedTraits.includes(traitId);
						const wouldExceedBudget = !isSelected && ancestryPointsSpent + trait.cost > totalAncestryPoints;

						return (
							<StyledListItem key={traitId}>
								<StyledLabel style={{ opacity: wouldExceedBudget ? 0.5 : 1 }}>
									<StyledCheckbox
										type="checkbox"
										checked={isSelected}
										disabled={wouldExceedBudget}
										onChange={() => handleToggleTrait(traitId)}
									/>
									{trait.name} ({trait.cost} pts) - {trait.description}
									{wouldExceedBudget && (
										<span style={{ color: '#ff4444' }}> (Not enough points)</span>
									)}
								</StyledLabel>
								
								{/* NEW: Render choice selectors if trait is selected and has user choices */}
								{isSelected && trait.effects?.map((effect: ITraitEffect, effectIndex: number) => {
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
							</StyledListItem>
						);
					})}
				</StyledList>
			</StyledAncestryDetails>
		);
	}

	return (
		<StyledOuterContainer>
			<StyledMainTitle>
				Ancestry Traits
				<div
					style={{
						fontSize: '0.9rem',
						fontWeight: 'normal',
						marginTop: '0.5rem',
						color: ancestryPointsRemaining < 0 ? '#ff4444' : '#d1d5db'
					}}
				>
					Spent: {ancestryPointsSpent} | Remaining: {ancestryPointsRemaining}/
					{ancestryPointsSpent + ancestryPointsRemaining}
					{ancestryPointsRemaining < 0 && <span style={{ color: '#ff4444' }}> (Over budget!)</span>}
				</div>
			</StyledMainTitle>
			<StyledContainer>
				{selectedAncestry1 && renderAncestryTraits(selectedAncestry1)}
				{selectedAncestry2 && renderAncestryTraits(selectedAncestry2)}
			</StyledContainer>
		</StyledOuterContainer>
	);
}

export default SelectedAncestries;
