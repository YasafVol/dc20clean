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
	// No props needed - uses context
}

const Currency: React.FC<CurrencyProps> = () => {
	const { updateCurrency } = useCharacterSheet();
	const inventory = useCharacterInventory();

	if (!inventory) {
		return (
			<div style={{ padding: '1rem', color: '#666', textAlign: 'center' }}>
				<p>Loading currency...</p>
			</div>
		);
	}

	const currency = inventory.currency;

	const handleInputChange = (currencyType: string, value: string) => {
		const numValue = parseInt(value) || 0;
		
		switch (currencyType) {
			case 'goldPieces':
				updateCurrency(numValue, currency.silver, currency.copper);
				break;
			case 'silverPieces':
				updateCurrency(currency.gold, numValue, currency.copper);
				break;
			case 'copperPieces':
				updateCurrency(currency.gold, currency.silver, numValue);
				break;
		}
	};

	const currencyTypes = [
		{
			key: 'goldPieces',
			label: 'Gold',
			color: '#ffd700',
			borderColor: '#b8860b',
			value: currency.gold || 0
		},
		{
			key: 'silverPieces',
			label: 'Silver',
			color: '#c0c0c0',
			borderColor: '#a0a0a0',
			value: currency.silver || 0
		},
		{
			key: 'copperPieces',
			label: 'Copper',
			color: '#b87333',
			borderColor: '#8b4513',
			value: currency.copper || 0
		}
	];

	return (
		<CurrencyContainer>
			<CurrencyTitle>CURRENCY</CurrencyTitle>

			{currencyTypes.map(({ key, label, color, borderColor, value }) => (
				<CurrencyRow key={key}>
					<CurrencyIconContainer>
						<CurrencyIcon color={color} borderColor={borderColor} />
						<CurrencyLabel>{label}</CurrencyLabel>
					</CurrencyIconContainer>
					<CurrencyInput
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
