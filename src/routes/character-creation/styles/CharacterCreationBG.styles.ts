import styled from 'styled-components';
import BlackBG from '/src/assets/BlackBG.jpg';

export const CharacterCreationBG = styled.div`
  min-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(${BlackBG}) center center/cover no-repeat fixed;
  z-index: -1;
`;
