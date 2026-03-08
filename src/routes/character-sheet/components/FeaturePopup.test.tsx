import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeaturePopup from './FeaturePopup';

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => key
	})
}));

describe('FeaturePopup', () => {
	it('renders benefit mechanics when feature includes benefits', () => {
		render(
			<FeaturePopup
				feature={{
					id: 'rogue_roguish_finesse',
					name: 'Roguish Finesse',
					description: 'Blend agility, expertise, and opportunism in combat and exploration.',
					source: 'class',
					benefits: [
						{
							name: 'Cunning Action',
							description: 'Gain free movement when you Disengage, Feint, or Hide.'
						}
					]
				}}
				onClose={vi.fn()}
			/>
		);

		expect(screen.getByText('Roguish Finesse')).toBeInTheDocument();
		expect(screen.getByText(/Blend agility, expertise/i)).toBeInTheDocument();
		expect(screen.getByText(/Cunning Action:/i)).toBeInTheDocument();
		expect(screen.getByText(/Gain free movement/i)).toBeInTheDocument();
	});
});
