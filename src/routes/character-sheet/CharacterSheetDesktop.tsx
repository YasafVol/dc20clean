import React from 'react';

// Import custom hook with all character sheet logic
import { useCharacterSheet } from './hooks/useCharacterSheet';

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

export const CharacterSheetDesktop: React.FC<{ characterId: string; onBack?: () => void }> = ({ characterId, onBack }) => {
	// Use the custom hook to get ALL data and logic
	const {
		characterData,
		currentValues,
		loading,
		error,
		selectedFeature,
		selectedSpell,
		selectedAttack,
		selectedInventoryItem,
		features,
		adjustResource,
		handleResourceInputChange,
		openFeaturePopup,
		closeFeaturePopup,
		closeSpellPopup,
		closeAttackPopup,
		closeInventoryPopup,
		handleCurrencyChange,
		getFillPercentage,
		getHPFillPercentage
	} = useCharacterSheet(characterId);

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
					<StyledResourceRow>
						<StyledResourceLabel>Hit Points:</StyledResourceLabel>
						<StyledResourceValue>
							{currentValues.currentHP} / {characterData.finalHPMax}
							{currentValues.tempHP > 0 && ` (+${currentValues.tempHP} temp)`}
						</StyledResourceValue>
						<StyledResourceBar>
							<StyledResourceFill 
								fillPercent={getHPFillPercentage(currentValues.currentHP, characterData.finalHPMax, currentValues.tempHP)}
								color="#4CAF50"
							/>
						</StyledResourceBar>
						<StyledResourceControls>
							<StyledResourceButton onClick={() => adjustResource('currentHP', -1)}>-</StyledResourceButton>
							<StyledResourceInput
								type="number"
								value={currentValues.currentHP}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentHP', e.target.value)}
							/>
							<StyledResourceButton onClick={() => adjustResource('currentHP', 1)}>+</StyledResourceButton>
						</StyledResourceControls>
					</StyledResourceRow>

					{/* Other resources with same pattern... */}
					{characterData.finalSPMax > 0 && (
						<StyledResourceRow>
							<StyledResourceLabel>Stamina Points:</StyledResourceLabel>
							<StyledResourceValue>
								{currentValues.currentSP} / {characterData.finalSPMax}
							</StyledResourceValue>
							<StyledResourceBar>
								<StyledResourceFill 
									fillPercent={getFillPercentage(currentValues.currentSP, characterData.finalSPMax)}
									color="#2196F3"
								/>
							</StyledResourceBar>
							<StyledResourceControls>
								<StyledResourceButton onClick={() => adjustResource('currentSP', -1)}>-</StyledResourceButton>
								<StyledResourceInput
									type="number"
									value={currentValues.currentSP}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentSP', e.target.value)}
								/>
								<StyledResourceButton onClick={() => adjustResource('currentSP', 1)}>+</StyledResourceButton>
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
								value={currentValues.goldPieces}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('goldPieces', parseInt(e.target.value) || 0)}
							/>
						</StyledCurrencyColumn>
						<StyledCurrencyColumn>
							<StyledCurrencyLabel>Silver</StyledCurrencyLabel>
							<StyledCurrencyInput
								type="number"
								value={currentValues.silverPieces}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('silverPieces', parseInt(e.target.value) || 0)}
							/>
						</StyledCurrencyColumn>
						<StyledCurrencyColumn>
							<StyledCurrencyLabel>Copper</StyledCurrencyLabel>
							<StyledCurrencyInput
								type="number"
								value={currentValues.copperPieces}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('copperPieces', parseInt(e.target.value) || 0)}
							/>
						</StyledCurrencyColumn>
						<StyledCurrencyColumn>
							<StyledCurrencyLabel>Electrum</StyledCurrencyLabel>
							<StyledCurrencyInput
								type="number"
								value={currentValues.electrumPieces}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('electrumPieces', parseInt(e.target.value) || 0)}
							/>
						</StyledCurrencyColumn>
						<StyledCurrencyColumn>
							<StyledCurrencyLabel>Platinum</StyledCurrencyLabel>
							<StyledCurrencyInput
								type="number"
								value={currentValues.platinumPieces}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('platinumPieces', parseInt(e.target.value) || 0)}
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
