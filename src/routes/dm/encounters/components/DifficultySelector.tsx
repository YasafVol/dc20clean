/**
 * Difficulty Selector Component
 *
 * Select encounter difficulty with budget preview and calculation formula.
 */

import React from 'react';
import {
	calculateDifficultyThresholds,
	calculateBaseBudget,
	calculateDifficultyModifier,
} from '../../../../lib/services/encounterBudgetCalculator';
import {
	ENCOUNTER_DIFFICULTIES,
	DIFFICULTY_MODIFIERS,
	type EncounterDifficulty,
	type PartyConfig,
} from '../../../../lib/rulesdata/schemas/encounter.schema';
import {
	DifficultyGrid,
	DifficultyButton,
	DifficultyName,
	DifficultyBudget,
} from '../styles/EncounterStyles';
import styled from 'styled-components';

export interface DifficultySelectorProps {
	value: EncounterDifficulty;
	party: PartyConfig;
	onChange: (difficulty: EncounterDifficulty) => void;
}

const DIFFICULTY_LABELS: Record<EncounterDifficulty, string> = {
	trivial: 'Trivial',
	easy: 'Easy',
	medium: 'Medium',
	hard: 'Hard',
	deadly: 'Deadly',
};

const DifficultyCalculation = styled.div`
	font-size: 0.625rem;
	color: #71717a;
	margin-top: 0.25rem;
	font-family: monospace;
`;

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
	value,
	party,
	onChange,
}) => {
	const thresholds = calculateDifficultyThresholds(party);
	const baseBudget = calculateBaseBudget(party);

	const getCalculationString = (difficulty: EncounterDifficulty): string => {
		const modifier = DIFFICULTY_MODIFIERS[difficulty];
		const modValue = calculateDifficultyModifier(difficulty, party.averageLevel);
		
		if (modifier === 0) {
			return `${baseBudget}`;
		}
		
		const sign = modifier > 0 ? '+' : '';
		return `${baseBudget} ${sign}${modValue}`;
	};

	return (
		<DifficultyGrid>
			{ENCOUNTER_DIFFICULTIES.map((difficulty) => (
				<DifficultyButton
					key={difficulty}
					$selected={value === difficulty}
					$difficulty={difficulty}
					onClick={() => onChange(difficulty)}
					type="button"
				>
					<DifficultyName $selected={value === difficulty}>
						{DIFFICULTY_LABELS[difficulty]}
					</DifficultyName>
					<DifficultyBudget>{thresholds[difficulty]}</DifficultyBudget>
					<DifficultyCalculation>
						{getCalculationString(difficulty)}
					</DifficultyCalculation>
				</DifficultyButton>
			))}
		</DifficultyGrid>
	);
};

export default DifficultySelector;
