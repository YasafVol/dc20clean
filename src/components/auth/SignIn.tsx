/**
 * Sign In Component
 *
 * DRAFT - This component will work once Convex Auth is set up.
 *
 * Provides email/password sign-in functionality using Convex Auth.
 */

import * as React from 'react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { cn } from '../../lib/utils';

// TODO: Uncomment after npm install
// import { useAuthActions } from '@convex-dev/auth/react';

export interface SignInProps {
	/** Called when user successfully signs in */
	onSuccess?: () => void;
	/** Called when user clicks to switch to sign up */
	onSwitchToSignUp?: () => void;
	/** Additional class names */
	className?: string;
}

export function SignIn({ onSuccess, onSwitchToSignUp, className }: SignInProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// TODO: Uncomment after npm install
	// const { signIn } = useAuthActions();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			// TODO: Replace with actual Convex Auth call
			// await signIn('password', { email, password, flow: 'signIn' });

			// Placeholder - remove after Convex setup
			console.warn('SignIn: Convex Auth not configured yet');
			setError('Authentication not configured. Please complete Convex setup.');

			onSuccess?.();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to sign in');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card
			className={cn(
				'w-full max-w-md border-purple-500/50 bg-gradient-to-br from-indigo-950 to-indigo-900',
				className
			)}
		>
			<CardHeader className="text-center">
				<CardTitle className="font-cinzel text-primary text-2xl tracking-wide">
					Welcome Back
				</CardTitle>
				<CardDescription className="text-muted-foreground">
					Sign in to access your characters
				</CardDescription>
			</CardHeader>

			<form onSubmit={handleSubmit}>
				<CardContent className="space-y-4">
					{error && (
						<div className="rounded-md border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
							{error}
						</div>
					)}

					<div className="space-y-2">
						<Label htmlFor="email" className="text-foreground">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="adventurer@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							disabled={isLoading}
							className="border-purple-500/30 bg-black/30 focus:border-purple-500"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password" className="text-foreground">
							Password
						</Label>
						<Input
							id="password"
							type="password"
							placeholder="Your secret passphrase"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							disabled={isLoading}
							className="border-purple-500/30 bg-black/30 focus:border-purple-500"
						/>
					</div>
				</CardContent>

				<CardFooter className="flex flex-col gap-4">
					<Button type="submit" className="w-full font-bold" disabled={isLoading}>
						{isLoading ? 'Signing in...' : 'Sign In'}
					</Button>

					<p className="text-muted-foreground text-center text-sm">
						Don't have an account?{' '}
						<button
							type="button"
							onClick={onSwitchToSignUp}
							className="text-primary hover:underline"
						>
							Create one
						</button>
					</p>
				</CardFooter>
			</form>
		</Card>
	);
}

export default SignIn;
