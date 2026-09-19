import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import UpdatesIndex from './UpdatesIndex';

describe('UpdatesIndex', () => {
	it('shows the path from release note to the live feature', () => {
		render(
			<MemoryRouter>
				<UpdatesIndex />
			</MemoryRouter>
		);

		expect(screen.getByRole('heading', { name: "What's New", level: 1 })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /homepage: see the latest release/i })).toHaveAttribute(
			'href',
			'/menu'
		);
		expect(
			screen.getByRole('link', { name: /update detail: understand what changed/i })
		).toHaveAttribute('href', '/updates/2026-09-18-alternative-character-sheet');
		expect(
			screen.getByRole('link', { name: /try the change: open the live page/i })
		).toHaveAttribute('href', '/character2');
		expect(screen.getByRole('link', { name: /read the full update/i })).toHaveAttribute(
			'href',
			'/updates/2026-09-18-alternative-character-sheet'
		);
		screen
			.getAllByRole('link', { name: /open the alternative sheet/i })
			.forEach((link) => expect(link).toHaveAttribute('href', '/character2'));
	});
});
