import { describe, test, expect, beforeEach } from 'vitest';
import { deserializeCharacterFromStorage, serializeCharacterForStorage } from './storageUtils';

describe('storageUtils', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('deserializeCharacterFromStorage auto-migrates old schema versions', () => {
    const oldCharacterJson = JSON.stringify({
      id: 'test-char',
      schemaVersion: 1,
      selectedTraitIds: '["trait1"]', // Old stringified format
      finalName: 'Test Character'
    });

    const result = deserializeCharacterFromStorage(oldCharacterJson);
    
    expect(result).not.toBeNull(); // Should auto-migrate, not drop
    expect(result?.schemaVersion).toBe(2); // Should be migrated to current version
    expect(result?.id).toBe('test-char');
    expect(result?.finalName).toBe('Test Character');
  });

  test('deserializeCharacterFromStorage handles current schema', () => {
    const currentCharacterJson = JSON.stringify({
      id: 'test-char',
      schemaVersion: 2,
      selectedTraitIds: ['trait1'], // New native array format
      selectedFeatureChoices: { choice1: 'value1' },
      skillsData: { athletics: 2 },
      finalName: 'Test Character'
    });

    const result = deserializeCharacterFromStorage(currentCharacterJson);
    
    expect(result).not.toBeNull();
    expect(result?.id).toBe('test-char');
    expect(result?.selectedTraitIds).toEqual(['trait1']);
    expect(result?.selectedFeatureChoices).toEqual({ choice1: 'value1' });
    expect(result?.skillsData).toEqual({ athletics: 2 });
  });

  test('serializeCharacterForStorage adds schemaVersion', () => {
    const character = {
      id: 'test-char',
      selectedTraitIds: ['trait1'],
      selectedFeatureChoices: {},
      skillsData: {},
      tradesData: {},
      languagesData: { common: { fluency: 'fluent' } }
    } as any;

    const serialized = serializeCharacterForStorage(character);
    const parsed = JSON.parse(serialized);
    
    expect(parsed.schemaVersion).toBe(2);
    expect(parsed.selectedTraitIds).toEqual(['trait1']);
  });
});
