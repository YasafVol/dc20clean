import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { useTranslation } from 'react-i18next';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../../components/ui/select';
import {
	Header,
	Title,
	Subtitle,
	LevelUpBanner,
	LevelSelector,
	LevelLabel,
	LevelSelectWrapper,
	LevelHint,
	ClassGrid,
	ClassCard,
	CardHeader,
	IconWrapper,
	ClassIcon,
	ClassTitle,
	CardContent,
	ClassQuote,
	ClassDescription,
	SelectedBadge
} from './ClassSelector.styled';

// Import all SVG icons
import BarbarianIconSrc from '../../assets/SVG/Barbarian.svg';
import BardIconSrc from '../../assets/SVG/Bard.svg';
import ChampionIconSrc from '../../assets/SVG/Cahmpion.svg';
import ClericIconSrc from '../../assets/SVG/Cleric.svg';
import CommanderIconSrc from '../../assets/SVG/Commander.svg';
import DruidIconSrc from '../../assets/SVG/Druid.svg';
import HunterIconSrc from '../../assets/SVG/Hunter.svg';
import MonkIconSrc from '../../assets/SVG/Monk.svg';
import RogueIconSrc from '../../assets/SVG/Rogue.svg';
import SorcererIconSrc from '../../assets/SVG/Sorcerer.svg';
import SpellBladeIconSrc from '../../assets/SVG/SpellBlade.svg';
import WarlockIconSrc from '../../assets/SVG/Warlock.svg';
import WizardIconSrc from '../../assets/SVG/Wizard.svg';

// Class data with quotes and descriptions
const classData = {
	barbarian: {
		quote: 'My rage is my shield, my weapon, my answer.',
		description: 'Unleashes devastating attacks and shrugs off harm by entering a powerful rage.',
		icon: BarbarianIconSrc
	},
	bard: {
		quote: 'A single chord can lift an army — or break it.',
		description: 'Casts spells and boosts allies through versatile performance magic.',
		icon: BardIconSrc
	},
	champion: {
		quote: 'Stand tall. Strike true. Never fall.',
		description: 'A master of physical combat who thrives on precise blows and resilience.',
		icon: ChampionIconSrc
	},
	cleric: {
		quote: 'By their light, I heal. By their will, I smite.',
		description: 'Divine caster who heals, protects, \nand delivers holy retribution.',
		icon: ClericIconSrc
	},
	commander: {
		quote: 'Your strength is mine to guide.',
		description: 'Leads the battlefield with tactical commands and rallying presence.',
		icon: CommanderIconSrc
	},
	druid: {
		quote: "I am the storm. I am the roots. I am nature's will.",
		description: 'Wields primal magic and transforms into beasts to protect the natural order.',
		icon: DruidIconSrc
	},
	hunter: {
		quote: 'I see before others hear. I strike before others see.',
		description: 'Expert tracker and marksman who thrives in wild terrain and against chosen prey.',
		icon: HunterIconSrc
	},
	monk: {
		quote: 'The path is breath, balance, and the beauty of stillness.',
		description: 'Uses inner energy (Focus) for swift, disciplined, and supernatural combat.',
		icon: MonkIconSrc
	},
	rogue: {
		quote: 'One cut. One moment. One chance.',
		description:
			'Excels in stealth, precision, and exploiting weaknesses with devastating strikes.',
		icon: RogueIconSrc
	},
	sorcerer: {
		quote: 'Power pulses in me — untamed, unstoppable.',
		description: 'Casts spells drawn from an innate\nmagical source, not study or faith.',
		icon: SorcererIconSrc
	},
	spellblade: {
		quote: 'My blade is a conduit. My magic — the edge.',
		description: 'Combines melee combat with arcane spells, weaving both into an assault.',
		icon: SpellBladeIconSrc
	},
	warlock: {
		quote: 'The pact is sealed. The power is mine.',
		description:
			'Channels spells through a bargain with a Patron, gaining unique arcane abilities.',
		icon: WarlockIconSrc
	},
	wizard: {
		quote: "I don't believe in luck. I believe in preparation.",
		description: 'Master of studied magic with the widest spell access and deep arcane knowledge.',
		icon: WizardIconSrc
	}
};

