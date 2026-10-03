import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledFooter } from '../styles/App.styles';
import { isAnalyticsEnabled } from '../lib/analytics/posthog';
import { isLegalConsentFlowEnabled } from '../lib/analytics/config';
import UserbackFeedback from './UserbackFeedback';

export function LegalFooter() {
	const { i18n } = useTranslation();
	const spanish = i18n.resolvedLanguage === 'es';
	return (
		<StyledFooter aria-label={spanish ? 'Información legal' : 'Legal information'}>
			<nav
				className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
				aria-label={spanish ? 'Enlaces legales' : 'Legal links'}
			>
				{isLegalConsentFlowEnabled && (
					<>
						<Link to="/privacy" className="underline hover:text-sky-300">
							{spanish ? 'Privacidad' : 'Privacy'}
						</Link>
						<Link to="/terms" className="underline hover:text-sky-300">
							{spanish ? 'Condiciones de uso' : 'Terms of Use'}
						</Link>
					</>
				)}
				{isLegalConsentFlowEnabled && isAnalyticsEnabled && (
					<button
						type="button"
						onClick={() => {
							void import('./analytics/ConsentManager').then(({ showAnalyticsPreferences }) =>
								showAnalyticsPreferences()
							);
						}}
						className="underline hover:text-sky-300"
					>
						{spanish ? 'Opciones de privacidad' : 'Privacy settings'}
					</button>
				)}
				<UserbackFeedback />
				<span>
					{spanish ? 'Arte:' : 'Art:'}{' '}
					<a
						href="https://iknowkingrabbit.itch.io/heroic-icon-pack"
						target="_blank"
						rel="noopener noreferrer"
						className="underline hover:text-sky-300"
					>
						Aleksandr Makarov
					</a>
					{' · '}
					<a
						href="https://beowulf.itch.io/rpg-boss-monsters-minions-huge-pack"
						target="_blank"
						rel="noopener noreferrer"
						className="underline hover:text-sky-300"
					>
						Beowulf
					</a>
				</span>
			</nav>
		</StyledFooter>
	);
}
