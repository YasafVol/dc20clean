import React, { useState, useEffect } from 'react';

// Import rules data
import { skillsData } from '../../lib/rulesdata/skills';
import { tradesData } from '../../lib/rulesdata/trades';
import { knowledgeData } from '../../lib/rulesdata/knowledge';
import { traitsData } from '../../lib/rulesdata/traits';
import { classesData } from '../../lib/rulesdata/classes';
import { ancestriesData } from '../../lib/rulesdata/ancestries';
import { weaponsData, WeaponData, getWeaponAttackBonus, getWeaponDamageBonus, getWeaponDamageString, getCriticalDamage, getBrutalDamage, getHeavyHitEffect, getHeavyHitDamage, getBrutalHitDamage } from '../../lib/rulesdata/weapons';

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
  StyledLargePotionValue
} from './styles/Potions';

import {
  StyledFeatureGrid,
  StyledFeatureItem,
  StyledFeatureName,
  StyledFeatureReadMore,
  StyledFeatureCategory,
  StyledFeatureCategoryTitle
} from './styles/Features';

import {
  StyledFeaturePopupOverlay,
  StyledFeaturePopupContent,
  StyledFeaturePopupHeader,
  StyledFeaturePopupTitle,
  StyledFeaturePopupClose,
  StyledFeaturePopupDescription,
  StyledFeaturePopupSourceInfo
} from './styles/FeaturePopup';

import {
  StyledExhaustionContainer,
  StyledExhaustionLevel,
  StyledExhaustionTooltip
} from './styles/Exhaustion';

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
  selectedTraitIds?: string; // JSON string of selected trait IDs
  selectedFeatureChoices?: string; // JSON string of selected feature choices
  
  // Current values (optional, may not exist on first load)
  currentHP?: number;
  currentSP?: number;
  currentMP?: number;
  currentGritPoints?: number;
  currentRestPoints?: number;
  tempHP?: number;
  actionPointsUsed?: number;
  exhaustionLevel?: number;
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

interface FeatureData {
  id: string;
  name: string;
  description: string;
  source: 'ancestry' | 'class' | 'choice';
  sourceDetail?: string; // e.g., "Human (Default)", "Barbarian Lvl 1", etc.
}

interface CurrentValues {
  currentHP: number;
  currentSP: number;
  currentMP: number;
  currentGritPoints: number;
  currentRestPoints: number;
  tempHP: number;
  actionPointsUsed: number;
  exhaustionLevel: number; // 0-5
}

interface AttackData {
  id: string;
  weaponId: string;
  name: string;
  attackBonus: number;
  damage: string;
  damageType: string;
  critRange: string;
  critDamage: string;
  brutalDamage: string;
  heavyHitEffect: string;
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
  
  // Return the character data as-is since it's already calculated, but ensure trait and feature data is included
  return {
    ...character,
    selectedTraitIds: character.selectedTraitIds || character.selectedTraitsJson || '[]',
    selectedFeatureChoices: character.selectedFeatureChoices || '{}'
  };
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
      currentRestPoints: currentValues.currentRestPoints,
      tempHP: currentValues.tempHP,
      actionPointsUsed: currentValues.actionPointsUsed,
      exhaustionLevel: currentValues.exhaustionLevel,
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
    currentRestPoints: 0,
    tempHP: 0,
    actionPointsUsed: 0,
    exhaustionLevel: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<FeatureData | null>(null);
  const [attacks, setAttacks] = useState<AttackData[]>([
    { id: '1', weaponId: '', name: '', attackBonus: 0, damage: '', damageType: '', critRange: '', critDamage: '', brutalDamage: '', heavyHitEffect: '' },
    { id: '2', weaponId: '', name: '', attackBonus: 0, damage: '', damageType: '', critRange: '', critDamage: '', brutalDamage: '', heavyHitEffect: '' },
    { id: '3', weaponId: '', name: '', attackBonus: 0, damage: '', damageType: '', critRange: '', critDamage: '', brutalDamage: '', heavyHitEffect: '' }
  ]);

