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

	// Early return if background data is not available
	if (!background) {
		return (
			<StyledContainer>
				<StyledSubheading>Background (Skills, Trades & Languages)</StyledSubheading>
				<div>Loading background data...</div>
			</StyledContainer>
		);
	}

	// Use typed data from state
	const currentSkills = state.skillsData || {};
	const currentTrades = state.tradesData || {};
	const currentLanguages = state.languagesData || { common: { fluency: 'fluent' } };

	// Mastery limits from centralized calculator
	const masteryLimits = {
		maxSkillMastery: calculationResult.validation.masteryLimits.maxSkillMastery,
		maxTradeMastery: calculationResult.validation.masteryLimits.maxTradeMastery,
		level1Validation: {
			valid: calculationResult.validation.masteryLimits.currentAdeptCount <= 1,
			adeptCount: calculationResult.validation.masteryLimits.currentAdeptCount
		}
	};

	// Conversion actions with proper logic using calculated values
	const actions = {
		convertSkillToTrade: () => {
			const currentSkillToTrade = state.skillToTradeConversions || 0;
			const { availableSkillPoints } = background;

			// Calculate current skill points used (this should come from summing the skillsData)
			const skillPointsUsed = Object.values(state.skillsData || {}).reduce(
				(sum, level) => sum + level,
				0
			);
			const remainingSkillPoints = availableSkillPoints - skillPointsUsed;

			// Only allow conversion if we have at least 1 skill point remaining
			if (remainingSkillPoints >= 1) {
				dispatch({
					type: 'SET_CONVERSIONS',
					conversions: { skillToTrade: currentSkillToTrade + 1 }
				});
			}
		},
		convertTradeToSkill: () => {
			const currentTradeToSkill = state.tradeToSkillConversions || 0;
			const { availableTradePoints } = background;

			// Calculate current trade points used
			const tradePointsUsed = Object.values(state.tradesData || {}).reduce(
				(sum, level) => sum + level,
				0
			);
			const remainingTradePoints = availableTradePoints - tradePointsUsed;

			// Only allow conversion if we have at least 2 trade points remaining (costs 2 trade = 1 skill)
			if (remainingTradePoints >= 2) {
				dispatch({
					type: 'SET_CONVERSIONS',
					conversions: { tradeToSkill: currentTradeToSkill + 2 }
				});
			}
		},
		convertTradeToLanguage: () => {
			const currentTradeToLanguage = state.tradeToLanguageConversions || 0;
			const { availableTradePoints } = background;

			// Calculate current trade points used
			const tradePointsUsed = Object.values(state.tradesData || {}).reduce(
				(sum, level) => sum + level,
				0
			);
			const remainingTradePoints = availableTradePoints - tradePointsUsed;

			// Only allow conversion if we have at least 1 trade point remaining
			if (remainingTradePoints >= 1) {
				dispatch({
					type: 'SET_CONVERSIONS',
					conversions: { tradeToLanguage: currentTradeToLanguage + 1 }
				});
			}
		},
		resetConversions: () => {
			dispatch({
				type: 'SET_CONVERSIONS',
				conversions: { skillToTrade: 0, tradeToSkill: 0, tradeToLanguage: 0 }
			});
		}
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
						pointsData={background}
						conversions={{
							skillToTradeConversions: background.conversions.skillToTrade,
							tradeToSkillConversions: background.conversions.tradeToSkill,
							tradeToLanguageConversions: background.conversions.tradeToLanguage
						}}
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
						conversions={{
							skillToTradeConversions: background.conversions.skillToTrade,
							tradeToSkillConversions: background.conversions.tradeToSkill,
							tradeToLanguageConversions: background.conversions.tradeToLanguage
						}}
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
						conversions={{
							skillToTradeConversions: background.conversions.skillToTrade,
							tradeToSkillConversions: background.conversions.tradeToSkill,
							tradeToLanguageConversions: background.conversions.tradeToLanguage
						}}
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
					(5 base + {state.attribute_intelligence} Int
					{background.baseSkillPoints - 5 - state.attribute_intelligence > 0
						? ` + ${background.baseSkillPoints - 5 - state.attribute_intelligence} bonus`
						: ''}
					)
				</span>
				, <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{background.baseTradePoints}</span>{' '}
				trade points
				{background.baseTradePoints > 3 ? (
					<span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
						{' '}
						(3 base + {background.baseTradePoints - 3} bonus)
					</span>
				) : (
					''
				)}
				, and{' '}
				<span style={{ fontWeight: 'bold', color: '#3b82f6' }}>
					{background.baseLanguagePoints}
				</span>{' '}
				language points
				{background.baseLanguagePoints > 2 ? (
					<span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
						{' '}
						(2 base + {background.baseLanguagePoints - 2} bonus)
					</span>
				) : (
					''
				)}
				. <br />
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
