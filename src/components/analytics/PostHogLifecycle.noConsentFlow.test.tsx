import { cleanup, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, expect, it, vi } from 'vitest';
import { PostHogLifecycle } from './PostHogLifecycle';

const updateAnalyticsContext = vi.hoisted(() => vi.fn());

vi.mock('../auth/AuthModeContext', () => ({
	useAppAuth: () => ({ isConvexEnabled: false, isLoading: false })
}));

vi.mock('../auth/CurrentUserContext', () => ({
	useCurrentUser: () => null
}));

vi.mock('../../lib/analytics/config', () => ({
	isLegalConsentFlowEnabled: false
}));

vi.mock('../../lib/analytics/posthog', () => ({
	isAnalyticsEnabled: true,
	updateAnalyticsContext
}));

afterEach(cleanup);

it('captures the page without a consent choice when the legal flow is disabled', async () => {
	render(
		<MemoryRouter initialEntries={['/menu']}>
			<PostHogLifecycle />
		</MemoryRouter>
	);
	await waitFor(() => expect(updateAnalyticsContext).toHaveBeenCalledOnce());
});
