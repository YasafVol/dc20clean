import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme, media } from './styles/theme';

export const PageContainer = styled.div`
	min-height: 100vh;
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font-family: ${theme.typography.fontFamily.primary};
`;

export const Header = styled(motion.header)`
	background: ${theme.colors.bg.elevated};
	border-bottom: 1px solid ${theme.colors.border.default};
	padding: ${theme.spacing[6]} ${theme.spacing[8]};
	box-shadow: ${theme.shadows.md};
	position: sticky;
	top: 0;
	z-index: ${theme.zIndex.sticky};
	backdrop-filter: blur(10px);
	background: var(--bg-primary);

	${media.tablet} {
		padding: ${theme.spacing[4]} ${theme.spacing[6]};
	}

	${media.mobile} {
		padding: ${theme.spacing[3]} ${theme.spacing[4]};
	}
`;

export const HeaderContent = styled.div`
	max-width: 1400px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: ${theme.spacing[6]};
`;

export const CharacterIdentity = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};
`;

export const CharacterName = styled.h1`
	font-size: ${theme.typography.fontSize['4xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	margin: 0;
	line-height: ${theme.typography.lineHeight.tight};

	${media.tablet} {
		font-size: ${theme.typography.fontSize['2xl']};
	}

	${media.mobile} {
		font-size: ${theme.typography.fontSize.xl};
	}
`;

export const CharacterMeta = styled.div`
	display: flex;
	gap: ${theme.spacing[4]};
	align-items: center;
	font-size: ${theme.typography.fontSize.base};
	color: ${theme.colors.text.secondary};
	flex-wrap: wrap;

	${media.mobile} {
		font-size: ${theme.typography.fontSize.sm};
		gap: ${theme.spacing[2]};
	}
`;

export const MetaItem = styled.span`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};

	&:not(:last-child)::after {
		content: '•';
		margin-left: ${theme.spacing[4]};
		color: ${theme.colors.text.muted};
	}
`;

export const ActionButtons = styled.div`
	display: flex;
	gap: ${theme.spacing[3]};

	${media.mobile} {
		display: none; /* Hide on mobile - use hamburger menu instead */
	}
`;

export const ActionButton = styled(motion.button)`
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		border-color: ${theme.colors.accent.primary};
		box-shadow: ${theme.shadows.md};
	}

	&:active {
		transform: scale(0.98);
	}
`;

export const BackButton = styled(ActionButton)`
	background: transparent;

	&:hover {
		background: ${theme.colors.bg.tertiary};
		color: ${theme.colors.text.primary};
	}
`;

export const MobileMenuButton = styled(motion.button)`
	display: none;

	${media.mobile} {
		display: flex;
		align-items: center;
		justify-content: center;
		background: ${theme.colors.bg.tertiary};
		color: ${theme.colors.text.primary};
		border: 1px solid ${theme.colors.border.default};
		border-radius: ${theme.borderRadius.md};
		padding: ${theme.spacing[2]};
		width: 40px;
		height: 40px;
		font-size: ${theme.typography.fontSize.xl};
		cursor: pointer;
	}
`;

export const MainContent = styled.main`
	max-width: 1600px;
	margin: 0 auto;
	padding: ${theme.spacing[8]};

	${media.tablet} {
		padding: ${theme.spacing[6]};
	}

	${media.mobile} {
		padding: ${theme.spacing[4]};
		padding-bottom: 80px; /* Space for mobile bottom nav */
	}
`;

export const TwoColumnLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: ${theme.spacing[6]};

	${media.tablet} {
		grid-template-columns: 280px 1fr;
		gap: ${theme.spacing[4]};
	}

	${media.mobile} {
		grid-template-columns: 1fr;
		gap: ${theme.spacing[3]};
	}
`;

export const LeftColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[6]};
`;

export const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[6]};
`;

export const TabContainer = styled.div`
	background: ${theme.colors.bg.elevated};
	border-radius: ${theme.borderRadius.xl};
	box-shadow: ${theme.shadows.lg};
	overflow: hidden;
	border: 1px solid ${theme.colors.border.default};

	${media.mobile} {
		max-width: 100vw;
		overflow-x: hidden;
	}
`;

export const TabNav = styled.div`
	display: flex;
	border-bottom: 1px solid ${theme.colors.border.default};
	background: ${theme.colors.bg.secondary};
	overflow-x: auto;
	scrollbar-width: thin;
	scrollbar-color: ${theme.colors.border.default} transparent;

	&::-webkit-scrollbar {
		height: 4px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background: ${theme.colors.border.default};
		border-radius: ${theme.borderRadius.full};
	}

	/* Hide desktop tabs on mobile - use bottom nav instead */
	${media.mobile} {
		display: none;
	}
`;

export const Tab = styled(motion.button)<{ $active: boolean }>`
	background: ${(props) => (props.$active ? theme.colors.bg.elevated : 'transparent')};
	color: ${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.text.secondary)};
	border: none;
	padding: ${theme.spacing[4]} ${theme.spacing[6]};
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.medium};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	white-space: nowrap;
	position: relative;
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};

	${media.hover} {
		&:hover {
			background: ${theme.colors.bg.tertiary};
			color: ${theme.colors.text.primary};
		}
	}

	${media.tablet} {
		padding: ${theme.spacing[3]} ${theme.spacing[4]};
		font-size: ${theme.typography.fontSize.sm};
	}

	${(props) =>
		props.$active &&
		`
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 2px;
			background: ${theme.colors.accent.primary};
		}
	`}
`;

export const TabContent = styled(motion.div)`
	padding: ${theme.spacing[6]};
	overflow-x: hidden;
	max-width: 100%;

	${media.mobile} {
		padding: ${theme.spacing[4]};
	}
`;

export const SectionCard = styled(motion.div)<{ $withMarginBottom?: boolean }>`
	background: ${theme.colors.bg.secondary};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[6]};
	box-shadow: ${theme.shadows.md};
	border: 1px solid ${theme.colors.border.default};
	${(props) => props.$withMarginBottom && `margin-bottom: ${theme.spacing[4]};`}
`;

export const SectionTitle = styled.h2`
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	margin: 0 0 ${theme.spacing[4]} 0;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const LoadingContainer = styled(motion.div)`
	padding: ${theme.spacing[8]};
	text-align: center;
`;

export const ErrorContainer = styled(motion.div)`
	padding: ${theme.spacing[8]};
	text-align: center;
	color: ${theme.colors.accent.danger};
`;
