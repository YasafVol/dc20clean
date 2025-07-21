import styled from 'styled-components';

export const LanguagesSection = styled.div`
	margin-bottom: 1rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const LanguageRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: #f9f9f9;
	margin-bottom: 0.3rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const LanguageName = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const FluencyContainer = styled.div`
	display: flex;
	gap: 0.2rem;
`;

export const FluencyBox = styled.div<{ filled: boolean }>`
	width: 15px;
	height: 15px;
	border: 1px solid #8b4513;
	background: ${(props) => (props.filled ? '#8b4513' : 'white')};
	border-radius: 2px;
`;

export const FluencyLabel = styled.span`
	font-size: 0.7rem;
	color: #8b4513;
	font-weight: bold;
	margin-right: 0.3rem;
`;

export const FluencyItem = styled.div`
	display: flex;
	align-items: center;
	gap: 0.2rem;
`;
