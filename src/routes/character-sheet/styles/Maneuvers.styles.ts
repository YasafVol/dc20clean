import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledManeuversSection = styled.div<MobileStyledProps>`
	margin-bottom: 1.5rem;
	background: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
	border: 2px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 8px;
	padding: 1rem;
`;

export const StyledManeuversHeader = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
`;

export const StyledManeuversTitle = styled.h3<MobileStyledProps>`
	margin: 0;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	font-size: 1.1rem;
	font-weight: bold;
`;

export const StyledManeuversControls = styled.div<MobileStyledProps>`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

export const StyledAddManeuverButton = styled.button<MobileStyledProps>`
	background: ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	color: ${props => props.$isMobile ? '#f5d020' : 'white'};
	border: none;
	padding: 0.4rem 0.8rem;
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.8rem;
	font-weight: bold;

	&:hover {
		background: ${props => props.$isMobile ? 'rgb(88,88,88)' : '#a0522d'};
	}
`;

export const StyledManeuversContainer = styled.div<MobileStyledProps>`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledManeuversHeaderRow = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
	gap: 0.75rem;
	padding: 0.75rem;
	background: ${props => props.$isMobile ? 'rgb(60,60,60)' : '#f5f5dc'};
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 4px;
	font-weight: bold;
	font-size: 0.9rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
`;

export const StyledManeuverHeaderColumn = styled.div<MobileStyledProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: ${props => props.$isMobile ? '#f5d020' : 'inherit'};
`;

export const StyledManeuverEmptyState = styled.div<MobileStyledProps>`
	text-align: center;
	padding: 1.5rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#666'};
	font-style: italic;
	font-size: 0.9rem;
`;

export const StyledManeuverRow = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
	gap: 0.75rem;
	padding: 0.75rem;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#ddd'};
	border-radius: 4px;
	background: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
	align-items: flex-start;
	min-height: 60px;

	&:hover {
		background: ${props => props.$isMobile ? 'rgb(50,50,50)' : '#f9f9f9'};
	}
`;

export const StyledManeuverCell = styled.div<MobileStyledProps>`
	font-size: 0.85rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#333'};
	display: flex;
	align-items: flex-start;
	justify-content: center;
	text-align: center;
	word-wrap: break-word;
	line-height: 1.3;
`;

export const StyledManeuverNameCell = styled(StyledManeuverCell)<MobileStyledProps>`
	justify-content: flex-start;
	text-align: left;
	font-weight: 500;
`;

export const StyledManeuverDescriptionCell = styled(StyledManeuverCell)<MobileStyledProps>`
	justify-content: flex-start;
	text-align: left;
	line-height: 1.4;
`;

export const StyledManeuverSelect = styled.select<MobileStyledProps>`
	width: 100%;
	padding: 0.4rem;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#ddd'};
	border-radius: 4px;
	font-size: 0.85rem;
	background: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
	color: ${props => props.$isMobile ? '#f5d020' : 'inherit'};
	max-width: 100%;

	&:focus {
		outline: none;
		border-color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
		box-shadow: 0 0 0 2px ${props => props.$isMobile ? 'rgba(245, 208, 32, 0.1)' : 'rgba(139, 69, 19, 0.1)'};
	}
`;

export const StyledManeuverTypeFilter = styled.select<MobileStyledProps>`
	padding: 0.4rem 0.6rem;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 4px;
	font-size: 0.85rem;
	background: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
	color: ${props => props.$isMobile ? '#f5d020' : 'inherit'};
	min-width: 120px;

	&:focus {
		outline: none;
		border-color: ${props => props.$isMobile ? '#f5d020' : '#a0522d'};
		box-shadow: 0 0 0 2px ${props => props.$isMobile ? 'rgba(245, 208, 32, 0.1)' : 'rgba(139, 69, 19, 0.1)'};
	}
`;

export const StyledManeuverRemoveButton = styled.button<MobileStyledProps>`
	width: 24px;
	height: 24px;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#dc2626'};
	border-radius: 4px;
	background-color: ${props => props.$isMobile ? 'rgb(60,60,60)' : '#fee2e2'};
	color: ${props => props.$isMobile ? '#f5d020' : '#dc2626'};
	font-size: 0.8rem;
	font-weight: bold;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.2s;

	&:hover {
		background-color: ${props => props.$isMobile ? 'rgb(80,80,80)' : '#fecaca'};
	}
`;

export const StyledExpandableDescription = styled.div<MobileStyledProps>`
	width: 100%;
`;

export const StyledDescriptionToggle = styled.span<MobileStyledProps>`
	cursor: pointer;
	color: ${props => props.$isMobile ? '#f5d020' : '#2563eb'};
	display: flex;
	align-items: flex-start;
	gap: 0.25rem;
	line-height: 1.4;

	&:hover {
		color: ${props => props.$isMobile ? '#f0c000' : '#1d4ed8'};
	}
`;

export const StyledExpandedDescription = styled.div<MobileStyledProps>`
	margin-top: 0.5rem;
	padding: 0.5rem;
	background: #f8f9fa; /* Keep white/light background even in mobile */
	border-radius: 4px;
	font-size: 0.8rem;
	color: #495057; /* Keep dark text even in mobile */
	line-height: 1.4;
	border-left: 3px solid ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
`;

export const StyledClickableManeuverName = styled.span<MobileStyledProps>`
	cursor: pointer;
	color: ${props => props.$isMobile ? '#f5d020' : '#2563eb'};
	font-weight: 500;

	&:hover {
		color: ${props => props.$isMobile ? '#f0c000' : '#1d4ed8'};
		text-decoration: underline;
	}
`;