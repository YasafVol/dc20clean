import { Component, type ReactNode } from 'react';
import { Button } from '../../components/ui/button';

export class BackOfficeErrorBoundary extends Component<
	{ children: ReactNode; quiet?: boolean },
	{ failed: boolean; backendMissing: boolean }
> {
	state = { failed: false, backendMissing: false };
	static getDerivedStateFromError(error: unknown) {
		const message = error instanceof Error ? error.message : '';
		return {
			failed: true,
			backendMissing:
				message.includes('Could not find public function') && message.includes('backOffice:')
		};
	}
	render() {
		return this.state.failed && this.props.quiet ? null : this.state.failed ? (
			<div className="bo-card bo-state" role="alert">
				<h2>
					{this.state.backendMissing
						? 'Back office backend is not deployed'
						: 'Unable to load the review workspace'}
				</h2>
				<p>
					{this.state.backendMissing
						? 'This app is connected to a backend that does not yet include the back office. Deploy the matching backend changes to enable review.'
						: 'Check your connection and account access, then try again.'}
				</p>
				<Button onClick={() => window.location.reload()}>Try again</Button>
			</div>
		) : (
			this.props.children
		);
	}
}
