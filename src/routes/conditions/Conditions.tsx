/**
 * Standalone Conditions Reference Page
 *
 * A full-page view of the conditions reference guide,
 * accessible from the main menu.
 */

import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { theme } from '../character-sheet/styles/theme';
import { ALL_CONDITIONS } from '../../lib/rulesdata/conditions/conditions.data';
import type { ConditionTag } from '../../lib/rulesdata/conditions/conditions.types';
import { useTranslation } from 'react-i18next';

const PageContainer = styled.div`
	min-height: 100vh;
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font-family: ${theme.typography.fontFamily.primary};
	padding: ${theme.spacing[8]} ${theme.spacing[4]};
`;

const BackButtonRow = styled.div`
	max-width: 900px;
	margin: 0 auto 2rem;
`;

const ContentWrapper = styled.div`
	max-width: 900px;
	margin: 0 auto;
`;

const Title = styled.h1`
	font-size: ${theme.typography.fontSize['3xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	text-align: center;
	margin: 0 0 ${theme.spacing[2]} 0;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

const Subtitle = styled.p`
	color: ${theme.colors.text.secondary};
	text-align: center;
	font-size: ${theme.typography.fontSize.base};
	margin: 0 0 ${theme.spacing[6]} 0;
`;

const FilterCard = styled.div`
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[6]};
	margin-bottom: ${theme.spacing[6]};
	box-shadow: ${theme.shadows.md};
`;

const SearchInput = styled.input`
	width: 100%;
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.base};
	color: ${theme.colors.text.primary};
	background: ${theme.colors.bg.tertiary};
	margin-bottom: ${theme.spacing[4]};
	transition: all ${theme.transitions.fast};

	&::placeholder {
		color: ${theme.colors.text.muted};
	}

	&:focus {
		outline: none;
		border-color: ${theme.colors.border.focus};
		box-shadow: 0 0 0 2px ${theme.colors.accent.primaryAlpha30};
	}
`;

const TagFilters = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[2]};
`;

const TagButton = styled.button<{ $active: boolean }>`
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	border: 1px solid ${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.border.default)};
	background: ${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.bg.tertiary)};
	color: ${(props) => (props.$active ? theme.colors.text.inverse : theme.colors.text.primary)};

	&:hover {
		border-color: ${theme.colors.accent.primary};
		background: ${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.bg.elevated)};
	}

	&:active {
		transform: scale(0.98);
	}
`;

const ConditionsList = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[3]};
`;

const ConditionCard = styled.div<{ $expanded: boolean }>`
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	overflow: hidden;
	box-shadow: ${theme.shadows.md};
	transition: all ${theme.transitions.fast};

	&:hover {
		transform: translateY(-2px);
		box-shadow: ${theme.shadows.lg};
		border-color: ${theme.colors.accent.primary};
	}
`;

const ConditionHeader = styled.button`
	width: 100%;
	padding: ${theme.spacing[4]};
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: none;
	border: none;
	cursor: pointer;
	text-align: left;
	color: ${theme.colors.text.primary};
`;

const ConditionName = styled.span`
	font-weight: ${theme.typography.fontWeight.bold};
	font-size: ${theme.typography.fontSize.lg};
	color: ${theme.colors.text.primary};
`;

const TypeBadge = styled.span<{ $type: string }>`
	font-size: ${theme.typography.fontSize.xs};
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	border-radius: ${theme.borderRadius.md};
	margin-left: ${theme.spacing[3]};
	text-transform: uppercase;
	font-weight: ${theme.typography.fontWeight.semibold};
	background: ${(props) => {
		switch (props.$type) {
			case 'stacking':
				return theme.colors.accent.warning;
			case 'overlapping':
				return theme.colors.accent.info;
			case 'absolute':
				return theme.colors.accent.secondary;
			default:
				return theme.colors.bg.tertiary;
		}
	}};
	color: ${(props) => {
		switch (props.$type) {
			case 'stacking':
			case 'overlapping':
			case 'absolute':
				return theme.colors.text.inverse;
			default:
				return theme.colors.text.secondary;
		}
	}};
