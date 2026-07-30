import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import CalculationTooltip from './CalculationTooltip';

afterEach(cleanup);

describe('CalculationTooltip', () => {
	it('renders an additional Death Threshold calculation table', () => {
		render(
			<CalculationTooltip
				title="HP Calculation"
				breakdown={{
					statName: 'hpMax',
					baseLabel: 'Level 3 · Bard',
					base: 5,
					effects: [{ name: 'Might', value: 3 }],
					total: 8
				}}
				additionalBreakdowns={[
					{
						title: 'Death Threshold',
						breakdown: {
							statName: 'deathThreshold',
							baseLabel: 'Prime Attribute (Agility)',
							base: -3,
							effects: [{ name: 'Combat Mastery', value: -2 }],
							total: -5
						}
					}
				]}
				visible
				positionX={100}
				positionY={100}
			/>
		);

		expect(screen.getByText('Death Threshold')).toBeInTheDocument();
		expect(screen.getByText('Prime Attribute (Agility)')).toBeInTheDocument();
		expect(screen.getByText('Combat Mastery')).toBeInTheDocument();
		expect(screen.getByText('-5')).toBeInTheDocument();
	});
});
