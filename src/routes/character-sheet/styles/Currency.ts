import styled from 'styled-components';

export const CurrencyContainer = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const CurrencyTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 1rem;
	text-align: center;
`;

export const CurrencyRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const CurrencyIconContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.3rem;
`;

export const CurrencyIcon = styled.div<{ color: string; borderColor: string }>`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: ${(props) => props.color};
	border: 1px solid ${(props) => props.borderColor};
`;

export const CurrencyLabel = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
	font-weight: bold;
`;

export const CurrencyInput = styled.input`
	width: 60px;
	padding: 0.2rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	text-align: center;
	font-size: 0.8rem;
	background-color: white;

	&:focus {
		outline: none;
		border-color: #6d3410;
		box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.2);
	}
`;
