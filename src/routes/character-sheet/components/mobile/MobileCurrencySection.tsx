import React from 'react';
import {
	MobileSection,
	MobileSectionTitle,
	MobileCurrencyGrid,
	MobileCurrencyItem,
	MobileCurrencyLabel,
	MobileCurrencyInput
} from '../../styles/CharacterSheetMobile.styles';
import { getCurrencyValue } from '../../utils/mobileCharacterSheetUtils';

interface MobileCurrencySectionProps {
	currency: any;
	updateCurrency: (currencyType: string, value: number) => void;
}

const MobileCurrencySection: React.FC<MobileCurrencySectionProps> = ({
	currency,
	updateCurrency
}) => {
	const handleCurrencyChange = (type: 'gold' | 'silver' | 'copper', value: string) => {
		const numValue = parseInt(value) || 0;
		updateCurrency(type, numValue);
	};

	return (
		<MobileSection>
			<MobileSectionTitle>Currency</MobileSectionTitle>
			<MobileCurrencyGrid>
				<MobileCurrencyItem>
					<MobileCurrencyLabel>Gold</MobileCurrencyLabel>
					<MobileCurrencyInput
						type="number"
						value={getCurrencyValue(currency, 'gold')}
						onChange={(e) => handleCurrencyChange('gold', e.target.value)}
					/>
				</MobileCurrencyItem>
				<MobileCurrencyItem>
					<MobileCurrencyLabel>Silver</MobileCurrencyLabel>
					<MobileCurrencyInput
						type="number"
						value={getCurrencyValue(currency, 'silver')}
						onChange={(e) => handleCurrencyChange('silver', e.target.value)}
					/>
				</MobileCurrencyItem>
				<MobileCurrencyItem>
					<MobileCurrencyLabel>Copper</MobileCurrencyLabel>
					<MobileCurrencyInput
						type="number"
						value={getCurrencyValue(currency, 'copper')}
						onChange={(e) => handleCurrencyChange('copper', e.target.value)}
					/>
				</MobileCurrencyItem>
			</MobileCurrencyGrid>
		</MobileSection>
	);
};

export default MobileCurrencySection;
