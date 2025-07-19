import React, { useState, useEffect } from 'react';

// Import styled components
import {
  StyledContainer,
  StyledBackButton,
  StyledCharacterSheet,
  StyledMainGrid,
  StyledLeftColumn,
  StyledMiddleColumn,
  StyledRightColumn
} from './styles/Layout';

import {
  StyledHeader,
  StyledHeaderSection,
  StyledLabel,
  StyledValue
} from './styles/Header';

import {
  StyledAttributeSection,
  StyledAttributeItem,
  StyledAttributeBox,
  StyledAttributeAbbr,
  StyledAttributeValue,
  StyledAttributeDetails,
  StyledAttributeName,
  StyledSaveBonus
} from './styles/Attributes';

import {
  StyledSkillsSection,
  StyledSkillItem,
  StyledProficiencyDots,
  StyledDot
} from './styles/Skills';

import {
  StyledResourcesSection,
  StyledResourceBox,
  StyledResourceIcon,
  StyledResourceControls,
  StyledResourceButton,
  StyledResourceInput
} from './styles/Resources';

import {
  StyledCombatSection,
  StyledDefenseGrid,
  StyledDefenseBox,
  StyledDefenseValue,
  StyledDefenseLabel,
  StyledActionPoints,
  StyledActionPoint
} from './styles/Combat';

import {
  StyledInfoSection,
  StyledSectionTitle,
  StyledStatRow,
  StyledStatLabel,
  StyledStatValue
} from './styles/Info';

// Types for character sheet data
interface CharacterSheetProps {
  characterId: string;
  onBack: () => void;
}

interface CharacterSheetData {
  // Basic Info
  finalName: string;
  finalPlayerName?: string;
  finalLevel: number;
  
  // Attributes
  finalMight: number;
  finalAgility: number;
  finalCharisma: number;
  finalIntelligence: number;
  
  // Calculated Stats
  finalPrimeModifierValue: number;
  finalPrimeModifierAttribute: string;
  finalCombatMastery: number;
  
  // Save Masteries (DC20 p.22)
  finalSaveMasteryMight: number;
  finalSaveMasteryAgility: number;
  finalSaveMasteryCharisma: number;
  finalSaveMasteryIntelligence: number;
  
  // Health & Resources
  finalHPMax: number;
  finalSPMax: number;
  finalMPMax: number;
  
  // Defenses
  finalPD: number;
  finalAD: number;
  
  // Other Stats
  finalSaveDC: number;
  finalDeathThreshold: number;
  finalMoveSpeed: number;
  finalJumpDistance: number;
  finalRestPoints: number;
  finalGritPoints: number;
  finalInitiativeBonus: number;
  
  // Class & Ancestry Info
  className: string;
  ancestry1Name?: string;
  ancestry2Name?: string;
  
  // JSON data fields
  skillsJson?: string;
  tradesJson?: string;
  languagesJson?: string;
}

interface SkillData {
  id: string;
  name: string;
  attribute: string;
  proficiency: number; // 0-5
}

interface TradeData {
  id: string;
  name: string;
  proficiency: number; // 0-5
}

interface LanguageData {
  id: string;
  name: string;
  fluency: 'limited' | 'fluent';
}

interface CurrentValues {
  currentHP: number;
  currentSP: number;
  currentMP: number;
  currentGritPoints: number;
  tempHP: number;
  actionPointsUsed: number;
}

