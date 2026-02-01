/**
 * Encounter Card Component
 *
 * Display encounter summary in list view.
 */

import React from 'react';
import { Button } from '../../../../components/ui/button';
import type { SavedEncounter } from '../../../../lib/rulesdata/schemas/encounter.schema';
import {
	EncounterCardContainer,
	CardHeader,
	CardName,
	CardMeta,
	MetaBadge,
	CardBody,
	CardFooter,
} from '../styles/EncounterStyles';
import { BudgetMeter } from './BudgetMeter';
import type { BudgetStatus } from '../../../../lib/rulesdata/schemas/encounter.schema';

export interface EncounterCardProps {
	encounter: SavedEncounter;
	onEdit?: (encounter: SavedEncounter) => void;
	onDuplicate?: (encounter: SavedEncounter) => void;
	onDelete?: (encounter: SavedEncounter) => void;
	isOwner?: boolean;
}

const DIFFICULTY_COLORS: Record<string, string> = {
	trivial: 'green',
	easy: 'green',
	medium: 'purple',
	hard: 'yellow',
	deadly: 'red',
};

export const EncounterCard: React.FC<EncounterCardProps> = ({
	encounter,
	onEdit,
	onDuplicate,
	onDelete,
	isOwner = true,
}) => {
	const monsterCount = encounter.monsters.filter((m) => m.monsterId).length;
	const totalMonsters = encounter.monsters.reduce((sum, m) => sum + (m.monsterId ? m.quantity : 0), 0);

	const percentage = encounter.adjustedBudget > 0
		? (encounter.spentBudget / encounter.adjustedBudget) * 100
		: 0;

	let status: BudgetStatus = 'on_target';
	if (percentage < 80) status = 'under';
	else if (percentage <= 100) status = 'on_target';
	else if (percentage <= 120) status = 'slightly_over';
	else status = 'over';

	return (
		<EncounterCardContainer $difficulty={encounter.difficulty}>
			<CardHeader>
				<CardName>{encounter.name}</CardName>
				<CardMeta>
					<MetaBadge $color={DIFFICULTY_COLORS[encounter.difficulty]}>
						{encounter.difficulty.charAt(0).toUpperCase() + encounter.difficulty.slice(1)}
					</MetaBadge>
					<MetaBadge>
						{encounter.party.size}P × L{encounter.party.averageLevel}
					</MetaBadge>
					<MetaBadge>
						{totalMonsters} Monster{totalMonsters !== 1 ? 's' : ''} ({monsterCount} type{monsterCount !== 1 ? 's' : ''})
					</MetaBadge>
				</CardMeta>
			</CardHeader>

			<CardBody>
				<BudgetMeter
					spent={encounter.spentBudget}
					budget={encounter.adjustedBudget}
					status={status}
					percentage={percentage}
				/>
			</CardBody>

			<CardFooter>
				{isOwner && (
					<>
						{onEdit && (
							<Button variant="secondary" size="sm" onClick={() => onEdit(encounter)}>
								Edit
							</Button>
						)}
						{onDuplicate && (
							<Button variant="secondary" size="sm" onClick={() => onDuplicate(encounter)}>
								Duplicate
							</Button>
						)}
						{onDelete && (
							<Button
								variant="secondary"
								size="sm"
								onClick={() => onDelete(encounter)}
								className="text-red-400 hover:text-red-300"
							>
								Delete
							</Button>
						)}
					</>
				)}
			</CardFooter>
		</EncounterCardContainer>
	);
};

export default EncounterCard;
