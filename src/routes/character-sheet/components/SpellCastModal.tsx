import { useEffect, useMemo, useState } from 'react';
import type { SpellEnhancement } from '../../../lib/rulesdata/schemas/spell.schema';
import {
	formatResourceCost,
	formatSpellCost,
	formatSpellEnhancementCost
} from '../../../lib/rulesdata/spells-data/spellCost';
import type { SpellData } from '../../../types';
import {
	areSpellEnhancementRequirementsMet,
	calculateSpellCastSpend,
	getSpellEnhancementCostOptions,
	getSpellEnhancementKey,
	hasVariableResourceCost,
	type SpellCastSpend,
	type SpellEnhancementSelections
} from '../spellCastSpend';
import {
	SpellCastActions,
	SpellCastBaseCost,
	SpellCastBody,
	SpellCastCancelButton,
	SpellCastConfirmButton,
	SpellCastContent,
	SpellCastControls,
	SpellCastCost,
	SpellCastCostSelect,
	SpellCastEmpty,
	SpellCastEnhancement,
	SpellCastEnhancementCopy,
	SpellCastEnhancements,
	SpellCastError,
	SpellCastFooter,
	SpellCastHeader,
	SpellCastLimit,
	SpellCastLimitFill,
	SpellCastLimitLabel,
	SpellCastLimitTrack,
	SpellCastLimitValue,
	SpellCastManaSummary,
	SpellCastMetadata,
	SpellCastRequirement,
	SpellCastSectionTitle,
	SpellCastStepButton,
	SpellCastStepper,
	SpellCastStepValue,
	SpellCastSummary,
	SpellCastToggleButton
} from '../styles/SpellCastModal.styles';
import {
	StyledFeaturePopupClose,
	StyledFeaturePopupOverlay,
	StyledFeaturePopupTitle
} from '../styles/FeaturePopup';
import RichDescription from './RichDescription';

interface SpellCastModalProps {
	spell: SpellData;
	currentMana: number;
	maximumMana: number;
	manaSpendLimit: number;
	onCast: (spend: SpellCastSpend) => void;
	onClose: () => void;
}

const MAX_UNBOUNDED_QUANTITY = 20;

