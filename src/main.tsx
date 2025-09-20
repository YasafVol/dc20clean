import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { injectCSSVariables } from './design-system/styles/colors';

// Inject CSS variables on app startup
injectCSSVariables();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
