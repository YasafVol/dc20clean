import styled from 'styled-components';
import type { ConditionType, ConditionTag } from '../../../lib/rulesdata/conditions/conditions.types';

export const StyledConditionsReferenceContainer = styled.div<{ $isMobile?: boolean }>`
	border: ${(props) => (props.$isMobile ? '1px solid #f5d020' : '2px solid #8b4513')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.$isMobile ? '#2a2a2a' : 'white')};
	margin-bottom: 1rem;
`;

export const StyledConditionsReferenceTitle = styled.div<{ $isMobile?: boolean }>`
	font-size: 1.1rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#8b4513')};
	text-align: center;
	margin-bottom: 0.75rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
`;

export const StyledConditionsHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledSearchInput = styled.input<{ $isMobile?: boolean }>`
	width: 100%;
	padding: 0.5rem 0.75rem;
	border: ${(props) => (props.$isMobile ? '1px solid #555' : '1px solid #8b4513')};
	border-radius: 4px;
	font-size: 0.85rem;
	color: ${(props) => (props.$isMobile ? '#fff' : '#333')};
	background: ${(props) => (props.$isMobile ? '#333' : '#fff')};

	&::placeholder {
		color: ${(props) => (props.$isMobile ? '#888' : '#999')};
	}

	&:focus {
		outline: none;
		border-color: ${(props) => (props.$isMobile ? '#f5d020' : '#654321')};
		box-shadow: 0 0 0 2px
			${(props) => (props.$isMobile ? 'rgba(245, 208, 32, 0.2)' : 'rgba(139, 69, 19, 0.2)')};
	}
`;

export const StyledTagFilters = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.35rem;
`;

export const StyledTagButton = styled.button<{ $active: boolean; $isMobile?: boolean }>`
	padding: 0.2rem 0.5rem;
	border-radius: 12px;
	font-size: 0.7rem;
	cursor: pointer;
	transition: all 0.15s ease;
	border: 1px solid ${(props) => (props.$active ? '#8b4513' : props.$isMobile ? '#555' : '#ccc')};
	background: ${(props) =>
		props.$active ? (props.$isMobile ? '#f5d020' : '#8b4513') : 'transparent'};
	color: ${(props) =>
		props.$active ? (props.$isMobile ? '#000' : '#fff') : props.$isMobile ? '#aaa' : '#666'};

	&:hover {
		border-color: ${(props) => (props.$isMobile ? '#f5d020' : '#8b4513')};
		background: ${(props) =>
			props.$active
				? props.$isMobile
					? '#f5d020'
					: '#654321'
				: props.$isMobile
					? 'rgba(245, 208, 32, 0.1)'
					: 'rgba(139, 69, 19, 0.1)'};
	}
`;

export const StyledConditionsList = styled.div<{ $isMobile?: boolean }>`
	max-height: 350px;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	/* Custom scrollbar */
	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		background: ${(props) => (props.$isMobile ? '#333' : '#f1f1f1')};
		border-radius: 3px;
	}

	&::-webkit-scrollbar-thumb {
		background: ${(props) => (props.$isMobile ? '#f5d020' : '#8b4513')};
		border-radius: 3px;
	}
`;

export const StyledConditionCard = styled.div<{ $expanded: boolean; $isMobile?: boolean }>`
	border: 1px solid ${(props) => (props.$isMobile ? '#444' : '#ddd')};
	border-radius: 6px;
	background: ${(props) => (props.$isMobile ? '#333' : '#fafafa')};
	overflow: hidden;
	transition: all 0.2s ease;

	&:hover {
		border-color: ${(props) => (props.$isMobile ? '#f5d020' : '#8b4513')};
	}
`;

export const StyledConditionHeader = styled.button<{ $isMobile?: boolean }>`
	width: 100%;
	padding: 0.6rem 0.75rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: none;
	border: none;
	cursor: pointer;
	text-align: left;
`;

export const StyledConditionName = styled.span<{ $isMobile?: boolean }>`
	font-weight: 600;
	font-size: 0.9rem;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#8b4513')};
