import { defineConfig, devices } from '@playwright/test';

const skipBuild = process.env.PLAYWRIGHT_SKIP_BUILD === '1';

export default defineConfig({
	webServer: {
		// When PLAYWRIGHT_SKIP_BUILD=1 we only preview the existing build artifact.
		// Otherwise build then preview.
		command: skipBuild ? 'npm run preview' : 'npm run build && npm run preview',
		port: 4173,
		reuseExistingServer: true,
		timeout: 120000
	},
	use: {
		baseURL: 'http://localhost:4173',
		// Default: do not write screenshots unless explicitly enabled via env var
		// Use 'only-on-failure' to be conservative, and allow E2E_SCREENSHOTS=1 to force screenshots
		screenshot: process.env.E2E_SCREENSHOTS ? 'on' : 'only-on-failure',
		trace: process.env.E2E_TRACES ? 'on' : 'on-first-retry'
	},
	testDir: 'e2e',
	projects: [
		{
			name: 'desktop',
			use: {
				browserName: 'chromium',
				viewport: { width: 1280, height: 900 }
			}
		},
		{
			name: 'mobile',
			use: {
				...devices['iPhone 12']
			}
		}
	]
});
