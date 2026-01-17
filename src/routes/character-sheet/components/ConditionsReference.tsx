/**
 * Conditions Reference Widget
 *
 * A searchable, filterable reference guide showing all DC20 conditions
 * and their effects. Users can browse by type (stacking/overlapping/absolute)
 * and filter by tags (physical, mental, sensory, movement, damage).
 */

import React, { useState, useMemo } from 'react';
import { ALL_CONDITIONS } from '../../../lib/rulesdata/conditions/conditions.data';
import type { ConditionTag } from '../../../lib/rulesdata/conditions/conditions.types';
import {
	StyledConditionsReferenceContainer,
	StyledConditionsReferenceTitle,
	StyledConditionsHeader,
	StyledSearchInput,
	StyledTagFilters,
	StyledTagButton,
	StyledConditionsList,
	StyledConditionCard,
	StyledConditionHeader,
	StyledConditionName,
	StyledConditionTypeBadge,
	StyledConditionDescription,
	StyledConditionTags,
	StyledConditionTag,
	StyledExpandIcon,
	StyledEmptyState,
	StyledConditionCount
} from '../styles/ConditionsReference.styles';

interface ConditionsReferenceProps {
	isMobile?: boolean;
}

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

const ConditionsReference: React.FC<ConditionsReferenceProps> = ({ isMobile = false }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [activeTagFilters, setActiveTagFilters] = useState<Set<ConditionTag>>(new Set());
	const [expandedConditions, setExpandedConditions] = useState<Set<string>>(new Set());

	// Filter conditions based on search and tags
	const filteredConditions = useMemo(() => {
		let results = ALL_CONDITIONS;

		// Filter by search term
		if (searchTerm.trim()) {
			const term = searchTerm.toLowerCase();
			results = results.filter(
				(condition) =>
					condition.name.toLowerCase().includes(term) ||
					condition.description.toLowerCase().includes(term)
			);
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
		<StyledConditionsReferenceContainer $isMobile={isMobile}>
			<StyledConditionsReferenceTitle $isMobile={isMobile}>
				📖 CONDITIONS REFERENCE{' '}
				<StyledConditionCount $isMobile={isMobile}>
					({filteredConditions.length}/{ALL_CONDITIONS.length})
				</StyledConditionCount>
			</StyledConditionsReferenceTitle>

			<StyledConditionsHeader>
				<StyledSearchInput
					$isMobile={isMobile}
					type="text"
					placeholder="Search conditions..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				<StyledTagFilters>
					{ALL_TAGS.map((tag) => (
						<StyledTagButton
							key={tag}
							$active={activeTagFilters.has(tag)}
							$isMobile={isMobile}
							onClick={() => toggleTagFilter(tag)}
						>
							{TAG_LABELS[tag]}
						</StyledTagButton>
					))}
				</StyledTagFilters>
			</StyledConditionsHeader>

			<StyledConditionsList $isMobile={isMobile}>
				{filteredConditions.length === 0 ? (
					<StyledEmptyState $isMobile={isMobile}>
						No conditions match your search
					</StyledEmptyState>
				) : (
					filteredConditions.map((condition) => {
						const isExpanded = expandedConditions.has(condition.id);
						return (
							<StyledConditionCard
								key={condition.id}
								$expanded={isExpanded}
								$isMobile={isMobile}
							>
								<StyledConditionHeader
									$isMobile={isMobile}
									onClick={() => toggleCondition(condition.id)}
								>
									<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
										<StyledConditionName $isMobile={isMobile}>
											{condition.name}
										</StyledConditionName>
										<StyledConditionTypeBadge
											$type={condition.type}
											$isMobile={isMobile}
										>
											{TYPE_LABELS[condition.type]}
										</StyledConditionTypeBadge>
									</div>
									<StyledExpandIcon $expanded={isExpanded} $isMobile={isMobile}>
										▼
									</StyledExpandIcon>
								</StyledConditionHeader>

								{isExpanded && (
									<StyledConditionDescription $isMobile={isMobile}>
										{condition.description}
										<StyledConditionTags>
											{condition.tags.map((tag) => (
												<StyledConditionTag
													key={tag}
													$tag={tag}
													$isMobile={isMobile}
												>
													{tag}
												</StyledConditionTag>
											))}
										</StyledConditionTags>
									</StyledConditionDescription>
								)}
							</StyledConditionCard>
						);
					})
				)}
			</StyledConditionsList>
		</StyledConditionsReferenceContainer>
	);
};

export default ConditionsReference;