function ClassSelector() {
	const { state, dispatch } = useCharacter();
	const { t } = useTranslation();
	const selectedClassId = state.classId;
	const selectedLevel = state.level || 1;
	const isLevelUpMode = state.isLevelUpMode;
	const originalLevel = state.originalLevel;

	// Ensure level is set to 1 if not present (e.g. fresh start)
	React.useEffect(() => {
		if (!state.level) {
			dispatch({ type: 'SET_LEVEL', level: 1 });
		}
	}, [state.level, dispatch]);

	function handleSelectClass(classId: string) {
		// In level-up mode, can't change class
		if (isLevelUpMode) return;

		if (state.classId?.toLowerCase() === classId.toLowerCase()) {
			dispatch({ type: 'SET_CLASS', classId: null }); // Deselect if already selected
		} else {
			dispatch({ type: 'SET_CLASS', classId }); // Select new class
		}
	}

	function handleLevelChange(value: string) {
		const newLevel = parseInt(value, 10);
		dispatch({ type: 'SET_LEVEL', level: newLevel });
	}

	// In level-up mode, show levels from originalLevel + 1 to 10 (DC20 v0.10 max level)
	// DC20 v0.10 is a levels 1-10 system
	const MAX_LEVEL = 10;
	const availableLevels =
		isLevelUpMode && originalLevel
			? Array.from({ length: MAX_LEVEL - originalLevel }, (_, i) => originalLevel + i + 1)
			: Array.from({ length: MAX_LEVEL }, (_, i) => i + 1);

	return (
		<>
			<Header>
				<Title>{t('characterCreation.chooseYourClass')}</Title>
				<Subtitle>{t('characterCreation.selectClassToBegin')}</Subtitle>
			</Header>

			{isLevelUpMode && originalLevel && (
				<LevelUpBanner>
					⬆️ {t('characterCreation.levelingUpFrom')} {originalLevel} {t('characterCreation.to')} {t('characterCreation.level')} {selectedLevel}
				</LevelUpBanner>
			)}

			<LevelSelector>
				<LevelLabel htmlFor="level-select">
					{isLevelUpMode ? t('characterCreation.newLevel') : t('characterCreation.startingLevel')}
				</LevelLabel>
				<LevelSelectWrapper>
					<Select value={selectedLevel.toString()} onValueChange={handleLevelChange}>
						<SelectTrigger
							id="level-select"
							className="bg-background/50 border-primary/50 text-foreground"
						>
							<SelectValue placeholder={t('characterCreation.selectLevel')} />
						</SelectTrigger>
						<SelectContent>
							{availableLevels.map((level) => (
								<SelectItem key={level} value={level.toString()}>
									{`${t('characterCreation.level')} ${level}`}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</LevelSelectWrapper>
				{selectedLevel > 1 && !isLevelUpMode && (
					<LevelHint>{t('characterCreation.youllChooseTalents')}</LevelHint>
				)}
			</LevelSelector>

			<ClassGrid>
				{classesData.map((classDef) => {
					const classInfo = classData[classDef.id as keyof typeof classData];
					const isSelected = selectedClassId === classDef.id;
					const isDisabled = isLevelUpMode;

					return (
						<ClassCard
							key={classDef.id}
							$isSelected={isSelected}
							$isDisabled={isDisabled}
							onClick={() => !isDisabled && handleSelectClass(classDef.id)}
							data-testid={`class-card-${classDef.id}`}
							whileHover={{ scale: isDisabled ? 1 : 1.02 }}
							whileTap={{ scale: isDisabled ? 1 : 0.98 }}
						>
							<CardHeader>
								<IconWrapper $isSelected={isSelected}>
									<ClassIcon
										src={classInfo?.icon}
										alt={classDef.name}
										$isSelected={isSelected}
									/>
								</IconWrapper>
								<ClassTitle $isSelected={isSelected}>{classDef.name}</ClassTitle>
							</CardHeader>
							<CardContent>
								<ClassQuote $isSelected={isSelected}>
									"{classInfo?.quote || 'A powerful adventurer.'}"
								</ClassQuote>
								<ClassDescription>
									{classInfo?.description || classDef.description}
								</ClassDescription>
							</CardContent>

							{isSelected && (
								<SelectedBadge>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="3"
										strokeLinecap="round"
										strokeLinejoin="round"
										style={{ width: '12px', height: '12px' }}
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</SelectedBadge>
							)}
						</ClassCard>
					);
				})}
			</ClassGrid>
		</>
	);
}

export default ClassSelector;
