/**
 * Condition Badge Component
 *
 * Displays a visual indicator showing that an attribute/stat is affected by a condition.
 * Examples: "DisADV" for disadvantage, "ADV" for advantage, "-X Speed" for movement penalties
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

export type ConditionBadgeType = 'disadvantage' | 'advantage' | 'speed-penalty' | 'immobilized';

interface ConditionBadgeProps {
	type: ConditionBadgeType;
	value?: number; // For stacking conditions like "DisADV 2" or "Speed -10"
	tooltip?: string;
}

const Badge = styled.span<{ $type: ConditionBadgeType }>`
	display: inline-flex;
	align-items: center;
	gap: ${theme.spacing[1]};
	padding: 2px ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	white-space: nowrap;

	background: ${(props) => {
		switch (props.$type) {
			case 'disadvantage':
				return '#ef4444'; // Red for negative effects
			case 'advantage':
				return '#22c55e'; // Green for positive effects
			case 'speed-penalty':
				return '#f59e0b'; // Orange for movement penalties
			case 'immobilized':
				return '#dc2626'; // Dark red for immobilized
			default:
				return theme.colors.text.muted;
		}
	}};

	color: white;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	transition: all ${theme.transitions.fast};

	&:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
	}
`;

const Icon = styled.span`
	font-size: ${theme.typography.fontSize.xs};
`;

export const ConditionBadge: React.FC<ConditionBadgeProps> = ({ type, value, tooltip }) => {
	const renderContent = () => {
		switch (type) {
			case 'disadvantage':
				return (
					<>
						<Icon>⚠️</Icon>
						DisADV{value && value > 1 ? ` ${value}` : ''}
					</>
				);
			case 'advantage':
				return (
					<>
						<Icon>✨</Icon>
						ADV{value && value > 1 ? ` ${value}` : ''}
					</>
				);
			case 'speed-penalty':
				return (
					<>
						<Icon>🐢</Icon>
						{value ? `-${value} Speed` : 'Slowed'}
					</>
				);
			case 'immobilized':
				return (
					<>
						<Icon>🚫</Icon>
						Immobilized
					</>
				);
			default:
				return null;
		}
	};

	return (
		<Badge $type={type} title={tooltip}>
			{renderContent()}
		</Badge>
	);
};

export default ConditionBadge;
