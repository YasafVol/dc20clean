import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: 2px solid #8b5cf6;
	padding: 1.5rem;
	border-radius: 12px;
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	margin-top: 2rem;
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
	color: white;
	font-family: 'Inter', sans-serif;
`;

export const StyledSubheading = styled.h2`
	margin-top: 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	letter-spacing: 1px;
	border-bottom: 2px solid #ef4444;
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
	border: 2px solid #a855f7;
	border-radius: 10px;
	background: rgba(45, 27, 105, 0.3);
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
	margin: 0.5rem 0;
	font-weight: bold;
	color: #ef4444;
	font-size: 1.2rem;
	text-align: center;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	margin-bottom: 1.5rem;
`;

export const StyledSelectionGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1rem;
	margin-top: 1rem;
`;

export const StyledSelectionItem = styled.div`
	border: 2px solid #a855f7;
	padding: 1.5rem;
	border-radius: 10px;
	background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
	transition: all 0.3s ease;
	box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);

	&:hover {
		border-color: #fbbf24;
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3);
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
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledProficiencySelector = styled.div`
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	margin-top: 0.5rem;
`;

export const StyledProficiencyButton = styled.button<{ $active?: boolean; $disabled?: boolean }>`
	padding: 0.5rem 1rem;
	border: 2px solid ${(props) => (props.$active ? '#fbbf24' : '#6b7280')};
	border-radius: 6px;
	background: ${(props) => (props.$active ? '#fbbf24' : 'transparent')};
	color: ${(props) => (props.$active ? '#1e1b4b' : '#e2e8f0')};
	font-weight: 600;
	cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease;
	opacity: ${(props) => (props.$disabled ? 0.5 : 1)};

	&:hover:not(:disabled) {
		background: ${(props) => (props.$active ? '#f59e0b' : 'rgba(251, 191, 36, 0.1)')};
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
	background-color: rgba(239, 68, 68, 0.1);
	border: 1px solid #ef4444;
	color: #ef4444;
	padding: 0.75rem;
	border-radius: 6px;
	margin-top: 1rem;
	font-size: 0.9rem;
	text-align: center;
`;
