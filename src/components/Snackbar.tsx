import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

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

const StyledSnackbar = styled.div<{ $isVisible: boolean; $isExiting: boolean }>`
	position: fixed;
	top: 2rem;
	right: 2rem;
	padding: 1rem 1.5rem;
	background: linear-gradient(145deg, #10b981 0%, #059669 100%);
	color: white;
	border-radius: 8px;
	box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
	font-weight: bold;
	font-size: 0.9rem;
	z-index: 1000;
	min-width: 300px;
	animation: ${(props) => (props.$isExiting ? slideOut : slideIn)} 0.3s ease-out;
	display: ${(props) => (props.$isVisible ? 'block' : 'none')};

	&::before {
		content: '✓';
		margin-right: 0.5rem;
		font-size: 1.2rem;
	}
`;

interface SnackbarProps {
	message: string;
	isVisible: boolean;
	onClose: () => void;
	duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, isVisible, onClose, duration = 3000 }) => {
	const [isExiting, setIsExiting] = useState(false);

	useEffect(() => {
		if (isVisible) {
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

	return (
		<StyledSnackbar $isVisible={isVisible} $isExiting={isExiting}>
			{message}
		</StyledSnackbar>
	);
};

export default Snackbar;
