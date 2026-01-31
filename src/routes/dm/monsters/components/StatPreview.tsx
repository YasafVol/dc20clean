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
import {
	PreviewCard,
	PreviewHeader,
	PreviewName,
	PreviewSubtitle,
	PreviewBody,
	PreviewStatGrid,
	PreviewStatItem,
	PreviewStatLabel,
	PreviewStatValue,
	PreviewDivider,
	EncounterCost,
	EncounterCostLabel,
	EncounterCostValue,
} from '../styles/MonsterStyles';

export interface StatPreviewProps {
	monster: SavedMonster;
}

export const StatPreview: React.FC<StatPreviewProps> = ({ monster }) => {
	const role = MONSTER_ROLES[monster.roleId];
	const levelDisplay = getLevelDisplayName(monster.level);
	const tierMultiplier = TIER_COST_MULTIPLIERS[monster.tier];
	const encounterCost = Math.max(0, monster.level * tierMultiplier);

	return (
		<PreviewCard>
			<PreviewHeader>
				<PreviewName>{monster.name || 'Unnamed Monster'}</PreviewName>
				<PreviewSubtitle>
					{levelDisplay} {role?.name} ({monster.tier})
				</PreviewSubtitle>
			</PreviewHeader>

			<PreviewBody>
				{/* Combat Stats */}
				<PreviewStatGrid>
					<PreviewStatItem $highlight>
						<PreviewStatLabel>HP</PreviewStatLabel>
						<PreviewStatValue $highlight>{monster.finalHP}</PreviewStatValue>
					</PreviewStatItem>
					<PreviewStatItem>
						<PreviewStatLabel>PD</PreviewStatLabel>
						<PreviewStatValue>{monster.finalPD}</PreviewStatValue>
					</PreviewStatItem>
					<PreviewStatItem>
						<PreviewStatLabel>AD</PreviewStatLabel>
						<PreviewStatValue>{monster.finalAD}</PreviewStatValue>
					</PreviewStatItem>
					<PreviewStatItem>
						<PreviewStatLabel>Attack</PreviewStatLabel>
						<PreviewStatValue>+{monster.finalAttack}</PreviewStatValue>
					</PreviewStatItem>
					<PreviewStatItem>
						<PreviewStatLabel>Save DC</PreviewStatLabel>
						<PreviewStatValue>{monster.finalSaveDC}</PreviewStatValue>
					</PreviewStatItem>
					<PreviewStatItem>
						<PreviewStatLabel>Damage</PreviewStatLabel>
						<PreviewStatValue>{monster.finalBaseDamage}</PreviewStatValue>
					</PreviewStatItem>
				</PreviewStatGrid>

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
