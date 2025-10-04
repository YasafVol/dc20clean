import React, { useState } from 'react';
import { Provider } from 'jotai';
import CharacterCreationStepperContainer from './components/CharacterCreationStepperContainer';
import Class from './steps/class/Class';
import Features from './steps/features/Features';
import Ancestry from './steps/ancestry/Ancestry';
import Attributes from './steps/attributes/Attributes';
import Background from './steps/background/Background';
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
	background: Background,
	spells: Spells,
	finish: Finish
};

const CreateCharacterNGContent: React.FC = () => {
	const [currentStepId, setCurrentStepId] = useState('class');

	const handleStepChange = (_stepIndex: number, stepId: string) => {
		setCurrentStepId(stepId);
	};

	// Get the current step component
	const CurrentStepComponent =
		stepComponents[currentStepId as keyof typeof stepComponents] || Class;

	return (
		<StyledPageContainer>
			<StyledStepperHeader>
				<StyledStepperContainer>
					<CharacterCreationStepperContainer onStepChange={handleStepChange} />
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
