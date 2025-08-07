// Styled components for CharacterCreation component
import styled from 'styled-components';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 6rem 1rem 1rem 1rem;
	min-height: 100vh;
	background: transparent;
`;

export const StyledTitle = styled.h1`
	margin: 0rem 0;
	color: #fbbf24;
	text-align: center;
	font-size: 3rem;
	font-weight: bold;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	letter-spacing: 2px;
`;

export const StyledStepIndicator = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem 1.5rem;
	background: rgba(0, 0, 0, 0.9);
	backdrop-filter: blur(10px);
	border-bottom: 2px solid #fbbf24;
	z-index: 100;
`;

export const StyledStepsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex: 1;
	max-width: 600px;
	margin: 0 auto;
`;

export const StyledStep = styled.div<{ $active: boolean; $completed: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
	transition: all 0.3s ease;
	flex: 1;
	max-width: 120px;
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
    border: 1px solid #10b981;
  `}

	${(props) =>
		props.$active &&
		!props.$completed &&
		`
    background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
    color: #1e1b4b;
    border: 1px solid #fbbf24;
  `}
  
  ${(props) =>
		!props.$active &&
		!props.$completed &&
		`
    background: transparent;
    color: #9ca3af;
    border: 1px solid #9ca3af;
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
      box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
    }
  `}

	${(props) =>
		props.$variant === 'secondary' &&
		`
    background: transparent;
    color: #9ca3af;
    border: 1px solid #9ca3af;
    
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
