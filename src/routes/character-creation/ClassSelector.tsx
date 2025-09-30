import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import {
	StyledContainer,
	StyledTitle,
	StyledGrid,
	StyledNewClassCard,
	StyledNewClassHeader,
	StyledNewClassIcon,
	StyledNewClassTitle,
	StyledNewClassQuote,
	StyledNewClassDescription
} from './styles/ClassSelector.styles';
import styled from 'styled-components';

// Import all SVG icons
import BarbarianIconSrc from '../../assets/SVG/Barbarian.svg';
import BardIconSrc from '../../assets/SVG/Bard.svg';
import ChampionIconSrc from '../../assets/SVG/Cahmpion.svg'; // Note: filename has typo "Cahmpion"
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

// Styled components for level selector
const LevelSelectorContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	margin-bottom: 2rem;
	padding: 1rem;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 8px;
	border: 1px solid rgba(255, 255, 255, 0.1);
`;

const LevelLabel = styled.label`
	font-family: 'Cinzel', serif;
	font-size: 1.1rem;
	color: #d4af37;
	font-weight: 600;
`;

const LevelSelect = styled.select`
	font-family: 'Urbanist', sans-serif;
	font-size: 1rem;
	padding: 0.5rem 1rem;
	background: rgba(0, 0, 0, 0.5);
	color: white;
	border: 1px solid #d4af37;
	border-radius: 4px;
	cursor: pointer;
	min-width: 100px;
	
	&:hover {
		background: rgba(212, 175, 55, 0.1);
	}
	
	&:focus {
		outline: none;
		border-color: #ffd700;
		box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
	}
`;

const LevelInfo = styled.span`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.9rem;
	color: rgba(255, 255, 255, 0.7);
	font-style: italic;
`;

function ClassSelector() {
	const { state, dispatch } = useCharacter();
	const selectedClassId = state.classId;
	const selectedLevel = state.level || 1;

	function handleSelectClass(classId: string) {
		if (state.classId?.toLowerCase() === classId.toLowerCase()) {
			dispatch({ type: 'SET_CLASS', classId: null }); // Deselect if already selected
		} else {
			dispatch({ type: 'SET_CLASS', classId }); // Select new class
		}
	}

	function handleLevelChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const newLevel = parseInt(event.target.value, 10);
		dispatch({ type: 'SET_LEVEL', level: newLevel });
	}

	return (
		<StyledContainer>
			<StyledTitle>Choose Your Class</StyledTitle>
			
			<LevelSelectorContainer>
				<LevelLabel htmlFor="character-level">Starting Level:</LevelLabel>
				<LevelSelect
					id="character-level"
					value={selectedLevel}
					onChange={handleLevelChange}
					data-testid="level-selector"
				>
					{Array.from({ length: 3 }, (_, i) => i + 1).map((level) => (
						<option key={level} value={level}>
							Level {level}
						</option>
					))}
				</LevelSelect>
				{selectedLevel > 1 && (
					<LevelInfo>
						You'll choose talents, path points, and features after selecting your class
					</LevelInfo>
				)}
			</LevelSelectorContainer>

			<StyledGrid>
				{classesData.map((classDef) => {
					const classInfo = classData[classDef.id as keyof typeof classData];

					// Use the new unified class card design for all classes
					return (
						<StyledNewClassCard
							key={classDef.id}
							type="button"
							$selected={selectedClassId === classDef.id}
							onClick={() => handleSelectClass(classDef.id)}
							data-testid={`class-card-${classDef.id}`}
						>
							<StyledNewClassHeader>
								<StyledNewClassIcon $iconSize="28px" $iconOffsetX="0px" $iconOffsetY="0px">
									<img src={classInfo?.icon} alt={classDef.name} />
								</StyledNewClassIcon>
								<StyledNewClassTitle>{classDef.name}</StyledNewClassTitle>
							</StyledNewClassHeader>
							<StyledNewClassQuote>
								{classInfo?.quote || 'A powerful adventurer.'}
							</StyledNewClassQuote>
							<StyledNewClassDescription>
								{classInfo?.description || classDef.description}
							</StyledNewClassDescription>
						</StyledNewClassCard>
					);
				})}
			</StyledGrid>
		</StyledContainer>
	);
}

export default ClassSelector;
