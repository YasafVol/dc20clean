/**
 * Sign In Component - Social Login
 *
 * DRAFT - This component will work once Convex Auth is set up.
 *
 * Provides Google and GitHub OAuth sign-in buttons.
 * Used when user wants to save to cloud or export PDF.
 */

import * as React from 'react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

// TODO: Uncomment after npm install
// import { useAuthActions } from '@convex-dev/auth/react';

export interface SignInProps {
	/** Called when user successfully signs in */
	onSuccess?: () => void;
	/** Called when user cancels/closes */
	onCancel?: () => void;
	/** Feature that requires sign in (for messaging) */
	feature?: 'cloud-save' | 'pdf-export' | 'general';
	/** Additional class names */
	className?: string;
}

const featureMessages: Record<string, { title: string; description: string }> = {
	'cloud-save': {
		title: 'Save to Cloud',
		description: 'Sign in to save your characters to the cloud and access them from any device.',
	},
	'pdf-export': {
		title: 'Export to PDF',
		description: 'Sign in to export your character sheet as a PDF.',
	},
	general: {
		title: 'Sign In',
		description: 'Sign in to unlock cloud saves and PDF exports.',
	},
};

export function SignIn({ onSuccess, onCancel, feature = 'general', className }: SignInProps) {
	const [isLoading, setIsLoading] = useState<'google' | 'github' | null>(null);
	const [error, setError] = useState<string | null>(null);

	// TODO: Uncomment after npm install
	// const { signIn } = useAuthActions();

	const handleGoogleSignIn = async () => {
		setError(null);
		setIsLoading('google');

		try {
			// TODO: Replace with actual Convex Auth call
			// await signIn('google');

			// Placeholder - remove after Convex setup
			console.warn('SignIn: Convex Auth not configured yet');
			setError('Authentication not configured. Complete Convex setup first.');

			onSuccess?.();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
		} finally {
			setIsLoading(null);
		}
	};

	const handleGitHubSignIn = async () => {
		setError(null);
		setIsLoading('github');

		try {
			// TODO: Replace with actual Convex Auth call
			// await signIn('github');

			// Placeholder - remove after Convex setup
			console.warn('SignIn: Convex Auth not configured yet');
			setError('Authentication not configured. Complete Convex setup first.');

			onSuccess?.();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to sign in with GitHub');
		} finally {
			setIsLoading(null);
		}
	};

	const { title, description } = featureMessages[feature];

	return (
		<Card
			className={cn(
				'w-full max-w-md border-purple-500/50 bg-gradient-to-br from-indigo-950 to-indigo-900',
				className
			)}
		>
			<CardHeader className="text-center">
				<CardTitle className="font-cinzel text-primary text-2xl tracking-wide">{title}</CardTitle>
				<CardDescription className="text-muted-foreground">{description}</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				{error && (
					<div className="rounded-md border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
						{error}
					</div>
				)}

				{/* Google Sign In */}
				<Button
					type="button"
					variant="outline"
					className="w-full border-white/20 bg-white text-gray-800 hover:bg-gray-100"
					onClick={handleGoogleSignIn}
					disabled={isLoading !== null}
				>
					{isLoading === 'google' ? (
						'Signing in...'
					) : (
						<>
							<GoogleIcon className="mr-2 h-5 w-5" />
							Continue with Google
						</>
					)}
				</Button>

				{/* GitHub Sign In */}
				<Button
					type="button"
					variant="outline"
					className="w-full border-white/20 bg-gray-900 text-white hover:bg-gray-800"
					onClick={handleGitHubSignIn}
					disabled={isLoading !== null}
				>
					{isLoading === 'github' ? (
						'Signing in...'
					) : (
						<>
							<GitHubIcon className="mr-2 h-5 w-5" />
							Continue with GitHub
						</>
					)}
				</Button>

				{/* Cancel button */}
				{onCancel && (
					<Button
						type="button"
						variant="ghost"
						className="text-muted-foreground hover:text-foreground w-full"
						onClick={onCancel}
						disabled={isLoading !== null}
					>
						Cancel
					</Button>
				)}

				<p className="text-muted-foreground text-center text-xs">
					Your characters are saved locally until you sign in.
					<br />
					Sign in to sync them to the cloud.
				</p>
			</CardContent>
		</Card>
	);
}

// Google Icon SVG
function GoogleIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="currentColor">
			<path
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
				fill="#4285F4"
			/>
			<path
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				fill="#34A853"
			/>
			<path
				d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
				fill="#FBBC05"
			/>
			<path
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
				fill="#EA4335"
			/>
		</svg>
	);
}

// GitHub Icon SVG
function GitHubIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
		</svg>
	);
}

export default SignIn;
