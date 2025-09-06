import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledCombatSection = styled.div<MobileStyledProps>`
	border: 2px solid ${props => props.$isMobile ? 'rgb(68, 68, 68)' : '#8b4513'};
	border-radius: 8px;
	padding: 1rem;
	background: ${props => props.$isMobile ? 'rgb(42, 42, 42)' : 'white'};
`;

export const StyledCombatTitle = styled.div<MobileStyledProps>`
	font-size: 1.1rem;
	font-weight: bold;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	text-align: center;
	margin-bottom: 1rem;
	font-family: 'Inter', sans-serif;
`;

export const StyledActionPointsContainer = styled.div<MobileStyledProps>`
	text-align: center;
	margin-bottom: 1rem;
`;

export const StyledActionPointsTitle = styled.div<MobileStyledProps>`
	font-size: 0.9rem;
	font-weight: bold;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	margin-bottom: 0.5rem;
	font-family: 'Inter', sans-serif;
`;

export const StyledCombatStatsContainer = styled.div<MobileStyledProps>`
	font-size: 0.9rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
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
	background: transparent;
	color: #8b4513;
	border: 1px solid #8b4513;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	cursor: pointer;
	font-style: italic;
	font-size: 0.8rem;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;

	&:hover {
		background: #8b4513;
		color: white;
	}
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

export const StyledActionPoints = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	margin: 1rem 0;

	@media (max-width: 768px) {
		gap: 0.3rem;
		flex-wrap: wrap;
	}
`;

export const StyledActionPoint = styled.div<{ used: boolean; $isMobile?: boolean }>`
	width: 40px;
	height: 40px;
	border: 2px solid ${props => props.$isMobile ? 'rgb(68, 68, 68)' : '#8b4513'};
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${(props) => {
		if (props.used) {
			return props.$isMobile ? '#f5d020' : '#8b4513';
		}
		return props.$isMobile ? 'rgb(42, 42, 42)' : 'white';
	}};
	color: ${(props) => {
		if (props.used) {
			return props.$isMobile ? 'rgb(42, 42, 42)' : 'white';
		}
		return props.$isMobile ? '#f5d020' : '#8b4513';
	}};
	cursor: pointer;
	font-weight: bold;
	font-size: 16px;
	line-height: 1;
	text-align: center;
	user-select: none;
	font-family: 'Inter', sans-serif;
	padding-top: 1px;

	&:hover {
		background: ${(props) => {
			if (props.used) {
				return props.$isMobile ? '#d4b01c' : '#6b3410';
			}
			return props.$isMobile ? 'rgb(52, 52, 52)' : '#f0f0f0';
		}};
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
