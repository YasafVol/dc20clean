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
import { theme } from '../styles/theme';

interface ConditionsProps {
	conditionStatuses: CharacterConditionStatus[];
	isMobile?: boolean;
}

// Styled components for the Conditions section
const ConditionsContainer = styled.section<{ $isMobile?: boolean }>`
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${(props) => (props.$isMobile ? theme.spacing[3] : theme.spacing[4])};
	margin: ${(props) => (props.$isMobile ? `${theme.spacing[2]} 0` : '0')};
`;

const SectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${theme.spacing[3]};
	border-bottom: 1px solid ${theme.colors.border.default};
	padding-bottom: ${theme.spacing[2]};
`;

const SectionTitle = styled.h3`
	font-family: 'Cinzel', 'Georgia', serif;
	color: ${theme.colors.text.primary};
	margin: 0;
	font-size: ${theme.typography.fontSize.xl};
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

const SearchInput = styled.input`
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	width: 150px;
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

const GroupContainer = styled.div`
	margin-bottom: ${theme.spacing[4]};
	padding: ${theme.spacing[3]};
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};

	&:last-child {
		margin-bottom: 0;
	}
`;

const GroupTitle = styled.h4<{ $type: 'immunity' | 'resistance' | 'vulnerability' }>`
	font-family: 'Urbanist', sans-serif;
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.semibold};
	margin: 0 0 ${theme.spacing[2]} 0;
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
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
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	margin-bottom: ${theme.spacing[2]};
	transition: all ${theme.transitions.fast};

	&:last-child {
		margin-bottom: 0;
	}

	&:hover {
		background: ${theme.colors.bg.tertiary};
		border-color: ${theme.colors.accent.primary};
		transform: translateY(-1px);
	}
`;

const ConditionName = styled.button`
	background: none;
	border: none;
	color: ${theme.colors.text.primary};
	font-weight: ${theme.typography.fontWeight.semibold};
	font-size: ${theme.typography.fontSize.sm};
	padding: 0;
	cursor: pointer;
	text-align: left;
	transition: all ${theme.transitions.fast};

	&:hover {
		color: ${theme.colors.accent.primary};
		text-decoration: underline;
	}
`;

const ConditionSources = styled.ul`
	list-style: none;
	padding: 0;
	margin: ${theme.spacing[1]} 0 0 0;
`;

const SourceItem = styled.li`
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.text.secondary};
	padding-left: ${theme.spacing[4]};
	position: relative;

	&::before {
		content: '└─';
		position: absolute;
		left: 0;
		color: ${theme.colors.accent.primary};
		opacity: 0.5;
	}
`;

const SourceDetails = styled.span`
	color: ${theme.colors.accent.primary};
	font-style: italic;
`;

const EmptyMessage = styled.p`
	color: ${theme.colors.text.muted};
	font-style: italic;
	font-size: ${theme.typography.fontSize.sm};
	text-align: center;
	margin: ${theme.spacing[4]} 0;
`;

const ExpandButton = styled.button`
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.accent.primary};
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	cursor: pointer;
	margin-top: ${theme.spacing[3]};
	transition: all ${theme.transitions.fast};
	display: block;
	width: 100%;

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		transform: translateY(-1px);
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
	background: ${theme.colors.bg.secondary};
	border: 2px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[6]};
	max-width: 500px;
	width: 90%;
	max-height: 80vh;
	overflow-y: auto;
`;

const ModalTitle = styled.h3`
	font-family: 'Cinzel', 'Georgia', serif;
	color: ${theme.colors.accent.primary};
	margin: 0 0 ${theme.spacing[4]} 0;
`;

const ModalDescription = styled.p`
	color: ${theme.colors.text.primary};
	line-height: ${theme.typography.lineHeight.relaxed};
	margin: 0 0 ${theme.spacing[4]} 0;
`;

const ModalMeta = styled.div`
	display: flex;
	gap: ${theme.spacing[3]};
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.secondary};
`;

const ModalTag = styled.span`
	background: ${theme.colors.bg.tertiary};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.sm};
`;

const CloseButton = styled.button`
	background: ${theme.colors.accent.primary};
	border: none;
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.text.inverse};
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	font-weight: ${theme.typography.fontWeight.semibold};
	cursor: pointer;
	margin-top: ${theme.spacing[4]};
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.accent.secondary};
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

	// Check if there are any interactions (use FILTERED data)
	const hasAnyInteractions =
		filteredConditions.immunities.length > 0 ||
		filteredConditions.resistances.length > 0 ||
		filteredConditions.vulnerabilities.length > 0;

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

	return <ConditionsContainer $isMobile={isMobile}></ConditionsContainer>;
};

export default Conditions;
