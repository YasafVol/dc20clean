import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppAuth } from './auth';
import { getStorageProvider } from '../lib/storage';
import {
	isUserbackConfigured,
	openUserbackOnLoad,
	setUserbackData
} from '../lib/feedback/userback';

const CHARACTER_ROUTE_PATTERN = /^\/character\/[^/]+(?:\/(?:edit|levelup))?$/;

export default function UserbackFeedback() {
	const { pathname } = useLocation();
	const { isAuthenticated, isConvexEnabled } = useAppAuth();
	const { i18n } = useTranslation();
	const [showNotice, setShowNotice] = useState(false);
	if (!isUserbackConfigured()) return null;

	const spanish = i18n.resolvedLanguage === 'es';
	function openFeedback() {
		setUserbackData({
			app: 'dc20clean',
			route: getRouteContext(pathname),
			storage_provider: getStorageProvider(),
			convex_enabled: isConvexEnabled,
			authenticated: isAuthenticated
		});
		openUserbackOnLoad();
		setShowNotice(false);
	}

	return (
		<span className="inline-flex flex-wrap items-center justify-center gap-2">
			{!showNotice ? (
				<button
					type="button"
					onClick={() => setShowNotice(true)}
					className="underline hover:text-sky-300"
				>
					{spanish ? 'Enviar comentarios' : 'Send feedback'}
				</button>
			) : (
				<>
					<span>
						{spanish
							? 'Se abrirá Userback. Puede recibir la URL actual y los datos que decidas enviar.'
							: 'This opens Userback. It may receive the current URL and anything you choose to submit.'}
					</span>
					<button
						type="button"
						onClick={openFeedback}
						className="font-semibold text-sky-300 underline"
					>
						{spanish ? 'Continuar' : 'Continue'}
					</button>
					<button type="button" onClick={() => setShowNotice(false)} className="underline">
						{spanish ? 'Cancelar' : 'Cancel'}
					</button>
				</>
			)}
		</span>
	);
}

function getRouteContext(pathname: string): string {
	if (CHARACTER_ROUTE_PATTERN.test(pathname)) return 'character_sheet';
	if (pathname === '/menu' || pathname === '/') return 'menu';
	if (pathname === '/create-character') return 'character_creation';
	if (pathname === '/load-character') return 'load_character';
	if (pathname.startsWith('/campaigns')) return 'campaign';
	if (pathname.startsWith('/dm/monsters')) return 'dm_monsters';
	if (pathname.startsWith('/dm/encounters')) return 'dm_encounters';
	if (pathname === '/privacy' || pathname === '/terms') return 'legal';
	return 'other';
}
