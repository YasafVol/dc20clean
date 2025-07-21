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

interface CurrencyProps {
  currentValues: {
    platinumPieces: number;
    goldPieces: number;
    electrumPieces: number;
    silverPieces: number;
    copperPieces: number;
  };
  onCurrencyChange: (currency: string, value: number) => void;
}

const Currency: React.FC<CurrencyProps> = ({ currentValues, onCurrencyChange }) => {
  const handleInputChange = (currency: string, value: string) => {
    onCurrencyChange(currency, parseInt(value) || 0);
  };

  const currencyTypes = [
    { 
      key: 'platinumPieces', 
      label: 'Platinum', 
      color: '#e5e4e2', 
      borderColor: '#d3d3d3', 
      value: currentValues.platinumPieces 
    },
    { 
      key: 'goldPieces', 
      label: 'Gold', 
      color: '#ffd700', 
      borderColor: '#b8860b', 
      value: currentValues.goldPieces 
    },
    { 
      key: 'electrumPieces', 
      label: 'Electrum', 
      color: '#daa520', 
      borderColor: '#b8860b', 
      value: currentValues.electrumPieces 
    },
    { 
      key: 'silverPieces', 
      label: 'Silver', 
      color: '#c0c0c0', 
      borderColor: '#a0a0a0', 
      value: currentValues.silverPieces 
    },
    { 
      key: 'copperPieces', 
      label: 'Copper', 
      color: '#b87333', 
      borderColor: '#8b4513', 
      value: currentValues.copperPieces 
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(key, e.target.value)}
          />
        </CurrencyRow>
      ))}
    </CurrencyContainer>
  );
};

export default Currency;
