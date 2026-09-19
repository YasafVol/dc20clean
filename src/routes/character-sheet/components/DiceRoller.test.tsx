import { createRef } from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DiceRoller, { type DiceRollerRef } from './DiceRoller';

describe('DiceRoller', () => {
	afterEach(() => {
		cleanup();
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it('uses the requested modifier and label for an automatic roll', async () => {
		vi.useFakeTimers();
		vi.spyOn(Math, 'random').mockReturnValue(0.45);
		const onRoll = vi.fn();
		const roller = createRef<DiceRollerRef>();
		render(<DiceRoller ref={roller} onRoll={onRoll} />);

		act(() => {
			roller.current?.addRollWithModifier(5, 'Attack', 'normal');
		});
		await act(async () => {
			await vi.advanceTimersByTimeAsync(1200);
		});

		expect(onRoll).toHaveBeenCalledOnce();
		const [results, total, mode, modifier, label] = onRoll.mock.calls[0];
		expect(results).toEqual([expect.objectContaining({ type: 'd20', value: 10, isChosen: true })]);
		expect(total).toBe(15);
		expect(mode).toBe('normal');
		expect(modifier).toBe(5);
		expect(label).toBe('Attack');
	});
});