`;

export const StyledConditionTypeBadge = styled.span<{ $type: ConditionType; $isMobile?: boolean }>`
	font-size: 0.65rem;
	padding: 0.15rem 0.4rem;
	border-radius: 8px;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.03em;
	background: ${(props) => {
		switch (props.$type) {
			case 'stacking':
				return props.$isMobile ? 'rgba(251, 146, 60, 0.2)' : 'rgba(234, 88, 12, 0.15)';
			case 'overlapping':
				return props.$isMobile ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.15)';
			case 'absolute':
				return props.$isMobile ? 'rgba(167, 139, 250, 0.2)' : 'rgba(139, 92, 246, 0.15)';
		}
	}};
	color: ${(props) => {
		switch (props.$type) {
			case 'stacking':
				return props.$isMobile ? '#fb923c' : '#c2410c';
			case 'overlapping':
				return props.$isMobile ? '#60a5fa' : '#1d4ed8';
			case 'absolute':
				return props.$isMobile ? '#a78bfa' : '#6d28d9';
		}
	}};
`;

export const StyledConditionDescription = styled.div<{ $isMobile?: boolean }>`
	padding: 0 0.75rem 0.75rem;
	font-size: 0.8rem;
	line-height: 1.5;
	color: ${(props) => (props.$isMobile ? '#ccc' : '#555')};
	border-top: 1px solid ${(props) => (props.$isMobile ? '#444' : '#eee')};
	padding-top: 0.5rem;
`;

export const StyledConditionTags = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.25rem;
	margin-top: 0.4rem;
`;

export const StyledConditionTag = styled.span<{ $tag: ConditionTag; $isMobile?: boolean }>`
	font-size: 0.6rem;
	padding: 0.1rem 0.35rem;
	border-radius: 6px;
	background: ${(props) => {
		switch (props.$tag) {
			case 'physical':
				return props.$isMobile ? 'rgba(248, 113, 113, 0.2)' : 'rgba(239, 68, 68, 0.1)';
			case 'mental':
				return props.$isMobile ? 'rgba(129, 140, 248, 0.2)' : 'rgba(99, 102, 241, 0.1)';
			case 'sensory':
				return props.$isMobile ? 'rgba(250, 204, 21, 0.2)' : 'rgba(234, 179, 8, 0.1)';
			case 'movement':
				return props.$isMobile ? 'rgba(52, 211, 153, 0.2)' : 'rgba(16, 185, 129, 0.1)';
			case 'damage':
				return props.$isMobile ? 'rgba(239, 68, 68, 0.3)' : 'rgba(220, 38, 38, 0.15)';
		}
	}};
	color: ${(props) => {
		switch (props.$tag) {
			case 'physical':
				return props.$isMobile ? '#f87171' : '#b91c1c';
			case 'mental':
				return props.$isMobile ? '#818cf8' : '#4338ca';
			case 'sensory':
				return props.$isMobile ? '#facc15' : '#a16207';
			case 'movement':
				return props.$isMobile ? '#34d399' : '#047857';
			case 'damage':
				return props.$isMobile ? '#ef4444' : '#991b1b';
		}
	}};
`;

export const StyledExpandIcon = styled.span<{ $expanded: boolean; $isMobile?: boolean }>`
	font-size: 0.8rem;
	color: ${(props) => (props.$isMobile ? '#888' : '#999')};
	transition: transform 0.2s ease;
	transform: ${(props) => (props.$expanded ? 'rotate(180deg)' : 'rotate(0)')};
`;

export const StyledEmptyState = styled.div<{ $isMobile?: boolean }>`
	text-align: center;
	padding: 1.5rem;
	color: ${(props) => (props.$isMobile ? '#888' : '#999')};
	font-size: 0.85rem;
	font-style: italic;
`;

export const StyledConditionCount = styled.span<{ $isMobile?: boolean }>`
	font-size: 0.75rem;
	color: ${(props) => (props.$isMobile ? '#888' : '#999')};
	font-weight: normal;
`;
