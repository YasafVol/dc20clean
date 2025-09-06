import styled from 'styled-components';

export const StyledRightResourcesContainer = styled.div<{ $isMobile?: boolean }>`
	border: ${(props) => (props.$isMobile ? '1px solid #f5d020' : '2px solid #8b4513')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.$isMobile ? '#2a2a2a' : 'white')};
	margin-bottom: 1rem;
`;

export const StyledRightResourcesTitle = styled.div<{ $isMobile?: boolean }>`
	font-size: 1.1rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#8b4513')};
	text-align: center;
	margin-bottom: 1rem;
`;

export const StyledRightResourceRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.8rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const StyledRightResourceLabel = styled.span<{ $isMobile?: boolean }>`
	font-size: 0.9rem;
	color: ${(props) => (props.$isMobile ? '#ffffff' : '#8b4513')};
`;

export const StyledRightResourceControls = styled.div`
	display: flex;
	align-items: center;
	gap: 0.3rem;
`;

export const StyledRightResourceInput = styled.input<{ $isMobile?: boolean }>`
	width: 40px;
	text-align: center;
	border: ${(props) => (props.$isMobile ? '1px solid #555' : '1px solid #8b4513')};
	border-radius: 4px;
	padding: 0.2rem;
	font-size: 0.9rem;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#8b4513')};
	background: ${(props) => (props.$isMobile ? '#333' : 'white')};

	&:focus {
		outline: none;
		border-color: ${(props) => (props.$isMobile ? '#f5d020' : '#654321')};
		box-shadow: 0 0 0 2px
			${(props) => (props.$isMobile ? 'rgba(245, 208, 32, 0.2)' : 'rgba(139, 69, 19, 0.2)')};
	}
`;

export const StyledRightResourceMax = styled.span<{ $isMobile?: boolean }>`
	font-size: 0.9rem;
	color: ${(props) => (props.$isMobile ? '#ffffff' : '#8b4513')};
`;
