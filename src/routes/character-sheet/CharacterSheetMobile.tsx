import React from 'react';
import { useCharacterSheet } from './hooks/CharacterSheetProvider';

// Import Modal Components  
import FeaturePopup from './components/FeaturePopup';
import SpellPopup from './components/SpellPopup';
import AttackPopup from './components/AttackPopup';
import InventoryPopup from './components/InventoryPopup';

// Mobile-specific styled components
import styled from 'styled-components';

const MobileContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	background: #1a1a1a;
	color: white;
	width: 100vw;
	max-width: 100vw;
	overflow-x: hidden;
	box-sizing: border-box;
	contain: layout;
	position: relative;
`;

const MobileHeader = styled.div`
	background: #2a2a2a;
	padding: 1rem;
	text-align: center;
	border-bottom: 2px solid #444;
`;

const MobileCharacterName = styled.h1`
	margin: 0;
	font-size: 1.5rem;
	color: #f5d020;
`;

const MobileCharacterInfo = styled.p`
	margin: 0.5rem 0 0 0;
	font-size: 1rem;
	color: #ccc;
`;

const MobileNavigation = styled.div`
	display: flex;
	background: #333;
	border-top: 1px solid #444;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	width: 100%;
	max-width: 100vw;
	box-sizing: border-box;
`;

const MobileNavButton = styled.button<{ $active: boolean }>`
	flex: 1;
	max-width: 25vw;
	padding: 0.75rem 0.25rem;
	background: ${props => props.$active ? '#f5d020' : '#333'};
	color: ${props => props.$active ? '#000' : '#fff'};
	border: none;
	font-size: 0.8rem;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.2s;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	min-width: 0;
	box-sizing: border-box;

	&:hover {
		background: ${props => props.$active ? '#f5d020' : '#444'};
	}
`;

const MobileContent = styled.div`
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 1rem;
	padding-bottom: 7rem; /* Extra space to account for fixed bottom navigation */
	width: 100vw;
	max-width: 100vw;
	box-sizing: border-box;
	contain: layout;
	position: relative;
`;

const MobileSection = styled.div`
	margin-bottom: 2rem;
	width: 100%;
	max-width: 100vw;
	overflow: hidden;
	box-sizing: border-box;
`;

const MobileSectionTitle = styled.h2`
	color: #f5d020;
	font-size: 1.25rem;
	margin-bottom: 1rem;
	border-bottom: 1px solid #444;
	padding-bottom: 0.5rem;
`;

const MobileStatGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
	gap: 0.5rem;
	margin-bottom: 1.5rem;
	width: 100%;
	max-width: 100vw;
	overflow: hidden;
	box-sizing: border-box;
`;

const MobileStatBox = styled.div`
	background: #2a2a2a;
	padding: 1rem;
	border-radius: 8px;
	text-align: center;
	border: 1px solid #444;
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	box-sizing: border-box;
`;

const MobileStatLabel = styled.div`
	font-size: 0.8rem;
	color: #ccc;
	margin-bottom: 0.25rem;
`;

const MobileStatValue = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: #f5d020;
`;

const MobileResourceBox = styled.div`
	background: #2a2a2a;
	border: 1px solid #444;
	border-radius: 8px;
	padding: 1rem;
	margin-bottom: 1rem;
`;

const MobileResourceHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
`;

const MobileResourceLabel = styled.div`
	font-weight: bold;
	color: #f5d020;
`;

const MobileResourceValue = styled.div`
	color: #ccc;
`;

const MobileResourceBar = styled.div`
	width: 100%;
	height: 8px;
	background: #444;
	border-radius: 4px;
	overflow: hidden;
	margin-bottom: 0.5rem;
`;

const MobileResourceFill = styled.div<{ $percentage: number }>`
	width: ${props => props.$percentage}%;
	height: 100%;
	background: linear-gradient(90deg, #4CAF50, #8BC34A);
	transition: width 0.3s ease;
`;

const MobileResourceControls = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

const MobileResourceButton = styled.button`
	width: 40px;
	height: 40px;
	border: none;
	background: #444;
	color: white;
	border-radius: 4px;
	font-size: 1.2rem;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background: #555;
	}

	&:active {
		background: #666;
	}
`;

const MobileResourceInput = styled.input`
	flex: 1;
	padding: 0.5rem;
	background: #333;
	border: 1px solid #555;
	color: white;
	text-align: center;
	border-radius: 4px;
`;

const MobileItemGrid = styled.div`
	display: grid;
	gap: 0.75rem;
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	box-sizing: border-box;
`;

