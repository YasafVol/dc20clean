import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import InventoryPopup from './InventoryPopup';

vi.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (key: string) => key })
}));

afterEach(cleanup);

describe('InventoryPopup', () => {
	it('shows custom item details without editable fields in read-only mode', () => {
		render(
			<InventoryPopup
				selectedInventoryItem={{
					inventoryData: {
						id: 'custom-1',
						itemType: 'Custom',
						itemName: 'Field kit',
						count: 2,
						cost: '5g',
						description: 'Rope and climbing tools',
						isEquipped: false
					},
					item: null
				}}
				onClose={vi.fn()}
				onUpdateCustomItem={vi.fn()}
				readOnly
			/>
		);

		expect(screen.getByText('Rope and climbing tools')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument();
		expect(screen.getByText('5g')).toBeInTheDocument();
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
	});
});
