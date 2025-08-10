import React from 'react';
import type { CharacterSheetData, CurrentValues } from '../../../types';
import type { EnhancedStatBreakdown } from '../../../lib/types/effectSystem';
import { StyledCombatSection, StyledActionPoints, StyledActionPoint } from '../styles/Combat';
import Tooltip from './Tooltip';
import { createEnhancedDefenseTooltip } from './EnhancedStatTooltips';

export interface CombatProps {
	characterData: CharacterSheetData;
	currentValues: CurrentValues;
	setCurrentValues: React.Dispatch<React.SetStateAction<CurrentValues>>;
	breakdowns?: Record<string, EnhancedStatBreakdown>;
}

const Combat: React.FC<CombatProps> = ({ characterData, currentValues, setCurrentValues }) => {
	const renderActionPoints = () => {
		return [0, 1, 2, 3].map((index) => (
			<StyledActionPoint
				key={index}
				used={index < currentValues.actionPointsUsed}
				onClick={() => {
					const newUsed = index < currentValues.actionPointsUsed ? index : index + 1;
					setCurrentValues((prev) => ({ ...prev, actionPointsUsed: newUsed }));
				}}
			>
				{index + 1}
			</StyledActionPoint>
		));
	};

	return (
		<StyledCombatSection>
			<div
				style={{
					fontSize: '1.1rem',
					fontWeight: 'bold',
					color: '#8b4513',
					textAlign: 'center',
					marginBottom: '1rem'
				}}
			>
				COMBAT
			</div>

			{/* Action Points */}
			<div style={{ textAlign: 'center', marginBottom: '1rem' }}>
				<div
					style={{
						fontSize: '0.9rem',
						fontWeight: 'bold',
						color: '#8b4513',
						marginBottom: '0.5rem'
					}}
				>
					ACTION POINTS
				</div>
				<StyledActionPoints>{renderActionPoints()}</StyledActionPoints>
			</div>

			{/* Combat Stats */}
			<div style={{ fontSize: '0.9rem', color: '#8b4513' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '0.3rem',
						borderBottom: '1px solid #e5e5e5'
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
						<span>ATTACK / SPELL CHECK</span>
						<Tooltip
							tooltipContent={createEnhancedDefenseTooltip(
								breakdowns?.attack_spell_check || { base: 0, effects: [] },
								'Attack / Spell Check'
							)}
							isEnabled={!!breakdowns?.attack_spell_check}
						>
							<span
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '14px',
									height: '14px',
									borderRadius: '50%',
									backgroundColor: '#8b4513',
									color: 'white',
									fontSize: '10px',
									fontWeight: 'bold',
									cursor: 'help',
									verticalAlign: 'middle'
								}}
							>
								i
							</span>
						</Tooltip>
					</div>
					<span style={{ fontWeight: 'bold' }}>
						+{characterData.finalCombatMastery + characterData.finalPrimeModifierValue}
					</span>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '0.3rem',
						borderBottom: '1px solid #e5e5e5'
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
						<span>SAVE DC</span>
						<Tooltip
							tooltipContent={createEnhancedDefenseTooltip(
								breakdowns?.save_dc || { base: 0, effects: [] },
								'Save DC'
							)}
							isEnabled={!!breakdowns?.save_dc}
						>
							<span
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '14px',
									height: '14px',
									borderRadius: '50%',
									backgroundColor: '#8b4513',
									color: 'white',
									fontSize: '10px',
									fontWeight: 'bold',
									cursor: 'help',
									verticalAlign: 'middle'
								}}
							>
								i
							</span>
						</Tooltip>
					</div>
					<span style={{ fontWeight: 'bold' }}>{characterData.finalSaveDC}</span>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '0.3rem'
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
						<span>MARTIAL CHECK</span>
						<Tooltip
							tooltipContent={createEnhancedDefenseTooltip(
								breakdowns?.martial_check || { base: 0, effects: [] },
								'Martial Check'
							)}
							isEnabled={!!breakdowns?.martial_check}
						>
							<span
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '14px',
									height: '14px',
									borderRadius: '50%',
									backgroundColor: '#8b4513',
									color: 'white',
									fontSize: '10px',
									fontWeight: 'bold',
									cursor: 'help',
									verticalAlign: 'middle'
								}}
							>
								i
							</span>
						</Tooltip>
					</div>
					<span style={{ fontWeight: 'bold' }}>
						+
						{characterData.finalCombatMastery +
							characterData.finalPrimeModifierValue +
							Math.floor(currentValues.actionPointsUsed / 3)}
					</span>
				</div>
			</div>
		</StyledCombatSection>
	);
};

export default Combat;
