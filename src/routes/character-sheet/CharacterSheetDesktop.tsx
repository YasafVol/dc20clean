import React, { useState } from 'react';

// Import custom hook with all character sheet logic
import { useCharacterSheet, useCharacterResources, useCharacterFeatures, useCharacterCurrency } from './hooks/CharacterSheetProvider';

// Import Modal Components  
import FeaturePopup from './components/FeaturePopup';
import SpellPopup from './components/SpellPopup';
import AttackPopup from './components/AttackPopup';
import InventoryPopup from './components/InventoryPopup';

// Import existing styled components that actually exist
import { StyledContainer, StyledBackButton } from './styles/Layout';

// Import desktop-specific styled components
import {
	StyledDesktopWrapper,
	StyledDesktopHeader,
	StyledCharacterName,
	StyledCharacterSubtitle,
	StyledAttributesGrid,
	StyledAttributeCard,
	StyledAttributeLabel,
	StyledAttributeValue,
	StyledSection,
	StyledSectionTitle,
	StyledResourceRow,
	StyledResourceLabel,
	StyledResourceValue,
	StyledResourceBar,
	StyledResourceFill,
	StyledResourceControls,
	StyledResourceButton,
	StyledResourceInput,
	StyledFeaturesGrid,
	StyledFeatureCard,
	StyledFeatureName,
	StyledFeatureSource,
	StyledCurrencyGrid,
	StyledCurrencyColumn,
	StyledCurrencyLabel,
	StyledCurrencyInput
} from './styles/DesktopLayout';

