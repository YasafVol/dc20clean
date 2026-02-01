import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const KnowledgeTradesSection = styled.div<MobileStyledProps>`
	margin-bottom: 1rem;
	border: 2px solid ${(props) => (props.$isMobile ? 'rgb(68,68,68)' : '#414868')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.$isMobile ? 'rgb(42,42,42)' : '#24283B')};
`;

export const SectionTitle = styled.div<MobileStyledProps>`
	font-size: 1.1rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#7DCFFF')};
	margin-bottom: 0.5rem;
	text-align: center;
`;

export const SectionDescription = styled.div<MobileStyledProps>`
	font-size: 0.8rem;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#9aa5ce')};
	margin-bottom: 0.5rem;
	text-align: center;
`;

export const EmptyMessage = styled.div<MobileStyledProps>`
	font-size: 0.9rem;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#9aa5ce')};
	text-align: center;
	font-style: italic;
	padding: 1rem;
`;

export const StyledInfoButton = styled.button<MobileStyledProps>`
	background: transparent;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#7DCFFF')};
	border: 1px solid ${(props) => (props.$isMobile ? 'rgb(68,68,68)' : '#414868')};
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
		background: ${(props) => (props.$isMobile ? '#f5d020' : '#7DCFFF')};
		color: ${(props) => (props.$isMobile ? 'rgb(42,42,42)' : '#1A1B26')};
	}
`;
