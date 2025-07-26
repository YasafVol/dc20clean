import React, { useState } from 'react';
import {
	DefensesContainer,
	DefenseItem,
	DefenseLabelContainer,
	DefenseLabel,
	ShieldContainer,
	ShieldValue,
	ShieldInput,
	DefenseFooter,
	AutoCalculatedNote,
	RevertButton
} from '../styles/Defenses';
import DefenseChangeModal from './DefenseChangeModal';
import {
	addDefenseNote,
	getDefenseTooltipWithNotes,
	getDefenseDisplayName,
	clearDefenseNotesForField
} from '../../../lib/utils/defenseNotes';

interface DefensesProps {
	characterData: {
		id: string;
		finalPD: number;
		finalPDR: number;
		finalAD: number;
		manualPD?: number;
		manualPDR?: number;
		manualAD?: number;
	};
	calculatedDefenses?: {
		calculatedPD: number;
		calculatedPDR: number;
		calculatedAD: number;
		pdBreakdown: string;
		adBreakdown: string;
		pdrBreakdown: string;
	};
	onUpdateManualDefense?: (
		field: 'manualPD' | 'manualPDR' | 'manualAD',
		value: number | undefined
	) => void;
	isMobile?: boolean;
}

const Defenses: React.FC<DefensesProps> = ({
	characterData,
	calculatedDefenses,
	onUpdateManualDefense,
	isMobile = false
}) => {
	const [pendingChange, setPendingChange] = useState<{
		field: 'manualPD' | 'manualPDR' | 'manualAD';
		oldValue: number;
		newValue: number;
	} | null>(null);

	const [originalValue, setOriginalValue] = useState<number | null>(null);

	const getCurrentValue = (field: 'manualPD' | 'manualPDR' | 'manualAD'): number => {
		switch (field) {
			case 'manualPD':
				return characterData.manualPD !== undefined
					? characterData.manualPD
					: characterData.finalPD;
			case 'manualPDR':
				return characterData.manualPDR !== undefined
					? characterData.manualPDR
					: characterData.finalPDR || 0;
			case 'manualAD':
				return characterData.manualAD !== undefined
					? characterData.manualAD
					: characterData.finalAD;
		}
	};

	const handleNoteConfirm = (reason: string) => {
		if (!pendingChange || !onUpdateManualDefense) return;

		// Add the note to storage
		addDefenseNote(
			characterData.id,
			pendingChange.field,
			pendingChange.oldValue,
			pendingChange.newValue,
			reason
		);

		// Apply the defense change
		onUpdateManualDefense(pendingChange.field, pendingChange.newValue);

		// Clear pending change
		setPendingChange(null);
	};

	const handleNoteCancel = () => {
		// Revert the value back to the original when canceling
		if (pendingChange && onUpdateManualDefense) {
			// If the original value was different from the auto-calculated value,
			// it means it was a manual override, so we need to restore it
			const autoValue =
				pendingChange.field === 'manualPD'
					? characterData.finalPD
					: pendingChange.field === 'manualPDR'
						? characterData.finalPDR || 0
						: characterData.finalAD;

			const valueToRestore =
				pendingChange.oldValue === autoValue ? undefined : pendingChange.oldValue;
			onUpdateManualDefense(pendingChange.field, valueToRestore);
		}
		setPendingChange(null);
	};
	const handleInputChange = (field: 'manualPD' | 'manualPDR' | 'manualAD', value: string) => {
		// Only validate the input, don't trigger the modal yet
		const numValue = value === '' ? undefined : parseInt(value, 10);
		if (value !== '' && (isNaN(numValue!) || numValue! < 0)) return;

		// For now, just update the value directly without the modal
		// The modal will be triggered on blur
		if (!onUpdateManualDefense) return;
		onUpdateManualDefense(field, numValue);
	};

	const handleInputBlur = (field: 'manualPD' | 'manualPDR' | 'manualAD', value: string) => {
		const numValue = value === '' ? undefined : parseInt(value, 10);

		// Get the current value after all changes
		const currentValue = getCurrentValue(field);

		// Use the original value we captured on focus for comparison
		if (originalValue !== null && originalValue !== currentValue && numValue !== undefined) {
			setPendingChange({
				field,
				oldValue: originalValue,
				newValue: currentValue
			});
		}

		// Clear the original value
		setOriginalValue(null);
	};

	const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		// Capture the original value for comparison on blur
		const field = e.target.getAttribute('data-field') as 'manualPD' | 'manualPDR' | 'manualAD';
		if (field) {
			setOriginalValue(getCurrentValue(field));
		}

		// Select all text when clicking into the input field
		// Use setTimeout to ensure the selection happens after the focus event
		setTimeout(() => {
			e.target.select();
		}, 0);
	};

	const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
		// Also handle click events to ensure text selection works properly
		const target = e.target as HTMLInputElement;
		setTimeout(() => {
			target.select();
		}, 0);
	};

	const handleRevert = (field: 'manualPD' | 'manualPDR' | 'manualAD') => {
		// Clear all notes for this defense field when reverting to auto
		clearDefenseNotesForField(characterData.id, field);

		// Reverts don't need notes as they're returning to auto-calculated values
		if (!onUpdateManualDefense) return;
		onUpdateManualDefense(field, undefined);
	};

	const getTooltip = (field: 'PD' | 'PDR' | 'AD'): string => {
		if (!calculatedDefenses) return '';

		const isManual =
			field === 'PD'
				? characterData.manualPD !== undefined
				: field === 'PDR'
					? characterData.manualPDR !== undefined
					: characterData.manualAD !== undefined;

		let baseTooltip = '';

		if (isManual) {
			const originalBreakdown =
				field === 'PD'
					? calculatedDefenses.pdBreakdown
					: field === 'PDR'
						? calculatedDefenses.pdrBreakdown
						: calculatedDefenses.adBreakdown;
			baseTooltip = `Manual Override (Original calculation: ${originalBreakdown})`;
		} else {
			baseTooltip =
				field === 'PD'
					? calculatedDefenses.pdBreakdown
					: field === 'PDR'
						? calculatedDefenses.pdrBreakdown
						: calculatedDefenses.adBreakdown;
		}

		// Add defense notes to tooltip
		const defenseField = field === 'PD' ? 'manualPD' : field === 'PDR' ? 'manualPDR' : 'manualAD';
		return getDefenseTooltipWithNotes(characterData.id, defenseField, baseTooltip);
	};

	return (
		<>
			<DefensesContainer $isMobile={isMobile}>
				{/* Precision Defense */}
				<DefenseItem>
					<DefenseLabelContainer>
						<DefenseLabel>PRECISION</DefenseLabel>
						<DefenseLabel>DEFENSE</DefenseLabel>
					</DefenseLabelContainer>
					<ShieldContainer>
						{onUpdateManualDefense ? (
							<ShieldInput
								type="number"
								data-field="manualPD"
								value={
									characterData.manualPD !== undefined
										? characterData.manualPD
										: characterData.finalPD
								}
								onChange={(e) => handleInputChange('manualPD', e.target.value)}
								onBlur={(e) => handleInputBlur('manualPD', e.target.value)}
								onFocus={handleInputFocus}
								onClick={handleInputClick}
								placeholder={characterData.finalPD.toString()}
								title={getTooltip('PD')}
							/>
						) : (
							<ShieldValue title={getTooltip('PD')}>{characterData.finalPD}</ShieldValue>
						)}
					</ShieldContainer>
					<DefenseFooter>
						{characterData.manualPD !== undefined ? (
							<>
								<AutoCalculatedNote>Manual override</AutoCalculatedNote>
								<RevertButton onClick={() => handleRevert('manualPD')}>
									Revert to auto ({calculatedDefenses?.calculatedPD || characterData.finalPD})
								</RevertButton>
							</>
						) : null}
					</DefenseFooter>
				</DefenseItem>

				{/* Precision Damage Reduction */}
				<DefenseItem>
					<DefenseLabelContainer>
						<DefenseLabel>PRECISION</DefenseLabel>
						<DefenseLabel>DMG REDUCTION</DefenseLabel>
					</DefenseLabelContainer>
					<ShieldContainer>
						{onUpdateManualDefense ? (
							<ShieldInput
								type="number"
								data-field="manualPDR"
								value={
									characterData.manualPDR !== undefined
										? characterData.manualPDR
										: characterData.finalPDR || 0
								}
								onChange={(e) => handleInputChange('manualPDR', e.target.value)}
								onBlur={(e) => handleInputBlur('manualPDR', e.target.value)}
								onFocus={handleInputFocus}
								onClick={handleInputClick}
								placeholder={(characterData.finalPDR || 0).toString()}
								title={getTooltip('PDR')}
							/>
						) : (
							<ShieldValue title={getTooltip('PDR')}>{characterData.finalPDR || 0}</ShieldValue>
						)}
					</ShieldContainer>
					<DefenseFooter>
						{characterData.manualPDR !== undefined ? (
							<>
								<AutoCalculatedNote>Manual override</AutoCalculatedNote>
								<RevertButton onClick={() => handleRevert('manualPDR')}>
									Revert to auto ({calculatedDefenses?.calculatedPDR || characterData.finalPDR || 0}
									)
								</RevertButton>
							</>
						) : (
							characterData.finalPDR > 0 && <AutoCalculatedNote>Auto-calculated</AutoCalculatedNote>
						)}
					</DefenseFooter>
				</DefenseItem>

				{/* Area Defense */}
				<DefenseItem>
					<DefenseLabelContainer>
						<DefenseLabel>AREA</DefenseLabel>
						<DefenseLabel>DEFENSE</DefenseLabel>
					</DefenseLabelContainer>
					<ShieldContainer>
						{onUpdateManualDefense ? (
							<ShieldInput
								type="number"
								data-field="manualAD"
								value={
									characterData.manualAD !== undefined
										? characterData.manualAD
										: characterData.finalAD
								}
								onChange={(e) => handleInputChange('manualAD', e.target.value)}
								onBlur={(e) => handleInputBlur('manualAD', e.target.value)}
								onFocus={handleInputFocus}
								onClick={handleInputClick}
								placeholder={characterData.finalAD.toString()}
								title={getTooltip('AD')}
							/>
						) : (
							<ShieldValue title={getTooltip('AD')}>{characterData.finalAD}</ShieldValue>
						)}
					</ShieldContainer>
					<DefenseFooter>
						{characterData.manualAD !== undefined ? (
							<>
								<AutoCalculatedNote>Manual override</AutoCalculatedNote>
								<RevertButton onClick={() => handleRevert('manualAD')}>
									Revert to auto ({calculatedDefenses?.calculatedAD || characterData.finalAD})
								</RevertButton>
							</>
						) : null}
					</DefenseFooter>
				</DefenseItem>
			</DefensesContainer>

			{/* Defense Change Modal */}
			{pendingChange && (
				<DefenseChangeModal
					isOpen={true}
					defenseType={getDefenseDisplayName(pendingChange.field)}
					oldValue={pendingChange.oldValue}
					newValue={pendingChange.newValue}
					onConfirm={handleNoteConfirm}
					onCancel={handleNoteCancel}
				/>
			)}
		</>
	);
};

export default Defenses;
