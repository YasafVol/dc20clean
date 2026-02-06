import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

export type SnackbarVariant = 'success' | 'warning' | 'error' | 'info';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const variantStyles = {
	success: css`
		background: linear-gradient(145deg, #10b981 0%, #059669 100%);
		box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
	`,
	warning: css`
		background: linear-gradient(145deg, #f59e0b 0%, #d97706 100%);
		box-shadow: 0 8px 32px rgba(245, 158, 11, 0.3);
	`,
	error: css`
		background: linear-gradient(145deg, #ef4444 0%, #dc2626 100%);
		box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);
	`,
	info: css`
		background: linear-gradient(145deg, #3b82f6 0%, #2563eb 100%);
		box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
	`
};

const variantIcons: Record<SnackbarVariant, string> = {
	success: '✓',
	warning: '⚠',
	error: '✕',
	info: 'ℹ'
};

const StyledSnackbar = styled.div<{
	$isVisible: boolean;
	$isExiting: boolean;
	$variant: SnackbarVariant;
}>`
	position: fixed;
	top: 2rem;
	right: 2rem;
	padding: 1rem 1.5rem;
	padding-right: 2.5rem;
	color: white;
	border-radius: 8px;
	font-weight: bold;
	font-size: 0.9rem;
	z-index: 10000;
	min-width: 300px;
	max-width: 450px;
	animation: ${(props) => (props.$isExiting ? slideOut : slideIn)} 0.3s ease-out;
	display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
	align-items: center;
	gap: 0.5rem;
	${(props) => variantStyles[props.$variant]}
`;

const IconWrapper = styled.span`
	font-size: 1.2rem;
	flex-shrink: 0;
`;

const MessageText = styled.span`
	flex: 1;
`;

const CloseButton = styled.button`
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	background: none;
	border: none;
	color: white;
	opacity: 0.7;
	cursor: pointer;
	font-size: 1rem;
	padding: 0.25rem;
	line-height: 1;
	transition: opacity 0.2s;

	&:hover {
		opacity: 1;
	}
`;

interface SnackbarProps {
	message: string;
	isVisible: boolean;
	onClose: () => void;
	duration?: number;
	variant?: SnackbarVariant;
}

const Snackbar: React.FC<SnackbarProps> = ({
	message,
	isVisible,
	onClose,
	duration = 3000,
	variant = 'success'
}) => {
	const [isExiting, setIsExiting] = useState(false);

	// Reset isExiting when visibility changes to true
	useEffect(() => {
		if (isVisible) {
			setIsExiting(false);
		}
	}, [isVisible]);

	useEffect(() => {
		if (isVisible && duration > 0) {
			const timer = setTimeout(() => {
				setIsExiting(true);
				setTimeout(() => {
					onClose();
					setIsExiting(false);
				}, 300); // Animation duration
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [isVisible, onClose, duration]);

	const handleClose = () => {
		setIsExiting(true);
		setTimeout(() => {
			onClose();
			setIsExiting(false);
		}, 300);
	};

	return (
		<StyledSnackbar $isVisible={isVisible} $isExiting={isExiting} $variant={variant}>
			<IconWrapper>{variantIcons[variant]}</IconWrapper>
			<MessageText>{message}</MessageText>
			<CloseButton onClick={handleClose} aria-label="Close">
				×
			</CloseButton>
		</StyledSnackbar>
	);
};

export default Snackbar;