// Character data service - this will be replaced with real API calls later
const getCharacterData = async (characterId: string): Promise<CharacterSheetData> => {
  // For now, return mock data based on characterId
  // In the future, this will make a real API call to the backend
  console.log('Loading character data for ID:', characterId);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock character data that matches the database structure
  const mockCharacters: Record<string, CharacterSheetData> = {
    'eldon-1': {
      finalName: "Eldon Brightleaf",
      finalPlayerName: "Clay",
      finalLevel: 1,
      finalMight: -1,
      finalAgility: 3,
      finalCharisma: 0,
      finalIntelligence: 3,
      finalPrimeModifierValue: 3,
      finalPrimeModifierAttribute: "AGI",
      finalCombatMastery: 1,
      // Save Masteries (assuming AGI and INT selected for Save Mastery)
      finalSaveMasteryMight: -1, // No Save Mastery: just attribute value
      finalSaveMasteryAgility: 4, // Save Mastery: 3 + 1 (CM)
      finalSaveMasteryCharisma: 0, // No Save Mastery: just attribute value
      finalSaveMasteryIntelligence: 4, // Save Mastery: 3 + 1 (CM)
      finalHPMax: 7,
      finalSPMax: 1,
      finalMPMax: 0,
      finalPD: 13,
      finalAD: 12,
      finalSaveDC: 14,
      finalDeathThreshold: 3,
      finalMoveSpeed: 5,
      finalJumpDistance: 3,
      finalRestPoints: 0,
      finalGritPoints: 2,
      finalInitiativeBonus: 4,
      className: "Ranger",
      ancestry1Name: "Agile Explorer",
      ancestry2Name: undefined,
      skillsJson: JSON.stringify({
        "athletics": 1,
        "intimidation": 0,
        "acrobatics": 3,
        "trickery": 3,
        "stealth": 5,
        "animal": 2,
        "influence": 0,
        "insight": 0,
        "investigation": 5,
        "medicine": 5,
        "survival": 5,
        "awareness": 3
      }),
      tradesJson: JSON.stringify({}),
      languagesJson: JSON.stringify({
        "common": { fluency: "fluent" },
        "elvish": { fluency: "fluent" }
      })
    },
    'demo-character': {
      finalName: "Demo Character",
      finalPlayerName: "Player",
      finalLevel: 1,
      finalMight: 1,
      finalAgility: 3,
      finalCharisma: 2,
      finalIntelligence: -2,
      finalPrimeModifierValue: 3,
      finalPrimeModifierAttribute: "AGI",
      finalCombatMastery: 1,
      // Save Masteries (assuming MIG and AGI selected for Save Mastery)
      finalSaveMasteryMight: 2, // Save Mastery: 1 + 1 (CM)
      finalSaveMasteryAgility: 4, // Save Mastery: 3 + 1 (CM)
      finalSaveMasteryCharisma: 2, // No Save Mastery: just attribute value
      finalSaveMasteryIntelligence: -2, // No Save Mastery: just attribute value
      finalHPMax: 10,
      finalSPMax: 3,
      finalMPMax: 2,
      finalPD: 14,
      finalAD: 13,
      finalSaveDC: 15,
      finalDeathThreshold: 5,
      finalMoveSpeed: 6,
      finalJumpDistance: 4,
      finalRestPoints: 1,
      finalGritPoints: 3,
      finalInitiativeBonus: 2,
      className: "Warrior",
      ancestry1Name: "Strong Fighter",
      ancestry2Name: undefined,
      skillsJson: JSON.stringify({
        "athletics": 4,
        "intimidation": 3,
        "acrobatics": 1,
        "insight": 2,
        "influence": 4
      }),
      tradesJson: JSON.stringify({
        "blacksmithing": 2
      }),
      languagesJson: JSON.stringify({
        "common": { fluency: "fluent" },
        "orcish": { fluency: "limited" }
      })
    }
  };

  const character = mockCharacters[characterId];
  if (!character) {
    throw new Error(`Character with ID "${characterId}" not found`);
  }

  return character;
};

