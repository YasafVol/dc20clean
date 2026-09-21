import type { PostHog } from 'posthog-js';
import { hasAnalyticsConsent } from './consent';
import { isLegalConsentFlowEnabled } from './config';
import { buildAnalyticsPageviewProperties, sanitizePostHogEvent } from './privacy';

const projectToken = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN?.trim();
const apiHost = import.meta.env.VITE_POSTHOG_HOST?.trim() || 'https://eu.i.posthog.com';

export const isAnalyticsEnabled =
	import.meta.env.VITE_ENABLE_ANALYTICS === 'true' && Boolean(projectToken);

function hasAnalyticsPermission(): boolean {
	return !isLegalConsentFlowEnabled || hasAnalyticsConsent();
}

const EVENT_PROPERTY_ALLOWLIST = {
	character_creation_completed: ['class_id', 'level', 'ancestry_id'],
	sign_in_started: ['provider', 'feature'],
	sign_in_failed: ['provider', 'feature'],
	authenticated_session_started: [],
	user_signed_out: []
} as const;

type AnalyticsEventName = keyof typeof EVENT_PROPERTY_ALLOWLIST;
type AnalyticsPrimitive = string | number | boolean;

let clientPromise: Promise<PostHog | null> | null = null;

const SAFE_ID = /^[a-z0-9][a-z0-9_-]{0,63}$/i;
const SIGN_IN_FEATURES = new Set(['cloud-save', 'pdf-export', 'general']);

function isKnownEvent(eventName: string): eventName is AnalyticsEventName {
	return Object.prototype.hasOwnProperty.call(EVENT_PROPERTY_ALLOWLIST, eventName);
}

function sanitizeEventProperty(
	eventName: AnalyticsEventName,
	propertyName: string,
	value: unknown
): AnalyticsPrimitive | undefined {
	if (eventName === 'character_creation_completed') {
		if (propertyName === 'level') {
			return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 20
				? value
				: undefined;
		}
		return typeof value === 'string' && SAFE_ID.test(value) ? value : undefined;
	}

	if (eventName === 'sign_in_started' || eventName === 'sign_in_failed') {
		if (propertyName === 'provider') return value === 'google' ? value : undefined;
		if (propertyName === 'feature') {
			return typeof value === 'string' && SIGN_IN_FEATURES.has(value) ? value : undefined;
		}
	}

	return undefined;
}

function filterEventProperties(
	eventName: AnalyticsEventName,
	properties: Record<string, unknown> = {}
): Record<string, AnalyticsPrimitive> {
	const filtered: Record<string, AnalyticsPrimitive> = {};
	for (const key of EVENT_PROPERTY_ALLOWLIST[eventName]) {
		const value = sanitizeEventProperty(eventName, key, properties[key]);
		if (value !== undefined) filtered[key] = value;
	}
	return filtered;
}

async function getAnalyticsClient(): Promise<PostHog | null> {
	if (!isAnalyticsEnabled || !projectToken || !hasAnalyticsPermission()) {
		return null;
	}

	if (!clientPromise) {
		clientPromise = import('posthog-js')
			.then(({ default: posthog }) => {
				if (!hasAnalyticsPermission()) {
					clientPromise = null;
					return null;
				}
				if (!posthog.__loaded) {
					posthog.init(projectToken, {
						api_host: apiHost,
						defaults: '2026-05-30',
						autocapture: false,
						capture_pageview: false,
						capture_pageleave: false,
						capture_exceptions: false,
						capture_performance: false,
						capture_heatmaps: false,
						capture_dead_clicks: false,
						disable_session_recording: true,
						disable_surveys: true,
						disable_product_tours: true,
						disable_conversations: true,
						disable_external_dependency_loading: true,
						disable_capture_url_hashes: true,
						save_campaign_params: false,
						save_referrer: false,
						mask_personal_data_properties: true,
						advanced_disable_feature_flags: true,
						advanced_disable_decide: true,
						advanced_disable_toolbar_metrics: true,
						logs: { captureConsoleLogs: false },
						metrics: { network: false },
						person_profiles: 'identified_only',
						persistence: 'localStorage',
						opt_out_capturing_by_default: isLegalConsentFlowEnabled,
						opt_out_persistence_by_default: isLegalConsentFlowEnabled,
						cross_subdomain_cookie: false,
						respect_dnt: true,
						ip: false,
						before_send: sanitizePostHogEvent
					});
				}
				if (posthog.has_opted_out_capturing()) {
					posthog.opt_in_capturing({ captureEventName: false });
				}
				return posthog;
			})
			.catch(() => {
				clientPromise = null;
				return null;
			});
	}

	const client = await clientPromise;
	if (!hasAnalyticsPermission() || !client) return null;
	if (client.has_opted_out_capturing()) {
		client.opt_in_capturing({ captureEventName: false });
	}
	return client;
}

export async function stopAnalyticsCapture(): Promise<void> {
	const client = await clientPromise;
	if (hasAnalyticsPermission()) return;
	if (client) {
		client.reset(true);
		client.opt_out_capturing();
	}
	clearAnalyticsStorage();
}

function clearAnalyticsStorage(): void {
	if (typeof window === 'undefined' || !projectToken) return;
	const storageName = `ph_${projectToken}_posthog`;
	const consentName = `__ph_opt_in_out_${projectToken}`;
	for (const type of ['localStorage', 'sessionStorage'] as const) {
		try {
			const storage = window[type];
			for (const key of Object.keys(storage)) {
				if (key === storageName || key.startsWith(`${storageName}_`) || key === consentName) {
					storage.removeItem(key);
				}
			}
		} catch {
			// Storage may be unavailable in a restricted browser context.
		}
	}
}

export function captureAnalyticsEvent(eventName: string, properties?: object): void {
	if (!isKnownEvent(eventName)) {
		return;
	}

	const safeProperties = filterEventProperties(
		eventName,
		(properties ?? {}) as Record<string, unknown>
	);
	void getAnalyticsClient().then((client) => {
		if (client && hasAnalyticsPermission()) client.capture(eventName, safeProperties);
	});
}

interface AnalyticsContextUpdate {
	userId: string | null;
	accountCreatedAt?: number;
	previousUserId: string | null | undefined;
	pageUrl?: string;
}

export async function updateAnalyticsContext({
	userId,
	accountCreatedAt,
	previousUserId,
	pageUrl
}: AnalyticsContextUpdate): Promise<void> {
	const client = await getAnalyticsClient();
	if (!client || !hasAnalyticsPermission()) {
		return;
	}

	const persistedUserId = client.get_property('$user_id');

	if (userId) {
		if (typeof persistedUserId === 'string' && persistedUserId !== userId) {
			client.reset();
		}

		if (persistedUserId !== userId || previousUserId !== userId) {
			const accountCreatedAtIso =
				accountCreatedAt !== undefined && Number.isFinite(accountCreatedAt)
					? new Date(accountCreatedAt).toISOString()
					: undefined;
			client.identify(
				userId,
				accountCreatedAtIso ? { account_created_at: accountCreatedAtIso } : undefined
			);
		}

		if (previousUserId !== userId) {
			client.capture('authenticated_session_started');
		}
	} else if (typeof persistedUserId === 'string') {
		if (previousUserId) {
			client.capture('user_signed_out');
		}
		client.reset();
	}

	if (pageUrl) {
		const pageviewProperties = buildAnalyticsPageviewProperties(
			pageUrl,
			typeof document === 'undefined' ? undefined : document.referrer
		);
		if (pageviewProperties) client.capture('$pageview', pageviewProperties);
	}
}
