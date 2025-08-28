import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: none;
	padding: 1.5rem;
	border-radius: 12px;
	background: transparent;
	margin-top: 0;
	color: white;
	font-family: 'Inter', sans-serif;
`;

export const StyledSubheading = styled.h2`
	margin-top: -1rem;
	color: #fbbf24;
	font-size: 2.4rem;
	font-weight: bold;
	text-align: center;
	letter-spacing: 1px;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledDescription = styled.p`
	color: #e2e8f0;
	text-align: center;
	margin-bottom: 1.5rem;
	line-height: 1.6;
	font-size: 1rem;
`;

export const StyledTabContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 1.5rem;
	border: 1px solid white;
	border-radius: 10px;
	background: transparent;
	padding: 0.5rem;
	gap: 0.5rem;
`;

export const StyledTab = styled.button<{ $active: boolean }>`
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;

	background: ${(props) =>
		props.$active ? 'linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%)' : 'transparent'};
	color: ${(props) => (props.$active ? '#1e1b4b' : '#e2e8f0')};

	&:hover {
		background: ${(props) =>
			props.$active
				? 'linear-gradient(145deg, #f59e0b 0%, #d97706 100%)'
				: 'rgba(251, 191, 36, 0.1)'};
	}
`;

export const StyledTabContent = styled.div`
	margin: 0 auto;
`;

export const StyledPointsRemaining = styled.div`
	margin: 1rem 0;
	font-weight: bold;
	color: #ef4444;
	font-size: 1.2rem;
	text-align: center;
	margin-bottom: 1.5rem;
`;

export const StyledSelectionGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1rem;
	margin-top: 1rem;
`;

export const StyledSelectionItem = styled.div`
	border: 1px solid white;
	padding: 1.5rem;
	border-radius: 10px;
	background: transparent;
	transition: all 0s ease;

	&:hover {
		border-color: #fbbf24;
	}
`;

export const StyledSelectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const StyledSelectionName = styled.h4`
	font-size: 1.1rem;
	font-weight: 600;
	margin: 0;
	color: #fbbf24;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

export const StyledProficiencySelector = styled.div`
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	margin-top: 0.5rem;
`;

export const StyledProficiencyButton = styled.button<{ $active?: boolean; $disabled?: boolean }>`
	padding: 0.5rem 1rem;
	border: 1px solid ${(props) => (props.$active ? '#fbbf24' : 'white')};
	border-radius: 6px;
	background: ${(props) => (props.$active ? '#fbbf24' : 'transparent')};
	color: ${(props) => (props.$active ? '#1e1b4b' : '#e2e8f0')};
	font-weight: 600;
	cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
	transition: all 0s ease;
	opacity: ${(props) => (props.$disabled ? 0.5 : 1)};

	&:hover:not(:disabled) {
		border-color: #fbbf24;
	}
`;

export const StyledLanguageFluency = styled.div`
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	margin-top: 0.5rem;
`;

export const StyledError = styled.div`
	background-color: transparent;
	border: 1px solid #ef4444;
	color: #ef4444;
	padding: 0.75rem;
	border-radius: 6px;
	margin-top: 1rem;
	font-size: 0.9rem;
	text-align: center;
`;

export const StyledActionButton = styled.button<{ $enabled?: boolean }>`
	padding: 0.5rem 1rem;
	background-color: transparent;
	color: white;
	border: 1px solid white;
	border-radius: 6px;
	font-size: 0.875rem;
	font-weight: 500;
	cursor: ${(props) => (props.$enabled ? 'pointer' : 'not-allowed')};
	transition: all 0.2s ease;
	opacity: ${(props) => (props.$enabled ? 1 : 0.6)};

	&:hover {
		border-color: ${(props) => (props.$enabled ? '#fbbf24' : 'white')};
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
`;
