import styled from 'styled-components';

export const StyledPlayerNotesContainer = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	margin-bottom: 1rem;
`;

export const StyledPlayerNotesTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	text-align: center;
	margin-bottom: 1rem;
`;

export const StyledNotesContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

export const StyledNotesList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledNoteItem = styled.div`
	border: 1px solid #8b4513;
	border-radius: 4px;
	padding: 0.75rem;
	background: #f9f9f9;
	transition: all 0.2s ease;

	&:hover {
		background: #f5f5f5;
	}
`;

export const StyledNoteText = styled.p`
	color: #2d2d2d;
	font-size: 0.9rem;
	line-height: 1.4;
	margin: 0 0 0.5rem 0;
	word-wrap: break-word;
`;

export const StyledNoteActions = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-top: 0.5rem;
`;

export const StyledNoteInput = styled.textarea`
	background: white;
	border: 1px solid #8b4513;
	border-radius: 4px;
	color: #2d2d2d;
	font-size: 0.9rem;
	padding: 0.5rem;
	width: 100%;
	min-height: 60px;
	resize: vertical;
	font-family: 'Georgia', serif;

	&:focus {
		outline: none;
		border-color: #8b4513;
		box-shadow: 0 0 0 1px #8b4513;
	}

	&::placeholder {
		color: #999;
	}
`;

export const StyledAddButton = styled.button`
	background: #8b4513;
	border: 1px solid #8b4513;
	border-radius: 4px;
	color: white;
	font-size: 0.85rem;
	font-weight: bold;
	padding: 0.5rem 0.75rem;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background-color: #6d3410;
	}

	&:active {
		transform: translateY(1px);
	}
`;

export const StyledDeleteButton = styled.button`
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
	font-weight: bold;

	&:hover {
		background-color: #fecaca;
	}

	&:active {
		transform: translateY(1px);
	}
`;

export const StyledEditButton = styled.button`
	background: #f9f9f9;
	border: 1px solid #8b4513;
	border-radius: 4px;
	color: #8b4513;
	font-size: 1rem;
	cursor: pointer;
	transition: all 0.2s ease;
	width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;

	&:hover {
		background: #8b4513;
		color: white;
	}

	&:active {
		transform: translateY(1px);
	}
`;

export const StyledSaveButton = styled.button`
	background: #f9f9f9;
	border: 1px solid #8b4513;
	border-radius: 4px;
	color: #8b4513;
	font-size: 0.85rem;
	font-weight: bold;
	padding: 0.4rem 0.6rem;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: #8b4513;
		color: white;
	}

	&:active {
		transform: translateY(1px);
	}
`;

export const StyledCancelButton = styled.button`
	background: #f9f9f9;
	border: 1px solid #8b4513;
	border-radius: 4px;
	color: #8b4513;
	font-size: 0.85rem;
	font-weight: bold;
	padding: 0.4rem 0.6rem;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: #8b4513;
		color: white;
	}

	&:active {
		transform: translateY(1px);
	}
`;

export const StyledAddNoteSection = styled.div`
	border-top: 1px solid #8b4513;
	padding-top: 0.75rem;
`;

export const StyledEmptyNotesMessage = styled.div`
	color: #8b4513;
	font-style: italic;
	text-align: center;
	padding: 1.5rem 1rem;
	border: 1px dashed #8b4513;
	border-radius: 4px;
	background: #f9f9f9;
	font-size: 0.9rem;
`;
