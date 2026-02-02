import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import App from './App';
import './styles/globals.css';
import { getConvexClient } from './lib/convexClient';

const convex = getConvexClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
		<ConvexAuthProvider client={convex}>
			<App />
		</ConvexAuthProvider>
	</React.StrictMode>
);

