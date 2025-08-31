import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: 1px solid white;
	padding: 2rem;
	border-radius: 12px;
	background: transparent;
	margin-top: 2rem;
	max-width: 600px;
	margin: 2rem auto;
`;

export const StyledTitle = styled.h2`
	margin-top: 0;
	color: #fbbf24;
	font-size: 2.4rem;
	font-weight: bold;
	text-align: center;
	letter-spacing: 1px;
	padding-bottom: 0.5rem;
	margin-bottom: 2rem;
`;

export const StyledInputGroup = styled.div`
	margin-bottom: 1.5rem;
`;

export const StyledCharacterNameContainer = styled.div`
	display: flex;
	gap: 10px;
	flex-direction: row;
`;

export const StyledLabel = styled.label`
	display: block;
	margin-bottom: 0.5rem;
	color: #fbbf24;
	font-weight: bold;
	font-size: 1rem;
`;

export const StyledInput = styled.input`
	width: 100%;
	padding: 0.75rem;
	border: 1px solid white;
	border-radius: 8px;
	background: transparent;
	color: #e5e7eb;
	font-size: 1rem;
	transition: all 0.3s ease;

	&:focus {
		outline: none;
		border-color: #fbbf24;
	}

	&::placeholder {
		color: #9ca3af;
	}
`;

export const StyledSuggestionGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	gap: 0.5rem;
	margin-bottom: 1rem;
	max-height: 200px;
	overflow-y: auto;
`;

export const StyledSuggestionButton = styled.button`
	padding: 0.5rem 1rem;
	border: 1px solid white;
	border-radius: 6px;
	background: transparent;
	color: #e5e7eb;
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.9rem;

	&:hover {
		border-color: #fbbf24;
	}
`;

export const StyledGenerateButton = styled.button`
	padding: 0.75rem 1.5rem;
	border: 1px solid white;
	border-radius: 8px;
	background: transparent;
	color: white;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.3s ease;
	width: 100%;

	&:hover {
		border-color: #fbbf24;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const StyledCharacterInfo = styled.div`
	margin-bottom: 1.5rem;
	padding: 1rem;
	border: 1px solid white;
	border-radius: 8px;
	background: transparent;
	text-align: center;
`;

export const StyledCharacterDetails = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 1rem;
	line-height: 1.6;
`;