const CharacterSheet: React.FC<CharacterSheetProps> = ({ characterId, onBack }) => {
  const [characterData, setCharacterData] = useState<CharacterSheetData | null>(null);
  const [currentValues, setCurrentValues] = useState<CurrentValues>({
    currentHP: 0,
    currentSP: 0,
    currentMP: 0,
    currentGritPoints: 0,
    tempHP: 0,
    actionPointsUsed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load character data
  useEffect(() => {
    const loadCharacterData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getCharacterData(characterId);
        setCharacterData(data);
        
        // Initialize current values with character's max values
        setCurrentValues({
          currentHP: data.finalHPMax,
          currentSP: data.finalSPMax,
          currentMP: data.finalMPMax,
          currentGritPoints: data.finalGritPoints,
          tempHP: 0,
          actionPointsUsed: 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadCharacterData();
  }, [characterId]);

  // Resource management functions
  const adjustResource = (resource: keyof CurrentValues, amount: number) => {
    setCurrentValues(prev => {
      const newValue = prev[resource] + amount;
      let maxValue = 999;
      
      switch (resource) {
        case 'currentHP':
          maxValue = characterData?.finalHPMax || 0;
          break;
        case 'currentSP':
          maxValue = characterData?.finalSPMax || 0;
          break;
        case 'currentMP':
          maxValue = characterData?.finalMPMax || 0;
          break;
        case 'currentGritPoints':
          maxValue = characterData?.finalGritPoints || 0;
          break;
        case 'actionPointsUsed':
          maxValue = 4; // Standard AP limit
          break;
      }
      
      return {
        ...prev,
        [resource]: Math.max(0, Math.min(newValue, maxValue))
      };
    });
  };

  const handleResourceInputChange = (resource: keyof CurrentValues, value: string) => {
    const numValue = parseInt(value) || 0;
    let maxValue = 999;
    
    switch (resource) {
      case 'currentHP':
        maxValue = characterData?.finalHPMax || 0;
        break;
      case 'currentSP':
        maxValue = characterData?.finalSPMax || 0;
        break;
      case 'currentMP':
        maxValue = characterData?.finalMPMax || 0;
        break;
      case 'currentGritPoints':
        maxValue = characterData?.finalGritPoints || 0;
        break;
      case 'actionPointsUsed':
        maxValue = 4;
        break;
    }
    
    setCurrentValues(prev => ({
      ...prev,
      [resource]: Math.max(0, Math.min(numValue, maxValue))
    }));
  };

  // Parse skills data from character
  const getSkillsData = (): SkillData[] => {
    if (!characterData?.skillsJson) {
      return [];
    }
    
    try {
      const skillsFromDB = JSON.parse(characterData.skillsJson);
      
      // Convert the database format to our component format
      return Object.entries(skillsFromDB).map(([skillId, proficiency]) => {
        // Map skill IDs to names and attributes based on the rules data
        const skillMapping: Record<string, { name: string; attribute: string }> = {
          'athletics': { name: 'Athletics', attribute: 'might' },
          'intimidation': { name: 'Intimidation', attribute: 'might' },
          'acrobatics': { name: 'Acrobatics', attribute: 'agility' },
          'trickery': { name: 'Trickery', attribute: 'agility' },
          'stealth': { name: 'Stealth', attribute: 'agility' },
          'animal': { name: 'Animal', attribute: 'charisma' },
          'influence': { name: 'Influence', attribute: 'charisma' },
          'insight': { name: 'Insight', attribute: 'charisma' },
          'investigation': { name: 'Investigation', attribute: 'intelligence' },
          'medicine': { name: 'Medicine', attribute: 'intelligence' },
          'survival': { name: 'Survival', attribute: 'intelligence' },
          'arcana': { name: 'Arcana', attribute: 'intelligence' },
          'history': { name: 'History', attribute: 'intelligence' },
          'nature': { name: 'Nature', attribute: 'intelligence' },
          'occultism': { name: 'Occultism', attribute: 'intelligence' },
          'religion': { name: 'Religion', attribute: 'intelligence' },
          'forgery': { name: 'Forgery', attribute: 'intelligence' },
          'awareness': { name: 'Awareness', attribute: 'prime' },
        };
        
        const skillInfo = skillMapping[skillId] || { name: skillId, attribute: 'intelligence' };
        
        return {
          id: skillId,
          name: skillInfo.name,
          attribute: skillInfo.attribute,
          proficiency: typeof proficiency === 'number' ? proficiency : 0
        };
      });
    } catch (error) {
      console.error('Error parsing skills JSON:', error);
      return [];
    }
  };

  // Get skills data from character or empty array if no character data
  const skills = characterData ? getSkillsData() : [];

  if (loading) {
    return (
      <StyledContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Loading character sheet...</h2>
        </div>
      </StyledContainer>
    );
  }

  if (error || !characterData) {
    return (
      <StyledContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Error loading character sheet</h2>
          <p>{error}</p>
          <StyledBackButton onClick={onBack}>← Back</StyledBackButton>
        </div>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledBackButton onClick={onBack}>← Back to Menu</StyledBackButton>
      
      <StyledCharacterSheet>
        {/* Header Section */}
        <StyledHeader>
          <StyledHeaderSection>
            <StyledLabel>Player Name</StyledLabel>
            <StyledValue>{characterData.finalPlayerName || 'Unknown'}</StyledValue>
            <StyledLabel style={{ marginTop: '0.5rem' }}>Character Name</StyledLabel>
            <StyledValue>{characterData.finalName}</StyledValue>
          </StyledHeaderSection>
          
          <StyledHeaderSection>
            <StyledLabel>Class & Subclass</StyledLabel>
            <StyledValue>{characterData.className}</StyledValue>
            <StyledLabel style={{ marginTop: '0.5rem' }}>Ancestry & Background</StyledLabel>
            <StyledValue>{characterData.ancestry1Name || 'Unknown'}</StyledValue>
          </StyledHeaderSection>
          
          <StyledHeaderSection>
            <StyledLabel>Level</StyledLabel>
            <StyledValue>{characterData.finalLevel}</StyledValue>
            <StyledLabel style={{ marginTop: '0.5rem' }}>Combat Mastery</StyledLabel>
            <StyledValue>+{characterData.finalCombatMastery}</StyledValue>
          </StyledHeaderSection>
          
          <div style={{ textAlign: 'center', alignSelf: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>DC20</div>
          </div>
        </StyledHeader>

        {/* Main Grid */}
        <StyledMainGrid>
          {/* Left Column - Attributes & Skills */}
          <StyledLeftColumn>
            {/* Attributes Section */}
            <StyledAttributeSection>
              <StyledSectionTitle>Attributes</StyledSectionTitle>
              
              {/* Might */}
              <StyledAttributeItem>
                <StyledAttributeBox>
                  <StyledAttributeAbbr>MIG</StyledAttributeAbbr>
                  <StyledAttributeValue>{characterData.finalMight}</StyledAttributeValue>
                </StyledAttributeBox>
                <StyledAttributeDetails>
                  <StyledAttributeName>Might</StyledAttributeName>
                  <StyledSaveBonus>Save {characterData.finalSaveMasteryMight >= 0 ? '+' : ''}{characterData.finalSaveMasteryMight}</StyledSaveBonus>
                </StyledAttributeDetails>
              </StyledAttributeItem>

              {/* Agility */}
              <StyledAttributeItem>
                <StyledAttributeBox>
                  <StyledAttributeAbbr>AGI</StyledAttributeAbbr>
                  <StyledAttributeValue>{characterData.finalAgility}</StyledAttributeValue>
                </StyledAttributeBox>
                <StyledAttributeDetails>
                  <StyledAttributeName>Agility</StyledAttributeName>
                  <StyledSaveBonus>Save {characterData.finalSaveMasteryAgility >= 0 ? '+' : ''}{characterData.finalSaveMasteryAgility}</StyledSaveBonus>
                </StyledAttributeDetails>
              </StyledAttributeItem>

              {/* Charisma */}
              <StyledAttributeItem>
                <StyledAttributeBox>
                  <StyledAttributeAbbr>CHA</StyledAttributeAbbr>
                  <StyledAttributeValue>{characterData.finalCharisma}</StyledAttributeValue>
                </StyledAttributeBox>
                <StyledAttributeDetails>
                  <StyledAttributeName>Charisma</StyledAttributeName>
                  <StyledSaveBonus>Save {characterData.finalSaveMasteryCharisma >= 0 ? '+' : ''}{characterData.finalSaveMasteryCharisma}</StyledSaveBonus>
                </StyledAttributeDetails>
              </StyledAttributeItem>

              {/* Intelligence */}
              <StyledAttributeItem>
                <StyledAttributeBox>
                  <StyledAttributeAbbr>INT</StyledAttributeAbbr>
                  <StyledAttributeValue>{characterData.finalIntelligence}</StyledAttributeValue>
                </StyledAttributeBox>
                <StyledAttributeDetails>
                  <StyledAttributeName>Intelligence</StyledAttributeName>
                  <StyledSaveBonus>Save {characterData.finalSaveMasteryIntelligence >= 0 ? '+' : ''}{characterData.finalSaveMasteryIntelligence}</StyledSaveBonus>
                </StyledAttributeDetails>
              </StyledAttributeItem>

              {/* Prime Modifier */}
              <div style={{ marginTop: '1rem', textAlign: 'center', padding: '0.5rem', border: '1px solid #8b4513', borderRadius: '4px', background: 'white' }}>
                <StyledLabel>Prime</StyledLabel>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {characterData.finalPrimeModifierAttribute} +{characterData.finalPrimeModifierValue}
                </div>
              </div>
            </StyledAttributeSection>

            {/* Skills Section */}
            <StyledSkillsSection>
              <StyledSectionTitle>Skills</StyledSectionTitle>
              {skills.map(skill => (
                <StyledSkillItem key={skill.id}>
                  <StyledProficiencyDots>
                    {[1, 2, 3, 4, 5].map(level => (
                      <StyledDot key={level} filled={level <= skill.proficiency} />
                    ))}
                  </StyledProficiencyDots>
                  <span>{skill.name}</span>
                  <span style={{ fontSize: '0.7rem', color: '#666' }}>
                    {skill.attribute.toUpperCase()}
                  </span>
                </StyledSkillItem>
              ))}
            </StyledSkillsSection>
          </StyledLeftColumn>

          {/* Middle Column - Resources & Combat */}
          <StyledMiddleColumn>
            {/* Resources Section */}
            <StyledResourcesSection>
              {/* Stamina Points */}
              <StyledResourceBox>
                <StyledResourceIcon bgColor="#3b82f6">SP</StyledResourceIcon>
                <StyledLabel>Stamina Points</StyledLabel>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', margin: '0.5rem 0' }}>
                  <StyledResourceInput
                    type="number"
                    value={currentValues.currentSP}
                    onChange={(e) => handleResourceInputChange('currentSP', e.target.value)}
                    min="0"
                    max={characterData.finalSPMax}
                  />
                  <span>/ {characterData.finalSPMax}</span>
                </div>
                <StyledResourceControls>
                  <StyledResourceButton variant="damage" onClick={() => adjustResource('currentSP', -1)}>-</StyledResourceButton>
                  <StyledResourceButton variant="heal" onClick={() => adjustResource('currentSP', 1)}>+</StyledResourceButton>
                </StyledResourceControls>
              </StyledResourceBox>

              {/* Mana Points */}
              <StyledResourceBox>
                <StyledResourceIcon bgColor="#8b5cf6">MP</StyledResourceIcon>
                <StyledLabel>Mana Points</StyledLabel>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', margin: '0.5rem 0' }}>
                  <StyledResourceInput
                    type="number"
                    value={currentValues.currentMP}
                    onChange={(e) => handleResourceInputChange('currentMP', e.target.value)}
                    min="0"
                    max={characterData.finalMPMax}
                  />
                  <span>/ {characterData.finalMPMax}</span>
                </div>
                <StyledResourceControls>
                  <StyledResourceButton variant="damage" onClick={() => adjustResource('currentMP', -1)}>-</StyledResourceButton>
                  <StyledResourceButton variant="heal" onClick={() => adjustResource('currentMP', 1)}>+</StyledResourceButton>
                </StyledResourceControls>
              </StyledResourceBox>

              {/* Hit Points */}
              <StyledResourceBox>
                <StyledResourceIcon bgColor="#22c55e">♥</StyledResourceIcon>
                <StyledLabel>Hit Points</StyledLabel>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', margin: '0.5rem 0' }}>
                  <StyledResourceInput
                    type="number"
                    value={currentValues.currentHP}
                    onChange={(e) => handleResourceInputChange('currentHP', e.target.value)}
                    min="0"
                    max={characterData.finalHPMax}
                  />
                  <span>/ {characterData.finalHPMax}</span>
                </div>
                <div style={{ fontSize: '0.8rem', margin: '0.3rem 0' }}>
                  Temp: 
                  <StyledResourceInput
                    type="number"
                    value={currentValues.tempHP}
                    onChange={(e) => handleResourceInputChange('tempHP', e.target.value)}
                    min="0"
                    style={{ width: '35px', marginLeft: '0.3rem' }}
                  />
                </div>
                <StyledResourceControls>
                  <StyledResourceButton variant="damage" onClick={() => adjustResource('currentHP', -1)}>-1</StyledResourceButton>
                  <StyledResourceButton variant="damage" onClick={() => adjustResource('currentHP', -5)}>-5</StyledResourceButton>
                  <StyledResourceButton variant="heal" onClick={() => adjustResource('currentHP', 1)}>+1</StyledResourceButton>
                  <StyledResourceButton variant="heal" onClick={() => adjustResource('currentHP', 5)}>+5</StyledResourceButton>
                </StyledResourceControls>
              </StyledResourceBox>
            </StyledResourcesSection>

            {/* Defenses */}
            <StyledDefenseGrid>
              <StyledDefenseBox>
                <StyledDefenseValue>{characterData.finalPD}</StyledDefenseValue>
                <StyledDefenseLabel>Physical Defense</StyledDefenseLabel>
              </StyledDefenseBox>
              <StyledDefenseBox>
                <StyledDefenseValue>{characterData.finalAD}</StyledDefenseValue>
                <StyledDefenseLabel>Mystical Defense</StyledDefenseLabel>
              </StyledDefenseBox>
            </StyledDefenseGrid>

            {/* Combat Section */}
            <StyledCombatSection>
              <StyledSectionTitle>Combat</StyledSectionTitle>
              
              {/* Action Points */}
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <StyledLabel>Action Points</StyledLabel>
                <StyledActionPoints>
                  {[0, 1, 2, 3].map(index => (
                    <StyledActionPoint
                      key={index}
                      used={index < currentValues.actionPointsUsed}
                      onClick={() => {
                        const newUsed = index < currentValues.actionPointsUsed 
                          ? index 
                          : index + 1;
                        setCurrentValues(prev => ({ ...prev, actionPointsUsed: newUsed }));
                      }}
                    >
                      {index + 1}
                    </StyledActionPoint>
                  ))}
                </StyledActionPoints>
              </div>

              <StyledStatRow>
                <StyledStatLabel>Attack/Spell Check</StyledStatLabel>
                <StyledStatValue>CM + Prime</StyledStatValue>
              </StyledStatRow>
              <StyledStatRow>
                <StyledStatLabel>Save DC</StyledStatLabel>
                <StyledStatValue>{characterData.finalSaveDC}</StyledStatValue>
              </StyledStatRow>
              <StyledStatRow>
                <StyledStatLabel>Martial Check</StyledStatLabel>
                <StyledStatValue>ATT + AP/3</StyledStatValue>
              </StyledStatRow>
            </StyledCombatSection>

            {/* Death & Exhaustion */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <StyledInfoSection>
                <StyledSectionTitle>Death</StyledSectionTitle>
                <div style={{ textAlign: 'center' }}>
                  <StyledLabel>Death Threshold</StyledLabel>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b4513' }}>
                    -{characterData.finalDeathThreshold}
                  </div>
                </div>
              </StyledInfoSection>
              
              <StyledInfoSection>
                <StyledSectionTitle>Exhaustion</StyledSectionTitle>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem' }}>
                  {[1, 2, 3, 4, 5].map(level => (
                    <div key={level} style={{ 
                      width: '15px', 
                      height: '15px', 
                      border: '1px solid #8b4513', 
                      background: 'white' 
                    }} />
                  ))}
                </div>
              </StyledInfoSection>
            </div>
          </StyledMiddleColumn>

          {/* Right Column - Additional Info */}
          <StyledRightColumn>
            {/* Movement & Utility */}
            <StyledInfoSection>
              <StyledSectionTitle>Movement & Utility</StyledSectionTitle>
              <StyledStatRow>
                <StyledStatLabel>Move Speed</StyledStatLabel>
                <StyledStatValue>{characterData.finalMoveSpeed}</StyledStatValue>
              </StyledStatRow>
              <StyledStatRow>
                <StyledStatLabel>Jump Distance</StyledStatLabel>
                <StyledStatValue>{characterData.finalJumpDistance}</StyledStatValue>
              </StyledStatRow>
            </StyledInfoSection>

            {/* Resources */}
            <StyledInfoSection>
              <StyledSectionTitle>Resources</StyledSectionTitle>
              <StyledStatRow>
                <StyledStatLabel>Rest Points</StyledStatLabel>
                <StyledStatValue>{characterData.finalRestPoints}</StyledStatValue>
              </StyledStatRow>
              <StyledStatRow>
                <StyledStatLabel>Grit Points</StyledStatLabel>
                <StyledStatValue>
                  <StyledResourceInput
                    type="number"
                    value={currentValues.currentGritPoints}
                    onChange={(e) => handleResourceInputChange('currentGritPoints', e.target.value)}
                    style={{ width: '30px' }}
                  />
                  / {characterData.finalGritPoints}
                </StyledStatValue>
              </StyledStatRow>
            </StyledInfoSection>

            {/* Features */}
            <StyledInfoSection style={{ flex: 1 }}>
              <StyledSectionTitle>Features</StyledSectionTitle>
              <div style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Class Features:</strong> Based on {characterData.className}
                </div>
                <div>
                  <strong>Ancestry Traits:</strong> {characterData.ancestry1Name}
                </div>
              </div>
            </StyledInfoSection>
          </StyledRightColumn>
        </StyledMainGrid>
      </StyledCharacterSheet>
    </StyledContainer>
  );
};

export default CharacterSheet;
