import { act, cleanup, render, waitFor } from '@testing-library/react';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PostHogLifecycle } from './PostHogLifecycle';
import { setAnalyticsConsent } from '../../lib/analytics/consent';

const mocks = vi.hoisted(() => ({
	auth: {
		isConvexEnabled: true,
		isAuthenticated: false,
		isLoading: true
	},
	currentUser: undefined as { userId: string; name?: string; createdAt: number } | null | undefined,
	updateAnalyticsContext: vi.fn()
}));

vi.mock('../auth/AuthModeContext', () => ({
	useAppAuth: () => mocks.auth
}));

vi.mock('../auth/CurrentUserContext', () => ({
	useCurrentUser: () => mocks.currentUser
}));

vi.mock('../../lib/analytics/posthog', () => ({
	isAnalyticsEnabled: true,
	updateAnalyticsContext: mocks.updateAnalyticsContext
}));

vi.mock('../../lib/analytics/config', () => ({
	isLegalConsentFlowEnabled: true
}));

describe('PostHogLifecycle', () => {
	afterEach(cleanup);
	beforeEach(() => {
		mocks.auth.isConvexEnabled = true;
		mocks.auth.isAuthenticated = false;
		mocks.auth.isLoading = true;
		mocks.currentUser = undefined;
		mocks.updateAnalyticsContext.mockReset();
		mocks.updateAnalyticsContext.mockResolvedValue(undefined);
		setAnalyticsConsent(false);
	});

	it('waits for analytics consent and resumes the current page after it is granted', async () => {
		mocks.auth.isConvexEnabled = false;
		mocks.auth.isLoading = false;
		mocks.currentUser = null;
		render(
			<MemoryRouter initialEntries={['/menu']}>
				<PostHogLifecycle />
			</MemoryRouter>
		);
		expect(mocks.updateAnalyticsContext).not.toHaveBeenCalled();
		act(() => setAnalyticsConsent(true));
		await waitFor(() => expect(mocks.updateAnalyticsContext).toHaveBeenCalledTimes(1));
		act(() => setAnalyticsConsent(false));
		act(() => setAnalyticsConsent(true));
		await waitFor(() => expect(mocks.updateAnalyticsContext).toHaveBeenCalledTimes(2));
	});

	it('waits for auth resolution before identifying and capturing the page', async () => {
		setAnalyticsConsent(true);
		const view = render(
			<MemoryRouter initialEntries={['/menu']}>
				<PostHogLifecycle />
			</MemoryRouter>
		);

		expect(mocks.updateAnalyticsContext).not.toHaveBeenCalled();

		mocks.auth.isAuthenticated = true;
		mocks.auth.isLoading = false;
		mocks.currentUser = {
			userId: 'user_123',
			name: 'Private display name',
			createdAt: 1_700_000_000_000
		};
		await act(async () =>
			view.rerender(
				<MemoryRouter initialEntries={['/menu']}>
					<PostHogLifecycle />
				</MemoryRouter>
			)
		);

		await waitFor(() => {
			expect(mocks.updateAnalyticsContext).toHaveBeenCalledWith({
				userId: 'user_123',
				accountCreatedAt: 1_700_000_000_000,
				previousUserId: undefined,
				pageUrl: window.location.href
			});
		});
	});

	it('deduplicates unchanged renders and forwards the prior identity on logout', async () => {
		setAnalyticsConsent(true);
		mocks.auth.isAuthenticated = true;
		mocks.auth.isLoading = false;
		mocks.currentUser = { userId: 'user_123', createdAt: 1_700_000_000_000 };
		const view = render(
			<StrictMode>
				<MemoryRouter initialEntries={['/menu']}>
					<PostHogLifecycle />
				</MemoryRouter>
			</StrictMode>
		);

		await waitFor(() => expect(mocks.updateAnalyticsContext).toHaveBeenCalledTimes(1));
		view.rerender(
			<StrictMode>
				<MemoryRouter initialEntries={['/menu']}>
					<PostHogLifecycle />
				</MemoryRouter>
			</StrictMode>
		);
		expect(mocks.updateAnalyticsContext).toHaveBeenCalledTimes(1);

		mocks.auth.isAuthenticated = false;
		mocks.currentUser = null;
		await act(async () =>
			view.rerender(
				<StrictMode>
					<MemoryRouter initialEntries={['/menu']}>
						<PostHogLifecycle />
					</MemoryRouter>
				</StrictMode>
			)
		);

		await waitFor(() => {
			expect(mocks.updateAnalyticsContext).toHaveBeenLastCalledWith({
				userId: null,
				accountCreatedAt: undefined,
				previousUserId: 'user_123',
				pageUrl: undefined
			});
		});
	});
});
