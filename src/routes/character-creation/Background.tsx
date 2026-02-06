import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import SkillsTab from './components/SkillsTab';
import TradesTab from './components/TradesTab';
import LanguagesTab from './components/LanguagesTab';
import { InlineError } from './components/ValidationFeedback';
import { BuildStep } from '../../lib/types/effectSystem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { cn } from '../../lib/utils';

type TabType = 'skills' | 'trades' | 'languages';

const Background: React.FC = () => {
	const { state, dispatch, calculationResult } = useCharacter();
	const [activeTab, setActiveTab] = React.useState<TabType>('skills');

	// Get background data from the centralized calculator
	const { background, validation } = calculationResult;

	// Early return if background data is not available
	if (!background) {
		return (
			<div className="space-y-4 text-center">
				<h2 className="font-cinzel text-primary text-3xl font-bold">
					Background (Skills, Trades & Languages)
				</h2>
				<div>Loading background data...</div>
			</div>
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
		<div className="mx-auto max-w-7xl space-y-8">
			<div className="space-y-4 text-center">
				<h2 className="font-cinzel text-primary text-3xl font-bold">Background</h2>
				<p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed">
					Choose your character's background skills, trades, and languages. You have{' '}
					<span className="text-primary font-bold">{background.baseSkillPoints}</span> skill points,{' '}
					<span className="text-primary font-bold">{background.baseTradePoints}</span> trade points,
					and <span className="text-primary font-bold">{background.baseLanguagePoints}</span>{' '}
					language points.
				</p>

				<div className="bg-muted/50 text-muted-foreground border-border inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm">
					<span>💡 Conversions: 1 skill ↔ 2 trade • 1 trade → 2 language</span>
				</div>

				<div className="text-muted-foreground text-sm italic">
					All characters start fluent in Common for free.
				</div>
			</div>

			<InlineError errors={validation.errors} currentStep={BuildStep.Background} />

			<Tabs
				defaultValue="skills"
				value={activeTab}
				onValueChange={(v) => setActiveTab(v as TabType)}
				className="w-full"
			>
				<TabsList className="border-border mx-auto mb-8 grid w-full max-w-2xl grid-cols-3 border bg-black/40">
					<TabsTrigger
						value="skills"
						className={cn(
							'font-cinzel py-3 text-base transition-colors',
							skillPointsRemaining < 0 && 'text-destructive'
						)}
					>
						Skills ({skillPointsRemaining} left)
					</TabsTrigger>
					<TabsTrigger
						value="trades"
						className={cn(
							'font-cinzel py-3 text-base transition-colors',
							tradePointsRemaining < 0 && 'text-destructive'
						)}
					>
						Trades ({tradePointsRemaining} left)
					</TabsTrigger>
					<TabsTrigger
						value="languages"
						className={cn(
							'font-cinzel py-3 text-base transition-colors',
							languagePointsRemaining < 0 && 'text-destructive'
						)}
					>
						Languages ({languagePointsRemaining} left)
					</TabsTrigger>
				</TabsList>

				<TabsContent value="skills" className="focus-visible:outline-none">
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

				<TabsContent value="trades" className="focus-visible:outline-none">
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

				<TabsContent value="languages" className="focus-visible:outline-none">
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
		</div>
	);
};

export default Background;
