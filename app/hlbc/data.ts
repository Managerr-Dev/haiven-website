/**
 * Prices and copy for the Haiven Leverage Buying Club (HLBC) group purchase page.
 *
 * Prices are per meter in naira, excluding VAT and courier:
 * [1–99 meters, 100–999 meters, 1,000+ wholesale].
 * Live prices and groups come from the Haiven Admin API (see lib/state.ts).
 */

export type MeterType = "single" | "three";

export type Prices = Record<MeterType, [number, number, number]>;

/** Used only when the API can't be reached. */
export const FALLBACK_PRICES: Prices = {
	single: [112_000, 105_000, 95_000],
	three: [220_000, 207_000, 190_000],
};

/** Groups go ahead at this many paid meters; the full wholesale price applies at the target. */
export const GROUP_MINIMUM = 300;
export const GROUP_TARGET = 1_000;

/** Most meters one order can put into a group; larger orders are special orders. */
export const MAX_GROUP_ORDER = 1_000;

export const fmt = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");

/** "₦95k" */
export const fmtK = (n: number) =>
	"₦" + (n >= 1000 ? `${Math.round(n / 1000).toLocaleString("en-NG")}k` : n);

/** "17 Nov 2026" from an ISO date or date-time. */
export const fmtDate = (iso: string) =>
	new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "Africa/Lagos",
	}).format(new Date(iso));

/**
 * Group price for `paid` meters:
 * 100–999 price − (100–999 price − wholesale price) × paid ÷ 1,000.
 */
export function groupPrice(prices: Prices, type: MeterType, paid: number) {
	const [, mid, wholesale] = prices[type];
	return paid >= GROUP_TARGET
		? wholesale
		: mid - ((mid - wholesale) * paid) / GROUP_TARGET;
}

/** What a buyer pays alone: the 1–99 or 100–999 price. */
export const alonePrice = (prices: Prices, type: MeterType, qty: number) =>
	qty < 100 ? prices[type][0] : prices[type][1];

/** Biggest per-meter saving across both meters, retail vs wholesale. */
export const maxSaving = (prices: Prices) =>
	Math.max(...Object.values(prices).map(([retail, , wholesale]) => retail - wholesale));

export const METERS: { type: MeterType; name: string; short: string; use: string }[] = [
	{
		type: "single",
		name: "Single-phase meter",
		short: "Single-phase",
		use: "Homes, flats and rentals",
	},
	{
		type: "three",
		name: "Three-phase meter",
		short: "Three-phase",
		use: "Larger homes, offices and commercial",
	},
];

/** Rows of the pricing table. */
export const TABLE_TIERS = [300, 500, 700, 900, 1_000];

export const STEPS: [title: string, body: string][] = [
	[
		"Join free",
		"Pick your phase meter and how many you need. Add optional meter boxes or breakers if you want them. Nothing to pay yet.",
	],
	["The group fills", "Each phase meter has its own group, open for up to 21 days."],
	[
		"Get your price",
		"When the group closes, Haiven sends your provisional price, VAT and payment date.",
	],
	[
		"Pay 50%",
		"Within 7 days of that notice. Haiven reconciles paid meters and confirms your final wholesale price.",
	],
	[
		"Pay balance and courier",
		"The remaining 50% and the courier charge are paid before dispatch.",
	],
	[
		"Receive your meters",
		"Shipping and clearing takes about 10 weeks from supplier order confirmation, then courier delivery to you.",
	],
];

export const SAFEGUARDS: [title: string, body: string][] = [
	[
		"Ring-fenced group funds",
		"Each group’s money is kept for that group’s procurement.",
	],
	[
		"300-meter minimum",
		"No group goes ahead below 300 paid meters. If yours falls short, move to the next group or request a refund.",
	],
	[
		"Refunds in 7 business days",
		"Approved refunds are paid within 7 business days, after payment reconciliation.",
	],
	[
		"Price confirmed first",
		"Your final price is shared before procurement. A material change needs your acceptance.",
	],
	[
		"Your price is set by paid meters",
		"While a group is open you see how many meters have joined. Your final price is based only on paid meters, so the price is real.",
	],
	[
		"No surprise substitutions",
		"Any product change needs your approval. Manufacturer warranties come with your order.",
	],
];

