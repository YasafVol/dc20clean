import { useState } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import type { IClassDefinition } from '../../lib/rulesdata/types';
import {
	StyledContainer,
	StyledTitle,
	StyledGrid,
	StyledCard,
	StyledCardHeader,
	StyledClassIcon,
	StyledCardTitle,
	StyledCardDescription,
	StyledCardFooter,
	StyledReadMore,
	StyledTooltip,
	StyledTooltipOverlay,
	StyledTooltipHeader,
	StyledTooltipIcon,
	StyledTooltipTitle,
	StyledTooltipContent,
	StyledCloseHint
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
	const [popupClass, setPopupClass] = useState<string | null>(null);

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

	function truncateText(text: string, maxLength: number): string {
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + '...';
	}

	function needsReadMore(text: string, maxLength: number): boolean {
		return text.length > maxLength;
	}

	function openPopup(classId: string) {
		setPopupClass(classId);
	}

	function closePopup() {
		setPopupClass(null);
	}

	return (
		<StyledContainer>
			<StyledTitle>Choose Your Class</StyledTitle>
			<StyledGrid>
				{classesData.map((classDef: IClassDefinition) => (
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
						<StyledCardDescription>{truncateText(classDef.description, 80)}</StyledCardDescription>
						{needsReadMore(classDef.description, 80) && (
							<StyledCardFooter>
								<StyledReadMore
									onClick={(e) => {
										e.stopPropagation();
										openPopup(classDef.id);
									}}
								>
									read more...
								</StyledReadMore>
							</StyledCardFooter>
						)}
					</StyledCard>
				))}
			</StyledGrid>

			{/* Popup overlay and content */}
			<StyledTooltipOverlay $show={popupClass !== null} onClick={closePopup} />
			{popupClass && (
				<StyledTooltip $show={popupClass !== null}>
					<StyledTooltipHeader>
						<StyledTooltipIcon>{getClassIcon(popupClass)}</StyledTooltipIcon>
						<StyledTooltipTitle>
							{classesData.find((c) => c.id === popupClass)?.name}
						</StyledTooltipTitle>
					</StyledTooltipHeader>
					<StyledTooltipContent>
						{classesData.find((c) => c.id === popupClass)?.description}
					</StyledTooltipContent>
					<StyledCloseHint>Click anywhere to close</StyledCloseHint>
				</StyledTooltip>
			)}
		</StyledContainer>
	);
}

export default ClassSelector;
