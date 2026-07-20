import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { calculateFillPercentages, StatCard } from './StatCard';

afterEach(cleanup);

describe('StatCard HP range', () => {
	it('reserves one quarter of the bar for negative HP and three quarters for positive HP', () => {
		expect(calculateFillPercentages(-5, 8, -5)).toEqual({
			normal: 0,
			temp: 0,
			negative: 25,
			zero: 25
		});
		expect(calculateFillPercentages(0, 8, -5)).toEqual({
			normal: 0,
			temp: 0,
			negative: 0,
			zero: 25
		});
		expect(calculateFillPercentages(8, 8, -5)).toEqual({
			normal: 75,
			temp: 0,
			negative: 0,
			zero: 25
		});
	});

	it('keeps temporary HP as a separate bar segment without adding it to current HP', () => {
		const fill = calculateFillPercentages(3, 8, -5, 2);

		expect(fill.normal).toBeCloseTo((3 / 10) * 75);
		expect(fill.temp).toBeCloseTo((2 / 10) * 75);
		expect(fill.negative).toBe(0);
		expect(fill.zero).toBe(25);
	});

	it('renders a subtle zero marker at the negative-to-positive boundary', () => {
		render(<StatCard label="HP" current={0} max={8} min={-5} onChange={vi.fn()} />);

		expect(screen.getByTestId('zero-hp-marker')).toHaveStyle({ left: '25%' });
	});

	it('anchors negative HP to zero so its width animation grows right-to-left', () => {
		render(<StatCard label="HP" current={-2} max={8} min={-5} onChange={vi.fn()} />);

		expect(screen.getByTestId('negative-hp-fill')).toHaveStyle({ right: '75%' });
	});

	it('changes temporary HP without changing current HP', () => {
		const onChange = vi.fn();
		const onTempChange = vi.fn();
		render(
			<StatCard
				label="HP"
				current={3}
				max={8}
				temp={2}
				onChange={onChange}
				onTempChange={onTempChange}
			/>
		);

		fireEvent.click(screen.getByRole('button', { name: 'Increase Temp HP' }));
		expect(onTempChange).toHaveBeenCalledWith(3);
		expect(onChange).not.toHaveBeenCalled();

		onTempChange.mockClear();
		fireEvent.click(screen.getByRole('button', { name: 'Decrease Temp HP' }));
		expect(onTempChange).toHaveBeenCalledWith(1);
		expect(onChange).not.toHaveBeenCalled();
	});

	it('consumes temporary HP before reducing current HP', () => {
		const onChange = vi.fn();
		const onTempChange = vi.fn();
		const { rerender } = render(
			<StatCard
				label="HP"
				current={3}
				max={8}
				temp={2}
				onChange={onChange}
				onTempChange={onTempChange}
			/>
		);

		fireEvent.click(screen.getByRole('button', { name: 'Decrease HP' }));
		expect(onTempChange).toHaveBeenCalledWith(1);
		expect(onChange).not.toHaveBeenCalled();

		rerender(
			<StatCard
				label="HP"
				current={3}
				max={8}
				temp={0}
				onChange={onChange}
				onTempChange={onTempChange}
			/>
		);
		fireEvent.click(screen.getByRole('button', { name: 'Decrease HP' }));
		expect(onChange).toHaveBeenCalledWith(2);
	});

	it('places decrement controls on the left and increment controls on the right', () => {
		render(
			<StatCard label="HP" current={3} max={8} temp={2} onChange={vi.fn()} onTempChange={vi.fn()} />
		);

		expect(
			screen.getAllByRole('button').map((button) => button.getAttribute('aria-label'))
		).toEqual(['Decrease HP', 'Increase HP', 'Decrease Temp HP', 'Increase Temp HP']);
	});

	it('renders inline content immediately after the progress bar', () => {
		render(
			<StatCard
				label="HP"
				current={-1}
				max={8}
				onChange={vi.fn()}
				afterProgressBar={<div data-testid="inline-death-steps">Death Steps</div>}
			/>
		);

		expect(screen.getByTestId('resource-progress-bar').nextElementSibling).toBe(
			screen.getByTestId('inline-death-steps')
		);
	});

	it('allows HP to decrease below zero but not below the death threshold', () => {
		const onChange = vi.fn();
		const { rerender } = render(
			<StatCard label="HP" current={0} max={8} min={-5} onChange={onChange} />
		);

		fireEvent.click(screen.getByRole('button', { name: 'Decrease HP' }));
		expect(onChange).toHaveBeenCalledWith(-1);

		onChange.mockClear();
		rerender(<StatCard label="HP" current={-5} max={8} min={-5} onChange={onChange} />);
		fireEvent.click(screen.getByRole('button', { name: 'Decrease HP' }));
		expect(onChange).not.toHaveBeenCalled();
	});
});
