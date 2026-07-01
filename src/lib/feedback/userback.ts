type UserbackValue = string | number | boolean;
type UserbackData = Record<string, UserbackValue>;

type UserbackGlobal = {
	access_token?: string;
	custom_data?: UserbackData;
	refresh?: () => void;
	setData?: (data: UserbackData) => void;
};

declare global {
	interface Window {
		Userback?: UserbackGlobal;
	}
}

const USERBACK_SCRIPT_ID = 'userback-widget-script';
const USERBACK_SCRIPT_SRC = 'https://static.userback.io/widget/v1.js';

export function isUserbackConfigured(): boolean {
	return getUserbackAccessToken().length > 0;
}

export function loadUserbackWidget(): boolean {
	const accessToken = getUserbackAccessToken();

	if (!accessToken || typeof window === 'undefined' || typeof document === 'undefined') {
		return false;
	}

	window.Userback = window.Userback || {};
	window.Userback.access_token = accessToken;
	(window.Userback as any).widget_settings = {
		...((window.Userback as any).widget_settings ?? {}),
		position: 'bottom-left',
	};

	if (document.getElementById(USERBACK_SCRIPT_ID) || findUserbackScript()) {
		return true;
	}

	const script = document.createElement('script');
	script.id = USERBACK_SCRIPT_ID;
	script.async = true;
	script.src = USERBACK_SCRIPT_SRC;
	document.body.appendChild(script);

	return true;
}

export function setUserbackData(data: UserbackData): void {
	if (!isUserbackConfigured() || typeof window === 'undefined') {
		return;
	}

	window.Userback = window.Userback || {};
	window.Userback.custom_data = {
		...(window.Userback.custom_data ?? {}),
		...data
	};
	window.Userback.setData?.(data);
}

export function refreshUserbackWidget(): void {
	if (!isUserbackConfigured() || typeof window === 'undefined') {
		return;
	}

	window.Userback?.refresh?.();
}

function getUserbackAccessToken(): string {
	return (import.meta.env.VITE_USERBACK_ACCESS_TOKEN ?? '').trim();
}

function findUserbackScript(): HTMLScriptElement | null {
	return document.querySelector(`script[src="${USERBACK_SCRIPT_SRC}"]`);
}
