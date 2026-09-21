import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledFooter } from '../styles/App.styles';
import { isAnalyticsEnabled } from '../lib/analytics/posthog';
import { isLegalConsentFlowEnabled } from '../lib/analytics/config';
import { isUserbackConfigured } from '../lib/feedback/userback';
import UserbackFeedback from './UserbackFeedback';

export function LegalFooter() {
	const { i18n } = useTranslation();
	const spanish = i18n.resolvedLanguage === 'es';
	if (!isLegalConsentFlowEnabled && !isUserbackConfigured()) return null;
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
			</nav>
		</StyledFooter>
	);
}
