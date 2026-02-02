import * as React from 'react';
import { useConvexAuth } from 'convex/react';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { SignIn } from './SignIn';
import { UserMenu } from './UserMenu';

export interface AuthStatusProps {
	/** Additional class names */
	className?: string;
}

export function AuthStatus({ className }: AuthStatusProps) {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const [showSignIn, setShowSignIn] = React.useState(false);
	const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === 'true';
	const isAllowed = bypassAuth ? true : isAuthenticated;

	if (isLoading) {
		return null;
	}

	if (isAllowed) {
		return <UserMenu className={className} />;
	}

	return (
		<div className={className}>
			<Button
				type="button"
				variant="outline"
				size="sm"
				className="border-purple-500/50 text-purple-200 hover:bg-purple-500/10"
				onClick={() => setShowSignIn(true)}
			>
				Sign In
			</Button>

			<Dialog open={showSignIn} onOpenChange={setShowSignIn}>
				<DialogContent className="border-purple-500/50 bg-transparent p-0 shadow-none">
					<SignIn
						feature="general"
						onSuccess={() => setShowSignIn(false)}
						onCancel={() => setShowSignIn(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default AuthStatus;
