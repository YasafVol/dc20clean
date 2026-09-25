import { describe, expect, it } from 'vitest';
import {
	buildAnalyticsPageviewProperties,
	sanitizeAnalyticsPath,
	sanitizeAnalyticsReferrer,
	sanitizeAnalyticsUrl,
	sanitizePostHogEvent
} from './privacy';

describe('analytics privacy', () => {
	it.each([
		['/character/char_123', '/character/:id'],
		['/character/char_123/edit', '/character/:id/edit'],
		['/character/char_123/levelup', '/character/:id/levelup'],
		['/character2/char_123', '/character2/:id'],
		['/dm/monsters/monster_123', '/dm/monsters/:id'],
		['/dm/encounters/encounter_123', '/dm/encounters/:id'],
		['/campaigns/join/SECRET', '/campaigns/join/:code'],
		['/campaigns/campaign_123', '/campaigns/:id'],
		[
			'/campaigns/campaign_123/character/character_456',
			'/campaigns/:campaignId/character/:characterId'
		],
		['/spellbook', '/spellbook'],
		['/rulebook/a-user-supplied-path', '/rulebook/*'],
		['/some-new-route/private-value', '/other']
	])('normalizes %s', (input, expected) => {
		expect(sanitizeAnalyticsPath(input)).toBe(expected);
	});

	it('drops unknown path segments and URL credentials before sending', () => {
		expect(sanitizeAnalyticsUrl('https://person:secret@example.com/new/private?token=value')).toBe(
			'https://example.com/other'
		);
	});

	it('removes query strings and hashes from URLs', () => {
		expect(
			sanitizeAnalyticsUrl(
				'https://dc20clean.vercel.app/character/char_123?name=Secret#private-note'
			)
		).toBe('https://dc20clean.vercel.app/character/:id');
	});

	it('reduces referrers to their origin', () => {
		expect(sanitizeAnalyticsReferrer('https://example.com/private/path?token=secret')).toBe(
			'https://example.com'
		);
		expect(sanitizeAnalyticsReferrer('$direct')).toBe('$direct');
	});

	it('builds a minimal pageview with constrained acquisition properties', () => {
		expect(
			buildAnalyticsPageviewProperties(
				'https://dc20clean.vercel.app/campaigns/join/SECRET?utm_source=reddit&utm_medium=social&utm_campaign=launch-1&utm_term=private+query',
				'https://example.com/private/path?token=secret'
			)
		).toEqual({
			$current_url: 'https://dc20clean.vercel.app/campaigns/join/:code',
			$host: 'dc20clean.vercel.app',
			$pathname: '/campaigns/join/:code',
			$referrer: 'https://example.com',
			$referring_domain: 'example.com',
			utm_source: 'reddit',
			utm_medium: 'social',
			utm_campaign: 'launch-1'
		});
	});

	it('sanitizes PostHog URL and acquisition properties without mutating the source event', () => {
		const source = {
			uuid: '00000000-0000-4000-8000-000000000000',
			event: '$pageview',
			properties: {
				$pathname: '/campaigns/join/SECRET',
				$initial_pathname: '/character/private-id',
				$session_entry_pathname: '/dm/encounters/private-id',
				$prev_pageview_pathname: '/dm/monsters/private-id',
				$current_url: 'https://dc20clean.vercel.app/campaigns/join/SECRET?email=user@example.com',
				$referrer: 'https://example.com/private/path?token=secret',
				$session_entry_referrer: 'https://example.com/another/private/path',
				utm_source: 'reddit',
				utm_medium: 'social feed',
				utm_content: 'user@example.com',
				$initial_utm_campaign: 'launch-1',
				$session_entry_utm_term: 'private search',
				gclid: 'tracking-id',
				ph_keyword: 'private search'
			}
		};

		const result = sanitizePostHogEvent(source);

		expect(result?.properties).toMatchObject({
			$pathname: '/campaigns/join/:code',
			$initial_pathname: '/character/:id',
			$session_entry_pathname: '/dm/encounters/:id',
			$prev_pageview_pathname: '/dm/monsters/:id',
			$current_url: 'https://dc20clean.vercel.app/campaigns/join/:code',
			$referrer: 'https://example.com',
			$session_entry_referrer: 'https://example.com',
			utm_source: 'reddit',
			$initial_utm_campaign: 'launch-1'
		});
		expect(result?.properties).not.toHaveProperty('utm_medium');
		expect(result?.properties).not.toHaveProperty('utm_content');
		expect(result?.properties).not.toHaveProperty('$session_entry_utm_term');
		expect(result?.properties).not.toHaveProperty('gclid');
		expect(result?.properties).not.toHaveProperty('ph_keyword');
		expect(source.properties.$pathname).toBe('/campaigns/join/SECRET');
	});
});