`;

const ExpandIcon = styled.span<{ $expanded: boolean }>`
	font-size: ${theme.typography.fontSize.base};
	color: ${theme.colors.text.secondary};
	transition: transform ${theme.transitions.fast};
	transform: ${(props) => (props.$expanded ? 'rotate(180deg)' : 'rotate(0)')};
`;

const ConditionDescription = styled.div`
	padding: ${theme.spacing[4]};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.relaxed};
	color: ${theme.colors.text.primary};
	border-top: 1px solid ${theme.colors.border.default};
`;

const ConditionTags = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[1]};
	margin-top: ${theme.spacing[2]};
`;

const ConditionTagBadge = styled.span<{ $tag: string }>`
	font-size: ${theme.typography.fontSize.xs};
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.secondary};
	font-weight: ${theme.typography.fontWeight.medium};
`;

const EmptyState = styled.div`
	text-align: center;
	padding: ${theme.spacing[12]} ${theme.spacing[4]};
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.lg};
`;

const ALL_TAGS: ConditionTag[] = ['physical', 'mental', 'sensory', 'movement', 'damage'];

const TAG_LABELS: Record<ConditionTag, string> = {
	physical: '💪 Physical',
	mental: '🧠 Mental',
	sensory: '👁️ Sensory',
	movement: '🏃 Movement',
	damage: '⚔️ Damage'
};

const TYPE_LABELS: Record<string, string> = {
	stacking: 'Stacks (X)',
	overlapping: 'Overlapping',
	absolute: 'On/Off'
};

const Conditions: React.FC = () => {
	const { t } = useTranslation();
	const [searchTerm, setSearchTerm] = useState('');
	const [activeTagFilters, setActiveTagFilters] = useState<Set<ConditionTag>>(new Set());
	const [expandedConditions, setExpandedConditions] = useState<Set<string>>(new Set());

	const filteredConditions = useMemo(() => {
		let results = ALL_CONDITIONS;

		if (searchTerm.trim()) {
			const term = searchTerm.toLowerCase();
			results = results.filter(
				(condition) =>
					condition.name.toLowerCase().includes(term) ||
					condition.description.toLowerCase().includes(term)
			);
		}

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

	const toggleCondition = (conditionId: string) => {
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
		<PageContainer>
			<ContentWrapper>
				<Title>{t('conditions.title')}</Title>
				<Subtitle>{t('conditions.subtitle')}</Subtitle>

				<FilterCard>
					<SearchInput
						type="text"
						placeholder={t('conditions.searchPlaceholder')}
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
				</FilterCard>

				<ConditionsList>
					{filteredConditions.length === 0 ? (
						<EmptyState>{t('conditions.noConditionsFound')}</EmptyState>
					) : (
						filteredConditions.map((condition) => {
							const isExpanded = expandedConditions.has(condition.id);
							return (
								<ConditionCard key={condition.id} $expanded={isExpanded}>
									<ConditionHeader onClick={() => toggleCondition(condition.id)}>
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<ConditionName>{condition.name}</ConditionName>
											<TypeBadge $type={condition.type}>{TYPE_LABELS[condition.type]}</TypeBadge>
										</div>
										<ExpandIcon $expanded={isExpanded}>▼</ExpandIcon>
									</ConditionHeader>

									{isExpanded && (
										<ConditionDescription>
											{condition.description}
											<ConditionTags>
												{condition.tags.map((tag) => (
													<ConditionTagBadge key={tag} $tag={tag}>
														{tag}
													</ConditionTagBadge>
												))}
											</ConditionTags>
										</ConditionDescription>
									)}
								</ConditionCard>
							);
						})
					)}
				</ConditionsList>
			</ContentWrapper>
		</PageContainer>
	);
};

export default Conditions;
