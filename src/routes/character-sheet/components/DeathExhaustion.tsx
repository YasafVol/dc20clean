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

import {
	getHealthStatus,
	calculateDeathThreshold,
	getDeathSteps
} from '../../../lib/rulesdata/death';

interface DeathExhaustionProps {
	// No props needed - data comes from context
}

const DeathExhaustion: React.FC<DeathExhaustionProps> = () => {
	const { state, updateExhaustion } = useCharacterSheet();
	const resources = useCharacterResources();
	
	if (!state.character) {
		return <div>Loading...</div>;
	}
	
	const characterData = state.character;
	const currentValues = resources.current;
	
	const onExhaustionChange = (level: number) => {
		updateExhaustion(level);
	};
	
	const onDeathStepChange = (step: number) => {
		// TODO: Add death step handling to reducer
		console.log('Death step change:', step);
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
		<StyledDeathExhaustionContainer>
			<StyledDeathContainer>
				<StyledDeathTitle>DEATH & HEALTH STATUS</StyledDeathTitle>

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
							<StyledDeathThreshold>{deathThreshold}</StyledDeathThreshold>

							{/* Death Steps - only show when on Death's Door */}
							{healthStatus.status === 'deaths-door' && (
								<StyledDeathStepsContainer>
									<StyledDeathStepsTitle>
										DEATH STEPS ({deathSteps.currentStep}/{deathSteps.maxSteps})
									</StyledDeathStepsTitle>
									<StyledDeathStepsGrid>
										{Array.from({ length: deathSteps.maxSteps }, (_, index) => {
											const step = index + 1;
											const isFilled = step <= deathSteps.currentStep;
											const isDead = deathSteps.isDead && step === deathSteps.maxSteps;

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

			<StyledExhaustionOnlyContainer>
				<StyledExhaustionOnlyTitle>EXHAUSTION</StyledExhaustionOnlyTitle>
				<StyledExhaustionContainer>
					{exhaustionLevels.map(({ level, description }) => (
						<StyledExhaustionLevel
							key={level}
							filled={level <= currentValues.exhaustionLevel}
							onClick={() => onExhaustionChange(level)}
						>
							{level}
							<StyledExhaustionTooltip>{description}</StyledExhaustionTooltip>
						</StyledExhaustionLevel>
					))}
				</StyledExhaustionContainer>
			</StyledExhaustionOnlyContainer>
		</StyledDeathExhaustionContainer>
	);
};

export default DeathExhaustion;
