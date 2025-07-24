// Data mapping utilities for converting between IDs and names
import { ancestriesData } from '../rulesdata/ancestries';
import { classesData } from '../rulesdata/loaders/class.loader';
import type { IAncestry, IClassDefinition } from '../rulesdata/types';

export interface IdNameMapping {
	id: string;
	name: string;
}

/**
 * Get ancestry name from ancestry ID
 */
export const getAncestryName = (ancestryId: string | null): string | null => {
	if (!ancestryId) return null;
	const ancestry = ancestriesData.find((a: IAncestry) => a.id === ancestryId);
	return ancestry?.name || null;
};

/**
 * Get ancestry ID from ancestry name
 */
export const getAncestryId = (ancestryName: string | null): string | null => {
	if (!ancestryName) return null;
	const ancestry = ancestriesData.find(
		(a: IAncestry) => a.name.toLowerCase() === ancestryName.toLowerCase()
	);
	return ancestry?.id || null;
};

/**
 * Get class name from class ID
 */
export const getClassName = (classId: string | null): string | null => {
	if (!classId) return null;
	const classData = classesData.find((c: IClassDefinition) => c.id === classId);
	return classData?.name || null;
};

/**
 * Get class ID from class name
 */
export const getClassId = (className: string | null): string | null => {
	if (!className) return null;
	const classData = classesData.find(
		(c: IClassDefinition) => c.name.toLowerCase() === className.toLowerCase()
	);
	return classData?.id || null;
};

/**
 * Get all available ancestries as ID-name mappings
 */
export const getAncestryMappings = (): IdNameMapping[] => {
	return ancestriesData.map((ancestry: IAncestry) => ({
		id: ancestry.id,
		name: ancestry.name
	}));
};

/**
 * Get all available classes as ID-name mappings
 */
export const getClassMappings = (): IdNameMapping[] => {
	return classesData.map((classData: IClassDefinition) => ({
		id: classData.id,
		name: classData.name
	}));
};

/**
 * Ensure character data has both IDs and names for classes and ancestries
 * This is useful for backwards compatibility and data consistency
 */
export const normalizeCharacterData = (characterData: any): any => {
	const normalized = { ...characterData };

	// Ensure class has both ID and name
	if (normalized.classId && !normalized.className) {
		normalized.className = getClassName(normalized.classId);
	} else if (normalized.className && !normalized.classId) {
		normalized.classId = getClassId(normalized.className);
	}

	// Ensure ancestry1 has both ID and name
	if (normalized.ancestry1Id && !normalized.ancestry1Name) {
		normalized.ancestry1Name = getAncestryName(normalized.ancestry1Id);
	} else if (normalized.ancestry1Name && !normalized.ancestry1Id) {
		normalized.ancestry1Id = getAncestryId(normalized.ancestry1Name);
	}

	// Ensure ancestry2 has both ID and name
	if (normalized.ancestry2Id && !normalized.ancestry2Name) {
		normalized.ancestry2Name = getAncestryName(normalized.ancestry2Id);
	} else if (normalized.ancestry2Name && !normalized.ancestry2Id) {
		normalized.ancestry2Id = getAncestryId(normalized.ancestry2Name);
	}

	return normalized;
};
