import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { StyledDiceRollerContainer } from '../styles/DiceRoller';
import { theme } from '../styles/theme';
import { logger } from '../../../lib/utils/logger';
import {
	StyledDiceContainer,
	StyledDiceIcon,
	StyledDiceControls,
	StyledModeButton,
	StyledAddDiceSection,
	StyledDiceTypeButton,
	StyledRollButton,
	StyledResultsDisplay,
	StyledDiceResult,
	StyledTotalResult,
	StyledDiceHistory,
	StyledCollapseButton,
	StyledDiceList,
	StyledDiceItem,
	StyledRemoveDiceButton,
	StyledModeButtonsContainer,
	StyledCountControlsContainer,
	StyledCountLabel,
	StyledCountButton,
	StyledCountDisplay,
	StyledCountDescription,
	StyledDiceTypeGrid,
	StyledClearAllButton,
	StyledRollModeText,
	StyledEmptyStateMessage,
	StyledAdditionalDiceContainer,
	StyledResultsFlexContainer,
	StyledHistoryEntry
} from '../styles/DiceRoller';

type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';
type RollMode = 'normal' | 'advantage' | 'disadvantage' | 'no-d20';

interface DiceRollResult {
	type: DiceType;
	value: number;
	isMax: boolean;
	isMin: boolean;
	id: string;
	isChosen?: boolean; // For advantage/disadvantage tracking
	isCriticalSuccess?: boolean;
	isCriticalFail?: boolean;
}

interface AdditionalDice {
	type: DiceType;
	count: number;
}

interface DiceRollerProps {
	onRoll?: (results: DiceRollResult[], total: number, rollMode: RollMode) => void;
}

export interface DiceRollerRef {
	addRollWithModifier: (modifier: number, label?: string) => void;
	addDiceType: (type: DiceType, count?: number) => void;
	clearAllDice: () => void;
	expand: () => void;
	setRollMode: (mode: RollMode) => void;
}