export const FEATURES: [title: string, body: string][] = [
	[
		"Remote GPRS communication",
		"Meter data travels over the mobile network, so readings don’t need a site visit.",
	],
	[
		"Remote reading and monitoring",
		"See readings and consumption remotely on compatible platforms.",
	],
	[
		"Digital electricity vending",
		"Buy power through digital channels, with remote loading on compatible configurations.",
	],
	[
		"Tamper and event records",
		"Supported models record selected tamper events and meter activity.",
	],
	[
		"Manage many meters at once",
		"Owners and facility managers run every registered meter from one place.",
	],
	[
		"Ready for Haiven",
		"Connect to the free Haiven app for management, monitoring and vending.",
	],
];

export const FAQS: [question: string, answer: string][] = [
	[
		"Do I have to buy 1,000 meters to get the wholesale price?",
		"No. Haiven combines orders from many buyers into one group purchase. You register your own quantity and pay the price the group achieves.",
	],
	[
		"Are prices fixed?",
		"No. Prices are live and change with the market, for example with exchange rates and supplier costs. Your provisional price is set when your group closes, and the final price is confirmed before procurement.",
	],
	["Is joining free?", "Yes. Joining is free, and registering does not commit you to buy."],
	[
		"Is the Haiven app really free?",
		"Yes, for property owners and managers: meter registration, monitoring and management are free, and so is the app residents use to buy power. When residents buy electricity through the app, a 1% fee applies to the amount they buy.",
	],
	[
		"Are single-phase and three-phase meters in the same group?",
		"No. Each phase meter has its own group purchase.",
	],
	[
		"What is the minimum for a group to go ahead?",
		"300 paid meters of the same phase. At 1,000 paid meters the full wholesale price applies, subject to supplier and procurement confirmation.",
	],
	[
		"Do I pay the full amount when I register?",
		"No. After your group closes you have 7 days from the provisional notice to pay 50% of your VAT-inclusive order. The remaining 50% is paid before dispatch.",
	],
	[
		"What if the group doesn’t reach 300 paid meters?",
		"Procurement doesn’t go ahead. You can move your payment to the next group for the same phase meter or request a refund. Approved refunds are paid within 7 business days.",
	],
	[
		"I need more than 1,000 meters. Can I still join?",
		"Yes. Orders above 1,000 meters are handled as special orders, outside the group. Register as normal and our team will contact you about pricing.",
	],
	[
		"Are meter boxes and circuit breakers included?",
		"No. They are optional, quoted separately on request, and not counted in the group or its savings.",
	],
	[
		"Is delivery free for large orders?",
		"No. Every order goes by courier, and you pay the delivery charge, whatever the quantity or location. It is quoted for your acceptance before dispatch.",
	],
	[
		"How long until I receive my meters?",
		"Shipping and clearing takes about 10 weeks from supplier order confirmation, after the group’s payments are in. This is an estimate, not a guaranteed date, and it doesn’t start at registration.",
	],
	[
		"Can I order for several properties?",
		"Yes. Register the total number of meters you need across your properties.",
	],
];

/** Values match the API's HlbcBuyerType enum. */
export const BUYER_TYPES = [
	{ value: "property_developer", label: "Property developer" },
	{ value: "property_owner", label: "Property owner or landlord" },
	{ value: "estate_manager", label: "Estate or facility manager" },
	{ value: "homeowner", label: "Homeowner" },
	{ value: "electrical_contractor", label: "Electrical contractor" },
	{ value: "business_owner", label: "Business owner" },
	{ value: "other", label: "Other" },
];

/** Lagos first, then alphabetical. Must match the API's config('hlbc.states'). */
export const STATES = [
	"Lagos",
	"Abia",
	"Adamawa",
	"Akwa Ibom",
	"Anambra",
	"Bauchi",
	"Bayelsa",
	"Benue",
	"Borno",
	"Cross River",
	"Delta",
	"Ebonyi",
	"Edo",
	"Ekiti",
	"Enugu",
	"FCT Abuja",
	"Gombe",
	"Imo",
	"Jigawa",
	"Kaduna",
	"Kano",
	"Katsina",
	"Kebbi",
	"Kogi",
	"Kwara",
	"Nasarawa",
	"Niger",
	"Ogun",
	"Ondo",
	"Osun",
	"Oyo",
	"Plateau",
	"Rivers",
	"Sokoto",
	"Taraba",
	"Yobe",
	"Zamfara",
];
