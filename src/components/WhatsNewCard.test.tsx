import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { latestProductUpdate } from '../routes/product-update/updates';
import WhatsNewCard, {
	DISMISSED_UPDATE_STORAGE_KEY,
	SHOW_WHATS_NEW_QUERY_PARAM,
	useWhatsNewCardVisibility
} from './WhatsNewCard';

function DismissibleWhatsNewCard() {
	const { isVisible, dismiss } = useWhatsNewCardVisibility();
	return isVisible ? <WhatsNewCard onDismiss={dismiss} /> : null;
}

describe('WhatsNewCard', () => {
	beforeEach(() => {
		cleanup();
		window.localStorage.removeItem(DISMISSED_UPDATE_STORAGE_KEY);
		window.history.replaceState({}, '', '/');
	});

	it('persists dismissal for the current update', () => {
		const { unmount } = render(<DismissibleWhatsNewCard />);

		fireEvent.click(screen.getByRole('button', { name: /dismiss what's new/i }));

		expect(
			screen.queryByRole('heading', { name: latestProductUpdate.title })
		).not.toBeInTheDocument();
		expect(window.localStorage.getItem(DISMISSED_UPDATE_STORAGE_KEY)).toBe(
			latestProductUpdate.slug
		);

		unmount();
		render(<DismissibleWhatsNewCard />);
		expect(
			screen.queryByRole('heading', { name: latestProductUpdate.title })
		).not.toBeInTheDocument();
	});

	it('shows a newer update after an older release was dismissed', () => {
		window.localStorage.setItem(DISMISSED_UPDATE_STORAGE_KEY, 'older-release');

		render(<DismissibleWhatsNewCard />);

		expect(screen.getByRole('heading', { name: latestProductUpdate.title })).toBeInTheDocument();
	});

	it('can be forced visible from the menu URL after dismissal', () => {
		window.localStorage.setItem(DISMISSED_UPDATE_STORAGE_KEY, latestProductUpdate.slug);
		window.history.replaceState({}, '', `/menu?${SHOW_WHATS_NEW_QUERY_PARAM}=1`);

		render(<DismissibleWhatsNewCard />);

		expect(screen.getByRole('heading', { name: latestProductUpdate.title })).toBeInTheDocument();
	});
});
