import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import './styles/globals.css';
import i18n, { i18nPromise } from './i18n/config';
import { getOptionalConvexClient } from './lib/convexClient';
import { ConvexAppAuthProvider, LocalAppAuthProvider } from './components/auth/AuthModeContext';
import { CurrentUserProvider } from './components/auth/CurrentUserContext';

console.log('[GIMLI DEBUG] 🔧 App Initialization:', {
	VITE_CONVEX_URL: import.meta.env.VITE_CONVEX_URL,
	VITE_USE_CONVEX: import.meta.env.VITE_USE_CONVEX,
	MODE: import.meta.env.MODE,
	DEV: import.meta.env.DEV,
	PROD: import.meta.env.PROD
});

const convex = getOptionalConvexClient();
console.log(
	convex
		? '[GIMLI DEBUG] ✅ Convex client initialized successfully'
		: '[GIMLI DEBUG] 📦 Running in localStorage-only mode'
);

function renderApp() {
	const app = (
		<I18nextProvider i18n={i18n}>
			{convex ? (
				<ConvexAuthProvider client={convex}>
					<ConvexAppAuthProvider>
						<CurrentUserProvider>
							<App />
						</CurrentUserProvider>
					</ConvexAppAuthProvider>
				</ConvexAuthProvider>
			) : (
				<LocalAppAuthProvider>
					<App />
				</LocalAppAuthProvider>
			)}
		</I18nextProvider>
	);

	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>{app}</React.StrictMode>
	);
}

// Wait for i18n to initialize before rendering to prevent race conditions in production
i18nPromise
	.then(() => {
		console.log('[GIMLI DEBUG] ✅ i18n initialized successfully');
		renderApp();
	})
	.catch((error) => {
		console.error('[GIMLI DEBUG] ❌ i18n initialization failed:', error);
		renderApp();
	});
