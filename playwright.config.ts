import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		reuseExistingServer: true,
		timeout: 120000
	},
	use: {
		baseURL: 'http://localhost:4173',
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
				...devices['iPhone 12'],
			}
		}
	]
});
