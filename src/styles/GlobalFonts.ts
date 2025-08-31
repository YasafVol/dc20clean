import { createGlobalStyle } from 'styled-components';

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'Tangerine';
    src: url('/src/types/Fonts/Tangerine-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
`;
