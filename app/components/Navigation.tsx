"use client";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const features = [
	{
		title: "Metering",
		href: "/features/smart-metering",
	},
	{
		title: "Facility Booking",
		href: "/features/facility-booking",
	},
	{
		title: "Utilities Vending",
		href: "/features/utilities-vending",
	},
	{
		title: "Access Control",
		href: "/features/access-control",
	},
	{
		title: "Bills & Finances",
		href: "/features/bills-management",
	},
];

interface Props extends NavigationMenuProps {
	isScrolled?: boolean;
	variant?: "navbar" | "footer";
}

const Navigation = ({ className, isScrolled, variant = "navbar" }: Props) => {
	const pathname = usePathname();
	const isLightPage = pathname !== "/";
	const useDarkText = (isLightPage && !isScrolled) || variant === "footer";

	const textColor = useDarkText ? "text-[#3B3C3D]" : "text-white";
	const hoverBg = useDarkText ? "hover:bg-black/5" : "hover:bg-white/10";
	const focusBg = useDarkText ? "focus:bg-black/5" : "focus:bg-white/10";

	const showActive = variant !== "footer";
	const activeStyle = showActive
		? {
				borderBottom: "2.54px solid",
				borderImageSource:
					"linear-gradient(270deg, #118039 8.85%, #1ED760 50%)",
				borderImageSlice: 1,
			}
		: {};
	return (
		<NavigationMenu className={className}>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={cn(
							navigationMenuTriggerStyle(),
							"bg-transparent transition-colors",
							textColor,
							hoverBg,
							"hover:text-current",
							focusBg,
							"focus:text-current",
						)}
						style={pathname === "/about-us" ? activeStyle : {}}
					>
						<Link href="/about-us">About Us</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden md:flex">
					<NavigationMenuTrigger
						className={cn(
							"bg-transparent transition-colors",
							textColor,
							hoverBg,
							"hover:text-current",
							"data-[state=open]:bg-white/10",
							"data-[state=open]:text-current",
							useDarkText && "data-[state=open]:bg-black/5",
						)}
						style={pathname.startsWith("/features") ? activeStyle : {}}
					>
						Features
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-2 max-w-[300px]">
							{features.map((feature) => (
								<ListItem
									key={feature.title}
									title={feature.title}
									href={feature.href}
								/>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={cn(
							navigationMenuTriggerStyle(),
							"bg-transparent transition-colors",
							textColor,
							hoverBg,
							"hover:text-current",
							focusBg,
							"focus:text-current",
						)}
						style={pathname === "/iot-solutions" ? activeStyle : {}}
					>
						<Link href="/iot-solutions">IOT Solutions</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				{/* <NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={cn(
							navigationMenuTriggerStyle(),
							"bg-transparent transition-colors",
							textColor,
							hoverBg,
							"hover:text-current",
							focusBg,
							"focus:text-current",
						)}
						style={pathname === "/blog" ? activeStyle : {}}
					>
						<Link href="/blog">Blog</Link>
					</NavigationMenuLink>
				</NavigationMenuItem> */}
				<NavigationMenuItem>
					<NavigationMenuLink
						asChild
						className={cn(
							navigationMenuTriggerStyle(),
							"bg-transparent transition-colors",
							textColor,
							hoverBg,
							"hover:text-current",
							focusBg,
							"focus:text-current",
						)}
						style={pathname === "/contact-us" ? activeStyle : {}}
					>
						<Link href="/contact-us">Contact Us</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

function ListItem({
	title,
	href,
	...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href}>{title}</Link>
			</NavigationMenuLink>
		</li>
	);
}

export default Navigation;
