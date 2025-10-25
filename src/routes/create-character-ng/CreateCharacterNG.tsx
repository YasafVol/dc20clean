import React from 'react';
import { Provider } from 'jotai';
import CharacterCreationStepperContainer from './components/CharacterCreationStepperContainer';
import Class from './steps/class/Class';
import Features from './steps/features/Features';
import Ancestry from './steps/ancestry/Ancestry';
import Attributes from './steps/attributes/Attributes';
import { Proficiencies } from './steps/proficiencies/Proficiencies';
import Spells from './steps/spells/Spells';
import Finish from './steps/finish/Finish';
import {
	StyledPageContainer,
	StyledMainContent,
	StyledContentFrame,
	StyledScrollableWrapper,
	StyledStepperContainer,
	StyledStepperHeader
} from './CreateCharacterNG.styles';

// Step components mapping
const stepComponents = {
	class: Class,
	features: Features,
	ancestry: Ancestry,
	attributes: Attributes,
	proficiencies: Proficiencies,
	spells: Spells,
	finish: Finish
};

import { useAtomValue } from 'jotai';
import { stepperCurrentStepAtom, characterCreationStepsAtom } from '../../atoms/stepperAtom';

const CreateCharacterNGContent: React.FC = () => {
	// derive current step index from shared atom so external auto-advance updates view
	const currentStepIndex = useAtomValue(stepperCurrentStepAtom);
	const steps = useAtomValue(characterCreationStepsAtom);
	const currentStepId = steps[currentStepIndex]?.id || 'class';

	// Get the current step component
	const CurrentStepComponent =
		stepComponents[currentStepId as keyof typeof stepComponents] || Class;

	return (
		<StyledPageContainer>
			<StyledStepperHeader>
				<StyledStepperContainer>
					<CharacterCreationStepperContainer onStepChange={() => {}} />
				</StyledStepperContainer>
			</StyledStepperHeader>

			<StyledMainContent>
				<StyledContentFrame>
					<StyledScrollableWrapper>
						<CurrentStepComponent />
					</StyledScrollableWrapper>
				</StyledContentFrame>
			</StyledMainContent>
		</StyledPageContainer>
	);
};

const CreateCharacterNG: React.FC = () => {
	return (
		<Provider>
			<CreateCharacterNGContent />
		</Provider>
	);
};

export default CreateCharacterNG;
