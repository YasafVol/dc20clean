import React, { useState, useEffect } from 'react';

// Import rules data
import { skillsData } from '../../lib/rulesdata/skills';
import { tradesData } from '../../lib/rulesdata/trades';
import { knowledgeData } from '../../lib/rulesdata/knowledge';

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
  StyledProficiencyDots,
  StyledDot
} from './styles/Skills';

import {
  StyledResourceButton,
  StyledResourceInput,
  StyledTempHPInput
} from './styles/Resources';

import {
  StyledPotionContainer,
  StyledPotionFill,
  StyledPotionBubbles,
  StyledPotionValue,
  StyledLargePotionContainer,
  StyledLargePotionValue,
  StyledTempHPDisplay
} from './styles/Potions';

// Types for character sheet data
interface CharacterSheetProps {
  characterId: string;
  onBack: () => void;
}

interface CharacterSheetData {
  // Basic Info
  id: string;
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

// Character data service - fetches from localStorage and uses already calculated stats
const getCharacterData = async (characterId: string): Promise<CharacterSheetData> => {
  console.log('Loading character data for ID:', characterId);
  
  // Get characters from localStorage
  const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
  
  // Find the character by ID
  const character = savedCharacters.find((char: any) => char.id === characterId);
  
  if (!character) {
    throw new Error(`Character with ID "${characterId}" not found in localStorage`);
  }
  
  // Return the character data as-is since it's already calculated
  return character;
};

// Save character current values back to localStorage
const saveCharacterData = (characterId: string, currentValues: CurrentValues) => {
  const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
  const characterIndex = savedCharacters.findIndex((char: any) => char.id === characterId);
  
  if (characterIndex !== -1) {
    // Update the character's current values
    savedCharacters[characterIndex] = {
      ...savedCharacters[characterIndex],
      currentHP: currentValues.currentHP,
      currentSP: currentValues.currentSP,
      currentMP: currentValues.currentMP,
      currentGritPoints: currentValues.currentGritPoints,
      tempHP: currentValues.tempHP,
      actionPointsUsed: currentValues.actionPointsUsed,
      lastModified: new Date().toISOString()
    };
    
    localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
    console.log('Character saved to localStorage. Total characters:', savedCharacters.length);
  }
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

  // Resource management functions with auto-save
  const adjustResource = (resource: keyof CurrentValues, amount: number) => {
    setCurrentValues(prev => {
      const newValue = prev[resource] + amount;
      let maxValue = 999;
      
      switch (resource) {
        case 'currentHP':
          // HP can go up to normal max + temp HP
          maxValue = (characterData?.finalHPMax || 0) + prev.tempHP;
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
      
      const newValues = {
        ...prev,
        [resource]: Math.max(0, Math.min(newValue, maxValue))
      };
      
      // Special case: when reducing temp HP, cap current HP to new effective max
      if (resource === 'tempHP' && amount < 0) {
        const newEffectiveMaxHP = (characterData?.finalHPMax || 0) + newValues.tempHP;
        if (prev.currentHP > newEffectiveMaxHP) {
          newValues.currentHP = newEffectiveMaxHP;
        }
      }
      
      // Save to localStorage after state update
      if (characterData?.id) {
        setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
      }
      
      return newValues;
    });
  };

  const handleResourceInputChange = (resource: keyof CurrentValues, value: string) => {
    const numValue = parseInt(value) || 0;
    let maxValue = 999;
    
    switch (resource) {
      case 'currentHP':
        // HP can go up to normal max + temp HP
        maxValue = (characterData?.finalHPMax || 0) + currentValues.tempHP;
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
    
    setCurrentValues(prev => {
      const newValues = {
        ...prev,
        [resource]: Math.max(0, Math.min(numValue, maxValue))
      };
      
      // Special case: when changing temp HP directly, cap current HP to new effective max
      if (resource === 'tempHP') {
        const newEffectiveMaxHP = (characterData?.finalHPMax || 0) + newValues.tempHP;
        if (prev.currentHP > newEffectiveMaxHP) {
          newValues.currentHP = newEffectiveMaxHP;
        }
      }
      
      // Save to localStorage after state update
      if (characterData?.id) {
        setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
      }
      
      return newValues;
    });
  };

  // Parse skills data from character - show ALL skills with their proficiency levels
  const getSkillsData = (): SkillData[] => {
    // Parse character's skill proficiencies (if any)
    let characterSkills: Record<string, number> = {};
    if (characterData?.skillsJson) {
      try {
        characterSkills = JSON.parse(characterData.skillsJson);
      } catch (error) {
        console.error('Error parsing skills JSON:', error);
      }
    }
    
    // Create skill data for ALL skills from rules data, merging with character's proficiencies
    return skillsData.map(skill => ({
      id: skill.id,
      name: skill.name,
      attribute: skill.attributeAssociation,
      proficiency: characterSkills[skill.id] || 0 // Default to 0 if not found
    }));
  };

  // Parse trades data from character - show ONLY selected trades with their proficiency levels
  const getTradesData = (): TradeData[] => {
    // Parse character's trade proficiencies (if any)
    let characterTrades: Record<string, number> = {};
    if (characterData?.tradesJson) {
      try {
        characterTrades = JSON.parse(characterData.tradesJson);
      } catch (error) {
        console.error('Error parsing trades JSON:', error);
      }
    }
    
    // Only show trades that have been selected (proficiency > 0) from tradesData only
    return tradesData
      .filter(trade => characterTrades[trade.id] && characterTrades[trade.id] > 0)
      .map(trade => ({
        id: trade.id,
        name: trade.name,
        proficiency: characterTrades[trade.id] || 0
      }));
  };

  // Parse knowledge data from character - show ALL knowledge with their proficiency levels
  const getKnowledgeData = (): TradeData[] => {
    // Parse character's trade proficiencies (if any) - knowledge is stored in tradesJson
    let characterTrades: Record<string, number> = {};
    if (characterData?.tradesJson) {
      try {
        characterTrades = JSON.parse(characterData.tradesJson);
      } catch (error) {
        console.error('Error parsing trades JSON:', error);
      }
    }
    
    // Show ALL knowledge skills with their proficiency levels
    return knowledgeData.map(knowledge => ({
      id: knowledge.id,
      name: knowledge.name,
      proficiency: characterTrades[knowledge.id] || 0 // Default to 0 if not found
    }));
  };

  // Parse languages data from character
  const getLanguagesData = (): LanguageData[] => {
    if (!characterData?.languagesJson) {
      return [];
    }
    
    try {
      const languagesFromDB = JSON.parse(characterData.languagesJson);
      
      return Object.entries(languagesFromDB).map(([langId, data]: [string, any]) => ({
        id: langId,
        name: langId.charAt(0).toUpperCase() + langId.slice(1), // Capitalize first letter
        fluency: data.fluency === 'fluent' ? 'fluent' : 'limited'
      }));
    } catch (error) {
      console.error('Error parsing languages JSON:', error);
      return [];
    }
  };

  // Helper function to safely calculate fill percentage
  const getFillPercentage = (current: number, max: number): number => {
    if (max === 0) return 0;
    return Math.max(0, Math.min(100, (current / max) * 100));
  };

  // Helper function for HP fill percentage (shows current HP vs total effective HP)
  const getHPFillPercentage = (currentHP: number, maxHP: number, tempHP: number): number => {
    const totalEffectiveHP = maxHP + tempHP;
    if (totalEffectiveHP === 0) return 0;
    return Math.max(0, (currentHP / totalEffectiveHP) * 100);
  };

  // Group skills by attribute like in the official sheet
  const getSkillsByAttribute = () => {
    const skills = getSkillsData();
    return {
      might: skills.filter(skill => skill.attribute === 'might'),
      agility: skills.filter(skill => skill.attribute === 'agility'),
      charisma: skills.filter(skill => skill.attribute === 'charisma'),
      intelligence: skills.filter(skill => skill.attribute === 'intelligence'),
      prime: skills.filter(skill => skill.attribute === 'prime')
    };
  };

  // Get data from character or empty defaults if no character data
  const trades = characterData ? getTradesData() : [];
  const knowledge = characterData ? getKnowledgeData() : [];
  const languages = characterData ? getLanguagesData() : [];
  const skillsByAttribute = characterData ? getSkillsByAttribute() : { might: [], agility: [], charisma: [], intelligence: [], prime: [] };

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

        {/* Main Grid - DC20 Official Layout */}
        <StyledMainGrid>
          {/* Left Column - Attributes with Skills */}
          <StyledLeftColumn>
            {/* Prime Modifier & Awareness */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '0.5rem', border: '2px solid #8b4513', borderRadius: '8px', background: '#f5f5dc', marginBottom: '0.5rem' }}>
                <StyledLabel style={{ color: '#8b4513', fontWeight: 'bold' }}>Prime</StyledLabel>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8b4513' }}>
                  {characterData.finalPrimeModifierAttribute} +{characterData.finalPrimeModifierValue}
                </div>
              </div>
              
              {/* Awareness (Prime skill) */}
              {skillsByAttribute.prime.map(skill => (
                <div key={skill.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem', border: '1px solid #8b4513', borderRadius: '4px', background: 'white', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>{skill.name.toUpperCase()}</span>
                  <StyledProficiencyDots>
                    {[1, 2, 3, 4, 5].map(level => (
                      <StyledDot key={level} filled={level <= skill.proficiency} />
                    ))}
                  </StyledProficiencyDots>
                </div>
              ))}
            </div>

            {/* Might Section */}
            <div style={{ marginBottom: '1rem', border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '60px', height: '60px', border: '2px solid #8b4513', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5dc', marginRight: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513' }}>MIG</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalMight}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.2rem' }}>MIGHT</div>
                  <div style={{ fontSize: '0.9rem', color: '#8b4513' }}>SAVE +{characterData.finalSaveMasteryMight}</div>
                </div>
              </div>
              
              {/* Might Skills */}
              {skillsByAttribute.might.map(skill => (
                <div key={skill.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem', border: '1px solid #8b4513', borderRadius: '4px', background: '#f9f9f9', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>{skill.name.toUpperCase()}</span>
                  <StyledProficiencyDots>
                    {[1, 2, 3, 4, 5].map(level => (
                      <StyledDot key={level} filled={level <= skill.proficiency} />
                    ))}
                  </StyledProficiencyDots>
                </div>
              ))}
            </div>

            {/* Agility Section */}
            <div style={{ marginBottom: '1rem', border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '60px', height: '60px', border: '2px solid #8b4513', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5dc', marginRight: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513' }}>AGI</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalAgility}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.2rem' }}>AGILITY</div>
                  <div style={{ fontSize: '0.9rem', color: '#8b4513' }}>SAVE +{characterData.finalSaveMasteryAgility}</div>
                </div>
              </div>
              
              {/* Agility Skills */}
              {skillsByAttribute.agility.map(skill => (
                <div key={skill.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem', border: '1px solid #8b4513', borderRadius: '4px', background: '#f9f9f9', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>{skill.name.toUpperCase()}</span>
                  <StyledProficiencyDots>
                    {[1, 2, 3, 4, 5].map(level => (
                      <StyledDot key={level} filled={level <= skill.proficiency} />
                    ))}
                  </StyledProficiencyDots>
                </div>
              ))}
            </div>

            {/* Charisma Section */}
            <div style={{ marginBottom: '1rem', border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '60px', height: '60px', border: '2px solid #8b4513', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5dc', marginRight: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513' }}>CHA</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalCharisma}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.2rem' }}>CHARISMA</div>
                  <div style={{ fontSize: '0.9rem', color: '#8b4513' }}>SAVE +{characterData.finalSaveMasteryCharisma}</div>
                </div>
              </div>
              
              {/* Charisma Skills */}
              {skillsByAttribute.charisma.map(skill => (
                <div key={skill.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem', border: '1px solid #8b4513', borderRadius: '4px', background: '#f9f9f9', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>{skill.name.toUpperCase()}</span>
                  <StyledProficiencyDots>
                    {[1, 2, 3, 4, 5].map(level => (
                      <StyledDot key={level} filled={level <= skill.proficiency} />
                    ))}
                  </StyledProficiencyDots>
                </div>
              ))}
            </div>

            {/* Intelligence Section */}
            <div style={{ marginBottom: '1rem', border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '60px', height: '60px', border: '2px solid #8b4513', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5dc', marginRight: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513' }}>INT</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalIntelligence}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.2rem' }}>INTELLIGENCE</div>
                  <div style={{ fontSize: '0.9rem', color: '#8b4513' }}>SAVE +{characterData.finalSaveMasteryIntelligence}</div>
                </div>
              </div>
              
              {/* Intelligence Skills */}
              {skillsByAttribute.intelligence.map(skill => (
                <div key={skill.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem', border: '1px solid #8b4513', borderRadius: '4px', background: '#f9f9f9', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>{skill.name.toUpperCase()}</span>
                  <StyledProficiencyDots>
                    {[1, 2, 3, 4, 5].map(level => (
                      <StyledDot key={level} filled={level <= skill.proficiency} />
                    ))}
                  </StyledProficiencyDots>
                </div>
              ))}
            </div>

            {/* Knowledge Section */}
            <div style={{ marginBottom: '1rem', border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.5rem', textAlign: 'center' }}>KNOWLEDGE</div>
              <div style={{ fontSize: '0.8rem', color: '#8b4513', marginBottom: '0.5rem', textAlign: 'center' }}>Intelligence-based knowledge trades</div>
              {knowledge.map(knowledgeItem => (
                <div key={knowledgeItem.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem', border: '1px solid #8b4513', borderRadius: '4px', background: '#f9f9f9', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>{knowledgeItem.name.toUpperCase()}</span>
                  <StyledProficiencyDots>
                    {[1, 2, 3, 4, 5].map(level => (
                      <StyledDot key={level} filled={level <= knowledgeItem.proficiency} />
                    ))}
                  </StyledProficiencyDots>
                </div>
              ))}
            </div>

            {/* Trades Section */}
            <div style={{ marginBottom: '1rem', border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.5rem', textAlign: 'center' }}>TRADES</div>
              <div style={{ fontSize: '0.8rem', color: '#8b4513', marginBottom: '0.5rem', textAlign: 'center' }}>Selected practical trades & crafts</div>
              {trades.length > 0 ? (
                trades.map(trade => (
                  <div key={trade.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem', border: '1px solid #8b4513', borderRadius: '4px', background: '#f9f9f9', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>{trade.name.toUpperCase()}</span>
                    <StyledProficiencyDots>
                      {[1, 2, 3, 4, 5].map(level => (
                        <StyledDot key={level} filled={level <= trade.proficiency} />
                      ))}
                    </StyledProficiencyDots>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.9rem', color: '#8b4513', textAlign: 'center', fontStyle: 'italic', padding: '1rem' }}>
                  No trades selected
                </div>
              )}
            </div>

            {/* Languages Section */}
            <div style={{ marginBottom: '1rem', border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.5rem', textAlign: 'center' }}>LANGUAGES</div>
              <div style={{ fontSize: '0.8rem', color: '#8b4513', marginBottom: '0.5rem', textAlign: 'center' }}>LANGUAGE CHECK = d20 + Intelligence or Charisma</div>
              {languages.map(language => (
                <div key={language.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem', border: '1px solid #8b4513', borderRadius: '4px', background: '#f9f9f9', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>{language.name.toUpperCase()}</span>
                  <div style={{ display: 'flex', gap: '0.2rem' }}>
                    <div style={{ 
                      width: '15px', 
                      height: '15px', 
                      border: '1px solid #8b4513', 
                      background: language.fluency === 'limited' ? '#8b4513' : 'white',
                      borderRadius: '2px'
                    }} />
                    <span style={{ fontSize: '0.8rem', color: '#8b4513' }}>LIMITED</span>
                    <div style={{ 
                      width: '15px', 
                      height: '15px', 
                      border: '1px solid #8b4513', 
                      background: language.fluency === 'fluent' ? '#8b4513' : 'white',
                      borderRadius: '2px',
                      marginLeft: '0.5rem'
                    }} />
                    <span style={{ fontSize: '0.8rem', color: '#8b4513' }}>FLUENT</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Currency Section */}
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.5rem', textAlign: 'center' }}>CURRENCY</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '80px', height: '80px', border: '2px solid #8b4513', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5dc' }}>
                  <span style={{ fontSize: '0.8rem', color: '#8b4513' }}>Coins</span>
                </div>
              </div>
            </div>
          </StyledLeftColumn>

          {/* Middle Column - Resources, Combat, and Core Stats */}
          <StyledMiddleColumn>
            {/* Resources Section - Circular design like official sheet */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1.5rem' }}>
              {/* Stamina Points */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.3rem' }}>STAMINA POINTS</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <StyledResourceButton onClick={() => adjustResource('currentSP', -1)}>-</StyledResourceButton>
                  <StyledPotionContainer style={{ borderColor: '#22c55e' }}>
                    <StyledPotionFill 
                      fillPercentage={getFillPercentage(currentValues.currentSP, characterData.finalSPMax)} 
                      color="#22c55e" 
                    />
                    <StyledPotionBubbles 
                      color="#22c55e" 
                      fillPercentage={getFillPercentage(currentValues.currentSP, characterData.finalSPMax)}
                    />
                    <StyledPotionValue style={{ color: '#22c55e' }}>
                      {currentValues.currentSP}
                    </StyledPotionValue>
                  </StyledPotionContainer>
                  <StyledResourceButton onClick={() => adjustResource('currentSP', 1)}>+</StyledResourceButton>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '300', color: '#666', marginTop: '0.3rem', fontStyle: 'italic' }}>
                  {characterData.finalSPMax}
                </div>
              </div>

              {/* Mana Points */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.3rem' }}>MANA POINTS</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <StyledResourceButton onClick={() => adjustResource('currentMP', -1)}>-</StyledResourceButton>
                  <StyledPotionContainer style={{ borderColor: '#3b82f6' }}>
                    <StyledPotionFill 
                      fillPercentage={getFillPercentage(currentValues.currentMP, characterData.finalMPMax)} 
                      color="#3b82f6" 
                    />
                    <StyledPotionBubbles 
                      color="#3b82f6" 
                      fillPercentage={getFillPercentage(currentValues.currentMP, characterData.finalMPMax)}
                    />
                    <StyledPotionValue style={{ color: '#3b82f6' }}>
                      {currentValues.currentMP}
                    </StyledPotionValue>
                  </StyledPotionContainer>
                  <StyledResourceButton onClick={() => adjustResource('currentMP', 1)}>+</StyledResourceButton>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '300', color: '#666', marginTop: '0.3rem', fontStyle: 'italic' }}>
                  {characterData.finalMPMax}
                </div>
              </div>

              {/* Hit Points */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.3rem' }}>HIT POINTS</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <StyledResourceButton onClick={() => adjustResource('currentHP', -1)}>-</StyledResourceButton>
                  <StyledLargePotionContainer style={{ borderColor: '#dc2626' }}>
                    <StyledPotionFill 
                      fillPercentage={getHPFillPercentage(currentValues.currentHP, characterData.finalHPMax, currentValues.tempHP)} 
                      color="#dc2626" 
                    />
                    <StyledPotionBubbles 
                      color="#dc2626" 
                      fillPercentage={getHPFillPercentage(currentValues.currentHP, characterData.finalHPMax, currentValues.tempHP)}
                    />
                    <StyledLargePotionValue style={{ color: '#dc2626' }}>
                      {currentValues.currentHP}
                    </StyledLargePotionValue>
                  </StyledLargePotionContainer>
                  <StyledResourceButton onClick={() => adjustResource('currentHP', 1)}>+</StyledResourceButton>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '300', color: '#666', marginTop: '0.3rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <span>{characterData.finalHPMax}</span>
                  {currentValues.tempHP > 0 && (
                    <span style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      (+{currentValues.tempHP} temp)
                    </span>
                  )}
                </div>
                {/* Temp HP Controls */}
                <div style={{ fontSize: '0.8rem', color: '#dc2626', marginTop: '0.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <span>TEMP HP:</span>
                  <StyledResourceButton 
                    onClick={() => adjustResource('tempHP', -1)}
                    style={{ fontSize: '0.7rem', width: '20px', height: '20px', padding: '0' }}
                  >
                    -
                  </StyledResourceButton>
                  <StyledTempHPInput
                    type="number"
                    value={currentValues.tempHP}
                    onChange={(e) => handleResourceInputChange('tempHP', e.target.value)}
                    style={{ color: '#dc2626', background: 'white', border: '1px solid #dc2626', borderRadius: '3px', width: '35px', textAlign: 'center', fontSize: '0.8rem' }}
                  />
                  <StyledResourceButton 
                    onClick={() => adjustResource('tempHP', 1)}
                    style={{ fontSize: '0.7rem', width: '20px', height: '20px', padding: '0' }}
                  >
                    +
                  </StyledResourceButton>
                </div>
              </div>
            </div>

            {/* Defenses - Shield-like design */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.3rem' }}>PHYSICAL</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.3rem' }}>DEFENSE</div>
                <div style={{ width: '80px', height: '90px', border: '3px solid #8b4513', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalPD}</div>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.3rem' }}>MYSTICAL</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.3rem' }}>DEFENSE</div>
                <div style={{ width: '80px', height: '90px', border: '3px solid #8b4513', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalAD}</div>
                </div>
              </div>
            </div>

            {/* Combat Section */}
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', textAlign: 'center', marginBottom: '1rem' }}>COMBAT</div>
              
              {/* Action Points */}
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.5rem' }}>ACTION POINTS</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  {[0, 1, 2, 3].map(index => (
                    <div
                      key={index}
                      onClick={() => {
                        const newUsed = index < currentValues.actionPointsUsed ? index : index + 1;
                        setCurrentValues(prev => ({ ...prev, actionPointsUsed: newUsed }));
                      }}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '2px solid #8b4513',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: index < currentValues.actionPointsUsed ? '#8b4513' : 'white',
                        color: index < currentValues.actionPointsUsed ? 'white' : '#8b4513',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Combat Stats */}
              <div style={{ fontSize: '0.9rem', color: '#8b4513' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem', borderBottom: '1px solid #e5e5e5' }}>
                  <span>ATTACK / SPELL CHECK</span>
                  <span style={{ fontWeight: 'bold' }}>CM + Prime</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem', borderBottom: '1px solid #e5e5e5' }}>
                  <span>SAVE DC</span>
                  <span style={{ fontWeight: 'bold' }}>{characterData.finalSaveDC}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem' }}>
                  <span>MARTIAL CHECK</span>
                  <span style={{ fontWeight: 'bold' }}>ATT + AP/3</span>
                </div>
              </div>
            </div>

            {/* Death & Exhaustion */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1, border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.5rem' }}>DEATH</div>
                <div style={{ fontSize: '0.8rem', color: '#8b4513', marginBottom: '0.3rem' }}>DEATH THRESHOLD</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b4513' }}>
                  -{characterData.finalDeathThreshold}
                </div>
              </div>
              
              <div style={{ flex: 1, border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.5rem' }}>EXHAUSTION</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem', marginTop: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map(level => (
                    <div key={level} style={{ 
                      width: '20px', 
                      height: '20px', 
                      border: '1px solid #8b4513', 
                      background: 'white' 
                    }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Attacks Section */}
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', textAlign: 'center', marginBottom: '1rem' }}>ATTACKS</div>
              <div style={{ fontSize: '0.8rem', color: '#8b4513' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', borderBottom: '1px solid #e5e5e5', paddingBottom: '0.3rem' }}>
                  <span style={{ flex: 1, fontWeight: 'bold' }}>Name</span>
                  <span style={{ width: '60px', fontWeight: 'bold' }}>Dmg</span>
                  <span style={{ width: '60px', fontWeight: 'bold' }}>Type</span>
                  <span style={{ width: '40px', fontWeight: 'bold' }}>Total</span>
                  <span style={{ width: '40px', fontWeight: 'bold' }}>Crit</span>
                </div>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.3rem', minHeight: '20px', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ flex: 1, border: '1px solid #e5e5e5', minHeight: '18px' }}></div>
                    <div style={{ width: '60px', border: '1px solid #e5e5e5', minHeight: '18px' }}></div>
                    <div style={{ width: '60px', border: '1px solid #e5e5e5', minHeight: '18px' }}></div>
                    <div style={{ width: '40px', border: '1px solid #e5e5e5', minHeight: '18px' }}></div>
                    <div style={{ width: '40px', border: '1px solid #e5e5e5', minHeight: '18px' }}></div>
                  </div>
                ))}
              </div>
            </div>
          </StyledMiddleColumn>

          {/* Right Column - Movement, Resources, Inventory, Features */}
          <StyledRightColumn>
            {/* Movement & Utility */}
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513' }}>MOVE SPEED</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalMoveSpeed}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513' }}>JUMP DISTANCE</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalJumpDistance}</div>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white', marginBottom: '1rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', textAlign: 'center', marginBottom: '1rem' }}>RESOURCES</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>REST POINTS</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalRestPoints}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>GRIT POINTS</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <StyledResourceInput
                    type="number"
                    value={currentValues.currentGritPoints}
                    onChange={(e) => handleResourceInputChange('currentGritPoints', e.target.value)}
                    style={{ width: '40px', textAlign: 'center', border: '1px solid #8b4513', borderRadius: '4px' }}
                  />
                  <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>/ {characterData.finalGritPoints}</span>
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white', marginBottom: '1rem', minHeight: '200px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', textAlign: 'center', marginBottom: '1rem' }}>INVENTORY</div>
              <div style={{ height: '150px', border: '1px solid #e5e5e5', borderRadius: '4px', background: '#f9f9f9' }}>
                {/* Empty inventory space for items */}
              </div>
            </div>

            {/* Features */}
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white', flex: 1 }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', textAlign: 'center', marginBottom: '1rem' }}>FEATURES</div>
              <div style={{ fontSize: '0.9rem', lineHeight: 1.4, color: '#8b4513' }}>
                <div style={{ marginBottom: '0.8rem', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '4px', background: '#f9f9f9' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>Class Features:</div>
                  <div>Based on {characterData.className}</div>
                </div>
                <div style={{ padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '4px', background: '#f9f9f9' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>Ancestry Traits:</div>
                  <div>{characterData.ancestry1Name}</div>
                </div>
              </div>
            </div>
          </StyledRightColumn>
        </StyledMainGrid>
      </StyledCharacterSheet>
    </StyledContainer>
  );
};

export default CharacterSheet;
