import { useCharacter } from '../../lib/stores/characterContext';
import { attributesData } from '../../lib/rulesdata/attributes';
import {
  StyledContainer,
  StyledTitle,
  StyledPointsRemaining,
  StyledGrid,
  StyledCard,
  StyledCardTitle,
  StyledControls,
  StyledButton,
  StyledValue,
  StyledDescription
} from './styles/Attributes.styles';

type AttributeState = Record<string, number>;

function Attributes() {
  const { state, dispatch, attributePointsRemaining } = useCharacter();
  const typedState = state as unknown as AttributeState;

  function increaseAttribute(attribute: string) {
    if (attributePointsRemaining > 0) {
      const currentValue = typedState[attribute];
      // Maximum attribute value during character creation is +3
      if (currentValue < 3) {
        dispatch({ type: 'UPDATE_ATTRIBUTE', attribute, value: currentValue + 1 });
      }
    }
  }

  function decreaseAttribute(attribute: string) {
    const currentValue = typedState[attribute];
    if (currentValue > -2) {
      dispatch({ type: 'UPDATE_ATTRIBUTE', attribute, value: currentValue - 1 });
    }
  }

  return (
    <StyledContainer>
      <StyledTitle>Attributes</StyledTitle>
      <StyledPointsRemaining>
        Points Remaining: {attributePointsRemaining}
      </StyledPointsRemaining>
      <StyledGrid>
        {attributesData.map((attribute) => (
          <StyledCard key={attribute.id}>
            <StyledCardTitle>{attribute.name}</StyledCardTitle>
            <StyledDescription>{attribute.description}</StyledDescription>
            <StyledControls>
              <StyledButton
                onClick={() => decreaseAttribute('attribute_' + attribute.id)}
                disabled={typedState['attribute_' + attribute.id] <= -2}
              >
                -
              </StyledButton>
              <StyledValue>{typedState['attribute_' + attribute.id]}</StyledValue>
              <StyledButton
                onClick={() => increaseAttribute('attribute_' + attribute.id)}
                disabled={attributePointsRemaining <= 0 || typedState['attribute_' + attribute.id] >= 3}
              >
                +
              </StyledButton>
            </StyledControls>
          </StyledCard>
        ))}
      </StyledGrid>
    </StyledContainer>
  );
}

export default Attributes;