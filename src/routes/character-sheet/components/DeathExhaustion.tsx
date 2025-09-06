import React from 'react';
import type { CharacterSheetData, CurrentValues } from '../../../types';
import { useCharacterResources, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import {
	StyledDeathExhaustionContainer,
	StyledExhaustionOnlyContainer,
	StyledExhaustionOnlyTitle
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
	const { state, updateExhaustion, updateDeathStep } = useCharacterSheet();
	const resources = useCharacterResources();
	
	if (!state.character || !resources) {
		return <div>Loading...</div>;
	}
	
	const characterData = state.character;
	const currentValues = resources?.current;
	
	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);
	
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
		
		console.log('Death step changed to:', step, isDead ? '(DEAD)' : '');
	};
	// Exhaustion level descriptions (based on DC20 rules)
	const exhaustionLevels = [
		{ level: 1, description: 'Fatigued: -1 to all Checks and Saves' },
		{ level: 2, description: 'Exhausted: -2 to all Checks and Saves' },
		{ level: 3, description: 'Debilitated: -3 to all Checks and Saves, Speed halved' },
		{ level: 4, description: 'Incapacitated: -4 to all Checks and Saves, Speed quartered' },
		{ level: 5, description: 'Unconscious: Helpless, cannot take actions' }
	];

	return (
		<StyledDeathExhaustionContainer $isMobile={effectiveIsMobile}>
			<StyledDeathContainer $isMobile={effectiveIsMobile}>
				<StyledDeathTitle $isMobile={effectiveIsMobile}>DEATH & HEALTH STATUS</StyledDeathTitle>

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
					const actualCurrentStep = currentValues.deathSteps > 0 ? currentValues.deathSteps : deathSteps.currentStep;
					const isActuallyDead = currentValues.isDead || deathSteps.isDead;

					return (
						<>
							<StyledHealthStatusTooltip data-tooltip={healthStatus.effects.join('\n')}>
								<StyledHealthStatus status={healthStatus.status}>
									{healthStatus.description.toUpperCase()}
								</StyledHealthStatus>
							</StyledHealthStatusTooltip>

							<div style={{ fontSize: '0.8rem', color: '#8b4513', marginBottom: '0.3rem' }}>
								DEATH THRESHOLD
							</div>
							<StyledDeathThreshold $isMobile={effectiveIsMobile}>{deathThreshold}</StyledDeathThreshold>

							{/* Death Steps - only show when on Death's Door */}
							{healthStatus.status === 'deaths-door' && (
								<StyledDeathStepsContainer $isMobile={effectiveIsMobile}>
									<StyledDeathStepsTitle $isMobile={effectiveIsMobile}>
										DEATH STEPS ({actualCurrentStep}/{deathSteps.maxSteps})
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
														{isDead ? 'Dead' : `${step} HP below 0`}
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

			<StyledExhaustionOnlyContainer $isMobile={effectiveIsMobile}>
				<StyledExhaustionOnlyTitle $isMobile={effectiveIsMobile}>EXHAUSTION</StyledExhaustionOnlyTitle>
				<StyledExhaustionContainer $isMobile={effectiveIsMobile}>
					{exhaustionLevels.map(({ level, description }) => (
						<StyledExhaustionLevel
							key={level}
							filled={level <= currentValues.exhaustionLevel}
							$isMobile={effectiveIsMobile}
							onClick={() => onExhaustionChange(level)}
						>
							{level}
							<StyledExhaustionTooltip>{description}</StyledExhaustionTooltip>
						</StyledExhaustionLevel>
					))}
				</StyledExhaustionContainer>
				{/* Show impact below the numbers */}
				{currentValues.exhaustionLevel > 0 && (
					<StyledExhaustionImpact>
						{exhaustionLevels.find(e => e.level === currentValues.exhaustionLevel)?.description}
					</StyledExhaustionImpact>
				)}
			</StyledExhaustionOnlyContainer>
		</StyledDeathExhaustionContainer>
	);
};

export default DeathExhaustion;
