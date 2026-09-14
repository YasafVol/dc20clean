import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ActiveConditionsTracker from './ActiveConditionsTracker';

vi.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (key: string) => key })
}));

afterEach(cleanup);

describe('ActiveConditionsTracker', () => {
	it('shows active stacks but disables condition mutations in read-only mode', () => {
		const onToggleCondition = vi.fn();
		const onSetConditionStacks = vi.fn();

		render(
			<ActiveConditionsTracker
				activeConditions={['bleeding-2']}
				onToggleCondition={onToggleCondition}
				onSetConditionStacks={onSetConditionStacks}
				readOnly
			/>
		);

		const condition = screen.getByText('Bleeding X').closest('label');
		expect(condition).not.toBeNull();
		expect(within(condition!).getByRole('checkbox')).toBeDisabled();
		expect(within(condition!).getByText('Stacks: 2')).toBeInTheDocument();
		expect(within(condition!).queryByRole('button', { name: '-' })).not.toBeInTheDocument();
		expect(within(condition!).queryByRole('button', { name: '+' })).not.toBeInTheDocument();
		expect(onToggleCondition).not.toHaveBeenCalled();
		expect(onSetConditionStacks).not.toHaveBeenCalled();
	});
});
