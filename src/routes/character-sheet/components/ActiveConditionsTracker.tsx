/**
 * Active Conditions Tracker
 *
 * Allows players to mark which conditions are currently affecting their character.
 * Shows a compact list of all possible conditions with checkboxes to toggle active state.
 */

import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ALL_CONDITIONS } from '../../../lib/rulesdata/conditions/conditions.data';
import type {
	ConditionDefinition,
	ConditionTag
} from '../../../lib/rulesdata/conditions/conditions.types';
import { theme } from '../styles/theme';

interface ActiveConditionsTrackerProps {
	activeConditions: string[];
	onToggleCondition: (conditionId: string) => void;
	isMobile?: boolean;
}

const Container = styled.section<{ $isMobile?: boolean }>`
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${(props) => (props.$isMobile ? theme.spacing[3] : theme.spacing[4])};
	margin: ${(props) => (props.$isMobile ? `${theme.spacing[2]} 0` : '0')};
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${theme.spacing[3]};
	border-bottom: 1px solid ${theme.colors.border.default};
	padding-bottom: ${theme.spacing[2]};
`;

const Title = styled.h3`
	font-family: 'Cinzel', 'Georgia', serif;
	color: ${theme.colors.text.primary};
	margin: 0;
	font-size: ${theme.typography.fontSize.xl};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

const ActiveCount = styled.span`
	color: ${theme.colors.accent.primary};
	font-weight: ${theme.typography.fontWeight.semibold};
	font-size: ${theme.typography.fontSize.base};
`;

const SearchInput = styled.input`
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	width: 100%;
	margin-bottom: ${theme.spacing[3]};
	transition: all ${theme.transitions.fast};

	&:focus {
		outline: none;
		border-color: ${theme.colors.accent.primary};
		box-shadow: 0 0 0 2px rgba(125, 207, 255, 0.2);
	}

	&::placeholder {
		color: ${theme.colors.text.muted};
	}
`;

const TagFilters = styled.div`
	display: flex;
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[3]};
	flex-wrap: wrap;
`;

const TagButton = styled.button<{ $active: boolean }>`
	background: ${(props) =>
		props.$active ? theme.colors.accent.primary : theme.colors.bg.elevated};
	border: 1px solid
		${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.md};
	color: ${(props) => (props.$active ? theme.colors.text.inverse : theme.colors.text.secondary)};
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.medium};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${(props) =>
			props.$active ? theme.colors.accent.secondary : theme.colors.bg.tertiary};
		transform: translateY(-1px);
	}
`;

const ConditionsList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: ${theme.spacing[2]};
	max-height: 400px;
	overflow-y: auto;
	padding: ${theme.spacing[2]};
`;

const ConditionItem = styled.label<{ $active: boolean; $expanded: boolean }>`
	background: ${(props) => (props.$active ? theme.colors.bg.tertiary : theme.colors.bg.elevated)};
	border: 1px solid
		${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[2]};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[1]};

	&:hover {
		background: ${theme.colors.bg.tertiary};
		border-color: ${theme.colors.accent.primary};
		transform: translateY(-1px);
	}
`;

const ConditionHeader = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
	justify-content: space-between;
`;

const ConditionHeaderLeft = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
	flex: 1;
`;

const ConditionHeaderRight = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[1]};
`;

const Checkbox = styled.input`
	width: 18px;
	height: 18px;
	cursor: pointer;
	accent-color: ${theme.colors.accent.primary};
`;

const ConditionName = styled.span<{ $active: boolean }>`
	color: ${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.text.primary)};
	font-weight: ${(props) =>
		props.$active ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium};
	font-size: ${theme.typography.fontSize.sm};
	flex: 1;
`;

const TagLabel = styled.span<{ $tag: ConditionTag }>`
	background: ${(props) => {
		switch (props.$tag) {
			case 'physical':
				return '#dc2626';
			case 'mental':
				return '#7c3aed';
			case 'sensory':
				return '#0891b2';
			case 'movement':
				return '#f59e0b';
			case 'damage':
				return '#dc2626';
			default:
				return theme.colors.text.muted;
		}
	}};
	color: white;
	padding: 2px 6px;
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.medium};
	text-transform: capitalize;
`;

const TagsContainer = styled.div`
	display: flex;
	gap: ${theme.spacing[1]};
	flex-wrap: wrap;
	margin-top: ${theme.spacing[1]};
`;

const TypeBadge = styled.span<{ $type: string }>`
	background: ${(props) => {
		switch (props.$type) {
			case 'stacking':
				return '#3b82f6';
			case 'overlapping':
				return '#f59e0b';
			case 'absolute':
				return '#ef4444';
			default:
				return theme.colors.text.muted;
		}
	}};
	color: white;
	padding: 2px 6px;
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	text-transform: uppercase;
`;

const ConditionDescription = styled.p`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	margin: 0;
	line-height: ${theme.typography.lineHeight.relaxed};
