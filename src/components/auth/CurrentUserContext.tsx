import React, { createContext, useContext } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAppAuth } from './AuthModeContext';

interface CurrentUser {
  userId: string;
  name?: string;
}

const CurrentUserContext = createContext<CurrentUser | null | undefined>(undefined);

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const { isConvexEnabled } = useAppAuth();
  const user = useQuery(api.users.getCurrentUser, isConvexEnabled ? {} : 'skip');
  return (
    <CurrentUserContext.Provider value={user ?? null}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser(): CurrentUser | null | undefined {
  return useContext(CurrentUserContext);
}
