import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries';
import { traitsData } from '../../lib/rulesdata/traits';
import type { IAncestry, ITrait } from '../../lib/rulesdata/types';
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
	const { state, dispatch, ancestryPointsRemaining, ancestryPointsSpent } = useCharacter();

	const selectedAncestry1 = ancestriesData.find((a) => a.id === state.ancestry1Id);
	const selectedAncestry2 = ancestriesData.find((a) => a.id === state.ancestry2Id);
	const selectedTraits: string[] = JSON.parse(state.selectedTraitIds || '[]');

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
			if (newPointsSpent > 5) {
				// Would exceed budget, don't allow selection
				return;
			}
			currentTraits.push(traitId);
		}

		dispatch({ type: 'SET_TRAITS', selectedTraitIds: JSON.stringify(currentTraits) });
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
						const wouldExceedBudget = !isSelected && (ancestryPointsSpent + trait.cost > 5);
						
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
									{wouldExceedBudget && <span style={{ color: '#ff4444' }}> (Not enough points)</span>}
								</StyledLabel>
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
						const wouldExceedBudget = !isSelected && (ancestryPointsSpent + trait.cost > 5);
						
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
									{wouldExceedBudget && <span style={{ color: '#ff4444' }}> (Not enough points)</span>}
								</StyledLabel>
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
				<div style={{ 
					fontSize: '0.9rem', 
					fontWeight: 'normal', 
					marginTop: '0.5rem',
					color: ancestryPointsRemaining < 0 ? '#ff4444' : '#d1d5db'
				}}>
					Spent: {ancestryPointsSpent} | Remaining: {ancestryPointsRemaining}/5
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
