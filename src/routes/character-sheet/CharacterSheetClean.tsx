import React, { useState, useEffect } from 'react';

// Import rules data
import { skillsData } from '../../lib/rulesdata/skills';
import { tradesData } from '../../lib/rulesdata/trades';
import { knowledgeData } from '../../lib/rulesdata/knowledge';
import { traitsData } from '../../lib/rulesdata/traits';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { ancestriesData } from '../../lib/rulesdata/ancestries';
import { weaponsData, WeaponData, getWeaponAttackBonus, getWeaponDamageBonus, getWeaponDamageString, getCriticalDamage, getBrutalDamage, getHeavyHitEffect, getHeavyHitDamage, getBrutalHitDamage } from '../../lib/rulesdata/weapons';
import { allItems } from '../../lib/rulesdata/inventoryItems';

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
import {
  StyledDeathContainer,
  StyledDeathTitle,
  StyledHealthStatus,
  StyledDeathThreshold,
  StyledDeathStepsContainer,
  StyledDeathStepsTitle,
  StyledDeathStepsGrid,
  StyledDeathStep,
  StyledDeathStepTooltip,
  StyledHealthStatusTooltip
} from './styles/Death';
import { getHealthStatus, calculateDeathThreshold, getDeathSteps } from '../../lib/rulesdata/death';

interface CharacterSheetProps {
  characterId: string;
  onBack: () => void;
}

interface CharacterSheetData {
  id: string;
  finalName: string;
  finalPlayerName?: string;
  finalLevel: number;
  finalMight: number;
  finalAgility: number;
  finalCharisma: number;
  finalIntelligence: number;
  finalPrimeModifierValue: number;
  finalPrimeModifierAttribute: string;
  finalCombatMastery: number;
  finalSaveMight: number;
  finalSaveAgility: number;
  finalSaveCharisma: number;
  finalSaveIntelligence: number;
  finalHPMax: number;
  finalSPMax: number;
  finalMPMax: number;
  finalPD: number;
  finalAD: number;
  finalPDR: number;
  finalSaveDC: number;
  finalDeathThreshold: number;
  finalMoveSpeed: number;
  finalJumpDistance: number;
  finalRestPoints: number;
  finalGritPoints: number;
  finalInitiativeBonus: number;
  className: string;
  ancestry1Name?: string;
  ancestry2Name?: string;
  skillsJson?: string;
  tradesJson?: string;
  languagesJson?: string;
  selectedTraitIds?: string;
  selectedFeatureChoices?: string;
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
  proficiency: number;
}

interface TradeData {
  id: string;
  name: string;
  proficiency: number;
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
  sourceDetail?: string;
}