export const CharacterSheetDesktop: React.FC<{ characterId: string; onBack?: () => void }> = ({ onBack }) => {
	// Use the Context hooks
	const { state, updateHP, updateSP, updateMP, updateTempHP, updateActionPoints, updateCurrency, setManualDefense } = useCharacterSheet();
	const resources = useCharacterResources();
	const features = useCharacterFeatures();
	const currency = useCharacterCurrency();
	
	// Local popup state
	const [selectedFeature, setSelectedFeature] = useState<any>(null);
	const [selectedSpell, setSelectedSpell] = useState<any>(null);
	const [selectedAttack, setSelectedAttack] = useState<any>(null);
	const [selectedInventoryItem, setSelectedInventoryItem] = useState<any>(null);
	
	// Helper functions
	const adjustResource = (resource: string, amount: number) => {
		if (!resources) return;
		const current = resources.current;
		
		switch (resource) {
			case 'currentHP':
				updateHP(Math.max(0, current.currentHP + amount));
				break;
			case 'currentSP':
				updateSP(Math.max(0, current.currentSP + amount));
				break;
			case 'currentMP':
				updateMP(Math.max(0, current.currentMP + amount));
				break;
			case 'tempHP':
				updateTempHP(Math.max(0, current.tempHP + amount));
				break;
		}
	};
	
	const handleResourceInputChange = (resource: string, value: string) => {
		const numValue = parseInt(value) || 0;
		switch (resource) {
			case 'currentHP':
				updateHP(Math.max(0, numValue));
				break;
			case 'currentSP':
				updateSP(Math.max(0, numValue));
				break;
			case 'currentMP':
				updateMP(Math.max(0, numValue));
				break;
			case 'tempHP':
				updateTempHP(Math.max(0, numValue));
				break;
		}
	};
	
	const handleCurrencyChange = (currencyType: string, value: number) => {
		const updates: any = {};
		updates[currencyType.replace('Pieces', '')] = value;
		updateCurrency(updates.gold, updates.silver, updates.copper);
	};
	
	const getFillPercentage = (current: number, max: number) => {
		return max > 0 ? (current / max) * 100 : 0;
	};
	
	const getHPFillPercentage = (current: number, max: number, temp: number) => {
		return max > 0 ? ((current + temp) / max) * 100 : 0;
	};
	
	const openFeaturePopup = (feature: any) => setSelectedFeature(feature);
	const closeFeaturePopup = () => setSelectedFeature(null);
	const closeSpellPopup = () => setSelectedSpell(null);
	const closeAttackPopup = () => setSelectedAttack(null);
	const closeInventoryPopup = () => setSelectedInventoryItem(null);
	
	const loading = state.loading;
	const error = state.error;
	const characterData = state.character;

	// Loading state
	if (loading) {
		return (
			<StyledContainer>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
					Loading character data...
				</div>
			</StyledContainer>
		);
	}

	// Error state
	if (error) {
		return (
			<StyledContainer>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'red' }}>
					Error: {error}
				</div>
			</StyledContainer>
		);
	}

	// No character data
	if (!characterData) {
		return (
			<StyledContainer>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
					Character not found
				</div>
			</StyledContainer>
		);
	}

	return (
		<StyledContainer>
			{onBack && (
				<StyledBackButton onClick={onBack}>
					← Back to Menu
				</StyledBackButton>
			)}
			
			<StyledDesktopWrapper>
				{/* Character Header */}
				<StyledDesktopHeader>
					<StyledCharacterName>{characterData.finalName || 'Unnamed Character'}</StyledCharacterName>
					<StyledCharacterSubtitle>
						Level {characterData.finalLevel || 1} {characterData.className}
						{characterData.ancestry1Name && (
							<span>
								{' • '}
								{characterData.ancestry1Name}
								{characterData.ancestry2Name && ` / ${characterData.ancestry2Name}`}
							</span>
						)}
					</StyledCharacterSubtitle>
				</StyledDesktopHeader>

				{/* Character Stats */}
				<StyledAttributesGrid>
					<StyledAttributeCard>
						<StyledAttributeLabel>Might</StyledAttributeLabel>
						<StyledAttributeValue>{characterData.finalMight}</StyledAttributeValue>
					</StyledAttributeCard>
					<StyledAttributeCard>
						<StyledAttributeLabel>Agility</StyledAttributeLabel>
						<StyledAttributeValue>{characterData.finalAgility}</StyledAttributeValue>
					</StyledAttributeCard>
					<StyledAttributeCard>
						<StyledAttributeLabel>Charisma</StyledAttributeLabel>
						<StyledAttributeValue>{characterData.finalCharisma}</StyledAttributeValue>
					</StyledAttributeCard>
					<StyledAttributeCard>
						<StyledAttributeLabel>Intelligence</StyledAttributeLabel>
						<StyledAttributeValue>{characterData.finalIntelligence}</StyledAttributeValue>
					</StyledAttributeCard>
					<StyledAttributeCard>
						<StyledAttributeLabel>Prime</StyledAttributeLabel>
						<StyledAttributeValue>{characterData.finalPrimeModifierValue}</StyledAttributeValue>
					</StyledAttributeCard>
				</StyledAttributesGrid>

				{/* Resources */}
				<StyledSection>
					<StyledSectionTitle>Resources</StyledSectionTitle>
					
					{/* HP */}
					{resources && (
						<StyledResourceRow>
							<StyledResourceLabel>Hit Points:</StyledResourceLabel>
							<StyledResourceValue>
								{resources.current.currentHP} / {resources.original.maxHP}
								{resources.current.tempHP > 0 && ` (+${resources.current.tempHP} temp)`}
							</StyledResourceValue>
							<StyledResourceBar>
								<StyledResourceFill 
									fillPercent={getHPFillPercentage(resources.current.currentHP, resources.original.maxHP, resources.current.tempHP)}
									color="#4CAF50"
								/>
							</StyledResourceBar>
							<StyledResourceControls>
								<StyledResourceButton onClick={() => adjustResource('currentHP', -1)}>-</StyledResourceButton>
								<StyledResourceInput
									type="number"
									value={resources.current.currentHP}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentHP', e.target.value)}
								/>
								<StyledResourceButton onClick={() => adjustResource('currentHP', 1)}>+</StyledResourceButton>
							</StyledResourceControls>
						</StyledResourceRow>
					)}

					{/* SP */}
					{resources && resources.original.maxSP > 0 && (
						<StyledResourceRow>
							<StyledResourceLabel>Stamina Points:</StyledResourceLabel>
							<StyledResourceValue>
								{resources.current.currentSP} / {resources.original.maxSP}
							</StyledResourceValue>
							<StyledResourceBar>
								<StyledResourceFill 
									fillPercent={getFillPercentage(resources.current.currentSP, resources.original.maxSP)}
									color="#2196F3"
								/>
							</StyledResourceBar>
							<StyledResourceControls>
								<StyledResourceButton onClick={() => adjustResource('currentSP', -1)}>-</StyledResourceButton>
								<StyledResourceInput
									type="number"
									value={resources.current.currentSP}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentSP', e.target.value)}
								/>
								<StyledResourceButton onClick={() => adjustResource('currentSP', 1)}>+</StyledResourceButton>
							</StyledResourceControls>
						</StyledResourceRow>
					)}

					{/* MP */}
					{resources && resources.original.maxMP > 0 && (
						<StyledResourceRow>
							<StyledResourceLabel>Mana Points:</StyledResourceLabel>
							<StyledResourceValue>
								{resources.current.currentMP} / {resources.original.maxMP}
							</StyledResourceValue>
							<StyledResourceBar>
								<StyledResourceFill 
									fillPercent={getFillPercentage(resources.current.currentMP, resources.original.maxMP)}
									color="#9C27B0"
								/>
							</StyledResourceBar>
							<StyledResourceControls>
								<StyledResourceButton onClick={() => adjustResource('currentMP', -1)}>-</StyledResourceButton>
								<StyledResourceInput
									type="number"
									value={resources.current.currentMP}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentMP', e.target.value)}
								/>
								<StyledResourceButton onClick={() => adjustResource('currentMP', 1)}>+</StyledResourceButton>
							</StyledResourceControls>
						</StyledResourceRow>
					)}
				</StyledSection>

				{/* Features */}
				<StyledSection>
					<StyledSectionTitle>Features & Traits</StyledSectionTitle>
					<StyledFeaturesGrid>
						{features.map((feature) => (
							<StyledFeatureCard
								key={feature.id}
								onClick={() => openFeaturePopup(feature)}
							>
								<StyledFeatureName>{feature.name}</StyledFeatureName>
								<StyledFeatureSource>{feature.sourceDetail}</StyledFeatureSource>
							</StyledFeatureCard>
						))}
					</StyledFeaturesGrid>
				</StyledSection>

				{/* Currency */}
				<StyledSection>
					<StyledSectionTitle>Currency</StyledSectionTitle>
					<StyledCurrencyGrid>
						<StyledCurrencyColumn>
							<StyledCurrencyLabel>Gold</StyledCurrencyLabel>
							<StyledCurrencyInput
								type="number"
								value={currency.gold}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('goldPieces', parseInt(e.target.value) || 0)}
							/>
						</StyledCurrencyColumn>
						<StyledCurrencyColumn>
							<StyledCurrencyLabel>Silver</StyledCurrencyLabel>
							<StyledCurrencyInput
								type="number"
								value={currency.silver}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('silverPieces', parseInt(e.target.value) || 0)}
							/>
						</StyledCurrencyColumn>
						<StyledCurrencyColumn>
							<StyledCurrencyLabel>Copper</StyledCurrencyLabel>
							<StyledCurrencyInput
								type="number"
								value={currency.copper}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('copperPieces', parseInt(e.target.value) || 0)}
							/>
						</StyledCurrencyColumn>
					</StyledCurrencyGrid>
				</StyledSection>
			</StyledDesktopWrapper>

			{/* Modal Popups - same as mobile! */}
			{selectedFeature && (
				<FeaturePopup
					feature={selectedFeature}
					onClose={closeFeaturePopup}
				/>
			)}

			{selectedSpell && (
				<SpellPopup
					spell={selectedSpell}
					onClose={closeSpellPopup}
				/>
			)}

			{selectedAttack && (
				<AttackPopup
					selectedAttack={selectedAttack}
					onClose={closeAttackPopup}
				/>
			)}

			{selectedInventoryItem && (
				<InventoryPopup
					selectedInventoryItem={selectedInventoryItem}
					onClose={closeInventoryPopup}
				/>
			)}
		</StyledContainer>
	);
};

export default CharacterSheetDesktop;
