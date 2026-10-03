import * as Sentry from '@sentry/react';
import type { ErrorEvent } from '@sentry/react';
import { sanitizeAnalyticsUrl } from '../analytics/privacy';
import { appEnvironment, appRelease } from './environment';

function redactMessage(value: string): string {
	return value
		.replace(/https?:\/\/[^\s"'<>]+/g, (url) => sanitizeAnalyticsUrl(url) || '[url]')
		.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email]')
		.replace(/"[^"\n]*"|'[^'\n]*'/g, '[redacted]')
		.slice(0, 500);
}

export function sanitizeSentryEvent(event: ErrorEvent): ErrorEvent {
	const sanitized = { ...event };
	delete sanitized.extra;
	delete sanitized.user;
	delete sanitized.breadcrumbs;
	delete sanitized.contexts;
	if (event.request?.url) {
		sanitized.request = { url: sanitizeAnalyticsUrl(event.request.url) };
	} else {
		delete sanitized.request;
	}
	if (event.message) sanitized.message = redactMessage(event.message);
	if (event.exception?.values) {
		sanitized.exception = {
			values: event.exception.values.map((exception) => ({
				...exception,
				value: exception.value ? redactMessage(exception.value) : undefined
			}))
		};
	}
	return sanitized;
}

const dsn = import.meta.env.VITE_SENTRY_DSN?.trim();
if (dsn && !import.meta.env.DEV) {
	Sentry.init({
		dsn,
		environment: appEnvironment,
		release: appRelease,
		sendDefaultPii: false,
		autoSessionTracking: false,
		attachStacktrace: true,
		maxBreadcrumbs: 0,
		beforeSend: sanitizeSentryEvent,
		beforeBreadcrumb: () => null
	});
}

export const reactErrorHandler = Sentry.reactErrorHandler;

export function captureApplicationError(context: string, message: string): void {
	if (!dsn || import.meta.env.DEV) return;
	Sentry.captureMessage(message, { level: 'error', tags: { context } });
}

export function setErrorReportingUser(userId: string | null): void {
	if (!dsn || import.meta.env.DEV) return;
	Sentry.setUser(userId ? { id: userId } : null);
}
