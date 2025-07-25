import React from 'react';
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

interface DefensesProps {
	characterData: {
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
	onUpdateManualDefense?: (field: 'manualPD' | 'manualPDR' | 'manualAD', value: number | undefined) => void;
}

const Defenses: React.FC<DefensesProps> = ({ characterData, calculatedDefenses, onUpdateManualDefense }) => {
	const handleInputChange = (field: 'manualPD' | 'manualPDR' | 'manualAD', value: string) => {
		if (!onUpdateManualDefense) return;
		
		const numValue = value === '' ? undefined : parseInt(value, 10);
		if (value !== '' && (isNaN(numValue!) || numValue! < 0)) return;
		
		onUpdateManualDefense(field, numValue);
	};

	const handleInputBlur = (field: 'manualPD' | 'manualPDR' | 'manualAD', value: string) => {
		if (!onUpdateManualDefense) return;
		
		// If field is empty, clear the manual override
		if (value === '') {
			onUpdateManualDefense(field, undefined);
		}
	};

	const handleRevert = (field: 'manualPD' | 'manualPDR' | 'manualAD') => {
		if (!onUpdateManualDefense) return;
		onUpdateManualDefense(field, undefined);
	};

	const getTooltip = (field: 'PD' | 'PDR' | 'AD'): string => {
		if (!calculatedDefenses) return '';
		
		const isManual = field === 'PD' ? characterData.manualPD !== undefined 
			: field === 'PDR' ? characterData.manualPDR !== undefined 
			: characterData.manualAD !== undefined;
		
		if (isManual) {
			const originalBreakdown = field === 'PD' ? calculatedDefenses.pdBreakdown 
				: field === 'PDR' ? calculatedDefenses.pdrBreakdown 
				: calculatedDefenses.adBreakdown;
			return `Manual Override (Original calculation: ${originalBreakdown})`;
		}
		
		return field === 'PD' ? calculatedDefenses.pdBreakdown 
			: field === 'PDR' ? calculatedDefenses.pdrBreakdown 
			: calculatedDefenses.adBreakdown;
	};

	return (
		<DefensesContainer>
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
							value={characterData.manualPD !== undefined ? characterData.manualPD : characterData.finalPD}
							onChange={(e) => handleInputChange('manualPD', e.target.value)}
							onBlur={(e) => handleInputBlur('manualPD', e.target.value)}
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
							value={characterData.manualPDR !== undefined ? characterData.manualPDR : (characterData.finalPDR || 0)}
							onChange={(e) => handleInputChange('manualPDR', e.target.value)}
							onBlur={(e) => handleInputBlur('manualPDR', e.target.value)}
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
								Revert to auto ({calculatedDefenses?.calculatedPDR || (characterData.finalPDR || 0)})
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
							value={characterData.manualAD !== undefined ? characterData.manualAD : characterData.finalAD}
							onChange={(e) => handleInputChange('manualAD', e.target.value)}
							onBlur={(e) => handleInputBlur('manualAD', e.target.value)}
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
	);
};

export default Defenses;
