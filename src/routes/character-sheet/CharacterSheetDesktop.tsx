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
			
			<div style={{ padding: '2rem', backgroundColor: 'rgba(255,255,255,0.9)', margin: '2rem', borderRadius: '8px' }}>
				{/* Character Header */}
				<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
					<h1 style={{ margin: '0', color: '#8b4513' }}>{characterData.finalName || 'Unnamed Character'}</h1>
					<h2 style={{ margin: '0.5rem 0', color: '#666' }}>
						Level {characterData.finalLevel || 1} {characterData.className}
						{characterData.ancestry1Name && (
							<span>
								{' • '}
								{characterData.ancestry1Name}
								{characterData.ancestry2Name && ` / ${characterData.ancestry2Name}`}
							</span>
						)}
					</h2>
				</div>

				{/* Character Stats */}
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
					<div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
						<div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Might</div>
						<div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalMight}</div>
					</div>
					<div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
						<div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Agility</div>
						<div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalAgility}</div>
					</div>
					<div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
						<div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Charisma</div>
						<div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalCharisma}</div>
					</div>
					<div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
						<div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Intelligence</div>
						<div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalIntelligence}</div>
					</div>
					<div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
						<div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Prime</div>
						<div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalPrimeModifierValue}</div>
					</div>
				</div>

				{/* Resources */}
				<div style={{ marginBottom: '2rem' }}>
					<h3 style={{ color: '#8b4513', borderBottom: '2px solid #8b4513', paddingBottom: '0.5rem' }}>Resources</h3>
					
					{/* HP */}
					<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
						<div style={{ fontWeight: 'bold', minWidth: '120px' }}>Hit Points:</div>
						<div style={{ minWidth: '100px' }}>
							{currentValues.currentHP} / {characterData.finalHPMax}
							{currentValues.tempHP > 0 && ` (+${currentValues.tempHP} temp)`}
						</div>
						<div style={{ flex: 1, height: '20px', backgroundColor: '#ddd', borderRadius: '10px', overflow: 'hidden' }}>
							<div 
								style={{ 
									height: '100%', 
									backgroundColor: '#4CAF50', 
									width: `${getHPFillPercentage(currentValues.currentHP, characterData.finalHPMax, currentValues.tempHP)}%`,
									transition: 'width 0.3s ease'
								}} 
							/>
						</div>
						<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
							<button onClick={() => adjustResource('currentHP', -1)} style={{ width: '30px', height: '30px' }}>-</button>
							<input
								type="number"
								value={currentValues.currentHP}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentHP', e.target.value)}
								style={{ width: '60px', textAlign: 'center' }}
							/>
							<button onClick={() => adjustResource('currentHP', 1)} style={{ width: '30px', height: '30px' }}>+</button>
						</div>
					</div>

					{/* Other resources with same pattern... */}
					{characterData.finalSPMax > 0 && (
						<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
							<div style={{ fontWeight: 'bold', minWidth: '120px' }}>Stamina Points:</div>
							<div style={{ minWidth: '100px' }}>
								{currentValues.currentSP} / {characterData.finalSPMax}
							</div>
							<div style={{ flex: 1, height: '20px', backgroundColor: '#ddd', borderRadius: '10px', overflow: 'hidden' }}>
								<div 
									style={{ 
										height: '100%', 
										backgroundColor: '#2196F3', 
										width: `${getFillPercentage(currentValues.currentSP, characterData.finalSPMax)}%`,
										transition: 'width 0.3s ease'
									}} 
								/>
							</div>
							<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
								<button onClick={() => adjustResource('currentSP', -1)} style={{ width: '30px', height: '30px' }}>-</button>
								<input
									type="number"
									value={currentValues.currentSP}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentSP', e.target.value)}
									style={{ width: '60px', textAlign: 'center' }}
								/>
								<button onClick={() => adjustResource('currentSP', 1)} style={{ width: '30px', height: '30px' }}>+</button>
							</div>
						</div>
					)}
				</div>

				{/* Features */}
				<div style={{ marginBottom: '2rem' }}>
					<h3 style={{ color: '#8b4513', borderBottom: '2px solid #8b4513', paddingBottom: '0.5rem' }}>Features & Traits</h3>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
						{features.map((feature) => (
							<div
								key={feature.id}
								onClick={() => openFeaturePopup(feature)}
								style={{
									padding: '0.75rem',
									backgroundColor: '#f9f9f9',
									borderRadius: '4px',
									cursor: 'pointer',
									border: '1px solid #ddd',
									transition: 'all 0.2s'
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.backgroundColor = '#f0f0f0';
									e.currentTarget.style.borderColor = '#8b4513';
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.backgroundColor = '#f9f9f9';
									e.currentTarget.style.borderColor = '#ddd';
								}}
							>
								<div style={{ fontWeight: 'bold', color: '#8b4513', marginBottom: '0.25rem' }}>{feature.name}</div>
								<div style={{ fontSize: '0.9rem', color: '#666' }}>{feature.sourceDetail}</div>
							</div>
						))}
					</div>
				</div>

				{/* Currency */}
				<div style={{ marginBottom: '2rem' }}>
					<h3 style={{ color: '#8b4513', borderBottom: '2px solid #8b4513', paddingBottom: '0.5rem' }}>Currency</h3>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
						<div style={{ textAlign: 'center' }}>
							<div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Gold</div>
							<input
								type="number"
								value={currentValues.goldPieces}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('goldPieces', parseInt(e.target.value) || 0)}
								style={{ width: '100%', textAlign: 'center', padding: '0.5rem' }}
							/>
						</div>
						<div style={{ textAlign: 'center' }}>
							<div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Silver</div>
							<input
								type="number"
								value={currentValues.silverPieces}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('silverPieces', parseInt(e.target.value) || 0)}
								style={{ width: '100%', textAlign: 'center', padding: '0.5rem' }}
							/>
						</div>
						<div style={{ textAlign: 'center' }}>
							<div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Copper</div>
							<input
								type="number"
								value={currentValues.copperPieces}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('copperPieces', parseInt(e.target.value) || 0)}
								style={{ width: '100%', textAlign: 'center', padding: '0.5rem' }}
							/>
						</div>
						<div style={{ textAlign: 'center' }}>
							<div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Electrum</div>
							<input
								type="number"
								value={currentValues.electrumPieces}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('electrumPieces', parseInt(e.target.value) || 0)}
								style={{ width: '100%', textAlign: 'center', padding: '0.5rem' }}
							/>
						</div>
						<div style={{ textAlign: 'center' }}>
							<div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Platinum</div>
							<input
								type="number"
								value={currentValues.platinumPieces}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('platinumPieces', parseInt(e.target.value) || 0)}
								style={{ width: '100%', textAlign: 'center', padding: '0.5rem' }}
							/>
						</div>
					</div>
				</div>
			</div>

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
