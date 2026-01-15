import prettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',
			// Discourage console.* usage - use logger service instead
			// Set to 'warn' during migration; change to 'error' when migration is complete
			// See: docs/systems/LOGGING_SYSTEM.MD
			'no-console': ['warn', { allow: [] }],
			// Prevent JSON.parse/stringify in character state management (except in storageUtils.ts)
			'no-restricted-syntax': [
				'error',
				{
					selector: 'CallExpression[callee.object.name="JSON"][callee.property.name="parse"]',
					message:
						'JSON.parse is not allowed in character state management. Use typed objects directly from context.'
				},
				{
					selector: 'CallExpression[callee.object.name="JSON"][callee.property.name="stringify"]',
					message:
						'JSON.stringify is not allowed in character state management. Store native objects in context.'
				}
			]
		}
	},
	{
		files: ['**/storageUtils.ts'],
		rules: {
			// Allow JSON methods only in storage utilities
			'no-restricted-syntax': 'off'
		}
	},
	{
		// Allow console.* in logger service (it wraps console methods)
		files: ['**/logger.ts'],
		rules: {
			'no-console': 'off'
		}
	},
	{
		// Allow console.* in scripts (CLI tools, build scripts)
		files: ['scripts/**/*.ts', 'scripts/**/*.mjs', 'scripts/**/*.js'],
		rules: {
			'no-console': 'off'
		}
	},
	{
		// Allow console.* in test files (debugging during test development)
		files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', 'e2e/**/*.ts'],
		rules: {
			'no-console': 'off'
		}
	}
);
