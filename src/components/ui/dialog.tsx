import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const DialogContext = React.createContext<{
	open: boolean;
	setOpen: (open: boolean) => void;
} | null>(null);

const Dialog = ({
	open,
	onOpenChange,
	children
}: {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
}) => {
	const [internalOpen, setInternalOpen] = React.useState(false);
	const isControlled = open !== undefined;

	const isOpen = isControlled ? open : internalOpen;
	const setOpen = React.useCallback(
		(newOpen: boolean) => {
			if (!isControlled) setInternalOpen(newOpen);
			onOpenChange?.(newOpen);
		},
		[isControlled, onOpenChange]
	);

	return (
		<DialogContext.Provider value={{ open: !!isOpen, setOpen }}>{children}</DialogContext.Provider>
	);
};

const DialogTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, children, onClick, ...props }, ref) => {
	const context = React.useContext(DialogContext);

	return (
		<button
			ref={ref}
			type="button"
			onClick={(e) => {
				onClick?.(e);
				context?.setOpen(true);
			}}
			className={className}
			{...props}
		>
			{children}
		</button>
	);
});
DialogTrigger.displayName = 'DialogTrigger';

const DialogPortal = ({ children }: { children: React.ReactNode }) => {
	const context = React.useContext(DialogContext);
	if (!context?.open) return null;

	// Only render on client
	if (typeof document === 'undefined') return null;

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
			{children}
		</div>,
		document.body
	);
};

const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const context = React.useContext(DialogContext);

		return (
			<div
				ref={ref}
				className={cn(
					'data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-all duration-100',
					className
				)}
				onClick={() => context?.setOpen(false)}
				{...props}
			/>
		);
	}
);
DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => (
		<DialogPortal>
			<DialogOverlay />
			<div
				ref={ref}
				className={cn(
					'bg-background animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0 fixed z-50 grid w-full gap-4 rounded-b-lg border p-6 shadow-lg sm:max-w-lg sm:rounded-lg',
					className
				)}
				{...props}
			>
				{children}
				<DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
					<X className="h-4 w-4" />
					<span className="sr-only">Close</span>
				</DialogClose>
			</div>
		</DialogPortal>
	)
);
DialogContent.displayName = 'DialogContent';

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
		{...props}
	/>
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => (
		<h2
			ref={ref}
			className={cn('text-lg leading-none font-semibold tracking-tight', className)}
			{...props}
		/>
	)
);
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
));
DialogDescription.displayName = 'DialogDescription';

const DialogClose = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
	const context = React.useContext(DialogContext);

	return (
		<button
			ref={ref}
			type="button"
			className={cn('', className)}
			onClick={(e) => {
				props.onClick?.(e);
				context?.setOpen(false);
			}}
			{...props}
		/>
	);
});
DialogClose.displayName = 'DialogClose';

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogClose,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription
};
