// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

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
    storybook.configs["flat/recommended"]
);
