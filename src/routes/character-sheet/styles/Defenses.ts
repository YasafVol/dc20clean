import styled from 'styled-components';

export const DefensesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const DefenseItem = styled.div`
  text-align: center;
  width: 120px;
`;

export const DefenseLabelContainer = styled.div`
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0.3rem;
`;

export const DefenseLabel = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  color: #8b4513;
  line-height: 1;
`;

export const ShieldContainer = styled.div`
  width: 80px;
  height: 90px;
  border: 3px solid #8b4513;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  margin: 0 auto;
`;

export const ShieldValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #8b4513;
`;

export const DefenseFooter = styled.div`
  height: 20px;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AutoCalculatedNote = styled.div`
  font-size: 0.6rem;
  color: #8b4513;
`;
