/**
 * Standalone Conditions Reference Page
 *
 * A full-page view of the conditions reference guide,
 * accessible from the main menu.
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ALL_CONDITIONS } from '../../lib/rulesdata/conditions/conditions.data';
import type { ConditionTag } from '../../lib/rulesdata/conditions/conditions.types';
import { Button } from '../../components/ui/button';

const PageContainer = styled.div`
	min-height: 100vh;
	background: url('/src/assets/BlackBG.jpg') center/cover no-repeat fixed;
	padding: 2rem;
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
	font-family: 'Cinzel', serif;
	color: #fbbf24;
	text-align: center;
	margin-bottom: 0.5rem;
	font-size: 1.875rem;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
	color: #e5e7eb;
	text-align: center;
	margin-bottom: 2rem;
`;

const FilterCard = styled.div`
	background: linear-gradient(to bottom right, #1e1b4b, #312e81);
	border: 2px solid #a855f7;
	border-radius: 0.75rem;
	padding: 1.5rem;
	margin-bottom: 1.5rem;
	box-shadow: 0 10px 15px -3px rgba(168, 85, 247, 0.3);
`;

const SearchInput = styled.input`
	width: 100%;
	padding: 0.75rem 1rem;
	border: 1px solid rgba(168, 85, 247, 0.5);
	border-radius: 0.5rem;
	font-size: 1rem;
	color: #fff;
	background: rgba(0, 0, 0, 0.3);
	margin-bottom: 1rem;

	&::placeholder {
		color: #888;
	}

	&:focus {
		outline: none;
		border-color: #a855f7;
		box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.2);
	}
`;

const TagFilters = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
`;

const TagButton = styled.button<{ $active: boolean }>`
	padding: 0.4rem 0.75rem;
	border-radius: 1rem;
	font-size: 0.85rem;
	cursor: pointer;
	transition: all 0.15s ease;
	border: 1px solid ${(props) => (props.$active ? '#a855f7' : 'rgba(255,255,255,0.2)')};
	background: ${(props) => (props.$active ? '#a855f7' : 'transparent')};
	color: ${(props) => (props.$active ? '#fff' : '#ccc')};

	&:hover {
		border-color: #a855f7;
		background: ${(props) => (props.$active ? '#a855f7' : 'rgba(168, 85, 247, 0.2)')};
	}
`;

const ConditionsList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

const ConditionCard = styled.div<{ $expanded: boolean }>`
	background: linear-gradient(to bottom right, #1e1b4b, #312e81);
	border: 2px solid #a855f7;
	border-radius: 0.75rem;
	overflow: hidden;
	box-shadow: 0 10px 15px -3px rgba(168, 85, 247, 0.3);
	transition: all 0.2s ease;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 20px 25px -5px rgba(168, 85, 247, 0.4);
	}
`;

const ConditionHeader = styled.button`
	width: 100%;
	padding: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: none;
	border: none;
	cursor: pointer;
	text-align: left;
	color: #fff;
`;

const ConditionName = styled.span`
	font-weight: 600;
	font-size: 1.1rem;
	color: #fbbf24;
`;

const TypeBadge = styled.span<{ $type: string }>`
	font-size: 0.7rem;
	padding: 0.2rem 0.5rem;
	border-radius: 0.5rem;
	margin-left: 0.75rem;
	text-transform: uppercase;
	background: ${(props) => {
		switch (props.$type) {
			case 'stacking':
				return 'rgba(251, 146, 60, 0.2)';
			case 'overlapping':
				return 'rgba(96, 165, 250, 0.2)';
			case 'absolute':
				return 'rgba(167, 139, 250, 0.2)';
			default:
				return 'rgba(255,255,255,0.1)';
		}
	}};
	color: ${(props) => {
		switch (props.$type) {
			case 'stacking':
				return '#fb923c';
			case 'overlapping':
				return '#60a5fa';
			case 'absolute':
				return '#a78bfa';
			default:
				return '#ccc';
		}
	}};
`;

const ExpandIcon = styled.span<{ $expanded: boolean }>`
	font-size: 0.9rem;
	color: #888;
	transition: transform 0.2s ease;
	transform: ${(props) => (props.$expanded ? 'rotate(180deg)' : 'rotate(0)')};
`;

const ConditionDescription = styled.div`
	padding: 0 1rem 1rem;
	font-size: 0.95rem;
	line-height: 1.6;
	color: #ccc;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	padding-top: 0.75rem;
`;

const ConditionTags = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.35rem;
	margin-top: 0.5rem;
`;

const ConditionTagBadge = styled.span<{ $tag: string }>`
	font-size: 0.7rem;
	padding: 0.15rem 0.4rem;
	border-radius: 0.35rem;
	background: rgba(255, 255, 255, 0.1);
	color: #aaa;
`;

const EmptyState = styled.div`
	text-align: center;
	padding: 2rem;
	color: #888;
	font-size: 1rem;
	font-style: italic;
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
	const navigate = useNavigate();
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
			<BackButtonRow>
				<Button variant="secondary" onClick={() => navigate('/menu')} className="font-bold">
					← Back to Menu
				</Button>
			</BackButtonRow>
			<ContentWrapper>
				<Title>Conditions Reference</Title>
				<Subtitle>Browse all conditions and their effects in DC20</Subtitle>

				<FilterCard>
					<SearchInput
						type="text"
						placeholder="Search conditions..."
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
						<EmptyState>No conditions match your search</EmptyState>
					) : (
						filteredConditions.map((condition) => {
							const isExpanded = expandedConditions.has(condition.id);
							return (
								<ConditionCard key={condition.id} $expanded={isExpanded}>
									<ConditionHeader onClick={() => toggleCondition(condition.id)}>
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<ConditionName>{condition.name}</ConditionName>
											<TypeBadge $type={condition.type}>
												{TYPE_LABELS[condition.type]}
											</TypeBadge>
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
