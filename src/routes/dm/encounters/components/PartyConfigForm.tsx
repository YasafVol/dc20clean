/**
 * Party Config Form Component
 *
 * Configure party size and level.
 */

import React from 'react';
import type { PartyConfig } from '../../../../lib/rulesdata/schemas/encounter.schema';
import {
	PartyConfigGrid,
	FormGroup,
	FormLabel,
	PartyStatDisplay,
	PartyStatLabel,
	PartyStatValue
} from '../styles/EncounterStyles';

export interface PartyConfigFormProps {
	party: PartyConfig;
	baseBudget: number;
	onSizeChange: (size: number) => void;
	onLevelChange: (level: number) => void;
}

export const PartyConfigForm: React.FC<PartyConfigFormProps> = ({
	party,
	baseBudget,
	onSizeChange,
	onLevelChange
}) => {
	return (
		<PartyConfigGrid>
			<FormGroup>
				<FormLabel>Party Size</FormLabel>
				<select
					value={party.size}
					onChange={(e) => onSizeChange(parseInt(e.target.value, 10))}
					className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
				>
					{[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
						<option key={n} value={n}>
							{n} {n === 1 ? 'Player' : 'Players'}
						</option>
					))}
				</select>
			</FormGroup>

			<FormGroup>
				<FormLabel>Average Level</FormLabel>
				<select
					value={party.averageLevel}
					onChange={(e) => onLevelChange(parseInt(e.target.value, 10))}
					className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
				>
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
						<option key={n} value={n}>
							Level {n}
						</option>
					))}
				</select>
			</FormGroup>

			<PartyStatDisplay>
				<PartyStatLabel>Base Budget</PartyStatLabel>
				<PartyStatValue>{baseBudget}</PartyStatValue>
			</PartyStatDisplay>
		</PartyConfigGrid>
	);
};

export default PartyConfigForm;
