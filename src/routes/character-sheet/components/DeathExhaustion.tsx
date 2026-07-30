import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCharacterResources, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import {
	StyledDeathExhaustionContainer,
	StyledExhaustionOnlyContainer,
	StyledExhaustionOnlyTitle
} from '../styles/DeathExhaustion.styles';

import {
	StyledHealthStatus,
	StyledInlineHealthStatus,
	StyledHealthStatusTooltip
} from '../styles/Death';

import {
	StyledExhaustionContainer,
	StyledExhaustionLevel,
	StyledExhaustionTooltip
} from '../styles/Exhaustion';

import { StyledExhaustionImpact } from '../styles/ExhaustionImpact.styles';

import { getHealthStatus } from '../../../lib/rulesdata/death';

interface DeathExhaustionProps {
	isMobile?: boolean;
}

export const HealthStatusIndicator: React.FC<DeathExhaustionProps> = ({ isMobile }) => {
	const { state } = useCharacterSheet();
	const resources = useCharacterResources();

	if (!state.character || !resources) return null;

	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);
	const characterData = state.character;
	const deathThresholdMagnitude =
		characterData.finalDeathThreshold ??
		characterData.finalPrimeModifierValue + characterData.finalCombatMastery;
	const healthStatus = getHealthStatus(
		resources.current.currentHP,
		characterData.finalHPMax,
		-deathThresholdMagnitude
	);

	return (
		<StyledInlineHealthStatus $isMobile={effectiveIsMobile}>
			<StyledHealthStatusTooltip data-tooltip={healthStatus.effects.join('\n')}>
				<StyledHealthStatus $status={healthStatus.status}>
					{healthStatus.description.toUpperCase()}
				</StyledHealthStatus>
			</StyledHealthStatusTooltip>
		</StyledInlineHealthStatus>
	);
};

const DeathExhaustion: React.FC<DeathExhaustionProps> = ({ isMobile }) => {
	const { t } = useTranslation();
	const { state, updateExhaustion } = useCharacterSheet();
	const resources = useCharacterResources();

	if (!state.character || !resources) {
		return <div>{t('characterSheet.deathLoading')}</div>;
	}

	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);

	const currentValues = resources.current;

	const onExhaustionChange = (level: number) => {
		updateExhaustion(level);
	};

	// Exhaustion level descriptions (based on DC20 rules)
	const exhaustionLevels = [
		{ level: 1, description: t('characterSheet.exhaustion1') },
		{ level: 2, description: t('characterSheet.exhaustion2') },
		{ level: 3, description: t('characterSheet.exhaustion3') },
		{ level: 4, description: t('characterSheet.exhaustion4') },
		{ level: 5, description: t('characterSheet.exhaustion5') }
	];

	return (
		<StyledDeathExhaustionContainer $isMobile={effectiveIsMobile}>
			{/* Exhaustion — title | 1 2 3 4 5 (inline) */}
			<StyledExhaustionOnlyContainer data-testid="exhaustion-btn" $isMobile={effectiveIsMobile}>
				<StyledExhaustionOnlyTitle data-testid="exhaustion-btn" $isMobile={effectiveIsMobile}>
					{t('characterSheet.exhaustionTitle')}
				</StyledExhaustionOnlyTitle>
				<StyledExhaustionContainer $isMobile={effectiveIsMobile} style={{ marginLeft: 'auto' }}>
					{exhaustionLevels.map(({ level, description }) => (
						<StyledExhaustionLevel
							key={level}
							$filled={level <= currentValues.exhaustionLevel}
							$isMobile={effectiveIsMobile}
							onClick={() => {
								// Toggle: clicking same level clears it, clicking different level sets it
								if (currentValues.exhaustionLevel === level) {
									onExhaustionChange(0);
								} else {
									onExhaustionChange(level);
								}
							}}
							data-testid={`exhaustion-${level}`}
						>
							{level}
							<StyledExhaustionTooltip>{description}</StyledExhaustionTooltip>
						</StyledExhaustionLevel>
					))}
				</StyledExhaustionContainer>
			</StyledExhaustionOnlyContainer>

			{/* Optional Row 3a: Active exhaustion impact text (only when level > 0) */}
			{currentValues.exhaustionLevel > 0 && (
				<StyledExhaustionImpact>
					{exhaustionLevels.find((e) => e.level === currentValues.exhaustionLevel)?.description}
				</StyledExhaustionImpact>
			)}
		</StyledDeathExhaustionContainer>
	);
};

export default DeathExhaustion;
