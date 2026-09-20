import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
	Anvil,
	BookOpen,
	BookOpenText,
	CircleAlert,
	FlaskConical,
	FolderOpen,
	KeyRound,
	Map,
	Menu as MenuIcon,
	Newspaper,
	Sword,
	Swords,
	UserRoundPlus,
	X,
	type LucideIcon
} from 'lucide-react';
import { theme } from '../routes/character-sheet/styles/theme';
import { useIsAuthenticated } from './auth';
import { useAppAuth } from './auth/AuthModeContext';
import {
	getMenuNavigationGroups,
	type MenuActionId,
	type MenuNavigationGroup
} from './menuNavigation';

const ToolbarContainer = styled.div`
	position: fixed;
	top: 1rem;
	left: 1rem;
	z-index: 10000;
	display: flex;
	align-items: center;
	gap: 0.75rem;
`;

const BackButton = styled.button`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	background: rgba(168, 85, 247, 0.05);
	border: 1px solid rgba(168, 85, 247, 0.4);
	border-radius: 8px;
	color: #e0e7ff;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
	cursor: pointer;
	transition: all 0.3s ease;
	backdrop-filter: blur(4px);

	&:hover {
		background: rgba(168, 85, 247, 0.15);
		border-color: #a855f7;
		transform: translateY(-2px);
	}

	&:active {
		transform: scale(0.98);
	}
`;

const MenuButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 2.75rem;
	height: 2.75rem;
	padding: 0;
	border: 1px solid rgba(168, 85, 247, 0.4);
	border-radius: 8px;
	background: rgba(22, 22, 30, 0.72);
	color: #e0e7ff;
	cursor: pointer;
	backdrop-filter: blur(6px);
	transition:
		background 150ms ease,
		border-color 150ms ease;

	&:hover {
		border-color: #a855f7;
		background: rgba(168, 85, 247, 0.15);
	}

	&:focus-visible {
		outline: 2px solid #7dcfff;
		outline-offset: 3px;
	}
`;

const MenuPopover = styled.nav`
	position: absolute;
	top: calc(100% + 0.6rem);
	left: 0;
	width: min(19rem, calc(100vw - 2rem));
	max-height: calc(100vh - 5.25rem);
	overflow-y: auto;
	padding: 0.45rem;
	border: 1px solid rgba(125, 207, 255, 0.3);
	border-radius: 10px;
	background: rgba(22, 22, 30, 0.96);
	box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.35);
	backdrop-filter: blur(10px);
`;

const MenuGroup = styled.div`
	& + & {
		margin-top: 0.35rem;
		padding-top: 0.45rem;
		border-top: 1px solid rgba(86, 95, 137, 0.45);
	}
`;

const MenuGroupTitle = styled.p`
	margin: 0;
	padding: 0.35rem 0.75rem 0.2rem;
	color: #7f89ae;
	font-size: 0.68rem;
	font-weight: 800;
	letter-spacing: 0.1em;
	text-transform: uppercase;
`;

const MenuLink = styled(Link)`
	display: flex;
	align-items: center;
	gap: 0.7rem;
	min-height: 2.75rem;
	padding: 0.65rem 0.75rem;
	border-radius: 7px;
	color: #e0e7ff;
	font-weight: 700;
	text-decoration: none;

	&:hover {
		background: rgba(125, 207, 255, 0.12);
		color: #ffffff;
	}

	&:focus-visible {
		outline: 2px solid #7dcfff;
		outline-offset: 1px;
	}
`;

const actionIcons: Record<MenuActionId, LucideIcon> = {
	whatsNew: Newspaper,
	createCharacter: UserRoundPlus,
	loadCharacter: FolderOpen,
	encounterPlanner: Swords,
	laboratory: FlaskConical,
	myCampaigns: Map,
	joinCampaign: KeyRound,
	spellbook: BookOpen,
	martialManual: Sword,
	conditions: CircleAlert,
	equipage: Anvil,
	rulebook: BookOpenText
};

function NavigationGroup({
	group,
	t,
	onNavigate
}: {
	group: MenuNavigationGroup;
	t: (key: string) => string;
	onNavigate: () => void;
}) {
	return (
		<MenuGroup>
			{group.labelKey && <MenuGroupTitle>{t(group.labelKey)}</MenuGroupTitle>}
			{group.actions.map((action) => {
				const Icon = actionIcons[action.id];
				return (
					<MenuLink key={action.id} to={action.href} onClick={onNavigate}>
						<Icon size={18} aria-hidden="true" /> {t(action.labelKey)}
					</MenuLink>
				);
			})}
		</MenuGroup>
	);
}

export const TopLeftToolbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const isAuthenticated = useIsAuthenticated();
	const { isConvexEnabled } = useAppAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toolbarRef = useRef<HTMLDivElement>(null);
	const navigationGroups = getMenuNavigationGroups({ isAuthenticated, isConvexEnabled });

	useEffect(() => {
		if (!isMenuOpen) return;

		const closeOnOutsideClick = (event: MouseEvent) => {
			if (!toolbarRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
		};
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsMenuOpen(false);
		};

		document.addEventListener('mousedown', closeOnOutsideClick);
		document.addEventListener('keydown', closeOnEscape);

		return () => {
			document.removeEventListener('mousedown', closeOnOutsideClick);
			document.removeEventListener('keydown', closeOnEscape);
		};
	}, [isMenuOpen]);

	// Hide on pages that ship their own in-page back button to avoid duplicates
	// and overlap with the fixed toolbar.
	const hiddenPaths = [
		/^\/character\/[^/]+\/?$/, // character sheet (has its own header back button)
		/^\/character2(?:\/[^/]+)?\/?$/, // alternative character sheet (has its own menu)
		/^\/dm\/monsters\/[^/]+\/?$/, // monster designer
		/^\/dm\/encounters\/[^/]+\/?$/ // encounter planner
	];
	if (hiddenPaths.some((re) => re.test(location.pathname))) return null;

	// Hide back button on menu page
	const showBackButton = location.pathname !== '/menu';

	return (
		<ToolbarContainer ref={toolbarRef}>
			{!showBackButton && (
				<>
					<MenuButton
						type="button"
						aria-label={isMenuOpen ? 'Close main navigation' : 'Open main navigation'}
						aria-expanded={isMenuOpen}
						aria-controls="main-navigation-menu"
						onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
					>
						{isMenuOpen ? (
							<X size={21} aria-hidden="true" />
						) : (
							<MenuIcon size={21} aria-hidden="true" />
						)}
					</MenuButton>
					{isMenuOpen && (
						<MenuPopover id="main-navigation-menu" aria-label="Main navigation">
							{navigationGroups.map((group) => (
								<NavigationGroup
									key={group.id}
									group={group}
									t={t}
									onNavigate={() => setIsMenuOpen(false)}
								/>
							))}
						</MenuPopover>
					)}
				</>
			)}
			{showBackButton && (
				<BackButton onClick={() => navigate('/menu')} title={t('common.backToMenu')}>
					← {t('common.backToMenu')}
				</BackButton>
			)}
		</ToolbarContainer>
	);
};

export default TopLeftToolbar;
