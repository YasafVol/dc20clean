import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CurrentUserProvider, useCurrentUser } from './CurrentUserContext';
import * as AuthModeContext from './AuthModeContext';
import * as convexReact from 'convex/react';

vi.mock('convex/react', () => ({
  useQuery: vi.fn(),
}));
vi.mock('./AuthModeContext', () => ({
  useAppAuth: vi.fn(),
}));
vi.mock('../../../convex/_generated/api', () => ({
  api: { users: { getCurrentUser: 'users:getCurrentUser' } },
}));

function Consumer() {
  const user = useCurrentUser();
  return <div>{user ? user.userId : 'null'}</div>;
}

describe('CurrentUserContext', () => {
  it('provides userId from query when Convex enabled', () => {
    vi.mocked(AuthModeContext.useAppAuth).mockReturnValue({
      isConvexEnabled: true, isAuthenticated: true, isLoading: false,
    });
    vi.mocked(convexReact.useQuery).mockReturnValue({ userId: 'user_123', name: 'Alice' });

    render(
      <CurrentUserProvider>
        <Consumer />
      </CurrentUserProvider>
    );

    expect(screen.getByText('user_123')).toBeTruthy();
  });

  it('returns null when not Convex enabled', () => {
    vi.mocked(AuthModeContext.useAppAuth).mockReturnValue({
      isConvexEnabled: false, isAuthenticated: false, isLoading: false,
    });
    vi.mocked(convexReact.useQuery).mockReturnValue(undefined);

    render(
      <CurrentUserProvider>
        <Consumer />
      </CurrentUserProvider>
    );

    expect(screen.getByText('null')).toBeTruthy();
  });
});
