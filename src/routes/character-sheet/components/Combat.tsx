import React from 'react';
import type { CharacterSheetData, CurrentValues } from '../../../types';
import { 
	StyledCombatSection, 
	StyledActionPoints, 
	StyledActionPoint,
	StyledCombatTitle,
	StyledActionPointsContainer,
	StyledActionPointsTitle,
	StyledCombatStatsContainer,
	StyledCombatStatRow,
	StyledCombatStatLabel,
	StyledCombatStatValue
} from '../styles/Combat';
import Tooltip from './Tooltip';
import { createEnhancedTooltip } from './EnhancedStatTooltips';
import { useCharacterResources, useCharacterSheet } from '../hooks/CharacterSheetProvider';

export interface CombatProps {
	// No props needed - all data comes from Provider
}

const Combat: React.FC<CombatProps> = () => {
	const { state, updateActionPoints } = useCharacterSheet();
	const resources = useCharacterResources();
	
	if (!state.character || !resources) {
		return <div>Loading combat...</div>;
	}
	
	const characterData = state.character;
	const currentValues = resources.current;
	
	// Get breakdowns from character data (Provider pattern)
	const breakdowns = characterData.breakdowns || {};
	
	const renderActionPoints = () => {
		return [0, 1, 2, 3].map((index) => (
			<StyledActionPoint
				key={index}
				used={index < (currentValues.actionPointsUsed || 0)}
				onClick={() => {
					const currentUsed = currentValues.actionPointsUsed || 0;
					const targetUsed = index + 1; // Circle number (1-4)
					
					if (currentUsed >= targetUsed) {
						// Already used this circle or higher, so reduce to previous level
						updateActionPoints(targetUsed - 1);
					} else {
						// Not used yet, so set to this level
						updateActionPoints(targetUsed);
					}
				}}
			>
				{index + 1}
			</StyledActionPoint>
		));
	};

	return (
		<StyledCombatSection>
			<StyledCombatTitle>COMBAT</StyledCombatTitle>

			{/* Action Points */}
			<StyledActionPointsContainer>
				<StyledActionPointsTitle>ACTION POINTS</StyledActionPointsTitle>
				<StyledActionPoints>{renderActionPoints()}</StyledActionPoints>
			</StyledActionPointsContainer>

			{/* Combat Stats */}
			<StyledCombatStatsContainer>
				<StyledCombatStatRow>
					<StyledCombatStatLabel>
						<Tooltip
							content={
								breakdowns?.attack_spell_check 
									? createEnhancedTooltip('Attack / Spell Check', breakdowns.attack_spell_check)
									: `Combat Mastery (${characterData.finalCombatMastery}) + Prime Modifier (${characterData.finalPrimeModifierValue})`
							}
							position="top"
						>
							<span>ATTACK / SPELL CHECK</span>
						</Tooltip>
					</StyledCombatStatLabel>
					<StyledCombatStatValue>
						+{characterData.finalAttackSpellCheck || 0}
					</StyledCombatStatValue>
				</StyledCombatStatRow>
				
				<StyledCombatStatRow>
					<StyledCombatStatLabel>
						<Tooltip
							content={
								breakdowns?.save_dc
									? createEnhancedTooltip('Save DC', breakdowns.save_dc)
									: `8 + Combat Mastery (${characterData.finalCombatMastery}) + Prime Modifier (${characterData.finalPrimeModifierValue})`
							}
							position="top"
						>
							<span>SAVE DC</span>
						</Tooltip>
					</StyledCombatStatLabel>
					<StyledCombatStatValue>{characterData.finalSaveDC}</StyledCombatStatValue>
				</StyledCombatStatRow>
				
				<StyledCombatStatRow>
					<StyledCombatStatLabel>
						<Tooltip
							content={
								breakdowns?.initiative
									? createEnhancedTooltip('Initiative', breakdowns.initiative)
									: `Combat Mastery (${characterData.finalCombatMastery}) + Agility modifier: +${characterData.finalAgility || 0}`
							}
							position="top"
						>
							<span>INITIATIVE</span>
						</Tooltip>
					</StyledCombatStatLabel>
					<StyledCombatStatValue>
						+{characterData.finalInitiativeBonus || 0}
					</StyledCombatStatValue>
				</StyledCombatStatRow>

				<StyledCombatStatRow>
					<StyledCombatStatLabel>
						<Tooltip
							content={
								breakdowns?.martial_check
									? createEnhancedTooltip('Martial Check', breakdowns.martial_check)
									: `Higher of Acrobatics or Athletics skill totals`
							}
							position="top"
						>
							<span>MARTIAL CHECK</span>
						</Tooltip>
					</StyledCombatStatLabel>
					<StyledCombatStatValue>
						+{characterData.finalMartialCheck || 0}
					</StyledCombatStatValue>
				</StyledCombatStatRow>
			</StyledCombatStatsContainer>
		</StyledCombatSection>
	);
};

export default Combat;
