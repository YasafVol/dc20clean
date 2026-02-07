/**
 * Hamburger Menu Drawer
 *
 * Mobile-only drawer that shows overflow tabs and actions.
 * Opens from bottom via hamburger button in mobile nav.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme, media } from '../../styles/theme';

interface MenuItem {
	id: string;
	label: string;
	emoji: string;
	badge?: number;
}

interface HamburgerDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	items: MenuItem[];
	onItemClick: (itemId: string) => void;
	activeItemId?: string;
}

const Overlay = styled(motion.div)`
	display: none;

	${media.mobile} {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: ${theme.zIndex.modal};
		backdrop-filter: blur(4px);
	}
`;

const Drawer = styled(motion.div)`
	display: none;

	${media.mobile} {
		display: flex;
		flex-direction: column;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: ${theme.colors.bg.elevated};
		border-top: 2px solid ${theme.colors.border.default};
		border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
		z-index: ${theme.zIndex.modal + 1};
		max-height: 70vh;
		box-shadow: ${theme.shadows.xl};
	}
`;

const DrawerHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${theme.spacing[4]} ${theme.spacing[5]};
	border-bottom: 1px solid ${theme.colors.border.default};
`;

const DrawerTitle = styled.h3`
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	margin: 0;
`;

const CloseButton = styled(motion.button)`
	background: transparent;
	border: none;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize['2xl']};
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-radius: ${theme.borderRadius.md};
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.bg.tertiary};
		color: ${theme.colors.text.primary};
	}
`;

const MenuList = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${theme.spacing[3]};
	overflow-y: auto;
	gap: ${theme.spacing[2]};
`;

const MenuItem = styled(motion.button)<{ $active: boolean }>`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[3]};
	padding: ${theme.spacing[4]};
	background: ${(props) => (props.$active ? theme.colors.bg.tertiary : 'transparent')};
	border: 1px solid
		${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.md};
	color: ${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.text.primary)};
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.medium};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	position: relative;
	text-align: left;

	/* Touch target */
	min-height: 48px;

	&:hover {
		background: ${theme.colors.bg.tertiary};
		border-color: ${theme.colors.accent.primary};
	}
`;

const MenuItemEmoji = styled.span`
	font-size: ${theme.typography.fontSize.xl};
	flex-shrink: 0;
`;

const MenuItemLabel = styled.span`
	flex: 1;
`;

const MenuItemBadge = styled.span`
	background: ${theme.colors.accent.danger};
	color: ${theme.colors.text.inverse};
	border-radius: ${theme.borderRadius.full};
	padding: 2px 8px;
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	min-width: 20px;
	text-align: center;
`;

export const HamburgerDrawer: React.FC<HamburgerDrawerProps> = ({
	isOpen,
	onClose,
	items,
	onItemClick,
	activeItemId
}) => {
	const { t } = useTranslation();
	const handleItemClick = (itemId: string) => {
		onItemClick(itemId);
		onClose(); // Close drawer after selection
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Overlay */}
					<Overlay
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>

					{/* Drawer */}
					<Drawer
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
					>
						<DrawerHeader>
							<DrawerTitle>{t('characterSheet.hamburgerTitle')}</DrawerTitle>
							<CloseButton onClick={onClose} whileTap={{ scale: 0.9 }}>
								×
							</CloseButton>
						</DrawerHeader>

						<MenuList>
							{items.map((item) => {
								const isActive = activeItemId === item.id;

								return (
									<MenuItem
										key={item.id}
										$active={isActive}
										onClick={() => handleItemClick(item.id)}
										whileTap={{ scale: 0.98 }}
									>
										<MenuItemEmoji>{item.emoji}</MenuItemEmoji>
										<MenuItemLabel>{item.label}</MenuItemLabel>
										{item.badge !== undefined && item.badge > 0 && (
											<MenuItemBadge>{item.badge}</MenuItemBadge>
										)}
									</MenuItem>
								);
							})}
						</MenuList>
					</Drawer>
				</>
			)}
		</AnimatePresence>
	);
};

export default HamburgerDrawer;
