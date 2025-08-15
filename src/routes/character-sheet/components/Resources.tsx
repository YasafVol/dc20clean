import React from 'react';
import Tooltip from './Tooltip';
import { createHPTooltip, createMPTooltip, createSPTooltip } from './StatTooltips';
import { createEnhancedTooltip } from './EnhancedStatTooltips';
import { useCharacterResources, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import type { EnhancedStatBreakdown } from '../../../lib/types/effectSystem';
import {
	ResourcesContainer,
	ResourceColumn,
	ResourceLabel,
	ResourceControls,
	TempHPControls,
	TempHPLabel,
	TempHPInputSmall
} from '../styles/Resources';
import { StyledResourceButton } from '../styles/Resources';
import {
	StyledPotionContainer,
	StyledPotionFill,
	StyledPotionBubbles,
	StyledPotionValue,
	StyledLargePotionContainer,
	StyledLargePotionValue
} from '../styles/Potions';

interface ResourcesProps {
	breakdowns?: Record<string, EnhancedStatBreakdown>;
	isMobile?: boolean;
}

const Resources: React.FC<ResourcesProps> = ({
	breakdowns,
	isMobile = false
}) => {
	const { updateHP, updateSP, updateMP, updateTempHP } = useCharacterSheet();
	const resources = useCharacterResources();

	if (!resources) {
		return (
			<div style={{ padding: '1rem', color: '#666', textAlign: 'center' }}>
				<p>Loading character resources...</p>
			</div>
		);
	}

	const { current, original } = resources;

	// Helper functions
	const getFillPercentage = (current: number, max: number) => {
		return max > 0 ? Math.min((current / max) * 100, 100) : 0;
	};

	const getHPFillPercentage = (current: number, max: number, tempHP: number) => {
		// Total effective HP = current + temp HP
		// Total possible HP = max + temp HP  
		const totalCurrent = current + tempHP;
		const totalPossible = max + tempHP;
		return totalPossible > 0 ? Math.min((totalCurrent / totalPossible) * 100, 100) : 0;
	};

	const onAdjustResource = (resource: 'currentSP' | 'currentMP' | 'currentHP' | 'tempHP', amount: number) => {
		switch (resource) {
			case 'currentHP':
				// HP can go up to maxHP + tempHP total
				const maxTotalHP = original.maxHP + current.tempHP;
				const newHP = current.currentHP + amount;
				updateHP(Math.max(0, Math.min(maxTotalHP, newHP)));
				break;
			case 'currentSP':
				updateSP(Math.max(0, Math.min(original.maxSP, current.currentSP + amount)));
				break;
			case 'currentMP':
				updateMP(Math.max(0, Math.min(original.maxMP, current.currentMP + amount)));
				break;
			case 'tempHP':
				const newTempHP = Math.max(0, current.tempHP + amount);
				updateTempHP(newTempHP);
				
				// CRITICAL: If temp HP decreased, current HP might exceed new maximum
				const newMaxTotalHP = original.maxHP + newTempHP;
				if (current.currentHP > newMaxTotalHP) {
					updateHP(newMaxTotalHP);
				}
				break;
		}
	};

	const onResourceInputChange = (resource: 'tempHP', value: string) => {
		const numValue = parseInt(value) || 0;
		if (resource === 'tempHP') {
			const newTempHP = Math.max(0, numValue);
			updateTempHP(newTempHP);
			
			// CRITICAL: If temp HP decreased, current HP might exceed new maximum
			const newMaxTotalHP = original.maxHP + newTempHP;
			if (current.currentHP > newMaxTotalHP) {
				updateHP(newMaxTotalHP);
			}
		}
	};
	return (
		<ResourcesContainer $isMobile={isMobile}>
			{/* Stamina Points */}
			<ResourceColumn $isMobile={isMobile}>
				<ResourceLabel>STAMINA POINTS</ResourceLabel>
				<ResourceControls>
					<StyledResourceButton onClick={() => onAdjustResource('currentSP', -1)}>
						-
					</StyledResourceButton>
					<StyledPotionContainer style={{ borderColor: '#22c55e' }}>
						<StyledPotionFill
							$fillPercentage={getFillPercentage(current.currentSP, original.maxSP)}
							$color="#22c55e"
						/>
						<StyledPotionBubbles
							$color="#22c55e"
							$fillPercentage={getFillPercentage(current.currentSP, original.maxSP)}
						/>
						<StyledPotionValue>{current.currentSP}</StyledPotionValue>
					</StyledPotionContainer>
					<StyledResourceButton onClick={() => onAdjustResource('currentSP', 1)}>
						+
					</StyledResourceButton>
				</ResourceControls>
				<div
					style={{
						fontSize: '1.1rem',
						fontWeight: '300',
						color: '#666',
						marginTop: '0.3rem',
						fontStyle: 'italic'
					}}
				>
									<Tooltip 
					content={
						breakdowns?.spMax 
							? createEnhancedTooltip('Stamina Points', breakdowns.spMax)
							: createSPTooltip({ finalSPMax: original.maxSP })
					} 
					position="top"
				>
					<span style={{ cursor: 'help' }}>{original.maxSP}</span>
				</Tooltip>
				</div>
			</ResourceColumn>

			{/* Mana Points */}
			<ResourceColumn $isMobile={isMobile}>
				<ResourceLabel>MANA POINTS</ResourceLabel>
				<ResourceControls>
					<StyledResourceButton onClick={() => onAdjustResource('currentMP', -1)}>
						-
					</StyledResourceButton>
					<StyledPotionContainer style={{ borderColor: '#3b82f6' }}>
						<StyledPotionFill
							$fillPercentage={getFillPercentage(current.currentMP, original.maxMP)}
							$color="#3b82f6"
						/>
						<StyledPotionBubbles
							$color="#3b82f6"
							$fillPercentage={getFillPercentage(current.currentMP, original.maxMP)}
						/>
						<StyledPotionValue>{current.currentMP}</StyledPotionValue>
					</StyledPotionContainer>
					<StyledResourceButton onClick={() => onAdjustResource('currentMP', 1)}>
						+
					</StyledResourceButton>
				</ResourceControls>
				<div
					style={{
						fontSize: '1.1rem',
						fontWeight: '300',
						color: '#666',
						marginTop: '0.3rem',
						fontStyle: 'italic'
					}}
				>
					<Tooltip 
						content={
							breakdowns?.mpMax 
								? createEnhancedTooltip('Mana Points', breakdowns.mpMax)
								: createMPTooltip({ finalMPMax: original.maxMP })
						} 
						position="top"
					>
						<span style={{ cursor: 'help' }}>{original.maxMP}</span>
					</Tooltip>
				</div>
			</ResourceColumn>

			{/* Hit Points */}
			<ResourceColumn $isMobile={isMobile}>
				<ResourceLabel>HIT POINTS</ResourceLabel>
				<ResourceControls>
					<StyledResourceButton onClick={() => onAdjustResource('currentHP', -1)}>
						-
					</StyledResourceButton>
					<StyledLargePotionContainer style={{ borderColor: '#dc2626' }}>
						<StyledPotionFill
							$fillPercentage={getHPFillPercentage(
								current.currentHP,
								original.maxHP,
								current.tempHP
							)}
							$color="#dc2626"
						/>
						<StyledPotionBubbles
							$color="#dc2626"
							$fillPercentage={getHPFillPercentage(
								current.currentHP,
								original.maxHP,
								current.tempHP
							)}
						/>
						<StyledLargePotionValue>{current.currentHP + current.tempHP}</StyledLargePotionValue>
					</StyledLargePotionContainer>
					<StyledResourceButton onClick={() => onAdjustResource('currentHP', 1)}>
						+
					</StyledResourceButton>
				</ResourceControls>
				<div
					style={{
						fontSize: '1.1rem',
						fontWeight: '300',
						color: '#666',
						marginTop: '0.3rem',
						fontStyle: 'italic',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '0.5rem'
					}}
				>
					<Tooltip 
						content={
							breakdowns?.hpMax 
								? createEnhancedTooltip('Hit Points', breakdowns.hpMax)
								: createHPTooltip({ finalHPMax: original.maxHP })
						} 
						position="top"
					>
						<span style={{ cursor: 'help' }}>{original.maxHP + current.tempHP}</span>
					</Tooltip>
					{current.tempHP > 0 && (
						<span style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '0.9rem' }}>
							(+{current.tempHP} temp)
						</span>
					)}
				</div>

				{/* Temp HP Controls */}
				<TempHPControls>
					<TempHPLabel>TEMP HP:</TempHPLabel>
					<StyledResourceButton
						onClick={() => onAdjustResource('tempHP', -1)}
						style={{ fontSize: '0.7rem', width: '20px', height: '20px', padding: '0' }}
					>
						-
					</StyledResourceButton>
					<TempHPInputSmall
						type="number"
						value={current.tempHP}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							onResourceInputChange('tempHP', e.target.value)
						}
					/>
					<StyledResourceButton
						onClick={() => onAdjustResource('tempHP', 1)}
						style={{ fontSize: '0.7rem', width: '20px', height: '20px', padding: '0' }}
					>
						+
					</StyledResourceButton>
				</TempHPControls>
			</ResourceColumn>
		</ResourcesContainer>
	);
};

export default Resources;
