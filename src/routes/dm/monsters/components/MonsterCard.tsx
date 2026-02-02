/**
 * Monster Card Component
 *
 * Displays a monster summary in a card format for the monster list.
 */

import React from 'react';
import { Button } from '../../../../components/ui/button';
import { MONSTER_ROLES } from '../../../../lib/rulesdata/dm/monsterRoles';
import { getLevelDisplayName } from '../../../../lib/rulesdata/dm/monsterStatistics';
import type { SavedMonster } from '../../../../lib/rulesdata/schemas/monster.schema';
import {
	MonsterCardContainer,
	CardHeader,
	CardTitleRow,
	CardName,
	CardBadges,
	TierBadge,
	LevelBadge,
	CardSubtitle,
	CardBody,
	StatGrid,
	StatItem,
	StatLabel,
	StatValue,
	CardFooter
} from '../styles/MonsterStyles';

export interface MonsterCardProps {
	monster: SavedMonster;
	onEdit?: (monster: SavedMonster) => void;
	onDuplicate?: (monster: SavedMonster) => void;
	onDelete?: (monster: SavedMonster) => void;
	onFork?: (monster: SavedMonster) => void;
	isOwner?: boolean;
}

export const MonsterCard: React.FC<MonsterCardProps> = ({
	monster,
	onEdit,
	onDuplicate,
	onDelete,
	onFork,
	isOwner = true
}) => {
	const role = MONSTER_ROLES[monster.roleId];
	const levelDisplay = getLevelDisplayName(monster.level);

	return (
		<MonsterCardContainer $tier={monster.tier}>
			<CardHeader>
				<CardTitleRow>
					<CardName>{monster.name}</CardName>
					<CardBadges>
						<TierBadge $tier={monster.tier}>{monster.tier}</TierBadge>
						<LevelBadge>{levelDisplay}</LevelBadge>
					</CardBadges>
				</CardTitleRow>
				<CardSubtitle>{role?.name ?? monster.roleId}</CardSubtitle>
			</CardHeader>

			<CardBody>
				<StatGrid>
					<StatItem>
						<StatLabel>HP</StatLabel>
						<StatValue>{monster.finalHP}</StatValue>
					</StatItem>
					<StatItem>
						<StatLabel>PD</StatLabel>
						<StatValue>{monster.finalPD}</StatValue>
					</StatItem>
					<StatItem>
						<StatLabel>AD</StatLabel>
						<StatValue>{monster.finalAD}</StatValue>
					</StatItem>
					<StatItem>
						<StatLabel>Attack</StatLabel>
						<StatValue>+{monster.finalAttack}</StatValue>
					</StatItem>
					<StatItem>
						<StatLabel>Save DC</StatLabel>
						<StatValue>{monster.finalSaveDC}</StatValue>
					</StatItem>
					<StatItem>
						<StatLabel>Damage</StatLabel>
						<StatValue>{monster.finalBaseDamage}</StatValue>
					</StatItem>
				</StatGrid>
			</CardBody>

			<CardFooter>
				{isOwner ? (
					<>
						{onEdit && (
							<Button variant="secondary" size="sm" onClick={() => onEdit(monster)}>
								Edit
							</Button>
						)}
						{onDuplicate && (
							<Button variant="secondary" size="sm" onClick={() => onDuplicate(monster)}>
								Duplicate
							</Button>
						)}
						{onDelete && (
							<Button
								variant="secondary"
								size="sm"
								onClick={() => onDelete(monster)}
								className="text-red-400 hover:text-red-300"
							>
								Delete
							</Button>
						)}
					</>
				) : (
					<>
						{onFork && (
							<Button variant="secondary" size="sm" onClick={() => onFork(monster)}>
								Fork
							</Button>
						)}
					</>
				)}
			</CardFooter>
		</MonsterCardContainer>
	);
};

export default MonsterCard;
