import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';

// Initialize i18n and export both the instance and the promise
const i18nPromise = i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: { translation: en },
			es: { translation: es }
		},
		fallbackLng: 'en',
		// Set English as default, only use detected language if explicitly saved
		lng: localStorage.getItem('preferredLanguage') || 'en',
		debug: false,
		interpolation: {
			escapeValue: false // React already escapes
		},
		detection: {
			// Only check localStorage (user's explicit choice), ignore browser settings
			order: ['localStorage'],
			caches: ['localStorage'],
			lookupLocalStorage: 'preferredLanguage'
		}
	});

export { i18nPromise };
export default i18n;
