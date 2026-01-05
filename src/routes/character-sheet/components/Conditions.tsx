/**
 * Conditions Component
 *
 * Displays a character's condition interactions (immunities, resistances, vulnerabilities)
 * in a grouped, searchable format.
 *
 * @see docs/plannedSpecs/CONDITIONS_SPEC.md for full specification
 */

import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { groupConditionsByType, getConditionById } from '../../../lib/services/conditionAggregator';
import type { CharacterConditionStatus } from '../../../lib/rulesdata/conditions/conditions.types';

interface ConditionsProps {
	conditionStatuses: CharacterConditionStatus[];
	isMobile?: boolean;
}

// Styled components for the Conditions section
const ConditionsContainer = styled.section<{ $isMobile?: boolean }>`
	background: linear-gradient(135deg, rgba(30, 27, 75, 0.95) 0%, rgba(45, 40, 85, 0.9) 100%);
	border: 1px solid #fbbf24;
	border-radius: 8px;
	padding: ${(props) => (props.$isMobile ? '12px' : '16px')};
	margin: ${(props) => (props.$isMobile ? '8px 0' : '0')};
`;

const SectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
	border-bottom: 1px solid rgba(251, 191, 36, 0.3);
	padding-bottom: 8px;
`;

const SectionTitle = styled.h3`
	font-family: 'Cinzel', 'Georgia', serif;
	color: #fbbf24;
	margin: 0;
	font-size: 1.1rem;
	display: flex;
	align-items: center;
	gap: 8px;
`;

const SearchInput = styled.input`
	background: rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(251, 191, 36, 0.3);
	border-radius: 4px;
	padding: 4px 8px;
	color: #e5e7eb;
	font-size: 0.85rem;
	width: 150px;

	&:focus {
		outline: none;
		border-color: #fbbf24;
	}

	&::placeholder {
		color: rgba(229, 231, 235, 0.5);
	}
`;

const GroupContainer = styled.div`
	margin-bottom: 16px;

	&:last-child {
		margin-bottom: 0;
	}
`;

const GroupTitle = styled.h4<{ $type: 'immunity' | 'resistance' | 'vulnerability' }>`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.9rem;
	font-weight: 600;
	margin: 0 0 8px 0;
	display: flex;
	align-items: center;
	gap: 6px;
	color: ${(props) => {
		switch (props.$type) {
			case 'immunity':
				return '#22c55e'; // green
			case 'resistance':
				return '#3b82f6'; // blue
			case 'vulnerability':
				return '#ef4444'; // red
		}
	}};
`;

const ConditionsList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const ConditionItem = styled.li`
	background: rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	padding: 8px 12px;
	margin-bottom: 6px;

	&:last-child {
		margin-bottom: 0;
	}
`;

const ConditionName = styled.button`
	background: none;
	border: none;
	color: #e5e7eb;
	font-weight: 600;
	font-size: 0.9rem;
	padding: 0;
	cursor: pointer;
	text-align: left;

	&:hover {
		color: #fbbf24;
		text-decoration: underline;
	}
`;

const ConditionSources = styled.ul`
	list-style: none;
	padding: 0;
	margin: 4px 0 0 0;
`;

const SourceItem = styled.li`
	font-size: 0.8rem;
	color: rgba(229, 231, 235, 0.8);
	padding-left: 16px;
	position: relative;

	&::before {
		content: '└─';
		position: absolute;
		left: 0;
		color: rgba(251, 191, 36, 0.5);
	}
`;

const SourceDetails = styled.span`
	color: rgba(251, 191, 36, 0.8);
	font-style: italic;
`;

const EmptyMessage = styled.p`
	color: rgba(229, 231, 235, 0.6);
	font-style: italic;
	font-size: 0.85rem;
	text-align: center;
	margin: 16px 0;
`;

const ExpandButton = styled.button`
	background: none;
	border: 1px solid rgba(251, 191, 36, 0.3);
	border-radius: 4px;
	color: rgba(229, 231, 235, 0.8);
	padding: 4px 8px;
	font-size: 0.8rem;
	cursor: pointer;
	margin-top: 8px;

	&:hover {
		border-color: #fbbf24;
		color: #fbbf24;
	}
`;

const ConditionModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const ModalContent = styled.div`
	background: linear-gradient(135deg, rgba(30, 27, 75, 0.98) 0%, rgba(45, 40, 85, 0.98) 100%);
	border: 2px solid #fbbf24;
	border-radius: 12px;
	padding: 24px;
	max-width: 500px;
	width: 90%;
	max-height: 80vh;
	overflow-y: auto;
`;

const ModalTitle = styled.h3`
	font-family: 'Cinzel', 'Georgia', serif;
	color: #fbbf24;
	margin: 0 0 16px 0;
`;

const ModalDescription = styled.p`
	color: #e5e7eb;
	line-height: 1.6;
	margin: 0 0 16px 0;
`;

const ModalMeta = styled.div`
	display: flex;
	gap: 12px;
	font-size: 0.85rem;
	color: rgba(229, 231, 235, 0.7);
`;

const ModalTag = styled.span`
	background: rgba(251, 191, 36, 0.2);
	padding: 2px 8px;
	border-radius: 4px;
`;

const CloseButton = styled.button`
	background: #fbbf24;
	border: none;
	border-radius: 4px;
	color: #1e1b4b;
	padding: 8px 16px;
	font-weight: 600;
	cursor: pointer;
	margin-top: 16px;

	&:hover {
		background: #f1bf3e;
	}
