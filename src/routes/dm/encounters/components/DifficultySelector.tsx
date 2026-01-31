/**
 * Difficulty Selector Component
 *
 * Select encounter difficulty with budget preview.
 */

import React from 'react';
import { calculateDifficultyThresholds } from '../../../../lib/services/encounterBudgetCalculator';
import {
	ENCOUNTER_DIFFICULTIES,
	type EncounterDifficulty,
	type PartyConfig,
} from '../../../../lib/rulesdata/schemas/encounter.schema';
import {
	DifficultyGrid,
	DifficultyButton,
	DifficultyName,
	DifficultyBudget,
} from '../styles/EncounterStyles';

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

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
	value,
	party,
	onChange,
}) => {
	const thresholds = calculateDifficultyThresholds(party);

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
				</DifficultyButton>
			))}
		</DifficultyGrid>
	);
};

export default DifficultySelector;
