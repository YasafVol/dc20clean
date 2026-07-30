import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme } from '../routes/character-sheet/styles/theme';

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

export const TopLeftToolbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation();

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
		<ToolbarContainer>
			{showBackButton && (
				<BackButton onClick={() => navigate('/menu')} title={t('common.backToMenu')}>
					← {t('common.backToMenu')}
				</BackButton>
			)}
		</ToolbarContainer>
	);
};

export default TopLeftToolbar;
