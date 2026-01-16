import React, { useState } from 'react';
import {
	DefensesContainer,
	DefenseItem,
	DefenseLabelContainer,
	DefenseLabel,
	ShieldContainer,
	ShieldInput,
	DefenseFooter,
	AutoCalculatedNote,
	RevertButton
} from '../styles/Defenses';
import DefenseChangeModal from './DefenseChangeModal';
import { useCharacterDefenses, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import { getDefenseDisplayName, clearDefenseNotesForField } from '../../../lib/utils/defenseNotes';

interface DefensesProps {
	isMobile?: boolean;
}

const Defenses: React.FC<DefensesProps> = ({ isMobile = false }) => {
	const { setManualDefense, state } = useCharacterSheet();
	const defenses = useCharacterDefenses();

	// Get character data from Provider state
	const character = state.character;

	if (!defenses || !character) {
		return (
			<div style={{ padding: '1rem', color: '#666', textAlign: 'center' }}>
				<p>Loading defenses...</p>
			</div>
		);
	}
	const [pendingChange, setPendingChange] = useState<{
		field: 'manualPD' | 'manualPDR' | 'manualAD';
		oldValue: number;
		newValue: number;
	} | null>(null);

	const [originalValue, setOriginalValue] = useState<number | null>(null);

	const getCurrentValue = (field: 'manualPD' | 'manualPDR' | 'manualAD'): number => {
		switch (field) {
			case 'manualPD':
				return defenses.manualOverrides.PD !== undefined
					? defenses.manualOverrides.PD
					: defenses.PD;
			case 'manualPDR':
				return defenses.manualOverrides.PDR !== undefined
					? defenses.manualOverrides.PDR
					: defenses.PDR;
			case 'manualAD':
				return defenses.manualOverrides.AD !== undefined
					? defenses.manualOverrides.AD
					: defenses.AD;
		}
	};

	const handleNoteConfirm = (_reason: string) => {
		if (!pendingChange) return;

		// Add the note to storage (will need character ID from context)
		// TODO: Integrate defense notes with new system if needed

		// Apply the defense change using context
		const update: { pd?: number; ad?: number; pdr?: number } = {};
		switch (pendingChange.field) {
			case 'manualPD':
				update.pd = pendingChange.newValue;
				break;
			case 'manualPDR':
				update.pdr = pendingChange.newValue;
				break;
			case 'manualAD':
				update.ad = pendingChange.newValue;
				break;
		}
		setManualDefense(update.pd, update.ad, update.pdr);

		// Clear pending change
		setPendingChange(null);
	};

	const handleNoteCancel = () => {
		// Revert the value back to the original when canceling
		if (pendingChange) {
			// If the original value was different from the auto-calculated value,
			// it means it was a manual override, so we need to restore it
			const autoValue =
				pendingChange.field === 'manualPD'
					? defenses.PD
					: pendingChange.field === 'manualPDR'
						? defenses.PDR
						: defenses.AD;

			const valueToRestore =
				pendingChange.oldValue === autoValue ? undefined : pendingChange.oldValue;

			// Apply the defense change using context
			const update: { pd?: number; ad?: number; pdr?: number } = {};
			switch (pendingChange.field) {
				case 'manualPD':
					update.pd = valueToRestore;
					break;
				case 'manualPDR':
					update.pdr = valueToRestore;
					break;
				case 'manualAD':
					update.ad = valueToRestore;
					break;
			}
			setManualDefense(update.pd, update.ad, update.pdr);
		}
		setPendingChange(null);
	};
	const handleInputChange = (field: 'manualPD' | 'manualPDR' | 'manualAD', value: string) => {
		// Only validate the input, don't trigger the modal yet
		const numValue = value === '' ? undefined : parseInt(value, 10);
		if (value !== '' && (isNaN(numValue!) || numValue! < 0)) return;

		// For now, just update the value directly without the modal
		// The modal will be triggered on blur
		const update: { pd?: number; ad?: number; pdr?: number } = {};
		switch (field) {
			case 'manualPD':
				update.pd = numValue;
				break;
			case 'manualPDR':
				update.pdr = numValue;
				break;
			case 'manualAD':
				update.ad = numValue;
				break;
		}
		setManualDefense(update.pd, update.ad, update.pdr);
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
		void clearDefenseNotesForField(character.id, field);

		// Reverts don't need notes as they're returning to auto-calculated values
		setManualDefense(
			field === 'manualPD' ? undefined : defenses.manualOverrides.PD,
			field === 'manualAD' ? undefined : defenses.manualOverrides.AD,
			field === 'manualPDR' ? undefined : defenses.manualOverrides.PDR
		);
	};

	return (
		<>
			<DefensesContainer $isMobile={isMobile}>
				{/* Precision Defense */}
				<DefenseItem $isMobile={isMobile}>
					<DefenseLabelContainer $isMobile={isMobile}>
						<DefenseLabel $isMobile={isMobile}>PRECISION</DefenseLabel>
						<DefenseLabel $isMobile={isMobile}>DEFENSE</DefenseLabel>
					</DefenseLabelContainer>
					<ShieldContainer $isMobile={isMobile}>
						<ShieldInput
							$isMobile={isMobile}
							type="number"
							data-field="manualPD"
							value={defenses.PD}
							onChange={(e) => handleInputChange('manualPD', e.target.value)}
							onBlur={(e) => handleInputBlur('manualPD', e.target.value)}
							onFocus={handleInputFocus}
							onClick={handleInputClick}
							placeholder={character.finalPD?.toString() || '0'}
						/>
					</ShieldContainer>
					<DefenseFooter $isMobile={isMobile}>
						{defenses.manualOverrides.PD !== undefined ? (
							<>
								<AutoCalculatedNote $isMobile={isMobile}>Manual override</AutoCalculatedNote>
								<RevertButton $isMobile={isMobile} onClick={() => handleRevert('manualPD')}>
									Revert to auto ({character.finalPD || 0})
								</RevertButton>
							</>
						) : null}
					</DefenseFooter>
				</DefenseItem>

				{/* Precision Damage Reduction */}
				<DefenseItem $isMobile={isMobile}>
					<DefenseLabelContainer $isMobile={isMobile}>
						<DefenseLabel $isMobile={isMobile}>PRECISION</DefenseLabel>
						<DefenseLabel $isMobile={isMobile}>DMG REDUCTION</DefenseLabel>
					</DefenseLabelContainer>
					<ShieldContainer $isMobile={isMobile}>
						<ShieldInput
							$isMobile={isMobile}
							type="number"
							data-field="manualPDR"
							value={defenses.PDR}
							onChange={(e) => handleInputChange('manualPDR', e.target.value)}
							onBlur={(e) => handleInputBlur('manualPDR', e.target.value)}
							onFocus={handleInputFocus}
							onClick={handleInputClick}
							placeholder={(character.finalPDR || 0).toString()}
						/>
					</ShieldContainer>
					<DefenseFooter $isMobile={isMobile}>
						{defenses.manualOverrides.PDR !== undefined ? (
							<>
								<AutoCalculatedNote $isMobile={isMobile}>Manual override</AutoCalculatedNote>
								<RevertButton $isMobile={isMobile} onClick={() => handleRevert('manualPDR')}>
									Revert to auto ({character.finalPDR || 0})
								</RevertButton>
							</>
						) : (
							(character.finalPDR || 0) > 0 && (
								<AutoCalculatedNote $isMobile={isMobile}>Auto-calculated</AutoCalculatedNote>
							)
						)}
					</DefenseFooter>
				</DefenseItem>

				{/* Area Defense */}
				<DefenseItem $isMobile={isMobile}>
					<DefenseLabelContainer $isMobile={isMobile}>
						<DefenseLabel $isMobile={isMobile}>AREA</DefenseLabel>
						<DefenseLabel $isMobile={isMobile}>DEFENSE</DefenseLabel>
					</DefenseLabelContainer>
					<ShieldContainer $isMobile={isMobile}>
						<ShieldInput
							$isMobile={isMobile}
							type="number"
							data-field="manualAD"
							value={defenses.AD}
							onChange={(e) => handleInputChange('manualAD', e.target.value)}
							onBlur={(e) => handleInputBlur('manualAD', e.target.value)}
							onFocus={handleInputFocus}
							onClick={handleInputClick}
							placeholder={character.finalAD?.toString() || '0'}
						/>
					</ShieldContainer>
					<DefenseFooter $isMobile={isMobile}>
						{defenses.manualOverrides.AD !== undefined ? (
							<>
								<AutoCalculatedNote $isMobile={isMobile}>Manual override</AutoCalculatedNote>
								<RevertButton $isMobile={isMobile} onClick={() => handleRevert('manualAD')}>
									Revert to auto ({character.finalAD || 0})
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
