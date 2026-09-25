import { useState } from 'react';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { latestProductUpdate } from '../routes/product-update/updates';
import {
	StyledWhatsNewActions,
	StyledWhatsNewCloseButton,
	StyledWhatsNewCopy,
	StyledWhatsNewDate,
	StyledWhatsNewHeader,
	StyledWhatsNewHighlights,
	StyledWhatsNewKicker,
	StyledWhatsNewPrimaryLink,
	StyledWhatsNewSection,
	StyledWhatsNewSecondaryLink,
	StyledWhatsNewTitle
} from './styled';

export const DISMISSED_UPDATE_STORAGE_KEY = 'dc20clean.dismissedWhatsNewUpdate';
export const SHOW_WHATS_NEW_QUERY_PARAM = 'showWhatsNew';

function isForcedVisible(): boolean {
	return new URLSearchParams(window.location.search).get(SHOW_WHATS_NEW_QUERY_PARAM) === '1';
}

function getDismissedUpdateSlug(): string | null {
	try {
		return window.localStorage.getItem(DISMISSED_UPDATE_STORAGE_KEY);
	} catch {
		return null;
	}
}

function persistDismissedUpdateSlug(slug: string): void {
	try {
		window.localStorage.setItem(DISMISSED_UPDATE_STORAGE_KEY, slug);
	} catch {
		// The card still closes for this session when storage is unavailable.
	}
}

export function useWhatsNewCardVisibility() {
	const [isVisible, setIsVisible] = useState(
		() => isForcedVisible() || getDismissedUpdateSlug() !== latestProductUpdate.slug
	);

	const dismiss = () => {
		persistDismissedUpdateSlug(latestProductUpdate.slug);
		setIsVisible(false);
	};

	return { isVisible, dismiss };
}

interface WhatsNewCardProps {
	onDismiss: () => void;
}

export default function WhatsNewCard({ onDismiss }: WhatsNewCardProps) {
	return (
		<StyledWhatsNewSection aria-labelledby="whats-new-title">
			<StyledWhatsNewCloseButton
				type="button"
				onClick={onDismiss}
				aria-label="Dismiss What's New"
				title="Dismiss What's New"
			>
				<X size={17} aria-hidden="true" />
			</StyledWhatsNewCloseButton>
			<StyledWhatsNewHeader>
				<div>
					<StyledWhatsNewKicker>
						<Sparkles size={14} aria-hidden="true" /> What&apos;s new
					</StyledWhatsNewKicker>
					<StyledWhatsNewTitle id="whats-new-title">
						{latestProductUpdate.title}
					</StyledWhatsNewTitle>
				</div>
				<StyledWhatsNewDate dateTime={latestProductUpdate.dateTime}>
					{latestProductUpdate.date}
				</StyledWhatsNewDate>
			</StyledWhatsNewHeader>
			<StyledWhatsNewCopy>{latestProductUpdate.excerpt}</StyledWhatsNewCopy>
			<StyledWhatsNewHighlights>
				{latestProductUpdate.highlights.map((highlight) => (
					<li key={highlight}>{highlight}</li>
				))}
			</StyledWhatsNewHighlights>
			<StyledWhatsNewActions>
				<StyledWhatsNewPrimaryLink href={latestProductUpdate.updateHref}>
					Read the full update <ArrowRight size={15} aria-hidden="true" />
				</StyledWhatsNewPrimaryLink>
				<StyledWhatsNewSecondaryLink href={latestProductUpdate.featureHref}>
					{latestProductUpdate.featureLabel}
				</StyledWhatsNewSecondaryLink>
			</StyledWhatsNewActions>
		</StyledWhatsNewSection>
	);
}
