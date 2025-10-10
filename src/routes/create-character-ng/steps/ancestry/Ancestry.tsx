import React from 'react';
import {
	StyledContainer,
	StyledContent,
	StyledSection,
	StyledSectionTitle,
	StyledAncestryDetails,
	StyledDescription
} from './Ancestry.styles';
import { CollapsibleSection, Button } from '../../../../design-system';
import { ancestriesData } from '../../../../lib/rulesdata/ancestries/ancestries';
import { useCharacter } from '../../../../lib/stores/characterContext';
import {
	getFormattedAncestryData,
	calculatePointsSpent,
	canSelectTrait,
	MAX_ANCESTRY_POINTS
} from '../../../../lib/services/ancestry.service';
import AncestryPointsDisplay from './components/AncestryPointsDisplay';
import AncestryTraitSelector from './components/AncestryTraitSelector';

const Ancestry: React.FC = () => {
	const { state, dispatch } = useCharacter();

	// Get selected ancestry and traits
	const selectedAncestryId = state.ancestry1Id;
	const selectedTraitIds = state.selectedTraitIds || [];

	// Calculate points remaining
	const pointsSpent = calculatePointsSpent(selectedTraitIds);
	const pointsRemaining = MAX_ANCESTRY_POINTS - pointsSpent;

	const handleAncestrySelect = (ancestryId: string) => {
		if (selectedAncestryId === ancestryId) {
			// Deselect ancestry - clear traits too
			dispatch({ type: 'SET_ANCESTRY', ancestry1Id: null, ancestry2Id: null });
			dispatch({ type: 'SET_TRAITS', selectedTraitIds: [] });
		} else {
			// Select new ancestry - DON'T auto-select any traits
			dispatch({ type: 'SET_ANCESTRY', ancestry1Id: ancestryId, ancestry2Id: null });
			dispatch({ type: 'SET_TRAITS', selectedTraitIds: [] });
		}
	};

	const handleTraitToggle = (traitId: string, checked: boolean) => {
		const newTraitIds = checked
			? [...selectedTraitIds, traitId]
			: selectedTraitIds.filter((id) => id !== traitId);

		dispatch({ type: 'SET_TRAITS', selectedTraitIds: newTraitIds });
	};

	return (
		<StyledContainer>
			<AncestryPointsDisplay pointsRemaining={pointsRemaining} maxPoints={MAX_ANCESTRY_POINTS} />

			<StyledContent>
				{ancestriesData.map((ancestry) => {
					const isSelected = selectedAncestryId === ancestry.id;
					const formattedData = getFormattedAncestryData(ancestry);

					// Create ancestry-specific canSelectTrait callback
					// If ancestry is not selected, traits cannot be selected
					const canSelectTraitCallback = (traitId: string) => {
						if (!isSelected) return false;
						return canSelectTrait(traitId, selectedTraitIds, ancestry);
					};

					return (
						<CollapsibleSection
							key={ancestry.id}
							title={ancestry.name.toUpperCase()}
							selected={isSelected}
							defaultExpanded={isSelected}
							action={
								<Button
									label={isSelected ? 'Selected' : 'Choose this Ancestry'}
									onClick={(e) => {
										e.stopPropagation();
										handleAncestrySelect(ancestry.id);
									}}
									bg={isSelected ? 'var(--emerald)' : undefined}
								/>
							}
						>
							<StyledAncestryDetails>
								<StyledDescription>{ancestry.description}</StyledDescription>
								{/* Default Traits Section */}
								{formattedData.defaultTraits.length > 0 && (
									<StyledSection>
										<StyledSectionTitle>Default Traits</StyledSectionTitle>
										<AncestryTraitSelector
											traits={formattedData.defaultTraits}
											selectedTraitIds={selectedTraitIds}
											onTraitToggle={handleTraitToggle}
											canSelectTrait={canSelectTraitCallback}
										/>
									</StyledSection>
								)}
								{/* Expanded Traits Section */}
								{formattedData.expandedTraits.length > 0 && (
									<StyledSection>
										<StyledSectionTitle>Expanded Traits</StyledSectionTitle>
										<AncestryTraitSelector
											traits={formattedData.expandedTraits}
											selectedTraitIds={selectedTraitIds}
											onTraitToggle={handleTraitToggle}
											canSelectTrait={canSelectTraitCallback}
										/>
									</StyledSection>
								)}
							</StyledAncestryDetails>
						</CollapsibleSection>
					);
				})}
			</StyledContent>
		</StyledContainer>
	);
};

export default Ancestry;
