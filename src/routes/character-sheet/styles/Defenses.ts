import styled from 'styled-components';

export const DefensesContainer = styled.div<{ $isMobile?: boolean }>`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	display: flex;
	flex-direction: ${(props) => (props.$isMobile ? 'column' : 'row')};
	justify-content: space-around;
	align-items: center;
	gap: ${(props) => (props.$isMobile ? '1rem' : '0')};
	margin-bottom: 1.5rem;
`;

export const DefenseItem = styled.div`
	text-align: center;
	width: 120px;
	margin: 0 auto;
`;

export const DefenseLabelContainer = styled.div`
	height: 32px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 0.3rem;
`;

export const DefenseLabel = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
	color: #8b4513;
	line-height: 1;
`;

export const ShieldContainer = styled.div`
	width: 80px;
	height: 90px;
	border: 3px solid #8b4513;
	border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: white;
	margin: 0 auto;
`;

export const ShieldValue = styled.div`
	font-size: 2rem;
	font-weight: bold;
	color: #8b4513;
	cursor: help;
`;

export const ShieldInput = styled.input`
	font-size: 2rem;
	font-weight: bold;
	color: #8b4513;
	background: transparent;
	border: none;
	text-align: center;
	width: 100%;
	max-width: 60px;
	outline: none;
	cursor: help;

	&:focus {
		background: rgba(139, 69, 19, 0.1);
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

export const DefenseFooter = styled.div`
	min-height: 30px;
	margin-top: 0.2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2px;
`;

export const AutoCalculatedNote = styled.div`
	font-size: 0.6rem;
	color: #8b4513;
`;

export const RevertButton = styled.button`
	font-size: 0.6rem;
	color: #8b4513;
	background: transparent;
	border: 1px solid #8b4513;
	border-radius: 3px;
	padding: 2px 6px;
	cursor: pointer;
	margin-top: 2px;

	&:hover {
		background: rgba(139, 69, 19, 0.1);
	}

	&:active {
		background: rgba(139, 69, 19, 0.2);
	}
`;
