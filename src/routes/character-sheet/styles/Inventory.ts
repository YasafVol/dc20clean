import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledInventorySection = styled.div<MobileStyledProps>`
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#8b4513'};
	border-radius: 8px;
	padding: 1rem;
	background: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
	margin-bottom: 1rem;
	color: ${props => props.$isMobile ? 'white' : 'black'};
`;

export const StyledInventoryTitle = styled.div<MobileStyledProps>`
	font-size: 1.1rem;
	font-weight: bold;
	color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	text-align: center;
	margin-bottom: 1rem;
`;

export const StyledAddItemButton = styled.button<MobileStyledProps>`
	padding: 0.5rem 1rem;
	background-color: ${props => props.$isMobile ? '#f5d020' : '#8b4513'};
	color: ${props => props.$isMobile ? '#1a1a1a' : 'white'};
	border: none;
	border-radius: 4px;
	font-size: 0.9rem;
	cursor: pointer;
	transition: background-color 0.2s;
	margin-bottom: 1rem;
	font-weight: bold;

	&:hover {
		background-color: ${props => props.$isMobile ? '#d4b01e' : '#6d3410'};
	}
`;

export const StyledInventoryContainer = styled.div<MobileStyledProps>`
	font-size: 0.8rem;
	color: ${props => props.$isMobile ? 'white' : 'black'};
`;

export const StyledInventoryHeaderRow = styled.div`
	display: grid;
	grid-template-columns: 30px 100px 2fr 60px 30px 70px;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	border-bottom: 1px solid #e5e5e5;
	padding-bottom: 0.3rem;
	align-items: center;
`;

export const StyledInventoryHeaderColumn = styled.span.withConfig({
	shouldForwardProp: (prop) => prop !== 'align'
})<{ align?: string }>`
	font-weight: bold;
	text-align: ${(props) => props.align || 'left'};
`;

export const StyledInventoryRow = styled.div`
	display: grid;
	grid-template-columns: 30px 100px 2fr 60px 30px 70px;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	align-items: center;
`;

export const StyledRemoveItemButton = styled.button`
	width: 24px;
	height: 24px;
	border: 1px solid #dc2626;
	background-color: #fee2e2;
	color: #dc2626;
	border-radius: 4px;
	font-size: 14px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;

	&:hover {
		background-color: #fecaca;
	}
`;

export const StyledInventorySelect = styled.select<MobileStyledProps>`
	padding: 0.3rem;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#ccc'};
	border-radius: 4px;
	font-size: 0.8rem;
	background-color: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
	color: ${props => props.$isMobile ? 'white' : 'black'};

	&:disabled {
		background-color: ${props => props.$isMobile ? 'rgb(30,30,30)' : '#f5f5f5'};
		color: #999;
	}
`;

export const StyledInventoryInput = styled.input<MobileStyledProps>`
	padding: 0.3rem;
	border: 1px solid ${props => props.$isMobile ? 'rgb(68,68,68)' : '#ccc'};
	border-radius: 4px;
	font-size: 0.8rem;
	text-align: center;
	background-color: ${props => props.$isMobile ? 'rgb(42,42,42)' : 'white'};
	color: ${props => props.$isMobile ? 'white' : 'black'};
`;

export const StyledInventoryInfoIcon = styled.span<MobileStyledProps>`
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

export const StyledInventoryCost = styled.div`
	text-align: center;
	font-size: 0.8rem;
	font-weight: bold;
`;

export const StyledEmptyInventory = styled.div`
	text-align: center;
	font-style: italic;
	padding: 2rem;
	color: #666;
`;
