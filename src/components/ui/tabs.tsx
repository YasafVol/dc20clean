import * as React from 'react';
import { cn } from '../../lib/utils';

const TabsContext = React.createContext<{
	activeTab: string;
	setActiveTab: (value: string) => void;
} | null>(null);

const Tabs = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		defaultValue?: string;
		value?: string;
		onValueChange?: (value: string) => void;
	}
>(({ className, defaultValue, value, onValueChange, children, ...props }, ref) => {
	const [internalValue, setInternalValue] = React.useState(defaultValue || '');
	const isControlled = value !== undefined;
	const activeTab = isControlled ? value : internalValue;

	const handleTabChange = (newValue: string) => {
		if (!isControlled) {
			setInternalValue(newValue);
		}
		onValueChange?.(newValue);
	};

	return (
		<TabsContext.Provider value={{ activeTab: activeTab || '', setActiveTab: handleTabChange }}>
			<div ref={ref} className={cn('', className)} {...props}>
				{children}
			</div>
		</TabsContext.Provider>
	);
});
Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				'bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1',
				className
			)}
			{...props}
		/>
	)
);
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, ...props }, ref) => {
	const context = React.useContext(TabsContext);
	const isActive = context?.activeTab === value;

	return (
		<button
			ref={ref}
			type="button"
			onClick={() => context?.setActiveTab(value)}
			data-state={isActive ? 'active' : 'inactive'}
			className={cn(
				'ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm',
				className
			)}
			{...props}
		/>
	);
});
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
	const context = React.useContext(TabsContext);
	if (context?.activeTab !== value) return null;

	return (
		<div
			ref={ref}
			className={cn(
				'ring-offset-background focus-visible:ring-ring animate-in fade-in-0 zoom-in-95 mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
});
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
