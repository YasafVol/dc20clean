import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const DefensesContainer = styled.div<MobileStyledProps>`
	border: 2px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
    border-radius: 8px;
    padding: 1rem;
    background: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
	display: flex;
	flex-direction: ${(props) => (props.$isMobile ? 'column' : 'row')};
	justify-content: space-around;
	align-items: center;
	gap: ${(props) => (props.$isMobile ? '1rem' : '0')};
	margin-bottom: 1.5rem;
`;

export const DefenseItem = styled.div<MobileStyledProps>`
	text-align: center;
	width: 120px;
	margin: 0 auto;
`;

export const DefenseLabelContainer = styled.div<MobileStyledProps>`
	height: 32px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 0.3rem;
`;

export const DefenseLabel = styled.div<MobileStyledProps>`
	font-size: 0.8rem;
	font-weight: bold;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	line-height: 1;
`;

export const ShieldContainer = styled.div<MobileStyledProps>`
	width: 80px;
	height: 90px;
	border: 3px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${props => props.$isMobile ? 'rgb(50,50,50)' : 'white'};
	margin: 0 auto;
`;

export const ShieldValue = styled.div<MobileStyledProps>`
	font-size: 2rem;
	font-weight: bold;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	cursor: help;
`;

export const ShieldInput = styled.input<MobileStyledProps>`
	font-size: 2rem;
	font-weight: bold;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	background: transparent;
	border: none;
	text-align: center;
	width: 100%;
	max-width: 60px;
	outline: none;
	cursor: help;

	&:focus {
		background: ${props => props.$isMobile ? 'rgba(245, 208, 32, 0.1)' : 'rgba(139, 69, 19, 0.1)'};
		border-radius: 4px;
		cursor: text;
	}

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	&[type='number'] {
		-moz-appearance: textfield;
	}
`;

export const DefenseFooter = styled.div<MobileStyledProps>`
	min-height: 30px;
	margin-top: 0.2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2px;
`;

export const AutoCalculatedNote = styled.div<MobileStyledProps>`
	font-size: 0.6rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
`;

export const RevertButton = styled.button<MobileStyledProps>`
	font-size: 0.6rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	background: transparent;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 3px;
	padding: 2px 6px;
	cursor: pointer;
	margin-top: 2px;

	&:hover {
		background: ${props => props.$isMobile ? 'rgba(245, 208, 32, 0.1)' : 'rgba(139, 69, 19, 0.1)'};
	}

	&:active {
		background: ${props => props.$isMobile ? 'rgba(245, 208, 32, 0.2)' : 'rgba(139, 69, 19, 0.2)'};
	}
`;
