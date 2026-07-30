import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RowEditControls from './RowEditControls';

afterEach(cleanup);

describe('RowEditControls', () => {
	it('shows edit without delete until the row enters edit mode', () => {
		const onToggle = vi.fn();
		const onDelete = vi.fn();
		const { rerender } = render(
			<RowEditControls
				isEditing={false}
				onToggle={onToggle}
				onDelete={onDelete}
				itemLabel="spell slot"
			/>
		);

		fireEvent.click(screen.getByRole('button', { name: 'Edit spell slot' }));
		expect(onToggle).toHaveBeenCalledOnce();
		expect(screen.queryByTitle('Delete spell slot')).not.toBeInTheDocument();

		rerender(
			<RowEditControls isEditing onToggle={onToggle} onDelete={onDelete} itemLabel="spell slot" />
		);

		expect(screen.getByRole('button', { name: 'Finish editing spell slot' })).toBeInTheDocument();
		fireEvent.click(screen.getByTitle('Delete spell slot'));
		expect(onDelete).toHaveBeenCalledOnce();
	});
});
