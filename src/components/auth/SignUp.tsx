/**
 * Sign Up Component
 *
 * DRAFT - This component will work once Convex Auth is set up.
 *
 * Provides email/password registration functionality using Convex Auth.
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

export interface SignUpProps {
	/** Called when user successfully signs up */
	onSuccess?: () => void;
	/** Called when user clicks to switch to sign in */
	onSwitchToSignIn?: () => void;
	/** Additional class names */
	className?: string;
}

export function SignUp({ onSuccess, onSwitchToSignIn, className }: SignUpProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// TODO: Uncomment after npm install
	// const { signIn } = useAuthActions();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		// Validate passwords match
		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		// Validate password strength
		if (password.length < 8) {
			setError('Password must be at least 8 characters');
			return;
		}

		setIsLoading(true);

		try {
			// TODO: Replace with actual Convex Auth call
			// await signIn('password', { email, password, flow: 'signUp' });

			// Placeholder - remove after Convex setup
			console.warn('SignUp: Convex Auth not configured yet');
			setError('Authentication not configured. Please complete Convex setup.');

			onSuccess?.();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to create account');
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
					Create Account
				</CardTitle>
				<CardDescription className="text-muted-foreground">
					Join to save your characters in the cloud
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
						<Label htmlFor="signup-email" className="text-foreground">
							Email
						</Label>
						<Input
							id="signup-email"
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
						<Label htmlFor="signup-password" className="text-foreground">
							Password
						</Label>
						<Input
							id="signup-password"
							type="password"
							placeholder="Create a strong passphrase"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							disabled={isLoading}
							className="border-purple-500/30 bg-black/30 focus:border-purple-500"
						/>
						<p className="text-muted-foreground text-xs">At least 8 characters</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="signup-confirm" className="text-foreground">
							Confirm Password
						</Label>
						<Input
							id="signup-confirm"
							type="password"
							placeholder="Confirm your passphrase"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							disabled={isLoading}
							className="border-purple-500/30 bg-black/30 focus:border-purple-500"
						/>
					</div>
				</CardContent>

				<CardFooter className="flex flex-col gap-4">
					<Button type="submit" className="w-full font-bold" disabled={isLoading}>
						{isLoading ? 'Creating account...' : 'Create Account'}
					</Button>

					<p className="text-muted-foreground text-center text-sm">
						Already have an account?{' '}
						<button
							type="button"
							onClick={onSwitchToSignIn}
							className="text-primary hover:underline"
						>
							Sign in
						</button>
					</p>
				</CardFooter>
			</form>
		</Card>
	);
}

export default SignUp;
