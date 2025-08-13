import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { useBackgroundPoints } from './components/BackgroundPointsManager';
import { findClassByName } from '../../lib/rulesdata/loaders/class-features.loader';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
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

	// NEW: Use typed data instead of JSON parsing
	const currentSkills = state.skillsData || {};
	const currentTrades = state.tradesData || {};
	const currentLanguages = state.languagesData || { common: { fluency: 'fluent' } };

	// Calculate points used
	const skillPointsUsed = Object.values(currentSkills).reduce(
		(sum: number, level: any) => sum + level,
		0
	);
	const tradePointsUsed = Object.values(currentTrades).reduce(
		(sum: number, level: any) => sum + level,
		0
	);
	const languagePointsUsed = Object.entries(currentLanguages).reduce(
		(sum, [langId, data]: [string, any]) => {
			if (langId === 'common') return sum; // Common is free
			return sum + (data.fluency === 'limited' ? 1 : data.fluency === 'fluent' ? 2 : 0);
		},
		0
	);

	// Get class features for mastery calculations
	const classData = state.classId ? classesData.find(c => c.id.toLowerCase() === state.classId.toLowerCase()) : null;
	const classFeatures = classData ? findClassByName(classData.name) : null;

	// Use the background points manager hook
  const { pointsData, conversions, actions, masteryLimits } = useBackgroundPoints(
		skillPointsUsed,
		tradePointsUsed,
		languagePointsUsed,
		state.attribute_intelligence,
		state.level,
		classFeatures,
		state.selectedFeatureChoices,
		currentSkills,
		currentTrades,
		state.selectedTraitIds,
		state
	);

	// DEBUG: surface what the calculator is seeing for class/choices/points
	console.log('BG debug', {
		classId: state.classId,
		selectedFeatureChoices: state.selectedFeatureChoices,
		expectedHunterChoiceKey: 'hunter_favored_terrain_0',
		pointsDataBaseSkillPoints: pointsData?.baseSkillPoints,
		pointsData
	});

	// Persist conversions into context so validation sees the effective available points
	React.useEffect(() => {
		dispatch({
			type: 'SET_CONVERSIONS',
			conversions: {
				skillToTrade: conversions.skillToTradeConversions,
				tradeToSkill: conversions.tradeToSkillConversions,
				tradeToLanguage: conversions.tradeToLanguageConversions
			}
		});
	}, [conversions.skillToTradeConversions, conversions.tradeToSkillConversions, conversions.tradeToLanguageConversions, dispatch]);

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
						pointsData={pointsData}
						conversions={conversions}
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
						pointsData={pointsData}
						conversions={conversions}
						actions={actions}
						masteryLimits={masteryLimits}
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
				<span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{pointsData.baseSkillPoints}</span>{' '}
				skill points{' '}
				<span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
					(5 base + {state.attribute_intelligence} Int{pointsData.baseSkillPoints - 5 - state.attribute_intelligence > 0 ? ` + ${pointsData.baseSkillPoints - 5 - state.attribute_intelligence} bonus` : ''})
				</span>,{' '}
				<span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{pointsData.baseTradePoints}</span>{' '}
				trade points{pointsData.baseTradePoints > 3 ? <span style={{ fontSize: '0.9rem', color: '#6b7280' }}> (3 base + {pointsData.baseTradePoints - 3} bonus)</span> : ''}, and{' '}
				<span style={{ fontWeight: 'bold', color: '#3b82f6' }}>
					{pointsData.baseLanguagePoints}
				</span>{' '}
				language points{pointsData.baseLanguagePoints > 2 ? <span style={{ fontSize: '0.9rem', color: '#6b7280' }}> (2 base + {pointsData.baseLanguagePoints - 2} bonus)</span> : ''}. <br />
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
					Skills ({pointsData.availableSkillPoints - pointsData.skillPointsUsed} left)
				</StyledTab>
				<StyledTab $active={activeTab === 'trades'} onClick={() => setActiveTab('trades')}>
					Trades ({pointsData.availableTradePoints - pointsData.tradePointsUsed} left)
				</StyledTab>
				<StyledTab $active={activeTab === 'languages'} onClick={() => setActiveTab('languages')}>
					Languages ({pointsData.availableLanguagePoints - pointsData.languagePointsUsed} left)
				</StyledTab>
			</StyledTabContainer>

			{renderCurrentTab()}
		</StyledContainer>
	);
};

export default Background;
