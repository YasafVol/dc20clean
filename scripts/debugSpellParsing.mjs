import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_PATH = join(__dirname, '../docs/assets/DC20 0.10 full.md');
const content = readFileSync(DOCS_PATH, 'utf-8');

// Find Fire Bolt specifically
const fireBoltRegex = /^### Fire Bolt\n([\s\S]*?)(?=\n### [A-Z])/m;
const match = fireBoltRegex.exec(content);

if (match) {
	console.log('=== FIRE BOLT RAW MATCH ===');
	console.log(match[1]);
	console.log('=== END ===');
}
