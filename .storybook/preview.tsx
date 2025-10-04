import type { Preview } from '@storybook/react-vite';
import '../src/design-system/styles/colors.css';
import { createGlobalStyle } from 'styled-components';

// Import Urbanist font for Storybook
import UrbanistFont from '../src/types/Fonts/Urbanist-VariableFont_wght.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Urbanist';
    src: url(${UrbanistFont}) format('truetype-variations');
    font-weight: 100 900;
    font-style: normal;
  }

  * {
    font-family: 'Urbanist', sans-serif;
  }

  html,
  body {
    font-family: 'Urbanist', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Urbanist', sans-serif;
  }
`;

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo'
		}
	}
};

export default preview;