`;

/**
 * Conditions component displays all condition interactions for a character.
 */
export const Conditions: React.FC<ConditionsProps> = ({ conditionStatuses, isMobile = false }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [expandedView, setExpandedView] = useState(false);
	const [selectedConditionId, setSelectedConditionId] = useState<string | null>(null);

	// Group conditions by type
	const grouped = useMemo(() => groupConditionsByType(conditionStatuses), [conditionStatuses]);

	// Filter conditions by search term
	const filteredConditions = useMemo(() => {
		if (!searchTerm.trim()) return grouped;

		const term = searchTerm.toLowerCase();
		const filterList = (list: CharacterConditionStatus[]) =>
			list.filter((cs) => {
				const condition = getConditionById(cs.conditionId);
				return condition?.name.toLowerCase().includes(term);
			});

		return {
			immunities: filterList(grouped.immunities),
			resistances: filterList(grouped.resistances),
			vulnerabilities: filterList(grouped.vulnerabilities),
			noInteractions: filterList(grouped.noInteractions)
		};
	}, [grouped, searchTerm]);

	// Check if there are any interactions
	const hasAnyInteractions =
		grouped.immunities.length > 0 ||
		grouped.resistances.length > 0 ||
		grouped.vulnerabilities.length > 0;

	// Render a group of conditions
	const renderConditionGroup = (
		title: string,
		icon: string,
		type: 'immunity' | 'resistance' | 'vulnerability',
		conditions: CharacterConditionStatus[]
	) => {
		if (conditions.length === 0) return null;

		return (
			<GroupContainer>
				<GroupTitle $type={type}>
					{icon} {title} ({conditions.length})
				</GroupTitle>
				<ConditionsList>
					{conditions.map((cs) => {
						const condition = getConditionById(cs.conditionId);
						const relevantInteractions = cs.interactions.filter((i) => i.type === type);

						return (
							<ConditionItem key={cs.conditionId}>
								<ConditionName onClick={() => setSelectedConditionId(cs.conditionId)}>
									{condition?.name || cs.conditionId}
								</ConditionName>
								<ConditionSources>
									{relevantInteractions.map((interaction, idx) => (
										<SourceItem key={idx}>
											{interaction.source}
											{interaction.details && (
												<>
													{' '}
													<SourceDetails>({interaction.details})</SourceDetails>
												</>
											)}
										</SourceItem>
									))}
								</ConditionSources>
							</ConditionItem>
						);
					})}
				</ConditionsList>
			</GroupContainer>
		);
	};

	// Render condition detail modal
	const renderModal = () => {
		if (!selectedConditionId) return null;

		const condition = getConditionById(selectedConditionId);
		if (!condition) return null;

		return (
			<ConditionModal onClick={() => setSelectedConditionId(null)}>
				<ModalContent onClick={(e) => e.stopPropagation()}>
					<ModalTitle>{condition.name}</ModalTitle>
					<ModalDescription>{condition.description}</ModalDescription>
					<ModalMeta>
						<ModalTag>Type: {condition.type}</ModalTag>
						{condition.tags.map((tag) => (
							<ModalTag key={tag}>{tag}</ModalTag>
						))}
					</ModalMeta>
					<CloseButton onClick={() => setSelectedConditionId(null)}>Close</CloseButton>
				</ModalContent>
			</ConditionModal>
		);
	};

	return (
		<ConditionsContainer $isMobile={isMobile}>
			<SectionHeader>
				<SectionTitle>🛡️ Condition Interactions</SectionTitle>
				<SearchInput
					type="text"
					placeholder="Search..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</SectionHeader>

			{!hasAnyInteractions && !expandedView ? (
				<EmptyMessage>No special condition interactions</EmptyMessage>
			) : (
				<>
					{renderConditionGroup('IMMUNITIES', '🚫', 'immunity', filteredConditions.immunities)}
					{renderConditionGroup('RESISTANCES', '✨', 'resistance', filteredConditions.resistances)}
					{renderConditionGroup(
						'VULNERABILITIES',
						'⚠️',
						'vulnerability',
						filteredConditions.vulnerabilities
					)}
				</>
			)}

			{expandedView && filteredConditions.noInteractions.length > 0 && (
				<GroupContainer>
					<GroupTitle $type="resistance" style={{ color: 'rgba(229, 231, 235, 0.6)' }}>
						📋 All Other Conditions ({filteredConditions.noInteractions.length})
					</GroupTitle>
					<ConditionsList>
						{filteredConditions.noInteractions.map((cs) => {
							const condition = getConditionById(cs.conditionId);
							return (
								<ConditionItem key={cs.conditionId}>
									<ConditionName onClick={() => setSelectedConditionId(cs.conditionId)}>
										{condition?.name || cs.conditionId}
									</ConditionName>
									<ConditionSources>
										<SourceItem>No special interaction</SourceItem>
									</ConditionSources>
								</ConditionItem>
							);
						})}
					</ConditionsList>
				</GroupContainer>
			)}

			<ExpandButton onClick={() => setExpandedView(!expandedView)}>
				{expandedView ? 'Hide All Conditions' : 'Show All Conditions'}
			</ExpandButton>

			{renderModal()}
		</ConditionsContainer>
	);
};

export default Conditions;
