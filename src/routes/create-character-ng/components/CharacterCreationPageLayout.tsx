import React, { ReactNode } from 'react';
import { Provider } from 'jotai';
import CharacterCreationStepperContainer from './CharacterCreationStepperContainer';
import {
	StyledPageContainer,
	StyledMainContent,
	StyledContentFrame,
	StyledScrollableContent,
	StyledContentWrapper,
	StyledInnerContent,
	StyledStepperContainer,
	StyledStepperHeader
} from './CharacterCreationPageLayout.styles';

interface CharacterCreationPageLayoutProps {
	children: ReactNode;
	onStepChange?: (stepIndex: number, stepId: string) => void;
}

const CharacterCreationPageLayoutContent: React.FC<CharacterCreationPageLayoutProps> = ({ 
	children, 
	onStepChange 
}) => {
	return (
		<StyledPageContainer>
			<StyledStepperHeader>
				<StyledStepperContainer>
					<CharacterCreationStepperContainer onStepChange={onStepChange} />
				</StyledStepperContainer>
			</StyledStepperHeader>
			
			<StyledMainContent>
				<StyledContentFrame>
					<StyledScrollableContent>
						<StyledContentWrapper>
							<StyledInnerContent>
								{children}
							</StyledInnerContent>
						</StyledContentWrapper>
					</StyledScrollableContent>
				</StyledContentFrame>
			</StyledMainContent>
		</StyledPageContainer>
	);
};

const CharacterCreationPageLayout: React.FC<CharacterCreationPageLayoutProps> = (props) => {
	return (
		<Provider>
			<CharacterCreationPageLayoutContent {...props} />
		</Provider>
	);
};

export default CharacterCreationPageLayout;