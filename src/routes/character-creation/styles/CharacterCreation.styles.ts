// Styled components for CharacterCreation component
import styled from 'styled-components';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 1rem;
	min-height: 100vh;
	background: linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%);
`;

export const StyledTitle = styled.h1`
	margin-bottom: 2rem;
	color: #fbbf24;
	text-align: center;
	font-size: 2.2rem;
	font-weight: bold;
	text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
	letter-spacing: 2px;
	background: linear-gradient(45deg, #fbbf24 0%, #f59e0b 100%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

export const StyledStepIndicator = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
	padding: 0 1rem;
`;

export const StyledStepsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	flex: 1;
`;

export const StyledStep = styled.div<{ $active: boolean; $completed: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}
`;

export const StyledStepNumber = styled.div<{ $active: boolean; $completed: boolean }>`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	font-size: 1.2rem;
	transition: all 0.3s ease;

	${(props) =>
		props.$completed &&
		`
    background: linear-gradient(145deg, #10b981 0%, #059669 100%);
    color: white;
    border: 2px solid #10b981;
  `}

	${(props) =>
		props.$active &&
		!props.$completed &&
		`
    background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
    color: #1e1b4b;
    border: 2px solid #fbbf24;
  `}
  
  ${(props) =>
		!props.$active &&
		!props.$completed &&
		`
    background: transparent;
    color: #9ca3af;
    border: 2px solid #9ca3af;
  `}
`;

export const StyledStepLabel = styled.span<{ $active: boolean; $completed: boolean }>`
	font-size: 0.9rem;
	font-weight: 600;
	text-align: center;

	${(props) =>
		props.$completed &&
		`
    color: #10b981;
  `}

	${(props) =>
		props.$active &&
		!props.$completed &&
		`
    color: #fbbf24;
  `}
  
  ${(props) =>
		!props.$active &&
		!props.$completed &&
		`
    color: #9ca3af;
  `}
`;

export const StyledNavigationButtons = styled.div`
	display: flex;
	gap: 1rem;
`;

export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
	padding: 0.5rem 1rem;
	border-radius: 6px;
	font-weight: bold;
	font-size: 0.9rem;
	cursor: pointer;
	transition: all 0.3s ease;
	border: none;
	min-width: 80px;

	${(props) =>
		props.$variant === 'primary' &&
		`
    background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
    color: #1e1b4b;
    
    &:hover {
      background: linear-gradient(145deg, #f59e0b 0%, #d97706 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
    }
  `}

	${(props) =>
		props.$variant === 'secondary' &&
		`
    background: transparent;
    color: #9ca3af;
    border: 2px solid #9ca3af;
    
    &:hover {
      color: #fbbf24;
      border-color: #fbbf24;
    }
  `}
  
  &:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}
`;
