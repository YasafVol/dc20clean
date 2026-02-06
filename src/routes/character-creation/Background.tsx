import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import SkillsTab from './components/SkillsTab';
import TradesTab from './components/TradesTab';
import LanguagesTab from './components/LanguagesTab';
import { InlineError } from './components/ValidationFeedback';
import { BuildStep } from '../../lib/types/effectSystem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
	Container,
	Header,
	Title,
	TabsContainer
} from './Background.styled';

type TabType = 'skills' | 'trades' | 'languages';

const Background: React.FC = () => {
	const { state, dispatch, calculationResult } = useCharacter();
	const [activeTab, setActiveTab] = React.useState<TabType>('skills');

	// Get background data from the centralized calculator
	const { background, validation } = calculationResult;

	// Early return if background data is not available
	if (!background) {
		return (
			<Container>
				<Header>
					<Title>Background (Skills, Trades & Languages)</Title>
					<div>Loading background data...</div>
				</Header>
			</Container>
		);
	}

	// Use typed data from state
	const currentSkills = state.skillsData || {};
	const currentTrades = state.tradesData || {};
	const currentLanguages = state.languagesData || { common: { fluency: 'fluent' } };

	// Mastery limits from centralized calculator (DC20 0.10 system)
	const masteryLimits = {
		maxSkillMastery: calculationResult.validation.masteryLimits.maxSkillMastery,
		maxTradeMastery: calculationResult.validation.masteryLimits.maxTradeMastery,
		currentAdeptCount: calculationResult.validation.masteryLimits.currentAdeptCount,
		maxAdeptCount: calculationResult.validation.masteryLimits.maxAdeptCount,
		canSelectAdept: calculationResult.validation.masteryLimits.canSelectAdept,
		// DC20 0.10 mastery cap system fields
		baselineSkillCap: calculationResult.validation.masteryLimits.baselineSkillCap,
		baselineTradeCap: calculationResult.validation.masteryLimits.baselineTradeCap,
		skillEffectiveCaps: calculationResult.validation.masteryLimits.skillEffectiveCaps,
		tradeEffectiveCaps: calculationResult.validation.masteryLimits.tradeEffectiveCaps,
		skillLimitElevations: calculationResult.validation.masteryLimits.skillLimitElevations,
		tradeLimitElevations: calculationResult.validation.masteryLimits.tradeLimitElevations,
		skillFeatureElevationsAvailable:
			calculationResult.validation.masteryLimits.skillFeatureElevationsAvailable,
		tradeFeatureElevationsAvailable:
			calculationResult.validation.masteryLimits.tradeFeatureElevationsAvailable
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

	// Handler for skill mastery limit elevations (DC20 0.10)
	const handleSkillLimitElevationChange = (
		elevations: Record<string, { source: 'spent_points'; value: number }>
	) => {
		dispatch({
			type: 'UPDATE_SKILL_LIMIT_ELEVATIONS',
			elevations
		});
	};

	// Handler for trade mastery limit elevations (DC20 0.10)
	const handleTradeLimitElevationChange = (
		elevations: Record<string, { source: 'spent_points'; value: number }>
	) => {
		dispatch({
			type: 'UPDATE_TRADE_LIMIT_ELEVATIONS',
			elevations
		});
	};

	const skillPointsRemaining = background.availableSkillPoints - background.skillPointsUsed;
	const tradePointsRemaining = background.availableTradePoints - background.tradePointsUsed;
	const languagePointsRemaining =
		background.availableLanguagePoints - background.languagePointsUsed;

	return (
		<Container>
			<Header>
				<Title>Background</Title>
				<p
					style={{
						color: 'rgba(169, 177, 214, 0.7)',
						fontSize: '1.125rem',
						lineHeight: '1.75',
						maxWidth: '48rem',
						margin: '0 auto 1rem'
					}}
				>
					Choose your character's background skills, trades, and languages. You have{' '}
					<span style={{ color: '#7DCFFF', fontWeight: 'bold' }}>
						{background.baseSkillPoints}
					</span>{' '}
					skill points,{' '}
					<span style={{ color: '#7DCFFF', fontWeight: 'bold' }}>
						{background.baseTradePoints}
					</span>{' '}
					trade points, and{' '}
					<span style={{ color: '#7DCFFF', fontWeight: 'bold' }}>
						{background.baseLanguagePoints}
					</span>{' '}
					language points.
				</p>

				<div
					style={{
						background: 'rgba(169, 177, 214, 0.05)',
						color: 'rgba(169, 177, 214, 0.7)',
						border: '1px solid rgba(169, 177, 214, 0.1)',
						display: 'inline-flex',
						alignItems: 'center',
						gap: '0.5rem',
						borderRadius: '0.5rem',
						padding: '0.5rem 1rem',
						fontSize: '0.875rem',
						marginBottom: '0.5rem'
					}}
				>
					<span>💡 Conversions: 1 skill ↔ 2 trade • 1 trade → 2 language</span>
				</div>

				<div
					style={{
						color: 'rgba(169, 177, 214, 0.7)',
						fontSize: '0.875rem',
						fontStyle: 'italic'
					}}
				>
					All characters start fluent in Common for free.
				</div>
			</Header>

			<InlineError errors={validation.errors} currentStep={BuildStep.Background} />

			<TabsContainer>
				<Tabs
					defaultValue="skills"
					value={activeTab}
					onValueChange={(v) => setActiveTab(v as TabType)}
				>
					<TabsList>
						<TabsTrigger
							value="skills"
							style={{
								color: skillPointsRemaining < 0 ? '#F7768E' : undefined
							}}
						>
							Skills ({skillPointsRemaining} left)
						</TabsTrigger>
						<TabsTrigger
							value="trades"
							style={{
								color: tradePointsRemaining < 0 ? '#F7768E' : undefined
							}}
						>
							Trades ({tradePointsRemaining} left)
						</TabsTrigger>
						<TabsTrigger
							value="languages"
							style={{
								color: languagePointsRemaining < 0 ? '#F7768E' : undefined
							}}
						>
							Languages ({languagePointsRemaining} left)
						</TabsTrigger>
					</TabsList>

					<TabsContent value="skills">
						<SkillsTab
							currentSkills={currentSkills}
							currentTrades={currentTrades}
							pointsData={background}
							conversions={{
								skillToTradeConversions: background.conversions.skillToTrade,
								tradeToSkillConversions: background.conversions.tradeToSkill,
								tradeToLanguageConversions: background.conversions.tradeToLanguage
							}}
							actions={actions}
							masteryLimits={masteryLimits}
							onSkillChange={handleSkillChange}
							onSkillLimitElevationChange={handleSkillLimitElevationChange}
						/>
					</TabsContent>

					<TabsContent value="trades">
						<TradesTab
							currentTrades={currentTrades}
							pointsData={background}
							conversions={{
								skillToTradeConversions: background.conversions.skillToTrade,
								tradeToSkillConversions: background.conversions.tradeToSkill,
								tradeToLanguageConversions: background.conversions.tradeToLanguage
							}}
							actions={actions}
							masteryLimits={masteryLimits}
							onTradeChange={handleTradeChange}
							onTradeLimitElevationChange={handleTradeLimitElevationChange}
						/>
					</TabsContent>

					<TabsContent value="languages">
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
					</TabsContent>
				</Tabs>
			</TabsContainer>
		</Container>
	);
};

export default Background;
