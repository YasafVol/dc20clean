/**
 * Sign In Component - Social Login
 *
 * DRAFT - This component will work once Convex Auth is set up.
 *
 * Provides Google OAuth sign-in button.
 * Used when user wants to save to cloud or export PDF.
 */

import * as React from 'react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';
import { useAuthActions } from '@convex-dev/auth/react';

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
		description: 'Sign in to save your characters to the cloud and access them from any device.'
	},
	'pdf-export': {
		title: 'Export to PDF',
		description: 'Sign in to export your character sheet as a PDF.'
	},
	general: {
		title: 'Sign In',
		description: 'Sign in to unlock cloud saves and PDF exports.'
	}
};

export function SignIn({ onSuccess, onCancel, feature = 'general', className }: SignInProps) {
	const [isLoading, setIsLoading] = useState<'google' | null>(null);
	const [error, setError] = useState<string | null>(null);

	const { signIn } = useAuthActions();

	const handleGoogleSignIn = async () => {
		setError(null);
		setIsLoading('google');

		try {
			const redirectTo = window.location.href;
			const { redirect } = await signIn('google', { redirectTo });
			if (redirect) {
				window.location.assign(redirect.toString());
				return;
			}

			onSuccess?.();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
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

export default SignIn;
