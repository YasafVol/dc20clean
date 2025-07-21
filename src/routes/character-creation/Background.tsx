import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { useBackgroundPoints } from './components/BackgroundPointsManager';
import SkillsTab from './components/SkillsTab';
import TradesTab from './components/TradesTab';
import LanguagesTab from './components/LanguagesTab';
import {
  StyledContainer,
  StyledSubheading,
  StyledDescription,
  StyledTabContainer,
  StyledTab
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

  // Use the background points manager hook
  const { pointsData, conversions, actions } = useBackgroundPoints(
    skillPointsUsed,
    tradePointsUsed,
    languagePointsUsed,
    state.attribute_intelligence
  );

  // Handler functions
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

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'skills':
        return (
          <SkillsTab
            currentSkills={currentSkills}
            pointsData={pointsData}
            conversions={conversions}
            actions={actions}
            onSkillChange={handleSkillChange}
          />
        );
      case 'trades':
        return (
          <TradesTab
            currentTrades={currentTrades}
            pointsData={pointsData}
            conversions={conversions}
            actions={actions}
            onTradeChange={handleTradeChange}
          />
        );
      case 'languages':
        return (
          <LanguagesTab
            currentLanguages={currentLanguages}
            pointsData={pointsData}
            conversions={conversions}
            actions={actions}
            onLanguageChange={handleLanguageChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <StyledContainer>
      <StyledSubheading>Background (Skills, Trades & Languages)</StyledSubheading>
      <StyledDescription>
        Choose your character's background skills, trades, and languages. You have{' '}
        <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{pointsData.baseSkillPoints}</span> skill points{' '}
        <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>(5 + Intelligence modifier)</span>,{' '}
        <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{pointsData.baseTradePoints}</span> trade points, and{' '}
        <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{pointsData.baseLanguagePoints}</span> language points.{' '}
        <br />
        <span style={{ 
          marginTop: '0.5rem', 
          display: 'inline-block',
          padding: '0.25rem 0.5rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          fontSize: '0.9rem',
          color: '#374151'
        }}>
          💡 Conversions: 1 skill ↔ 2 trade • 1 trade → 2 language
        </span>
        <br />
        All characters start fluent in Common for free.
      </StyledDescription>
      
      <StyledTabContainer>
        <StyledTab 
          $active={activeTab === 'skills'} 
          onClick={() => setActiveTab('skills')}
        >
          Skills ({pointsData.availableSkillPoints - pointsData.skillPointsUsed} left)
        </StyledTab>
        <StyledTab 
          $active={activeTab === 'trades'} 
          onClick={() => setActiveTab('trades')}
        >
          Trades ({pointsData.availableTradePoints - pointsData.tradePointsUsed} left)
        </StyledTab>
        <StyledTab 
          $active={activeTab === 'languages'} 
          onClick={() => setActiveTab('languages')}
        >
          Languages ({pointsData.availableLanguagePoints - pointsData.languagePointsUsed} left)
        </StyledTab>
      </StyledTabContainer>

      {renderCurrentTab()}
    </StyledContainer>
  );
};

export default Background;
