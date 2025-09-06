import React from 'react';
import {
	CurrencyContainer,
	CurrencyTitle,
	CurrencyRow,
	CurrencyIconContainer,
	CurrencyIcon,
	CurrencyLabel,
	CurrencyInput
} from '../styles/Currency';
import { useCharacterInventory, useCharacterSheet } from '../hooks/CharacterSheetProvider';

interface CurrencyProps {
	isMobile?: boolean;
}

const Currency: React.FC<CurrencyProps> = ({ isMobile = false }) => {
	const { updateCurrency } = useCharacterSheet();
	const inventory = useCharacterInventory();

	// Simple fix: check screen size if prop isn't passed correctly
	const effectiveIsMobile = isMobile || window.innerWidth <= 768;

	if (!inventory) {
		return (
			<div style={{ padding: '1rem', color: '#666', textAlign: 'center' }}>
				<p>Loading currency...</p>
			</div>
		);
	}

	const currency = inventory.currency;

		// Type guard for legacy/canonical currency
		const canonicalCurrency = {
			goldPieces:
				'goldPieces' in currency
					? currency.goldPieces
					: 'gold' in currency
					? currency.gold
					: 0,
			silverPieces:
				'silverPieces' in currency
					? currency.silverPieces
					: 'silver' in currency
					? currency.silver
					: 0,
			copperPieces:
				'copperPieces' in currency
					? currency.copperPieces
					: 'copper' in currency
					? currency.copper
					: 0,
		};

	const handleInputChange = (currencyType: string, value: string) => {
		const numValue = parseInt(value) || 0;
		
		switch (currencyType) {
			case 'goldPieces':
				updateCurrency(numValue, canonicalCurrency.silverPieces, canonicalCurrency.copperPieces);
				break;
			case 'silverPieces':
				updateCurrency(canonicalCurrency.goldPieces, numValue, canonicalCurrency.copperPieces);
				break;
			case 'copperPieces':
				updateCurrency(canonicalCurrency.goldPieces, canonicalCurrency.silverPieces, numValue);
				break;
		}
	};

	const currencyTypes = [
		{
			key: 'goldPieces',
			label: 'Gold',
			color: '#ffd700',
			borderColor: '#b8860b',
			value: canonicalCurrency.goldPieces
		},
		{
			key: 'silverPieces',
			label: 'Silver',
			color: '#c0c0c0',
			borderColor: '#a0a0a0',
			value: canonicalCurrency.silverPieces
		},
		{
			key: 'copperPieces',
			label: 'Copper',
			color: '#b87333',
			borderColor: '#8b4513',
			value: canonicalCurrency.copperPieces
		}
	];

	return (
		<CurrencyContainer isMobile={effectiveIsMobile}>
			<CurrencyTitle isMobile={effectiveIsMobile}>CURRENCY</CurrencyTitle>

			{currencyTypes.map(({ key, label, color, borderColor, value }) => (
				<CurrencyRow key={key} isMobile={effectiveIsMobile}>
					<CurrencyIconContainer isMobile={effectiveIsMobile}>
						<CurrencyIcon color={color} borderColor={borderColor} isMobile={effectiveIsMobile} />
						<CurrencyLabel isMobile={effectiveIsMobile}>{label}</CurrencyLabel>
					</CurrencyIconContainer>
					<CurrencyInput
						isMobile={effectiveIsMobile}
						type="number"
						min="0"
						value={value}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleInputChange(key, e.target.value)
						}
					/>
				</CurrencyRow>
			))}
		</CurrencyContainer>
	);
};

export default Currency;