  // Load character data
  useEffect(() => {
    const loadCharacterData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getCharacterData(characterId);
        setCharacterData(data);
        
        // Initialize current values - use saved values if they exist, otherwise use max values
        const initialValues = {
          currentHP: data.currentHP !== undefined ? data.currentHP : data.finalHPMax,
          currentSP: data.currentSP !== undefined ? data.currentSP : data.finalSPMax,
          currentMP: data.currentMP !== undefined ? data.currentMP : data.finalMPMax,
          currentGritPoints: data.currentGritPoints !== undefined ? data.currentGritPoints : data.finalGritPoints,
          currentRestPoints: data.currentRestPoints !== undefined ? data.currentRestPoints : data.finalRestPoints,
          tempHP: data.tempHP || 0,
          actionPointsUsed: data.actionPointsUsed || 0,
          exhaustionLevel: data.exhaustionLevel || 0,
        };
        
        console.log('Character data loaded:', { 
          finalSPMax: data.finalSPMax, 
          currentSP: data.currentSP, 
          initialSP: initialValues.currentSP 
        });
        
        setCurrentValues(initialValues);
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
        case 'currentRestPoints':
          maxValue = characterData?.finalRestPoints || 0;
          break;
        case 'actionPointsUsed':
          maxValue = 4; // Standard AP limit
          break;
        case 'exhaustionLevel':
          maxValue = 5; // Max exhaustion level
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
      case 'currentRestPoints':
        maxValue = characterData?.finalRestPoints || 0;
        break;
      case 'actionPointsUsed':
        maxValue = 4;
        break;
      case 'exhaustionLevel':
        maxValue = 5;
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

  // Get all features (traits and class features) for the character
  const getFeaturesData = (): FeatureData[] => {
    if (!characterData) return [];
    
    const features: FeatureData[] = [];
    
    // Get ancestry default traits
    const ancestry1 = ancestriesData.find(a => a.name === characterData.ancestry1Name);
    if (ancestry1) {
      ancestry1.defaultTraitIds?.forEach(traitId => {
        const trait = traitsData.find(t => t.id === traitId);
        if (trait) {
          features.push({
            id: trait.id,
            name: trait.name,
            description: trait.description,
            source: 'ancestry',
            sourceDetail: `${ancestry1.name} (Default)`
          });
        }
      });
    }
    
    // Get selected ancestry traits
    if (characterData.selectedTraitIds) {
      try {
        const selectedTraitIds: string[] = JSON.parse(characterData.selectedTraitIds);
        selectedTraitIds.forEach(traitId => {
          const trait = traitsData.find(t => t.id === traitId);
          if (trait) {
            // Check if this trait is not already added as default
            const alreadyAdded = features.some(f => f.id === trait.id);
            if (!alreadyAdded) {
              const sourceAncestry = ancestriesData.find(a => 
                a.expandedTraitIds.includes(traitId) || 
                a.defaultTraitIds?.includes(traitId)
              );
              features.push({
                id: trait.id,
                name: trait.name,
                description: trait.description,
                source: 'ancestry',
                sourceDetail: `${sourceAncestry?.name || 'Unknown'} (Selected)`
              });
            }
          }
        });
      } catch (error) {
        console.error('Error parsing selected traits JSON:', error);
      }
    }
    
    // Get class features
    const selectedClass = classesData.find(c => c.name === characterData.className);
    if (selectedClass) {
      // Add level 1 features
      selectedClass.level1Features?.forEach(feature => {
        features.push({
          id: feature.id,
          name: feature.name,
          description: feature.description,
          source: 'class',
          sourceDetail: `${selectedClass.name} (Lvl 1)`
        });
      });
      
      // Add selected feature choices
      if (characterData.selectedFeatureChoices) {
        try {
          const selectedChoices: {[key: string]: string} = JSON.parse(characterData.selectedFeatureChoices);
          selectedClass.featureChoicesLvl1?.forEach(choice => {
            const selectedOptionValue = selectedChoices[choice.id];
            if (selectedOptionValue) {
              const selectedOption = choice.options?.find(opt => opt.value === selectedOptionValue);
              if (selectedOption) {
                features.push({
                  id: `${choice.id}_${selectedOptionValue}`,
                  name: selectedOption.label,
                  description: selectedOption.description || 'Feature choice selected.',
                  source: 'choice',
                  sourceDetail: `${selectedClass.name} (Choice)`
                });
              }
            }
          });
        } catch (error) {
          console.error('Error parsing selected feature choices JSON:', error);
        }
      }
    }
    
    return features;
  };

  // Handle feature popup
  const openFeaturePopup = (feature: FeatureData) => {
    setSelectedFeature(feature);
  };

  const closeFeaturePopup = () => {
    setSelectedFeature(null);
  };

  // Weapon calculation and selection handlers
  const calculateAttackData = (weapon: WeaponData): AttackData => {
    if (!characterData) {
      return { id: '', weaponId: weapon.id, name: weapon.name, attackBonus: 0, damage: '', damageType: weapon.damageType, critRange: '', critDamage: '', brutalDamage: '', heavyHitEffect: '' };
    }

    const mightMod = Math.floor((characterData.finalMight - 10) / 2);
    const agilityMod = Math.floor((characterData.finalAgility - 10) / 2);
    
    const attackBonus = getWeaponAttackBonus(weapon, characterData.finalCombatMastery, mightMod, agilityMod);
    const damageBonus = getWeaponDamageBonus(weapon, mightMod, agilityMod);
    const damageString = getWeaponDamageString(weapon, damageBonus);
    const critDamage = getCriticalDamage(weapon);
    const brutalDamage = getBrutalDamage(weapon);
    const heavyHitEffect = getHeavyHitEffect(weapon);

    return {
      id: weapon.id,
      weaponId: weapon.id,
      name: weapon.name,
      attackBonus,
      damage: damageString,
      damageType: weapon.damageType,
      critRange: '20', // DC20 doesn't use variable crit ranges
      critDamage,
      brutalDamage,
      heavyHitEffect
    };
  };

  const handleWeaponSelect = (attackIndex: number, weaponId: string) => {
    const weapon = weaponsData.find(w => w.id === weaponId);
    if (!weapon) return;

    const newAttackData = calculateAttackData(weapon);
    
    setAttacks(prev => prev.map((attack, index) => 
      index === attackIndex ? { ...newAttackData, id: attack.id } : attack
    ));
  };  // Exhaustion level descriptions (based on DC20 rules)
  const exhaustionLevels = [
    { level: 1, description: "Fatigued: -1 to all Checks and Saves" },
    { level: 2, description: "Exhausted: -2 to all Checks and Saves" },
    { level: 3, description: "Debilitated: -3 to all Checks and Saves, Speed halved" },
    { level: 4, description: "Incapacitated: -4 to all Checks and Saves, Speed quartered" },
    { level: 5, description: "Unconscious: Helpless, cannot take actions" }
  ];

  // Handle exhaustion level changes
  const handleExhaustionChange = (level: number) => {
    setCurrentValues(prev => {
      const newLevel = prev.exhaustionLevel === level ? level - 1 : level;
      const newValues = {
        ...prev,
        exhaustionLevel: Math.max(0, Math.min(5, newLevel))
      };
      
      // Save to localStorage after state update
      if (characterData?.id) {
        setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
      }
      
      return newValues;
    });
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

  // Helper functions for the new damage calculation display
  const getDamageCalculationSummary = (weapon: WeaponData): string => {
    if (!characterData) return '';
    
    const mightMod = Math.floor((characterData.finalMight - 10) / 2);
    const agilityMod = Math.floor((characterData.finalAgility - 10) / 2);
    const damageBonus = getWeaponDamageBonus(weapon, mightMod, agilityMod);
    
    const baseDamage = weapon.versatileDamage || weapon.damage;
    const attributeName = weapon.type === 'ranged' ? 'AGI' : 'MIG';
    const attributeValue = weapon.type === 'ranged' ? agilityMod : mightMod;
    
    if (damageBonus === 0) {
      return `${baseDamage} base damage`;
    }
    
    return `${baseDamage} + ${attributeName}(${attributeValue}) = ${baseDamage + damageBonus}`;
  };

  const getDamageCalculationTooltip = (weapon: WeaponData): string => {
    if (!characterData) return '';
    
    const mightMod = Math.floor((characterData.finalMight - 10) / 2);
    const agilityMod = Math.floor((characterData.finalAgility - 10) / 2);
    const baseDamage = weapon.versatileDamage || weapon.damage;
    const hasImpact = weapon.properties.includes('Impact');
    
    let tooltip = `DC20 Damage Calculation:\n\n`;
    tooltip += `Base Damage: ${baseDamage}${weapon.versatileDamage ? ` (${weapon.damage} one-handed, ${weapon.versatileDamage} two-handed)` : ''}\n`;
    
    const attributeName = weapon.type === 'ranged' ? 'Agility' : 'Might';
    const attributeValue = weapon.type === 'ranged' ? agilityMod : mightMod;
    
    if (attributeValue > 0) {
      tooltip += `+ ${attributeName} Modifier: +${attributeValue}\n`;
    }
    
    tooltip += `\nHit Results:\n`;
    tooltip += `• Hit: ${baseDamage}${attributeValue > 0 ? ` + ${attributeValue} = ${baseDamage + attributeValue}` : ''} damage\n`;
    
    // Heavy Hit calculation with Impact
    const heavyDamage = getHeavyHitDamage(weapon);
    tooltip += `• Heavy Hit (+5 over Defense): ${heavyDamage}${attributeValue > 0 ? ` + ${attributeValue} = ${heavyDamage + attributeValue}` : ''} damage`;
    if (hasImpact) {
      tooltip += ` (base ${baseDamage} + 1 heavy + 1 impact)`;
    } else {
      tooltip += ` (base ${baseDamage} + 1 heavy)`;
    }
    tooltip += `\n`;
    
    if (hasImpact) {
      tooltip += `  └─ Impact: Target must make Might Save or be knocked Prone and pushed 5 feet\n`;
    }
    
    // Brutal Hit calculation with Impact  
    const brutalDamage = getBrutalHitDamage(weapon);
    tooltip += `• Brutal Hit (+10 over Defense): ${brutalDamage}${attributeValue > 0 ? ` + ${attributeValue} = ${brutalDamage + attributeValue}` : ''} damage`;
    if (hasImpact) {
      tooltip += ` (base ${baseDamage} + 2 brutal + 1 impact)`;
    } else {
      tooltip += ` (base ${baseDamage} + 2 brutal)`;
    }
    tooltip += `\n`;
    
    if (weapon.properties.length > 0) {
      tooltip += `\nWeapon Properties: ${weapon.properties.join(', ')}`;
    }
    
    if (weapon.specialNotes) {
      tooltip += `\nSpecial: ${weapon.specialNotes}`;
    }
    
    return tooltip;
  };

  // Get data from character or empty defaults if no character data
  const trades = characterData ? getTradesData() : [];
  const knowledge = characterData ? getKnowledgeData() : [];
  const languages = characterData ? getLanguagesData() : [];
  const features = characterData ? getFeaturesData() : [];
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
                    <StyledPotionValue>
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
                    <StyledPotionValue>
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
                    <StyledLargePotionValue>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem', borderBottom: '1px solid #e5e5e5' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>ATTACK / SPELL CHECK</span>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: '14px', 
                      height: '14px', 
                      borderRadius: '50%', 
                      backgroundColor: '#8b4513', 
                      color: 'white', 
                      fontSize: '10px', 
                      fontWeight: 'bold',
                      cursor: 'help',
                      verticalAlign: 'middle'
                    }}
                    title={`Combat Mastery (${characterData.finalCombatMastery}) + ${characterData.finalPrimeModifierAttribute} Modifier (${characterData.finalPrimeModifierValue}) = +${characterData.finalCombatMastery + characterData.finalPrimeModifierValue}`}>
                      i
                    </span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>+{characterData.finalCombatMastery + characterData.finalPrimeModifierValue}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem', borderBottom: '1px solid #e5e5e5' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>SAVE DC</span>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: '14px', 
                      height: '14px', 
                      borderRadius: '50%', 
                      backgroundColor: '#8b4513', 
                      color: 'white', 
                      fontSize: '10px', 
                      fontWeight: 'bold',
                      cursor: 'help',
                      verticalAlign: 'middle'
                    }}
                    title={`10 + Combat Mastery (${characterData.finalCombatMastery}) + ${characterData.finalPrimeModifierAttribute} Modifier (${characterData.finalPrimeModifierValue}) = ${characterData.finalSaveDC}`}>
                      i
                    </span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{characterData.finalSaveDC}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span>MARTIAL CHECK</span>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: '14px', 
                      height: '14px', 
                      borderRadius: '50%', 
                      backgroundColor: '#8b4513', 
                      color: 'white', 
                      fontSize: '10px', 
                      fontWeight: 'bold',
                      cursor: 'help',
                      verticalAlign: 'middle'
                    }}
                    title={`Attack/Spell Check (${characterData.finalCombatMastery + characterData.finalPrimeModifierValue}) + Action Points Bonus (${Math.floor(currentValues.actionPointsUsed / 3)}) = +${characterData.finalCombatMastery + characterData.finalPrimeModifierValue + Math.floor(currentValues.actionPointsUsed / 3)}`}>
                      i
                    </span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>+{characterData.finalCombatMastery + characterData.finalPrimeModifierValue + Math.floor(currentValues.actionPointsUsed / 3)}</span>
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
                <StyledExhaustionContainer>
                  {exhaustionLevels.map(({ level, description }) => (
                    <StyledExhaustionLevel
                      key={level}
                      filled={level <= currentValues.exhaustionLevel}
                      onClick={() => handleExhaustionChange(level)}
                    >
                      {level}
                      <StyledExhaustionTooltip>
                        {description}
                      </StyledExhaustionTooltip>
                    </StyledExhaustionLevel>
                  ))}
                </StyledExhaustionContainer>
              </div>
            </div>

            {/* Attacks Section */}
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', textAlign: 'center', marginBottom: '1rem' }}>ATTACKS</div>
              <div style={{ fontSize: '0.8rem', color: '#8b4513' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 0.7fr 0.8fr', gap: '0.5rem', marginBottom: '0.5rem', borderBottom: '1px solid #e5e5e5', paddingBottom: '0.3rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold' }}>Weapon</span>
                  <span style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '0.8rem', lineHeight: '1.1' }}>
                    Base<br/>Dmg
                  </span>
                  <span style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '0.8rem', lineHeight: '1.1' }}>
                    Heavy<br/>Dmg
                  </span>
                  <span style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '0.8rem', lineHeight: '1.1' }}>
                    Brutal<br/>Dmg
                  </span>
                  <span style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '0.8rem' }}>Type</span>
                  <span style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    <span 
                      title="Damage calculation info"
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: '14px', 
                        height: '14px', 
                        borderRadius: '50%', 
                        backgroundColor: '#8b4513', 
                        color: 'white', 
                        fontSize: '10px', 
                        fontWeight: 'bold',
                        cursor: 'help'
                      }}
                    >
                      i
                    </span>
                  </span>
                </div>
                {attacks.map((attack, index) => {
                  const weapon = attack.weaponId ? weaponsData.find(w => w.id === attack.weaponId) : null;
                  
                  return (
                    <div key={attack.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 0.7fr 0.8fr', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                      {/* Weapon Selection */}
                      <select
                        value={attack.weaponId}
                        onChange={(e) => handleWeaponSelect(index, e.target.value)}
                        style={{ 
                          padding: '0.2rem', 
                          border: '1px solid #8b4513', 
                          borderRadius: '3px', 
                          fontSize: '0.7rem', 
                          background: 'white',
                          width: '100%',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        <option value="">Select Weapon...</option>
                        {weaponsData.map(weapon => (
                          <option key={weapon.id} value={weapon.id}>
                            {weapon.name} ({weapon.weightCategory})
                          </option>
                        ))}
                      </select>
                      
                      {/* Base Damage */}
                      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        {weapon ? (
                          <span 
                            title={`Base weapon damage: ${weapon.damage}${weapon.versatileDamage ? ` (${weapon.versatileDamage} when two-handed)` : ''}`}
                            style={{ cursor: 'help' }}
                          >
                            {weapon.versatileDamage ? `${weapon.damage}(${weapon.versatileDamage})` : weapon.damage}
                          </span>
                        ) : '-'}
                      </div>
                      
                      {/* Heavy Damage */}
                      <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#d2691e' }}>
                        {weapon ? (
                          <span 
                            title={weapon.properties.includes('Impact') 
                              ? `Heavy Hit: ${getHeavyHitDamage(weapon)} damage (base ${weapon.versatileDamage || weapon.damage} + 1 heavy + 1 impact) + Target must make Might Save or be knocked Prone and pushed 5 feet`
                              : `Heavy Hit: ${getHeavyHitDamage(weapon)} damage (base ${weapon.versatileDamage || weapon.damage} + 1 heavy)`}
                            style={{ cursor: 'help' }}
                          >
                            {getHeavyHitDamage(weapon)}
                            {weapon.properties.includes('Impact') && <span style={{ fontSize: '0.6rem', display: 'block' }}>+Prone/Push</span>}
                          </span>
                        ) : '-'}
                      </div>
                      
                      {/* Brutal Damage */}
                      <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#dc143c' }}>
                        {weapon ? (
                          <span 
                            title={weapon.properties.includes('Impact')
                              ? `Brutal Hit: ${getBrutalHitDamage(weapon)} damage (base ${weapon.versatileDamage || weapon.damage} + 2 brutal + 1 impact)`
                              : `Brutal Hit: ${getBrutalHitDamage(weapon)} damage (base ${weapon.versatileDamage || weapon.damage} + 2 brutal)`}
                            style={{ cursor: 'help' }}
                          >
                            {getBrutalHitDamage(weapon)}
                          </span>
                        ) : '-'}
                      </div>
                      
                      {/* Damage Type */}
                      <div style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
                        {weapon ? (
                          <span 
                            title={`${weapon.damageType.charAt(0).toUpperCase() + weapon.damageType.slice(1)} damage`}
                            style={{ cursor: 'help' }}
                          >
                            {weapon.damageType === 'slashing' ? 'S' : 
                             weapon.damageType === 'piercing' ? 'P' : 
                             weapon.damageType === 'bludgeoning' ? 'B' : 
                             weapon.damageType.charAt(0).toUpperCase()}
                          </span>
                        ) : '-'}
                      </div>
                      
                      {/* Damage Calculation Info */}
                      <div style={{ textAlign: 'center', fontSize: '1.1rem' }}>
                        {weapon ? (
                          <span 
                            title={getDamageCalculationTooltip(weapon)}
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              width: '14px', 
                        height: '14px', 
                        borderRadius: '50%', 
                        backgroundColor: '#8b4513', 
                        color: 'white', 
                        fontSize: '10px', 
                        fontWeight: 'bold',
                        cursor: 'help'
                      }}
                    >
                     i
                    </span>) : '-'}
                      </div>
                    </div>
                  );
                })}
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
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>REST POINTS</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <StyledResourceInput
                    type="number"
                    value={currentValues.currentRestPoints}
                    onChange={(e) => handleResourceInputChange('currentRestPoints', e.target.value)}
                    style={{ width: '40px', textAlign: 'center', border: '1px solid #8b4513', borderRadius: '4px' }}
                  />
                  <span style={{ fontSize: '0.9rem', color: '#8b4513' }}>/ {characterData.finalRestPoints}</span>
                </div>
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
              
              {/* Organize features by source */}
              {(() => {
                const ancestryFeatures = features.filter(f => f.source === 'ancestry');
                const classFeatures = features.filter(f => f.source === 'class');
                const choiceFeatures = features.filter(f => f.source === 'choice');
                
                return (
                  <div style={{ fontSize: '0.9rem', color: '#8b4513' }}>
                    {/* Ancestry Traits */}
                    {ancestryFeatures.length > 0 && (
                      <StyledFeatureCategory>
                        <StyledFeatureCategoryTitle>Ancestry Traits</StyledFeatureCategoryTitle>
                        <StyledFeatureGrid>
                          {ancestryFeatures.map(feature => (
                            <StyledFeatureItem key={feature.id}>
                              <StyledFeatureName>{feature.name}</StyledFeatureName>
                              <StyledFeatureReadMore onClick={() => openFeaturePopup(feature)}>
                                Info
                              </StyledFeatureReadMore>
                            </StyledFeatureItem>
                          ))}
                        </StyledFeatureGrid>
                      </StyledFeatureCategory>
                    )}
                    
                    {/* Class Features */}
                    {classFeatures.length > 0 && (
                      <StyledFeatureCategory>
                        <StyledFeatureCategoryTitle>Class Features</StyledFeatureCategoryTitle>
                        <StyledFeatureGrid>
                          {classFeatures.map(feature => (
                            <StyledFeatureItem key={feature.id}>
                              <StyledFeatureName>{feature.name}</StyledFeatureName>
                              <StyledFeatureReadMore onClick={() => openFeaturePopup(feature)}>
                                Info
                              </StyledFeatureReadMore>
                            </StyledFeatureItem>
                          ))}
                        </StyledFeatureGrid>
                      </StyledFeatureCategory>
                    )}
                    
                    {/* Feature Choices */}
                    {choiceFeatures.length > 0 && (
                      <StyledFeatureCategory>
                        <StyledFeatureCategoryTitle>Selected Features</StyledFeatureCategoryTitle>
                        <StyledFeatureGrid>
                          {choiceFeatures.map(feature => (
                            <StyledFeatureItem key={feature.id}>
                              <StyledFeatureName>{feature.name}</StyledFeatureName>
                              <StyledFeatureReadMore onClick={() => openFeaturePopup(feature)}>
                                Info
                              </StyledFeatureReadMore>
                            </StyledFeatureItem>
                          ))}
                        </StyledFeatureGrid>
                      </StyledFeatureCategory>
                    )}
                    
                    {/* No features message */}
                    {features.length === 0 && (
                      <div style={{ textAlign: 'center', fontStyle: 'italic', padding: '1rem', color: '#666' }}>
                        No features available
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </StyledRightColumn>
        </StyledMainGrid>
      </StyledCharacterSheet>
      
      {/* Feature Popup */}
      {selectedFeature && (
        <StyledFeaturePopupOverlay onClick={closeFeaturePopup}>
          <StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
            <StyledFeaturePopupHeader>
              <StyledFeaturePopupTitle>{selectedFeature.name}</StyledFeaturePopupTitle>
              <StyledFeaturePopupClose onClick={closeFeaturePopup}>
                ×
              </StyledFeaturePopupClose>
            </StyledFeaturePopupHeader>
            <StyledFeaturePopupDescription>
              {selectedFeature.description}
            </StyledFeaturePopupDescription>
            {selectedFeature.sourceDetail && (
              <StyledFeaturePopupSourceInfo>
                Source: {selectedFeature.sourceDetail}
              </StyledFeaturePopupSourceInfo>
            )}
          </StyledFeaturePopupContent>
        </StyledFeaturePopupOverlay>
      )}
    </StyledContainer>
  );
};

export default CharacterSheet;
