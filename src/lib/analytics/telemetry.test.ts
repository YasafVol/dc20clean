import { afterEach, describe, expect, it, vi } from 'vitest';
afterEach(() => {
	vi.unstubAllEnvs();
	vi.unstubAllGlobals();
	vi.resetModules();
});

describe('analytics deployment envelope', () => {
	it.each(['production', 'preview'])(
		'tags every event from %s and disables GeoIP',
		async (environment) => {
			vi.stubEnv('VITE_APP_ENVIRONMENT', environment);
			vi.stubEnv('VITE_APP_RELEASE', 'commit-123');
			const { prepareAnalyticsEvent } = await import('./telemetry');
			const result = prepareAnalyticsEvent({
				uuid: 'test-event',
				event: '$pageview',
				properties: {
					$current_url: 'https://dc20clean.vercel.app/character/private?token=secret',
					app_environment: 'stale',
					$geoip_disable: false
				}
			});
			expect(result?.properties).toEqual({
				$current_url: 'https://dc20clean.vercel.app/character/:id',
				app_environment: environment,
				app_release: 'commit-123',
				$geoip_disable: true
			});
			expect(prepareAnalyticsEvent(null)).toBeNull();
		}
	);

	it('does not initialize or capture when Global Privacy Control is enabled', async () => {
		const init = vi.fn();
		const capture = vi.fn();
		vi.doMock('posthog-js', () => ({ default: { init, capture } }));
		vi.stubGlobal('navigator', { globalPrivacyControl: true });
		vi.stubEnv('VITE_ENABLE_ANALYTICS', 'true');
		vi.stubEnv('VITE_POSTHOG_PROJECT_TOKEN', 'phc_test');
		vi.stubEnv('VITE_ENABLE_LEGAL_CONSENT_FLOW', 'false');
		const { updateAnalyticsContext, captureAnalyticsEvent } = await import('./posthog');
		await updateAnalyticsContext({
			userId: null,
			previousUserId: undefined,
			pageUrl: 'https://dc20clean.vercel.app/menu'
		});
		captureAnalyticsEvent('sign_in_started', { provider: 'google' });
		expect(init).not.toHaveBeenCalled();
		expect(capture).not.toHaveBeenCalled();
		vi.doUnmock('posthog-js');
	});
});
