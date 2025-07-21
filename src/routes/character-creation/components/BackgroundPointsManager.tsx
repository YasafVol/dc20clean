import React from 'react';

export interface BackgroundPointsData {
  skillPointsUsed: number;
  tradePointsUsed: number;
  languagePointsUsed: number;
  baseSkillPoints: number;
  baseTradePoints: number;
  baseLanguagePoints: number;
  availableSkillPoints: number;
  availableTradePoints: number;
  availableLanguagePoints: number;
}

export interface PointConversions {
  skillToTradeConversions: number;
  tradeToSkillConversions: number;
  tradeToLanguageConversions: number;
}

export interface ConversionActions {
  convertSkillToTrade: () => void;
  convertTradeToSkill: () => void;
  convertTradeToLanguage: () => void;
  resetConversions: () => void;
}

export const useBackgroundPoints = (
  skillPointsUsed: number,
  tradePointsUsed: number,
  languagePointsUsed: number,
  intelligenceModifier: number
) => {
  const [skillToTradeConversions, setSkillToTradeConversions] = React.useState(0);
  const [tradeToSkillConversions, setTradeToSkillConversions] = React.useState(0);
  const [tradeToLanguageConversions, setTradeToLanguageConversions] = React.useState(0);

  // Base points according to DC20 rules
  const baseSkillPoints = 5 + intelligenceModifier;
  const baseTradePoints = 3;
  const baseLanguagePoints = 2;
  
  // Calculate available points after conversions
  const availableSkillPoints = baseSkillPoints - skillToTradeConversions + Math.floor(tradeToSkillConversions / 2);
  const availableTradePoints = baseTradePoints - tradeToSkillConversions + (skillToTradeConversions * 2) - tradeToLanguageConversions;
  const availableLanguagePoints = baseLanguagePoints + (tradeToLanguageConversions * 2);
  
  // Conversion functions
  const convertSkillToTrade = () => {
    if (skillPointsUsed + 1 <= availableSkillPoints) {
      setSkillToTradeConversions(prev => prev + 1);
    }
  };
  
  const convertTradeToSkill = () => {
    if (tradeToSkillConversions + 2 <= baseTradePoints + (skillToTradeConversions * 2) && tradePointsUsed + 2 <= availableTradePoints) {
      setTradeToSkillConversions(prev => prev + 2);
    }
  };
  
  const convertTradeToLanguage = () => {
    if (availableTradePoints - tradePointsUsed >= 1) {
      setTradeToLanguageConversions(prev => prev + 1);
    }
  };
  
  const resetConversions = () => {
    setSkillToTradeConversions(0);
    setTradeToSkillConversions(0);
    setTradeToLanguageConversions(0);
  };

  const pointsData: BackgroundPointsData = {
    skillPointsUsed,
    tradePointsUsed,
    languagePointsUsed,
    baseSkillPoints,
    baseTradePoints,
    baseLanguagePoints,
    availableSkillPoints,
    availableTradePoints,
    availableLanguagePoints,
  };

  const conversions: PointConversions = {
    skillToTradeConversions,
    tradeToSkillConversions,
    tradeToLanguageConversions,
  };

  const actions: ConversionActions = {
    convertSkillToTrade,
    convertTradeToSkill,
    convertTradeToLanguage,
    resetConversions,
  };

  return { pointsData, conversions, actions };
};
