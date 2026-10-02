import type { CaptureResult } from 'posthog-js';
import { appEnvironment, appRelease } from '../monitoring/environment';
import { sanitizePostHogEvent } from './privacy';

export function prepareAnalyticsEvent(event: CaptureResult | null): CaptureResult | null {
	const sanitized = sanitizePostHogEvent(event);
	if (!sanitized) return null;
	return {
		...sanitized,
		properties: {
			...sanitized.properties,
			app_environment: appEnvironment,
			app_release: appRelease,
			$geoip_disable: true
		}
	};
}
