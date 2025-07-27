import styled from 'styled-components';

export const StyledSpellsSection = styled.div`
	margin-bottom: 1.5rem;
	background: white;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
`;

export const StyledSpellsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid #8b4513;
`;

export const StyledSpellsTitle = styled.h3`
	margin: 0;
	color: #8b4513;
	font-size: 1.1rem;
	font-weight: bold;
`;

export const StyledSpellsControls = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

export const StyledAddSpellButton = styled.button`
	background: #8b4513;
	color: white;
	border: none;
	padding: 0.4rem 0.8rem;
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.8rem;
	font-weight: bold;

	&:hover {
		background: #a0522d;
	}
`;

export const StyledSpellsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledSpellsHeaderRow = styled.div`
	display: grid;
	grid-template-columns: 40px 2fr 1fr 1fr 0.8fr 0.8fr 1fr 0.8fr;
	gap: 0.5rem;
	padding: 0.5rem;
	background: #f5f5dc;
	border: 1px solid #8b4513;
	border-radius: 4px;
	font-weight: bold;
	font-size: 0.8rem;
	color: #8b4513;
`;

export const StyledHeaderColumn = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

export const StyledEmptyState = styled.div`
	text-align: center;
	padding: 1rem;
	color: #666;
	font-style: italic;
`;

export const StyledSpellRow = styled.div`
	display: grid;
	grid-template-columns: 40px 2fr 1fr 1fr 0.8fr 0.8fr 1fr 0.8fr;
	gap: 0.5rem;
	padding: 0.5rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	background: white;
	align-items: center;

	&:hover {
		background: #f9f9f9;
	}
`;

export const StyledRemoveButton = styled.button`
	background: #dc3545;
	color: white;
	border: none;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	cursor: pointer;
	font-size: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: #c82333;
	}
`;

export const StyledSpellSelect = styled.select`
	width: 100%;
	padding: 0.3rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-size: 0.8rem;

	&:focus {
		outline: none;
		border-color: #8b4513;
	}
`;

export const StyledSchoolFilter = styled.select`
	padding: 0.3rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	font-size: 0.8rem;
	background: white;

	&:focus {
		outline: none;
		border-color: #a0522d;
	}
`;

export const StyledSpellCell = styled.div`
	font-size: 0.8rem;
	color: #333;
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
	cursor: pointer;
`;
