import styled from 'styled-components';
import { useCharacter } from '../../lib/stores/characterContext';
import { attributesData } from '../../lib/rulesdata/attributes';

const StyledContainer = styled.div`
  border: 1px solid #eee;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-top: 2rem;
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  color: #333;
`;

const StyledPointsRemaining = styled.p`
  margin: 0.5rem 0;
  font-weight: bold;
  color: #555;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StyledCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
`;

const StyledCardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const StyledControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledValue = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  min-width: 30px;
`;

type AttributeState = Record<string, number>;

function Attributes() {
  const { state, dispatch, attributePointsRemaining } = useCharacter();
  const typedState = state as unknown as AttributeState;

  function increaseAttribute(attribute: string) {
    if (attributePointsRemaining > 0) {
      const currentValue = typedState[attribute];
      dispatch({ type: 'UPDATE_ATTRIBUTE', attribute, value: currentValue + 1 });
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
            <p>{attribute.description}</p>
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
                disabled={attributePointsRemaining <= 0}
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