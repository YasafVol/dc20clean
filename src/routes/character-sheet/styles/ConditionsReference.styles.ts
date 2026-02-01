import styled from 'styled-components';
import type { ConditionType, ConditionTag } from '../../../lib/rulesdata/conditions/conditions.types';
import { theme } from './theme';

export const StyledConditionsReferenceContainer = styled.div<{ $isMobile?: boolean }>`
	border: 2px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
	margin-bottom: ${theme.spacing[4]};
`;

export const StyledConditionsReferenceTitle = styled.div<{ $isMobile?: boolean }>`
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.accent.primary};
	text-align: center;
	margin-bottom: ${theme.spacing[3]};
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${theme.spacing[2]};
	font-family: 'Cinzel', 'Georgia', serif;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StyledConditionsHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[3]};
`;

export const StyledSearchInput = styled.input<{ $isMobile?: boolean }>`
	width: 100%;
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.primary};
	background: ${theme.colors.bg.primary};
	transition: all ${theme.transitions.fast};

	&::placeholder {
		color: ${theme.colors.text.muted};
	}

	&:focus {
		outline: none;
		border-color: ${theme.colors.border.focus};
		box-shadow: 0 0 0 2px rgba(125, 207, 255, 0.2);
	}
`;

export const StyledTagFilters = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[1]};
`;

export const StyledTagButton = styled.button<{ $active: boolean; $isMobile?: boolean }>`
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.xs};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	border: 1px solid ${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.border.default)};
	background: ${(props) => (props.$active ? theme.colors.accent.primary : 'transparent')};
	color: ${(props) => (props.$active ? theme.colors.text.inverse : theme.colors.text.secondary)};
	font-weight: ${theme.typography.fontWeight.medium};

	&:hover {
		border-color: ${theme.colors.accent.primary};
		background: ${(props) => (props.$active ? theme.colors.accent.secondary : theme.colors.bg.tertiary)};
		color: ${(props) => (props.$active ? theme.colors.text.inverse : theme.colors.accent.primary)};
	}
`;

export const StyledConditionsList = styled.div<{ $isMobile?: boolean }>`
	max-height: 350px;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};

	/* Custom scrollbar */
	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: ${theme.colors.bg.primary};
		border-radius: ${theme.borderRadius.sm};
	}

	&::-webkit-scrollbar-thumb {
		background: ${theme.colors.accent.primary};
		border-radius: ${theme.borderRadius.sm};
		
		&:hover {
			background: ${theme.colors.accent.secondary};
		}
	}
`;

export const StyledConditionCard = styled.div<{ $expanded: boolean; $isMobile?: boolean }>`
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.elevated};
	overflow: hidden;
	transition: all ${theme.transitions.fast};

	&:hover {
		border-color: ${theme.colors.accent.primary};
		transform: translateY(-1px);
		box-shadow: ${theme.shadows.md};
	}
`;

export const StyledConditionHeader = styled.button<{ $isMobile?: boolean }>`
	width: 100%;
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: none;
	border: none;
	cursor: pointer;
	text-align: left;
	transition: all ${theme.transitions.fast};
	
	&:hover {
		background: ${theme.colors.bg.tertiary};
	}
`;

export const StyledConditionName = styled.span<{ $isMobile?: boolean }>`
	font-weight: ${theme.typography.fontWeight.semibold};
	font-size: ${theme.typography.fontSize.base};
	color: ${theme.colors.text.primary};
`;

export const StyledConditionTypeBadge = styled.span<{ $type: ConditionType; $isMobile?: boolean }>`
	font-size: ${theme.typography.fontSize.xs};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.md};
	font-weight: ${theme.typography.fontWeight.medium};
	text-transform: uppercase;
	letter-spacing: 0.03em;
	background: ${(props) => {
		switch (props.$type) {
			case 'stacking':
				return 'rgba(224, 175, 104, 0.15)';
			case 'overlapping':
				return 'rgba(125, 207, 255, 0.15)';
			case 'absolute':
				return 'rgba(187, 154, 247, 0.15)';
		}
	}};
	color: ${(props) => {
		switch (props.$type) {
			case 'stacking':
				return theme.colors.accent.warning;
			case 'overlapping':
				return theme.colors.accent.primary;
			case 'absolute':
				return theme.colors.accent.secondary;
		}
	}};
`;

export const StyledConditionDescription = styled.div<{ $isMobile?: boolean }>`
	padding: 0 ${theme.spacing[3]} ${theme.spacing[3]};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.relaxed};
	color: ${theme.colors.text.secondary};
	border-top: 1px solid ${theme.colors.border.default};
	padding-top: ${theme.spacing[2]};
`;

export const StyledConditionTags = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[1]};
	margin-top: ${theme.spacing[2]};
`;

export const StyledConditionTag = styled.span<{ $tag: ConditionTag; $isMobile?: boolean }>`
	font-size: ${theme.typography.fontSize.xs};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.sm};
	background: ${(props) => {
		switch (props.$tag) {
			case 'physical':
				return 'rgba(247, 118, 142, 0.15)';
			case 'mental':
				return 'rgba(187, 154, 247, 0.15)';
			case 'sensory':
				return 'rgba(224, 175, 104, 0.15)';
			case 'movement':
				return 'rgba(158, 206, 106, 0.15)';
			case 'damage':
				return 'rgba(247, 118, 142, 0.2)';
		}
	}};
	color: ${(props) => {
		switch (props.$tag) {
			case 'physical':
				return theme.colors.accent.danger;
			case 'mental':
				return theme.colors.accent.secondary;
			case 'sensory':
				return theme.colors.accent.warning;
			case 'movement':
				return theme.colors.accent.success;
			case 'damage':
				return theme.colors.accent.danger;
		}
	}};
	font-weight: ${theme.typography.fontWeight.medium};
`;

export const StyledExpandIcon = styled.span<{ $expanded: boolean; $isMobile?: boolean }>`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.accent.primary};
	transition: transform ${theme.transitions.fast};
	transform: ${(props) => (props.$expanded ? 'rotate(180deg)' : 'rotate(0)')};
`;

export const StyledEmptyState = styled.div<{ $isMobile?: boolean }>`
	text-align: center;
	padding: ${theme.spacing[6]};
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.sm};
	font-style: italic;
`;

export const StyledConditionCount = styled.span<{ $isMobile?: boolean }>`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.muted};
	font-weight: ${theme.typography.fontWeight.normal};
`;
