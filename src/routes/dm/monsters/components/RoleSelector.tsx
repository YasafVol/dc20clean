/**
 * Role Selector Component
 *
 * Grid of selectable monster roles with modifier previews.
 */

import React from 'react';
import { MONSTER_ROLES_LIST } from '../../../../lib/rulesdata/dm/monsterRoles';
import type { MonsterRoleId } from '../../../../lib/rulesdata/schemas/monster.schema';
import {
	RoleGrid,
	RoleCard,
	RoleName,
	RoleModifiers,
} from '../styles/MonsterStyles';

export interface RoleSelectorProps {
	value: MonsterRoleId;
	onChange: (roleId: MonsterRoleId) => void;
}

function formatModifier(value: number, suffix: string): string {
	if (value === 0) return '';
	const sign = value > 0 ? '+' : '';
	return `${sign}${Math.round(value * 100)}% ${suffix}`;
}

function formatOffset(value: number, label: string): string {
	if (value === 0) return '';
	const sign = value > 0 ? '+' : '';
	return `${sign}${value} ${label}`;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange }) => {
	return (
		<RoleGrid>
			{MONSTER_ROLES_LIST.map((role) => {
				const isSelected = value === role.id;
				const modifiers: string[] = [];

				// HP modifier
				if (role.hpModifier !== 0) {
					modifiers.push(formatModifier(role.hpModifier, 'HP'));
				}

				// Defense offsets
				const pdMod = formatOffset(role.pdOffset, 'PD');
				const adMod = formatOffset(role.adOffset, 'AD');
				if (pdMod || adMod) {
					modifiers.push([pdMod, adMod].filter(Boolean).join(', '));
				}

				return (
					<RoleCard
						key={role.id}
						$selected={isSelected}
						onClick={() => onChange(role.id)}
						type="button"
						title={role.description}
					>
						<RoleName $selected={isSelected}>{role.name}</RoleName>
						<RoleModifiers>
							{modifiers.length > 0 ? modifiers.join(' | ') : 'Balanced'}
						</RoleModifiers>
					</RoleCard>
				);
			})}
		</RoleGrid>
	);
};

export default RoleSelector;