interface CurrentValues {
  currentHP: number;
  currentSP: number;
  currentMP: number;
  currentGritPoints: number;
  currentRestPoints: number;
  tempHP: number;
  actionPointsUsed: number;
  exhaustionLevel: number;
  goldPieces: number;
  silverPieces: number;
  copperPieces: number;
  electrumPieces: number;
  platinumPieces: number;
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

interface InventoryItemData {
  id: string;
  itemType: 'Weapon' | 'Armor' | 'Shield' | 'Adventuring Supply' | 'Potion' | '';
  itemName: string;
  count: number;
  cost?: string;
}

const getCharacterData = async (characterId: string): Promise<CharacterSheetData> => {
  const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
  const character = savedCharacters.find((char: any) => char.id === characterId);
  if (!character) {
    throw new Error(`Character with ID "${characterId}" not found in localStorage`);
  }
  return {
    ...character,
    selectedTraitIds: character.selectedTraitIds || character.selectedTraitsJson || '[]',
    selectedFeatureChoices: character.selectedFeatureChoices || '{}'
  };
};

const saveCharacterData = (characterId: string, currentValues: CurrentValues) => {
  const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
  const characterIndex = savedCharacters.findIndex((char: any) => char.id === characterId);
  if (characterIndex !== -1) {
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
    goldPieces: 0,
    silverPieces: 0,
    copperPieces: 0,
    electrumPieces: 0,
    platinumPieces: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<FeatureData | null>(null);
  const [attacks, setAttacks] = useState<AttackData[]>([]);
  const [inventory, setInventory] = useState<InventoryItemData[]>([]);

  useEffect(() => {
    const loadCharacterData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCharacterData(characterId);
        setCharacterData(data);
        const initialValues: CurrentValues = {
          currentHP: data.currentHP ?? data.finalHPMax,
          currentSP: data.currentSP ?? data.finalSPMax,
          currentMP: data.currentMP ?? data.finalMPMax,
          currentGritPoints: data.currentGritPoints ?? data.finalGritPoints,
          currentRestPoints: data.currentRestPoints ?? data.finalRestPoints,
          tempHP: data.tempHP ?? 0,
          actionPointsUsed: data.actionPointsUsed ?? 0,
          exhaustionLevel: data.exhaustionLevel ?? 0,
          goldPieces: (data as any).goldPieces ?? 0,
          silverPieces: (data as any).silverPieces ?? 0,
          copperPieces: (data as any).copperPieces ?? 0,
          electrumPieces: (data as any).electrumPieces ?? 0,
          platinumPieces: (data as any).platinumPieces ?? 0,
        };
        setCurrentValues(initialValues);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    loadCharacterData();
  }, [characterId]);

  const adjustResource = (resource: keyof CurrentValues, amount: number) => {
    setCurrentValues(prev => {
      const newValue = (prev[resource] as number) + amount;
      let maxValue = 999;
      switch (resource) {
        case 'currentHP':
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
          maxValue = 4;
          break;
        case 'exhaustionLevel':
          maxValue = 5;
          break;
      }
      const newValues = {
        ...prev,
        [resource]: Math.max(0, Math.min(newValue, maxValue))
      };
      if (resource === 'tempHP' && amount < 0) {
        const newEffectiveMaxHP = (characterData?.finalHPMax || 0) + newValues.tempHP;
        if (prev.currentHP > newEffectiveMaxHP) {
          newValues.currentHP = newEffectiveMaxHP;
        }
      }
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
      if (resource === 'tempHP') {
        const newEffectiveMaxHP = (characterData?.finalHPMax || 0) + newValues.tempHP;
        if (prev.currentHP > newEffectiveMaxHP) {
          newValues.currentHP = newEffectiveMaxHP;
        }
      }
      if (characterData?.id) {
        setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
      }
      return newValues;
    });
  };

  const getSkillsData = (): SkillData[] => {
    let characterSkills: Record<string, number> = {};
    if (characterData?.skillsJson) {
      try {
        characterSkills = JSON.parse(characterData.skillsJson);
      } catch (error) {
        console.error('Error parsing skills JSON:', error);
      }
    }
    return skillsData.map(skill => ({
      id: skill.id,
      name: skill.name,
      attribute: skill.attributeAssociation,
      proficiency: characterSkills[skill.id] || 0
    }));
  };

  const getTradesData = (): TradeData[] => {
    let characterTrades: Record<string, number> = {};
    if (characterData?.tradesJson) {
      try {
        characterTrades = JSON.parse(characterData.tradesJson);
      } catch (error) {
        console.error('Error parsing trades JSON:', error);
      }
    }
    return tradesData
      .filter(trade => characterTrades[trade.id] && characterTrades[trade.id] > 0)
      .map(trade => ({
        id: trade.id,
        name: trade.name,
        proficiency: characterTrades[trade.id] || 0
      }));
  };

  const getKnowledgeData = (): TradeData[] => {
    let characterTrades: Record<string, number> = {};
    if (characterData?.tradesJson) {
      try {
        characterTrades = JSON.parse(characterData.tradesJson);
      } catch (error) {
        console.error('Error parsing trades JSON:', error);
      }
    }
    return knowledgeData.map(knowledge => ({
      id: knowledge.id,
      name: knowledge.name,
      proficiency: characterTrades[knowledge.id] || 0
    }));
  };

  const getLanguagesData = (): LanguageData[] => {
    if (!characterData?.languagesJson) {
      return [];
    }
    try {
      const languagesFromDB: Record<string, { fluency: 'fluent' | 'limited' }> = JSON.parse(characterData.languagesJson);
      const languages: LanguageData[] = [];
      for (const langId in languagesFromDB) {
        if (Object.prototype.hasOwnProperty.call(languagesFromDB, langId)) {
          languages.push({
            id: langId,
            name: langId.charAt(0).toUpperCase() + langId.slice(1),
            fluency: languagesFromDB[langId].fluency,
          });
        }
      }
      return languages;
    } catch (error) {
      console.error('Error parsing languages JSON:', error);
      return [];
    }
  };

  const getFeaturesData = (): FeatureData[] => {
    if (!characterData) return [];
    const features: FeatureData[] = [];
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
    if (characterData.selectedTraitIds) {
      try {
        const selectedTraitIds: string[] = JSON.parse(characterData.selectedTraitIds);
        selectedTraitIds.forEach(traitId => {
          const trait = traitsData.find(t => t.id === traitId);
          if (trait) {
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
    const selectedClass = classesData.find(c => c.name === characterData.className);
    if (selectedClass) {
      selectedClass.level1Features?.forEach(feature => {
        features.push({
          id: feature.id,
          name: feature.name,
          description: feature.description,
          source: 'class',
          sourceDetail: `${selectedClass.name} (Lvl 1)`
        });
      });
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

  const openFeaturePopup = (feature: FeatureData) => {
    setSelectedFeature(feature);
  };

  const closeFeaturePopup = () => {
    setSelectedFeature(null);
  };

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
      critRange: '20',
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
  };

  const addWeaponSlot = () => {
    const newAttack: AttackData = {
      id: `attack_${Date.now()}`,
      weaponId: '',
      name: '',
      attackBonus: 0,
      damage: '',
      damageType: 'slashing',
      critRange: '20',
      critDamage: '',
      brutalDamage: '',
      heavyHitEffect: ''
    };
    setAttacks(prev => [...prev, newAttack]);
  };

  const removeWeaponSlot = (attackIndex: number) => {
    setAttacks(prev => prev.filter((_, index) => index !== attackIndex));
  };

  const addInventorySlot = () => {
    const newInventoryItem: InventoryItemData = {
      id: `inventory_${Date.now()}`,
      itemType: '',
      itemName: '',
      count: 1,
      cost: '-'
    };
    setInventory(prev => [...prev, newInventoryItem]);
  };

  const removeInventorySlot = (inventoryIndex: number) => {
    setInventory(prev => prev.filter((_, index) => index !== inventoryIndex));
  };

  const handleInventoryItemSelect = (inventoryIndex: number, itemTypeOrName: string, isItemName: boolean = false) => {
    if (!isItemName) {
      const itemType = itemTypeOrName as InventoryItemData['itemType'];
      setInventory(prev => prev.map((item, index) => 
        index === inventoryIndex 
          ? { ...item, itemType, itemName: '', cost: '-' }
          : item
      ));
    } else {
      const selectedItem = allItems.find(item => item.name === itemTypeOrName);
      if (selectedItem) {
        setInventory(prev => prev.map((item, index) => 
          index === inventoryIndex 
            ? { 
                ...item, 
                itemName: selectedItem.name, 
                itemType: selectedItem.itemType,
                cost: getItemCost(selectedItem) 
              }
            : item
        ));
      }
    }
  };

  const handleInventoryCountChange = (inventoryIndex: number, count: number) => {
    setInventory(prev => prev.map((item, index) => 
      index === inventoryIndex ? { ...item, count: Math.max(1, count) } : item
    ));
  };

  const getItemCost = (item: any, count: number = 1): string => {
    if (!item || !('price' in item)) return '-';
    let basePrice = 0;
    let currency = 'g';
    if (typeof item.price === 'string') {
      const match = item.price.match(/(\d+)([gs]?)/);
      if (match) {
        basePrice = parseInt(match[1]);
        currency = match[2] || 'g';
      }
    } else if (typeof item.price === 'number') {
      basePrice = item.price;
    }
    if (basePrice === 0) return '-';
    const totalPrice = basePrice * count;
    return `${totalPrice}${currency}`;
  };

  const getItemExtraInfo = (item: any): string => {
    if (!item) return 'No item selected';
    if (item.itemType === 'Weapon') {
      const parts = [];
      parts.push(`DAMAGE: ${item.damage || 'N/A'}`);
      if (item.versatileDamage) {
        parts.push(`VERSATILE: ${item.versatileDamage} (two-handed)`);
      }
      parts.push(`TYPE: ${item.type || 'N/A'}`);
      parts.push(`DAMAGE TYPE: ${item.damageType || 'N/A'}`);
      if (item.properties && item.properties.length > 0) {
        parts.push(`PROPERTIES: ${item.properties.join(', ')}`);
      }
      if (item.range) {
        parts.push(`RANGE: ${item.range}`);
      }
      if (item.weightCategory) {
        parts.push(`WEIGHT: ${item.weightCategory}`);
      }
      if (item.cost !== undefined) {
        parts.push(`VALUE: ${item.cost} coins`);
      }
      return parts.join('\n');
    } else if (item.itemType === 'Armor') {
      const parts = [];
      const pdBonus = item.pdBonus || 0;
      const adBonus = item.adBonus || 0;
      const speedPenalty = item.speedPenalty || 0;
      parts.push(`ARMOR CLASS: PD+${pdBonus}, AD+${adBonus}`);
      if (speedPenalty !== 0) {
        parts.push(`SPEED PENALTY: ${speedPenalty} feet`);
      }
      if (item.type) {
        parts.push(`TYPE: ${item.type}`);
      }
      if (item.properties && item.properties.length > 0) {
        parts.push(`PROPERTIES: ${item.properties.join(', ')}`);
      }
      if (item.cost !== undefined) {
        parts.push(`VALUE: ${item.cost} coins`);
      }
      if (item.description) {
        parts.push(`DESCRIPTION: ${item.description}`);
      }
      return parts.join('\n');
    } else if (item.itemType === 'Shield') {
      const parts = [];
      const pdBonus = item.pdBonus || 0;
      const adBonus = item.adBonus || 0;
      const speedPenalty = item.speedPenalty || 0;
      parts.push(`DEFENSE BONUS: PD+${pdBonus}, AD+${adBonus}`);
      if (speedPenalty !== 0) {
        parts.push(`SPEED PENALTY: ${speedPenalty} feet`);
      }
      if (item.type) {
        parts.push(`TYPE: ${item.type}`);
      }
      if (item.properties && item.properties.length > 0) {
        parts.push(`PROPERTIES: ${item.properties.join(', ')}`);
      }
      if (item.cost !== undefined) {
        parts.push(`VALUE: ${item.cost} coins`);
      }
      if (item.description) {
        parts.push(`DESCRIPTION: ${item.description}`);
      }
      return parts.join('\n');
    } else if (item.itemType === 'Potion') {
      const parts = [];
      parts.push(`HEALING: ${item.healing || 'N/A'}`);
      parts.push(`LEVEL: ${item.level || 1}`);
      if (item.cost !== undefined) {
        parts.push(`VALUE: ${item.cost} coins`);
      }
      if (item.description) {
        parts.push(`EFFECT: ${item.description}`);
      } else {
        parts.push(`EFFECT: Restores ${item.healing || 'N/A'} hit points when consumed`);
      }
      return parts.join('\n');
    } else if (item.itemType === 'Adventuring Supply') {
      const parts = [];
      if (item.description) {
        parts.push(`DESCRIPTION: ${item.description}`);
      }
      if (item.cost !== undefined) {
        parts.push(`VALUE: ${item.cost} coins`);
      }
      if (item.properties && item.properties.length > 0) {
        parts.push(`PROPERTIES: ${item.properties.join(', ')}`);
      }
      return parts.length > 0 ? parts.join('\n') : 'Standard adventuring equipment';
    }
    return 'Item information not available';
  };

  const exhaustionLevels = [
    { level: 1, description: "Fatigued: -1 to all Checks and Saves" },
    { level: 2, description: "Exhausted: -2 to all Checks and Saves" },
    { level: 3, description: "Debilitated: -3 to all Checks and Saves, Speed halved" },
    { level: 4, description: "Incapacitated: -4 to all Checks and Saves, Speed quartered" },
    { level: 5, description: "Unconscious: Helpless, cannot take actions" }
  ];

  const handleExhaustionChange = (level: number) => {
    setCurrentValues(prev => {
      const newLevel = prev.exhaustionLevel === level ? level - 1 : level;
      const newValues = {
        ...prev,
        exhaustionLevel: Math.max(0, Math.min(5, newLevel))
      };
      if (characterData?.id) {
        setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
      }
      return newValues;
    });
  };

  const handleDeathStepChange = (step: number) => {
    if (!characterData) return;
    const deathThreshold = calculateDeathThreshold(characterData.finalPrimeModifierValue, characterData.finalCombatMastery);
    const targetHP = -step;
    if (targetHP < deathThreshold) {
      setCurrentValues(prev => {
        const newValues = { ...prev, currentHP: deathThreshold };
        if (characterData?.id) {
          setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
        }
        return newValues;
      });
    } else {
      setCurrentValues(prev => {
        const newValues = { ...prev, currentHP: targetHP };
        if (characterData?.id) {
          setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
        }
        return newValues;
      });
    }
  };

  const getFillPercentage = (current: number, max: number): number => {
    if (max === 0) return 0;
    return Math.max(0, Math.min(100, (current / max) * 100));
  };

  const getHPFillPercentage = (currentHP: number, maxHP: number, tempHP: number): number => {
    const totalEffectiveHP = maxHP + tempHP;
    if (totalEffectiveHP === 0) return 0;
    return Math.max(0, (currentHP / totalEffectiveHP) * 100);
  };

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
        <StyledMainGrid>
          <StyledLeftColumn>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '0.5rem', border: '2px solid #8b4513', borderRadius: '8px', background: '#f5f5dc', marginBottom: '0.5rem' }}>
                <StyledLabel style={{ color: '#8b4513', fontWeight: 'bold' }}>Prime</StyledLabel>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8b4513' }}>
                  {characterData.finalPrimeModifierAttribute} +{characterData.finalPrimeModifierValue}
                </div>
              </div>
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
            <div style={{ marginBottom: '1rem', border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '60px', height: '60px', border: '2px solid #8b4513', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5dc', marginRight: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513' }}>MIG</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalMight}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.2rem' }}>MIGHT</div>
                  <div style={{ fontSize: '0.9rem', color: '#8b4513' }}>SAVE +{characterData.finalSaveMight}</div>
                </div>
              </div>
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
            <div style={{ marginBottom: '1rem', border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '60px', height: '60px', border: '2px solid #8b4513', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5dc', marginRight: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513' }}>AGI</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalAgility}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.2rem' }}>AGILITY</div>
                  <div style={{ fontSize: '0.9rem', color: '#8b4513' }}>SAVE +{characterData.finalSaveAgility}</div>
                </div>
              </div>
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
            <div style={{ marginBottom: '1rem', border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '60px', height: '60px', border: '2px solid #8b4513', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5dc', marginRight: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513' }}>CHA</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalCharisma}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.2rem' }}>CHARISMA</div>
                  <div style={{ fontSize: '0.9rem', color: '#8b4513' }}>SAVE +{characterData.finalSaveCharisma}</div>
                </div>
              </div>
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
            <div style={{ marginBottom: '1rem', border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '60px', height: '60px', border: '2px solid #8b4513', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5dc', marginRight: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513' }}>INT</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalIntelligence}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '0.2rem' }}>INTELLIGENCE</div>
                  <div style={{ fontSize: '0.9rem', color: '#8b4513' }}>SAVE +{characterData.finalSaveIntelligence}</div>
                </div>
              </div>
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
          </StyledLeftColumn>
          <StyledMiddleColumn>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1.5rem' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ textAlign: 'center', width: '120px' }}>
                <div style={{ height: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '0.3rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>PHYSICAL</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>DEFENSE</div>
                </div>
                <div style={{ width: '80px', height: '90px', border: '3px solid #8b4513', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', margin: '0 auto' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalPD}</div>
                </div>
                <div style={{ height: '20px', marginTop: '0.2rem' }}></div>
              </div>
              <div style={{ textAlign: 'center', width: '120px' }}>
                <div style={{ height: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '0.3rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>PHYSICAL</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>DMG REDUCTION</div>
                </div>
                <div style={{ width: '80px', height: '90px', border: '3px solid #8b4513', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', margin: '0 auto' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalPDR || 0}</div>
                </div>
                <div style={{ height: '20px', marginTop: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {characterData.finalPDR > 0 && (
                    <div style={{ fontSize: '0.6rem', color: '#8b4513' }}>
                      Auto-calculated
                    </div>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'center', width: '120px' }}>
                <div style={{ height: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '0.3rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>MYSTICAL</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>DEFENSE</div>
                </div>
                <div style={{ width: '80px', height: '90px', border: '3px solid #8b4513', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', margin: '0 auto' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>{characterData.finalAD}</div>
                </div>
                <div style={{ height: '20px', marginTop: '0.2rem' }}></div>
              </div>
            </div>
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', textAlign: 'center', marginBottom: '1rem' }}>COMBAT</div>
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
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <StyledDeathContainer>
                <StyledDeathTitle>DEATH & HEALTH STATUS</StyledDeathTitle>
                {(() => {
                  const deathThreshold = calculateDeathThreshold(characterData.finalPrimeModifierValue, characterData.finalCombatMastery);
                  const healthStatus = getHealthStatus(currentValues.currentHP, characterData.finalHPMax, deathThreshold);
                  const deathSteps = getDeathSteps(currentValues.currentHP, deathThreshold);
                  return (
                    <>
                      <StyledHealthStatusTooltip 
                        data-tooltip={healthStatus.effects.join('\n')}
                      >
                        <StyledHealthStatus status={healthStatus.status}>
                          {healthStatus.description.toUpperCase()}
                        </StyledHealthStatus>
                      </StyledHealthStatusTooltip>
                      <div style={{ fontSize: '0.8rem', color: '#8b4513', marginBottom: '0.3rem' }}>DEATH THRESHOLD</div>
                      <StyledDeathThreshold>
                        {deathThreshold}
                      </StyledDeathThreshold>
                      {healthStatus.status === 'deaths-door' && (
                        <StyledDeathStepsContainer>
                          <StyledDeathStepsTitle>
                            DEATH STEPS ({deathSteps.currentStep}/{deathSteps.maxSteps})
                          </StyledDeathStepsTitle>
                          <StyledDeathStepsGrid>
                            {Array.from({ length: deathSteps.maxSteps }, (_, index) => {
                              const step = index + 1;
                              const isFilled = step <= deathSteps.currentStep;
                              const isDead = deathSteps.isDead && step === deathSteps.maxSteps;
                              return (
                                <StyledDeathStep
                                  key={step}
                                  filled={isFilled}
                                  isDead={isDead}
                                  onClick={() => handleDeathStepChange(step)}
                                >
                                  {!isDead && step}
                                  <StyledDeathStepTooltip>
                                    {isDead ? 'Dead' : `${step} HP below 0`}
                                  </StyledDeathStepTooltip>
                                </StyledDeathStep>
                              );
                            })}
                          </StyledDeathStepsGrid>
                        </StyledDeathStepsContainer>
                      )}
                    </>
                  );
                })()}
              </StyledDeathContainer>
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
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', textAlign: 'center', flex: 1 }}>ATTACKS</div>
                <button
                  onClick={addWeaponSlot}
                  style={{
                    padding: '0.3rem 0.8rem',
                    border: '1px solid #8b4513',
                    borderRadius: '4px',
                    background: '#8b4513',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6d3410'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8b4513'}
                >
                  + Add Weapon
                </button>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#8b4513' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr 0.7fr 0.8fr', gap: '0.5rem', marginBottom: '0.5rem', borderBottom: '1px solid #e5e5e5', paddingBottom: '0.3rem', alignItems: 'center' }}>
                  <span></span>
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
                {attacks.length === 0 ? (
                  <div style={{ textAlign: 'center', fontStyle: 'italic', padding: '2rem', color: '#666' }}>
                    No weapons added. Click "Add Weapon" to add your first weapon.
                  </div>
                ) : (
                  attacks.map((attack, index) => {
                    const weapon = attack.weaponId ? weaponsData.find(w => w.id === attack.weaponId) : null;
                    return (
                      <div key={attack.id} style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1fr 0.7fr 0.8fr', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                        <button
                          onClick={() => removeWeaponSlot(index)}
                          style={{
                            width: '24px',
                            height: '24px',
                            border: '1px solid #dc2626',
                            borderRadius: '4px',
                            background: '#dc2626',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                          title="Remove weapon"
                        >
                          ×
                        </button>
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
                  })
                )}
              </div>
            </div>
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white', marginBottom: '1rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', textAlign: 'center', marginBottom: '1rem' }}>INVENTORY</div>
              <div style={{ marginBottom: '1rem' }}>
                <button
                  onClick={addInventorySlot}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#8b4513',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6d3410'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8b4513'}
                >
                  + Add Item
                </button>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#8b4513' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '30px 100px 2fr 60px 30px 70px', gap: '0.5rem', marginBottom: '0.5rem', borderBottom: '1px solid #e5e5e5', paddingBottom: '0.3rem', alignItems: 'center' }}>
                  <span></span>
                  <span style={{ fontWeight: 'bold' }}>Type</span>
                  <span style={{ fontWeight: 'bold' }}>Item</span>
                  <span style={{ fontWeight: 'bold', textAlign: 'center' }}>Count</span>
                  <span style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    <span 
                      title="Item information"
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
                  <span style={{ fontWeight: 'bold', textAlign: 'center' }}>Cost</span>
                </div>
                {inventory.length === 0 ? (
                  <div style={{ textAlign: 'center', fontStyle: 'italic', padding: '2rem', color: '#666' }}>
                    No items added. Click "Add Item" to add your first item.
                  </div>
                ) : (
                  inventory.map((item, index) => {
                    const selectedItem = item.itemName ? allItems.find(i => i.name === item.itemName) : null;
                    return (
                      <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '30px 100px 2fr 60px 30px 70px', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                        <button
                          onClick={() => removeInventorySlot(index)}
                          style={{
                            width: '24px',
                            height: '24px',
                            border: '1px solid #dc2626',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            borderRadius: '4px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0'
                          }}
                          title="Remove item"
                        >
                          ×
                        </button>
                        <select
                          value={item.itemType}
                          onChange={(e) => handleInventoryItemSelect(index, e.target.value, false)}
                          style={{
                            padding: '0.3rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            backgroundColor: 'white'
                          }}
                        >
                          <option value="">Select Type</option>
                          <option value="Weapon">Weapon</option>
                          <option value="Armor">Armor</option>
                          <option value="Shield">Shield</option>
                          <option value="Adventuring Supply">Adventuring Supply</option>
                          <option value="Potion">Healing Potion</option>
                        </select>
                        <select
                          value={item.itemName}
                          onChange={(e) => handleInventoryItemSelect(index, e.target.value, true)}
                          style={{
                            padding: '0.3rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            backgroundColor: 'white'
                          }}
                          disabled={!item.itemType}
                        >
                          <option value="">Select Item</option>
                          {item.itemType && allItems
                            .filter(i => i.itemType === item.itemType)
                            .map(itemData => (
                              <option key={itemData.name} value={itemData.name}>
                                {itemData.name}
                              </option>
                            ))
                          }
                        </select>
                        <input
                          type="number"
                          min="1"
                          value={item.count}
                          onChange={(e) => handleInventoryCountChange(index, parseInt(e.target.value) || 1)}
                          style={{
                            padding: '0.3rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            textAlign: 'center',
                            backgroundColor: 'white'
                          }}
                        />
                        <div style={{ textAlign: 'center' }}>
                          {selectedItem ? (
                            <span 
                              title={getItemExtraInfo(selectedItem)}
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
                                cursor: 'help',
                                position: 'relative'
                              }}
                              onMouseEnter={(e) => {
                                const tooltip = document.createElement('div');
                                tooltip.innerHTML = getItemExtraInfo(selectedItem).replace(/\n/g, '<br/>');
                                tooltip.style.cssText = `
                                  position: absolute;
                                  background: #2d2d2d;
                                  color: white;
                                  padding: 8px 12px;
                                  border-radius: 6px;
                                  font-size: 12px;
                                  line-height: 1.4;
                                  white-space: nowrap;
                                  z-index: 1000;
                                  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                                  border: 1px solid #8b4513;
                                  max-width: 300px;
                                  white-space: normal;
                                  word-wrap: break-word;
                                `;
                                document.body.appendChild(tooltip);
                                const rect = e.currentTarget.getBoundingClientRect();
                                tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
                                tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
                                (e.currentTarget as any)._customTooltip = tooltip;
                              }}
                              onMouseLeave={(e) => {
                                const tooltip = (e.currentTarget as any)._customTooltip;
                                if (tooltip && tooltip.parentNode) {
                                  tooltip.parentNode.removeChild(tooltip);
                                }
                                (e.currentTarget as any)._customTooltip = null;
                              }}
                            >
                              i
                            </span>
                          ) : '-'}
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                          {getItemCost(selectedItem, item.count)}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </StyledRightColumn>
          <StyledRightColumn>
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
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white', marginBottom: '1rem', height: '512px', overflowY: 'auto' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', textAlign: 'center', marginBottom: '1rem' }}>FEATURES</div>
              {(() => {
                const ancestryFeatures = features.filter(f => f.source === 'ancestry');
                const classFeatures = features.filter(f => f.source === 'class');
                const choiceFeatures = features.filter(f => f.source === 'choice');
                return (
                  <div style={{ fontSize: '0.9rem', color: '#8b4513' }}>
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
                    {features.length === 0 && (
                      <div style={{ textAlign: 'center', fontStyle: 'italic', padding: '1rem', color: '#666' }}>
                        No features available
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
            <div style={{ border: '2px solid #8b4513', borderRadius: '8px', padding: '1rem', background: 'white' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b4513', marginBottom: '1rem', textAlign: 'center' }}>CURRENCY</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#e5e4e2', border: '1px solid #d3d3d3' }}></div>
                  <span style={{ fontSize: '0.9rem', color: '#8b4513', fontWeight: 'bold' }}>Platinum</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={currentValues.platinumPieces}
                  onChange={(e) => setCurrentValues(prev => ({
                    ...prev,
                    platinumPieces: parseInt(e.target.value) || 0
                  }))}
                  style={{
                    width: '60px',
                    padding: '0.2rem',
                    border: '1px solid #8b4513',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ffd700', border: '1px solid #b8860b' }}></div>
                  <span style={{ fontSize: '0.9rem', color: '#8b4513', fontWeight: 'bold' }}>Gold</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={currentValues.goldPieces}
                  onChange={(e) => setCurrentValues(prev => ({
                    ...prev,
                    goldPieces: parseInt(e.target.value) || 0
                  }))}
                  style={{
                    width: '60px',
                    padding: '0.2rem',
                    border: '1px solid #8b4513',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#daa520', border: '1px solid #b8860b' }}></div>
                  <span style={{ fontSize: '0.9rem', color: '#8b4513', fontWeight: 'bold' }}>Electrum</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={currentValues.electrumPieces}
                  onChange={(e) => setCurrentValues(prev => ({
                    ...prev,
                    electrumPieces: parseInt(e.target.value) || 0
                  }))}
                  style={{
                    width: '60px',
                    padding: '0.2rem',
                    border: '1px solid #8b4513',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#c0c0c0', border: '1px solid #a0a0a0' }}></div>
                  <span style={{ fontSize: '0.9rem', color: '#8b4513', fontWeight: 'bold' }}>Silver</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={currentValues.silverPieces}
                  onChange={(e) => setCurrentValues(prev => ({
                    ...prev,
                    silverPieces: parseInt(e.target.value) || 0
                  }))}
                  style={{
                    width: '60px',
                    padding: '0.2rem',
                    border: '1px solid #8b4513',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    backgroundColor: 'white'
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#b87333', border: '1px solid #8b4513' }}></div>
                  <span style={{ fontSize: '0.9rem', color: '#8b4513', fontWeight: 'bold' }}>Copper</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={currentValues.copperPieces}
                  onChange={(e) => setCurrentValues(prev => ({
                    ...prev,
                    copperPieces: parseInt(e.target.value) || 0
                  }))}
                  style={{
                    width: '60px',
                    padding: '0.2rem',
                    border: '1px solid #8b4513',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    backgroundColor: 'white'
                  }}
                />
              </div>
            </div>
          </StyledRightColumn>
        </StyledMainGrid>
      </StyledCharacterSheet>
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
