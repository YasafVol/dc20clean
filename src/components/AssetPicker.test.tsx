import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AssetPicker from './AssetPicker';

afterEach(cleanup);

describe('shared art picker', () => {
	it('filters the correct catalog, confirms a choice, and allows removal', () => {
		const onChange = vi.fn();
		const { rerender } = render(<AssetPicker kind="item" onChange={onChange} />);
		fireEvent.click(screen.getByRole('button', { name: 'Choose icon' }));
		const dialog = screen.getByRole('dialog', { name: 'Choose item icon' });
		fireEvent.change(screen.getByRole('textbox', { name: 'Search art' }), {
			target: { value: 'Sword' }
		});
		expect(dialog.querySelectorAll('button[aria-pressed]')).toHaveLength(2);
		fireEvent.click(screen.getByRole('button', { name: 'Sword 1' }));
		fireEvent.click(screen.getByRole('button', { name: 'Use selected art' }));
		expect(onChange).toHaveBeenCalledWith('icon-sword-01');

		rerender(<AssetPicker kind="item" value="icon-sword-01" onChange={onChange} />);
		expect(screen.getByRole('button', { name: 'Sword 1' })).toBeTruthy();
		fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
		expect(onChange).toHaveBeenLastCalledWith(undefined);
	});
});
