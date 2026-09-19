import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CampaignFeedAction } from './CampaignFeedAction';

const { mockAuth, mockNotifications } = vi.hoisted(() => ({
	mockAuth: vi.fn(),
	mockNotifications: vi.fn()
}));

vi.mock('../../../components/auth/AuthModeContext', () => ({
	useAppAuth: mockAuth
}));

vi.mock('../hooks/useCampaignNotifications', () => ({
	useCampaignNotifications: mockNotifications
}));

vi.mock('./CampaignFeedPanel', () => ({
	CampaignFeedPanel: ({ campaignName }: { campaignName: string }) => (
		<div role="dialog">{campaignName}</div>
	)
}));

describe('CampaignFeedAction', () => {
	beforeEach(() => {
		mockAuth.mockReturnValue({ isConvexEnabled: true, isAuthenticated: true });
		mockNotifications.mockReturnValue({
			campaignName: 'Crystal Company',
			events: [],
			unreadCount: 3,
			markSeen: vi.fn(),
			inCampaign: true
		});
	});

	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	it('marks notifications seen and opens the shared feed panel', () => {
		const notifications = mockNotifications();
		mockNotifications.mockReturnValue(notifications);

		render(
			<CampaignFeedAction
				characterId="character-one"
				renderTrigger={({ ariaLabel, content, onClick, title }) => (
					<button type="button" aria-label={ariaLabel} title={title} onClick={onClick}>
						{content}
					</button>
				)}
			/>
		);

		fireEvent.click(screen.getByRole('button', { name: 'Campaign feed, 3 unread' }));

		expect(notifications.markSeen).toHaveBeenCalledOnce();
		expect(screen.getByRole('dialog')).toHaveTextContent('Crystal Company');
	});

	it('does not subscribe when cloud authentication is unavailable', () => {
		mockAuth.mockReturnValue({ isConvexEnabled: false, isAuthenticated: false });

		render(
			<CampaignFeedAction
				characterId="character-one"
				renderTrigger={({ ariaLabel, content, onClick }) => (
					<button type="button" aria-label={ariaLabel} onClick={onClick}>
						{content}
					</button>
				)}
			/>
		);

		expect(screen.queryByRole('button')).toBeNull();
		expect(mockNotifications).not.toHaveBeenCalled();
	});
});
