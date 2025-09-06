import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledSpellsSection = styled.div<MobileStyledProps>`
	margin-bottom: 1.5rem;
	background: ${props => props.$isMobile ? 'rgb(42, 42, 42)' : 'white'};
	border: 2px solid ${props => props.$isMobile ? 'rgb(68, 68, 68)' : '#8b4513'};
	border-radius: 8px;
	padding: 1rem;
`;

export const StyledSpellsHeader = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid ${props => props.$isMobile ? 'rgb(68, 68, 68)' : '#8b4513'};
`;

export const StyledSpellsTitle = styled.h3<MobileStyledProps>`
	margin: 0;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	font-size: 1.1rem;
	font-weight: bold;
`;

export const StyledSpellsControls = styled.div<MobileStyledProps>`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

export const StyledAddSpellButton = styled.button<MobileStyledProps>`
	background: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	color: ${props => props.$isMobile ? 'rgb(42, 42, 42)' : 'white'};
	border: none;
	padding: 0.4rem 0.8rem;
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.8rem;
	font-weight: bold;

	&:hover {
		background: ${props => props.$isMobile ? '#d4b01c' : '#a0522d'};
	}
`;

export const StyledSpellsContainer = styled.div<MobileStyledProps>`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledSpellsHeaderRow = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: 40px 2fr 1fr 1fr 0.8fr 0.8fr 1fr 0.8fr;
	gap: 0.5rem;
	padding: 0.5rem;
	background: ${props => props.$isMobile ? 'rgb(52, 52, 52)' : '#f5f5dc'};
	border: 1px solid ${props => props.$isMobile ? 'rgb(68, 68, 68)' : '#8b4513'};
	border-radius: 4px;
	font-weight: bold;
	font-size: 0.8rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
`;

export const StyledHeaderColumn = styled.div<MobileStyledProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

export const StyledEmptyState = styled.div<MobileStyledProps>`
	text-align: center;
	padding: 1rem;
	color: ${props => props.$isMobile ? '#f5d020' : 'inherit'};
`;

export const StyledSpellRow = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: 40px 2fr 1fr 1fr 0.8fr 0.8fr 1fr 0.8fr;
	gap: 0.5rem;
	padding: 0.5rem;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68, 68, 68)' : '#ddd'};
	border-radius: 4px;
	background: ${props => props.$isMobile ? 'rgb(50, 50, 50)' : 'white'};
	align-items: center;

	&:hover {
		background: ${props => props.$isMobile ? 'rgb(55, 55, 55)' : '#f9f9f9'};
	}
`;

export const StyledRemoveButton = styled.button<MobileStyledProps>`
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

export const StyledSpellSelect = styled.select<MobileStyledProps>`
	width: 100%;
	padding: 0.3rem;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68, 68, 68)' : '#ddd'};
	border-radius: 4px;
	font-size: 0.8rem;
	background: ${props => props.$isMobile ? 'rgb(42, 42, 42)' : 'white'};
	color: ${props => props.$isMobile ? '#f5d020' : '#333'};

	&:focus {
		outline: none;
		border-color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	}

	option {
		background: ${props => props.$isMobile ? 'rgb(42, 42, 42)' : 'white'};
		color: ${props => props.$isMobile ? '#f5d020' : '#333'};
	}
`;

export const StyledSchoolFilter = styled.select<MobileStyledProps>`
	padding: 0.3rem;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68, 68, 68)' : '#8b4513'};
	border-radius: 4px;
	font-size: 0.8rem;
	background: ${props => props.$isMobile ? 'rgb(42, 42, 42)' : 'white'};
	color: ${props => props.$isMobile ? '#f5d020' : '#333'};

	&:focus {
		outline: none;
		border-color: ${props => props.$isMobile ? '#f5d020' : '#a0522d'};
	}

	option {
		background: ${props => props.$isMobile ? 'rgb(42, 42, 42)' : 'white'};
		color: ${props => props.$isMobile ? '#f5d020' : '#333'};
	}
`;

export const StyledSpellCell = styled.div<MobileStyledProps>`
	font-size: 0.8rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#333'};
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

export const StyledPreparedCheckbox = styled.input`
	width: 16px;
	height: 16px;
	cursor: pointer;
`;

export const StyledNotesInput = styled.input`
	width: 100%;
	padding: 0.2rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-size: 0.7rem;

	&:focus {
		outline: none;
		border-color: #8b4513;
	}
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
