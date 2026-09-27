import { Component, type ReactNode } from 'react';
import { Button } from '../../components/ui/button';

export class BackOfficeErrorBoundary extends Component<
	{ children: ReactNode; quiet?: boolean },
	{ failed: boolean }
> {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	render() {
		return this.state.failed && this.props.quiet ? null : this.state.failed ? (
			<div className="bo-card bo-state" role="alert">
				<h2>Unable to load the review workspace</h2>
				<p>Check your connection and account access, then try again.</p>
				<Button onClick={() => window.location.reload()}>Try again</Button>
			</div>
		) : (
			this.props.children
		);
	}
}
