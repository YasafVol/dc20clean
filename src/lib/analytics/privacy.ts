import type { CaptureResult } from 'posthog-js';

const PRIVATE_ROUTE_PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
	[/^\/campaigns\/join\/[^/]+$/, '/campaigns/join/:code'],
	[/^\/campaigns\/[^/]+\/character\/[^/]+$/, '/campaigns/:campaignId/character/:characterId'],
	[/^\/campaigns\/[^/]+$/, '/campaigns/:id'],
	[/^\/character\/[^/]+\/edit$/, '/character/:id/edit'],
	[/^\/character\/[^/]+\/levelup$/, '/character/:id/levelup'],
	[/^\/character\/[^/]+$/, '/character/:id'],
	[/^\/character2\/[^/]+$/, '/character2/:id'],
	[/^\/dm\/monsters\/[^/]+$/, '/dm/monsters/:id'],
	[/^\/dm\/encounters\/[^/]+$/, '/dm/encounters/:id']
];

const PUBLIC_ROUTES = new Set([
	'/',
	'/menu',
	'/privacy',
	'/terms',
	'/create-character',
	'/load-character',
	'/spellbook',
	'/martial-manual',
	'/conditions',
	'/updates',
	'/updates/2026-09-18-alternative-character-sheet',
	'/updates/alternative-character-sheet',
	'/custom-equipment',
	'/character2',
	'/dm/monsters',
	'/dm/encounters',
	'/campaigns',
	'/campaigns/join'
]);

const URL_PROPERTIES = ['$current_url', '$initial_current_url', '$session_entry_url'] as const;

const REFERRER_PROPERTIES = ['$referrer', '$initial_referrer', '$session_entry_referrer'] as const;

const PATH_PROPERTIES = [
	'$pathname',
	'$initial_pathname',
	'$session_entry_pathname',
	'$prev_pageview_pathname'
] as const;

const DROP_ATTRIBUTION_PROPERTIES = new Set([
	'_kx',
	'dclid',
	'epik',
	'fbclid',
	'gbraid',
	'gclid',
	'gclsrc',
	'igshid',
	'irclid',
	'li_fat_id',
	'mc_cid',
	'msclkid',
	'ph_keyword',
	'qclid',
	'rdt_cid',
	'sccid',
	'ttclid',
	'twclid',
	'wbraid'
]);

const SAFE_ATTRIBUTION_VALUE = /^[a-z0-9][a-z0-9._-]{0,63}$/i;

function stripAttributionPrefix(propertyName: string): string {
	return propertyName.replace(/^\$(?:initial|session_entry)_/, '');
}

function sanitizeAttributionValue(value: unknown): string | undefined {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	return SAFE_ATTRIBUTION_VALUE.test(trimmed) ? trimmed : undefined;
}

export function sanitizeAnalyticsPath(pathname: string): string {
	if (PUBLIC_ROUTES.has(pathname)) return pathname;
	if (pathname === '/rulebook' || pathname.startsWith('/rulebook/')) return '/rulebook/*';

	for (const [pattern, replacement] of PRIVATE_ROUTE_PATTERNS) {
		if (pattern.test(pathname)) {
			return replacement;
		}
	}

	return '/other';
}

export function sanitizeAnalyticsUrl(value: string): string | undefined {
	try {
		const url = new URL(value);
		if (url.protocol !== 'https:' && url.protocol !== 'http:') {
			return undefined;
		}

		url.pathname = sanitizeAnalyticsPath(url.pathname);
		url.search = '';
		url.hash = '';
		url.username = '';
		url.password = '';
		return url.toString();
	} catch {
		return undefined;
	}
}

export function sanitizeAnalyticsReferrer(value: string): string | undefined {
	if (value === '$direct') return value;

	try {
		const url = new URL(value);
		if (url.protocol !== 'https:' && url.protocol !== 'http:') {
			return undefined;
		}
		return url.origin;
	} catch {
		return undefined;
	}
}

export function buildAnalyticsPageviewProperties(
	pageUrl: string,
	referrer?: string
): Record<string, string> | undefined {
	const sanitizedUrl = sanitizeAnalyticsUrl(pageUrl);
	if (!sanitizedUrl) return undefined;

	const parsedUrl = new URL(pageUrl);
	const sanitizedReferrer = referrer ? sanitizeAnalyticsReferrer(referrer) : '$direct';
	const properties: Record<string, string> = {
		$current_url: sanitizedUrl,
		$host: parsedUrl.host,
		$pathname: sanitizeAnalyticsPath(parsedUrl.pathname),
		$referrer: sanitizedReferrer ?? '$direct',
		$referring_domain:
			sanitizedReferrer && sanitizedReferrer !== '$direct'
				? new URL(sanitizedReferrer).host
				: '$direct'
	};

	for (const propertyName of ['utm_source', 'utm_medium', 'utm_campaign'] as const) {
		const value = sanitizeAttributionValue(parsedUrl.searchParams.get(propertyName));
		if (value) properties[propertyName] = value;
	}

	return properties;
}

export function sanitizePostHogEvent(event: CaptureResult | null): CaptureResult | null {
	if (!event?.properties) {
		return event;
	}

	const properties = { ...event.properties };
	for (const propertyName of PATH_PROPERTIES) {
		const value = properties[propertyName];
		if (typeof value === 'string') {
			properties[propertyName] = sanitizeAnalyticsPath(value);
		}
	}

	for (const propertyName of URL_PROPERTIES) {
		const value = properties[propertyName];
		if (typeof value !== 'string') {
			continue;
		}

		const sanitized = sanitizeAnalyticsUrl(value);
		if (sanitized) {
			properties[propertyName] = sanitized;
		} else {
			delete properties[propertyName];
		}
	}

	for (const propertyName of REFERRER_PROPERTIES) {
		const value = properties[propertyName];
		if (typeof value !== 'string') continue;
		const sanitized = sanitizeAnalyticsReferrer(value);
		if (sanitized) properties[propertyName] = sanitized;
		else delete properties[propertyName];
	}

	for (const [propertyName, value] of Object.entries(properties)) {
		const baseName = stripAttributionPrefix(propertyName);
		if (DROP_ATTRIBUTION_PROPERTIES.has(baseName)) {
			delete properties[propertyName];
			continue;
		}

		const utmMatch = /^utm_(source|medium|campaign|content|term)$/.exec(baseName);
		if (!utmMatch) continue;
		if (utmMatch[1] === 'content' || utmMatch[1] === 'term') {
			delete properties[propertyName];
			continue;
		}

		const sanitized = sanitizeAttributionValue(value);
		if (sanitized) properties[propertyName] = sanitized;
		else delete properties[propertyName];
	}

	return { ...event, properties };
}
