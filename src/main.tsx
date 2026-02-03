import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import App from './App';
import './styles/globals.css';
import { getConvexClient } from './lib/convexClient';

console.log('[GIMLI DEBUG] 🔧 App Initialization:', {
	VITE_CONVEX_URL: import.meta.env.VITE_CONVEX_URL,
	VITE_USE_CONVEX: import.meta.env.VITE_USE_CONVEX,
	MODE: import.meta.env.MODE,
	DEV: import.meta.env.DEV,
	PROD: import.meta.env.PROD
});

console.log('[GIMLI DEBUG] 🔧 App Initialization:', {
	VITE_CONVEX_URL: import.meta.env.VITE_CONVEX_URL,
	VITE_USE_CONVEX: import.meta.env.VITE_USE_CONVEX,
	MODE: import.meta.env.MODE,
	DEV: import.meta.env.DEV,
	PROD: import.meta.env.PROD
});

const convex = getConvexClient();
console.log('[GIMLI DEBUG] ✅ Convex client initialized successfully');

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ConvexAuthProvider client={convex}>
			<App />
		</ConvexAuthProvider>
	</React.StrictMode>
);

={convex}>
			<App />
		</ConvexAuthProvider>
	</React.StrictMode>
);

