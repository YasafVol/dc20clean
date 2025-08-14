import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import SkillsTab from './components/SkillsTab';
import TradesTab from './components/TradesTab';
import LanguagesTab from './components/LanguagesTab';
import { InlineError } from './components/ValidationFeedback';
import { BuildStep } from '../../lib/types/effectSystem';
import {
	StyledContainer,
	StyledSubheading,
	StyledDescription,
	StyledTabContainer,
	StyledTab
} from './styles/Background.styles.ts';

type TabType = 'skills' | 'trades' | 'languages';

const Background: React.FC = () => {
	const { state, dispatch, calculationResult } = useCharacter();
	const [activeTab, setActiveTab] = React.useState<TabType>('skills');
	
	// Get background data from the centralized calculator
	const { background, validation } = calculationResult;
	
	if (!background) {
		return (
			<StyledContainer>
				<StyledSubheading>Background (Skills, Trades & Languages)</StyledSubheading>
				<div>Loading background calculations...</div>
			</StyledContainer>
		);
	}

	// Use typed data from state
	const currentSkills = state.skillsData || {};
	const currentTrades = state.tradesData || {};
	const currentLanguages = state.languagesData || { common: { fluency: 'fluent' } };

	// For now, we'll create a simplified masteryLimits object
	// TODO: This should come from the calculator in a future enhancement
	const masteryLimits = {
		maxSkillMastery: 2, // Level 1 characters can reach Adept
		maxTradeMastery: 2,
		level1Validation: {
			valid: true,
			adeptCount: 0
		}
	};

	// For now, we'll create simplified conversion actions
	// TODO: These should be integrated with the calculator in a future enhancement
	const actions = {
		convertSkillToTrade: () => console.log('Conversion not yet implemented'),
		convertTradeToSkill: () => console.log('Conversion not yet implemented'),
		convertTradeToLanguage: () => console.log('Conversion not yet implemented'),
		resetConversions: () => console.log('Conversion not yet implemented')
	};

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
			skillsData: updatedSkills
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
			tradesData: updatedTrades
		});
	};

	const handleLanguageChange = (languageId: string, fluency: 'limited' | 'fluent' | null) => {
		const updatedLanguages = { ...currentLanguages };
		if (fluency === null) {
			delete updatedLanguages[languageId];
		} else {
			updatedLanguages[languageId] = { fluency };
		}

		dispatch({
			type: 'UPDATE_LANGUAGES',
			languagesData: updatedLanguages
		});
	};

	const renderCurrentTab = () => {
		switch (activeTab) {
			case 'skills':
				return (
					<SkillsTab
						currentSkills={currentSkills}
						currentTrades={currentTrades}
						pointsData={background}
						conversions={background.conversions}
						actions={actions}
						masteryLimits={masteryLimits}
						onSkillChange={handleSkillChange}
					/>
				);
			case 'trades':
				return (
					<TradesTab
						currentTrades={currentTrades}
						currentSkills={currentSkills}
						pointsData={background}
						conversions={background.conversions}
						actions={actions}
						masteryLimits={masteryLimits}
						onTradeChange={handleTradeChange}
					/>
				);
			case 'languages':
				return (
					<LanguagesTab
						currentLanguages={currentLanguages}
						pointsData={background}
						conversions={background.conversions}
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
			<InlineError errors={validation.errors} currentStep={BuildStep.Background} />
			<StyledDescription>
				Choose your character's background skills, trades, and languages. You have{' '}
				<span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{background.baseSkillPoints}</span>{' '}
				skill points{' '}
				<span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
					(5 base + {state.attribute_intelligence} Int{background.baseSkillPoints - 5 - state.attribute_intelligence > 0 ? ` + ${background.baseSkillPoints - 5 - state.attribute_intelligence} bonus` : ''})
				</span>,{' '}
				<span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{background.baseTradePoints}</span>{' '}
				trade points{background.baseTradePoints > 3 ? <span style={{ fontSize: '0.9rem', color: '#6b7280' }}> (3 base + {background.baseTradePoints - 3} bonus)</span> : ''}, and{' '}
				<span style={{ fontWeight: 'bold', color: '#3b82f6' }}>
					{background.baseLanguagePoints}
				</span>{' '}
				language points{background.baseLanguagePoints > 2 ? <span style={{ fontSize: '0.9rem', color: '#6b7280' }}> (2 base + {background.baseLanguagePoints - 2} bonus)</span> : ''}. <br />
				<span
					style={{
						marginTop: '0.5rem',
						display: 'inline-block',
						padding: '0.25rem 0.5rem',
						backgroundColor: '#f3f4f6',
						borderRadius: '4px',
						fontSize: '0.9rem',
						color: '#374151'
					}}
				>
					💡 Conversions: 1 skill ↔ 2 trade • 1 trade → 2 language
				</span>
				<br />
				All characters start fluent in Common for free.
			</StyledDescription>

			<StyledTabContainer>
				<StyledTab $active={activeTab === 'skills'} onClick={() => setActiveTab('skills')}>
					Skills ({background.availableSkillPoints - background.skillPointsUsed} left)
				</StyledTab>
				<StyledTab $active={activeTab === 'trades'} onClick={() => setActiveTab('trades')}>
					Trades ({background.availableTradePoints - background.tradePointsUsed} left)
				</StyledTab>
				<StyledTab $active={activeTab === 'languages'} onClick={() => setActiveTab('languages')}>
					Languages ({background.availableLanguagePoints - background.languagePointsUsed} left)
				</StyledTab>
			</StyledTabContainer>

			{renderCurrentTab()}
		</StyledContainer>
	);
};

export default Background;
