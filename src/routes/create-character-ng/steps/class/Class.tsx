import React, { useState } from 'react';
import {
	StyledContainer,
	StyledContent,
	StyledClassDetails,
	StyledQuote,
	StyledDescription
} from './Class.styles';
import { CollapsibleSection } from '../../../../design-system';
import { Button } from '../../../../design-system';
import { classesData } from '../../../../lib/rulesdata/loaders/class.loader';

// Class data with quotes and descriptions
const classData = {
	barbarian: {
		quote: 'My rage is my shield, my weapon, my answer.',
		description: 'Unleashes devastating attacks and shrugs off harm by entering a powerful rage.'
	},
	bard: {
		quote: 'A single chord can lift an army — or break it.',
		description: 'Casts spells and boosts allies through versatile performance magic.'
	},
	champion: {
		quote: 'Stand tall. Strike true. Never fall.',
		description: 'A master of physical combat who thrives on precise blows and resilience.'
	},
	cleric: {
		quote: 'By their light, I heal. By their will, I smite.',
		description: 'Divine caster who heals, protects, and delivers holy retribution.'
	},
	commander: {
		quote: 'Victory favors the prepared — and the bold.',
		description: 'A tactical leader who bolsters allies and coordinates battlefield strategy.'
	},
	druid: {
		quote: 'Nature is not a force to control, but to become.',
		description: 'Transforms into beasts and commands the primal forces of nature.'
	},
	hunter: {
		quote: 'The perfect shot requires patience, skill — and one arrow.',
		description: 'Expert tracker and archer who excels at ranged combat and wilderness survival.'
	},
	monk: {
		quote: 'The body is a weapon. The mind is its edge.',
		description: 'Uses martial arts and mental discipline to achieve supernatural feats.'
	},
	rogue: {
		quote: 'Why fight fair when you can fight smart?',
		description: 'Strikes from shadows with precision, stealth, and cunning tactics.'
	},
	sorcerer: {
		quote: 'Magic flows through me like breath, like blood.',
		description: 'Innate spellcaster who shapes raw magic through force of will.'
	},
	spellblade: {
		quote: 'Steel and sorcery, united as one.',
		description: 'Combines martial prowess with arcane magic in perfect harmony.'
	},
	warlock: {
		quote: 'Power demands a price. I have paid it willingly.',
		description: 'Draws eldritch power from otherworldly patrons through binding pacts.'
	},
	wizard: {
		quote: 'Knowledge is power. I seek both.',
		description: 'Scholar of the arcane who learns and casts spells through careful study.'
	}
};

const Class: React.FC = () => {
	const [selectedClass, setSelectedClass] = useState<string | null>(null);

	const handleClassSelect = (classId: string) => {
		setSelectedClass(classId);
		// TODO: Update character state with selected class
		console.log('Selected class:', classId);
	};

	return (
		<StyledContainer>
			<StyledContent>
				{classesData.map((classDef) => {
					const classInfo = classData[classDef.id as keyof typeof classData];
					const isSelected = selectedClass === classDef.id;

					return (
						<CollapsibleSection
							key={classDef.id}
							title={classDef.name.toUpperCase()}
							selected={isSelected}
							defaultExpanded={false}
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
							</StyledClassDetails>
						</CollapsibleSection>
					);
				})}
			</StyledContent>
		</StyledContainer>
	);
};

export default Class;
