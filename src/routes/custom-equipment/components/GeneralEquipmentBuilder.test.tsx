import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getAllCustomGeneralEquipment } from '../../../lib/rulesdata/equipment/storage/equipmentStorage';
import GeneralEquipmentBuilder from './GeneralEquipmentBuilder';

describe('GeneralEquipmentBuilder', () => {
	const values = new Map<string, string>();

	beforeEach(() => {
		values.clear();
		vi.stubGlobal('localStorage', {
			getItem: (key: string) => values.get(key) ?? null,
			setItem: (key: string, value: string) => values.set(key, value),
			removeItem: (key: string) => values.delete(key),
			clear: () => values.clear()
		});
	});

	afterEach(() => {
		cleanup();
		vi.unstubAllGlobals();
	});

	it('saves a reusable non-mechanical item', () => {
		const onBack = vi.fn();
		render(<GeneralEquipmentBuilder onBack={onBack} />);

		expect(
			(screen.getByRole('button', { name: 'Continue to review' }) as HTMLButtonElement).disabled
		).toBe(true);
		fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Climbing Kit' } });
		fireEvent.change(screen.getByLabelText('Description / Notes'), {
			target: { value: 'Rope, pitons, and a compact hammer.' }
		});
		fireEvent.change(screen.getByLabelText('Cost'), { target: { value: '8g' } });
		fireEvent.click(screen.getByRole('button', { name: 'Continue to review' }));
		expect(screen.getAllByText('Rope, pitons, and a compact hammer.').length).toBeGreaterThan(0);
		fireEvent.click(screen.getByRole('button', { name: 'Save Equipment' }));

		expect(getAllCustomGeneralEquipment()).toEqual([
			expect.objectContaining({
				category: 'general',
				name: 'Climbing Kit',
				description: 'Rope, pitons, and a compact hammer.',
				cost: '8g',
				properties: [],
				effects: []
			})
		]);
		expect(onBack).toHaveBeenCalledOnce();
	});
});
