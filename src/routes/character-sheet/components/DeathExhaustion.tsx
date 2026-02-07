import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCharacterResources, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import { logger } from '../../../lib/utils/logger';
import { theme } from '../styles/theme';
import {
	StyledDeathExhaustionContainer,
	StyledExhaustionOnlyContainer,
	StyledExhaustionOnlyTitle,
	StyledDeathThresholdLabel,
	StyledExhaustionHeader,
	StyledExhaustionInfoButton
} from '../styles/DeathExhaustion.styles';

import {
	StyledDeathContainer,
	StyledDeathTitle,
	StyledHealthStatus,
	StyledDeathThreshold,
	StyledDeathStepsContainer,
	StyledDeathStepsTitle,
	StyledDeathStepsGrid,
	StyledDeathStep,
	StyledDeathStepTooltip,
	StyledHealthStatusTooltip
} from '../styles/Death';

import {
	StyledExhaustionContainer,
	StyledExhaustionLevel,
	StyledExhaustionTooltip
} from '../styles/Exhaustion';

import { StyledExhaustionImpact } from '../styles/ExhaustionImpact.styles';

import {
	getHealthStatus,
	calculateDeathThreshold,
	getDeathSteps
} from '../../../lib/rulesdata/death';

interface DeathExhaustionProps {
	isMobile?: boolean;
}

const DeathExhaustion: React.FC<DeathExhaustionProps> = ({ isMobile }) => {
	const { t } = useTranslation();
	const { state, updateExhaustion, updateDeathStep } = useCharacterSheet();
	const resources = useCharacterResources();

	if (!state.character || !resources) {
		return <div>{t('characterSheet.deathLoading')}</div>;
	}

	const characterData = state.character;

	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);

	const currentValues = resources.current;

	const onExhaustionChange = (level: number) => {
		updateExhaustion(level);
	};

	const onDeathStepChange = (step: number) => {
		// Calculate death threshold and max steps
		const deathThreshold = calculateDeathThreshold(
			characterData.finalPrimeModifierValue,
			characterData.finalCombatMastery
		);
		const deathSteps = getDeathSteps(currentValues.currentHP, deathThreshold);

		// Check if clicking on final step should mark as dead
		const isDead = step === deathSteps.maxSteps;

		// Update the death step in state
		updateDeathStep(step, isDead);

		logger.debug('ui', 'Death step changed', { step, isDead });
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
			<StyledDeathContainer $isMobile={effectiveIsMobile}>
				<StyledDeathTitle $isMobile={effectiveIsMobile}>{t('characterSheet.deathHealthStatus')}</StyledDeathTitle>

				{/* Health Status */}
				{(() => {
					const deathThreshold = calculateDeathThreshold(
						characterData.finalPrimeModifierValue,
						characterData.finalCombatMastery
					);
					const healthStatus = getHealthStatus(
						currentValues.currentHP,
						characterData.finalHPMax,
						deathThreshold
					);
					const deathSteps = getDeathSteps(currentValues.currentHP, deathThreshold);

					// Use manual death step tracking if it exists, otherwise use calculated values
					const actualCurrentStep =
						currentValues.deathSteps > 0 ? currentValues.deathSteps : deathSteps.currentStep;
					const isActuallyDead = currentValues.isDead || deathSteps.isDead;

					return (
						<>
							<StyledHealthStatusTooltip data-tooltip={healthStatus.effects.join('\n')}>
								<StyledHealthStatus status={healthStatus.status}>
									{healthStatus.description.toUpperCase()}
								</StyledHealthStatus>
							</StyledHealthStatusTooltip>

							<StyledDeathThresholdLabel>{t('characterSheet.deathThreshold')}</StyledDeathThresholdLabel>
							<StyledDeathThreshold $isMobile={effectiveIsMobile}>
								{deathThreshold}
							</StyledDeathThreshold>

							{/* Death Steps - only show when on Death's Door */}
							{healthStatus.status === 'deaths-door' && (
								<StyledDeathStepsContainer $isMobile={effectiveIsMobile}>
									<StyledDeathStepsTitle $isMobile={effectiveIsMobile}>
								{t('characterSheet.deathSteps')} ({actualCurrentStep}/{deathSteps.maxSteps})
									</StyledDeathStepsTitle>
									<StyledDeathStepsGrid $isMobile={effectiveIsMobile}>
										{Array.from({ length: deathSteps.maxSteps }, (_, index) => {
											const step = index + 1;
											const isFilled = step <= actualCurrentStep;
											const isDead = isActuallyDead && step === deathSteps.maxSteps;

											return (
												<StyledDeathStep
													key={step}
													filled={isFilled}
													isDead={isDead}
													onClick={() => onDeathStepChange(step)}
												>
													{!isDead && step}
													<StyledDeathStepTooltip>
													{isDead ? t('characterSheet.deathDead') : t('characterSheet.deathHPBelow', { step })}
													</StyledDeathStepTooltip>
												</StyledDeathStep>
											);
										})}
									</StyledDeathStepsGrid>
								</StyledDeathStepsContainer>
							)}
						</>
					);
				})()}
			</StyledDeathContainer>
			<StyledExhaustionOnlyContainer data-testid="exhaustion-btn" $isMobile={effectiveIsMobile}>
				<StyledExhaustionHeader>
					<StyledExhaustionOnlyTitle data-testid="exhaustion-btn" $isMobile={effectiveIsMobile}>
						{t('characterSheet.exhaustionTitle')}
					</StyledExhaustionOnlyTitle>
				</StyledExhaustionHeader>
				<StyledExhaustionContainer $isMobile={effectiveIsMobile}>
					{exhaustionLevels.map(({ level, description }) => (
						<StyledExhaustionLevel
							key={level}
							filled={level <= currentValues.exhaustionLevel}
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
				{/* Show impact below the numbers */}
				{currentValues.exhaustionLevel > 0 && (
					<StyledExhaustionImpact>
						{exhaustionLevels.find((e) => e.level === currentValues.exhaustionLevel)?.description}
					</StyledExhaustionImpact>
				)}
			</StyledExhaustionOnlyContainer>
		</StyledDeathExhaustionContainer>
	);
};

export default DeathExhaustion;
