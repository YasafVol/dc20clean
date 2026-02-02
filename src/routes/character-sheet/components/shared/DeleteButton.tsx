import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface DeleteButtonProps {
	onClick: (e: React.MouseEvent) => void;
	title?: string;
	$isMobile?: boolean;
}

const StyledDeleteButton = styled.button<{ $isMobile?: boolean }>`
	width: 24px;
	height: 24px;
	border: 1px solid ${theme.colors.accent.danger};
	border-radius: ${theme.borderRadius.md};
	background-color: ${theme.colors.bg.tertiary};
	color: ${theme.colors.accent.danger};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	transition: all ${theme.transitions.fast};

	&:hover {
		background-color: ${theme.colors.accent.danger};
		color: ${theme.colors.text.inverse};
		transform: scale(1.1);
	}

	@media (max-width: 768px) {
		width: ${(props) => (props.$isMobile ? '20px' : '24px')};
		height: ${(props) => (props.$isMobile ? '20px' : '24px')};
		font-size: ${(props) => (props.$isMobile ? '0.7rem' : theme.typography.fontSize.sm)};
	}
`;

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, title = 'Remove', $isMobile }) => {
	return (
		<StyledDeleteButton onClick={onClick} title={title} $isMobile={$isMobile}>
			×
		</StyledDeleteButton>
	);
};

export default DeleteButton;
