import styled from 'styled-components';

export const KnowledgeTradesSection = styled.div`
	margin-bottom: 1rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const SectionTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.5rem;
	text-align: center;
`;

export const SectionDescription = styled.div`
	font-size: 0.8rem;
	color: #8b4513;
	margin-bottom: 0.5rem;
	text-align: center;
`;

export const EmptyMessage = styled.div`
	font-size: 0.9rem;
	color: #8b4513;
	text-align: center;
	font-style: italic;
	padding: 1rem;
`;

export const StyledInfoButton = styled.button`
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
	margin-left: 0.5rem;

	&:hover {
		background: #8b4513;
		color: white;
	}
`;