const DiceRoller = forwardRef<DiceRollerRef, DiceRollerProps>(({ onRoll }, ref) => {
	const [rollMode, setRollMode] = useState<RollMode>('normal');
	const [advantageCount, setAdvantageCount] = useState<number>(2);
	const [disadvantageCount, setDisadvantageCount] = useState<number>(2);
	const [additionalDice, setAdditionalDice] = useState<AdditionalDice[]>([]);
	const [isRolling, setIsRolling] = useState(false);
	const [lastResults, setLastResults] = useState<DiceRollResult[]>([]);
	const [total, setTotal] = useState<number | null>(null);
	const [modifier, setModifier] = useState<number>(0);
	const [modifierLabel, setModifierLabel] = useState<string>('');
	const [isExpanded, setIsExpanded] = useState(false);
	const [rollHistory, setRollHistory] = useState<
		{ results: DiceRollResult[]; total: number; mode: RollMode; timestamp: Date }[]
	>([]);

	const rollDice = (sides: number): number => {
		return Math.floor(Math.random() * sides) + 1;
	};

	const getDiceMax = (type: DiceType): number => {
		const sideMap: Record<DiceType, number> = {
			d4: 4,
			d6: 6,
			d8: 8,
			d10: 10,
			d12: 12,
			d20: 20
		};
		return sideMap[type];
	};

	const getDiceIcon = (type: DiceType): string => {
		// Using dice symbols
		const iconMap: Record<DiceType, string> = {
			d4: '⚃',
			d6: '⚅',
			d8: '🎲',
			d10: '🎯',
			d12: '⭐',
			d20: '🔥'
		};
		return iconMap[type];
	};

	const addDice = (type: DiceType) => {
		setAdditionalDice((prev) => {
			const existing = prev.find((d) => d.type === type);
			if (existing) {
				return prev.map((d) => (d.type === type ? { ...d, count: d.count + 1 } : d));
			} else {
				return [...prev, { type, count: 1 }];
			}
		});
	};

	const removeDice = (type: DiceType) => {
		setAdditionalDice((prev) => {
			const existing = prev.find((d) => d.type === type);
			if (existing && existing.count > 1) {
				return prev.map((d) => (d.type === type ? { ...d, count: d.count - 1 } : d));
			} else {
				return prev.filter((d) => d.type !== type);
			}
		});
	};

	const handleRoll = async () => {
		if (isRolling) return;

		setIsRolling(true);

		// Simulate rolling animation duration
		await new Promise((resolve) => setTimeout(resolve, 1200));

		const results: DiceRollResult[] = [];

		// Only roll D20 if not in 'no-d20' mode
		if (rollMode !== 'no-d20') {
			// Roll main d20(s)
			const d20Results: number[] = [];
			let rollCount = 1;

			// Determine how many D20s to roll based on mode
			if (rollMode === 'advantage') {
				rollCount = advantageCount;
			} else if (rollMode === 'disadvantage') {
				rollCount = disadvantageCount;
			}

			for (let i = 0; i < rollCount; i++) {
				d20Results.push(rollDice(20));
			}

			if (rollMode === 'normal') {
				// Single D20 roll
				const value = d20Results[0];
				results.push({
					type: 'd20',
					value,
					isMax: value === 20,
					isMin: value === 1,
					isCriticalSuccess: value === 20,
					isCriticalFail: value === 1,
					isChosen: true,
					id: `d20-main-${Date.now()}`
				});
			} else {
				// Advantage/Disadvantage - show all dice, choose best/worst
				const chosenValue =
					rollMode === 'advantage' ? Math.max(...d20Results) : Math.min(...d20Results);

				d20Results.forEach((value, index) => {
					const isChosen = value === chosenValue && index === d20Results.indexOf(chosenValue);
					results.push({
						type: 'd20',
						value,
						isMax: value === 20,
						isMin: value === 1,
						isCriticalSuccess: value === 20 && isChosen,
						isCriticalFail: value === 1 && isChosen,
						isChosen,
						id: `d20-${rollMode}-${index}-${Date.now()}`
					});
				});
			}
		}

		// Roll additional dice
		additionalDice.forEach(({ type, count }) => {
			const maxValue = getDiceMax(type);
			for (let i = 0; i < count; i++) {
				const value = rollDice(maxValue);
				results.push({
					type,
					value,
					isMax: value === maxValue,
					isMin: value === 1,
					id: `${type}-${i}-${Date.now()}`
				});
			}
		});

		const diceTotal = results.reduce((sum, result) => {
			// For D20s in advantage/disadvantage, only count the chosen one
			if (result.type === 'd20' && (rollMode === 'advantage' || rollMode === 'disadvantage')) {
				return sum + (result.isChosen ? result.value : 0);
			}
			// For all other dice, count normally
			return sum + result.value;
		}, 0);

		const totalValue = diceTotal + modifier;

		setLastResults(results);
		setTotal(totalValue);
		setIsRolling(false);

		// Add to history
		setRollHistory((prev) => [
			{ results, total: totalValue, mode: rollMode, timestamp: new Date() },
			...prev.slice(0, 9) // Keep last 10 rolls
		]);

		// Call callback if provided
		onRoll?.(results, totalValue, rollMode);
	};

	const clearDice = () => {
		setAdditionalDice([]);
		setModifier(0);
		setModifierLabel('');
	};

	// Expose methods via ref for external control
	useImperativeHandle(ref, () => ({
		addRollWithModifier: async (bonus: number, label?: string) => {
			logger.debug('ui', 'DiceRoller addRollWithModifier called', { bonus, label });
			// Clear any existing dice first
			setAdditionalDice([]);
			// Set the modifier
			setModifier(bonus);
			setModifierLabel(label || '');
			// Expand the roller
			setIsExpanded(true);
			// Wait a tiny bit for state to update
			await new Promise((resolve) => setTimeout(resolve, 50));
			// Trigger the roll automatically
			console.log('[GIMLI] Triggering auto-roll');
			handleRoll();
		},
		addDiceType: (type: DiceType, count: number = 1) => {
			for (let i = 0; i < count; i++) {
				addDice(type);
			}
			setIsExpanded(true);
		},
		clearAllDice: () => {
			clearDice();
		},
		setRollMode: (mode: RollMode) => {
			setRollMode(mode);
		},
		expand: () => {
			setIsExpanded(true);
		}
	}));

	return (
		<StyledDiceRollerContainer $isExpanded={isExpanded}>
			<StyledCollapseButton onClick={() => setIsExpanded(!isExpanded)} $isExpanded={isExpanded}>
				🎲
			</StyledCollapseButton>

			{isExpanded && (
				<>
					{/* Roll Mode Controls */}
					<StyledDiceControls>
						<div className="section-label">Roll Mode</div>
						<StyledModeButtonsContainer>
							<StyledModeButton
								$active={rollMode === 'normal'}
								onClick={() => setRollMode('normal')}
							>
								Normal
							</StyledModeButton>
							<StyledModeButton
								$active={rollMode === 'advantage'}
								onClick={() => setRollMode('advantage')}
							>
								Advantage
							</StyledModeButton>
							<StyledModeButton
								$active={rollMode === 'disadvantage'}
								onClick={() => setRollMode('disadvantage')}
							>
								Disadvantage
							</StyledModeButton>
							<StyledModeButton
								$active={rollMode === 'no-d20'}
								onClick={() => setRollMode('no-d20')}
							>
								No D20
							</StyledModeButton>
						</StyledModeButtonsContainer>

						{/* Advantage/Disadvantage Count Controls */}
						{(rollMode === 'advantage' || rollMode === 'disadvantage') && (
							<StyledCountControlsContainer>
								<StyledCountLabel>
									{rollMode === 'advantage' ? 'Advantage' : 'Disadvantage'} Count:
								</StyledCountLabel>
								<StyledCountButton
									onClick={() => {
										if (rollMode === 'advantage') {
											setAdvantageCount(Math.max(2, advantageCount - 1));
										} else {
											setDisadvantageCount(Math.max(2, disadvantageCount - 1));
										}
									}}
								>
									−
								</StyledCountButton>
								<StyledCountDisplay>
									{rollMode === 'advantage' ? advantageCount : disadvantageCount}
								</StyledCountDisplay>
								<StyledCountButton
									onClick={() => {
										if (rollMode === 'advantage') {
											setAdvantageCount(Math.min(4, advantageCount + 1));
										} else {
											setDisadvantageCount(Math.min(3, disadvantageCount + 1));
										}
									}}
								>
									+
								</StyledCountButton>
								<StyledCountDescription>
									(Roll {rollMode === 'advantage' ? advantageCount : disadvantageCount} dice, take{' '}
									{rollMode === 'advantage' ? 'highest' : 'lowest'})
								</StyledCountDescription>
							</StyledCountControlsContainer>
						)}
					</StyledDiceControls>

					{/* Additional Dice Section */}
					<StyledAddDiceSection>
						<div className="section-label">Add Dice</div>
						<StyledDiceTypeGrid>
							{(['d20', 'd12', 'd10', 'd8', 'd6', 'd4'] as DiceType[]).map((type) => (
								<StyledDiceTypeButton key={type} onClick={() => addDice(type)} $diceType={type}>
									{type.toUpperCase()}
								</StyledDiceTypeButton>
							))}
						</StyledDiceTypeGrid>
					</StyledAddDiceSection>

					{/* Current Dice Display */}
					{additionalDice.length > 0 && (
						<StyledDiceList>
							<div className="section-label">Current Dice</div>
							{additionalDice.map(({ type, count }) => (
								<StyledDiceItem key={type}>
									<span>
										{count}x {type.toUpperCase()}
									</span>
									<StyledRemoveDiceButton onClick={() => removeDice(type)}>
										×
									</StyledRemoveDiceButton>
								</StyledDiceItem>
							))}
							<StyledClearAllButton onClick={clearDice}>Clear All</StyledClearAllButton>
						</StyledDiceList>
					)}

					{/* Main Dice Display */}
					<StyledDiceContainer>
						{rollMode !== 'no-d20' && (
							<>
								<StyledDiceIcon $isRolling={isRolling} $type="d20">
									{isRolling ? '🌪️' : '🔥'}
								</StyledDiceIcon>
								{rollMode !== 'normal' && (
									<StyledRollModeText>
										{rollMode === 'advantage' && `${advantageCount}x ADVANTAGE`}
										{rollMode === 'disadvantage' && `${disadvantageCount}x DISADVANTAGE`}
									</StyledRollModeText>
								)}
							</>
						)}
						{rollMode === 'no-d20' && additionalDice.length === 0 && (
							<StyledEmptyStateMessage>Add dice to roll!</StyledEmptyStateMessage>
						)}
						{additionalDice.map(({ type, count }) => (
							<StyledAdditionalDiceContainer key={type}>
								{Array.from({ length: count }).map((_, index) => (
									<StyledDiceIcon key={index} $isRolling={isRolling} $type={type} $size="small">
										{isRolling ? '💫' : getDiceIcon(type)}
									</StyledDiceIcon>
								))}
							</StyledAdditionalDiceContainer>
						))}
					</StyledDiceContainer>

					{/* Roll Button */}
					<StyledRollButton
						onClick={handleRoll}
						disabled={isRolling || (rollMode === 'no-d20' && additionalDice.length === 0)}
						$isRolling={isRolling}
					>
						{isRolling ? 'Rolling...' : 'ROLL DICE'}
					</StyledRollButton>

					{/* Results Display */}
					{total !== null && !isRolling && (
						<StyledResultsDisplay>
							<StyledTotalResult $isHighRoll={total >= 15}>
								Total: {total}{' '}
								{modifier !== 0 && (
									<span style={{ fontSize: '0.85em', opacity: 0.8 }}>
										{' '}
										({modifier > 0 ? '+' : ''}
										{modifier}
										{modifierLabel ? ` ${modifierLabel}` : ''})
									</span>
								)}{' '}
								{lastResults.some((r) => r.isCriticalSuccess && r.isChosen !== false) && ' 🌟'}
								{lastResults.some((r) => r.isCriticalFail && r.isChosen !== false) && ' 💀'}
							</StyledTotalResult>
							<StyledResultsFlexContainer>
								{lastResults.map((result) => (
									<StyledDiceResult
										key={result.id}
										$isMax={result.isMax}
										$isMin={result.isMin}
										$isChosen={result.isChosen}
										$isCriticalSuccess={result.isCriticalSuccess}
										$isCriticalFail={result.isCriticalFail}
									>
										{result.type.toUpperCase()}: {result.value}
									</StyledDiceResult>
								))}
							</StyledResultsFlexContainer>
						</StyledResultsDisplay>
					)}

					{/* Roll History */}
					{rollHistory.length > 0 && (
						<StyledDiceHistory>
							<div className="section-label">Recent Rolls</div>
							{rollHistory.slice(0, 3).map((roll, index) => (
								<StyledHistoryEntry key={index}>
									{roll.mode !== 'normal' && `${roll.mode} `}Total: {roll.total}
								</StyledHistoryEntry>
							))}
						</StyledDiceHistory>
					)}
				</>
			)}
		</StyledDiceRollerContainer>
	);
});

DiceRoller.displayName = 'DiceRoller';

export default DiceRoller;
