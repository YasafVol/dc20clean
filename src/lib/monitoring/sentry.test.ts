import { afterEach, describe, expect, it, vi } from 'vitest';

const sdk = vi.hoisted(() => ({
	init: vi.fn(),
	captureMessage: vi.fn(),
	setUser: vi.fn(),
	reactErrorHandler: vi.fn()
}));
vi.mock('@sentry/react', () => sdk);

afterEach(() => {
	vi.unstubAllEnvs();
	vi.clearAllMocks();
	vi.resetModules();
});

describe('Sentry wiring', () => {
	it('initializes at startup with the deployment environment and release', async () => {
		vi.stubEnv('DEV', false);
		vi.stubEnv('VITE_SENTRY_DSN', 'https://public@o1.ingest.sentry.io/2');
		vi.stubEnv('VITE_APP_ENVIRONMENT', 'preview');
		vi.stubEnv('VITE_APP_RELEASE', 'commit-123');
		const { captureApplicationError } = await import('./sentry');
		expect(sdk.init).toHaveBeenCalledOnce();
		expect(sdk.init).toHaveBeenCalledWith(
			expect.objectContaining({
				environment: 'preview',
				release: 'commit-123',
				sendDefaultPii: false,
				maxBreadcrumbs: 0,
				beforeSend: expect.any(Function)
			})
		);
		captureApplicationError('storage', 'Failed to load character');
		expect(sdk.captureMessage).toHaveBeenCalledWith('Failed to load character', {
			level: 'error',
			tags: { context: 'storage' }
		});
	});

	it.each([
		{ dev: true, dsn: 'https://public@o1.ingest.sentry.io/2' },
		{ dev: false, dsn: '' }
	])('keeps development and unconfigured builds disabled: %o', async ({ dev, dsn }) => {
		vi.stubEnv('DEV', dev);
		vi.stubEnv('VITE_SENTRY_DSN', dsn);
		const { captureApplicationError } = await import('./sentry');
		captureApplicationError('storage', 'Failed to load');
		expect(sdk.init).not.toHaveBeenCalled();
		expect(sdk.captureMessage).not.toHaveBeenCalled();
	});

	it('removes content, account data, raw URLs, and console/network breadcrumbs', async () => {
		const { sanitizeSentryEvent } = await import('./sentry');
		const source = {
			type: undefined,
			message:
				'Failed for person@example.com at https://dc20clean.vercel.app/character/private?token=secret',
			request: {
				url: 'https://dc20clean.vercel.app/campaigns/join/private?token=secret',
				headers: { Authorization: 'secret' },
				data: { notes: 'private' }
			},
			user: { email: 'person@example.com' },
			extra: { characterName: 'private' },
			contexts: { data: { notes: 'private' } },
			breadcrumbs: [{ message: 'private' }],
			exception: { values: [{ type: 'Error', value: 'Invalid argument: "private character"' }] }
		};
		const result = sanitizeSentryEvent(source);
		expect(result.request).toEqual({ url: 'https://dc20clean.vercel.app/campaigns/join/:code' });
		expect(result.exception?.values?.[0].value).toBe('Invalid argument: [redacted]');
		expect(result.message).not.toMatch(/person@example|private|secret/);
		expect(result.extra).toBeUndefined();
		expect(result.user).toBeUndefined();
		expect(result.contexts).toBeUndefined();
		expect(result.breadcrumbs).toBeUndefined();
		expect(source.extra.characterName).toBe('private');
	});
});
