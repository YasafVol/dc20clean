import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../../components/ui/select';

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
		<div className="space-y-8">
			<div className="space-y-2 text-center">
				<h2 className="font-cinzel text-primary text-3xl font-bold">Choose Your Class</h2>
				<p className="text-muted-foreground">Select a class to begin your journey.</p>
			</div>

			{isLevelUpMode && originalLevel && (
				<div className="bg-primary/20 border-primary text-primary rounded-md border px-4 py-3 text-center font-medium">
					⬆️ Leveling up from Level {originalLevel} to Level {selectedLevel}
				</div>
			)}

			<div className="border-border mx-auto flex max-w-xl flex-col items-center justify-center gap-4 rounded-lg border bg-black/40 p-4 sm:flex-row">
				<label htmlFor="level-select" className="font-cinzel text-primary text-lg font-bold">
					{isLevelUpMode ? 'New Level:' : 'Starting Level:'}
				</label>
				<div className="w-40">
					<Select value={selectedLevel.toString()} onValueChange={handleLevelChange}>
						<SelectTrigger
							id="level-select"
							className="bg-background/50 border-primary/50 text-foreground"
						>
							<SelectValue placeholder="Select Level" />
						</SelectTrigger>
						<SelectContent>
							{availableLevels.map((level) => (
								<SelectItem key={level} value={level.toString()}>
									{`Level ${level}`}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				{selectedLevel > 1 && !isLevelUpMode && (
					<span className="text-muted-foreground max-w-[200px] text-center text-xs italic sm:text-left">
						You'll choose talents & features next.
					</span>
				)}
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{classesData.map((classDef) => {
					const classInfo = classData[classDef.id as keyof typeof classData];
					const isSelected = selectedClassId === classDef.id;
					const isDisabled = isLevelUpMode;

					return (
						<Card
							key={classDef.id}
							className={cn(
								'hover:border-primary/50 hover:bg-accent/5 relative h-full cursor-pointer overflow-hidden border-2 transition-all duration-200',
								isSelected
									? 'border-primary bg-primary/5 ring-primary/50 shadow-[0_0_20px_rgba(251,191,36,0.1)] ring-1'
									: 'border-border bg-card/50',
								isDisabled && 'hover:border-border hover:bg-card/50 cursor-not-allowed opacity-60'
							)}
							onClick={() => !isDisabled && handleSelectClass(classDef.id)}
							data-testid={`class-card-${classDef.id}`}
						>
							<CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
								<div
									className={cn(
										'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
										isSelected
											? 'bg-primary border-primary'
											: 'bg-background/80 border-muted-foreground/30'
									)}
								>
									<img
										src={classInfo?.icon}
										alt={classDef.name}
										className="h-7 w-7 object-contain brightness-0 invert"
										style={{ filter: isSelected ? 'brightness(0)' : 'brightness(0) invert(0.7)' }}
									/>
								</div>
								<CardTitle
									className={cn(
										'text-xl font-bold tracking-wide uppercase transition-colors',
										isSelected ? 'text-primary' : 'text-muted-foreground'
									)}
								>
									{classDef.name}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div
									className={cn(
										'border-l-2 py-1 pl-3 text-sm italic transition-colors',
										isSelected
											? 'text-primary/90 border-primary/50'
											: 'text-muted-foreground/70 border-muted-foreground/20'
									)}
								>
									"{classInfo?.quote || 'A powerful adventurer.'}"
								</div>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{classInfo?.description || classDef.description}
								</p>
							</CardContent>

							{isSelected && (
								<div className="absolute top-2 right-2">
									<div className="bg-primary text-primary-foreground rounded-full p-1 shadow-sm">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="3"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-3 w-3"
										>
											<polyline points="20 6 9 17 4 12"></polyline>
										</svg>
									</div>
								</div>
							)}
						</Card>
					);
				})}
			</div>
		</div>
	);
}

export default ClassSelector;
