import React from 'react';
import { useTranslation } from 'react-i18next';
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
import {
	useCharacterResources,
	useCharacterSheet,
	useCharacterCalculatedData
} from '../hooks/CharacterSheetProvider';

export interface CombatProps {
	isMobile?: boolean;
}

const Combat: React.FC<CombatProps> = ({ isMobile }) => {
	const { t } = useTranslation();
	const { state, updateActionPoints } = useCharacterSheet();
	const resources = useCharacterResources();
	const calculatedData = useCharacterCalculatedData();

	if (!state.character || !resources || !calculatedData) {
		return <div>{t('characterSheet.combatLoading')}</div>;
	}

	const currentValues = resources.current;

	// Get breakdowns from calculated data (Provider pattern)
	const breakdowns = calculatedData.breakdowns || {};

	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);

	const renderActionPoints = () => {
		return [0, 1, 2, 3].map((index) => (
			<StyledActionPoint
				key={index}
				used={index < (currentValues.actionPointsUsed || 0)}
				$isMobile={effectiveIsMobile}
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
		<StyledCombatSection $isMobile={effectiveIsMobile}>
			<StyledCombatTitle $isMobile={effectiveIsMobile}>{t('characterSheet.combatTitle')}</StyledCombatTitle>

			{/* Action Points */}
			<StyledActionPointsContainer $isMobile={effectiveIsMobile}>
				<StyledActionPointsTitle $isMobile={effectiveIsMobile}>
					{t('characterSheet.combatActionPoints')}
				</StyledActionPointsTitle>
				<StyledActionPoints $isMobile={effectiveIsMobile}>
					{renderActionPoints()}
				</StyledActionPoints>
			</StyledActionPointsContainer>

			{/* Combat Stats */}
			<StyledCombatStatsContainer $isMobile={effectiveIsMobile}>
				<StyledCombatStatRow>
					<StyledCombatStatLabel>
						<Tooltip
							content={
								breakdowns?.attack_spell_check
									? createEnhancedTooltip('Attack / Spell Check', breakdowns.attack_spell_check)
									: `Combat Mastery (${calculatedData.stats.finalCombatMastery}) + Prime Modifier (${calculatedData.stats.finalPrimeModifierValue})`
							}
							position="top"
						>
							<span>{t('characterSheet.combatAttackSpellCheck')}</span>
						</Tooltip>
					</StyledCombatStatLabel>
					<StyledCombatStatValue>
						+{calculatedData.stats.finalAttackSpellCheck || 0}
					</StyledCombatStatValue>
				</StyledCombatStatRow>

				<StyledCombatStatRow>
					<StyledCombatStatLabel>
						<Tooltip
							content={
								breakdowns?.save_dc
									? createEnhancedTooltip('Save DC', breakdowns.save_dc)
									: `8 + Combat Mastery (${calculatedData.stats.finalCombatMastery}) + Prime Modifier (${calculatedData.stats.finalPrimeModifierValue})`
							}
							position="top"
						>
							<span>{t('characterSheet.combatSaveDC')}</span>
						</Tooltip>
					</StyledCombatStatLabel>
					<StyledCombatStatValue>{calculatedData.stats.finalSaveDC}</StyledCombatStatValue>
				</StyledCombatStatRow>

				<StyledCombatStatRow>
					<StyledCombatStatLabel>
						<Tooltip
							content={
								breakdowns?.initiative
									? createEnhancedTooltip('Initiative', breakdowns.initiative)
									: `Combat Mastery (${calculatedData.stats.finalCombatMastery}) + Agility modifier: +${calculatedData.stats.finalAgility || 0}`
							}
							position="top"
						>
							<span>{t('characterSheet.combatInitiative')}</span>
						</Tooltip>
					</StyledCombatStatLabel>
					<StyledCombatStatValue>
						+{calculatedData.stats.finalInitiativeBonus || 0}
					</StyledCombatStatValue>
				</StyledCombatStatRow>

				<StyledCombatStatRow>
					<StyledCombatStatLabel>
						<Tooltip
							content={
								breakdowns?.martial_check
									? createEnhancedTooltip('Martial Check', breakdowns.martial_check)
									: `Max of Acrobatics or Athletics skill checks`
							}
							position="top"
						>
							<span>{t('characterSheet.combatMartialCheck')}</span>
						</Tooltip>
					</StyledCombatStatLabel>
					<StyledCombatStatValue>
						+{calculatedData.stats.finalMartialCheck || 0}
					</StyledCombatStatValue>
				</StyledCombatStatRow>
			</StyledCombatStatsContainer>
		</StyledCombatSection>
	);
};

export default Combat;
