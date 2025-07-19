import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { skillsData } from '../../lib/rulesdata/skills';
import { tradesData } from '../../lib/rulesdata/trades';
import { languagesData } from '../../lib/rulesdata/languages';
import {
  StyledContainer,
  StyledSubheading,
  StyledDescription,
  StyledTabContainer,
  StyledTab,
  StyledTabContent,
  StyledSelectionGrid,
  StyledSelectionItem,
  StyledSelectionHeader,
  StyledSelectionName,
  StyledProficiencySelector,
  StyledProficiencyButton,
  StyledLanguageFluency,
  StyledPointsRemaining
} from './styles/Background.styles.ts';

type TabType = 'skills' | 'trades' | 'languages';

const Background: React.FC = () => {
  const { state, dispatch } = useCharacter();
  const [activeTab, setActiveTab] = React.useState<TabType>('skills');

  // Parse current selections
  const currentSkills = state.skillsJson ? JSON.parse(state.skillsJson) : {};
  const currentTrades = state.tradesJson ? JSON.parse(state.tradesJson) : {};
  const currentLanguages = state.languagesJson ? JSON.parse(state.languagesJson) : { common: { fluency: 'fluent' } };

  // Calculate points used
  const skillPointsUsed = Object.values(currentSkills).reduce((sum: number, level: any) => sum + level, 0);
  const tradePointsUsed = Object.values(currentTrades).reduce((sum: number, level: any) => sum + level, 0);
  const languagePointsUsed = Object.entries(currentLanguages).reduce((sum, [langId, data]: [string, any]) => {
    if (langId === 'common') return sum; // Common is free
    return sum + (data.fluency === 'basic' ? 1 : data.fluency === 'advanced' ? 2 : data.fluency === 'fluent' ? 3 : 0);
  }, 0);

  // Background gives 5 points each for skills, trades, and 3 points for languages (DC20 rules)
  const maxSkillPoints = 5;
  const maxTradePoints = 5;
  const maxLanguagePoints = 3;

  const handleSkillChange = (skillId: string, newLevel: number) => {
    const updatedSkills = { ...currentSkills };
    if (newLevel === 0) {
      delete updatedSkills[skillId];
    } else {
      updatedSkills[skillId] = newLevel;
    }
    
    dispatch({
      type: 'UPDATE_SKILLS',
      skillsJson: JSON.stringify(updatedSkills)
    });
  };

  const handleTradeChange = (tradeId: string, newLevel: number) => {
    const updatedTrades = { ...currentTrades };
    if (newLevel === 0) {
      delete updatedTrades[tradeId];
    } else {
      updatedTrades[tradeId] = newLevel;
    }
    
    dispatch({
      type: 'UPDATE_TRADES',
      tradesJson: JSON.stringify(updatedTrades)
    });
  };

  const handleLanguageChange = (languageId: string, fluency: 'basic' | 'advanced' | 'fluent' | null) => {
    const updatedLanguages = { ...currentLanguages };
    if (fluency === null) {
      delete updatedLanguages[languageId];
    } else {
      updatedLanguages[languageId] = { fluency };
    }
    
    dispatch({
      type: 'UPDATE_LANGUAGES',
      languagesJson: JSON.stringify(updatedLanguages)
    });
  };

  const canIncreaseProficiency = (pointCost: number, pointsUsed: number, maxPoints: number) => {
    return pointsUsed + pointCost <= maxPoints;
  };

  const getLanguageCost = (fluency: 'basic' | 'advanced' | 'fluent') => {
    return fluency === 'basic' ? 1 : fluency === 'advanced' ? 2 : 3;
  };

  const renderSkillsTab = () => (
    <StyledTabContent>
      <StyledPointsRemaining>
        Skill Points: {maxSkillPoints - skillPointsUsed} / {maxSkillPoints} remaining
      </StyledPointsRemaining>
      <StyledSelectionGrid>
        {skillsData.map(skill => {
          const currentLevel = currentSkills[skill.id] || 0;
          return (
            <StyledSelectionItem key={skill.id}>
              <StyledSelectionHeader>
                <StyledSelectionName>{skill.name}</StyledSelectionName>
                <div style={{ fontSize: '0.8rem', color: '#e2e8f0', textTransform: 'uppercase' }}>
                  {skill.attributeAssociation}
                </div>
              </StyledSelectionHeader>
              <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                {skill.description}
              </div>
              <StyledProficiencySelector>
                {[0, 1, 2, 3, 4, 5].map(level => (
                  <StyledProficiencyButton
                    key={level}
                    $active={currentLevel === level}
                    $disabled={level > currentLevel && !canIncreaseProficiency(level - currentLevel, skillPointsUsed, maxSkillPoints)}
                    onClick={() => {
                      if (level <= currentLevel || canIncreaseProficiency(level - currentLevel, skillPointsUsed, maxSkillPoints)) {
                        handleSkillChange(skill.id, level);
                      }
                    }}
                  >
                    {level}
                  </StyledProficiencyButton>
                ))}
              </StyledProficiencySelector>
            </StyledSelectionItem>
          );
        })}
      </StyledSelectionGrid>
    </StyledTabContent>
  );

  const renderTradesTab = () => (
    <StyledTabContent>
      <StyledPointsRemaining>
        Trade Points: {maxTradePoints - tradePointsUsed} / {maxTradePoints} remaining
      </StyledPointsRemaining>
      <StyledSelectionGrid>
        {tradesData.map(trade => {
          const currentLevel = currentTrades[trade.id] || 0;
          return (
            <StyledSelectionItem key={trade.id}>
              <StyledSelectionHeader>
                <StyledSelectionName>{trade.name}</StyledSelectionName>
                <div style={{ fontSize: '0.8rem', color: '#e2e8f0', textTransform: 'uppercase' }}>
                  {trade.attributeAssociation}
                </div>
              </StyledSelectionHeader>
              <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                {trade.description}
              </div>
              {trade.tools && (
                <div style={{ fontSize: '0.8rem', color: '#fbbf24', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                  Tools: {trade.tools}
                </div>
              )}
              <StyledProficiencySelector>
                {[0, 1, 2, 3, 4, 5].map(level => (
                  <StyledProficiencyButton
                    key={level}
                    $active={currentLevel === level}
                    $disabled={level > currentLevel && !canIncreaseProficiency(level - currentLevel, tradePointsUsed, maxTradePoints)}
                    onClick={() => {
                      if (level <= currentLevel || canIncreaseProficiency(level - currentLevel, tradePointsUsed, maxTradePoints)) {
                        handleTradeChange(trade.id, level);
                      }
                    }}
                  >
                    {level}
                  </StyledProficiencyButton>
                ))}
              </StyledProficiencySelector>
            </StyledSelectionItem>
          );
        })}
      </StyledSelectionGrid>
    </StyledTabContent>
  );

  const renderLanguagesTab = () => (
    <StyledTabContent>
      <StyledPointsRemaining>
        Language Points: {maxLanguagePoints - languagePointsUsed} / {maxLanguagePoints} remaining
      </StyledPointsRemaining>
      <StyledSelectionGrid>
        {languagesData.map(language => {
          const currentFluency = currentLanguages[language.id]?.fluency || null;
          const isCommon = language.id === 'common';
          
          return (
            <StyledSelectionItem key={language.id}>
              <StyledSelectionHeader>
                <StyledSelectionName>
                  {language.name}
                  {isCommon && <span style={{ color: '#10b981', fontSize: '0.8rem', marginLeft: '0.5rem' }}>(Free)</span>}
                </StyledSelectionName>
                <div style={{ fontSize: '0.8rem', color: '#e2e8f0', textTransform: 'uppercase' }}>
                  {language.type}
                </div>
              </StyledSelectionHeader>
              <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                {language.description}
              </div>
              <StyledLanguageFluency>
                {!isCommon && (
                  <StyledProficiencyButton
                    $active={currentFluency === null}
                    onClick={() => handleLanguageChange(language.id, null)}
                  >
                    None
                  </StyledProficiencyButton>
                )}
                {(['basic', 'advanced', 'fluent'] as const).map(fluency => {
                  const cost = getLanguageCost(fluency);
                  const canAfford = isCommon || currentFluency === fluency || languagePointsUsed + cost <= maxLanguagePoints;
                  
                  return (
                    <StyledProficiencyButton
                      key={fluency}
                      $active={currentFluency === fluency}
                      $disabled={!canAfford && !isCommon}
                      onClick={() => {
                        if (isCommon || canAfford) {
                          handleLanguageChange(language.id, fluency);
                        }
                      }}
                    >
                      {fluency.charAt(0).toUpperCase() + fluency.slice(1)} {!isCommon && `(${cost})`}
                    </StyledProficiencyButton>
                  );
                })}
              </StyledLanguageFluency>
            </StyledSelectionItem>
          );
        })}
      </StyledSelectionGrid>
    </StyledTabContent>
  );

  return (
    <StyledContainer>
      <StyledSubheading>Background (Skills, Trades & Languages)</StyledSubheading>
      <StyledDescription>
        Choose your character's background skills, trades, and languages. You have 5 points to spend on skills, 
        5 points on trades, and 3 points on languages. All characters start fluent in Common for free.
      </StyledDescription>
      
      <StyledTabContainer>
        <StyledTab 
          $active={activeTab === 'skills'} 
          onClick={() => setActiveTab('skills')}
        >
          Skills ({maxSkillPoints - skillPointsUsed} left)
        </StyledTab>
        <StyledTab 
          $active={activeTab === 'trades'} 
          onClick={() => setActiveTab('trades')}
        >
          Trades ({maxTradePoints - tradePointsUsed} left)
        </StyledTab>
        <StyledTab 
          $active={activeTab === 'languages'} 
          onClick={() => setActiveTab('languages')}
        >
          Languages ({maxLanguagePoints - languagePointsUsed} left)
        </StyledTab>
      </StyledTabContainer>

      {activeTab === 'skills' && renderSkillsTab()}
      {activeTab === 'trades' && renderTradesTab()}
      {activeTab === 'languages' && renderLanguagesTab()}
    </StyledContainer>
  );
};

export default Background;
