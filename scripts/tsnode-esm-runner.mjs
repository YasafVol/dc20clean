import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

register('ts-node/esm', pathToFileURL('./'));

const [, , tsFilePath, ...restArgs] = process.argv;
if (!tsFilePath) {
  console.error('Usage: node scripts/tsnode-esm-runner.mjs <script.ts> [args...]');
  process.exit(1);
}

// Preserve args for the child script
globalThis.process.argv = ['node', tsFilePath, ...restArgs];

const resolvedPath = path.resolve(process.cwd(), tsFilePath);
const fileUrl = pathToFileURL(resolvedPath).href;
await import(fileUrl);


