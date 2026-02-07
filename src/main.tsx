import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import './styles/globals.css';
import i18n, { i18nPromise } from './i18n/config';
import { getConvexClient } from './lib/convexClient';

console.log('[GIMLI DEBUG] 🔧 App Initialization:', {
	VITE_CONVEX_URL: import.meta.env.VITE_CONVEX_URL,
	VITE_USE_CONVEX: import.meta.env.VITE_USE_CONVEX,
	MODE: import.meta.env.MODE,
	DEV: import.meta.env.DEV,
	PROD: import.meta.env.PROD
});

const convex = getConvexClient();
console.log('[GIMLI DEBUG] ✅ Convex client initialized successfully');

// Wait for i18n to initialize before rendering to prevent race conditions in production
i18nPromise.then(() => {
	console.log('[GIMLI DEBUG] ✅ i18n initialized successfully');
	
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<I18nextProvider i18n={i18n}>
				<ConvexAuthProvider client={convex}>
					<App />
				</ConvexAuthProvider>
			</I18nextProvider>
		</React.StrictMode>
	);
}).catch((error) => {
	console.error('[GIMLI DEBUG] ❌ i18n initialization failed:', error);
	// Render anyway with fallback to English
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<I18nextProvider i18n={i18n}>
				<ConvexAuthProvider client={convex}>
					<App />
				</ConvexAuthProvider>
			</I18nextProvider>
		</React.StrictMode>
	);
});
