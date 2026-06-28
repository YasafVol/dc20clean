import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import * as convexReact from 'convex/react';

vi.mock('convex/react', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}));
vi.mock('../../../../convex/_generated/api', () => ({
  api: { characters: { getByIdForMember: 'characters:getByIdForMember' } },
}));

vi.mock('../../../lib/storage', () => ({
  getDefaultStorage: () => ({
    getCharacterById: vi.fn().mockResolvedValue(null),
    saveCharacter: vi.fn().mockResolvedValue(undefined),
    saveCharacterState: vi.fn().mockResolvedValue(undefined),
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
  it('does not call saveCharacter when readOnly', async () => {
    const saveMock = vi.fn();
    vi.mocked(convexReact.useQuery).mockReturnValue(mockChar);

    // Import provider after mocks
    const { CharacterSheetProvider, useCharacterSheet } =
      await import('./CharacterSheetProvider');

    let saveNow: (() => Promise<void>) | undefined;
    let contextReadOnly: boolean | undefined;

    function Consumer() {
      const ctx = useCharacterSheet();
      saveNow = ctx.saveNow;
      contextReadOnly = ctx.readOnly;
      return <div data-testid="read-only">{String(ctx.readOnly)}</div>;
    }

    render(
      <CharacterSheetProvider characterId="char_1" campaignId="camp_1">
        <Consumer />
      </CharacterSheetProvider>
    );

    // readOnly must be true when campaignId is provided
    expect(screen.getByTestId('read-only')).toHaveTextContent('true');

    await act(async () => { await saveNow?.(); });
    expect(saveMock).not.toHaveBeenCalled();
    expect(contextReadOnly).toBe(true);
  });
});
