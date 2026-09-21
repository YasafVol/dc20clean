import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import './consent.css';
import { isAnalyticsEnabled, stopAnalyticsCapture } from '../../lib/analytics/posthog';
import { setAnalyticsConsent } from '../../lib/analytics/consent';
import { isLegalConsentFlowEnabled } from '../../lib/analytics/config';

// Increment this when the reviewed analytics notice changes materially.
export const ANALYTICS_NOTICE_REVISION = 1;
const CONSENT_COOKIE_NAME = 'dc20clean_analytics_choice';
let started: Promise<void> | null = null;

function syncConsent(): void {
	const allowed = CookieConsent.validConsent() && CookieConsent.acceptedCategory('analytics');
	setAnalyticsConsent(allowed);
	if (!allowed) void stopAnalyticsCapture();
}

function startConsentManager(): Promise<void> {
	started ??= CookieConsent.run({
		mode: 'opt-in',
		hideFromBots: false,
		revision: ANALYTICS_NOTICE_REVISION,
		cookie: { name: CONSENT_COOKIE_NAME, expiresAfterDays: 182, sameSite: 'Lax' },
		guiOptions: {
			consentModal: {
				layout: 'bar inline',
				position: 'bottom center',
				equalWeightButtons: true
			},
			preferencesModal: { layout: 'box', equalWeightButtons: true }
		},
		categories: {
			necessary: { enabled: true, readOnly: true },
			analytics: {}
		},
		language: {
			default: 'en',
			translations: {
				en: {
					consentModal: {
						title: 'Help us improve DC20Clean?',
						description:
							'Essential storage keeps the app working. With your permission, PostHog records which pages and features you use, where you arrived from, and your account ID after sign-in. No advertising or data sale. <a href="/privacy">Read our privacy notice</a>.',
						acceptAllBtn: 'Allow analytics',
						acceptNecessaryBtn: 'No thanks',
						showPreferencesBtn: 'Details'
					},
					preferencesModal: {
						title: 'Privacy settings',
						acceptAllBtn: 'Allow analytics',
						acceptNecessaryBtn: 'Reject analytics',
						savePreferencesBtn: 'Save choice',
						closeIconLabel: 'Close privacy settings',
						sections: [
							{
								title: 'Your choice',
								description:
									'You can change this at any time using Privacy settings at the bottom of the app.'
							},
							{
								title: 'Essential storage',
								description: 'Sign-in and locally saved characters need browser storage to work.',
								linkedCategory: 'necessary'
							},
							{
								title: 'Optional analytics',
								description:
									'PostHog uses browser storage and records limited usage and source data. Signed-in activity is linked to your account ID. The app works without it.',
								linkedCategory: 'analytics'
							},
							{
								title: 'More information',
								description:
									'<a href="/privacy">Privacy notice</a> and <a href="/terms">Terms of Use</a>.'
							}
						]
					}
				},
				es: {
					consentModal: {
						title: '¿Nos ayudas a mejorar DC20Clean?',
						description:
							'El almacenamiento esencial permite usar la aplicación. Si aceptas, PostHog registra las páginas y funciones que utilizas, de dónde llegaste y tu identificador de cuenta al iniciar sesión. No vendemos datos ni mostramos publicidad. <a href="/privacy">Consulta el aviso de privacidad</a>.',
						acceptAllBtn: 'Permitir análisis',
						acceptNecessaryBtn: 'No, gracias',
						showPreferencesBtn: 'Detalles'
					},
					preferencesModal: {
						title: 'Opciones de privacidad',
						acceptAllBtn: 'Permitir análisis',
						acceptNecessaryBtn: 'Rechazar análisis',
						savePreferencesBtn: 'Guardar elección',
						closeIconLabel: 'Cerrar opciones de privacidad',
						sections: [
							{
								title: 'Tu elección',
								description:
									'Puedes cambiarla cuando quieras en Opciones de privacidad al pie de la aplicación.'
							},
							{
								title: 'Almacenamiento esencial',
								description:
									'El inicio de sesión y los personajes guardados localmente necesitan almacenamiento del navegador.',
								linkedCategory: 'necessary'
							},
							{
								title: 'Análisis opcional',
								description:
									'PostHog usa almacenamiento del navegador y registra datos limitados de uso y origen. La actividad con sesión iniciada se vincula a tu identificador de cuenta. La aplicación funciona sin esto.',
								linkedCategory: 'analytics'
							},
							{
								title: 'Más información',
								description:
									'<a href="/privacy">Aviso de privacidad</a> y <a href="/terms">Condiciones de uso</a>.'
							}
						]
					}
				}
			}
		},
		onConsent: syncConsent,
		onChange: syncConsent
	})
		.then(syncConsent)
		.catch(() => {
			started = null;
			setAnalyticsConsent(false);
			void stopAnalyticsCapture();
		});
	return started;
}

export async function showAnalyticsPreferences(): Promise<void> {
	await startConsentManager();
	CookieConsent.showPreferences();
}

export function ConsentManager() {
	const { i18n } = useTranslation();
	const language = i18n.resolvedLanguage === 'es' ? 'es' : 'en';

	useEffect(() => {
		if (!isAnalyticsEnabled || !isLegalConsentFlowEnabled) return;
		void startConsentManager().then(() => CookieConsent.setLanguage(language));
	}, [language]);

	return null;
}
