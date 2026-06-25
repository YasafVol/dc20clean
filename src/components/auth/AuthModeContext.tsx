import { createContext, useContext, type ReactNode } from 'react';
import { useConvexAuth } from 'convex/react';

interface AppAuthState {
	isConvexEnabled: boolean;
	isAuthenticated: boolean;
	isLoading: boolean;
}

const LOCAL_AUTH_STATE: AppAuthState = {
	isConvexEnabled: false,
	isAuthenticated: false,
	isLoading: false
};

const AppAuthContext = createContext<AppAuthState>(LOCAL_AUTH_STATE);

export function LocalAppAuthProvider({ children }: { children: ReactNode }) {
	return <AppAuthContext.Provider value={LOCAL_AUTH_STATE}>{children}</AppAuthContext.Provider>;
}

export function ConvexAppAuthProvider({ children }: { children: ReactNode }) {
	const { isAuthenticated, isLoading } = useConvexAuth();
	return (
		<AppAuthContext.Provider value={{ isConvexEnabled: true, isAuthenticated, isLoading }}>
			{children}
		</AppAuthContext.Provider>
	);
}

export function useAppAuth(): AppAuthState {
	return useContext(AppAuthContext);
}
