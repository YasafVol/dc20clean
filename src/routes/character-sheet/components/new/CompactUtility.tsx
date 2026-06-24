/**
 * CompactUtility
 *
 * A purpose-built compact display for the hero strip's Utility sub-section.
 * Replaces the full <Movement /> + <Currency /> components (which were designed
 * for the standalone Utility tab and are too tall to nest under Combat Stats).
 *
 * Layout:
 *  - Top row: Move | Jump (two stats side-by-side, large numbers, mini cards)
 *  - Middle row: GP | SP | CP (inline editable currency pills with coloured dot)
 *  - Optional bottom row: chips for alt movements, senses, resistances,
 *    vulnerabilities, and combat training — only renders if data exists.
 *
 * Reads from the existing CharacterSheetProvider hooks so there is no new
 * data plumbing.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type { SavedCharacter } from '../../../../lib/types/dataContracts';
import { theme } from '../../styles/theme';
import {
	useCharacterSheet,
	useCharacterCalculatedData,
	useCharacterInventory
} from '../../hooks/CharacterSheetProvider';
import Tooltip from '../Tooltip';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};
`;

const MoveRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: ${theme.spacing[2]};

	& > * {
		flex: 1 1 0;
		min-width: 0;
	}
`;

const MoveStat = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
	padding: ${theme.spacing[2]} ${theme.spacing[2]};
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
`;

const MoveLabel = styled.div`
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.text.secondary};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	font-weight: ${theme.typography.fontWeight.medium};
`;

const MoveValue = styled.div`
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.accent.primary};
	line-height: 1;
`;

const CoinRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: ${theme.spacing[2]};

	& > * {
		flex: 1 1 0;
		min-width: 0;
	}
`;

const Coin = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[1]};
	padding: 4px ${theme.spacing[2]};
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
`;

const CoinDot = styled.span<{ $bg: string; $ring: string }>`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: ${(p) => p.$bg};
	border: 1px solid ${(p) => p.$ring};
	flex-shrink: 0;
`;

const CoinLabel = styled.span`
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.secondary};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

const CoinInput = styled.input`
	background: transparent;
	border: none;
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	width: 100%;
	min-width: 0;
	padding: 0;
	text-align: right;

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	&:focus {
		outline: none;
		color: ${theme.colors.accent.primary};
	}
`;

const Chips = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
`;

const Chip = styled.span<{ $tone?: 'default' | 'resist' | 'vuln' }>`
	display: inline-flex;
	align-items: center;
	gap: 4px;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	padding: 5px 10px;
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.tertiary};
	border: 1px solid
		${(p) =>
			p.$tone === 'resist'
				? '#3b82f6'
				: p.$tone === 'vuln'
					? '#ef4444'
					: theme.colors.border.default};
	color: ${(p) =>
		p.$tone === 'resist'
			? '#3b82f6'
			: p.$tone === 'vuln'
				? '#ef4444'
				: theme.colors.text.secondary};
	text-transform: capitalize;
	white-space: nowrap;
`;

// Many data values arrive snake_case (e.g. "Light_Armor", "Heavy_Weapons").
// Replace underscores with spaces so the chip reads naturally; capitalize is applied via CSS.
const formatLabel = (value: string): string => value.replace(/_/g, ' ');

const formatResistanceChip = (type: string, value: string): string => {
	const normalizedType = type.toLowerCase();
	if (value === 'true') {
		if (normalizedType === 'physical') return 'PDR';
		if (normalizedType === 'elemental') return 'EDR';
		if (normalizedType === 'mystical' || normalizedType === 'mental') return 'MDR';
	}
	return `${formatLabel(type)} ${value === 'half' ? '(½)' : `(${value})`}`;
};

interface CompactUtilityCalculationData {
	stats?: {
		finalMoveSpeed?: number;
		finalJumpDistance?: number;
	};
	movements?: any[];
	senses?: any[];
	resistances?: any[];
	vulnerabilities?: any[];
	combatTraining?: any[];
}

export function getCompactUtilityDisplayData(
	character: Pick<SavedCharacter, 'finalMoveSpeed' | 'finalJumpDistance'> | null | undefined,
	calculation: CompactUtilityCalculationData | null | undefined
) {
	return {
		speed: calculation?.stats?.finalMoveSpeed ?? character?.finalMoveSpeed ?? 0,
		jumpDistance: calculation?.stats?.finalJumpDistance ?? character?.finalJumpDistance ?? 0,
		movements: calculation?.movements || [],
		senses: calculation?.senses || [],
		resistances: calculation?.resistances || [],
		vulnerabilities: calculation?.vulnerabilities || [],
		combatTraining: calculation?.combatTraining || []
	};
}

export function getCompactUtilityCurrencyValues(currency: any) {
	return {
		gp: 'goldPieces' in currency ? currency.goldPieces : 'gold' in currency ? currency.gold : 0,
		sp:
			'silverPieces' in currency
				? currency.silverPieces
				: 'silver' in currency
					? currency.silver
					: 0,
		cp:
			'copperPieces' in currency
				? currency.copperPieces
				: 'copper' in currency
					? currency.copper
					: 0
	};
}

const CompactUtility: React.FC = () => {
	const { t } = useTranslation();
	const {
		state: { character },
		updateCurrency
	} = useCharacterSheet();
	const calculation = useCharacterCalculatedData();
	const inventory = useCharacterInventory();

	if (!calculation && !character) return null;

	const { speed, jumpDistance, movements, senses, resistances, vulnerabilities, combatTraining } =
		getCompactUtilityDisplayData(character, calculation);

	// Only show alt movements explicitly granted (skip the default "ground" if injected).
	const altMovements = movements.filter(
		(m: any) => m.type.toLowerCase() !== 'ground' && !m.isDefault
	);

	// Currency: support both canonical (goldPieces/silverPieces/copperPieces) and legacy (gold/silver/copper).
	const currency: any = inventory?.currency ?? {};
	const { gp, sp, cp } = getCompactUtilityCurrencyValues(currency);

	const handleCoinChange = (kind: 'gp' | 'sp' | 'cp', value: string) => {
		const n = parseInt(value, 10) || 0;
		if (kind === 'gp') updateCurrency(n, sp, cp);
		else if (kind === 'sp') updateCurrency(gp, n, cp);
		else updateCurrency(gp, sp, n);
	};

	const hasChips =
		altMovements.length > 0 ||
		senses.length > 0 ||
		resistances.length > 0 ||
		vulnerabilities.length > 0 ||
		combatTraining.length > 0;

	return (
		<Wrapper>
			<MoveRow>
				<MoveStat>
					<MoveLabel>{t('characterSheet.movementMoveSpeed') || 'Move'}</MoveLabel>
					<MoveValue>{speed}</MoveValue>
				</MoveStat>
				<MoveStat>
					<MoveLabel>{t('characterSheet.movementJumpDistance') || 'Jump'}</MoveLabel>
					<MoveValue>{jumpDistance}</MoveValue>
				</MoveStat>
			</MoveRow>

			<CoinRow>
				<Coin>
					<CoinDot $bg="#ffd700" $ring="#b8860b" />
					<CoinLabel>GP</CoinLabel>
					<CoinInput
						type="number"
						min={0}
						value={gp}
						onChange={(e) => handleCoinChange('gp', e.target.value)}
						data-testid="currency-gp"
					/>
				</Coin>
				<Coin>
					<CoinDot $bg="#c0c0c0" $ring="#a0a0a0" />
					<CoinLabel>SP</CoinLabel>
					<CoinInput
						type="number"
						min={0}
						value={sp}
						onChange={(e) => handleCoinChange('sp', e.target.value)}
						data-testid="currency-sp"
					/>
				</Coin>
				<Coin>
					<CoinDot $bg="#b87333" $ring={theme.colors.accent.primary} />
					<CoinLabel>CP</CoinLabel>
					<CoinInput
						type="number"
						min={0}
						value={cp}
						onChange={(e) => handleCoinChange('cp', e.target.value)}
						data-testid="currency-cp"
					/>
				</Coin>
			</CoinRow>

			{hasChips && (
				<Chips>
					{altMovements.map((m: any) => (
						<Tooltip
							key={`mv-${m.type}`}
							content={`Source: ${m.source?.name ?? ''}`}
							position="top"
						>
							<Chip>
								{formatLabel(m.type)} {m.speed}
							</Chip>
						</Tooltip>
					))}
					{senses.map((s: any) => (
						<Tooltip key={`s-${s.type}`} content={`Source: ${s.source?.name ?? ''}`} position="top">
							<Chip>
								{formatLabel(s.type)} {s.range}
							</Chip>
						</Tooltip>
					))}
					{resistances.map((r: any) => (
						<Tooltip key={`r-${r.type}`} content={`Source: ${r.source?.name ?? ''}`} position="top">
							<Chip $tone="resist">{formatResistanceChip(r.type, r.value)}</Chip>
						</Tooltip>
					))}
					{vulnerabilities.map((v: any) => (
						<Tooltip key={`v-${v.type}`} content={`Source: ${v.source?.name ?? ''}`} position="top">
							<Chip $tone="vuln">
								{formatLabel(v.type)} {v.value === 'half' ? '(½)' : `(${v.value})`}
							</Chip>
						</Tooltip>
					))}
					{combatTraining.map((ct: any) => (
						<Tooltip
							key={`ct-${ct.type}`}
							content={`Source: ${ct.source?.name ?? ''}`}
							position="top"
						>
							<Chip>{formatLabel(ct.type)}</Chip>
						</Tooltip>
					))}
				</Chips>
			)}
		</Wrapper>
	);
};

export default CompactUtility;
