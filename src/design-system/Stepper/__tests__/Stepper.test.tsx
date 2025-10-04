/// <reference types="vitest/globals" />
/// <reference types="vite/client" />

import { render, screen } from '@testing-library/react';
import Stepper, { Step, StepStatus } from '../Stepper';

describe('Stepper', () => {
	it('renders without crashing and shows completed marker', () => {
		const steps: Step[] = [
			{ id: 'a', label: 'One', status: 'completed' as StepStatus },
			{ id: 'b', label: 'Two', status: 'in-progress' as StepStatus }
		];

		render(<Stepper steps={steps} current={1} />);

		// completed step shows check mark
		expect(screen.getByText('✓')).toBeTruthy();
		// labels are present
		expect(screen.getByText('One')).toBeTruthy();
		expect(screen.getByText('Two')).toBeTruthy();
	});
});
