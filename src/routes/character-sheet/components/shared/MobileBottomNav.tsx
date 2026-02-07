/**
 * Mobile Bottom Navigation
 *
 * Responsive bottom tab bar for mobile devices.
 * Shows primary tabs with badge support.
 * Hidden on tablet/desktop via CSS.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme, media } from '../../styles/theme';

interface MobileBottomNavTab {
	id: string;
	label: string;
	emoji: string;
	badge?: number;
}

interface MobileBottomNavProps {
	tabs: MobileBottomNavTab[];
	activeTab: string;
	onTabChange: (tabId: string) => void;
	onMoreClick?: () => void; // Optional: click handler for hamburger menu
}

const Container = styled.nav`
	display: none;

	${media.mobile} {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: ${theme.colors.bg.elevated};
		border-top: 1px solid ${theme.colors.border.default};
		z-index: ${theme.zIndex.sticky};
		padding: ${theme.spacing[2]} 0;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
	}
`;

const TabButton = styled(motion.button)<{ $active: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
	background: transparent;
	border: none;
	color: ${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.text.secondary)};
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	cursor: pointer;
	position: relative;
	min-width: 60px;
	flex: 1;
	max-width: 100px;

	/* Touch target optimization */
	min-height: 48px;
`;

const TabEmoji = styled.span<{ $active: boolean }>`
	font-size: 20px;
	filter: ${(props) => (props.$active ? 'none' : 'grayscale(0.5)')};
	opacity: ${(props) => (props.$active ? 1 : 0.7)};
`;

const TabLabel = styled.span`
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.medium};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	white-space: nowrap;
`;

const TabBadge = styled.span`
	position: absolute;
	top: 4px;
	right: 8px;
	background: ${theme.colors.accent.danger};
	color: ${theme.colors.text.inverse};
	border-radius: ${theme.borderRadius.full};
	padding: 2px 6px;
	font-size: 10px;
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: 1;
	min-width: 16px;
	text-align: center;
`;

const ActiveIndicator = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 30%;
	transform: translateX(-50%);
	width: 40px;
	height: 2px;
	background: ${theme.colors.accent.primary};
	border-radius: 0 0 ${theme.borderRadius.sm} ${theme.borderRadius.sm};
`;

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
	tabs,
	activeTab,
	onTabChange,
	onMoreClick
}) => {
	const { t } = useTranslation();
	return (
		<Container>
			{tabs.map((tab) => {
				const isActive = activeTab === tab.id;

				return (
					<TabButton
						key={tab.id}
						$active={isActive}
						onClick={() => onTabChange(tab.id)}
						whileTap={{ scale: 0.95 }}
					>
						{isActive && (
							<ActiveIndicator layoutId="mobile-tab-indicator" transition={{ duration: 0.2 }} />
						)}
						<TabEmoji $active={isActive}>{tab.emoji}</TabEmoji>
						<TabLabel>{tab.label}</TabLabel>
						{tab.badge !== undefined && tab.badge > 0 && <TabBadge>{tab.badge}</TabBadge>}
					</TabButton>
				);
			})}

			{/* More button - opens hamburger drawer */}
			{onMoreClick && (
				<TabButton $active={false} onClick={onMoreClick} whileTap={{ scale: 0.95 }}>
					<TabEmoji $active={false}>☰</TabEmoji>
					<TabLabel>{t('characterSheet.mobileMore')}</TabLabel>
				</TabButton>
			)}
		</Container>
	);
};

export default MobileBottomNav;
