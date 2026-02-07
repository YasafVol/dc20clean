import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import LanguageSwitcher from './LanguageSwitcher';

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
	gap: 0.5rem;
	padding: 0.5rem 0.75rem;
	background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
	border: 1px solid rgba(168, 85, 247, 0.3);
	border-radius: 8px;
	color: #e0e7ff;
	font-size: 0.875rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

	&:hover {
		background: linear-gradient(145deg, #312e81 0%, #3730a3 100%);
		border-color: rgba(168, 85, 247, 0.5);
		transform: translateY(-1px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
	}

	&:active {
		transform: translateY(0);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}
`;

export const TopLeftToolbar: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { t } = useTranslation();

	// Hide back button on menu page
	const showBackButton = location.pathname !== '/menu';

	return (
		<ToolbarContainer>
			<LanguageSwitcher />
			{showBackButton && (
				<BackButton onClick={() => navigate('/menu')} title={t('common.backToMenu')}>
					← {t('common.backToMenu')}
				</BackButton>
			)}
		</ToolbarContainer>
	);
};

export default TopLeftToolbar;
