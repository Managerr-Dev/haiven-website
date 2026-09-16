import {
	BedDouble,
	Building,
	Building2,
	DoorOpen,
	HardHat,
	Layers,
	type LucideIcon,
} from "lucide-react";

export type AudienceKey =
	| "landlord"
	| "developer"
	| "estate"
	| "shortlet"
	| "hostel"
	| "portfolio";

export const audienceCards: {
	key: AudienceKey;
	icon: LucideIcon;
	title: string;
	description: string;
	line: string;
}[] = [
	{
		key: "landlord",
		icon: Building,
		title: "Landlords & property owners",
		description:
			"For rental properties, apartment blocks and private investment buildings.",
		line: "Your property shouldn't depend on how often you can visit.",
	},
	{
		key: "developer",
		icon: HardHat,
		title: "Property developers & builders",
		description:
			"For newly completed developments that need structure after handover.",
		line: "You built it. Caretaker helps you protect what happens next.",
	},
	{
		key: "estate",
		icon: Building2,
		title: "Estates & residential communities",
		description:
			"For shared environments with residents, access, maintenance and common services.",
		line: "Access, maintenance and residents, running on one record.",
	},
	{
		key: "shortlet",
		icon: DoorOpen,
		title: "Short-let & Airbnb operators",
		description:
			"For properties where guests change often but standards must stay consistent.",
		line: "Your guests change. Your standard shouldn’t.",
	},
	{
		key: "hostel",
		icon: BedDouble,
		title: "Hostels & student residences",
		description:
			"For high-occupancy buildings that require daily coordination and oversight.",
		line: "More people, more movement, more that needs watching.",
	},
	{
		key: "portfolio",
		icon: Layers,
		title: "Portfolio owners & property managers",
		description:
			"For people running multiple properties who need one system across them all.",
		line: "One standard, whether you own two buildings or twenty.",
	},
];

export const DEFAULT_TYPE_LINE = "If people share an address, Caretaker fits.";

export const timelineRows = [
	{
		time: "06:40",
		title: "Property oversight",
		description: "Track what is happening across the building, day by day.",
	},
	{
		time: "09:02",
		title: "Complaints & work orders",
		description: "Issues are logged, assigned, followed up and closed properly.",
	},
	{
		time: "11:15",
		title: "Repairs & maintenance",
		description:
			"Quotes, progress and completion records stay attached to the job.",
	},
	{
		time: "13:30",
		title: "Access & visitors",
		description: "Visitors, deliveries and movements are recorded in one place.",
	},
	{
		time: "16:05",
		title: "Bills & collections",
		description:
			"Service charges, payments and related records stay visible and organised.",
	},
	{
		time: "18:20",
		title: "Owner visibility",
		description:
			"A clear view of what happened, what is pending, and what needs your attention.",
	},
];

export const valueProps = [
	"One dashboard for owners and admins",
	"Resident convenience through the app",
	"Accountability for every job done",
	"A digital record that sharpens decisions over time",
];

export type { PlanName, SelectOption } from "./lib/select-options";
export {
	managedByOptions,
	occupancyOptions,
	planOptions,
	planValue,
	propertyTypeOptions,
} from "./lib/select-options";
