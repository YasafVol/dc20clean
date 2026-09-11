import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AlternativeSectionDisclosure from './AlternativeSectionDisclosure';

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string, options?: { section?: string }) =>
			key === 'characterSheet.collapseSection'
				? `Collapse ${options?.section}`
				: `Expand ${options?.section}`
	})
}));

afterEach(cleanup);

describe('AlternativeSectionDisclosure', () => {
	it('starts expanded and hides content without unmounting it', () => {
		render(
			<section>
				<AlternativeSectionDisclosure id="resources" title="Resources">
					<button type="button">Resource control</button>
				</AlternativeSectionDisclosure>
			</section>
		);

		const collapseButton = screen.getByRole('button', { name: 'Collapse Resources' });
		const content = document.getElementById('resources-content');
		const resourceControl = screen.getByRole('button', { name: 'Resource control' });

		expect(collapseButton.getAttribute('aria-expanded')).toBe('true');
		expect(content?.hidden).toBe(false);

		fireEvent.click(collapseButton);

		expect(screen.getByRole('button', { name: 'Expand Resources' })).toBeTruthy();
		expect(content?.hidden).toBe(true);
		expect(document.body.contains(resourceControl)).toBe(true);
	});
});