const MobileItem = styled.div`
	background: #2a2a2a;
	border: 1px solid #444;
	border-radius: 8px;
	padding: 1rem;
	cursor: pointer;
	transition: all 0.2s;
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	box-sizing: border-box;

	&:hover {
		background: #333;
		border-color: #f5d020;
	}
`;

const MobileItemName = styled.div`
	font-weight: bold;
	color: #f5d020;
	margin-bottom: 0.25rem;
	word-wrap: break-word;
	overflow-wrap: break-word;
	hyphens: auto;
`;

const MobileItemDetails = styled.div`
	font-size: 0.9rem;
	color: #ccc;
	word-wrap: break-word;
	overflow-wrap: break-word;
	hyphens: auto;
`;

type MobileSectionType = 'character' | 'combat' | 'features' | 'info';

interface CharacterSheetMobileProps {
	characterId: string;
}

export const CharacterSheetMobile: React.FC<CharacterSheetMobileProps> = ({ characterId }) => {
	// Use the EXACT same hook as desktop - zero duplication!
	const {
		characterData,
		currentValues,
		loading,
		error,
		selectedFeature,
		selectedSpell,
		selectedAttack,
		selectedInventoryItem,
		attacks,
		spells,
		inventory,
		activeMobileSection,
		setActiveMobileSection,
		trades,
		knowledge,
		languages,
		features,
		skillsByAttribute,
		adjustResource,
		handleResourceInputChange,
		openFeaturePopup,
		closeFeaturePopup,
		openSpellPopup,
		closeSpellPopup,
		openAttackPopup,
		closeAttackPopup,
		openInventoryPopup,
		closeInventoryPopup,
		handleCurrencyChange,
		handleExhaustionChange,
		handleDeathStepChange,
		getFillPercentage,
		getHPFillPercentage
	} = useCharacterSheet(characterId);

	// Loading state
	if (loading) {
		return (
			<MobileContainer>
				<MobileContent>Loading character data...</MobileContent>
			</MobileContainer>
		);
	}

	// Error state
	if (error) {
		return (
			<MobileContainer>
				<MobileContent>Error: {error}</MobileContent>
			</MobileContainer>
		);
	}

	// No character data
	if (!characterData) {
		return (
			<MobileContainer>
				<MobileContent>Character not found</MobileContent>
			</MobileContainer>
		);
	}

	const renderCharacterSection = () => (
		<MobileContent>
			{/* Character Stats */}
			<MobileSection>
				<MobileSectionTitle>Attributes</MobileSectionTitle>
				<MobileStatGrid>
					<MobileStatBox>
						<MobileStatLabel>Might</MobileStatLabel>
						<MobileStatValue>{characterData.finalMight}</MobileStatValue>
					</MobileStatBox>
					<MobileStatBox>
						<MobileStatLabel>Agility</MobileStatLabel>
						<MobileStatValue>{characterData.finalAgility}</MobileStatValue>
					</MobileStatBox>
					<MobileStatBox>
						<MobileStatLabel>Charisma</MobileStatLabel>
						<MobileStatValue>{characterData.finalCharisma}</MobileStatValue>
					</MobileStatBox>
					<MobileStatBox>
						<MobileStatLabel>Intelligence</MobileStatLabel>
						<MobileStatValue>{characterData.finalIntelligence}</MobileStatValue>
					</MobileStatBox>
					<MobileStatBox>
						<MobileStatLabel>Prime</MobileStatLabel>
						<MobileStatValue>{characterData.finalPrimeModifierValue}</MobileStatValue>
					</MobileStatBox>
				</MobileStatGrid>
			</MobileSection>

			{/* Resources */}
			<MobileSection>
				<MobileSectionTitle>Resources</MobileSectionTitle>
				
				{/* HP */}
				<MobileResourceBox>
					<MobileResourceHeader>
						<MobileResourceLabel>Hit Points</MobileResourceLabel>
						<MobileResourceValue>
							{currentValues.currentHP} / {characterData.finalHPMax}
							{currentValues.tempHP > 0 && ` (+${currentValues.tempHP} temp)`}
						</MobileResourceValue>
					</MobileResourceHeader>
					<MobileResourceBar>
						<MobileResourceFill
							$percentage={getHPFillPercentage(
								currentValues.currentHP,
								characterData.finalHPMax,
								currentValues.tempHP
							)}
						/>
					</MobileResourceBar>
					<MobileResourceControls>
						<MobileResourceButton onClick={() => adjustResource('currentHP', -1)}>-</MobileResourceButton>
						<MobileResourceInput
							type="number"
							value={currentValues.currentHP}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentHP', e.target.value)}
						/>
						<MobileResourceButton onClick={() => adjustResource('currentHP', 1)}>+</MobileResourceButton>
					</MobileResourceControls>
				</MobileResourceBox>

				{/* Temp HP */}
				<MobileResourceBox>
					<MobileResourceHeader>
						<MobileResourceLabel>Temporary HP</MobileResourceLabel>
						<MobileResourceValue>{currentValues.tempHP}</MobileResourceValue>
					</MobileResourceHeader>
					<MobileResourceControls>
						<MobileResourceButton onClick={() => adjustResource('tempHP', -1)}>-</MobileResourceButton>
						<MobileResourceInput
							type="number"
							value={currentValues.tempHP}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('tempHP', e.target.value)}
						/>
						<MobileResourceButton onClick={() => adjustResource('tempHP', 1)}>+</MobileResourceButton>
					</MobileResourceControls>
				</MobileResourceBox>

				{/* SP */}
				{characterData.finalSPMax > 0 && (
					<MobileResourceBox>
						<MobileResourceHeader>
							<MobileResourceLabel>Stamina Points</MobileResourceLabel>
							<MobileResourceValue>
								{currentValues.currentSP} / {characterData.finalSPMax}
							</MobileResourceValue>
						</MobileResourceHeader>
						<MobileResourceBar>
							<MobileResourceFill
								$percentage={getFillPercentage(currentValues.currentSP, characterData.finalSPMax)}
							/>
						</MobileResourceBar>
						<MobileResourceControls>
							<MobileResourceButton onClick={() => adjustResource('currentSP', -1)}>-</MobileResourceButton>
							<MobileResourceInput
								type="number"
								value={currentValues.currentSP}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentSP', e.target.value)}
							/>
							<MobileResourceButton onClick={() => adjustResource('currentSP', 1)}>+</MobileResourceButton>
						</MobileResourceControls>
					</MobileResourceBox>
				)}

				{/* MP */}
				{characterData.finalMPMax > 0 && (
					<MobileResourceBox>
						<MobileResourceHeader>
							<MobileResourceLabel>Mana Points</MobileResourceLabel>
							<MobileResourceValue>
								{currentValues.currentMP} / {characterData.finalMPMax}
							</MobileResourceValue>
						</MobileResourceHeader>
						<MobileResourceBar>
							<MobileResourceFill
								$percentage={getFillPercentage(currentValues.currentMP, characterData.finalMPMax)}
							/>
						</MobileResourceBar>
						<MobileResourceControls>
							<MobileResourceButton onClick={() => adjustResource('currentMP', -1)}>-</MobileResourceButton>
							<MobileResourceInput
								type="number"
								value={currentValues.currentMP}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentMP', e.target.value)}
							/>
							<MobileResourceButton onClick={() => adjustResource('currentMP', 1)}>+</MobileResourceButton>
						</MobileResourceControls>
					</MobileResourceBox>
				)}
			</MobileSection>

			{/* Currency */}
			<MobileSection>
				<MobileSectionTitle>Currency</MobileSectionTitle>
				<MobileStatGrid>
					<MobileStatBox>
						<MobileStatLabel>Gold</MobileStatLabel>
						<MobileResourceInput
							type="number"
							value={currentValues.goldPieces}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('goldPieces', parseInt(e.target.value) || 0)}
						/>
					</MobileStatBox>
					<MobileStatBox>
						<MobileStatLabel>Silver</MobileStatLabel>
						<MobileResourceInput
							type="number"
							value={currentValues.silverPieces}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('silverPieces', parseInt(e.target.value) || 0)}
						/>
					</MobileStatBox>
					<MobileStatBox>
						<MobileStatLabel>Copper</MobileStatLabel>
						<MobileResourceInput
							type="number"
							value={currentValues.copperPieces}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('copperPieces', parseInt(e.target.value) || 0)}
						/>
					</MobileStatBox>
				</MobileStatGrid>
			</MobileSection>
		</MobileContent>
	);

	const renderCombatSection = () => (
		<MobileContent>
			{/* Attacks */}
			<MobileSection>
				<MobileSectionTitle>Attacks</MobileSectionTitle>
				<MobileItemGrid>
					{attacks.map((attack) => (
						<MobileItem
							key={attack.id}
							onClick={() => openAttackPopup(attack, null)}
						>
							<MobileItemName>{attack.name || 'Unnamed Attack'}</MobileItemName>
							<MobileItemDetails>
								{attack.weaponName && <div>Weapon: {attack.weaponName}</div>}
								{attack.damage && <div>Damage: {attack.damage}</div>}
								{attack.attackBonus !== 0 && <div>Bonus: +{attack.attackBonus}</div>}
							</MobileItemDetails>
						</MobileItem>
					))}
				</MobileItemGrid>
			</MobileSection>

			{/* Action Points */}
			<MobileSection>
				<MobileSectionTitle>Action Points Used</MobileSectionTitle>
				<MobileStatGrid>
					{[1, 2, 3, 4].map((point) => (
						<MobileStatBox
							key={point}
							style={{
								background: currentValues.actionPointsUsed >= point ? '#f5d020' : '#2a2a2a',
								color: currentValues.actionPointsUsed >= point ? '#000' : '#fff',
								cursor: 'pointer'
							}}
							onClick={() =>
								adjustResource(
									'actionPointsUsed',
									currentValues.actionPointsUsed >= point ? -1 : 1
								)
							}
						>
							<MobileStatValue>{point}</MobileStatValue>
						</MobileStatBox>
					))}
				</MobileStatGrid>
			</MobileSection>

			{/* Exhaustion */}
			<MobileSection>
				<MobileSectionTitle>Exhaustion Level</MobileSectionTitle>
				<MobileStatGrid>
					{[1, 2, 3, 4, 5].map((level) => (
						<MobileStatBox
							key={level}
							style={{
								background: currentValues.exhaustionLevel >= level ? '#ff4444' : '#2a2a2a',
								color: currentValues.exhaustionLevel >= level ? '#fff' : '#ccc',
								cursor: 'pointer'
							}}
							onClick={() => handleExhaustionChange(level)}
						>
							<MobileStatValue>{level}</MobileStatValue>
						</MobileStatBox>
					))}
				</MobileStatGrid>
			</MobileSection>

			{/* Health Status / Death Steps */}
			<MobileSection>
				<MobileSectionTitle>Death Steps</MobileSectionTitle>
				<MobileStatGrid>
					{[1, 2, 3, 4, 5].map((step) => (
						<MobileStatBox
							key={step}
							style={{
								background: currentValues.currentHP === -step ? '#ff4444' : '#2a2a2a',
								color: currentValues.currentHP === -step ? '#fff' : '#ccc',
								cursor: 'pointer'
							}}
							onClick={() => handleDeathStepChange(step)}
						>
							<MobileStatLabel>Step</MobileStatLabel>
							<MobileStatValue>{step}</MobileStatValue>
						</MobileStatBox>
					))}
				</MobileStatGrid>
			</MobileSection>
		</MobileContent>
	);

	const renderFeaturesSection = () => (
		<MobileContent>
			{/* Features */}
			<MobileSection>
				<MobileSectionTitle>Features & Traits</MobileSectionTitle>
				<MobileItemGrid>
					{features.map((feature) => (
						<MobileItem
							key={feature.id}
							onClick={() => openFeaturePopup(feature)}
						>
							<MobileItemName>{feature.name}</MobileItemName>
							<MobileItemDetails>{feature.sourceDetail}</MobileItemDetails>
						</MobileItem>
					))}
				</MobileItemGrid>
			</MobileSection>

			{/* Spells */}
			{spells.length > 0 && (
				<MobileSection>
					<MobileSectionTitle>Spells</MobileSectionTitle>
					<MobileItemGrid>
						{spells.map((spell) => (
							<MobileItem
								key={spell.id}
								onClick={() => openSpellPopup(spell as any)}
							>
								<MobileItemName>{(spell as any).name || 'Unnamed Spell'}</MobileItemName>
								<MobileItemDetails>Level: {(spell as any).level || '?'}</MobileItemDetails>
							</MobileItem>
						))}
					</MobileItemGrid>
				</MobileSection>
			)}

			{/* Inventory */}
			{inventory.length > 0 && (
				<MobileSection>
					<MobileSectionTitle>Inventory</MobileSectionTitle>
					<MobileItemGrid>
						{inventory.map((item) => (
							<MobileItem
								key={item.id}
								onClick={() => openInventoryPopup(item, null)}
							>
								<MobileItemName>{item.name}</MobileItemName>
								<MobileItemDetails>
									{item.quantity && <div>Qty: {item.quantity}</div>}
									{item.weight && <div>Weight: {item.weight}</div>}
								</MobileItemDetails>
							</MobileItem>
						))}
					</MobileItemGrid>
				</MobileSection>
			)}
		</MobileContent>
	);

	const renderInfoSection = () => (
		<MobileContent>
			{/* Skills */}
			<MobileSection>
				<MobileSectionTitle>Skills</MobileSectionTitle>
				{Object.entries(skillsByAttribute).map(([attribute, skills]) => (
					<div key={attribute}>
						<h3 style={{ color: '#f5d020', marginBottom: '0.5rem' }}>
							{attribute.charAt(0).toUpperCase() + attribute.slice(1)}
						</h3>
						<MobileItemGrid>
							{skills.map((skill) => (
								<MobileItem key={skill.id}>
									<MobileItemName>{skill.name}</MobileItemName>
									<MobileItemDetails>
										Bonus: {skill.bonus >= 0 ? '+' : ''}{skill.bonus}
									</MobileItemDetails>
								</MobileItem>
							))}
						</MobileItemGrid>
					</div>
				))}
			</MobileSection>

			{/* Trades */}
			{trades.length > 0 && (
				<MobileSection>
					<MobileSectionTitle>Trades</MobileSectionTitle>
					<MobileItemGrid>
						{trades.map((trade) => (
							<MobileItem key={trade.id}>
								<MobileItemName>{trade.name}</MobileItemName>
								<MobileItemDetails>
									Bonus: {trade.bonus >= 0 ? '+' : ''}{trade.bonus}
								</MobileItemDetails>
							</MobileItem>
						))}
					</MobileItemGrid>
				</MobileSection>
			)}

			{/* Knowledge */}
			{knowledge.length > 0 && (
				<MobileSection>
					<MobileSectionTitle>Knowledge</MobileSectionTitle>
					<MobileItemGrid>
						{knowledge.map((know) => (
							<MobileItem key={know.id}>
								<MobileItemName>{know.name}</MobileItemName>
								<MobileItemDetails>
									Bonus: {know.bonus >= 0 ? '+' : ''}{know.bonus}
								</MobileItemDetails>
							</MobileItem>
						))}
					</MobileItemGrid>
				</MobileSection>
			)}

			{/* Languages */}
			{languages.length > 0 && (
				<MobileSection>
					<MobileSectionTitle>Languages</MobileSectionTitle>
					<MobileItemGrid>
						{languages.map((language) => (
							<MobileItem key={language.id}>
								<MobileItemName>{language.name}</MobileItemName>
								<MobileItemDetails>Fluency: {language.fluency}</MobileItemDetails>
							</MobileItem>
						))}
					</MobileItemGrid>
				</MobileSection>
			)}
		</MobileContent>
	);

	return (
		<MobileContainer>
			{/* Header */}
			<MobileHeader>
				<MobileCharacterName>{characterData.name || 'Unnamed Character'}</MobileCharacterName>
				<MobileCharacterInfo>
					Level {characterData.level || 1} {characterData.className}
					{characterData.ancestry1Name && (
						<span>
							{' • '}
							{characterData.ancestry1Name}
							{characterData.ancestry2Name && ` / ${characterData.ancestry2Name}`}
						</span>
					)}
				</MobileCharacterInfo>
			</MobileHeader>

			{/* Navigation */}
			<MobileNavigation>
				<MobileNavButton
					$active={activeMobileSection === 'character'}
					onClick={() => setActiveMobileSection('character')}
				>
					Character
				</MobileNavButton>
				<MobileNavButton
					$active={activeMobileSection === 'combat'}
					onClick={() => setActiveMobileSection('combat')}
				>
					Combat
				</MobileNavButton>
				<MobileNavButton
					$active={activeMobileSection === 'features'}
					onClick={() => setActiveMobileSection('features')}
				>
					Features
				</MobileNavButton>
				<MobileNavButton
					$active={activeMobileSection === 'info'}
					onClick={() => setActiveMobileSection('info')}
				>
					Info
				</MobileNavButton>
			</MobileNavigation>

			{/* Content based on active section */}
			{activeMobileSection === 'character' && renderCharacterSection()}
			{activeMobileSection === 'combat' && renderCombatSection()}
			{activeMobileSection === 'features' && renderFeaturesSection()}
			{activeMobileSection === 'info' && renderInfoSection()}

			{/* Modal Popups - same as desktop! */}
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
					attack={selectedAttack.attack}
					weapon={selectedAttack.weapon}
					onClose={closeAttackPopup}
				/>
			)}

			{selectedInventoryItem && (
				<InventoryPopup
					inventoryData={selectedInventoryItem.inventoryData}
					item={selectedInventoryItem.item}
					onClose={closeInventoryPopup}
				/>
			)}
		</MobileContainer>
	);
};

export default CharacterSheetMobile;
