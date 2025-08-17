import styled from 'styled-components';

export const StyledCombatSection = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: rgba(245, 243, 240, 0.5);
`;

export const StyledCombatTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	text-align: center;
	margin-bottom: 1rem;
`;

export const StyledActionPointsContainer = styled.div`
	text-align: center;
	margin-bottom: 1rem;
`;

export const StyledActionPointsTitle = styled.div`
	font-size: 0.9rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.5rem;
`;

export const StyledCombatStatsContainer = styled.div`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const StyledCombatStatRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.3rem;
	border-bottom: 1px solid #e5e5e5;

	&:last-child {
		border-bottom: none;
	}
`;

export const StyledCombatStatLabel = styled.div`
	display: flex;
	align-items: center;
	gap: 0.3rem;
`;

export const StyledCombatStatValue = styled.span`
	font-weight: bold;
`;

export const StyledInfoIcon = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 14px;
	height: 14px;
	border-radius: 50%;
	background-color: #8b4513;
	color: white;
	font-size: 10px;
	font-weight: bold;
	cursor: help;
	vertical-align: middle;
`;

export const StyledDefenseGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	margin-bottom: 1rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 0.5rem;
	}
`;

export const StyledDefenseBox = styled.div`
	text-align: center;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 0.8rem;
	background: white;
`;

export const StyledDefenseValue = styled.div`
	font-size: 1.8rem;
	font-weight: bold;
	color: #8b4513;
`;

export const StyledDefenseLabel = styled.div`
	font-size: 0.7rem;
	font-weight: bold;
	text-transform: uppercase;
	color: #666;
	margin-top: 0.2rem;
`;

export const StyledActionPoints = styled.div`
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	margin: 1rem 0;

	@media (max-width: 768px) {
		gap: 0.3rem;
		flex-wrap: wrap;
	}
`;

export const StyledActionPoint = styled.div<{ used: boolean }>`
	width: 40px;
	height: 40px;
	border: 2px solid #8b4513;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${(props) => (props.used ? '#8b4513' : 'white')};
	color: ${(props) => (props.used ? 'white' : '#8b4513')};
	cursor: pointer;
	font-weight: bold;

	&:hover {
		background: ${(props) => (props.used ? '#6b3410' : '#f0f0f0')};
	}
`;

export const StyledCombatStats = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	margin: 1rem 0;

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 0.5rem;
	}
`;

export const StyledCombatStatBox = styled.div`
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 0.5rem;
	text-align: center;
	background: white;
	flex: 1;
`;

export const StyledCombatStatBoxValue = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: #333;
`;

export const StyledCombatStatBoxLabel = styled.div`
	font-size: 0.7rem;
	font-weight: bold;
	text-transform: uppercase;
	color: #666;
	margin-top: 0.2rem;
`;
