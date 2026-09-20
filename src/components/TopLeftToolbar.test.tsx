import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import TopLeftToolbar from './TopLeftToolbar';

vi.mock('react-i18next', () => ({
	useTranslation: () => {
		const translations: Record<string, string> = {
			'menu.whatsNew': "What's New",
			'menu.characterSection': 'Character',
			'menu.createCharacter': 'Create Character',
			'menu.loadCharacter': 'Load Character',
			'menu.referenceToolsSection': 'Reference Tools',
			'menu.spellbook': 'Spellbook',
			'menu.martialManual': 'Martial Manual',
			'menu.conditions': 'Conditions',
			'menu.equipage': 'Equipage',
			'menu.rulebook': 'Rule Book',
			'common.backToMenu': 'Back to Menu'
		};
		return { t: (key: string) => translations[key] ?? key };
	}
}));

describe('TopLeftToolbar', () => {
	afterEach(cleanup);

	it('opens the homepage navigation with every public homepage action', () => {
		render(
			<MemoryRouter initialEntries={['/menu']}>
				<TopLeftToolbar />
			</MemoryRouter>
		);

		const menuButton = screen.getByRole('button', { name: 'Open main navigation' });
		expect(screen.queryByRole('link', { name: /what's new/i })).not.toBeInTheDocument();

		fireEvent.click(menuButton);

		expect(menuButton).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByRole('link', { name: /what's new/i })).toHaveAttribute('href', '/updates');
		expect(screen.getByRole('link', { name: /create character/i })).toHaveAttribute(
			'href',
			'/create-character'
		);
		expect(screen.getByRole('link', { name: /load character/i })).toHaveAttribute(
			'href',
			'/load-character'
		);
		expect(screen.getByRole('link', { name: /spellbook/i })).toHaveAttribute('href', '/spellbook');
		expect(screen.getByRole('link', { name: /martial manual/i })).toHaveAttribute(
			'href',
			'/martial-manual'
		);
		expect(screen.getByRole('link', { name: /conditions/i })).toHaveAttribute(
			'href',
			'/conditions'
		);
		expect(screen.getByRole('link', { name: /equipage/i })).toHaveAttribute(
			'href',
			'/custom-equipment'
		);
		expect(screen.getByRole('link', { name: /rule book/i })).toHaveAttribute('href', '/rulebook');
		expect(screen.queryByRole('link', { name: /encounter planner/i })).not.toBeInTheDocument();
		expect(screen.queryByRole('link', { name: /my campaigns/i })).not.toBeInTheDocument();
	});

	it('closes the homepage navigation with Escape', () => {
		render(
			<MemoryRouter initialEntries={['/menu']}>
				<TopLeftToolbar />
			</MemoryRouter>
		);

		fireEvent.click(screen.getByRole('button', { name: 'Open main navigation' }));
		fireEvent.keyDown(document, { key: 'Escape' });

		expect(screen.queryByRole('link', { name: /what's new/i })).not.toBeInTheDocument();
	});
});
