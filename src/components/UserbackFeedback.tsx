import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppAuth } from './auth';
import { getDefaultStorage, getStorageProvider } from '../lib/storage';
import type { SavedCharacter } from '../lib/types/dataContracts';
import {
	isUserbackConfigured,
	loadUserbackWidget,
	refreshUserbackWidget,
	setUserbackData
} from '../lib/feedback/userback';

type TargetElement = {
	selector: string;
	label: string;
	rect: string;
};

const CHARACTER_ROUTE_PATTERN = /^\/character\/([^/]+)(?:\/(edit|levelup))?$/;

export default function UserbackFeedback() {
	const location = useLocation();
	const auth = useAppAuth();
	const lastTargetRef = useRef<TargetElement | null>(null);

	const routeContext = useMemo(() => getRouteContext(location.pathname), [location.pathname]);

	useEffect(() => {
		loadUserbackWidget();
	}, []);

	useEffect(() => {
		if (!isUserbackConfigured()) {
			return;
		}

		const handlePointerDown = (event: PointerEvent) => {
			if (!(event.target instanceof Element)) {
				return;
			}

			if (isUserbackElement(event.target)) {
				return;
			}

			lastTargetRef.current = describeTarget(event.target);
			setUserbackData({
				target_selector: lastTargetRef.current.selector,
				target_label: lastTargetRef.current.label,
				target_rect: lastTargetRef.current.rect
			});
		};

		document.addEventListener('pointerdown', handlePointerDown, { capture: true });
		return () => document.removeEventListener('pointerdown', handlePointerDown, { capture: true });
	}, []);

	useEffect(() => {
		if (!isUserbackConfigured()) {
			return;
		}

		let cancelled = false;

		async function syncContext() {
			const character = routeContext.characterId
				? await getFeedbackCharacter(routeContext.characterId)
				: null;

			if (cancelled) {
				return;
			}

			const target = lastTargetRef.current;
			setUserbackData({
				app: 'dc20clean',
				route: routeContext.route,
				path: location.pathname,
				query: location.search || 'none',
				storage_provider: getStorageProvider(),
				convex_enabled: auth.isConvexEnabled,
				authenticated: auth.isAuthenticated,
				auth_loading: auth.isLoading,
				character_id: routeContext.characterId ?? 'none',
				character_name: character?.finalName ?? 'none',
				character_class: character?.className ?? 'none',
				character_level: character?.level ?? 0,
				character_rules_version: character?.rulesVersion ?? 'unknown',
				character_schema_version: character?.schemaVersion ?? 'unknown',
				target_selector: target?.selector ?? 'none',
				target_label: target?.label ?? 'none',
				target_rect: target?.rect ?? 'none'
			});
			refreshUserbackWidget();
		}

		void syncContext();

		return () => {
			cancelled = true;
		};
	}, [
		auth.isAuthenticated,
		auth.isConvexEnabled,
		auth.isLoading,
		location.pathname,
		location.search,
		routeContext
	]);

	return null;
}

async function getFeedbackCharacter(characterId: string): Promise<SavedCharacter | null> {
	try {
		return await getDefaultStorage().getCharacterById(characterId);
	} catch {
		return null;
	}
}

function getRouteContext(pathname: string): { route: string; characterId?: string } {
	const characterMatch = pathname.match(CHARACTER_ROUTE_PATTERN);
	if (characterMatch) {
		const [, characterId, mode] = characterMatch;
		return {
			route: mode ? `character_${mode}` : 'character_sheet',
			characterId
		};
	}

	if (pathname === '/menu' || pathname === '/') return { route: 'menu' };
	if (pathname === '/create-character') return { route: 'character_creation' };
	if (pathname === '/load-character') return { route: 'load_character' };
	if (pathname === '/spellbook') return { route: 'spellbook' };
	if (pathname === '/martial-manual') return { route: 'martial_manual' };
	if (pathname === '/conditions') return { route: 'conditions' };
	if (pathname === '/custom-equipment') return { route: 'custom_equipment' };
	if (pathname.startsWith('/dm/monsters')) return { route: 'dm_monsters' };
	if (pathname.startsWith('/dm/encounters')) return { route: 'dm_encounters' };

	return { route: 'unknown' };
}

function describeTarget(target: Element): TargetElement {
	const rect = target.getBoundingClientRect();
	const selector = getSelector(target);
	const label = getTargetLabel(target);

	return {
		selector,
		label,
		rect: `${Math.round(rect.left)},${Math.round(rect.top)},${Math.round(rect.width)}x${Math.round(rect.height)}`
	};
}

function isUserbackElement(target: Element): boolean {
	let current: Element | null = target;

	while (current) {
		const id = current.id.toLowerCase();
		const className = typeof current.className === 'string' ? current.className.toLowerCase() : '';

		if (id.includes('userback') || className.includes('userback')) {
			return true;
		}

		if (current instanceof HTMLIFrameElement && current.src.includes('userback')) {
			return true;
		}

		current = current.parentElement;
	}

	return false;
}

function getTargetLabel(target: Element): string {
	const ariaLabel = target.getAttribute('aria-label');
	const title = target.getAttribute('title');
	const text = target.textContent?.replace(/\s+/g, ' ').trim();
	return truncate(ariaLabel || title || text || target.tagName.toLowerCase(), 80);
}

function getSelector(target: Element): string {
	if (target.id) {
		return `#${cssEscape(target.id)}`;
	}

	const stableAttribute = getStableAttributeSelector(target);
	if (stableAttribute) {
		return stableAttribute;
	}

	const segments: string[] = [];
	let current: Element | null = target;

	while (current && current !== document.body && segments.length < 4) {
		segments.unshift(getElementSegment(current));
		current = current.parentElement;
	}

	return segments.join(' > ') || target.tagName.toLowerCase();
}

function getStableAttributeSelector(target: Element): string | null {
	for (const attr of ['data-testid', 'data-test', 'name', 'role', 'aria-label']) {
		const value = target.getAttribute(attr);
		if (value) {
			return `${target.tagName.toLowerCase()}[${attr}="${cssEscape(value)}"]`;
		}
	}

	return null;
}

function getElementSegment(target: Element): string {
	const classNames = Array.from(target.classList)
		.filter((className) => /^[a-zA-Z_-][\w-]*$/.test(className))
		.slice(0, 2);
	const base = [
		target.tagName.toLowerCase(),
		...classNames.map((className) => `.${className}`)
	].join('');
	const parent = target.parentElement;

	if (!parent) {
		return base;
	}

	const sameTagSiblings = Array.from(parent.children).filter(
		(child) => child.tagName === target.tagName
	);
	const index = sameTagSiblings.indexOf(target);

	return sameTagSiblings.length > 1 && index >= 0 ? `${base}:nth-of-type(${index + 1})` : base;
}

function cssEscape(value: string): string {
	if (typeof CSS !== 'undefined' && CSS.escape) {
		return CSS.escape(value);
	}

	return value.replace(/["\\]/g, '\\$&');
}

function truncate(value: string, maxLength: number): string {
	return value.length > maxLength ? `${value.slice(0, maxLength - 3)}...` : value;
}
