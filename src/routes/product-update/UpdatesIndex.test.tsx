import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import UpdatesIndex from './UpdatesIndex';

describe('UpdatesIndex', () => {
	it('shows a compact release log with direct update and feature links', () => {
		render(
			<MemoryRouter>
				<UpdatesIndex />
			</MemoryRouter>
		);

		expect(screen.getByRole('heading', { name: "What's New", level: 1 })).toBeInTheDocument();
		expect(screen.getByRole('region', { name: 'Product updates' })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: 'The new character sheet' })).toBeInTheDocument();
		expect(screen.getByText('Character')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /^read$/i })).toHaveAttribute(
			'href',
			'/updates/2026-09-18-alternative-character-sheet'
		);
		expect(screen.getByRole('link', { name: /open the alternative sheet/i })).toHaveAttribute(
			'href',
			'/character2'
		);
		expect(screen.queryByText('From “new” to playable')).not.toBeInTheDocument();
	});
});
