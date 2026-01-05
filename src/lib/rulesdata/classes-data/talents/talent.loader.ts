import type { Talent } from '../talents/talent.types';
import { generalTalents, multiclassTalents } from '../talents/talents.data';

// Use Vite's import.meta.glob to dynamically import all class talent files
const classTalentModules = import.meta.glob('./*.talents.ts', { eager: true });

// Extract the talent arrays from each module
const classTalents: Talent[] = Object.values(classTalentModules).flatMap((module: any) => {
	// The talent array is expected to be the first export in each file
	const talentArray = Object.values(module).find(Array.isArray);
	return talentArray || [];
}) as Talent[];

// Combine all talents into a single array
export const allTalents: Talent[] = [...generalTalents, ...multiclassTalents, ...classTalents];

// Helper function to find a talent by its ID
export function findTalentById(talentId: string): Talent | undefined {
	return allTalents.find((t) => t.id === talentId);
}