export default function SpellCastModal({
	spell,
	currentMana,
	maximumMana,
	manaSpendLimit,
	onCast,
	onClose
}: SpellCastModalProps) {
	const enhancements = (spell.enhancements ?? []) as SpellEnhancement[];
	const [selections, setSelections] = useState<SpellEnhancementSelections>({});
	const [baseVariableMp, setBaseVariableMp] = useState(
		spell.cost.mp === 'X' ? Math.max(0, spell.cost.minimumMp ?? 0) : 0
	);
	const spend = useMemo(
		() => calculateSpellCastSpend(spell.cost, enhancements, selections, baseVariableMp),
		[baseVariableMp, enhancements, selections, spell.cost]
	);
	const exceedsSpendLimit = spend.mp > manaSpendLimit;
	const exceedsCurrentMana = spend.mp > currentMana;
	const hasInvalidRequirement = enhancements.some((enhancement, index) => {
		const selection = selections[getSpellEnhancementKey(enhancement, index)];
		return (
			(selection?.quantity ?? 0) > 0 &&
			!areSpellEnhancementRequirementsMet(enhancement, enhancements, selections)
		);
	});
	const canCast = !exceedsSpendLimit && !exceedsCurrentMana && !hasInvalidRequirement;

	useEffect(() => {
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', closeOnEscape);
		return () => window.removeEventListener('keydown', closeOnEscape);
	}, [onClose]);

	const updateSelection = (
		enhancement: SpellEnhancement,
		index: number,
		quantity: number,
		costOptionIndex?: number
	) => {
		const key = getSpellEnhancementKey(enhancement, index);
		setSelections((current) => {
			const next: SpellEnhancementSelections = {
				...current,
				[key]: {
					quantity: Math.max(0, quantity),
					costOptionIndex: costOptionIndex ?? current[key]?.costOptionIndex ?? 0
				}
			};

			if (quantity <= 0 && enhancement.id) {
				let changed = true;
				while (changed) {
					changed = false;
					for (const [candidateIndex, candidate] of enhancements.entries()) {
						const candidateKey = getSpellEnhancementKey(candidate, candidateIndex);
						if (
							(next[candidateKey]?.quantity ?? 0) > 0 &&
							!areSpellEnhancementRequirementsMet(candidate, enhancements, next)
						) {
							next[candidateKey] = { ...next[candidateKey], quantity: 0 };
							changed = true;
						}
					}
				}
			}

			return next;
		});
	};

	const canIncrease = (enhancement: SpellEnhancement, index: number): boolean => {
		if (!areSpellEnhancementRequirementsMet(enhancement, enhancements, selections)) return false;
		const key = getSpellEnhancementKey(enhancement, index);
		const current = selections[key] ?? { quantity: 0, costOptionIndex: 0 };
		const nextSelections = {
			...selections,
			[key]: { ...current, quantity: current.quantity + 1 }
		};
		const nextSpend = calculateSpellCastSpend(
			spell.cost,
			enhancements,
			nextSelections,
			baseVariableMp
		);
		const selectedCost = getSpellEnhancementCostOptions(enhancement)[current.costOptionIndex] ?? {};
		const affectsMana = selectedCost.mp !== undefined;
		if (!affectsMana) return current.quantity < MAX_UNBOUNDED_QUANTITY;
		return nextSpend.mp <= manaSpendLimit && nextSpend.mp <= currentMana;
	};

	const canIncreaseBaseMana =
		spell.cost.mp === 'X' && spend.mp + 1 <= manaSpendLimit && spend.mp + 1 <= currentMana;

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<SpellCastContent
				role="dialog"
				aria-modal="true"
				aria-labelledby="spell-cast-title"
				data-testid="spell-cast-modal"
				onClick={(event) => event.stopPropagation()}
			>
				<SpellCastHeader>
					<StyledFeaturePopupTitle id="spell-cast-title">
						Cast {spell.spellName}
					</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose type="button" aria-label="Close cast spell" onClick={onClose}>
						×
					</StyledFeaturePopupClose>
				</SpellCastHeader>

				<SpellCastBody>
					<SpellCastSummary>
						<SpellCastMetadata>
							<span>{spell.school || 'Custom spell'}</span>
							<span>
								{spell.range || 'No range'} · {spell.duration || 'No duration'}
							</span>
						</SpellCastMetadata>
						<SpellCastBaseCost>{formatSpellCost(spell.cost)}</SpellCastBaseCost>
					</SpellCastSummary>

					{spell.cost.mp === 'X' ? (
						<SpellCastEnhancement $selected={baseVariableMp > 0} $disabled={false}>
							<SpellCastEnhancementCopy>
								<strong>Base Mana</strong>
								<span>Choose the spell's variable base MP cost.</span>
							</SpellCastEnhancementCopy>
							<SpellCastControls>
								<SpellCastStepper>
									<SpellCastStepButton
										type="button"
										aria-label="Decrease base Mana"
										disabled={baseVariableMp <= Math.max(0, spell.cost.minimumMp ?? 0)}
										onClick={() => setBaseVariableMp((value) => Math.max(0, value - 1))}
									>
										−
									</SpellCastStepButton>
									<SpellCastStepValue>{baseVariableMp}</SpellCastStepValue>
									<SpellCastStepButton
										type="button"
										aria-label="Increase base Mana"
										disabled={!canIncreaseBaseMana}
										onClick={() => setBaseVariableMp((value) => value + 1)}
									>
										+
									</SpellCastStepButton>
								</SpellCastStepper>
							</SpellCastControls>
						</SpellCastEnhancement>
					) : null}

					<SpellCastSectionTitle>Enhancements</SpellCastSectionTitle>
					{enhancements.length > 0 ? (
						<SpellCastEnhancements>
							{enhancements.map((enhancement, index) => {
								const key = getSpellEnhancementKey(enhancement, index);
								const selection = selections[key] ?? { quantity: 0, costOptionIndex: 0 };
								const costOptions = getSpellEnhancementCostOptions(enhancement);
								const selectedCost = costOptions[selection.costOptionIndex] ?? costOptions[0] ?? {};
								const usesStepper = enhancement.repeatable || hasVariableResourceCost(selectedCost);
								const requirementsMet = areSpellEnhancementRequirementsMet(
									enhancement,
									enhancements,
									selections
								);

								return (
									<SpellCastEnhancement
										key={key}
										$selected={selection.quantity > 0}
										$disabled={!requirementsMet}
									>
										<SpellCastEnhancementCopy>
											<strong>{enhancement.name}</strong>
											<SpellCastCost>{formatSpellEnhancementCost(enhancement)}</SpellCastCost>
											<RichDescription text={enhancement.description} />
											{!requirementsMet ? (
												<SpellCastRequirement>
													Requires {enhancement.requires?.join(', ')}
												</SpellCastRequirement>
											) : null}
										</SpellCastEnhancementCopy>
										<SpellCastControls>
											{costOptions.length > 1 && selection.quantity > 0 ? (
												<SpellCastCostSelect
													aria-label={`${enhancement.name} cost`}
													value={selection.costOptionIndex}
													onChange={(event) =>
														updateSelection(
															enhancement,
															index,
															selection.quantity,
															Number(event.target.value)
														)
													}
												>
													{costOptions.map((option, optionIndex) => (
														<option key={formatResourceCost(option)} value={optionIndex}>
															{formatResourceCost(option)}
														</option>
													))}
												</SpellCastCostSelect>
											) : null}
											{usesStepper ? (
												<SpellCastStepper>
													<SpellCastStepButton
														type="button"
														aria-label={`Decrease ${enhancement.name}`}
														disabled={selection.quantity === 0}
														onClick={() =>
															updateSelection(enhancement, index, selection.quantity - 1)
														}
													>
														−
													</SpellCastStepButton>
													<SpellCastStepValue>{selection.quantity}</SpellCastStepValue>
													<SpellCastStepButton
														type="button"
														aria-label={`Increase ${enhancement.name}`}
														disabled={!canIncrease(enhancement, index)}
														onClick={() =>
															updateSelection(enhancement, index, selection.quantity + 1)
														}
													>
														+
													</SpellCastStepButton>
												</SpellCastStepper>
											) : (
												<SpellCastToggleButton
													type="button"
													$selected={selection.quantity > 0}
													aria-pressed={selection.quantity > 0}
													disabled={
														!requirementsMet ||
														(selection.quantity === 0 && !canIncrease(enhancement, index))
													}
													onClick={() =>
														updateSelection(enhancement, index, selection.quantity > 0 ? 0 : 1)
													}
												>
													{selection.quantity > 0 ? 'Selected' : 'Add'}
												</SpellCastToggleButton>
											)}
										</SpellCastControls>
									</SpellCastEnhancement>
								);
							})}
						</SpellCastEnhancements>
					) : (
						<SpellCastEmpty>This spell has no enhancements.</SpellCastEmpty>
					)}

					<SpellCastLimit>
						<SpellCastLimitLabel>Mana Spend Limit</SpellCastLimitLabel>
						<SpellCastLimitTrack>
							<SpellCastLimitFill
								$percentage={(spend.mp / Math.max(1, manaSpendLimit)) * 100}
								$invalid={exceedsSpendLimit}
							/>
						</SpellCastLimitTrack>
						<SpellCastLimitValue $invalid={exceedsSpendLimit}>
							{spend.mp} / {manaSpendLimit} MP
						</SpellCastLimitValue>
					</SpellCastLimit>
					{exceedsSpendLimit ? (
						<SpellCastError>This spell exceeds the character's Mana Spend Limit.</SpellCastError>
					) : exceedsCurrentMana ? (
						<SpellCastError>The character does not have enough Mana.</SpellCastError>
					) : hasInvalidRequirement ? (
						<SpellCastError>Select every required enhancement before casting.</SpellCastError>
					) : null}
				</SpellCastBody>

				<SpellCastFooter>
					<SpellCastManaSummary>
						Mana{' '}
						<strong>
							{currentMana} → {Math.max(0, currentMana - spend.mp)}
						</strong>
						<span>/ {maximumMana}</span>
					</SpellCastManaSummary>
					<SpellCastActions>
						<SpellCastCancelButton type="button" onClick={onClose}>
							Cancel
						</SpellCastCancelButton>
						<SpellCastConfirmButton
							type="button"
							disabled={!canCast}
							data-testid="spell-cast-confirm"
							onClick={() => onCast(spend)}
						>
							Cast · Spend {spend.mp} MP
						</SpellCastConfirmButton>
					</SpellCastActions>
				</SpellCastFooter>
			</SpellCastContent>
		</StyledFeaturePopupOverlay>
	);
}
