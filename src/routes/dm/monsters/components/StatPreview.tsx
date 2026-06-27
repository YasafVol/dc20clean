/**
 * Stat Preview Component
 *
 * Shows calculated monster stats in the designer sidebar.
 */

import React from 'react';
import { MONSTER_ROLES } from '../../../../lib/rulesdata/dm/monsterRoles';
import { getLevelDisplayName } from '../../../../lib/rulesdata/dm/monsterStatistics';
import { TIER_COST_MULTIPLIERS } from '../../../../lib/rulesdata/schemas/monster.schema';
import type { SavedMonster } from '../../../../lib/rulesdata/schemas/monster.schema';
import type { EditableMonsterStatKey } from '../../../../lib/services/monsterCalculator';
import {
	PreviewCard,
	PreviewHeader,
	PreviewName,
	PreviewSubtitle,
	PreviewResetRow,
	PreviewResetButton,
	PreviewBody,
	PreviewStatGrid,
	PreviewStatItem,
	PreviewStatAdjustButton,
	PreviewStatLabel,
	PreviewStatValue,
	PreviewDivider,
	EncounterCost,
	EncounterCostLabel,
	EncounterCostValue
} from '../styles/MonsterStyles';

export interface StatPreviewProps {
	monster: SavedMonster;
	onAdjustStat?: (statKey: EditableMonsterStatKey, delta: number) => void;
	onResetStats?: () => void;
}

interface StatDisplay {
	key: EditableMonsterStatKey;
	label: string;
	value: number;
	step: number;
	highlight?: boolean;
	format?: (value: number) => string;
}

export const StatPreview: React.FC<StatPreviewProps> = ({
	monster,
	onAdjustStat,
	onResetStats
}) => {
	const role = MONSTER_ROLES[monster.roleId];
	const levelDisplay = getLevelDisplayName(monster.level);
	const tierMultiplier = TIER_COST_MULTIPLIERS[monster.tier];
	const encounterCost = Math.max(0, monster.level * tierMultiplier);
	const combatStats: StatDisplay[] = [
		{ key: 'finalHP', label: 'HP', value: monster.finalHP, step: 1, highlight: true },
		{ key: 'finalPD', label: 'PD', value: monster.finalPD, step: 1 },
		{ key: 'finalAD', label: 'AD', value: monster.finalAD, step: 1 },
		{
			key: 'finalAttack',
			label: 'Attack',
			value: monster.finalAttack,
			step: 1,
			format: (value) => `+${value}`
		},
		{ key: 'finalSaveDC', label: 'Save DC', value: monster.finalSaveDC, step: 1 },
		{ key: 'finalBaseDamage', label: 'Damage', value: monster.finalBaseDamage, step: 0.5 }
	];

	const renderEditableStat = (stat: StatDisplay) => (
		<PreviewStatItem key={stat.key} $highlight={stat.highlight}>
			<PreviewStatAdjustButton
				type="button"
				$side="left"
				aria-label={`Decrease ${stat.label}`}
				onClick={() => onAdjustStat?.(stat.key, -stat.step)}
			>
				-
			</PreviewStatAdjustButton>
			<PreviewStatLabel>{stat.label}</PreviewStatLabel>
			<PreviewStatValue $highlight={stat.highlight}>
				{stat.format ? stat.format(stat.value) : stat.value}
			</PreviewStatValue>
			<PreviewStatAdjustButton
				type="button"
				$side="right"
				aria-label={`Increase ${stat.label}`}
				onClick={() => onAdjustStat?.(stat.key, stat.step)}
			>
				+
			</PreviewStatAdjustButton>
		</PreviewStatItem>
	);

	return (
		<PreviewCard>
			<PreviewHeader>
				<PreviewName>{monster.name || 'Unnamed Monster'}</PreviewName>
				<PreviewSubtitle>
					{levelDisplay} {role?.name} ({monster.tier})
				</PreviewSubtitle>
				<PreviewResetRow>
					<PreviewResetButton type="button" onClick={onResetStats}>
						Reset stats
					</PreviewResetButton>
				</PreviewResetRow>
			</PreviewHeader>

			<PreviewBody>
				{/* Combat Stats */}
				<PreviewStatGrid>{combatStats.map(renderEditableStat)}</PreviewStatGrid>

				<PreviewDivider />

				{/* Feature Budget */}
				<PreviewStatGrid>
					<PreviewStatItem>
						<PreviewStatLabel>Features</PreviewStatLabel>
						<PreviewStatValue>
							{monster.featurePointsSpent}/{monster.featurePointsMax}
						</PreviewStatValue>
					</PreviewStatItem>
					<PreviewStatItem>
						<PreviewStatLabel>Actions</PreviewStatLabel>
						<PreviewStatValue>{monster.actions.length}</PreviewStatValue>
					</PreviewStatItem>
				</PreviewStatGrid>

				<PreviewDivider />

				{/* Encounter Cost */}
				<EncounterCost>
					<EncounterCostLabel>Encounter Cost</EncounterCostLabel>
					<EncounterCostValue>{encounterCost}</EncounterCostValue>
				</EncounterCost>
			</PreviewBody>
		</PreviewCard>
	);
};

export default StatPreview;
