import { beforeEach, describe, expect, it, vi } from 'vitest';

const posthog = vi.hoisted(() => ({
	__loaded: false,
	init: vi.fn(),
	get_property: vi.fn(),
	has_opted_out_capturing: vi.fn(),
	opt_in_capturing: vi.fn(),
	opt_out_capturing: vi.fn(),
	identify: vi.fn(),
	capture: vi.fn(),
	reset: vi.fn()
}));

vi.mock('posthog-js', () => ({ default: posthog }));

async function loadAnalytics(legalConsentFlowEnabled = true) {
	vi.resetModules();
	vi.stubEnv('VITE_ENABLE_ANALYTICS', 'true');
	vi.stubEnv('VITE_ENABLE_LEGAL_CONSENT_FLOW', String(legalConsentFlowEnabled));
	vi.stubEnv('VITE_POSTHOG_PROJECT_TOKEN', 'phc_test');
	vi.stubEnv('VITE_POSTHOG_HOST', 'https://eu.i.posthog.com');
	const analytics = await import('./posthog');
	const { setAnalyticsConsent } = await import('./consent');
	return { ...analytics, setAnalyticsConsent };
}

describe('PostHog analytics client', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		posthog.__loaded = false;
		posthog.get_property.mockReturnValue(undefined);
		posthog.has_opted_out_capturing.mockReturnValue(true);
		posthog.opt_in_capturing.mockImplementation(() =>
			posthog.has_opted_out_capturing.mockReturnValue(false)
		);
		posthog.opt_out_capturing.mockImplementation(() =>
			posthog.has_opted_out_capturing.mockReturnValue(true)
		);
	});

	it('does not import or initialize PostHog before opt-in, or after refusal', async () => {
		const { updateAnalyticsContext, captureAnalyticsEvent, setAnalyticsConsent } =
			await loadAnalytics();
		await updateAnalyticsContext({
			userId: 'user_123',
			previousUserId: undefined,
			pageUrl: 'https://dc20clean.vercel.app/menu'
		});
		captureAnalyticsEvent('sign_in_started', { provider: 'google' });
		setAnalyticsConsent(false);
		await vi.waitFor(() => expect(posthog.init).not.toHaveBeenCalled());
		expect(posthog.capture).not.toHaveBeenCalled();
	});

	it('collects without a consent choice when the legal and consent flow is disabled', async () => {
		const { updateAnalyticsContext, captureAnalyticsEvent } = await loadAnalytics(false);
		await updateAnalyticsContext({
			userId: null,
			previousUserId: undefined,
			pageUrl: 'https://dc20clean.vercel.app/menu'
		});
		captureAnalyticsEvent('sign_in_started', { provider: 'google' });
		await vi.waitFor(() => expect(posthog.capture).toHaveBeenCalledTimes(2));
		expect(posthog.init).toHaveBeenCalledWith(
			'phc_test',
			expect.objectContaining({
				opt_out_capturing_by_default: false,
				opt_out_persistence_by_default: false
			})
		);
	});

	it('stays disabled when the analytics flag is off, regardless of consent-flow setting', async () => {
		await loadAnalytics(false);
		vi.stubEnv('VITE_ENABLE_ANALYTICS', 'false');
		// The flag is read at module load, so reload with the disabled setting.
		vi.resetModules();
		const disabledAnalytics = await import('./posthog');
		await disabledAnalytics.updateAnalyticsContext({ userId: null, previousUserId: undefined });
		expect(posthog.init).not.toHaveBeenCalled();
	});

	it('identifies an authenticated user before capturing the pageview', async () => {
		const { updateAnalyticsContext, setAnalyticsConsent } = await loadAnalytics();
		setAnalyticsConsent(true);

		await updateAnalyticsContext({
			userId: 'user_123',
			accountCreatedAt: Date.UTC(2026, 0, 2),
			previousUserId: undefined,
			pageUrl: 'https://dc20clean.vercel.app/menu'
		});

		expect(posthog.identify).toHaveBeenCalledWith('user_123', {
			account_created_at: '2026-01-02T00:00:00.000Z'
		});
		expect(posthog.capture.mock.calls).toEqual([
			['authenticated_session_started'],
			[
				'$pageview',
				{
					$current_url: 'https://dc20clean.vercel.app/menu',
					$host: 'dc20clean.vercel.app',
					$pathname: '/menu',
					$referrer: '$direct',
					$referring_domain: '$direct'
				}
			]
		]);
		expect(posthog.identify.mock.invocationCallOrder[0]).toBeLessThan(
			posthog.capture.mock.invocationCallOrder[0]
		);
	});

	it('initializes with privacy-sensitive automatic collection disabled', async () => {
		const { updateAnalyticsContext, setAnalyticsConsent } = await loadAnalytics();
		setAnalyticsConsent(true);

		await updateAnalyticsContext({ userId: null, previousUserId: undefined });

		expect(posthog.init).toHaveBeenCalledWith(
			'phc_test',
			expect.objectContaining({
				autocapture: false,
				capture_pageview: false,
				capture_pageleave: false,
				capture_exceptions: false,
				capture_performance: false,
				capture_heatmaps: false,
				disable_session_recording: true,
				save_campaign_params: false,
				save_referrer: false,
				advanced_disable_decide: true,
				person_profiles: 'identified_only',
				opt_out_capturing_by_default: true,
				opt_out_persistence_by_default: true,
				respect_dnt: true,
				ip: false
			})
		);
		expect(posthog.opt_in_capturing).toHaveBeenCalledWith({ captureEventName: false });
	});

	it('captures sign-out before clearing a persisted user identity', async () => {
		posthog.get_property.mockReturnValue('user_123');
		const { updateAnalyticsContext, setAnalyticsConsent } = await loadAnalytics();
		setAnalyticsConsent(true);

		await updateAnalyticsContext({ userId: null, previousUserId: 'user_123' });

		expect(posthog.capture).toHaveBeenCalledWith('user_signed_out');
		expect(posthog.reset).toHaveBeenCalledOnce();
		expect(posthog.capture.mock.invocationCallOrder[0]).toBeLessThan(
			posthog.reset.mock.invocationCallOrder[0]
		);
	});

	it('drops unregistered events and non-allowlisted properties', async () => {
		const { captureAnalyticsEvent, setAnalyticsConsent } = await loadAnalytics();
		setAnalyticsConsent(true);

		captureAnalyticsEvent('character_creation_completed', {
			class_id: 'fighter',
			level: 3,
			ancestry_id: 'Human with private text',
			character_name: 'Secret Name'
		});
		captureAnalyticsEvent('arbitrary_event', { private_value: 'secret' });

		await vi.waitFor(() => {
			expect(posthog.capture).toHaveBeenCalledOnce();
		});
		expect(posthog.capture).toHaveBeenCalledWith('character_creation_completed', {
			class_id: 'fighter',
			level: 3
		});
	});

	it('does not throw or set a person property for an invalid account timestamp', async () => {
		const { updateAnalyticsContext, setAnalyticsConsent } = await loadAnalytics();
		setAnalyticsConsent(true);

		await updateAnalyticsContext({
			userId: 'user_123',
			accountCreatedAt: Number.NaN,
			previousUserId: undefined
		});

		expect(posthog.identify).toHaveBeenCalledWith('user_123', undefined);
	});

	it('stops capture, clears persisted identity, and can opt in again after withdrawal', async () => {
		const {
			captureAnalyticsEvent,
			updateAnalyticsContext,
			stopAnalyticsCapture,
			setAnalyticsConsent
		} = await loadAnalytics();
		setAnalyticsConsent(true);
		await updateAnalyticsContext({ userId: 'user_123', previousUserId: undefined });
		setAnalyticsConsent(false);
		await stopAnalyticsCapture();
		captureAnalyticsEvent('sign_in_started', { provider: 'google' });
		expect(posthog.reset).toHaveBeenCalledWith(true);
		expect(posthog.opt_out_capturing).toHaveBeenCalledOnce();
		expect(posthog.capture).toHaveBeenCalledTimes(1);

		posthog.has_opted_out_capturing.mockReturnValue(true);
		setAnalyticsConsent(true);
		await updateAnalyticsContext({ userId: null, previousUserId: undefined });
		expect(posthog.opt_in_capturing).toHaveBeenCalledTimes(2);
	});
});
