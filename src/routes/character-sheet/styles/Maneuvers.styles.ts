import styled from 'styled-components';

export const StyledManeuversSection = styled.div`
	margin-bottom: 1.5rem;
	background: white;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
`;

export const StyledManeuversHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid #8b4513;
`;

export const StyledManeuversTitle = styled.h3`
	margin: 0;
	color: #8b4513;
	font-size: 1.1rem;
	font-weight: bold;
`;

export const StyledManeuversControls = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

export const StyledAddManeuverButton = styled.button`
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

export const StyledManeuversContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledManeuversHeaderRow = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr 1fr 3fr 1fr;
	gap: 0.75rem;
	padding: 0.75rem;
	background: #f5f5dc;
	border: 1px solid #8b4513;
	border-radius: 4px;
	font-weight: bold;
	font-size: 0.9rem;
	color: #8b4513;
`;

export const StyledManeuverHeaderColumn = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

export const StyledManeuverEmptyState = styled.div`
	text-align: center;
	padding: 1.5rem;
	color: #666;
	font-style: italic;
	font-size: 0.9rem;
`;

export const StyledManeuverRow = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr 1fr 3fr 1fr;
	gap: 0.75rem;
	padding: 0.75rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	background: white;
	align-items: flex-start;
	min-height: 60px;

	&:hover {
		background: #f9f9f9;
	}
`;

export const StyledManeuverCell = styled.div`
	font-size: 0.85rem;
	color: #333;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	text-align: center;
	word-wrap: break-word;
	line-height: 1.3;
`;

export const StyledManeuverNameCell = styled(StyledManeuverCell)`
	justify-content: flex-start;
	text-align: left;
	font-weight: 500;
`;

export const StyledManeuverDescriptionCell = styled(StyledManeuverCell)`
	justify-content: flex-start;
	text-align: left;
	line-height: 1.4;
`;

export const StyledManeuverSelect = styled.select`
	width: 100%;
	padding: 0.4rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-size: 0.85rem;
	background: white;
	max-width: 100%;

	&:focus {
		outline: none;
		border-color: #8b4513;
		box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.1);
	}
`;

export const StyledManeuverTypeFilter = styled.select`
	padding: 0.4rem 0.6rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	font-size: 0.85rem;
	background: white;
	min-width: 120px;

	&:focus {
		outline: none;
		border-color: #a0522d;
		box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.1);
	}
`;

export const StyledManeuverRemoveButton = styled.button`
	background: #dc3545;
	color: white;
	border: none;
	padding: 0.4rem 0.8rem;
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.8rem;
	font-weight: 500;
	transition: background-color 0.2s;

	&:hover {
		background: #c82333;
	}

	&:active {
		background: #bd2130;
	}
`;

export const StyledExpandableDescription = styled.div`
	width: 100%;
`;

export const StyledDescriptionToggle = styled.span`
	cursor: pointer;
	color: #2563eb;
	display: flex;
	align-items: flex-start;
	gap: 0.25rem;
	line-height: 1.4;

	&:hover {
		color: #1d4ed8;
	}
`;

export const StyledExpandedDescription = styled.div`
	margin-top: 0.5rem;
	padding: 0.5rem;
	background: #f8f9fa;
	border-radius: 4px;
	font-size: 0.8rem;
	color: #495057;
	line-height: 1.4;
	border-left: 3px solid #8b4513;
`;

export const StyledClickableManeuverName = styled.span`
	cursor: pointer;
	color: #2563eb;
	font-weight: 500;

	&:hover {
		color: #1d4ed8;
		text-decoration: underline;
	}
`;