import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AlternativeSheetUpdate from './AlternativeSheetUpdate';

describe('AlternativeSheetUpdate', () => {
	it('summarizes the player-facing alternative sheet update', () => {
		render(
			<MemoryRouter>
				<AlternativeSheetUpdate />
			</MemoryRouter>
		);

		expect(
			screen.getByRole('heading', { name: 'The new character sheet', level: 1 })
		).toBeInTheDocument();
		expect(screen.getByText('Allowed spells or all spells')).toBeInTheDocument();
		expect(screen.getByText('Full tactical preview')).toBeInTheDocument();
		expect(screen.getByText('Campaign-ready records')).toBeInTheDocument();

		const openCharacterLinks = screen.getAllByRole('link', {
			name: /open your characters|try the new sheet/i
		});
		expect(openCharacterLinks).toHaveLength(2);
		openCharacterLinks.forEach((link) => expect(link).toHaveAttribute('href', '/load-character'));
	});
});
