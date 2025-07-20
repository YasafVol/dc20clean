import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { skillsData } from '../../lib/rulesdata/skills';
import { tradesData } from '../../lib/rulesdata/trades';
import { knowledgeData } from '../../lib/rulesdata/knowledge';
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

// Combine trades and knowledge for selection
const allTradesAndKnowledge = [...tradesData, ...knowledgeData];

type TabType = 'skills' | 'trades' | 'languages';

const Background: React.FC = () => {
  const { state, dispatch } = useCharacter();
  const [activeTab, setActiveTab] = React.useState<TabType>('skills');
  
  // State for point conversions
  const [skillToTradeConversions, setSkillToTradeConversions] = React.useState(0); // How many skill points converted to trade points
  const [tradeToSkillConversions, setTradeToSkillConversions] = React.useState(0); // How many trade points converted to skill points
  const [tradeToLanguageConversions, setTradeToLanguageConversions] = React.useState(0); // How many trade points converted to language points

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

  // DC20 Background rules:
  // - 5 Skill Points + Intelligence modifier (subtract if negative)
  // - 3 Trade Points (base)
  // - 2 Language Points (base)
  // - Can convert: 1 Skill Point ↔ 2 Trade Points
  // - Can convert: 1 Trade Point → 2 Language Points
  const intelligenceModifier = state.attribute_intelligence;
  const baseSkillPoints = 5 + intelligenceModifier; // Add Intelligence modifier
  const baseTradePoints = 3;
  const baseLanguagePoints = 2;
  
  // Calculate available points after conversions
  // 1 Skill Point = 2 Trade Points, so:
  // - Converting 1 skill point gives 2 trade points
  // - Converting 2 trade points gives 1 skill point
  // 1 Trade Point = 2 Language Points:
  // - Converting 1 trade point gives 2 language points
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

  const canIncreaseProficiency = (pointCost: number, pointsUsed: number, availablePoints: number) => {
    return pointsUsed + pointCost <= availablePoints;
  };

  const getLanguageCost = (fluency: 'basic' | 'advanced' | 'fluent') => {
    return fluency === 'basic' ? 1 : fluency === 'advanced' ? 2 : 3;
  };

  // Helper function for consistent button styling
  const getButtonStyle = (enabled: boolean, variant: 'primary' | 'danger' = 'primary') => ({
    padding: '0.5rem 1rem',
    backgroundColor: enabled 
      ? (variant === 'primary' ? '#3b82f6' : '#ef4444')
      : '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: enabled ? 'pointer' : 'not-allowed',
    transition: 'all 0.2s ease',
    opacity: enabled ? 1 : 0.6,
    ':hover': enabled ? {
      backgroundColor: variant === 'primary' ? '#2563eb' : '#dc2626',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    } : {}
  });

  const renderSkillsTab = () => (
    <StyledTabContent>
      <StyledPointsRemaining>
        Skill Points: {availableSkillPoints - skillPointsUsed} / {availableSkillPoints} remaining
        {intelligenceModifier !== 0 && (
          <div style={{ 
            fontSize: '0.9rem', 
            color: intelligenceModifier > 0 ? '#10b981' : '#ef4444', 
            marginTop: '0.5rem',
            padding: '0.25rem 0.5rem',
            backgroundColor: intelligenceModifier > 0 ? '#065f461a' : '#dc26261a',
            borderRadius: '4px',
            border: `1px solid ${intelligenceModifier > 0 ? '#10b981' : '#ef4444'}33`
          }}>
            Intelligence modifier: {intelligenceModifier > 0 ? '+' : ''}{intelligenceModifier}
          </div>
        )}
        {(skillToTradeConversions > 0 || tradeToSkillConversions > 0 || tradeToLanguageConversions > 0) && (
          <div style={{ 
            fontSize: '0.9rem', 
            color: '#6366f1', 
            marginTop: '0.5rem',
            padding: '0.25rem 0.5rem',
            backgroundColor: '#6366f11a',
            borderRadius: '4px',
            border: '1px solid #6366f133'
          }}>
            Active conversions: {skillToTradeConversions > 0 ? `${skillToTradeConversions} skill → ${skillToTradeConversions * 2} trade` : ''}
            {(skillToTradeConversions > 0 && (tradeToSkillConversions > 0 || tradeToLanguageConversions > 0)) ? ', ' : ''}
            {tradeToSkillConversions > 0 ? `${tradeToSkillConversions} trade → ${Math.floor(tradeToSkillConversions / 2)} skill` : ''}
            {(tradeToSkillConversions > 0 && tradeToLanguageConversions > 0) ? ', ' : ''}
            {tradeToLanguageConversions > 0 ? `${tradeToLanguageConversions} trade → ${tradeToLanguageConversions * 2} language` : ''}
          </div>
        )}
        <div style={{ 
          marginTop: '0.75rem', 
          display: 'flex', 
          gap: '0.5rem', 
          flexWrap: 'wrap' 
        }}>
          <button 
            onClick={convertSkillToTrade} 
            disabled={availableSkillPoints - skillPointsUsed < 1}
            style={getButtonStyle(availableSkillPoints - skillPointsUsed >= 1)}
            onMouseEnter={(e) => {
              if (availableSkillPoints - skillPointsUsed >= 1) {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (availableSkillPoints - skillPointsUsed >= 1) {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            Convert 1 Skill → 2 Trade Points
          </button>
          <button 
            onClick={resetConversions} 
            disabled={skillToTradeConversions === 0 && tradeToSkillConversions === 0 && tradeToLanguageConversions === 0}
            style={getButtonStyle(skillToTradeConversions > 0 || tradeToSkillConversions > 0 || tradeToLanguageConversions > 0, 'danger')}
            onMouseEnter={(e) => {
              if (skillToTradeConversions > 0 || tradeToSkillConversions > 0 || tradeToLanguageConversions > 0) {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (skillToTradeConversions > 0 || tradeToSkillConversions > 0 || tradeToLanguageConversions > 0) {
                e.currentTarget.style.backgroundColor = '#ef4444';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            Reset Conversions
          </button>
        </div>
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
                    $disabled={level > currentLevel && !canIncreaseProficiency(level - currentLevel, skillPointsUsed, availableSkillPoints)}
                    onClick={() => {
                      if (level <= currentLevel || canIncreaseProficiency(level - currentLevel, skillPointsUsed, availableSkillPoints)) {
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
        Trade Points: {availableTradePoints - tradePointsUsed} / {availableTradePoints} remaining
        {(skillToTradeConversions > 0 || tradeToSkillConversions > 0 || tradeToLanguageConversions > 0) && (
          <div style={{ 
            fontSize: '0.9rem', 
            color: '#6366f1', 
            marginTop: '0.5rem',
            padding: '0.25rem 0.5rem',
            backgroundColor: '#6366f11a',
            borderRadius: '4px',
            border: '1px solid #6366f133'
          }}>
            Active conversions: {skillToTradeConversions > 0 ? `${skillToTradeConversions} skill → ${skillToTradeConversions * 2} trade` : ''}
            {(skillToTradeConversions > 0 && (tradeToSkillConversions > 0 || tradeToLanguageConversions > 0)) ? ', ' : ''}
            {tradeToSkillConversions > 0 ? `${tradeToSkillConversions} trade → ${Math.floor(tradeToSkillConversions / 2)} skill` : ''}
            {(tradeToSkillConversions > 0 && tradeToLanguageConversions > 0) ? ', ' : ''}
            {tradeToLanguageConversions > 0 ? `${tradeToLanguageConversions} trade → ${tradeToLanguageConversions * 2} language` : ''}
          </div>
        )}
        <div style={{ 
          marginTop: '0.75rem', 
          display: 'flex', 
          gap: '0.5rem', 
          flexWrap: 'wrap' 
        }}>
          <button 
            onClick={convertTradeToSkill} 
            disabled={availableTradePoints - tradePointsUsed < 2}
            style={getButtonStyle(availableTradePoints - tradePointsUsed >= 2)}
            onMouseEnter={(e) => {
              if (availableTradePoints - tradePointsUsed >= 2) {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (availableTradePoints - tradePointsUsed >= 2) {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            Convert 2 Trade → 1 Skill Point
          </button>
          <button 
            onClick={convertTradeToLanguage} 
            disabled={availableTradePoints - tradePointsUsed < 1}
            style={getButtonStyle(availableTradePoints - tradePointsUsed >= 1)}
            onMouseEnter={(e) => {
              if (availableTradePoints - tradePointsUsed >= 1) {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (availableTradePoints - tradePointsUsed >= 1) {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            Convert 1 Trade → 2 Language Points
          </button>
          <button 
            onClick={resetConversions} 
            disabled={skillToTradeConversions === 0 && tradeToSkillConversions === 0 && tradeToLanguageConversions === 0}
            style={getButtonStyle(skillToTradeConversions > 0 || tradeToSkillConversions > 0 || tradeToLanguageConversions > 0, 'danger')}
            onMouseEnter={(e) => {
              if (skillToTradeConversions > 0 || tradeToSkillConversions > 0 || tradeToLanguageConversions > 0) {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (skillToTradeConversions > 0 || tradeToSkillConversions > 0 || tradeToLanguageConversions > 0) {
                e.currentTarget.style.backgroundColor = '#ef4444';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            Reset Conversions
          </button>
        </div>
      </StyledPointsRemaining>
      <StyledSelectionGrid>
        {allTradesAndKnowledge.map(trade => {
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
                    $disabled={level > currentLevel && !canIncreaseProficiency(level - currentLevel, tradePointsUsed, availableTradePoints)}
                    onClick={() => {
                      if (level <= currentLevel || canIncreaseProficiency(level - currentLevel, tradePointsUsed, availableTradePoints)) {
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
        Language Points: {availableLanguagePoints - languagePointsUsed} / {availableLanguagePoints} remaining
        {tradeToLanguageConversions > 0 && (
          <div style={{ 
            fontSize: '0.9rem', 
            color: '#6366f1', 
            marginTop: '0.5rem',
            padding: '0.25rem 0.5rem',
            backgroundColor: '#6366f11a',
            borderRadius: '4px',
            border: '1px solid #6366f133'
          }}>
            Active conversions: {tradeToLanguageConversions} trade → {tradeToLanguageConversions * 2} language
          </div>
        )}
        <div style={{ 
          marginTop: '0.75rem', 
          display: 'flex', 
          gap: '0.5rem', 
          flexWrap: 'wrap' 
        }}>
          <button 
            onClick={convertTradeToLanguage} 
            disabled={availableTradePoints - tradePointsUsed < 1}
            style={getButtonStyle(availableTradePoints - tradePointsUsed >= 1)}
            onMouseEnter={(e) => {
              if (availableTradePoints - tradePointsUsed >= 1) {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (availableTradePoints - tradePointsUsed >= 1) {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            Convert 1 Trade → 2 Language Points
          </button>
          <button 
            onClick={resetConversions} 
            disabled={skillToTradeConversions === 0 && tradeToSkillConversions === 0 && tradeToLanguageConversions === 0}
            style={getButtonStyle(skillToTradeConversions > 0 || tradeToSkillConversions > 0 || tradeToLanguageConversions > 0, 'danger')}
            onMouseEnter={(e) => {
              if (skillToTradeConversions > 0 || tradeToSkillConversions > 0 || tradeToLanguageConversions > 0) {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (skillToTradeConversions > 0 || tradeToSkillConversions > 0 || tradeToLanguageConversions > 0) {
                e.currentTarget.style.backgroundColor = '#ef4444';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            Reset Conversions
          </button>
        </div>
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
                  const canAfford = isCommon || currentFluency === fluency || languagePointsUsed + cost <= availableLanguagePoints;
                  
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
        Choose your character's background skills, trades, and languages. You have{' '}
        <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{baseSkillPoints}</span> skill points{' '}
        <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>(5 + Intelligence modifier)</span>,{' '}
        <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{baseTradePoints}</span> trade points, and{' '}
        <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{baseLanguagePoints}</span> language points.{' '}
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
          Skills ({availableSkillPoints - skillPointsUsed} left)
        </StyledTab>
        <StyledTab 
          $active={activeTab === 'trades'} 
          onClick={() => setActiveTab('trades')}
        >
          Trades ({availableTradePoints - tradePointsUsed} left)
        </StyledTab>
        <StyledTab 
          $active={activeTab === 'languages'} 
          onClick={() => setActiveTab('languages')}
        >
          Languages ({availableLanguagePoints - languagePointsUsed} left)
        </StyledTab>
      </StyledTabContainer>

      {activeTab === 'skills' && renderSkillsTab()}
      {activeTab === 'trades' && renderTradesTab()}
      {activeTab === 'languages' && renderLanguagesTab()}
    </StyledContainer>
  );
};

export default Background;
