import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// Enable babel options for the React plugin so we can use
// babel-plugin-styled-components project-wide.
export default defineConfig(({ mode }) => {
	const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
	const environment = env.VERCEL_ENV || env.VITE_APP_ENVIRONMENT || 'development';
	const release = env.VERCEL_GIT_COMMIT_SHA || env.VITE_APP_RELEASE || 'local';
	const uploadSourceMaps = Boolean(env.SENTRY_AUTH_TOKEN && env.SENTRY_ORG && env.SENTRY_PROJECT);
	return {
		define: {
			'import.meta.env.VITE_APP_ENVIRONMENT': JSON.stringify(environment),
			'import.meta.env.VITE_APP_RELEASE': JSON.stringify(release),
			'import.meta.env.VITE_SENTRY_DSN': JSON.stringify(env.SENTRY_DSN || env.VITE_SENTRY_DSN || '')
		},
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
			}),
			...(uploadSourceMaps
				? [
						sentryVitePlugin({
							org: env.SENTRY_ORG,
							project: env.SENTRY_PROJECT,
							authToken: env.SENTRY_AUTH_TOKEN,
							telemetry: false,
							release: { name: release, setCommits: false },
							sourcemaps: { filesToDeleteAfterUpload: ['./dist/**/*.map'] }
						})
					]
				: [])
		],
		publicDir: 'static',
		build: {
			outDir: 'dist',
			sourcemap: uploadSourceMaps ? 'hidden' : false
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		}
	};
});
