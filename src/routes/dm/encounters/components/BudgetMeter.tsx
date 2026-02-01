/**
 * Budget Meter Component
 *
 * Visual budget display with status indicators.
 */

import React from 'react';
import type { BudgetStatus } from '../../../../lib/rulesdata/schemas/encounter.schema';
import {
	BudgetContainer,
	BudgetHeader,
	BudgetLabel,
	BudgetValue,
	BudgetBarContainer,
	BudgetBar,
	BudgetStatusText,
} from '../styles/EncounterStyles';

export interface BudgetMeterProps {
	spent: number;
	budget: number;
	status: BudgetStatus;
	percentage: number;
}

const STATUS_MESSAGES: Record<BudgetStatus, string> = {
	under: 'Under budget — may be too easy',
	on_target: 'On target — balanced encounter',
	slightly_over: 'Slightly over — challenging',
	over: 'Over budget — very difficult!',
};

export const BudgetMeter: React.FC<BudgetMeterProps> = ({
	spent,
	budget,
	status,
	percentage,
}) => {
	return (
		<BudgetContainer>
			<BudgetHeader>
				<BudgetLabel>Budget</BudgetLabel>
				<BudgetValue $status={status}>
					{spent} / {budget}
				</BudgetValue>
			</BudgetHeader>

			<BudgetBarContainer>
				<BudgetBar $percentage={percentage} $status={status} />
			</BudgetBarContainer>

			<BudgetStatusText $status={status}>
				{Math.round(percentage)}% — {STATUS_MESSAGES[status]}
			</BudgetStatusText>
		</BudgetContainer>
	);
};

export default BudgetMeter;
