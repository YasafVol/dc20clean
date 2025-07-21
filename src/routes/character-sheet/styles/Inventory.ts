import styled from 'styled-components';

export const StyledInventorySection = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	margin-bottom: 1rem;
`;

export const StyledInventoryTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	text-align: center;
	margin-bottom: 1rem;
`;

export const StyledAddItemButton = styled.button`
	padding: 0.5rem 1rem;
	background-color: #8b4513;
	color: white;
	border: none;
	border-radius: 4px;
	font-size: 0.9rem;
	cursor: pointer;
	transition: background-color 0.2s;
	margin-bottom: 1rem;

	&:hover {
		background-color: #6d3410;
	}
`;

export const StyledInventoryContainer = styled.div`
	font-size: 0.8rem;
	color: #8b4513;
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

export const StyledInventoryHeaderColumn = styled.span<{ align?: string }>`
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

export const StyledInventorySelect = styled.select`
	padding: 0.3rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 0.8rem;
	background-color: white;

	&:disabled {
		background-color: #f5f5f5;
		color: #999;
	}
`;

export const StyledInventoryInput = styled.input`
	padding: 0.3rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 0.8rem;
	text-align: center;
	background-color: white;
`;

export const StyledInventoryInfoIcon = styled.span`
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
	position: relative;
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
