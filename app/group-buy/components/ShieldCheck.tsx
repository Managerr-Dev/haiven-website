const ShieldCheck = ({
	size = 24,
	strokeWidth = 2,
	color,
	className,
}: {
	size?: number;
	strokeWidth?: number;
	color: string;
	className?: string;
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke={color}
		strokeWidth={strokeWidth}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		className={className}
	>
		<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z" />
		<path d="M8.5 12l2.5 2.5 4.5-5" />
	</svg>
);

export default ShieldCheck;
