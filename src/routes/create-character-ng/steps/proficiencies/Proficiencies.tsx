import React, { useState } from 'react';
import { useCharacter } from '../../../../lib/stores/characterContext';
import { Button } from '../../../../design-system/Button/Button';
import {
	calculateAvailablePointsWithConversions,
	calculateSkillPointsSpent,
	calculateTradePointsSpent,
	calculateLanguagePointsSpent,
	getMasteryLimits,
	convertSkillToTrade,
	convertTradeToLanguage,
	unconvertSkillToTrade,
	unconvertTradeToLanguage
} from '../../../../lib/services/proficiencies.service';
import {
	StyledContainer,
	StyledTabsContainer,
	StyledConversionButtonsContainer,
	StyledTabContent
} from './Proficiencies.styles';
import { SkillsTab } from './components/SkillsTab';
import { TradesTab } from './components/TradesTab';
import { LanguagesTab } from './components/LanguagesTab';

type TabType = 'skills' | 'trades' | 'languages';

/**
 * Proficiencies step - where users allocate skill/trade/language points
 * This is a DUMB component - all logic is in the service layer
 */
export const Proficiencies: React.FC = () => {
	const { state, dispatch } = useCharacter();
	const [activeTab, setActiveTab] = useState<TabType>('skills');

	// Calculate all points data (service does this)
	const pointsData = calculateAvailablePointsWithConversions(state);
	const skillsSpent = calculateSkillPointsSpent(state);
	const tradesSpent = calculateTradePointsSpent(state);
	const languagesSpent = calculateLanguagePointsSpent(state);
	const masteryLimits = getMasteryLimits(state);

	// Handler for skill changes (DUMB - just dispatches)
	const handleSkillChange = (skillId: string, newLevel: number) => {
		const updatedSkills = { ...state.skillsData };
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

	// Handler for trade changes (DUMB - just dispatches)
	const handleTradeChange = (tradeId: string, newLevel: number) => {
		const updatedTrades = { ...state.tradesData };
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

	// Handler for language changes (DUMB - just dispatches)
	const handleLanguageChange = (languageId: string, fluency: 'limited' | 'fluent' | null) => {
		const updatedLanguages = { ...state.languagesData };
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

	// Conversion handlers (DUMB - just call service and dispatch)
	const handleConvertSkillToTrade = () => {
		const result = convertSkillToTrade(state);
		if (result) {
			dispatch({
				type: 'SET_CONVERSIONS',
				conversions: result
			});
		}
	};

	const handleConvertTradeToLanguage = () => {
		const result = convertTradeToLanguage(state);
		if (result) {
			dispatch({
				type: 'SET_CONVERSIONS',
				conversions: result
			});
		}
	};

	const handleUnconvertSkillToTrade = () => {
		const result = unconvertSkillToTrade(state);
		if (result) {
			dispatch({
				type: 'SET_CONVERSIONS',
				conversions: result
			});
		}
	};

	const handleUnconvertTradeToLanguage = () => {
		const result = unconvertTradeToLanguage(state);
		if (result) {
			dispatch({
				type: 'SET_CONVERSIONS',
				conversions: result
			});
		}
	};

	const handleResetConversions = () => {
		dispatch({
			type: 'SET_CONVERSIONS',
			conversions: { skillToTrade: 0, tradeToLanguage: 0 }
		});
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case 'skills':
				return (
					<SkillsTab
						currentSkills={state.skillsData || {}}
						masteryLimits={masteryLimits}
						availablePoints={pointsData.availableSkillPoints}
						spentPoints={skillsSpent}
						onSkillChange={handleSkillChange}
					/>
				);
			case 'trades':
				return (
					<TradesTab
						currentTrades={state.tradesData || {}}
						masteryLimits={masteryLimits}
						availablePoints={pointsData.availableTradePoints}
						spentPoints={tradesSpent}
						onTradeChange={handleTradeChange}
					/>
				);
			case 'languages':
				return (
					<LanguagesTab
						currentLanguages={state.languagesData || {}}
						availablePoints={pointsData.availableLanguagePoints}
						spentPoints={languagesSpent}
						onLanguageChange={handleLanguageChange}
					/>
				);
			default:
				return null;
		}
	};

	const conversions = {
		skillToTrade: state.skillToTradeConversions || 0,
		tradeToLanguage: state.tradeToLanguageConversions || 0
	};
	const hasConversions = conversions.skillToTrade > 0 || conversions.tradeToLanguage > 0;

	return (
		<StyledContainer>
			{/* Tabs with points shown IN the button */}
			<StyledTabsContainer>
				<Button
					variant={activeTab === 'skills' ? 'tab' : 'outline'}
					onClick={() => setActiveTab('skills')}
					size="large"
				>
					SKILLS {skillsSpent}/{pointsData.availableSkillPoints}
				</Button>
				<Button
					variant={activeTab === 'trades' ? 'tab' : 'outline'}
					onClick={() => setActiveTab('trades')}
					size="large"
				>
					TRADES {tradesSpent}/{pointsData.availableTradePoints}
				</Button>
				<Button
					variant={activeTab === 'languages' ? 'tab' : 'outline'}
					onClick={() => setActiveTab('languages')}
					size="large"
				>
					LANGUAGES {languagesSpent}/{pointsData.availableLanguagePoints}
				</Button>
			</StyledTabsContainer>

			{/* Conversion buttons */}
			<StyledConversionButtonsContainer>
				<Button
					variant="tab"
					size="small"
					onClick={handleConvertSkillToTrade}
					disabled={pointsData.availableSkillPoints - skillsSpent < 1}
				>
					Convert 1 skill pt. to 2 trade pt.
				</Button>
				<Button
					variant="tab"
					size="small"
					onClick={handleConvertTradeToLanguage}
					disabled={pointsData.availableTradePoints - tradesSpent < 1}
				>
					Convert 1 trade pt. to 2 language pt.
				</Button>
				{conversions.skillToTrade > 0 && (
					<Button
						variant="tab"
						size="small"
						onClick={handleUnconvertSkillToTrade}
						disabled={pointsData.availableTradePoints - tradesSpent < 2}
					>
						Convert 2 trade pt. to 1 skill pt.
					</Button>
				)}
				{conversions.tradeToLanguage > 0 && (
					<Button
						variant="tab"
						size="small"
						onClick={handleUnconvertTradeToLanguage}
						disabled={pointsData.availableLanguagePoints - languagesSpent < 2}
					>
						Convert 2 language pt. to 1 trade pt.
					</Button>
				)}
				{hasConversions && (
					<Button variant="default" size="small" onClick={handleResetConversions}>
						Reset Conversion
					</Button>
				)}
			</StyledConversionButtonsContainer>

			{/* Tab content */}
			<StyledTabContent>{renderTabContent()}</StyledTabContent>
		</StyledContainer>
	);
};
