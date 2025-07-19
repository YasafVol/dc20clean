import styled from 'styled-components';

export const StyledContainer = styled.div`
  border: 2px solid #8b5cf6;
  padding: 2rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  margin-top: 2rem;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
  max-width: 600px;
  margin: 2rem auto;
`;

export const StyledTitle = styled.h2`
  margin-top: 0;
  color: #fbbf24;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  border-bottom: 2px solid #ef4444;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
`;

export const StyledInputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #fbbf24;
  font-weight: bold;
  font-size: 1rem;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #a855f7;
  border-radius: 8px;
  background: rgba(45, 27, 105, 0.8);
  color: #e5e7eb;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #fbbf24;
    box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const StyledSuggestionSection = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  border: 2px solid #a855f7;
  border-radius: 8px;
  background: rgba(45, 27, 105, 0.4);
`;

export const StyledSuggestionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #fbbf24;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const StyledSuggestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
  max-height: 200px;
  overflow-y: auto;
`;

export const StyledSuggestionButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #a855f7;
  border-radius: 6px;
  background: transparent;
  color: #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: #a855f7;
    color: #1e1b4b;
    transform: translateY(-2px);
  }
`;

export const StyledGenerateButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
  color: #1e1b4b;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: linear-gradient(145deg, #f59e0b 0%, #d97706 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const StyledFinishButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #10b981 0%, #059669 100%);
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 2rem;
  
  &:hover {
    background: linear-gradient(145deg, #059669 0%, #047857 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    background: linear-gradient(145deg, #6b7280 0%, #4b5563 100%);
  }
`;

export const StyledCharacterInfo = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 2px solid #ef4444;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.1);
  text-align: center;
`;

export const StyledCharacterDetails = styled.p`
  margin: 0;
  color: #e5e7eb;
  font-size: 1rem;
  line-height: 1.6;
`;
