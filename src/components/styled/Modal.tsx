import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme, media } from '../../routes/character-sheet/styles/theme';

// Modal overlay (backdrop)
export const ModalOverlay = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(4px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	padding: ${theme.spacing[4]};
`;

// Modal container
export const Modal = styled(motion.div)<{ $variant?: 'default' | 'success' | 'danger' }>`
	background: ${theme.colors.bg.primary};
	border: 2px solid
		${(props) => {
			switch (props.$variant) {
				case 'success':
					return 'rgb(16, 185, 129)';
				case 'danger':
					return theme.colors.accent.danger;
				default:
					return theme.colors.crystal.primary;
			}
		}};
	border-radius: 12px;
	padding: ${theme.spacing[6]};
	max-width: 600px;
	width: 100%;
	max-height: 90vh;
	overflow-y: auto;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

	${media.mobile} {
		padding: ${theme.spacing[4]};
		max-width: 95vw;
	}
`;

// Modal header
export const ModalHeader = styled.div`
	margin-bottom: ${theme.spacing[6]};
`;

// Modal title
export const ModalTitle = styled.h2<{ $variant?: 'default' | 'success' | 'danger' }>`
	font-family: ${theme.typography.fontFamily.primary};
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${(props) => {
		switch (props.$variant) {
			case 'success':
				return 'rgb(16, 185, 129)';
			case 'danger':
				return theme.colors.accent.danger;
			default:
				return theme.colors.crystal.primary;
		}
	}};
	margin: 0 0 ${theme.spacing[3]} 0;
	text-align: center;
	text-shadow: 0 0 20px
		${(props) => {
			switch (props.$variant) {
				case 'success':
					return 'rgba(16, 185, 129, 0.3)';
				case 'danger':
					return theme.colors.accent.dangerAlpha30;
				default:
					return theme.colors.crystal.primaryAlpha30;
			}
		}};
`;

// Modal description
export const ModalDescription = styled.p`
	font-family: ${theme.typography.fontFamily.primary};
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.secondary};
	line-height: 1.6;
	text-align: center;
	margin: 0;
`;

// Modal content (body)
export const ModalContent = styled.div`
	margin-bottom: ${theme.spacing[6]};
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[4]};
`;

// Modal footer (buttons)
export const ModalFooter = styled.div`
	display: flex;
	justify-content: center;
	gap: ${theme.spacing[4]};
	flex-wrap: wrap;
`;
