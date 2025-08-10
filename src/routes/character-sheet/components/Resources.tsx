import React from 'react';
import Tooltip from './Tooltip';
import { createHPTooltip, createMPTooltip, createSPTooltip } from './StatTooltips';
import { createEnhancedTooltip } from './EnhancedStatTooltips';
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
	characterData: {
		finalSPMax: number;
		finalMPMax: number;
		finalHPMax: number;
	};
	currentValues: {
		currentSP: number;
		currentMP: number;
		currentHP: number;
		tempHP: number;
	};
	onAdjustResource: (
		resource: 'currentSP' | 'currentMP' | 'currentHP' | 'tempHP',
		amount: number
	) => void;
	onResourceInputChange: (resource: 'tempHP', value: string) => void;
	getFillPercentage: (current: number, max: number) => number;
	getHPFillPercentage: (current: number, max: number, tempHP: number) => number;
	breakdowns?: Record<string, EnhancedStatBreakdown>;
	isMobile?: boolean;
}

const Resources: React.FC<ResourcesProps> = ({
	characterData,
	currentValues,
	onAdjustResource,
	onResourceInputChange,
	getFillPercentage,
	getHPFillPercentage,
	breakdowns,
	isMobile = false
}) => {
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
							$fillPercentage={getFillPercentage(currentValues.currentSP, characterData.finalSPMax)}
							$color="#22c55e"
						/>
						<StyledPotionBubbles
							$color="#22c55e"
							$fillPercentage={getFillPercentage(currentValues.currentSP, characterData.finalSPMax)}
						/>
						<StyledPotionValue>{currentValues.currentSP}</StyledPotionValue>
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
							: createSPTooltip(characterData)
					} 
					position="top"
				>
					<span style={{ cursor: 'help' }}>{characterData.finalSPMax}</span>
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
							$fillPercentage={getFillPercentage(currentValues.currentMP, characterData.finalMPMax)}
							$color="#3b82f6"
						/>
						<StyledPotionBubbles
							$color="#3b82f6"
							$fillPercentage={getFillPercentage(currentValues.currentMP, characterData.finalMPMax)}
						/>
						<StyledPotionValue>{currentValues.currentMP}</StyledPotionValue>
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
								: createMPTooltip(characterData)
						} 
						position="top"
					>
						<span style={{ cursor: 'help' }}>{characterData.finalMPMax}</span>
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
								currentValues.currentHP,
								characterData.finalHPMax,
								currentValues.tempHP
							)}
							$color="#dc2626"
						/>
						<StyledPotionBubbles
							$color="#dc2626"
							$fillPercentage={getHPFillPercentage(
								currentValues.currentHP,
								characterData.finalHPMax,
								currentValues.tempHP
							)}
						/>
						<StyledLargePotionValue>{currentValues.currentHP}</StyledLargePotionValue>
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
								: createHPTooltip(characterData)
						} 
						position="top"
					>
						<span style={{ cursor: 'help' }}>{characterData.finalHPMax}</span>
					</Tooltip>
					{currentValues.tempHP > 0 && (
						<span style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '0.9rem' }}>
							(+{currentValues.tempHP} temp)
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
						value={currentValues.tempHP}
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
