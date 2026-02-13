import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries/ancestries';
import { traitsData } from '../../lib/rulesdata/ancestries/traits';
import TraitChoiceSelector from './components/TraitChoiceSelector';
import type { IAncestry, ITrait, ITraitEffect } from '../../lib/rulesdata/types';
import { useTranslation } from 'react-i18next';
import {
	Container,
	Header,
	Title,
	PointsDisplay,
	AncestrySection,
	SectionHeader,
	AncestryName,
	TraitGrid,
	TraitCard,
	TraitHeader,
	TraitName,
	TraitCost,
	TraitDescription,
	PrerequisiteWarning,
	EmptyState
} from './SelectedAncestries.styled';

function SelectedAncestries() {
	const { state, dispatch, calculationResult } = useCharacter();
	const { t } = useTranslation();

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

	// Check if all prerequisites for a trait are met
	// Uses structured `requirements` (supersedes deprecated `prerequisites` array)
	function arePrerequisitesMet(trait: ITrait, currentSelectedTraits: string[]): boolean {
		if (trait.requirements) {
			const req = trait.requirements;
			// hasTrait: any-of semantics (.some)
			if (req.hasTrait && req.hasTrait.length > 0) {
				if (!req.hasTrait.some((id) => currentSelectedTraits.includes(id))) return false;
			}
			// hasAllTraits: all-of semantics (.every)
			if (req.hasAllTraits && req.hasAllTraits.length > 0) {
				if (!req.hasAllTraits.every((id) => currentSelectedTraits.includes(id))) return false;
			}
			// prohibitsTraits: none selected
			if (req.prohibitsTraits && req.prohibitsTraits.length > 0) {
				if (req.prohibitsTraits.some((id) => currentSelectedTraits.includes(id))) return false;
			}
			return true;
		}
		// Fall back to deprecated `prerequisites` array (all-of)
		if (!trait.prerequisites || trait.prerequisites.length === 0) return true;
		return trait.prerequisites.every((prereqId) => currentSelectedTraits.includes(prereqId));
	}

	// Get list of missing prerequisites for display
	function getMissingPrerequisites(trait: ITrait, currentSelectedTraits: string[]): string[] {
		if (trait.requirements) {
			const req = trait.requirements;
			const missing: string[] = [];
			if (req.hasTrait && req.hasTrait.length > 0) {
				if (!req.hasTrait.some((id) => currentSelectedTraits.includes(id))) {
					missing.push(...req.hasTrait);
				}
			}
			if (req.hasAllTraits && req.hasAllTraits.length > 0) {
				missing.push(...req.hasAllTraits.filter((id) => !currentSelectedTraits.includes(id)));
			}
			if (req.prohibitsTraits && req.prohibitsTraits.length > 0) {
				missing.push(...req.prohibitsTraits.filter((id) => currentSelectedTraits.includes(id)));
			}
			return missing;
		}
		if (!trait.prerequisites) return [];
		return trait.prerequisites.filter((prereqId) => !currentSelectedTraits.includes(prereqId));
	}

	// Get human-readable names for prerequisite trait IDs
	function getPrerequisiteNames(prereqIds: string[]): string[] {
		return prereqIds.map((id) => {
			const trait = getTrait(id);
			return trait?.name || id;
		});
	}

	// Find all traits that depend on a given trait (for cascade deselection)
	function getDependentTraits(traitId: string, currentSelectedTraits: string[]): string[] {
		const dependents: string[] = [];
		for (const selectedId of currentSelectedTraits) {
			const trait = getTrait(selectedId);
			if (!trait) continue;
			// Check structured requirements
			const depViaRequirements =
				trait.requirements?.hasTrait?.includes(traitId) ||
				trait.requirements?.hasAllTraits?.includes(traitId);
			// Check deprecated prerequisites
			const depViaPrereqs = trait.prerequisites?.includes(traitId);
			if (depViaRequirements || depViaPrereqs) {
				// Only cascade-deselect if removing traitId would break the prerequisite
				const remainingTraits = currentSelectedTraits.filter((id) => id !== traitId);
				if (!arePrerequisitesMet(trait, remainingTraits)) {
					dependents.push(selectedId);
					dependents.push(...getDependentTraits(selectedId, currentSelectedTraits));
				}
			}
		}
		return dependents;
	}

	function handleToggleTrait(traitId: string) {
		const trait = getTrait(traitId);
		if (!trait) return;

		let currentTraits = [...selectedTraits];
		const isCurrentlySelected = currentTraits.includes(traitId);

		if (isCurrentlySelected) {
			// Deselect - also deselect any traits that depend on this one (cascade)
			const dependentTraits = getDependentTraits(traitId, currentTraits);
			currentTraits = currentTraits.filter((id) => id !== traitId && !dependentTraits.includes(id));
		} else {
			// Select - check prerequisites first
			if (!arePrerequisitesMet(trait, currentTraits)) {
				// Prerequisites not met, don't allow selection
				return;
			}
			// Check if we have enough points
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

		// Check prerequisites
		const missingPrereqs = getMissingPrerequisites(trait, selectedTraits);
		const hasUnmetPrerequisites = missingPrereqs.length > 0;
		const missingPrereqNames = getPrerequisiteNames(missingPrereqs);
		const isDisabled = !isSelected && (wouldExceedBudget || hasUnmetPrerequisites);

		return (
			<TraitCard
				key={traitId}
				$isSelected={isSelected}
				$disabled={isDisabled}
				$cost={trait.cost}
				onClick={() => !isDisabled && handleToggleTrait(traitId)}
				whileHover={{ scale: isDisabled ? 1 : 1.01 }}
				whileTap={{ scale: isDisabled ? 1 : 0.99 }}
			>
				<TraitHeader>
					<TraitName $isSelected={isSelected}>{trait.name}</TraitName>
					<TraitCost $cost={trait.cost}>
						{trait.cost} {t('characterCreation.pts')}
					</TraitCost>
				</TraitHeader>
				<TraitDescription>{trait.description}</TraitDescription>
				{wouldExceedBudget && !hasUnmetPrerequisites && (
					<PrerequisiteWarning>({t('characterCreation.notEnoughPoints')})</PrerequisiteWarning>
				)}
				{hasUnmetPrerequisites && (
					<PrerequisiteWarning>
						{trait.requirements?.hasTrait
							? `${t('characterCreation.requires')} any of: ${missingPrereqNames.join(', ')}`
							: `${t('characterCreation.requires')}: ${missingPrereqNames.join(', ')}`}
					</PrerequisiteWarning>
				)}
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
			</TraitCard>
		);
	}

	function renderAncestryTraits(ancestry: IAncestry) {
		return (
			<AncestrySection key={ancestry.id}>
				<SectionHeader>
					<AncestryName>{ancestry.name}</AncestryName>
				</SectionHeader>
				<div style={{ marginBottom: '2rem' }}>
					<h3
						style={{
							color: '#7DCFFF',
							borderBottom: '1px solid rgba(169, 177, 214, 0.2)',
							paddingBottom: '0.5rem',
							fontSize: '1.125rem',
							fontWeight: 'bold'
						}}
					>
						Default Traits
					</h3>
					<TraitGrid>
						{(ancestry.defaultTraitIds || []).map((traitId) => renderTraitItem(traitId))}
					</TraitGrid>
				</div>
				<div>
					<h3
						style={{
							color: '#7DCFFF',
							borderBottom: '1px solid rgba(169, 177, 214, 0.2)',
							paddingBottom: '0.5rem',
							fontSize: '1.125rem',
							fontWeight: 'bold'
						}}
					>
						Expanded Traits
					</h3>
					<TraitGrid>
						{(ancestry.expandedTraitIds || []).map((traitId) => renderTraitItem(traitId))}
					</TraitGrid>
				</div>
			</AncestrySection>
		);
	}

	return (
		<Container>
			<Header>
				<Title>{t('characterCreation.ancestryTraits')}</Title>
				<PointsDisplay
					style={{
						color: ancestryPointsRemaining < 0 ? '#F7768E' : '#A9B1D6'
					}}
				>
					{t('characterCreation.spent')}: {ancestryPointsSpent} | {t('characterCreation.remaining')}: {ancestryPointsRemaining}/
					{ancestryPointsSpent + ancestryPointsRemaining}
					{ancestryPointsRemaining < 0 && <span> {t('characterCreation.overBudget')}</span>}
				</PointsDisplay>
			</Header>
			{selectedAncestry1 && renderAncestryTraits(selectedAncestry1)}
			{selectedAncestry2 && renderAncestryTraits(selectedAncestry2)}
		</Container>
	);
}

export default SelectedAncestries;
