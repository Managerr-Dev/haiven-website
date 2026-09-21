"use client";

interface ScrollLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	target: string;
}

export function scrollToId(id: string) {
	if (id === "top") {
		window.scrollTo({ top: 0, behavior: "smooth" });
		return;
	}
	document
		.getElementById(id)
		?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const ScrollLink = ({ target, onClick, children, ...props }: ScrollLinkProps) => {
	return (
		<a
			href={`#${target}`}
			onClick={(e) => {
				e.preventDefault();
				onClick?.(e);
				scrollToId(target);
			}}
			{...props}
		>
			{children}
		</a>
	);
};

export default ScrollLink;
