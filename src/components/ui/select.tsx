import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const SelectContext = React.createContext<{
	value: string;
	onValueChange: (value: string) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	labels: Record<string, string>;
	addLabel: (value: string, label: string) => void;
} | null>(null);

const Select = ({
	value,
	onValueChange,
	children,
	defaultValue
}: {
	value?: string;
	onValueChange?: (value: string) => void;
	children: React.ReactNode;
	defaultValue?: string;
}) => {
	const [internalValue, setInternalValue] = React.useState(defaultValue || '');
	const [open, setOpen] = React.useState(false);
	const [labels, setLabels] = React.useState<Record<string, string>>({});

	const isControlled = value !== undefined;
	const currentValue = isControlled ? value : internalValue;

	const handleValueChange = (newValue: string) => {
		if (!isControlled) setInternalValue(newValue);
		onValueChange?.(newValue);
		setOpen(false);
	};

	const addLabel = React.useCallback((val: string, label: string) => {
		setLabels((prev) => ({ ...prev, [val]: label }));
	}, []);

	return (
		<SelectContext.Provider
			value={{
				value: currentValue || '',
				onValueChange: handleValueChange,
				open,
				setOpen,
				labels,
				addLabel
			}}
		>
			<div className="relative">{children}</div>
		</SelectContext.Provider>
	);
};

const SelectTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
	const context = React.useContext(SelectContext);

	return (
		<button
			ref={ref}
			type="button"
			onClick={() => context?.setOpen(!context.open)}
			className={cn(
				'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		>
			{children}
			<ChevronDown className="h-4 w-4 opacity-50" />
		</button>
	);
});
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = React.forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement> & { placeholder?: string }
>(({ className, placeholder, ...props }, ref) => {
	const context = React.useContext(SelectContext);
	const label = context?.value ? context.labels[context.value] : placeholder;

	return (
		<span ref={ref} className={cn('block truncate', className)} {...props}>
			{label || placeholder}
		</span>
	);
});
SelectValue.displayName = 'SelectValue';

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		const context = React.useContext(SelectContext);

		if (!context?.open) return null;

		return (
			<>
				<div className="fixed inset-0 z-50" onClick={() => context.setOpen(false)} />
				<div
					ref={ref}
					className={cn(
						'bg-popover text-popover-foreground animate-in fade-in-80 absolute z-50 mt-1 w-full min-w-[8rem] overflow-hidden rounded-md border shadow-md',
						className
					)}
					{...props}
				>
					<div className="p-1">{children}</div>
				</div>
			</>
		);
	}
);
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, children, value, ...props }, ref) => {
	const context = React.useContext(SelectContext);
	const isSelected = context?.value === value;

	// Register label
	React.useEffect(() => {
		if (typeof children === 'string') {
			context?.addLabel(value, children);
		}
	}, [value, children, context?.addLabel]);

	return (
		<div
			ref={ref}
			className={cn(
				'focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				className
			)}
			onClick={(e) => {
				e.stopPropagation();
				context?.onValueChange(value);
			}}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				{isSelected && <Check className="h-4 w-4" />}
			</span>
			<span className="truncate">{children}</span>
		</div>
	);
});
SelectItem.displayName = 'SelectItem';

const SelectLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('py-1.5 pr-2 pl-8 text-sm font-semibold', className)} {...props} />
	)
);
SelectLabel.displayName = 'SelectLabel';

const SelectGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('', className)} {...props} />
);
SelectGroup.displayName = 'SelectGroup';

const SelectSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('bg-muted -mx-1 my-1 h-px', className)} {...props} />
	)
);
SelectSeparator.displayName = 'SelectSeparator';

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator
};
