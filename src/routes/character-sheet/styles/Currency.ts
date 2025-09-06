import styled from 'styled-components';

export const CurrencyContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'isMobile'
})<{ isMobile?: boolean }>`
	border: 2px solid ${(props) => (props.isMobile ? 'rgb(68,68,68)' : '#8b4513')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.isMobile ? 'rgb(42,42,42)' : 'white')};
`;

export const CurrencyTitle = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'isMobile'
})<{ isMobile?: boolean }>`
	font-size: 1.1rem;
	font-weight: bold;
	color: ${(props) => (props.isMobile ? '#f5d020' : '#8b4513')};
	margin-bottom: 1rem;
	text-align: center;
`;

export const CurrencyRow = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'isMobile'
})<{ isMobile?: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const CurrencyIconContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'isMobile'
})<{ isMobile?: boolean }>`
	display: flex;
	align-items: center;
	gap: 0.3rem;
`;

export const CurrencyIcon = styled.div.withConfig({
	shouldForwardProp: (prop) => !['isMobile', 'color', 'borderColor'].includes(prop)
})<{ color: string; borderColor: string; isMobile?: boolean }>`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: ${(props) => props.color};
	border: 1px solid ${(props) => props.borderColor};
`;

export const CurrencyLabel = styled.span.withConfig({
	shouldForwardProp: (prop) => prop !== 'isMobile'
})<{ isMobile?: boolean }>`
	font-size: 0.9rem;
	color: ${(props) => (props.isMobile ? 'white' : '#8b4513')};
	font-weight: bold;
`;

export const CurrencyInput = styled.input.withConfig({
	shouldForwardProp: (prop) => prop !== 'isMobile'
})<{ isMobile?: boolean }>`
	width: 60px;
	padding: 0.2rem;
	border: 1px solid ${(props) => (props.isMobile ? 'rgb(68,68,68)' : '#8b4513')};
	border-radius: 4px;
	text-align: center;
	font-size: 0.8rem;
	background-color: ${(props) => (props.isMobile ? 'rgb(42,42,42)' : 'white')};
	color: ${(props) => (props.isMobile ? 'white' : 'black')};

	&:focus {
		outline: none;
		border-color: ${(props) => (props.isMobile ? '#f5d020' : '#6d3410')};
		box-shadow: 0 0 0 2px
			${(props) => (props.isMobile ? 'rgba(245, 208, 32, 0.2)' : 'rgba(139, 69, 19, 0.2)')};
	}
`;
