import React, { useState } from 'react';
import { Stepper, type Step } from '../../design-system';
import {
	StyledPageContainer,
	StyledMainContent,
	StyledContentFrame,
	StyledFrameContent,
	StyledTitle,
	StyledSubtitle,
	StyledStepperContainer
} from './CreateCharacterNG.styles';

const characterCreationSteps: Step[] = [
	{ id: 'class', label: 'CLASS &\nFEATURES' },
	{ id: 'ancestry', label: 'ANCESTRY' },
	{ id: 'attributes', label: 'ATTRIBUTES' },
	{ id: 'background', label: 'BACKGROUND' },
	{ id: 'spells', label: 'SPELLS &\nMANEUVERS' },
	{ id: 'finish', label: 'FINISH' }
];

const CreateCharacterNG: React.FC = () => {
	const [currentStep, setCurrentStep] = useState(0);

	const handleStepClick = (stepIndex: number) => {
		setCurrentStep(stepIndex);
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleNext = () => {
		if (currentStep < characterCreationSteps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	// Mark steps as completed, current, or upcoming
	const stepsWithStatus = characterCreationSteps.map((step, index) => ({
		...step,
		status: index < currentStep ? 'completed' as const : 
		        index === currentStep ? 'in-progress' as const : 
		        'upcoming' as const
	}));

	return (
		<StyledPageContainer>
			<StyledMainContent>
				<StyledStepperContainer>
					<Stepper
						steps={stepsWithStatus}
						current={currentStep}
						onStepClick={handleStepClick}
						onBack={handlePrevious}
						onNext={handleNext}
						backLabel="BACK"
						nextLabel="NEXT"
						showNavigation={true}
					/>
				</StyledStepperContainer>
				
				<StyledContentFrame>
					<StyledFrameContent>
						<StyledTitle>Create Character (NG)</StyledTitle>
						<StyledSubtitle>
							Step {currentStep + 1} of {characterCreationSteps.length}: {characterCreationSteps[currentStep].label?.replace('\n', ' ')}
						</StyledSubtitle>
						<p style={{ color: '#e5e7eb', marginTop: '2rem' }}>
							Content for "{characterCreationSteps[currentStep].label?.replace('\n', ' ')}" will be implemented here.
						</p>
					</StyledFrameContent>
				</StyledContentFrame>
			</StyledMainContent>
		</StyledPageContainer>
	);
};

export default CreateCharacterNG;
