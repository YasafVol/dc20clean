import React from 'react';
import {
	StyledContainer,
	StyledContent,
	StyledClassDetails,
	StyledQuote,
	StyledDescription,
	StyledClassHeader,
	StyledClassIcon
} from './Class.styles';
import { CollapsibleSection } from '../../../../design-system';
import { Button } from '../../../../design-system';
import { classesData } from '../../../../lib/rulesdata/loaders/class.loader';
import { useCharacter } from '../../../../lib/stores/characterContext';
import { getFormattedClassData } from '../../../../lib/services/classFeatures.service';
import ClassFeatureDisplay from './components/ClassFeatureDisplay';

// Import all SVG icons
import BarbarianIconSrc from '../../../../assets/SVG/Barbarian.svg';
import BardIconSrc from '../../../../assets/SVG/Bard.svg';
import ChampionIconSrc from '../../../../assets/SVG/Cahmpion.svg';
import ClericIconSrc from '../../../../assets/SVG/Cleric.svg';
import CommanderIconSrc from '../../../../assets/SVG/Commander.svg';
import DruidIconSrc from '../../../../assets/SVG/Druid.svg';
import HunterIconSrc from '../../../../assets/SVG/Hunter.svg';
import MonkIconSrc from '../../../../assets/SVG/Monk.svg';
import RogueIconSrc from '../../../../assets/SVG/Rogue.svg';
import SorcererIconSrc from '../../../../assets/SVG/Sorcerer.svg';
import SpellBladeIconSrc from '../../../../assets/SVG/SpellBlade.svg';
import WarlockIconSrc from '../../../../assets/SVG/Warlock.svg';
import WizardIconSrc from '../../../../assets/SVG/Wizard.svg';

// Class data with quotes, descriptions, and icons
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
		description: 'Divine caster who heals, protects, and delivers holy retribution.',
		icon: ClericIconSrc
	},
	commander: {
		quote: 'Victory favors the prepared — and the bold.',
		description: 'A tactical leader who bolsters allies and coordinates battlefield strategy.',
		icon: CommanderIconSrc
	},
	druid: {
		quote: 'Nature is not a force to control, but to become.',
		description: 'Transforms into beasts and commands the primal forces of nature.',
		icon: DruidIconSrc
	},
	hunter: {
		quote: 'The perfect shot requires patience, skill — and one arrow.',
		description: 'Expert tracker and archer who excels at ranged combat and wilderness survival.',
		icon: HunterIconSrc
	},
	monk: {
		quote: 'The body is a weapon. The mind is its edge.',
		description: 'Uses martial arts and mental discipline to achieve supernatural feats.',
		icon: MonkIconSrc
	},
	rogue: {
		quote: 'Why fight fair when you can fight smart?',
		description: 'Strikes from shadows with precision, stealth, and cunning tactics.',
		icon: RogueIconSrc
	},
	sorcerer: {
		quote: 'Power pulses in me — untamed, unstoppable.',
		description: 'Casts spells drawn from an innate magical source, not study or faith.',
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

const Class: React.FC = () => {
	const { state, dispatch } = useCharacter();

	const handleClassSelect = (classId: string) => {
		if (state.classId === classId) {
			// Deselect if already selected
			dispatch({ type: 'SET_CLASS', classId: null });
			console.log('🪓 [STEP 1 - CLASS DESELECTED]', {
				classId: null,
				characterState: state
			});
		} else {
			// Select new class
			dispatch({ type: 'SET_CLASS', classId });
			console.log('🪓 [STEP 1 - CLASS SELECTED]', {
				classId,
				characterState: { ...state, classId }
			});
		}
	};

	return (
		<StyledContainer>
			<StyledContent>
				{classesData.map((classDef) => {
					const classInfo = classData[classDef.id as keyof typeof classData];
					const isSelected = state.classId === classDef.id;

					// Get formatted class data - always show features by default
					const formattedData = getFormattedClassData(
						classDef.name,
						classDef.levelProgression?.[0]
					);

					return (
						<CollapsibleSection
							key={classDef.id}
							title={
								<StyledClassHeader>
									<StyledClassIcon>
										<img src={classInfo?.icon} alt={classDef.name} />
									</StyledClassIcon>
									{classDef.name.toUpperCase()}
								</StyledClassHeader>
							}
							selected={isSelected}
							defaultExpanded={isSelected}
							action={
								<Button
									label={isSelected ? 'Selected' : 'Choose this Class'}
									onClick={(e) => {
										e.stopPropagation();
										handleClassSelect(classDef.id);
									}}
									bg={isSelected ? 'var(--emerald)' : undefined}
								/>
							}
						>
							<StyledClassDetails>
								<StyledQuote>"{classInfo?.quote || 'A powerful adventurer.'}"</StyledQuote>
								<StyledDescription>
									{classInfo?.description || classDef.description}
								</StyledDescription>

								{/* Show automatic level 1 features by default */}
								{formattedData && formattedData.level1Features.length > 0 && (
									<ClassFeatureDisplay features={formattedData.level1Features} />
								)}
							</StyledClassDetails>
						</CollapsibleSection>
					);
				})}
			</StyledContent>
		</StyledContainer>
	);
};

export default Class;
