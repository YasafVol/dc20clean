import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import App from './App';
import './styles/globals.css';
import { getConvexClient } from './lib/convexClient';

// Check if Convex is enabled via environment variable
const isConvexEnabled = import.meta.env.VITE_USE_CONVEX === 'true';

// Only initialize Convex client if enabled
const convex = isConvexEnabled ? getConvexClient() : null;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		{isConvexEnabled && convex ? (
			<ConvexAuthProvider client={convex}>
				<App />
			</ConvexAuthProvider>
		) : (
			<App />
		)}
	</React.StrictMode>
);