`;

const ExpandButton = styled.button`
	background: none;
	border: none;
	color: ${theme.colors.accent.primary};
	font-size: ${theme.typography.fontSize.xs};
	padding: 0;
	cursor: pointer;
	text-align: left;
	margin-top: ${theme.spacing[1]};
	transition: all ${theme.transitions.fast};

	&:hover {
		text-decoration: underline;
	}
`;

const EmptyState = styled.div`
	text-align: center;
	color: ${theme.colors.text.muted};
	font-style: italic;
	padding: ${theme.spacing[6]};
`;

const ALL_TAGS: ConditionTag[] = ['physical', 'mental', 'sensory', 'movement', 'damage'];

const TAG_LABELS: Record<ConditionTag, string> = {
	physical: 'Physical',
	mental: 'Mental',
	sensory: 'Sensory',
	movement: 'Movement',
	damage: 'Damage'
};

export const ActiveConditionsTracker: React.FC<ActiveConditionsTrackerProps> = ({
	activeConditions,
	onToggleCondition,
	isMobile = false
}) => {
	const { t } = useTranslation();
	const [searchTerm, setSearchTerm] = useState('');
	const [activeTagFilters, setActiveTagFilters] = useState<Set<ConditionTag>>(new Set());
	const [expandedConditions, setExpandedConditions] = useState<Set<string>>(new Set());

	// Filter conditions based on search and tags
	const filteredConditions = useMemo(() => {
		let results = ALL_CONDITIONS;

		// Filter by search term
		if (searchTerm.trim()) {
			const term = searchTerm.toLowerCase();
			results = results.filter((condition) => condition.name.toLowerCase().includes(term));
		}

		// Filter by tags
		if (activeTagFilters.size > 0) {
			results = results.filter((condition) =>
				condition.tags.some((tag) => activeTagFilters.has(tag))
			);
		}

		return results;
	}, [searchTerm, activeTagFilters]);

	const toggleTagFilter = (tag: ConditionTag) => {
		setActiveTagFilters((prev) => {
			const next = new Set(prev);
			if (next.has(tag)) {
				next.delete(tag);
			} else {
				next.add(tag);
			}
			return next;
		});
	};

	const toggleExpanded = (conditionId: string) => {
		setExpandedConditions((prev) => {
			const next = new Set(prev);
			if (next.has(conditionId)) {
				next.delete(conditionId);
			} else {
				next.add(conditionId);
			}
			return next;
		});
	};

	return (
		<Container $isMobile={isMobile}>
			<Header>
				<Title>⚔️ {t('characterSheet.conditionsTitle')}</Title>
				<ActiveCount>{t('characterSheet.conditionsActive', { count: activeConditions.length })}</ActiveCount>
			</Header>

			<SearchInput
				type="text"
				placeholder={t('characterSheet.conditionsSearch')}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<TagFilters>
				{ALL_TAGS.map((tag) => (
					<TagButton
						key={tag}
						$active={activeTagFilters.has(tag)}
						onClick={() => toggleTagFilter(tag)}
					>
						{TAG_LABELS[tag]}
					</TagButton>
				))}
			</TagFilters>

			<ConditionsList>
				{filteredConditions.length === 0 ? (
					<EmptyState>{t('characterSheet.conditionsNoMatch')}</EmptyState>
				) : (
					filteredConditions.map((condition) => {
						const isActive = activeConditions.includes(condition.id);
						const isExpanded = expandedConditions.has(condition.id);

						return (
							<ConditionItem key={condition.id} $active={isActive} $expanded={isExpanded}>
								<ConditionHeader>
									<ConditionHeaderLeft>
										<Checkbox
											type="checkbox"
											checked={isActive}
											onChange={() => onToggleCondition(condition.id)}
											onClick={(e) => e.stopPropagation()}
										/>
										<ConditionName $active={isActive}>{condition.name}</ConditionName>
									</ConditionHeaderLeft>
									<ConditionHeaderRight>
										{condition.tags.map((tag) => (
											<TagLabel key={tag} $tag={tag}>
												{TAG_LABELS[tag]}
											</TagLabel>
										))}
									</ConditionHeaderRight>
								</ConditionHeader>

								{isExpanded && <ConditionDescription>{condition.description}</ConditionDescription>}

								<ExpandButton onClick={() => toggleExpanded(condition.id)}>
								{isExpanded ? t('characterSheet.conditionsHideDetails') : t('characterSheet.conditionsShowDetails')}
								</ExpandButton>
							</ConditionItem>
						);
					})
				)}
			</ConditionsList>
		</Container>
	);
};

export default ActiveConditionsTracker;
