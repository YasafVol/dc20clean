import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Enable babel options for the React plugin so we can use
// babel-plugin-styled-components project-wide.
export default defineConfig({
	plugins: [
		tailwindcss(),
		react({
			// Use babel for transformation and pass babel options
			// Note: @vitejs/plugin-react uses esbuild by default; passing
			// 'babel' option enables Babel transform which will pick up the
			// babel-plugin-styled-components we will install.
			babel: {
				plugins: [
					// `babel-plugin-styled-components` will be installed as a devDependency.
					// We reference it by name here so Babel picks it up during transformation.
					'babel-plugin-styled-components'
				]
			}
		})
	],
	publicDir: 'static',
	build: {
		outDir: 'dist'
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
});
