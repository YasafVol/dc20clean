import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledAttacksSection = styled.div<MobileStyledProps>`
	border: 2px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 8px;
	padding: 1rem;
	background: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
`;

export const StyledAttacksHeader = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
`;

export const StyledAttacksTitle = styled.div<MobileStyledProps>`
	font-size: 1.1rem;
	font-weight: bold;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	text-align: center;
	flex: 1;
`;

export const StyledAddWeaponButton = styled.button<MobileStyledProps>`
	padding: 0.3rem 0.8rem;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 4px;
	background: ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	color: ${props => props.$isMobile ? '#f5d020' : 'white'};
	font-size: 0.8rem;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: ${props => props.$isMobile ? 'rgb(88,88,88)' : '#6d3410'};
	}
`;

export const StyledAttacksContainer = styled.div<MobileStyledProps>`
	font-size: 0.8rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	overflow-x: auto;

	@media (max-width: 768px) {
		overflow-x: visible;
	}
`;

export const StyledAttacksHeaderRow = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.7fr 0.8fr;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	border-bottom: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#e5e5e5'};
	padding-bottom: 0.3rem;
	align-items: center;

	@media (max-width: 768px) {
		grid-template-columns: 25px 1fr 45px 40px;
		gap: 0.2rem;
		font-size: 0.7rem;

		& > *:nth-child(4),
		& > *:nth-child(5),
		& > *:nth-child(7) {
			display: none;
		}
	}
`;

export const StyledHeaderColumn = styled.span<{ align?: string; $isMobile?: boolean }>`
	font-weight: bold;
	text-align: ${(props) => props.align || 'left'};
	font-size: 0.8rem;
	line-height: 1.1;
	color: ${props => props.$isMobile ? '#f5d020' : 'inherit'};

	@media (max-width: 768px) {
		font-size: 0.7rem;
		&:nth-child(4),
		&:nth-child(5),
		&:nth-child(7) {
			display: none;
		}
	}
`;

export const StyledEmptyState = styled.div<MobileStyledProps>`
	text-align: center;
	font-style: italic;
	padding: 2rem;
	color: ${props => props.$isMobile ? '#f5d020' : '#666'};
`;

export const StyledAttackRow = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.7fr 0.8fr;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	align-items: center;

	@media (max-width: 768px) {
		grid-template-columns: 25px 1fr 45px 40px;
		gap: 0.2rem;
		font-size: 0.7rem;

		& > *:nth-child(4),
		& > *:nth-child(5),
		& > *:nth-child(7) {
			display: none;
		}
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

export const StyledWeaponSelect = styled.select<MobileStyledProps>`
	padding: 0.2rem;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 3px;
	font-size: 0.7rem;
	background: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
	color: ${props => props.$isMobile ? '#f5d020' : 'inherit'};
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;

	@media (max-width: 768px) {
		font-size: 0.6rem;
		padding: 0.1rem;
	}
`;

export const StyledDamageCell = styled.div<{ color?: string; $isMobile?: boolean }>`
	text-align: center;
	font-weight: bold;
	color: ${(props) => props.color || (props.$isMobile ? '#f5d020' : 'inherit')};
	cursor: pointer;
`;

export const StyledInfoIcon = styled.span<MobileStyledProps>`
	background: transparent;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	border: 1px solid ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
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
		background: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
		color: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
	}
`;

export const StyledDamageTypeCell = styled.div<MobileStyledProps>`
	text-align: center;
	font-size: 1rem;
	font-weight: bold;
	cursor: pointer;
	color: ${props => props.$isMobile ? '#f5d020' : 'inherit'};
`;
