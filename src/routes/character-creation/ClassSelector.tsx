import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import {
	StyledContainer,
	StyledTitle,
	StyledGrid,
	StyledCard,
	StyledCardHeader,
	StyledClassIcon,
	StyledCardTitle,
	StyledCardDescription
} from './styles/ClassSelector.styles';

// Class-specific icons using Unicode symbols and emojis
const classIcons: { [key: string]: string } = {
	fighter: '⚔️',
	wizard: '🧙‍♂️',
	rogue: '🗡️',
	cleric: '✨',
	ranger: '🏹',
	barbarian: '🪓',
	bard: '🎭',
	druid: '🌿',
	monk: '👊',
	paladin: '🛡️',
	sorcerer: '🔥',
	warlock: '👹',
	default: '⚡'
};

function ClassSelector() {
	const { state, dispatch } = useCharacter();
	const selectedClassId = state.classId;

	function handleSelectClass(classId: string) {
		if (state.classId === classId) {
			dispatch({ type: 'SET_CLASS', classId: null }); // Deselect if already selected
		} else {
			dispatch({ type: 'SET_CLASS', classId }); // Select new class
		}
	}

	function getClassIcon(classId: string): string {
		return classIcons[classId.toLowerCase()] || classIcons.default;
	}

	return (
		<StyledContainer>
			<StyledTitle>Choose Your Class</StyledTitle>
			<StyledGrid>
				{classesData.map((classDef) => (
					<StyledCard
						key={classDef.id}
						type="button"
						$selected={selectedClassId === classDef.id}
						onClick={() => handleSelectClass(classDef.id)}
					>
						<StyledCardHeader>
							<StyledClassIcon>{getClassIcon(classDef.id)}</StyledClassIcon>
							<StyledCardTitle>{classDef.name}</StyledCardTitle>
						</StyledCardHeader>
						<StyledCardDescription>{classDef.description}</StyledCardDescription>
					</StyledCard>
				))}
			</StyledGrid>
		</StyledContainer>
	);
}

export default ClassSelector;
