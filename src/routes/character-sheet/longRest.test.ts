import { describe, expect, it, vi } from 'vitest';
import { restoreLongRestResources } from './longRest';

describe('restoreLongRestResources', () => {
	it('restores all renewable resources including Grit', () => {
		const actions = {
			updateHP: vi.fn(),
			updateMP: vi.fn(),
			updateSP: vi.fn(),
			updateRestPoints: vi.fn(),
			updateGritPoints: vi.fn(),
			updateTempHP: vi.fn(),
			updateExhaustion: vi.fn()
		};

		restoreLongRestResources({ hp: 18, mana: 6, stamina: 4, rest: 18, grit: 5 }, actions);

		expect(actions.updateHP).toHaveBeenCalledWith(18);
		expect(actions.updateMP).toHaveBeenCalledWith(6);
		expect(actions.updateSP).toHaveBeenCalledWith(4);
		expect(actions.updateRestPoints).toHaveBeenCalledWith(18);
		expect(actions.updateGritPoints).toHaveBeenCalledWith(5);
		expect(actions.updateTempHP).toHaveBeenCalledWith(0);
		expect(actions.updateExhaustion).toHaveBeenCalledWith(0);
	});
});
