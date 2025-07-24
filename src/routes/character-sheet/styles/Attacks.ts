import styled from 'styled-components';

export const StyledAttacksSection = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const StyledAttacksHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
`;

export const StyledAttacksTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	text-align: center;
	flex: 1;
`;

export const StyledAddWeaponButton = styled.button`
	padding: 0.3rem 0.8rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: #8b4513;
	color: white;
	font-size: 0.8rem;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: #6d3410;
	}
`;

export const StyledAttacksContainer = styled.div`
	font-size: 0.8rem;
	color: #8b4513;
`;

export const StyledAttacksHeaderRow = styled.div`
	display: grid;
	grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.7fr 0.8fr;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	border-bottom: 1px solid #e5e5e5;
	padding-bottom: 0.3rem;
	align-items: center;
`;

export const StyledHeaderColumn = styled.span<{ align?: string }>`
	font-weight: bold;
	text-align: ${(props) => props.align || 'left'};
	font-size: 0.8rem;
	line-height: 1.1;
`;

export const StyledEmptyState = styled.div`
	text-align: center;
	font-style: italic;
	padding: 2rem;
	color: #666;
`;

export const StyledAttackRow = styled.div`
	display: grid;
	grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.7fr 0.8fr;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	align-items: center;
`;

export const StyledRemoveButton = styled.button`
	width: 24px;
	height: 24px;
	border: 1px solid #dc2626;
	border-radius: 4px;
	background: #dc2626;
	color: white;
	font-size: 0.8rem;
	font-weight: bold;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.2s;

	&:hover {
		background-color: #b91c1c;
	}
`;

export const StyledWeaponSelect = styled.select`
	padding: 0.2rem;
	border: 1px solid #8b4513;
	border-radius: 3px;
	font-size: 0.7rem;
	background: white;
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const StyledDamageCell = styled.div<{ color?: string }>`
	text-align: center;
	font-weight: bold;
	color: ${(props) => props.color || 'inherit'};
	cursor: help;
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
`;

export const StyledDamageTypeCell = styled.div`
	text-align: center;
	font-size: 1rem;
	font-weight: bold;
	cursor: help;
`;
