import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import * as convexReact from 'convex/react';

vi.mock('convex/react', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}));
vi.mock('../../../../convex/_generated/api', () => ({
  api: { characters: { getByIdForMember: 'characters:getByIdForMember', list: 'characters:list' } },
}));
vi.mock('../../../lib/storage', () => ({
  getDefaultStorage: () => ({
    getCharacterById: vi.fn().mockResolvedValue(null),
    saveCharacter: vi.fn(),
    listCharacters: vi.fn().mockResolvedValue([]),
    deleteCharacter: vi.fn(),
  }),
}));

vi.mock('../../../lib/services/enhancedCharacterCalculator', () => ({
  calculateCharacterWithBreakdowns: vi.fn(),
  convertToEnhancedBuildData: vi.fn(),
}));

vi.mock('../../../lib/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

// Minimal mock character
const mockChar = {
  id: 'char_1', finalName: 'Gorok', level: 1, classId: 'warrior',
  characterState: { resources: { current: { currentHP: 10 }, original: { maxHP: 20 } }, currency: {}, attacks: [], inventory: [], defenseNotes: '', calculation: null },
  finalHPMax: 20,
};

describe('CharacterSheetProvider read-only mode', () => {
  it('exposes readOnly=true and saveNow is a no-op when campaignId is provided', async () => {
    vi.mocked(convexReact.useQuery).mockReturnValue(mockChar);
    vi.mocked(convexReact.useMutation).mockReturnValue(vi.fn() as any);

    const { CharacterSheetProvider, useCharacterSheet } =
      await import('./CharacterSheetProvider');

    let ctx: ReturnType<typeof useCharacterSheet> | undefined;
    function Consumer() {
      ctx = useCharacterSheet();
      return null;
    }

    render(
      <CharacterSheetProvider characterId="char_1" campaignId="camp_1">
        <Consumer />
      </CharacterSheetProvider>
    );

    expect(ctx?.readOnly).toBe(true);

    // saveNow should be a no-op in read-only mode
    const { getDefaultStorage } = await import('../../../lib/storage');
    const storageMock = (getDefaultStorage as ReturnType<typeof vi.fn>)();

    await act(async () => { await ctx?.saveNow(); });
    expect(storageMock.saveCharacter).not.toHaveBeenCalled();
  });
});
