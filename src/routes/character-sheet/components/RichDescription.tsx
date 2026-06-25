import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { ALL_CONDITIONS } from '../../../lib/rulesdata/conditions/conditions.data';
import { theme } from '../styles/theme';

// ─────────────────────────────────────────────────────────────────────────────
// Build a single regex that matches any condition name in a string of text.
// For "stacking" conditions whose names end in " X" (e.g. "Slowed X", "Burning X")
// we drop the " X" suffix and let the regex optionally match a trailing number
// so the text can reference them as "Slowed", "Slowed 2", "Burning 3", etc.
// ─────────────────────────────────────────────────────────────────────────────

interface ConditionMatch {
	canonicalName: string;
	description: string;
}

function escapeRegex(s: string): string {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Build a sorted catalog (longest names first) so e.g. "Dazed 2" beats "Dazed". */
const CONDITION_INDEX: { regexSource: string; lookup: Record<string, ConditionMatch> } = (() => {
	const lookup: Record<string, ConditionMatch> = {};
	const patterns: string[] = [];

	const seen = new Set<string>();
	const sorted = [...ALL_CONDITIONS].sort((a, b) => b.name.length - a.name.length);

	for (const cond of sorted) {
		const isStacking = / X$/.test(cond.name);
		const base = isStacking ? cond.name.replace(/ X$/, '') : cond.name;
		const key = base.toLowerCase();
		if (seen.has(key)) continue;
		seen.add(key);

		lookup[key] = { canonicalName: base, description: cond.description };

		// Word-boundary match, case-insensitive (handled by regex flags below).
		// For stacking conditions we allow an optional trailing number, e.g. "Slowed 2".
		const pat = isStacking
			? `\\b${escapeRegex(base)}(?:\\s+\\d+)?\\b`
			: `\\b${escapeRegex(base)}\\b`;
		patterns.push(pat);
	}

	return { regexSource: patterns.join('|'), lookup };
})();

const ConditionToken = styled.button`
	display: inline;
	background: none;
	border: none;
	margin: 0;
	padding: 0;
	font: inherit;
	color: ${theme.colors.accent.warning};
	font-weight: ${theme.typography.fontWeight.bold};
	cursor: help;
	border-bottom: 1px dotted ${theme.colors.accent.warning};
	transition: color ${theme.transitions.fast};

	&:hover,
	&:focus-visible {
		color: ${theme.colors.accent.primary};
		border-bottom-color: ${theme.colors.accent.primary};
		outline: none;
	}
`;

const TooltipBox = styled.div`
	position: fixed;
	z-index: ${theme.zIndex.tooltip};
	max-width: 320px;
	background: ${theme.colors.bg.elevated};
	color: ${theme.colors.text.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	box-shadow: ${theme.shadows.xl};
	padding: ${theme.spacing[3]};
	font-size: ${theme.typography.fontSize.sm};
	line-height: 1.4;
	pointer-events: none;
`;

const TooltipTitle = styled.div`
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.accent.warning};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	font-size: ${theme.typography.fontSize.xs};
	margin-bottom: ${theme.spacing[2]};
`;

interface PopupState {
	x: number;
	y: number;
	title: string;
	body: string;
}

interface ConditionPopupProps {
	popup: PopupState | null;
}

const ConditionPopup: React.FC<ConditionPopupProps> = ({ popup }) => {
	if (!popup) return null;
	// Clamp position so the tooltip stays on screen even near edges.
	const clampedX = Math.min(
		Math.max(8, popup.x),
		typeof window !== 'undefined' ? window.innerWidth - 328 : popup.x
	);
	const clampedY = Math.min(
		Math.max(8, popup.y),
		typeof window !== 'undefined' ? window.innerHeight - 120 : popup.y
	);

	return createPortal(
		<TooltipBox style={{ left: clampedX, top: clampedY }}>
			<TooltipTitle>{popup.title}</TooltipTitle>
			<div>{popup.body}</div>
		</TooltipBox>,
		document.body
	);
};

interface RichDescriptionProps {
	text: string | undefined | null;
	as?: keyof React.JSX.IntrinsicElements;
	className?: string;
}

/**
 * Render descriptive text with any DC20 condition name (Slowed, Stunned,
 * Burning 2, etc.) turned into an interactive token. Hover (desktop) or tap
 * (mobile) shows a small popup with the condition's official description.
 */
export const RichDescription: React.FC<RichDescriptionProps> = ({
	text,
	as = 'span',
	className
}) => {
	const [popup, setPopup] = useState<PopupState | null>(null);
	const closeTimer = useRef<number | null>(null);

	const segments = useMemo(() => {
		if (!text) return [] as Array<string | { match: string; info: ConditionMatch }>;
		if (!CONDITION_INDEX.regexSource) return [text];
		const re = new RegExp(CONDITION_INDEX.regexSource, 'gi');
		const out: Array<string | { match: string; info: ConditionMatch }> = [];
		let lastIndex = 0;
		let m: RegExpExecArray | null;
		while ((m = re.exec(text)) !== null) {
			if (m.index > lastIndex) out.push(text.slice(lastIndex, m.index));
			const matched = m[0];
			// Strip a trailing number+space for the lookup key (e.g. "Slowed 2" → "slowed")
			const base = matched.replace(/\s+\d+$/, '').toLowerCase();
			const info = CONDITION_INDEX.lookup[base];
			if (info) {
				out.push({ match: matched, info });
			} else {
				out.push(matched);
			}
			lastIndex = m.index + matched.length;
		}
		if (lastIndex < text.length) out.push(text.slice(lastIndex));
		return out;
	}, [text]);

	// Dismiss the popup when the user clicks elsewhere or scrolls (touch flow).
	useEffect(() => {
		if (!popup) return;
		const onDocClick = (e: MouseEvent) => {
			// Ignore clicks on a ConditionToken (those are handled by the click handler).
			const target = e.target as HTMLElement;
			if (target.closest('[data-condition-token="true"]')) return;
			setPopup(null);
		};
		const onScroll = () => setPopup(null);
		document.addEventListener('click', onDocClick);
		window.addEventListener('scroll', onScroll, true);
		return () => {
			document.removeEventListener('click', onDocClick);
			window.removeEventListener('scroll', onScroll, true);
		};
	}, [popup]);

	useEffect(() => {
		return () => {
			if (closeTimer.current) window.clearTimeout(closeTimer.current);
		};
	}, []);

	const openPopup = (target: HTMLElement, info: ConditionMatch) => {
		const rect = target.getBoundingClientRect();
		setPopup({
			x: rect.left,
			// Position just below the token; clamp() in the popup will keep it on-screen.
			y: rect.bottom + 6,
			title: info.canonicalName,
			body: info.description
		});
	};

	const Tag = as as any;

	return (
		<Tag className={className}>
			{segments.map((seg, i) => {
				if (typeof seg === 'string') {
					return <React.Fragment key={i}>{seg}</React.Fragment>;
				}
				const { match, info } = seg;
				return (
					<ConditionToken
						key={i}
						type="button"
						data-condition-token="true"
						onMouseEnter={(e) => openPopup(e.currentTarget, info)}
						onMouseLeave={() => {
							if (closeTimer.current) window.clearTimeout(closeTimer.current);
							closeTimer.current = window.setTimeout(() => setPopup(null), 150);
						}}
						onFocus={(e) => openPopup(e.currentTarget, info)}
						onBlur={() => setPopup(null)}
						onClick={(e) => {
							e.stopPropagation();
							// On touch devices `onMouseEnter` won't fire so we toggle on tap.
							setPopup((prev) =>
								prev && prev.title === info.canonicalName
									? null
									: {
											x: e.currentTarget.getBoundingClientRect().left,
											y: e.currentTarget.getBoundingClientRect().bottom + 6,
											title: info.canonicalName,
											body: info.description
										}
							);
						}}
						aria-label={`Condition: ${info.canonicalName}`}
					>
						{match}
					</ConditionToken>
				);
			})}
			<ConditionPopup popup={popup} />
		</Tag>
	);
};

export default RichDescription;
